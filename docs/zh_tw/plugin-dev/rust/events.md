# 編寫事件處理器

事件處理器是插件的主要功能之一。它們允許插件接入伺服器的內部運作，
改變伺服器行為以執行其他操作。作為一個簡單範例，我們將為 `PlayerJoinEvent`
和 `PlayerLeaveEvent` 實現處理器。

## 實現事件

單個事件處理器只是實現了 `EventHandler<E>` trait 的結構（其中 `E` 是具體的事件資料型別）。

### 什麼是阻塞事件？

Pumpkin 插件事件系統區分兩種事件：阻塞事件和非阻塞事件。兩者各有優勢：

#### 阻塞事件

```diff
優點：
+ 可以修改事件（例如編輯加入訊息）
+ 可以取消事件
+ 具有優先順序系統
缺點：
- 按順序執行
- 如果實現不當，可能會降低伺服器速度
```

#### 非阻塞事件

```diff
優點：
+ 併發執行
+ 在所有阻塞事件完成後執行
+ 仍可進行一些修改（任何由 Mutex 或 RwLock 保護的內容）
缺點：
- 無法取消事件
- 沒有優先順序系統
- 對事件的控制較少
```

### 編寫處理器

由於我們的主要目標是更改玩家加入伺服器時看到的歡迎訊息，
我們將選擇具有普通優先順序的阻塞事件型別。

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

**說明**：

- `struct MyJoinHandler;`：事件處理器的結構。
- 如果事件是非阻塞事件，我們仍使用 handle 函式並返回事件資料，但該事件資料仍會被忽略。

### 註冊處理器

編寫好事件處理器後，我們需要讓插件使用它。只需在 `on_load` 方法中新增一行程式碼即可：
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
現在，如果我們建構插件並加入伺服器，應該會看到“Hello, World!”訊息！

## 新增離開事件

作為留給讀者的練習，請嘗試新增 PlayerLeaveEvent。
