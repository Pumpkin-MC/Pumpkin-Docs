# 管理員概述

歡迎來到面向 Pumpkin 伺服器管理員的**管理員指南**。Pumpkin 是一款使用 Rust 編寫的高效能、多線程 Minecraft 伺服器，旨在以極低的資源消耗支援海量並發玩家。

---

## 伺服器管理員核心特性

- **極致多線程**：專為現代多核處理器從底層設計打造。
- **WASM 插件架構**：安全、沙箱化的插件執行環境，支援使用 Rust、Python、Kotlin、C#、Go 或 C 開發，無 JVM 開銷。
- **原生跨代理支援**：開箱即用支援 Velocity、BungeeCord 及現代代理轉發。
- **基於 TOML 的設定**：清晰、人類可讀的設定檔案，位於 `pumpkin.toml` 及各特定功能的 TOML 設定檔案中。

---

## 管理員指南與主題

探索以下管理指南：

- [從 Bukkit / Paper / Spigot 伺服器遷移](./migrating-from-bukkit) — 伺服器管理、插件、世界儲存和效能方面的核心差異。
- [伺服器設定](../config/introduction) — `pumpkin.toml` 設定的詳細分解說明。
- [代理設定](../config/proxy) — 設定 BungeeCord 與 Velocity 玩家轉發。
- [指令與權限](../config/commands) — 管理遊戲內管理員指令與權限。
- [身份驗證](../config/authentication) — 正版線上模式與離線模式以及 Yggdrasil 設定。
- [故障排除與常見問題](../troubleshooting/common_issues) — 解決端口綁定、記憶體以及插件載入問題。
