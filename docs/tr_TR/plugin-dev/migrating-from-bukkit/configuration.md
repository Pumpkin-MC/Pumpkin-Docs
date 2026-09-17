# Yapılandırma ve Veri Depolamayı Taşıma

Bukkit eklentileri büyük ölçüde `config.yml`, `YamlConfiguration` ve Bukkit yapılandırma serileştirme sistemine dayanır.

Pumpkin'da ise WebAssembly eklentileri; yapılandırma dosyalarının **TOML**, **JSON** veya **YAML** gibi standart formatlar kullanılarak yerel olarak işlenebildiği güvenli bir yalıtılmış ortamda (sandbox) çalışır.

---

## Temel Farklar

| Özellik | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Yapılandırma Dosyası Formatı** | `config.yml` (YAML formatı) | Esnek: TOML, JSON veya özel dosyalar |
| **Varsayılan Yapılandırma Oluşturma** | `saveDefaultConfig()` | Eklenti dizininden veya gömülü WASM varlığından yapılandırmayı okuma |
| **Veri Ayrıştırma (Parsing)** | `getConfig().getString(...)` | Yerel serde / JSON / TOML seri durumdan çıkarma (deserialization) |
| **Dosya G/Ç Yalıtımı (Sandboxing)** | Herhangi bir konuma doğrudan dosya sistemi erişimi | WASM eklentisine tanınan yalıtılmış dizin erişimi |

---

## Kod Karşılaştırması: Yapılandırma Yükleme

### 1. Bukkit Uygulaması (Java)

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

### 2. Pumpkin Uygulaması (Rust)

Pumpkin'da, temiz TOML yapılandırma dosyalarını ayrıştırmak için `serde::Deserialize` türetmesi yapabilirsiniz:

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
