# 事件

事件允许插件响应服务器上发生的操作，例如玩家加入或发送消息。

## 注册事件

你可以在插件的 `on_load` 函数中使用 `pumpkin_context_register_event` 注册事件处理程序。

```cpp
void pumpkin_context_register_event(
    pumpkin_plugin_context_borrow_context_t self,
    pumpkin_event_handler_t handler,
    pumpkin_plugin_context_event_type_t event_type,
    pumpkin_plugin_context_event_priority_t event_priority,
    bool blocking);
```
- `event-type`：要监听的事件类型。
- `event-priority`：此处理程序相对于其他处理程序的调用顺序。
- `blocking`：事件是否需要等待此处理程序执行完成。

### 示例

```cpp
pumpkin_context_register_event(
    borrowed_ctx, 
    on_player_chat,
    PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_CHAT_EVENT,
    PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL,
    true);
```

## 事件处理程序

事件处理程序是一个接收服务器实例和事件数据的函数。

事件处理程序的签名始终相同。

```cpp
void on_player_chat(plugin_own_server_instance_t server, pumpkin_plugin_event_event_t *event) {
    auto &data = event->val.player_chat_event;
    data.cancelled = true;
}
```

`event->val` 联合体为每种事件类型包含一个成员。你可以通过它访问所注册事件对应的成员。

`data` 提供事件字段。在此示例中，我们可以访问：

- `player`
- `message`
- `cancelled`
- `recipients`
- `signature`

## 修改和取消事件

处理程序通过指针接收事件，因此它所做的修改会传回服务器。大多数事件都有 `cancelled` 字段。将其设为 true 会取消事件：上面的代码片段会阻止聊天消息发送，取消方块破坏事件则会使方块留在原处。

## 阻塞

`blocking` 决定服务器是否等待处理程序完成。这使处理程序能够修改或取消事件。非阻塞处理程序不会阻塞服务器，但它所做的更改会被丢弃，因此只适用于观察事件的场景，例如日志记录或统计。

## 事件类型

`pumpkin_plugin_context_event_type_t` 类型用于标识要注册的事件。API 提供了以下事件类型常量：

- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_JOIN_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_DEATH_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_LEAVE_EVENT`

## 事件优先级

`pumpkin_plugin_context_event_priority_t` 类型用于设置处理程序的优先级。API 提供了以下优先级常量：

```c

#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGHEST 0
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGH 1
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL 2
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOW 3
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOWEST 4

```

## 完整示例

```cpp
#include "pumpkin_api.h"

pumpkin_metadata_t get_meta(void) {
    static const char* authors[] = {"You"};
    return (pumpkin_metadata_t) {
        .name = "MyCustomJoinMessage",
        .version = "0.1.0",
        .authors = authors,
        .authors_count = 1,
        .description = "PumpkinMC plugin dev example.",
        .dependencies_count = 0
    };
}

void on_player_join(plugin_own_server_instance_t server, pumpkin_plugin_event_event_t *event) {
    auto &data = event->val.player_join_event;
    pumpkin_plugin_player_borrow_player_t borrowed_player = pumpkin_plugin_player_borrow_player(data.player);
    // The text component is initially just the player's display name: "<playername>"
    pumpkin_plugin_text_own_text_component_t welcomeMessage = 
        pumpkin_plugin_player_method_player_get_display_name(borrowed_player);
    auto borrowed_welcomeMessage = pumpkin_plugin_text_borrow_text_component(welcomeMessage);
    // Here it becomes "<playername> has joined, Everyone say hi!"
    plugin_string_t WelcomeMessageAddition{};
    plugin_string_dup(&WelcomeMessageAddition, " has joined, Everyone say hi!");
    pumpkin_plugin_text_method_text_component_add_text(borrowed_welcomeMessage, &WelcomeMessageAddition);
    // Release the string
    plugin_string_free(&WelcomeMessageAddition);
    // Release the original event message before replacing it.
    pumpkin_plugin_text_text_component_drop_own(data.join_message); 
    // Here we change the join message to our custom message
    data.join_message = welcomeMessage;
}

void on_load(plugin_own_context_t ctx) {
    pumpkin_plugin_context_borrow_context_t borrowed_context = 
        pumpkin_plugin_context_borrow_context(ctx);
    pumpkin_context_register_event(
        borrowed_context,
        on_player_join,
        PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_JOIN_EVENT,
        PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL,
        true); // blocking must be enabled to modify the join_message.
}

REGISTER_PUMPKIN_PLUGIN(((pumpkin_plugin_t){
    .get_metadata = get_meta,
    .on_load = on_load
}))

```
