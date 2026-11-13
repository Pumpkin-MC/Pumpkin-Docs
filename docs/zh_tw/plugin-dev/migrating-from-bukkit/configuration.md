# 遷移設定與資料儲存

Bukkit 插件高度依賴 `config.yml`、`YamlConfiguration` 和 Bukkit 設定序列化系統。

在 Pumpkin 中，WebAssembly 插件執行在安全的沙箱環境中，可以使用 **TOML**、**JSON** 或 **YAML** 等標準格式以原生方式處理設定檔案。

---

## 主要區別

| 功能 | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **設定檔案格式** | `config.yml`（YAML 格式） | 靈活選擇：TOML、JSON 或自訂檔案 |
| **預設設定生成** | `saveDefaultConfig()` | 從插件目錄或內嵌的 WASM 資源讀取設定 |
| **資料解析** | `getConfig().getString(...)` | 原生 serde / JSON / TOML 反序列化 |
| **檔案 I/O 沙箱** | 可直接存取檔案系統中的任何位置 | 向 WASM 插件授予沙箱化目錄存取權限 |

---

## 程式碼對比：載入設定

### 1. Bukkit 實現（Java）

```java [ConfigExample.java]
public class ConfigExample extends JavaPlugin {
    @Override
    public void onEnable() {
        saveDefaultConfig(); // 從 jar 資源儲存 config.yml
        FileConfiguration config = getConfig();

        String welcomeMsg = config.getString("welcome-message", "Default welcome!");
        int maxItems = config.getInt("max-items", 10);
        getLogger().info("Loaded message: " + welcomeMsg);
    }
}
```

### 2. Pumpkin 實現（Rust）

在 Pumpkin 中，你可以派生 `serde::Deserialize` 來解析簡潔的 TOML 設定檔案：

```rust [config.rs]
use serde::Deserialize;
use std::fs;

#[derive(Deserialize, Debug)]
pub struct PluginConfig {
    pub welcome_message: String,
    pub max_items: i32,
}

impl Default for PluginConfig {
    fn default() -> Self {
        Self {
            welcome_message: "Default welcome!".to_string(),
            max_items: 10,
        }
    }
}

pub fn load_config() -> PluginConfig {
    let config_path = "plugins/my_plugin/config.toml";
    if let Ok(content) = fs::read_to_string(config_path) {
        toml::from_str(&content).unwrap_or_default()
    } else {
        PluginConfig::default()
    }
}
```
