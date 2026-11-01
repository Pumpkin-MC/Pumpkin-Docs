# 编写事件处理器

事件处理器是插件的主要功能之一。它们允许插件接入服务器的内部运作，
改变服务器行为以执行其他操作。作为一个简单示例，我们将为 `PlayerJoinEvent`
和 `PlayerLeaveEvent` 实现处理器。

## 实现事件

单个事件处理器只是实现了 `EventHandler<E>` trait 的结构体（其中 `E` 是具体的事件数据类型）。

### 什么是阻塞事件？

Pumpkin 插件事件系统区分两种事件：阻塞事件和非阻塞事件。两者各有优势：

#### 阻塞事件

```diff
优点：
+ 可以修改事件（例如编辑加入消息）
+ 可以取消事件
+ 具有优先级系统
缺点：
- 按顺序执行
- 如果实现不当，可能会降低服务器速度
```

#### 非阻塞事件

```diff
优点：
+ 并发执行
+ 在所有阻塞事件完成后执行
+ 仍可进行一些修改（任何由 Mutex 或 RwLock 保护的内容）
缺点：
- 无法取消事件
- 没有优先级系统
- 对事件的控制较少
```

### 编写处理器

由于我们的主要目标是更改玩家加入服务器时看到的欢迎消息，
我们将选择具有普通优先级的阻塞事件类型。

:::code-group

```rust [lib.rs]
// [!code ++:20]
use pumpkin_plugin_api::{
    Context, Plugin, PluginMetadata, Server,
    events::{EventData, EventHandler, EventPriority, PlayerJoinEvent},
    text::TextComponent,
};
use tracing::*;

struct MyJoinHandler;
impl EventHandler<PlayerJoinEvent> for MyJoinHandler {
    fn handle<'a>(
        &'a self,
        server: Server,
        mut event: EventData<PlayerJoinEvent>,
    ) -> EventData<PlayerJoinEvent> {
        event.join_message = TextComponent::text("Hello, world!");
        event
    }
}
```

:::

**说明**：

- `struct MyJoinHandler;`：事件处理器的结构体。
- 如果事件是非阻塞事件，我们仍使用 handle 函数并返回事件数据，但该事件数据仍会被忽略。

### 注册处理器

编写好事件处理器后，我们需要让插件使用它。只需在 `on_load` 方法中添加一行代码即可：
:::code-group

```rust [lib.rs]
struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        // ...
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Hello from the example plugin!");
        context.register_event_handler(MyJoinHandler, EventPriority::Normal, true)?;
        Ok(())
    }

    fn on_unload(&self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Example plugin unloaded. Goodbye!");
        Ok(())
    }
}
```

:::
现在，如果我们构建插件并加入服务器，应该会看到“Hello, World!”消息！

## 添加离开事件

作为留给读者的练习，请尝试添加 PlayerLeaveEvent。
