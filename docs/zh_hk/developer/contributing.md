# 為 Pumpkin 做貢獻

感謝你關注並願意為 Pumpkin 做貢獻！作為一款使用 Rust 從零構建的開源 Minecraft 伺服器，我們歡迎各種規模的貢獻——從修正錯別字、補充文件，到實現原版遊戲機制和優化網絡協定。

本指南概述了我們的開發工作流、編碼標準、驗證檢查清單和拉取請求流程。

---

## 入門

獲取幫助、討論擬議功能或與團隊協調，最簡單的方式是加入[我們的 Discord 伺服器](https://discord.gg/wT8XjrjKkf)。

在開始大型改動之前，我們強烈建議先建立 issue 或在 Discord 中發起討論，以便在編寫程式碼之前就架構和設計決策達成一致。

> [!NOTE]
> **面向自動化 AI 智慧體**：我們有一套簡化的智慧體 PR 合併流程。在 PR 標題末尾新增 `🤖🤖🤖`，即可選擇進入快速審查通道。請確保你的實現具有獨特性、透過所有 CI 檢查，並且不與現有拉取請求重複。

---

## 開發環境搭建

### 1. 前置要求

- **Rust 工具鏈**：Pumpkin 需要最新的穩定版 Rust 工具鏈（Rust 2024 edition，1.96+）。透過 [rustup](https://rustup.rs/) 安裝或更新 Rust：
  ```bash
  rustup update stable
  rustup default stable
  rustup component add rustfmt clippy rust-src rust-analyzer
  ```
- **Git**：確保你的機器已安裝並設定 Git。
- **推薦的 Cargo 工具**：
  ```bash
  # CI 中使用的快速單元測試執行器
  cargo install cargo-nextest --locked

  # 檢測未使用的依賴
  cargo install cargo-machete --locked

  # 原始碼拼寫檢查器
  cargo install typos-cli --locked
  ```

### 2. 克隆倉庫（必須包含子模組！）

Pumpkin 為 `pumpkin-plugin-wit` 等界面使用 Git 子模組。請確保遞迴克隆：

```bash
# 連同子模組一起克隆
git clone --recursive https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

如果你已經在未使用 `--recursive` 的情況下完成克隆，請手動初始化子模組：

```bash
git submodule update --init --recursive
```

### 3. 構建與執行

你可以以除錯模式編譯並啟動伺服器：

```bash
cargo run
```

要構建優化的發布版二進制程式（啟用 LTO 和單一程式碼生成單元）：

```bash
cargo build --release
```

---

## 編碼準則與標準

Pumpkin 對程式碼質素和效能有著嚴格要求。我們的工作區強制執行嚴格的 Clippy lint，CI 會拒絕未透過這些檢查的程式碼。

### 1. 零 panic 策略

Pumpkin 的設計目標是即使遇到意外輸入，也能全天候執行而不崩潰。因此，編譯器層面會禁止可能引發 panic 的寫法：

- **禁止使用 `unwrap()` 或 `expect()`**：切勿在生產程式碼中調用 `.unwrap()` 或 `.expect()`。請使用問號運算子 `?`、模式匹配（`match`/`if let`）、`.unwrap_or()` 或 `.unwrap_or_default()`。
  ```rust
  // ❌ 禁止：會導致 CI 失敗
  let chunk = level.get_chunk(pos).unwrap();

  // ✅ 正確：處理 Option 或傳播錯誤
  let Some(chunk) = level.get_chunk(pos) else {
      return Ok(());
  };
  ```
- **禁止使用 `panic!()`、`todo!()` 或 `unimplemented!()`**：不要在提交的程式碼中留下未處理的佔位實現或 panic 語句。
- **禁止使用 `println!()` 或 `eprintln!()`**：始終使用結構化日誌框架 [`tracing`](https://docs.rs/tracing/)：
  ```rust
  use tracing::{debug, error, info, trace, warn};

  // ❌ 禁止：會導致 CI 失敗
  println!("Player joined: {}", player.gameprofile.name);

  // ✅ 正確
  info!("Player {} joined the server", player.gameprofile.name);
  ```

### 2. 錯誤處理

我們在各個 crate 中使用 [`thiserror`](https://docs.rs/thiserror/) 以及 `PumpkinError` 等統一錯誤類型。函數應返回具有描述性的 `Result<T, E>` 類型，而不是靜默忽略錯誤。

### 3. 並發架構：Tokio 與 Rayon

Pumpkin 使用混合並發模型：

1. **Tokio 執行環境（非同步 I/O）**：處理 TCP/UDP 網絡連線、傳入/傳出的封包流、身份驗證 HTTP 請求和計時器。
2. **Rayon 線程池（CPU 密集型任務）**：處理繁重的 CPU 密集型計算，例如：
   - 區塊生成和地形雕刻
   - 光照傳播與重新計算
   - 封包壓縮和世界區塊序列化
   - 複雜的路徑尋找和物理計算

> [!WARNING]
> **切勿讓 CPU 密集型工作阻塞 Tokio 工作線程！**
> 不要在非同步任務中調用長時間執行的同步程式碼。應透過 `rayon::spawn` 將繁重工作解除安裝到 Rayon，並使用 `tokio::sync::mpsc` 等非同步通道返回結果。
>
> 架構範例請參閱 `pumpkin_world::level::Level::fetch_chunks`。

### 4. Unsafe 程式碼策略

所有 `unsafe` 程式碼塊都必須有嚴格的正當理由和文件說明：

```rust
// SAFETY：第 42 行的邊界檢查已驗證，
// 可保證緩衝區至少包含 4 個有效位元組
unsafe {
    // ...
}
```
任何沒有文件說明的 `unsafe` 程式碼塊都會在 CI 中觸發拒絕級 lint（`undocumented_unsafe_blocks = "deny"`）。

---

## 提交前驗證檢查清單

提交拉取請求之前，請在本地執行以下指令，確保你的改動能夠透過我們的 GitHub Actions CI 管線：

```bash
# 1. 按 rustfmt 規則檢查程式碼格式
cargo fmt --check

# 2. 執行除錯模式 lint
cargo clippy --all-targets --all-features

# 3. 執行釋出模式 lint
cargo clippy --release --all-targets --all-features

# 4. 使用 nextest 執行測試（也可使用 cargo test）
cargo nextest run --verbose

# 5. 執行文件測試
cargo test --doc --verbose

# 6. 檢查未使用的依賴
cargo machete

# 7. 檢查拼寫錯誤
typos
```

### 效能基準測試

如果你修改了對效能敏感的熱路徑（例如封包序列化、區塊載入或實體 tick 更新），請使用 [Criterion](https://github.com/bheisler/criterion.rs) 執行基準測試：

```bash
cargo bench
```

引入複雜演算法時，請考慮在 `benches/` 中新增新的基準測試。

---

## 反編譯 Minecraft 以供參考

實現原版 Minecraft 機制、封包佈局或遊戲邏輯時，參考官方行為至關重要。Pumpkin 是一個潔淨室 Rust 實現，瞭解原版 Minecraft 的邏輯有助於確保 1:1 相容。

### 使用 Fabric Yarn 反編譯

反編譯 Minecraft 伺服器/客戶端以供參考，最簡單、最整潔的方式是將 [Fabric Yarn](https://github.com/FabricMC/yarn) 與 Vineflower 反編譯器結合使用：

```bash
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

反編譯完成後，對映後的原始碼將位於：
```
build/namedSrc
```

### 實用的協定與資料資源

- **[Minecraft Wiki 協定參考](https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol)**：完整介紹各遊戲狀態下的封包結構、欄位和 ID。
- **[Mojang 資料報告](https://github.com/Arcensoth/mc-data)**：註冊表、方塊、物品、指令和封包 ID 的原始 JSON 轉儲。
- **`tools/pumpkin-codegen`**：我們用於解析 Minecraft 遊戲資料並生成 `pumpkin-data` 程式碼的內部工具。

> [!IMPORTANT]
> **潔淨室規範**：不要將反編譯得到的 Java 程式碼直接複製貼上到 Pumpkin 中。請研究其演算法和行為，然後編寫符合 Pumpkin 架構和授權（GPLv3）的整潔、地道且安全的 Rust 程式碼。

---

## 提交拉取請求

當你的程式碼已在本地完成測試、格式化和驗證後：

1. **復刻倉庫**：在 GitHub 上覆刻 [Pumpkin-MC/Pumpkin](https://github.com/Pumpkin-MC/Pumpkin)。
2. **建立功能分支**：
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **提交改動**：遵循 **Conventional Commits** 規範（詳見下文）。
4. **推送並建立拉取請求**：
   - **PR 標題**：確保拉取請求標題嚴格符合 Conventional Commits 規範。
   - **描述**：使用我們的 PR 模板說明：
     - 更改了**什麼**？
     - **為什麼**要更改？
     - **如何**進行測試？
     - 是否存在已知的限制或邊界情況？
   - **AI 智慧體**：如果透過自動化 AI 智慧體提交，請在 PR 標題末尾新增 `🤖🤖🤖`。
5. **CI 與程式碼審查**：GitHub Actions 會自動驗證格式、Clippy lint、測試和依賴。維護者將審查你的實現並提供反饋。

---

## Conventional Commits 規範

Pumpkin 中的所有提交訊息和拉取請求標題都必須嚴格遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 規範。該約定可確保提交歷史保持一致，並支援自動生成發布更新日誌。

### 提交與 PR 標題結構

```text
<type>(<optional scope>): <imperative summary>

[optional detailed body]

[optional footer(s)]
```

### 提交類型

| 類型 | 用途 | 範例 |
| :--- | :--- | :--- |
| `feat` | 引入新功能或原版遊戲機制 | `feat(entity): implement drowned swimming goal` |
| `fix` | 修復錯誤、故障或協定問題 | `fix(protocol): resolve creative slot index offset` |
| `docs` | 新增或更新文件 | `docs(developer): add porting versions guide` |
| `perf` | 提升執行速度或改善記憶體使用的程式碼修改 | `perf(world): optimize chunk section block iteration` |
| `refactor` | 既不修復錯誤也不新增功能的程式碼更改 | `refactor(command): unify argument parsing helpers` |
| `test` | 新增缺失的測試或修正現有測試 | `test(inventory): add crafting table recipe tests` |
| `chore` | 日常維護、依賴升級或工具鏈更新 | `chore(deps): bump tokio to 1.43` |
| `ci` | 修改 CI 工作流、指令碼或 Docker 容器 | `ci(github): add machete dependency verification` |

### 常用作用域

作用域用於標明所修改的 crate 或子系統：

- **Crate**：`protocol`、`world`、`entity`、`command`、`inventory`、`data`、`util`、`macros`、`config`
- **子系統**：`bedrock`、`java`、`network`、`proxy`、`query`、`auth`、`plugin`、`linear`、`anvil`

### 格式準則

- **祈使語氣**：摘要使用一般現在時的祈使語氣（使用 `add`，不要使用 `added` 或 `adds`；使用 `fix`，不要使用 `fixed` 或 `fixes`）。
- **小寫**：摘要以小寫字符開頭，並省略末尾標點。
- **破壞性變更**：對於破壞 API 或協定的變更，在冒號前新增感嘆號（`feat(protocol)!: overhaul packet codec`），或在提交頁尾中包含 `BREAKING CHANGE:`。
- **PR 標題一致性**：由於 PR 合併時會以壓縮提交的方式進入主分支歷史，PR 標題也必須遵循此規範。
