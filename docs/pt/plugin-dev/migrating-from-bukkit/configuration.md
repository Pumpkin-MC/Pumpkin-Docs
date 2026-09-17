# Migrando Configuração e Armazenamento de Dados

Plugins Bukkit dependem fortemente de `config.yml`, `YamlConfiguration` e do sistema de serialização de configuração do Bukkit.

No Pumpkin, plugins WebAssembly rodam em um ambiente de sandbox seguro onde arquivos de configuração podem ser manipulados nativamente usando formatos padrão como **TOML**, **JSON** ou **YAML**.

---

## Principais Diferenças

| Recurso | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Formato do Arquivo de Configuração** | `config.yml` (formato YAML) | Flexível: TOML, JSON ou arquivos personalizados |
| **Geração de Configuração Padrão** | `saveDefaultConfig()` | Leitura de configuração a partir do diretório do plugin ou recurso WASM integrado |
| **Análise (Parsing) de Dados** | `getConfig().getString(...)` | Desserialização nativa com serde / JSON / TOML |
| **Sandbox de E/S de Arquivos (File I/O)** | Acesso direto ao sistema de arquivos em qualquer lugar | Acesso restrito em sandbox a diretórios concedido ao plugin WASM |

---

## Comparação de Código: Carregando Configuração

### 1. Implementação no Bukkit (Java)

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

### 2. Implementação no Pumpkin (Rust)

No Pumpkin, você pode derivar `serde::Deserialize` para analisar arquivos de configuração TOML limpos:

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
