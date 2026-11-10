# Di chuyển Cấu hình & Lưu trữ Dữ liệu

Các plugin Bukkit phụ thuộc nhiều vào `config.yml`, `YamlConfiguration`, và hệ thống serialize cấu hình của Bukkit.

Trong Pumpkin, các plugin WebAssembly chạy trong môi trường sandbox bảo mật nơi các file cấu hình có thể được xử lý native bằng các định dạng chuẩn như **TOML**, **JSON**, hoặc **YAML**.

---

## Các Khác biệt Chính

| Tính năng | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Định dạng File Cấu hình** | `config.yml` (định dạng YAML) | Linh hoạt: TOML, JSON, hoặc file tùy chỉnh |
| **Tạo Cấu hình Mặc định** | `saveDefaultConfig()` | Đọc cấu hình từ thư mục plugin hoặc asset WASM nhúng |
| **Phân tích Dữ liệu** | `getConfig().getString(...)` | Deserialize serde / JSON / TOML native |
| **Sandboxing File I/O** | Truy cập filesystem trực tiếp ở mọi nơi | Truy cập thư mục sandbox được cấp cho plugin WASM |

---

## So sánh Code: Tải Cấu hình

### 1. Triển khai Bukkit (Java)

```java [ConfigExample.java]
public class ConfigExample extends JavaPlugin {
    @Override
    public void onEnable() {
        saveDefaultConfig(); // Lưu config.yml từ jar resources
        FileConfiguration config = getConfig();

        String welcomeMsg = config.getString("welcome-message", "Default welcome!");
        int maxItems = config.getInt("max-items", 10);
        getLogger().info("Loaded message: " + welcomeMsg);
    }
}
```

### 2. Triển khai Pumpkin (Rust)

Trong Pumpkin, bạn có thể sử dụng `serde::Deserialize` để phân tích các file cấu hình TOML sạch:

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
