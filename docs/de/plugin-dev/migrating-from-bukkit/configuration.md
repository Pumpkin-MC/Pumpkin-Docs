# Konfiguration & Datenspeicherung von Bukkit migrieren

Bukkit-Plugins stützen sich stark auf `config.yml`, `YamlConfiguration` und das Serialisierungssystem von Bukkit.

In Pumpkin laufen WebAssembly-Plugins in einer sicheren Sandbox-Umgebung, in der Konfigurationsdateien nativ über Standardformate wie **TOML**, **JSON** oder **YAML** verarbeitet werden können.

---

## Wesentliche Unterschiede

| Merkmal | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Konfigurationsdateiformat** | `config.yml` (YAML-Format) | Flexibel: TOML, JSON oder eigene Dateien |
| **Generierung von Standard-Konfigurationen** | `saveDefaultConfig()` | Lesen der Konfiguration aus dem Plugin-Verzeichnis oder eingebetteten WASM-Assets |
| **Daten-Parsing** | `getConfig().getString(...)` | Native Deserialisierung über Serde / JSON / TOML |
| **Dateisystem-Sandboxing** | Beliebiger direkter Dateisystemzugriff | Dem WASM-Plugin zugewiesener, isolierter Verzeichniszugriff |

---

## Code-Vergleich: Laden der Konfiguration

### 1. Bukkit-Implementierung (Java)

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

### 2. Pumpkin-Implementierung (Rust)

In Pumpkin kannst du `serde::Deserialize` ableiten, um saubere TOML-Konfigurationsdateien einzulesen:

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
