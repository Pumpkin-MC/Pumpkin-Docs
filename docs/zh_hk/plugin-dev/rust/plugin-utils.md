# 許可與更新（`pumpkin-plugin-utils`）

`pumpkin-plugin-utils` 是面向 Pumpkin Rust 插件的官方實用工具 crate。它提供內建工具，用於針對 [Pumpkin Marketplace](https://market.pumpkinmc.org) 進行**權限檢查**、**加密簽名驗證**和**更新檢查**。

## 功能

- **離線 Ed25519 簽名驗證**：啟動時在 `< 1ms` 內驗證插件完整性和內嵌的市集元資料，且不會阻塞伺服器。
- **全域元資料快取**：在插件的 `on_load` 生命週期方法中調用一次 `init(&context)`，即可全域快取經過驗證的元資料。
- **線上許可驗證**：查詢市集的 `/api/v1/rest/check-license` 端點，並自動快取 7 天租約（`license_lease.json`）。
- **離線寬限期**：可靠的離線租約評估可確保插件在市集維護或網絡中斷期間繼續工作。
- **零參數更新檢查**：輕鬆檢查市集上是否有更新的插件版本。
- **動態公鑰解析**：透過主機 WIT 匯入或 HTTPS 回退動態解析市集公鑰，無需硬編碼金鑰。

---

## 新增依賴項

在插件的 `Cargo.toml` 中，將 `pumpkin-plugin-utils` 與 `pumpkin-plugin-api` 一併新增：

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

## 初始化

在執行許可或更新檢查之前，請在插件的 `on_load` 方法中使用插件的 `Context` 初始化該實用工具 crate：

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
            authors: vec!["Author".into()],
            description: "Plugin with license and update checks".into(),
        }
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 初始化 pumpkin-plugin-utils（驗證簽名並快取元資料）
        let metadata = pumpkin_plugin_utils::init(&context)
            .map_err(|e| format!("Initialization failed: {e}"))?;

        info!(
            "Loaded plugin '{}' v{} (Dev: {})",
            metadata.plugin_name, metadata.version, metadata.dev_name
        );

        Ok(())
    }
}
```

::: info `init` 期間會發生什麼？
1. 在伺服器目錄中找到插件的 `.wasm` 二進制檔案。
2. 提取 `pumpkin.metadata` 和 `wasm_signature` 自訂節。
3. 以加密方式驗證 WASM 二進制檔案和元資料的 Ed25519 簽名。
4. 全域快取經過驗證的 `PumpkinMetadata`，供後續調用使用。
:::

---

## 檢查更新

`pumpkin-plugin-utils` 既支援零參數自動檢查，也支援自訂手動檢查。

### 1. 自動更新檢查（推薦）

初始化後，不帶參數調用 `pumpkin_plugin_utils::check_for_updates()`。它會自動使用快取的插件名稱、目前版本和市集端點：

```rust
use tracing::{info, warn};

fn check_updates() {
    match pumpkin_plugin_utils::check_for_updates() {
        Ok(update) => {
            if update.update_available {
                info!(
                    "A new update is available: {}!",
                    update.latest_version.as_deref().unwrap_or("unknown")
                );
            } else {
                info!("Plugin is up to date.");
            }
        }
        Err(err) => {
            warn!("Failed to check for updates: {err}");
        }
    }
}
```

### 2. 手動更新檢查（`UpdateChecker`）

如果你想手動指定插件名稱、版本或自訂市集 URL，請使用 `UpdateChecker`：

```rust
use pumpkin_plugin_utils::UpdateChecker;

let checker = UpdateChecker::new();
let response = checker.check_for_updates(
    "my-plugin",
    "1.0.0",
    "https://market.pumpkinmc.org",
)?;

if response.update_available {
    println!("Update found: {:?}", response.latest_version);
}
```

### 更新回應結構

更新檢查會返回一個 `CheckUpdateResponse`：

```rust
pub struct CheckUpdateResponse {
    /// 市集上是否存在更新的穩定版本。
    pub update_available: bool,
    /// 最新的穩定版本字串（如果有）。
    pub latest_version: Option<String>,
}
```

---

## 檢查並驗證許可

`pumpkin-plugin-utils` 支援透過市集 API 進行線上驗證，也支援具有可設定寬限期的離線租約管理。

### 1. 線上權限檢查

要透過市集驗證許可（`GET /api/v1/rest/check-license`）：

```rust
// 傳遞 `None` 以使用元資料中內嵌的授權金鑰
let response = pumpkin_plugin_utils::check_license_online(None)
    .map_err(|e| format!("License verification failed: {e}"))?;

if response.valid {
    info!("License is valid (status: {})", response.status);
} else {
    warn!("License is invalid: {}", response.status);
    return Err(format!("Invalid license status: {}", response.status).into());
}
```

#### 提供自訂授權金鑰覆蓋值
如果你的插件允許伺服器所有者在 `config.toml` 檔案中設定授權金鑰，請傳遞 `Some(&key)`：

```rust
let config_key = "LIC-CUSTOM-KEY-12345";
let response = pumpkin_plugin_utils::check_license_online(Some(config_key))?;
```

::: tip 7 天租約快取
線上檢查成功後，會自動將經過驗證的租約檔案（`license_lease.json`）儲存到插件的資料資料夾中，有效期為 7 天。
:::

### 2. 使用寬限期評估許可

要在伺服器離線或無法存取市集時讓付費插件保持可用，請使用 `evaluate_license`：

```rust
use pumpkin_plugin_utils::LicenseStatus;
use tracing::{info, warn};

