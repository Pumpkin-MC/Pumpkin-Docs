# 编写事件处理器

事件处理器是插件的主要功能之一。
它们允许插件介入服务器的内部工作流程，并改变其行为以执行某些其他操作。
以一个简单的例子来说，我们将为 `PlayerJoinEvent` 和 `PlayerLeaveEvent` 实现一个处理器。

## 实现一个事件

单个事件处理器就是实现了 `EventHandler<E>` trait（其中 `E` 是特定的事件数据）的结构体。

### 什么是阻塞事件？

Pumpkin 插件事件系统区分两种类型的事件：阻塞式和非阻塞式。它们各有其优势：

#### 阻塞事件

```diff
优点：
+ 可以修改事件（例如编辑加入消息）
+ 可以取消事件
+ 拥有优先级系统
缺点：
- 按顺序执行
- 如果实现不当可能会降低服务器速度
```

#### 非阻塞事件

```diff
优点：
+ 并发执行
+ 在所有阻塞事件完成后执行
+ 仍可进行某些修改（任何需要 Mutex 或 RwLock 保护的内容）
缺点：
- 无法取消事件
- 没有优先级系统
- 对事件的控制能力较弱
```

### 编写处理器

由于我们这里的主要目标是更改玩家加入服务器时看到的欢迎消息，我们将选择普通优先级的阻塞事件类型。

:::code-group

```rs [lib.rs]
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
        event.join_message = TextComponent::text("你好，世界！");
        event
    }
}
```

:::

**解释**:

- `struct MyJoinHandler;`：我们事件处理器的结构体
- 如果事件是非阻塞的，我们仍然使用 handle 函数并返回事件数据。该事件数据仍将被忽略。

### 注册处理器

既然我们已经编写了事件处理器，就需要告诉插件去使用它。我们可以通过在 `on_load` 方法中添加一行代码来实现：
:::code-group

```rs [lib.rs]
struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        // ...
    }

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("来自示例插件的问候！");
        context.register_event_handler(MyJoinHandler, EventPriority::Normal, true)?;
        Ok(())
    }

    fn on_unload(&mut self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("示例插件已卸载。再见！");
        Ok(())
    }
}
```

:::
现在，如果我们构建插件并加入服务器，应该会看到一条“你好，世界！”的消息！

## 添加离开事件

作为给读者的练习，请尝试添加一个 PlayerLeaveEvent
