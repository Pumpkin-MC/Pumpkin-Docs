# 指令架構與分派器

Pumpkin 透過專用的 `pumpkin-command` crate，提供了高效能、純 Rust 實現的 **Brigadier** 指令樹規範。它協調指令解析、需求解析、類型安全的參數反序列化、執行分支，以及面向 **Minecraft: Java Edition** 和 **Minecraft: Bedrock Edition** 的雙版本客戶端指令樹同步。

### 指令處理流程

Pumpkin 中執行的每個指令都會經過以下獨立階段：

1. **輸入規範化**：移除單個前導斜槓，同時保留插件的多斜槓約定（例如 `//set`）。
2. **可用性檢查**：以標準的 `unknown command` 語法錯誤拒絕透過伺服器設定停用的指令。
3. **權限評估**：根據執行指令的傳送者驗證需求（`PermissionLvl` 或自訂註冊表節點）。
4. **分詞與解析**：`StringReader` 遞迴遍歷 `Tree<S>`，匹配常值關鍵字並解析帶類型的參數。
5. **上下文分派**：使用帶類型的 `CommandContext<S>` 調用匹配的 `CommandExecutor` 回調。
6. **反饋與結果消費**：格式化跨平臺翻譯元件、通知觀察者，並將退出碼寫回調用方。

---

## `pumpkin-command` Crate

Pumpkin 將指令解析和指令樹表示從主伺服器執行環境解耦到模組化的 `pumpkin-command` crate（`crates/pumpkin-command`）中。

`pumpkin-command` 的關鍵元件包括：

- **`Tree<S>`**：基於連續向量儲存的已掛載指令節點（`AttachedNode`）。
- **`CommandDispatcher<S>`**：中央註冊表與分派引擎。它處理原始指令字符串、使用 `StringReader` 解析標記、遍歷指令樹並執行目標回調。
- **`ArgumentBuilder`**：仿照 Mojang Brigadier 庫的流式構建器 API（`command`、`literal`、`argument`）。
- **`CommandSource`**：表示目前位置、朝向、維度、實體和反饋輸出流的通用執行狀態。

---

## 指令節點層級

Pumpkin 中的指令被建模為有向節點圖。為優化記憶體分配並避免構建期間的迴圈引用問題，系統將節點分為**分離**和**掛載**兩種狀態：

### 1. 分離節點（`DetachedNode`）

註冊前使用流式構建器（`CommandArgumentBuilder`、`LiteralArgumentBuilder`、`RequiredArgumentBuilder`）構造：

- **`CommandDetachedNode`**：表示帶有識別符號和描述的根指令入口。
- **`LiteralDetachedNode`**：表示子指令分支中的常值關鍵字（例如 `/gamemode creative` 中的 `set`）。
- **`ArgumentDetachedNode`**：表示由 `ArgumentType` 解析的帶類型參數（例如座標、實體選擇器、整數範圍）。

### 2. 掛載節點（`AttachedNode`）

註冊到 `CommandDispatcher` 後，分離的指令樹會被扁平化為帶索引的 `Tree<S>` 結構：

```rust
pub enum AttachedNode<S: CommandSource = DummySource> {
    Root(RootAttachedNode<S>),
    Literal(LiteralAttachedNode<S>),
    Argument(ArgumentAttachedNode<S>),
    Command(CommandAttachedNode<S>),
}
```

每個掛載節點都具有：

- **`NodeId`**：指向連續節點區域的零成本類型化索引（`NonZero<usize>`）。
- **`children`**：用於常值和子參數的快速查詢表（`FxHashMap<String, NodeId>`）。
- **`requirements`**：決定傳送者是否有權檢視或執行該節點的謂詞。
- **`command`**：當解析在此節點終止時調用的可選 `CommandExecutor` 回調。
- **`redirect`**：用於迴環或重定向到另一棵子樹的可選 `Redirection` 指標（`/execute` 大量使用）。

---

## 分派與執行流程

指令到達伺服器時，`CommandDispatcher::handle_command` 會透過多個階段處理它：

