# Kotlin API 概覽

[插件 world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit)定義了插件與伺服器之間的呼叫。[WIT 源目錄](https://github.com/Pumpkin-MC/Pumpkin/tree/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1)包含介面定義。

| 方向 | Kotlin API | 插件程式碼 |
| --- | --- | --- |
| 匯出：伺服器呼叫插件 | `PumpkinPlugin` 回呼和 `PluginMetadata` | 繼承 `PumpkinPlugin`，設定 `pumpkin.pluginClass`，並重寫所需的回呼。 |
| 匯入：插件呼叫伺服器 | `pumpkin.*` 下生成的型別，例如 `Context.Context`、`Inventory.Inventory` 和 `World.World` | 直接呼叫生成的綁定。 |

[回呼參考](./callbacks)將匯出對映到 Kotlin 方法。[介面對照表](./interfaces)列出生成的名稱空間。

## 回呼註冊

Gradle 插件使用 `pumpkin.pluginClass` 例項化你的 `PumpkinPlugin` 子類。API 實現 WIT 匯出，包括生命週期和元資料呼叫。

使用 `events`、`commands`、`tasks`、`ipc`、`aiGoals` 和 `chunkGenerators` 註冊回呼。API 分配處理器 ID 並分發呼叫。`events.listen(...)` 返回帶有 `unregister()` 的 `EventSubscription`；任務方法返回帶有 `cancel()` 的 `ScheduledTask`。

你仍然可以重寫 `PumpkinPlugin` 方法，以直接處理 WIT。`inventory.getItem(slot)` 等生成的資源呼叫無需註冊回呼。

## 生成的綁定

Kotlin 輔助方法管理回呼，生成的綁定則承載伺服器資料。例如，`Event.Event` 是事件變體，`Command.ConsumedArgs` 儲存解析後的引數，`Inventory.Inventory` 用於操作欄位，`World.ChunkBuffer` 是生成資源。

API 版本決定隨附的 WIT 綁定。插件和伺服器必須使用相容的 WIT 約定；舊版伺服器可能不提供綁定中的某項操作。IDE 自動完成會顯示所選釋出版本中的成員。
