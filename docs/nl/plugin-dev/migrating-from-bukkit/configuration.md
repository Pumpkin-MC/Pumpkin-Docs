# Configuratie & Gegevensopslag migreren

Bukkit-plugins leunen sterk op `config.yml`, `YamlConfiguration` en het serialisatiesysteem van Bukkit-configuraties.

In Pumpkin draaien WebAssembly-plugins in een veilige sandboxomgeving waar configuratiebestanden native kunnen worden afgehandeld met behulp van standaardformaten zoals **TOML**, **JSON** of **YAML**.

---

## Belangrijkste verschillen

| Functie | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Configuratiebestandsformaat** | `config.yml` (YAML-formaat) | Flexibel: TOML, JSON of aangepaste bestanden |
| **Standaardconfiguratie genereren** | `saveDefaultConfig()` | Configuratie lezen uit de pluginmap of ingesloten WASM-asset |
| **Gegevens parsen** | `getConfig().getString(...)` | Native serde- / JSON- / TOML-deserialisatie |
| **Bestands-I/O sandboxing** | Directe toegang tot het bestandssysteem overal | Gesandboxte maptoegang verleend aan de WASM-plugin |

---

## Codevergelijking: Configuratie laden

### 1. Bukkit-implementatie (Java)

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

### 2. Pumpkin-implementatie (Rust)

In Pumpkin kun je `serde::Deserialize` afleiden om overzichtelijke TOML-configuratiebestanden te parsen:

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
