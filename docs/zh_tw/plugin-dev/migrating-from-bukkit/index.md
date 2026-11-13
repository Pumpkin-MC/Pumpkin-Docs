# 遷移概述與架構

從 **Bukkit / Spigot / Paper** 插件開發遷移到 Pumpkin，意味著從以 Java 為中心的物件導向模型轉變為編譯型的多語言 **WebAssembly（WASM）** 元件模型。

---

下表對比了傳統 Bukkit/Paper 範式與 Pumpkin 現代 WebAssembly 架構：

| 概念 | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **語言支援** | Java / Kotlin / Scala（JVM） | Rust、Python、Kotlin、C#、Go、C |
| **二進位輸出** | `.jar` Java 歸檔檔案 | `.wasm` WebAssembly 元件 |
| **插件描述符** | `plugin.yml` 檔案 | 以程式設計方式定義的 `PluginMetadata` 結構 |
| **生命週期鉤子** | `onEnable()` / `onDisable()` | `on_load(context)` / `on_unload(context)` |
| **安全性與隔離** | 不受限制的 JVM 反射 | 沙箱化 WASM 能力模型 |
| **併發** | 單執行緒 tick 迴圈（`BukkitScheduler`） | 帶有非同步執行環境的多執行緒原生執行 |

---

## 詳細遷移主題

瀏覽有關遷移各個主要插件子系統的專門指南：

- [遷移指令](./commands)——從 `getCommand().setExecutor()` 和 `plugin.yml` 過渡到 Brigadier 指令樹。
- [遷移事件](./events)——用 Pumpkin 的阻塞與非阻塞事件系統替換 `@EventHandler` 和 `Listener` 介面。
- [遷移物品欄與 GUI](./inventories)——從 `Bukkit.createInventory()` 遷移到 Pumpkin 容器和視窗處理器。
- [遷移設定與資料](./configuration)——用原生 TOML、JSON 或自訂儲存替換 `getConfig()` / `config.yml`。
