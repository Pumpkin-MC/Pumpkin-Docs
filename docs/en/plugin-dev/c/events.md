# Events

Events allow your plugin to respond to actions occurring on the server, such as players joining or messages being sent.

## Registering an Event

You can register an event handler in the `on_load` function of your plugin using `pumpkin_context_register_event`.

```cpp
void pumpkin_context_register_event(
    pumpkin_plugin_context_borrow_context_t self,
    pumpkin_event_handler_t handler,
    pumpkin_plugin_context_event_type_t event_type,
    pumpkin_plugin_context_event_priority_t event_priority,
    bool blocking);
```
- `event-type`: The type of event to listen for.
- `event-priority`: When this handler should be called relative to others.
- `blocking`: Whether the event should wait for this handler to finish.

### Example

```cpp
pumpkin_context_register_event(
    borrowed_ctx, 
    on_player_chat,
    PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_CHAT_EVENT,
    PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL,
    true);
```

## Event handlers

An event handler is a function that receives the server instance and the event data.

The signature of event handlers is always the same.

```cpp
void on_player_chat(plugin_own_server_instance_t server, pumpkin_plugin_event_event_t *event) {
    auto &data = event->val.player_chat_event;
    data.cancelled = true;
}
```

The `event->val` union contains a member for each event type. You can use it to access the member of the event you registered for.

`data` exposes the event's fields, so we can access:

- `player`
- `message`
- `cancelled`
- `recipients`
- `signature`


## Changing and cancelling events

Because the handler gets the event by pointer, whatever it changes is passed back to the server. Most events have a `cancelled` field. Setting it stops the event from happening: the code snippet above means chat messages are never sent, and a cancelled block break leaves the block where it was.

## Blocking

`blocking` decides whether the server waits for the handler. It allows a handler to change or cancel the event. A non-blocking handler doesn't hold the server up, but any changes it makes are thrown away, so it only suits handlers that just watch, like logging or statistics.

## Event Types

The `pumpkin_plugin_context_event_type_t` type identifies the event to register for. The API provides event type constants such as:

- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_JOIN_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_DEATH_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_LEAVE_EVENT`

## Event priorities

The `pumpkin_plugin_context_event_priority_t` type sets the handler's priority. The API provides priority constants such as:

```c

#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGHEST 0
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGH 1
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL 2
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOW 3
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOWEST 4

```

## Full example

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