# 许可与更新（`pumpkin-plugin-utils`）

`pumpkin-plugin-utils` 是面向 Pumpkin Rust 插件的官方实用工具 crate。它提供内置工具，用于针对 [Pumpkin Marketplace](https://market.pumpkinmc.org) 进行**许可检查**、**加密签名验证**和**更新检查**。

## 功能

- **离线 Ed25519 签名验证**：启动时在 `< 1ms` 内验证插件完整性和内嵌的市场元数据，且不会阻塞服务器。
- **全局元数据缓存**：在插件的 `on_load` 生命周期方法中调用一次 `init(&context)`，即可全局缓存经过验证的元数据。
- **在线许可验证**：查询市场的 `/api/v1/rest/check-license` 端点，并自动缓存 7 天租约（`license_lease.json`）。
- **离线宽限期**：可靠的离线租约评估可确保插件在市场维护或网络中断期间继续工作。
- **零参数更新检查**：轻松检查市场上是否有更新的插件版本。
- **动态公钥解析**：通过宿主 WIT 导入或 HTTPS 回退动态解析市场公钥，无需硬编码密钥。

---

## 添加依赖项

在插件的 `Cargo.toml` 中，将 `pumpkin-plugin-utils` 与 `pumpkin-plugin-api` 一并添加：

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

在执行许可或更新检查之前，请在插件的 `on_load` 方法中使用插件的 `Context` 初始化该实用工具 crate：

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
        // 初始化 pumpkin-plugin-utils（验证签名并缓存元数据）
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

::: info `init` 期间会发生什么？
1. 在服务器目录中找到插件的 `.wasm` 二进制文件。
2. 提取 `pumpkin.metadata` 和 `wasm_signature` 自定义节。
3. 以加密方式验证 WASM 二进制文件和元数据的 Ed25519 签名。
4. 全局缓存经过验证的 `PumpkinMetadata`，供后续调用使用。
:::

---

## 检查更新

`pumpkin-plugin-utils` 既支持零参数自动检查，也支持自定义手动检查。

### 1. 自动更新检查（推荐）

初始化后，不带参数调用 `pumpkin_plugin_utils::check_for_updates()`。它会自动使用缓存的插件名称、当前版本和市场端点：

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

### 2. 手动更新检查（`UpdateChecker`）

如果您想手动指定插件名称、版本或自定义市场 URL，请使用 `UpdateChecker`：

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

### 更新响应结构

更新检查会返回一个 `CheckUpdateResponse`：

```rust
pub struct CheckUpdateResponse {
    /// 市场上是否存在更新的稳定版本。
    pub update_available: bool,
    /// 最新的稳定版本字符串（如果有）。
    pub latest_version: Option<String>,
}
```

---

## 检查并验证许可

`pumpkin-plugin-utils` 支持通过市场 API 进行在线验证，也支持具有可配置宽限期的离线租约管理。

### 1. 在线许可检查

要通过市场验证许可（`GET /api/v1/rest/check-license`）：

```rust
// 传递 `None` 以使用元数据中内嵌的许可密钥
let response = pumpkin_plugin_utils::check_license_online(None)
    .map_err(|e| format!("License verification failed: {e}"))?;

if response.valid {
    info!("License is valid (status: {})", response.status);
} else {
    warn!("License is invalid: {}", response.status);
    return Err(format!("Invalid license status: {}", response.status).into());
}
```

#### 提供自定义许可密钥覆盖值
如果您的插件允许服务器所有者在 `config.toml` 文件中配置许可密钥，请传递 `Some(&key)`：

```rust
let config_key = "LIC-CUSTOM-KEY-12345";
let response = pumpkin_plugin_utils::check_license_online(Some(config_key))?;
```

::: tip 7 天租约缓存
在线检查成功后，会自动将经过验证的租约文件（`license_lease.json`）保存到插件的数据文件夹中，有效期为 7 天。
:::

### 2. 使用宽限期评估许可

要在服务器离线或无法访问市场时让付费插件保持可用，请使用 `evaluate_license`：

```rust
use pumpkin_plugin_utils::LicenseStatus;
use tracing::{info, warn};

// 以天为单位指定宽限期时长（例如 7 天）
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

### `LicenseStatus` 枚举

| 变体 | 描述 |
| :--- | :--- |
| `LicenseStatus::Valid(PumpkinMetadata)` | 许可有效且已经验证，或者插件为免费/开源插件。 |
| `LicenseStatus::GracePeriod { metadata, days_remaining, reason }` | 使用先前验证过且仍在允许宽限期内的租约离线运行。 |
| `LicenseStatus::Invalid(String)` | 签名无效、已过期、已撤销，或元数据遭到篡改。 |
| `LicenseStatus::Unsigned` | 二进制文件不包含市场元数据/签名（在本地开发期间很有用）。 |

---

## 访问插件元数据

您可以在代码库中的任何位置使用 `get_metadata` 或 `metadata()` 访问经过验证的插件元数据：

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

### `PumpkinMetadata` 字段

| 字段 | 类型 | 描述 |
| :--- | :--- | :--- |
| `plugin_name` | `String` | 插件在市场上的规范名称。 |
| `version` | `String` | 插件二进制文件的 SemVer 版本字符串。 |
| `plugin_id` | `i64` | 插件在市场上的唯一标识符。 |
| `dev_id` | `i64` | 开发者账户 ID。 |
| `dev_name` | `String` | 开发者显示名称。 |
| `is_paid` | `bool` | 如果这是付费/商业插件，则为 `true`。 |
| `user_id` | `i64` | 买家/被许可人的用户 ID（免费插件为 `0`）。 |
| `license_key` | `Option<String>` | 签发给被许可人的唯一许可密钥。 |
| `marketplace_url` | `String` | 市场基础 URL（`https://market.pumpkinmc.org`）。 |
| `issued_at` | `String` | 二进制文件/许可签发时的 ISO-8601 时间戳。 |

---

## 完整示例

下面是一个完整的插件实现，结合了初始化、在线许可检查、离线宽限期和更新检查：

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
        // 1. 初始化 plugin-utils（验证 Ed25519 签名并缓存元数据）
        let meta = pumpkin_plugin_utils::init(&context).map_err(|err| {
            error!("Signature verification failed: {err}");
            format!("Security verification error: {err}")
        })?;

        info!("Loaded {} v{}", meta.plugin_name, meta.version);

        // 2. 验证许可（离线评估和在线检查）
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

        // 3. 如果是付费插件，则进行在线许可检查
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

        // 4. 检查更新
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