// 以天為單位指定寬限期時長（例如 7 天）
let grace_period_days = 7;

match pumpkin_plugin_utils::evaluate_license(grace_period_days) {
    LicenseStatus::Valid(meta) => {
        info!("License valid for buyer (User ID: {})", meta.user_id);
    }
    LicenseStatus::GracePeriod { metadata, days_remaining, reason } => {
        warn!(
            "Running in offline grace period ({} days remaining). Reason: {}",
            days_remaining, reason
        );
    }
    LicenseStatus::Invalid(reason) => {
        return Err(format!("Plugin license invalid or tampered: {reason}").into());
    }
    LicenseStatus::Unsigned => {
        info!("Plugin is running in unsigned / development mode.");
    }
}
```

### `LicenseStatus` 列舉

| 變體 | 描述 |
| :--- | :--- |
| `LicenseStatus::Valid(PumpkinMetadata)` | 許可有效且已經驗證，或者插件為免費/開源插件。 |
| `LicenseStatus::GracePeriod { metadata, days_remaining, reason }` | 使用先前驗證過且仍在允許寬限期內的租約離線執行。 |
| `LicenseStatus::Invalid(String)` | 簽名無效、已過期、已撤銷，或元資料遭到篡改。 |
| `LicenseStatus::Unsigned` | 二進制檔案不包含市集元資料/簽名（在本地開發期間很有用）。 |

---

## 存取插件元資料

你可以在程式碼庫中的任何位置使用 `get_metadata` 或 `metadata()` 存取經過驗證的插件元資料：

```rust
if let Some(meta) = pumpkin_plugin_utils::get_metadata() {
    println!("Plugin Name: {}", meta.plugin_name);
    println!("Plugin Version: {}", meta.version);
    println!("Is Paid: {}", meta.is_paid);
    println!("License Key: {:?}", meta.license_key);
    println!("Buyer User ID: {}", meta.user_id);
    println!("Developer: {} (ID: {})", meta.dev_name, meta.dev_id);
    println!("Marketplace URL: {}", meta.marketplace_url);
    println!("Issued At: {}", meta.issued_at);
}
```

### `PumpkinMetadata` 欄位

| 欄位 | 類型 | 描述 |
| :--- | :--- | :--- |
| `plugin_name` | `String` | 插件在市集上的規範名稱。 |
| `version` | `String` | 插件二進制檔案的 SemVer 版本字符串。 |
| `plugin_id` | `i64` | 插件在市集上的唯一識別符號。 |
| `dev_id` | `i64` | 開發者帳號 ID。 |
| `dev_name` | `String` | 開發者顯示名稱。 |
| `is_paid` | `bool` | 如果這是付費/商業插件，則為 `true`。 |
| `user_id` | `i64` | 買家/被許可人的用戶 ID（免費插件為 `0`）。 |
| `license_key` | `Option<String>` | 簽發給被許可人的唯一授權金鑰。 |
| `marketplace_url` | `String` | 市集基礎 URL（`https://market.pumpkinmc.org`）。 |
| `issued_at` | `String` | 二進制檔案/許可簽發時的 ISO-8601 時間戳。 |

---

## 完整範例

下面是一個完整的插件實現，結合了初始化、線上權限檢查、離線寬限期和更新檢查：

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
            authors: vec!["Developer".into()],
            description: "A commercial Pumpkin plugin".into(),
        }
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 1. 初始化 plugin-utils（驗證 Ed25519 簽名並快取元資料）
        let meta = pumpkin_plugin_utils::init(&context).map_err(|err| {
            error!("Signature verification failed: {err}");
            format!("Security verification error: {err}")
        })?;

        info!("Loaded {} v{}", meta.plugin_name, meta.version);

        // 2. 驗證許可（離線評估和線上檢查）
        match pumpkin_plugin_utils::evaluate_license(7) {
            LicenseStatus::Valid(_) => {
                info!("Local license status: Valid");
            }
            LicenseStatus::GracePeriod { days_remaining, .. } => {
                warn!("Local license in grace period: {days_remaining} days remaining");
            }
            LicenseStatus::Unsigned => {
                info!("Running in development mode (unsigned binary)");
            }
            LicenseStatus::Invalid(reason) => {
                error!("Invalid license: {reason}");
                return Err(format!("License verification failed: {reason}").into());
            }
        }

        // 3. 如果是付費插件，則進行線上權限檢查
        if meta.is_paid {
            if let Ok(check) = pumpkin_plugin_utils::check_license_online(None) {
                if !check.valid {
                    return Err(format!("Online license rejected: {}", check.status).into());
                }
                info!("Online license check confirmed: {}", check.status);
            } else {
                warn!("Online license verification unreachable, falling back to local lease");
            }
        }

        // 4. 檢查更新
        if let Ok(update) = pumpkin_plugin_utils::check_for_updates() {
            if update.update_available {
                info!(
                    "A new version is available on the marketplace: {}",
                    update.latest_version.as_deref().unwrap_or("unknown")
                );
            }
        }

        Ok(())
    }

    fn on_unload(&self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("CommercialPlugin unloaded.");
        Ok(())
    }
}

pumpkin_plugin_api::register_plugin!(CommercialPlugin);
```

:::
