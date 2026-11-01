# Kotlin API 概览

[插件 world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit)定义了插件与服务器之间的调用。[WIT 源目录](https://github.com/Pumpkin-MC/Pumpkin/tree/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1)包含接口定义。

| 方向 | Kotlin API | 插件代码 |
| --- | --- | --- |
| 导出：服务器调用插件 | `PumpkinPlugin` 回调和 `PluginMetadata` | 继承 `PumpkinPlugin`，配置 `pumpkin.pluginClass`，并重写所需的回调。 |
| 导入：插件调用服务器 | `pumpkin.*` 下生成的类型，例如 `Context.Context`、`Inventory.Inventory` 和 `World.World` | 直接调用生成的绑定。 |

[回调参考](./callbacks)将导出映射到 Kotlin 方法。[接口对照表](./interfaces)列出生成的命名空间。

## 回调注册

Gradle 插件使用 `pumpkin.pluginClass` 实例化你的 `PumpkinPlugin` 子类。API 实现 WIT 导出，包括生命周期和元数据调用。

使用 `events`、`commands`、`tasks`、`ipc`、`aiGoals` 和 `chunkGenerators` 注册回调。API 分配处理器 ID 并分发调用。`events.listen(...)` 返回带有 `unregister()` 的 `EventSubscription`；任务方法返回带有 `cancel()` 的 `ScheduledTask`。

你仍然可以重写 `PumpkinPlugin` 方法，以直接处理 WIT。`inventory.getItem(slot)` 等生成的资源调用无需注册回调。

## 生成的绑定

Kotlin 辅助方法管理回调，生成的绑定则承载服务器数据。例如，`Event.Event` 是事件变体，`Command.ConsumedArgs` 保存解析后的参数，`Inventory.Inventory` 用于操作槽位，`World.ChunkBuffer` 是生成资源。

API 版本决定随附的 WIT 绑定。插件和服务器必须使用兼容的 WIT 约定；旧版服务器可能不提供绑定中的某项操作。IDE 补全会显示所选发布版本中的成员。
