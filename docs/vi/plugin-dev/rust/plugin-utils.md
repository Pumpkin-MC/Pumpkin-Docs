# Giấy phép & Cập nhật (`pumpkin-plugin-utils`)

`pumpkin-plugin-utils` là một crate tiện ích chính thức cho các plugin Rust Pumpkin. Nó cung cấp các công cụ tích hợp sẵn cho **kiểm tra giấy phép**, **xác minh chữ ký mật mã**, và **kiểm tra cập nhật** đối với [Pumpkin Marketplace](https://market.pumpkinmc.org).

## Tính năng

- **Xác minh chữ ký Ed25519 ngoại tuyến**: Xác minh tính toàn vẹn của plugin và metadata marketplace được nhúng trong `< 1ms` khi khởi động mà không chặn server.
- **Cache metadata toàn cục**: Gọi `init(&context)` một lần trong phương thức vòng đời `on_load` của plugin để cache metadata đã xác minh toàn cục.
- **Xác minh giấy phép trực tuyến**: Truy vấn endpoint marketplace `/api/v1/rest/check-license` với bộ đệm lease 7 ngày tự động (`license_lease.json`).
- **Gia hạn ngoại tuyến**: Đánh giá lease ngoại tuyến linh hoạt đảm bảo plugin của bạn tiếp tục hoạt động trong thời gian bảo trì marketplace hoặc mất mạng.
- **Kiểm tra cập nhật không cần đối số**: Dễ dàng kiểm tra xem phiên bản plugin mới hơn có sẵn trên marketplace hay không.
- **Giải quyết khóa công khai động**: Giải quyết khóa công khai marketplace động thông qua host WIT imports hoặc HTTPS fallback mà không cần hardcode khóa.

---

## Thêm Dependency

Thêm `pumpkin-plugin-utils` cùng với `pumpkin-plugin-api` trong file `Cargo.toml` của plugin:

:::code-group

```toml [Cargo.toml]
[package]
name = "my-plugin"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["cdylib"]

[dependencies]
pumpkin-plugin-api = "0.2.1+26.3-26.51"
pumpkin-plugin-utils = "0.1.0-dev+26.2-26.45"
tracing = "0.1"
```

:::

---

## Khởi tạo

Trước khi thực hiện kiểm tra giấy phép hoặc cập nhật, hãy khởi tạo crate tiện ích bên trong phương thức `on_load` của plugin bằng `Context` của plugin:

```rust
use pumpkin_plugin_api::{Context, Plugin, PluginMetadata};
use tracing::{info, warn};

struct MyPlugin;

impl Plugin for MyPlugin {
    fn new() -> Self {
        Self
    }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "MyPlugin".into(),
            version: env!("CARGO_PKG_VERSION").into(),
            authors: vec!["Tác giả".into()],
            description: "Plugin với kiểm tra giấy phép và cập nhật".into(),
        }
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // Khởi tạo pumpkin-plugin-utils (xác minh chữ ký & cache metadata)
        let metadata = pumpkin_plugin_utils::init(&context)
            .map_err(|e| format!("Khởi tạo thất bại: {e}"))?;

        info!(
            "Đã tải plugin '{}' v{} (Dev: {})",
            metadata.plugin_name, metadata.version, metadata.dev_name
        );

        Ok(())
    }
}
```

::: info Điều gì xảy ra trong `init`?
1. Định vị file `.wasm` binary của plugin trong thư mục server.
2. Trích xuất các custom section `pumpkin.metadata` và `wasm_signature`.
3. Xác minh chữ ký Ed25519 một cách mật mã trên binary WASM và metadata.
4. Cache `PumpkinMetadata` đã xác minh toàn cục cho các lần gọi tiếp theo.
:::

---

## Kiểm tra Cập nhật

`pumpkin-plugin-utils` cung cấp cả kiểm tra tự động không cần đối số và kiểm tra thủ công tùy chỉnh.

### 1. Kiểm tra Cập nhật Tự động (Khuyên dùng)

Sau khi khởi tạo, hãy gọi `pumpkin_plugin_utils::check_for_updates()` không cần đối số. Nó tự động sử dụng tên plugin đã cache, phiên bản hiện tại và endpoint marketplace:

```rust
use tracing::{info, warn};

fn check_updates() {
    match pumpkin_plugin_utils::check_for_updates() {
        Ok(update) => {
            if update.update_available {
                info!(
                    "Có một bản cập nhật mới: {}!",
                    update.latest_version.as_deref().unwrap_or("không rõ")
                );
            } else {
                info!("Plugin đã được cập nhật.");
            }
        }
        Err(err) => {
            warn!("Không thể kiểm tra cập nhật: {err}");
        }
    }
}
```

### 2. Kiểm tra Cập nhật Thủ công (`UpdateChecker`)

Nếu bạn muốn manually chỉ định tên plugin, phiên bản, hoặc một URL marketplace tùy chỉnh, hãy sử dụng `UpdateChecker`:

```rust
use pumpkin_plugin_utils::UpdateChecker;

let checker = UpdateChecker::new();
let response = checker.check_for_updates(
    "my-plugin",
    "1.0.0",
    "https://market.pumpkinmc.org",
)?;

if response.update_available {
    println!("Tìm thấy cập nhật: {:?}", response.latest_version);
}
```

### Cấu trúc Phản hồi Cập nhật

Việc kiểm tra cập nhật trả về một `CheckUpdateResponse`:

```rust
pub struct CheckUpdateResponse {
    /// Có hay không một bản release ổn định mới hơn tồn tại trên marketplace.
    pub update_available: bool,
    /// Chuỗi phiên bản ổn định mới nhất, nếu có.
    pub latest_version: Option<String>,
}
```

---

## Kiểm tra và Xác minh Giấy phép

`pumpkin-plugin-utils` hỗ trợ xác minh trực tuyến đối với API marketplace cũng như quản lý lease ngoại tuyến với các khoảng thời gian gia hạn có thể cấu hình.

### 1. Kiểm tra Giấy phép Trực tuyến

Để xác minh giấy phép đối với marketplace (`GET /api/v1/rest/check-license`):

```rust
// Truyền `None` để sử dụng khóa giấy phép được nhúng từ metadata
let response = pumpkin_plugin_utils::check_license_online(None)
    .map_err(|e| format!("Xác minh giấy phép thất bại: {e}"))?;

if response.valid {
    info!("Giấy phép hợp lệ (trạng thái: {})", response.status);
} else {
    warn!("Giấy phép không hợp lệ: {}", response.status);
    return Err(format!("Trạng thái giấy phép không hợp lệ: {}", response.status).into());
}
```

#### Cung cấp Khóa Giấy phép Tùy chỉnh Override
Nếu plugin của bạn cho phép chủ sở hữu server cấu hình khóa giấy phép trong file `config.toml`, hãy truyền `Some(&key)`:

```rust
let config_key = "LIC-CUSTOM-KEY-12345";
let response = pumpkin_plugin_utils::check_license_online(Some(config_key))?;
```

::: tip Bộ đệm Lease 7 Ngày
Các lần kiểm tra trực tuyến thành công tự động lưu file lease đã xác minh (`license_lease.json`) vào thư mục dữ liệu của plugin với thời hạn 7 ngày.
:::

### 2. Đánh giá Giấy phép với Khoảng thời gian Gia hạn

Để giữ cho các plugin trả phí hoạt động được khi server ngoại tuyến hoặc marketplace không thể truy cập, hãy sử dụng `evaluate_license`:

```rust
use pumpkin_plugin_utils::LicenseStatus;
use tracing::{info, warn};

// Chỉ định thời gian gia hạn tính theo ngày (ví dụ: 7 ngày)
let grace_period_days = 7;

match pumpkin_plugin_utils::evaluate_license(grace_period_days) {
    LicenseStatus::Valid(meta) => {
        info!("Giấy phép hợp lệ cho người mua (User ID: {})", meta.user_id);
    }
    LicenseStatus::GracePeriod { metadata, days_remaining, reason } => {
        warn!(
            "Đang chạy trong khoảng thời gian gia hạn ngoại tuyến (còn {} ngày). Lý do: {}",
            days_remaining, reason
        );
    }
    LicenseStatus::Invalid(reason) => {
        return Err(format!("Giấy phép plugin không hợp lệ hoặc đã bị thay đổi: {reason}").into());
    }
    LicenseStatus::Unsigned => {
        info!("Plugin đang chạy ở chế độ không ký / phát triển.");
    }
}
```

### Enum `LicenseStatus`

| Biến thể | Mô tả |
| :--- | :--- |
| `LicenseStatus::Valid(PumpkinMetadata)` | Giấy phép hợp lệ, đã được xác minh, hoặc plugin là miễn phí / mã nguồn mở. |
| `LicenseStatus::GracePeriod { metadata, days_remaining, reason }` | Vận hành ngoại tuyến với lease đã được xác minh trước đó nằm trong khoảng thời gian gia hạn cho phép. |
| `LicenseStatus::Invalid(String)` | Chữ ký không hợp lệ, đã hết hạn, bị thu hồi, hoặc metadata đã bị thay đổi. |
| `LicenseStatus::Unsigned` | Binary không chứa metadata/chữ ký marketplace (hữu ích trong quá trình phát triển cục bộ). |

---

## Truy cập Metadata Plugin

Bạn có thể truy cập metadata plugin đã xác minh ở bất cứ đâu trong codebase của bạn bằng `get_metadata` hoặc `metadata()`:

```rust
if let Some(meta) = pumpkin_plugin_utils::get_metadata() {
    println!("Tên Plugin: {}", meta.plugin_name);
    println!("Phiên bản Plugin: {}", meta.version);
    println!("Là Plugin Trả phí: {}", meta.is_paid);
    println!("Khóa Giấy phép: {:?}", meta.license_key);
    println!("User ID Người mua: {}", meta.user_id);
    println!("Nhà phát triển: {} (ID: {})", meta.dev_name, meta.dev_id);
    println!("URL Marketplace: {}", meta.marketplace_url);
    println!("Được cấp lúc: {}", meta.issued_at);
}
```

### Các trường `PumpkinMetadata`

| Trường | Loại | Mô tả |
| :--- | :--- | :--- |
| `plugin_name` | `String` | Tên plugin chuẩn trên marketplace. |
| `version` | `String` | Chuỗi phiên bản SemVer của binary plugin. |
| `plugin_id` | `i64` | Định danh plugin duy nhất trên marketplace. |
| `dev_id` | `i64` | ID tài khoản nhà phát triển. |
| `dev_name` | `String` | Tên hiển thị của nhà phát triển. |
| `is_paid` | `bool` | `true` nếu đây là plugin premium/thương mại. |
| `user_id` | `i64` | User ID người mua / người được cấp phép (`0` cho các plugin miễn phí). |
| `license_key` | `Option<String>` | Khóa giấy phép duy nhất được cấp cho người được cấp phép. |
| `marketplace_url` | `String` | URL cơ sở của marketplace (`https://market.pumpkinmc.org`). |
| `issued_at` | `String` | Dấu thời gian ISO-8601 khi binary/giấy phép được cấp. |

---

## Ví dụ Hoàn chỉnh

Dưới đây là triển khai plugin đầy đủ kết hợp khởi tạo, kiểm tra cấp phép trực tuyến, khoảng thời gian gia hạn ngoại tuyến và kiểm tra cập nhật:

:::code-group

```rust:line-numbers [src/lib.rs]
use pumpkin_plugin_api::{Context, Plugin, PluginMetadata};
use pumpkin_plugin_utils::LicenseStatus;
use tracing::{error, info, warn};

struct CommercialPlugin;

impl Plugin for CommercialPlugin {
    fn new() -> Self {
        Self
    }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "CommercialPlugin".into(),
            version: env!("CARGO_PKG_VERSION").into(),
            authors: vec!["Nhà phát triển".into()],
            description: "Một plugin Pumpkin thương mại".into(),
        }
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 1. Khởi tạo plugin-utils (xác minh chữ ký Ed25519 & cache metadata)
        let meta = pumpkin_plugin_utils::init(&context).map_err(|err| {
            error!("Xác minh chữ ký thất bại: {err}");
            format!("Lỗi xác minh bảo mật: {err}")
        })?;

        info!("Đã tải {} v{}", meta.plugin_name, meta.version);

        // 2. Xác thực giấy phép (đánh giá ngoại tuyến + kiểm tra trực tuyến)
        match pumpkin_plugin_utils::evaluate_license(7) {
            LicenseStatus::Valid(_) => {
                info!("Trạng thái giấy phép cục bộ: Hợp lệ");
            }
            LicenseStatus::GracePeriod { days_remaining, .. } => {
                warn!("Giấy phép cục bộ trong khoảng thời gian gia hạn: còn {days_remaining} ngày");
            }
            LicenseStatus::Unsigned => {
                info!("Đang chạy ở chế độ phát triển (binary chưa ký)");
            }
            LicenseStatus::Invalid(reason) => {
                error!("Giấy phép không hợp lệ: {reason}");
                return Err(format!("Xác minh giấy phép thất bại: {reason}").into());
            }
        }

        // 3. Kiểm tra giấy phép trực tuyến nếu là plugin trả phí
        if meta.is_paid {
            if let Ok(check) = pumpkin_plugin_utils::check_license_online(None) {
                if !check.valid {
                    return Err(format!("Giấy phép trực tuyến bị từ chối: {}", check.status).into());
                }
                info!("Đã xác nhận kiểm tra giấy phép trực tuyến: {}", check.status);
            } else {
                warn!("Xác minh giấy phép trực tuyến không thể truy cập, đang dự phòng vào lease cục bộ");
            }
        }

        // 4. Kiểm tra cập nhật
        if let Ok(update) = pumpkin_plugin_utils::check_for_updates() {
            if update.update_available {
                info!(
                    "Có một phiên bản mới trên marketplace: {}",
                    update.latest_version.as_deref().unwrap_or("không rõ")
                );
            }
        }

        Ok(())
    }

    fn on_unload(&self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("CommercialPlugin đã được gỡ bỏ.");
        Ok(())
    }
}

pumpkin_plugin_api::register_plugin!(CommercialPlugin);
```

:::
