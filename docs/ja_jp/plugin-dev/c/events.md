# イベント

イベントを使うと、プレイヤーの参加やメッセージの送信など、サーバー上で発生する操作にプラグインから対応できます。

## イベントの登録

`pumpkin_context_register_event` を使って、プラグインの `on_load` 関数内でイベントハンドラーを登録できます。

```cpp
void pumpkin_context_register_event(
    pumpkin_plugin_context_borrow_context_t self,
    pumpkin_event_handler_t handler,
    pumpkin_plugin_context_event_type_t event_type,
    pumpkin_plugin_context_event_priority_t event_priority,
    bool blocking);
```
- `event-type`: 監視するイベントの種類です。
- `event-priority`: 他のハンドラーとの実行順を指定します。
- `blocking`: ハンドラーの完了までイベント処理を待機するかどうかを指定します。

### 例

```cpp
pumpkin_context_register_event(
    borrowed_ctx, 
    on_player_chat,
    PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_CHAT_EVENT,
    PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL,
    true);
```

## イベントハンドラー

イベントハンドラーは、サーバーインスタンスとイベントデータを受け取る関数です。

イベントハンドラーのシグネチャは常に同じです。

```cpp
void on_player_chat(plugin_own_server_instance_t server, pumpkin_plugin_event_event_t *event) {
    auto &data = event->val.player_chat_event;
    data.cancelled = true;
}
```

`event->val` 共用体には、各イベント型に対応するメンバーがあります。登録したイベントに対応するメンバーにアクセスできます。

`data` からイベントのフィールドにアクセスできます。この例では、次のフィールドを使用できます。

- `player`
- `message`
- `cancelled`
- `recipients`
- `signature`

## イベントの変更とキャンセル

ハンドラーはイベントをポインターで受け取るため、変更内容はサーバーに反映されます。ほとんどのイベントには `cancelled` フィールドがあります。これを設定するとイベントがキャンセルされます。上のコード例ではチャットメッセージが送信されず、ブロック破壊をキャンセルするとブロックがその場に残ります。

## ブロッキング

`blocking` は、サーバーがハンドラーの完了を待つかどうかを決めます。ブロッキングを有効にすると、ハンドラーでイベントを変更またはキャンセルできます。ブロッキングを無効にするとサーバー処理は待機しませんが、ハンドラーによる変更は破棄されます。そのため、ログ記録や統計など、イベントを監視する用途に適しています。

## イベント型

`pumpkin_plugin_context_event_type_t` 型で登録対象のイベントを指定します。API には、次のようなイベント型定数があります。

- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_JOIN_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_DEATH_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_LEAVE_EVENT`

## イベントの優先度

`pumpkin_plugin_context_event_priority_t` 型でハンドラーの優先度を指定します。API には、次のような優先度定数があります。

```c

#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGHEST 0
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGH 1
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL 2
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOW 3
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOWEST 4

```

## 完全な例

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
