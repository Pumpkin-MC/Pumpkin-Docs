# Pumpkin 架構與 Crate

Pumpkin 採用模組化 Cargo 工作區組織，由多個專用 crate 組成。每個 crate 都有明確的職責、嚴格定義的邊界和盡可能少的交叉依賴。

這種架構能夠實現高速並行編譯、隔離測試和零成本資料共享，並使網路協定、遊戲邏輯與世界管理之間保持清晰的分離。

---

## 工作區 Crate 概覽

### 工作區架構一覽

| 層級 | Crate | 職責 |
| :--- | :--- | :--- |
| **核心執行階段** | `pumpkin` | 遊戲迴圈、world tick 更新、玩家會話、實體管理和事件迴圈 |
| **網路與協定** | `pumpkin-protocol`、`pumpkin-auth`、`pumpkin-nbt` | Java 版/基岩版封包序列化、Yggdrasil 與 Xbox Live 身分驗證、SNBT |
| **世界與遊戲玩法** | `pumpkin-world`、`pumpkin-inventory`、`pumpkin-command` | 區域 I/O（Anvil/Linear）、地形生成、方塊 tick 更新、容器、Brigadier 指令樹 |
| **可擴充性** | `pumpkin-plugin-runtime`、`pumpkin-host-bindings`、`pumpkin-plugin-api`、`pumpkin-plugin-wit` | 透過 Wasmtime 執行 WebAssembly 插件、WIT 主機 API、原生與 WASM 載入器 |
| **基礎設施** | `pumpkin-data`、`pumpkin-config`、`pumpkin-util` | 程式碼生成的註冊表、型別化設定檔案、數學向量、權限 |

---

## 各 Crate 詳細說明

### 1. `pumpkin`（核心伺服器）
- **路徑**：`crates/pumpkin`
- **用途**：主伺服器二進位程式和集中式編排引擎。
- **職責**：
  - 初始化設定、日誌記錄（`tracing`）和遙測。
  - 為 Minecraft: Java Edition、Minecraft: Bedrock Edition、RCON、Query 和 LAN 廣播啟動 Tokio 網路監聽器。
  - 管理server tick 迴圈（`Server::tick`），協調世界更新、玩家操作、實體移動和區塊廣播。
  - 透過 `crates/pumpkin/src/net/java/` 和 `net/bedrock/` 分派傳入的用戶端封包。
  - 整合插件管理器，在封包處理前後觸發事件處理器。

### 2. `pumpkin-protocol`（網路協定）
- **路徑**：`crates/pumpkin-protocol`
- **用途**：為 Minecraft Java 版和基岩版提供高速網路傳輸格式序列化與反序列化。
- **職責**：
  - 實現 `ClientPacket`（序列化）和 `ServerPacket`（反序列化）trait。
  - 處理協定基礎型別：`VarInt`、`VarLong`、UUID、NBT 複合標籤和字串編解碼器。
  - 實現所有狀態下的封包：`Handshake`、`Status`、`Login`、`Config` 和 `Play`。
  - 提供封包壓縮（ZLib/Fast 壓縮）和封包加密（AES-128/CFB8）。
  - 封裝 RCON 和 GameSpy4 Query 協定。

### 3. `pumpkin-world`（世界與區塊）
- **路徑**：`crates/pumpkin-world`
- **用途**：世界載入、儲存、地形生成和區塊管理。
- **職責**：
  - 支援多種區塊儲存格式：
    - **原版 Anvil（`.mca`）**：讀取和寫入標準區域檔案。
    - **Linear（`.linear`）**：採用 zstd 壓縮的高效區域格式，可節省 50–95% 的磁碟空間。
    - **Slime（`.slime`）**：單檔案世界格式。
    - **Pump**：Pumpkin 原生區塊儲存格式。
  - 實現世界生成管線：Perlin 噪聲高度圖、3D 噪聲路由器、生物群系氣候引數、已放置地物、雕刻器和超平坦地形。
  - 管理方塊光照和天空光照的傳播。
  - 透過圓柱形區塊迭代器協調區塊載入、解除安裝和流式傳輸。

### 4. `pumpkin-data`（Minecraft 資料集與註冊表）
- **路徑**：`crates/pumpkin-data`
- **用途**：直接根據原版 Minecraft 資源和報告生成的編譯階段靜態註冊表與資料表。
- **職責**：
  - 包含方塊、物品、生物群系、實體、聲音、粒子、附魔和配方的完整 ID 對映、屬性與定義。
  - 跨多個 Minecraft 協定版本查詢封包 ID。
  - 由 `tools/pumpkin-codegen` 生成的零成本查詢表。

### 5. `pumpkin-config`（設定管理）
- **路徑**：`crates/pumpkin-config`
- **用途**：TOML 設定解析、序列化和驗證。
- **職責**：
  - 載入和寫入 `pumpkin.toml`。
  - 設定伺服器埠、壓縮閾值、代理模式、資源包、日誌級別、世界設定和基岩版整合。
  - 提供安全的預設值和模式驗證。