```rust
pub fn handle_command<'a>(&'a self, source: &S, mut input: &'a str) {
    // 1. 移除單個前導斜槓（保留 //set 這類雙斜槓指令）
    if let Some(sliced) = input.strip_prefix('/') {
        let first_token = input.split_whitespace().next().unwrap_or("");
        let sliced_token = sliced.split_whitespace().next().unwrap_or("");
        if !self.has_command(first_token)
            && (self.has_command(sliced_token) || !first_token.starts_with("//"))
        {
            input = sliced;
        }
    }

    // 2. 檢查設定中停用的指令
    if self.is_disabled(Self::command_name(input)) {
        let reader = StringReader::new(input);
        Self::send_error_to_source(source, DISPATCHER_UNKNOWN_COMMAND.create(&reader), input);
        return;
    }

    // 3. 解析並執行
    let output = self.execute_input(input, source);
    if let Err(error) = output {
        Self::send_error_to_source(source, error, input);
    }
}
```

### 語法錯誤格式化

當解析遇到無效語法、意外標記或超出範圍的參數時，Pumpkin 會構造 `CommandSyntaxError`。如果上下文可用，分派器會格式化一個視覺化指標，準確標出解析器失敗的位置：

```
Unknown or incomplete command, see below for error
/gamemode creatve<--[HERE]
```

在 Java 版客戶端中，這段錯誤文字會附帶 `ClickEvent::SuggestCommand`，玩家可以點選聊天中的錯誤，將失敗的指令複製到輸入框中快速編輯。

---

## 雙版本網絡同步

與只為 Java 版序列化指令圖的原版伺服器不同，Pumpkin 會動態地向 Java 版和基岩版客戶端同步已註冊的指令樹：

### 1. Java 版：`CCommands` 封包

當玩家加入或權限等級更新（例如透過 `/op` 或 `/deop`）時，Pumpkin 會構建並發送 `CCommands` 封包（`pumpkin_protocol::java::client::play::CCommands`）：

- 將 `AttachedNode` 轉換為扁平的 `ProtoNode` 條目數組。
- 過濾掉停用的指令以及 `requirements.evaluate(source)` 返回 `false` 的節點。
- 序列化參數解析器（`brigadier:string`、`brigadier:integer`、`minecraft:entity` 等）和客戶端建議識別符號。

### 2. 基岩版：`CAvailableCommands` 封包

基岩版使用過載與列舉格式，而不是 Brigadier 的遞迴圖。在 `client_suggestions.rs` 中，Pumpkin 會遍歷 `AttachedNode` 樹以合成：

- **`CommandData`**：根指令名稱、描述、權限標誌和別名。
- **`OverloadData`**：通往可執行終點的參數鏈扁平排列組合。
- **`ParamData`**：基岩版參數類型、位標誌（`ARG_FLAG_VALID`、`ARG_FLAG_ENUM`）以及動態收集的列舉值表。

---

## 通用執行目標

Pumpkin 指令可由多種傳送者執行：

| 傳送者 | 來源表示 | 輸出目標 | 預設權限 |
| :--- | :--- | :--- | :--- |
| **玩家** | `CommandSender::Player(Arc<Player>)` | 客戶端系統聊天封包 | 從權限等級 / 權限檔案載入 |
| **伺服器控制台** | `CommandSender::Console` | 標準輸出（`tracing::info!`） | 4 級（完整管理繞過） |
| **RCON 控制台** | `CommandSender::Rcon(Arc<Mutex<Vec<String>>>)` | 網絡回應封包負載 | 4 級 |
| **指令方塊** | `CommandSender::CommandBlock(Arc<CommandBlockEntity>, Arc<World>)` | NBT `LastOutput` 欄位 | 2 級 |
| **封包函數** | 從調用方繼承的 `CommandSender` | 繼承 | 繼承 |
| **WASM 插件** | 透過 WIT `execute_command` 主機調用調用 | 透過 `ResultDeferrer` 捕獲 | 可設定 |

---

## 指令設定與停用

Pumpkin 允許伺服器管理員透過 `config/commands.toml`（`CommandsConfig`）停用單個指令。指令被停用後：

1. 會從 Java 客戶端的 `CCommands` 封包中省略。
2. 會從基岩客戶端的 `CAvailableCommands` 封包中省略。
3. Tab 自動完成會完全忽略該指令。
4. 任何調用該指令的嘗試都會返回 `DISPATCHER_UNKNOWN_COMMAND`。
