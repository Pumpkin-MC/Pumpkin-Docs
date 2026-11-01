# 執行與上下文

在 Pumpkin 中，指令執行將指令的**物理來源**與其**執行環境中下文**分離。此設計支援複雜的指令路由、維度切換、條件執行以及符合原版行為的 `/execute` 鏈式呼叫。

---

## `CommandSender` 與 `CommandSource`

理解 `CommandSender` 與 `CommandSource` 的區別，是開發 Pumpkin 指令的基礎：

| 屬性 | `CommandSender` | `CommandSource` |
| :--- | :--- | :--- |
| **概念** | 物理來源和網路目標 | 可變的執行階段執行環境 |
| **可變性** | 在指令執行期間不可變 | 在 `/execute` 分支之間被克隆和修改 |
| **關鍵欄位** | 終端通訊端、連線控制代碼、RCON 緩衝區 | 世界、位置座標、朝向、實體、靜默標誌 |
| **建立方式** | 在網路連線或終端輸入時例項化 | 透過 `sender.into_source(&server)` 構造 |

### 1. `CommandSender`（物理呼叫方）

表示發起指令並接收其輸出的實體或通訊端：

```rust
pub enum CommandSender {
    Console,
    Rcon(Arc<std::sync::Mutex<Vec<String>>>),
    Player(Arc<Player>),
    CommandBlock(Arc<CommandBlockEntity>, Arc<World>),
    Dummy,
}
```

- **輸出目標**：決定使用 `send_message` 格式化的訊息傳送到哪裡（例如標準輸出、RCON 緩衝區、玩家封包或方塊實體 NBT）。
- **固定權限**：儲存固定的基礎權限（例如主控台具有 4 級繞過權限；指令方塊具有 2 級權限）。

### 2. `CommandSource`（執行環境）

表示指令求值期間的可變執行階段狀態：

```rust
pub struct CommandSource {
    pub output: CommandSender,
    pub world: Option<Arc<World>>,
    pub entity: Option<Arc<dyn EntityBase>>,
    pub position: Vector3<f64>,
    pub rotation: Vector2<f32>,
    pub name: String,
    pub display_name: TextComponent,
    pub server: Option<Arc<Server>>,
    pub silent: bool,
    pub command_result_taker: ResultValueTaker,
    pub entity_anchor: EntityAnchor,
}
```

傳送者透過 `sender.into_source(&server)` 轉換為 `CommandSource`。

---

## `/execute` 指令與上下文重定向

`/execute` 指令會在把控制權交給下游指令前修改 `CommandSource` 屬性。

### 分支修飾符

- **`as <targets>`**：將 `context.source.entity` 更改為目標實體，不改變位置或朝向。
- **`at <targets>`**：更新 `context.source.world`、`position` 和 `rotation`，使其匹配目標實體。
- **`positioned <pos>`**：將 `context.source.position` 修改為新座標。
- **`in <dimension>`**：將 `context.source.world` 更改為指定維度（主世界、地獄、終界）。
- **`anchored (feet|eyes)`**：調整用於視線和朝向檢查的座標偏移。

### 上下文分叉與鏈式呼叫

當 `/execute` 匹配多個目標（例如 `/execute as @e run ...`）時，`pumpkin-command` 會使用**分叉**：

1. 分派器為每個匹配目標分叉一次執行上下文。
2. 子指令針對每個克隆出的 `CommandSource` 獨立執行。
3. 所有執行的累計成功計數會被聚合。

---

## 結果值與成功計數

原版指令透過整數退出碼和返回值傳回結果。

### 返回值回呼

執行器返回 `CommandExecutorResult`（`Result<i32, CommandSyntaxError>`）。返回的整數表示：

- **0**：失敗或未影響任何實體。
- **> 0**：受影響的實體、已更改方塊或已清除物品的數量。

對於指令方塊，此值會持久化到方塊實體的 `SuccessCount` 中：

```rust
pub fn set_success_count(&self, count: u32) {
    if let Self::CommandBlock(c, _) = self {
        c.success_count.store(count, Ordering::SeqCst);
    }
}
```

### `/execute store`

與 `/execute store (result|success) ...` 鏈式呼叫時，Pumpkin 會透過 `ReturnValueCallback` 攔截返回值，並將其寫入記分板、Boss 欄或實體 NBT 標籤。

---

## 反饋與遊戲規則整合

向指令傳送者傳送輸出受伺服器設定和世界遊戲規則控制：

```rust
context.source.send_feedback(
    TextComponent::text("Command executed successfully!"),
    true, // 廣播給伺服器管理員
);
```

### 輸出規則矩陣

| 條件 | 反饋行為 |
| :--- | :--- |
| `silent == true` | 輸出被完全抑制。 |
| `send_command_feedback == false` | 玩家傳送者不會收到成功反饋（仍會顯示錯誤）。 |
| `command_block_output == false` | 指令方塊的執行輸出不會廣播給線上管理員。 |
| `broadcast_console_to_ops == true` | 伺服器主控台和 RCON 指令會向所有線上的 2 級及以上 OP 玩家傳送一份反饋副本。 |
