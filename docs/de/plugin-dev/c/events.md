# Ereignisse

Ereignisse ermöglichen es deinem Plugin, auf Aktionen auf dem Server zu reagieren, zum Beispiel wenn Spieler beitreten oder Nachrichten gesendet werden.

## Ein Ereignis registrieren

Du kannst einen Ereignishandler in der Funktion `on_load` deines Plugins mit `pumpkin_context_register_event` registrieren.

```cpp
void pumpkin_context_register_event(
    pumpkin_plugin_context_borrow_context_t self,
    pumpkin_event_handler_t handler,
    pumpkin_plugin_context_event_type_t event_type,
    pumpkin_plugin_context_event_priority_t event_priority,
    bool blocking);
```
- `event-type`: Der Typ des Ereignisses, auf das du hören möchtest.
- `event-priority`: Legt fest, wann dieser Handler im Verhältnis zu anderen aufgerufen wird.
- `blocking`: Gibt an, ob das Ereignis warten soll, bis der Handler abgeschlossen ist.

### Beispiel

```cpp
pumpkin_context_register_event(
    borrowed_ctx, 
    on_player_chat,
    PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_CHAT_EVENT,
    PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL,
    true);
```

## Ereignishandler

Ein Ereignishandler ist eine Funktion, die die Serverinstanz und die Ereignisdaten erhält.

Die Signatur von Ereignishandlern ist immer gleich.

```cpp
void on_player_chat(plugin_own_server_instance_t server, pumpkin_plugin_event_event_t *event) {
    auto &data = event->val.player_chat_event;
    data.cancelled = true;
}
```

Die Union `event->val` enthält ein Element für jeden Ereignistyp. Du kannst damit auf das Element für das registrierte Ereignis zugreifen.

`data` stellt die Ereignisfelder bereit. In diesem Beispiel können wir auf Folgendes zugreifen:

- `player`
- `message`
- `cancelled`
- `recipients`
- `signature`

## Ereignisse ändern und abbrechen

Da der Handler das Ereignis als Zeiger erhält, werden Änderungen, die er daran vornimmt, an den Server zurückgegeben. Die meisten Ereignisse haben ein Feld `cancelled`. Wenn du es setzt, wird das Ereignis abgebrochen: Der obige Codeausschnitt sorgt dafür, dass Chatnachrichten nicht gesendet werden. Ein abgebrochener Blockabbau lässt den Block stehen.

## Blockierend

`blocking` legt fest, ob der Server auf den Handler wartet. So kann ein Handler das Ereignis ändern oder abbrechen. Ein nicht blockierender Handler hält den Server nicht auf, aber seine Änderungen werden verworfen. Er eignet sich daher nur zum Beobachten, etwa für Protokolle oder Statistiken.

## Ereignistypen

Der Typ `pumpkin_plugin_context_event_type_t` gibt an, für welches Ereignis du dich registrierst. Die API stellt Ereignistypkonstanten bereit, zum Beispiel:

- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_JOIN_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_DEATH_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_LEAVE_EVENT`

## Ereignisprioritäten

Der Typ `pumpkin_plugin_context_event_priority_t` legt die Priorität des Handlers fest. Die API stellt Prioritätskonstanten bereit, zum Beispiel:

```c

#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGHEST 0
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGH 1
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL 2
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOW 3
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOWEST 4

```

## Vollständiges Beispiel

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
