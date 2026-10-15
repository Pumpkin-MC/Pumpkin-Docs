# Gebeurtenissen

Met gebeurtenissen kan je plugin reageren op acties op de server, zoals spelers die deelnemen of berichten die worden verstuurd.

## Een gebeurtenis registreren

Je kunt een gebeurtenishandler registreren in de functie `on_load` van je plugin met `pumpkin_context_register_event`.

```cpp
void pumpkin_context_register_event(
    pumpkin_plugin_context_borrow_context_t self,
    pumpkin_event_handler_t handler,
    pumpkin_plugin_context_event_type_t event_type,
    pumpkin_plugin_context_event_priority_t event_priority,
    bool blocking);
```
- `event-type`: Het type gebeurtenis waarop je wilt reageren.
- `event-priority`: Bepaalt wanneer deze handler wordt aangeroepen ten opzichte van andere handlers.
- `blocking`: Bepaalt of de gebeurtenis moet wachten totdat deze handler klaar is.

### Voorbeeld

```cpp
pumpkin_context_register_event(
    borrowed_ctx, 
    on_player_chat,
    PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_CHAT_EVENT,
    PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL,
    true);
```

## Gebeurtenishandlers

Een gebeurtenishandler is een functie die de serverinstantie en de gebeurtenisgegevens ontvangt.

De signatuur van gebeurtenishandlers is altijd hetzelfde.

```cpp
void on_player_chat(plugin_own_server_instance_t server, pumpkin_plugin_event_event_t *event) {
    auto &data = event->val.player_chat_event;
    data.cancelled = true;
}
```

De union `event->val` bevat een lid voor elk gebeurtenistype. Je kunt het lid gebruiken dat hoort bij de gebeurtenis waarvoor je de handler hebt geregistreerd.

Via `data` zijn de velden van de gebeurtenis beschikbaar. In dit voorbeeld kunnen we deze velden gebruiken:

- `player`
- `message`
- `cancelled`
- `recipients`
- `signature`

## Gebeurtenissen wijzigen en annuleren

Omdat de handler de gebeurtenis als pointer ontvangt, worden wijzigingen teruggegeven aan de server. De meeste gebeurtenissen hebben een veld `cancelled`. Als je dit instelt, wordt de gebeurtenis geannuleerd: door het bovenstaande codefragment worden chatberichten niet verstuurd en blijft een geannuleerde blokbreuk ongewijzigd.

## Blokkerend

`blocking` bepaalt of de server op de handler wacht. Hierdoor kan de handler de gebeurtenis wijzigen of annuleren. Een niet-blokkerende handler houdt de server niet tegen, maar wijzigingen die de handler aanbrengt worden genegeerd. Dit is dus alleen geschikt om gebeurtenissen te observeren, bijvoorbeeld voor logging of statistieken.

## Gebeurtenistypen

Het type `pumpkin_plugin_context_event_type_t` geeft aan voor welke gebeurtenis je de handler registreert. De API bevat gebeurtenistypeconstanten zoals:

- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_JOIN_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_DEATH_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_LEAVE_EVENT`

## Gebeurtenisprioriteiten

Het type `pumpkin_plugin_context_event_priority_t` stelt de prioriteit van de handler in. De API bevat prioriteitsconstanten zoals:

```c

#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGHEST 0
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGH 1
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL 2
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOW 3
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOWEST 4

```

## Volledig voorbeeld

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
