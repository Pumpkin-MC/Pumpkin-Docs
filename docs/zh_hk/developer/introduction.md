# 貢獻者文件

歡迎查閱 Pumpkin 的內部貢獻者與開發者文件！

Pumpkin 是一款完全使用現代 **Rust** 編寫的超高效能、可擴充 Minecraft 伺服器軟件。Pumpkin 從設計之初就注重並發、記憶體安全和原版保真度，同時支援 **Minecraft: Java Edition** 和 **Minecraft: Bedrock Edition**。

本節為參與 Pumpkin 伺服器核心、內部 crate 及配套工具開發的貢獻者提供全面的文件。

---

## 核心理念與設計原則

Pumpkin 建立在以下幾項基礎工程原則之上：

- **零成本抽象與極致效能**：我們利用 Rust 的零成本抽象、高效記憶體佈局和快取友好的資料結構，盡可能降低 CPU 和記憶體開銷。
- **嚴格的並發模型**：
  - **透過 Tokio 實現非同步 I/O**：網絡通訊端處理、客戶端握手、封包流式傳輸和檔案 I/O 均在非同步執行環境中高效執行。
  - **透過 Rayon 實現平行計算**：地形生成、光照計算、區塊序列化和物理計算等繁重的 CPU 密集型任務會分派到 Rayon 線程池，避免阻塞非同步網絡迴圈。
  - **線程安全通訊**：非阻塞通道（`tokio::sync::mpsc`、crossbeam）在非同步任務與線程池之間無縫協調工作。
- **可靠的質素保障與無 panic 執行**：Pumpkin 強制執行嚴格的 Clippy 規則。在生產伺服器程式碼中，panic、`unwrap()`、`expect()` 和未處理的錯誤都會在編譯階段被禁止。
- **模組化工作區架構**：各項功能清晰地劃分到職責專一的 crate 中（`pumpkin-protocol`、`pumpkin-world`、`pumpkin-inventory`、`pumpkin-command`、`pumpkin-data` 等）。每個 crate 都有明確的職責和清晰的依賴邊界。
- **協定保真度**：我們力求嚴格相容原版，同時提供 Linear 區域格式支援、基岩版跨平臺連線和多語言 WebAssembly 插件執行環境等現代功能。

---

## 文件導航

瀏覽貢獻者文件，瞭解 Pumpkin 的工作方式以及如何高效地參與貢獻：

| 章節 | 說明 |
| :--- | :--- |
| **[貢獻指南](/zh_hk/developer/contributing)** | 環境搭建、構建、測試、Clippy 規則和 PR 規範的分步說明。 |
| **[架構與 Crate](/zh_hk/developer/architecture)** | 深入介紹 Pumpkin 的多 crate 工作區結構、各 crate 的職責以及資料流。 |
| **[資料提取器](/zh_hk/developer/extractor)** | 透過我們的 Fabric 模組提取硬編碼的原版 Minecraft 註冊表、邊界框和封包結構。 |
| **[網絡概述](/zh_hk/developer/networking/)** | 核心網絡架構、傳輸方式和多版本支援。 |
| **[Java 版網絡](/zh_hk/developer/networking/java/overview)** | 協定狀態、[新增封包](/zh_hk/developer/networking/java/adding-packets)和[身份驗證](/zh_hk/developer/networking/java/authentication)。 |
| **[基岩版網絡](/zh_hk/developer/networking/bedrock/overview)** | RakNet/NetherNet 傳輸、[新增封包](/zh_hk/developer/networking/bedrock/adding-packets)、[身份驗證](/zh_hk/developer/networking/bedrock/authentication)和 [NetherNet](/zh_hk/developer/networking/bedrock/nethernet)。 |
| **[代理轉發](/zh_hk/developer/networking/proxy/)** | 為 [BungeeCord](/zh_hk/developer/networking/proxy/bungeecord)、[Velocity](/zh_hk/developer/networking/proxy/velocity) 和 [Vine](/zh_hk/developer/networking/proxy/vine) 提供安全的玩家資訊轉發。 |
| **[Query 協定](/zh_hk/developer/networking/query)** | 面向外部監控機器人和伺服器列表的 GameSpy4 UDP 查詢實現。 |
| **[方塊](/zh_hk/developer/blocks/)** | 方塊架構、方塊狀態、碰撞、屬性以及[新增方塊行為](/zh_hk/developer/blocks/adding-blocks)。 |
| **[物品](/zh_hk/developer/items/)** | 物品架構、資料元件、食物、冷卻時間以及[新增物品行為](/zh_hk/developer/items/adding-items)。 |
| **[實體與生物](/zh_hk/developer/entities/)** | 實體 trait 層次結構、[生成與追蹤](/zh_hk/developer/entities/spawning-and-tracking)，以及[生物 AI 與路徑尋找](/zh_hk/developer/entities/ai-and-mobs)。 |
| **[指令](/zh_hk/developer/commands/)** | 純 Rust 的 Brigadier 指令樹、[新增指令](/zh_hk/developer/commands/adding-commands)、[參數與建議](/zh_hk/developer/commands/arguments-and-suggestions)，以及[執行上下文](/zh_hk/developer/commands/execution-and-context)。 |
| **[插件引擎](/zh_hk/developer/plugins/)** | 內部插件引擎架構、[新增插件載入器](/zh_hk/developer/plugins/loaders)，以及 [WASM 簽名與許可](/zh_hk/developer/plugins/wasm-signing)。 |
| **[世界引擎與格式](/zh_hk/developer/world)** | 區塊載入、儲存、Anvil/Linear/Slime/Pump 格式、地形生成和光照。 |
| **[程式碼生成](/zh_hk/developer/codegen)** | `tools/pumpkin-codegen` 如何處理原版 Minecraft 資料並生成 `pumpkin-data`。 |
| **[移植 Minecraft 版本](/zh_hk/developer/porting-versions)** | 升級 Pumpkin 的端到端指南：資料提取、資源與資料包、程式碼生成、編譯器修復、新的方塊/物品/實體邏輯，以及 ViaVersion 重對映。 |
| **[流動裝置開發](/zh_hk/developer/mobile)** | 在 Android（Termux）等流動裝置環境中開發和編譯 Pumpkin。 |

---

## 插件開發與核心開發

> [!NOTE]
> 如果你希望開發用於擴充 Pumpkin 的第三方插件，而不是為伺服器本身做貢獻，請查閱專門的 **[插件開發](/zh_hk/plugin-dev/introduction)** 章節。
>
> 依託我們的 WebAssembly（Wasmtime）執行階段和 WIT 界面，Pumpkin 支援使用 **Rust**、**Python**、**C#**、**C**、**Go** 和 **Kotlin** 編寫插件。