### 6. `pumpkin-inventory`（物品欄與容器）
- **路徑**：`crates/pumpkin-inventory`
- **用途**：服務端容器視窗處理器和物品欄機制。
- **職責**：
  - 管理玩家物品欄、箱子容器、工作臺、熔爐和村民交易介面。
  - 驗證用戶端的欄位點選、拖動操作、物品堆疊和物品拆分。
  - 協調視窗封包同步，確保用戶端物品欄與服務端一致。

### 7. `pumpkin-command`（指令分派器）
- **路徑**：`crates/pumpkin-command`
- **用途**：受 Brigadier 啟發的分層指令樹分派器和解析器。
- **職責**：
  - 使用型別化引數（`Integer`、`Float`、`Entity`、`BlockPos` 等）建構模組化指令樹。
  - 執行經過權限檢查的指令。
  - 向已連線的用戶端提供即時自動自動完成建議。

### 8. `pumpkin-auth`（身分驗證與會話校驗）
- **路徑**：`crates/pumpkin-auth`
- **用途**：加密身分驗證和玩家身分核驗。
- **職責**：
  - 透過 Mojang 的 Yggdrasil 身分驗證伺服器驗證用戶端會話。
  - 處理登入狀態下的 RSA 金鑰對生成和共享金鑰交換。
  - 支援離線模式 UUID 生成和自訂身分驗證端點。
  - 實現代理轉發協定：[BungeeCord](https://github.com/SpigotMC/BungeeCord)、[BungeeGuard](https://github.com/lucko/BungeeGuard)，以及使用 HMAC-SHA256 簽名的 [Velocity](https://github.com/PaperMC/Velocity) 現代轉發。

### 9. `pumpkin-nbt`（命名二進位標籤編解碼器）
- **路徑**：`crates/pumpkin-nbt`
- **用途**：高吞吐量二進位 NBT 解析器和序列化器。
- **職責**：
  - 解析和編碼所有標準 NBT 標籤型別（`Byte`、`Short`、`Int`、`Long`、`Float`、`Double`、`ByteArray`、`String`、`List`、`Compound`、`IntArray`、`LongArray`）。
  - 支援 Gzip、Zlib 壓縮層以及未壓縮的網路 NBT。

### 10. `pumpkin-plugin-*`（可擴充性基礎設施）
- **路徑**：
  - `crates/pumpkin-plugin-api`：用於編譯原生插件的 Rust 開發者 SDK。
  - `crates/pumpkin-plugin-runtime`：由 Wasmtime 驅動的 WebAssembly 執行主機。
  - `crates/pumpkin-plugin-wit`：WebAssembly 介面型別（WIT）規範。
  - `crates/pumpkin-host-bindings`：連線 Wasmtime 與伺服器核心的自動生成主機綁定。
- **用途**：透過沙箱記憶體和接近原生的效能，實現安全的多語言插件執行（Rust、Python、C#、C、Go、Kotlin）。

### 11. `pumpkin-util` 與 `pumpkin-macros`（基礎設施）
- **路徑**：`crates/pumpkin-util`、`crates/pumpkin-macros`、`crates/pumpkin-api-macros`
- **用途**：基礎型別、共享演算法和過程巨集。
- **職責**：
  - 數學工具：`Vector2`、`Vector3`、`BoundingBox` 和角度轉換。
  - 文字與聊天格式化：`TextComponent` 和 JSON 元件序列化。
  - `#[java_packet(...)]` 等過程巨集，用於將封包結構綁定到協定 ID 和封包 trait。

### 12. `tools/`（開發者工具）
- **`tools/pumpkin-codegen`**：自動程式碼生成器，解析 Minecraft 版本 JAR、資料報告和資源歸檔，並將 Rust 原始檔輸出到 `pumpkin-data`。
- **`tools/pumpkin-fuzzer`**：針對網路封包解析器、NBT 讀取器和區域檔案解碼器的模糊測試套件，用於發現潛在的崩潰途徑或記憶體異常。

---

## 併發與執行緒模型

| 元件 | 執行階段/執行緒池 | 主要工作負載 | 通訊機制 |
| :--- | :--- | :--- | :--- |
| **網路與通訊端 I/O** | Tokio 非同步執行環境 | TCP 封包讀取、基岩版 UDP 封包、幀處理、會話握手 | 非同步任務（`tokio::spawn`）、非阻塞反應器 |
| **繁重計算** | Rayon 執行緒池 | 地形生成、噪聲路由器、光照傳播、區塊壓縮 | 透過 crossbeam/Rayon 迭代器執行的工作執行緒 |
| **執行緒間橋梁** | Tokio 通道 | 將已完成的區塊和已編碼的封包分派回網路任務 | 非阻塞 `tokio::sync::mpsc` 通道 |

Pumpkin 嚴格遵循以下職責分離原則：
- **I/O 密集型**：由 Tokio 非同步任務管理。
- **CPU 密集型**：由 Rayon 執行緒池管理。
- **通訊**：透過跨執行緒通道（`tokio::sync::mpsc`）協調，絕不阻塞 Tokio 反應器迴圈。
