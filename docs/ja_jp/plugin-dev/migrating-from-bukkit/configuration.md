# Migrating Configuration & Data Storage

Bukkit plugins heavily rely on `config.yml`, `YamlConfiguration`, and the Bukkit configuration serializing system.

In Pumpkin, WebAssembly plugins run in a secure sandbox environment where configuration files can be handled natively using standard formats like **TOML**, **JSON**, or **YAML**.

---

## Key Differences

| Feature | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Config File Format** | `config.yml` (YAML format) | Flexible: TOML, JSON, or custom files |
| **Default Config Generation** | `saveDefaultConfig()` | Reading config from plugin directory or embedded WASM asset |
| **Data Parsing** | `getConfig().getString(...)` | Native serde / JSON / TOML deserialization |
| **File I/O Sandboxing** | Direct filesystem access anywhere | Sandboxed directory access granted to WASM plugin |

---

## Code Comparison: Loading Configuration

### 1. Bukkit Implementation (Java)

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

### 2. Pumpkin Implementation (Rust)

In Pumpkin, you can derive `serde::Deserialize` to parse clean TOML configuration files:

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
