# 迁移配置与数据存储

Bukkit 插件高度依赖 `config.yml`、`YamlConfiguration` 和 Bukkit 配置序列化系统。

在 Pumpkin 中，WebAssembly 插件运行在安全的沙箱环境中，可以使用 **TOML**、**JSON** 或 **YAML** 等标准格式以原生方式处理配置文件。

---

## 主要区别

| 功能 | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **配置文件格式** | `config.yml`（YAML 格式） | 灵活选择：TOML、JSON 或自定义文件 |
| **默认配置生成** | `saveDefaultConfig()` | 从插件目录或内嵌的 WASM 资源读取配置 |
| **数据解析** | `getConfig().getString(...)` | 原生 serde / JSON / TOML 反序列化 |
| **文件 I/O 沙箱** | 可直接访问文件系统中的任何位置 | 向 WASM 插件授予沙箱化目录访问权限 |

---

## 代码对比：加载配置

### 1. Bukkit 实现（Java）

```java [ConfigExample.java]
public class ConfigExample extends JavaPlugin {
    @Override
    public void onEnable() {
        saveDefaultConfig(); // 从 jar 资源保存 config.yml
        FileConfiguration config = getConfig();

        String welcomeMsg = config.getString("welcome-message", "Default welcome!");
        int maxItems = config.getInt("max-items", 10);
        getLogger().info("Loaded message: " + welcomeMsg);
    }
}
```

### 2. Pumpkin 实现（Rust）

在 Pumpkin 中，您可以派生 `serde::Deserialize` 来解析简洁的 TOML 配置文件：

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
