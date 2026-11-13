# Tổng quan Di chuyển & Kiến trúc

Chuyển từ phát triển plugin **Bukkit / Spigot / Paper** sang Pumpkin involves shifting from a Java-centric object-oriented model to a compiled, multi-language **WebAssembly (WASM)** component model.

---

Bảng dưới đây đối chiếu mô hình Bukkit/Paper truyền thống với kiến trúc WebAssembly hiện đại của Pumpkin:

| Khái niệm | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Hỗ trợ Ngôn ngữ** | Java / Kotlin / Scala (JVM) | Rust, Python, Kotlin, C#, Go, C |
| **Đầu ra Nhị phân** | `.jar` Java Archive | `.wasm` WebAssembly Component |
| **Mô tả Plugin** | File `plugin.yml` | Cấu trúc `PluginMetadata` theo chương trình |
| **Lifecycle Hooks** | `onEnable()` / `onDisable()` | `on_load(context)` / `on_unload(context)` |
| **Bảo mật & Cô lập** | JVM Reflection không giới hạn | Mô hình capability WASM được sandbox |
| **Đồng thời** | Vòng lặp tick đơn luồng (`BukkitScheduler`) | Thực thi native đa luồng với Async runtime |

---

## Các Chủ đề Di chuyển Chi tiết

Khám phá các hướng dẫn chuyên biệt về việc di chuyển từng hệ thống plugin chính:

- [Di chuyển Lệnh](./commands) — Chuyển từ `getCommand().setExecutor()` và `plugin.yml` sang cây lệnh Brigadier.
- [Di chuyển Sự kiện](./events) — Thay thế `@EventHandler` và giao diện `Listener` bằng hệ thống sự kiện blocking vs. non-blocking của Pumpkin.
- [Di chuyển Kho đồ & GUI](./inventories) — Chuyển từ `Bukkit.createInventory()` sang các container và window handlers của Pumpkin.
- [Di chuyển Cấu hình & Dữ liệu](./configuration) — Thay thế `getConfig()` / `config.yml` bằng TOML, JSON, hoặc lưu trữ tùy chỉnh native.
