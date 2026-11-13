# 插件引擎架構

Pumpkin 提供模組化、多執行環境的插件引擎，設計目標是效能、安全性和跨語言互操作性。

不同於依賴單一 JVM 類別載入器的傳統 Minecraft 伺服器，Pumpkin 透過專用載入器隔離插件執行，同時支援**原生高效能 Rust 二進制檔案**和由 Rust、Python、C#、C、Go 或 Kotlin 編譯而來的**沙盒化 WebAssembly 元件**。

---

## 架構概覽

### 架構組成

| 子系統 | 主要 Crate | 職責 |
| :--- | :--- | :--- |
| **插件管理器** | `crates/pumpkin/src/plugin` | 生命週期編排（載入、啟用、停用）、事件分派和載入器註冊 |
| **原生載入器** | `crates/pumpkin/src/plugin/loader/native` | 直接載入動態程式庫（`.so`、`.dll`、`.dylib`），用於零開銷 Rust 擴充 |
| **WASM 載入器** | `crates/pumpkin/src/plugin/loader/wasm` | 用於 Rust、Python、Go、C#、C 和 Kotlin 編譯沙盒元件的 Wasmtime 執行引擎 |
| **界面規範** | `crates/pumpkin-plugin-wit` | 定義類型化函數、類型和主機匯入的 WebAssembly Interface Types（WIT） |
| **安全與驗證** | `crates/pumpkin/src/plugin/loader/wasm/sign` | 基於 W3C wasmsign2 / Ed25519 公鑰的加密簽名驗證 |

---

## 雙執行模型

| 特性 | 原生插件 | WebAssembly（Wasmtime）插件 |
| :--- | :--- | :--- |
| **副檔名** | `.so`（Linux）、`.dll`（Windows）、`.dylib`（macOS） | `.wasm`（元件模型） |
| **語言** | Rust（動態編譯） | Rust、Python、C#、C、Go、Kotlin |
| **效能** | 原生 CPU 執行（零開銷） | JIT 編譯，接近原生速度 |
| **沙盒** | 無（在主機位址空間執行） | 記憶體隔離的沙盒執行 |
| **安全與簽名** | 作業系統級權限 | 加密 W3C Wasm-Sign 驗證 |
| **熱卸載** | 受限（受作業系統共享程式庫約束） | 完全支援記憶體回收 |

---

## 事件生命週期與分派

插件主要透過事件與 Pumpkin 互動：

1. **事件分派**：
   - `server.plugin_manager.fire_blocking(&server, &mut event)`：在執行線程上同步分派事件（例如取消玩家放置方塊或修改封包負載）。
   - 非同步事件執行在非阻塞 Tokio 任務上。
2. **可取消事件**：
   - 處理器可以設定 `event.cancelled = true`，以中止預設遊戲邏輯（例如取消玩家移動、互動或封包處理）。

---

## 插件引擎文件

深入瞭解 Pumpkin 插件系統的內部機制：

- **[新增插件載入器](/zh_hk/developer/plugins/loaders)**：為新的指令碼語言和執行階段實現 `PluginLoader` trait 的分步指南。
- **[WASM 簽名與驗證](/zh_hk/developer/plugins/wasm-signing)**：Ed25519 加密簽名、W3C `wasmsign2` 自訂節和市集授權驗證的詳細規範。

> [!NOTE]
> 如果你希望開發第三方插件，而不是修改 Pumpkin 內部插件引擎，請查閱 **[插件開發指南](/zh_hk/plugin-dev/introduction)**。
