# 从 Bukkit 迁移配置与数据存储

Bukkit 插件严重依赖 `config.yml`、`YamlConfiguration` 以及 Bukkit 的配置序列化系统。

而在 Pumpkin 中，WebAssembly 插件运行在安全的沙箱环境中，可以使用 **TOML**、**JSON** 或 **YAML** 等标准格式以原生方式处理配置文件。

---

## 核心差异

| 特性 | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **配置文件格式** | `config.yml`（YAML 格式） | 灵活多样：TOML、JSON 或自定义文件 |
| **默认配置生成** | `saveDefaultConfig()` | 从插件目录或嵌入式 WASM 资源中读取配置 |
| **数据解析** | `getConfig().getString(...)` | 原生 serde / JSON / TOML 反序列化 |
| **文件 I/O 沙箱** | 可在任何位置直接访问文件系统 | 授予 WASM 插件沙箱化的目录访问权限 |

---

## 代码对比：加载配置

### 1. Bukkit 实现 (Java)

```java [ConfigExample.java]
public class ConfigExample extends JavaPlugin {
    @Override
    public void onEnable() {
        saveDefaultConfig(); // Saves config.yml from jar resources
        FileConfiguration config = getConfig();

        String welcomeMsg = config.getString("welcome-message", "Default welcome!");
        int maxItems = config.getInt("max-items", 10);
        getLogger().info("Loaded message: " + welcomeMsg);
    }
}
```

### 2. Pumpkin 实现 (Rust)

在 Pumpkin 中，可以通过派生 `serde::Deserialize` 来解析简洁的 TOML 配置文件：

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
