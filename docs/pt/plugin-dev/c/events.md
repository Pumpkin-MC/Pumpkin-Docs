# Eventos

Os eventos permitem que o seu plugin reaja a ações que ocorrem no servidor, como a entrada de jogadores ou o envio de mensagens.

## Registar um evento

Pode registar um manipulador de eventos na função `on_load` do seu plugin usando `pumpkin_context_register_event`.

```cpp
void pumpkin_context_register_event(
    pumpkin_plugin_context_borrow_context_t self,
    pumpkin_event_handler_t handler,
    pumpkin_plugin_context_event_type_t event_type,
    pumpkin_plugin_context_event_priority_t event_priority,
    bool blocking);
```
- `event-type`: O tipo de evento a escutar.
- `event-priority`: Define quando este manipulador é chamado em relação aos outros.
- `blocking`: Indica se o evento deve aguardar até que este manipulador termine.

### Exemplo

```cpp
pumpkin_context_register_event(
    borrowed_ctx, 
    on_player_chat,
    PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_CHAT_EVENT,
    PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL,
    true);
```

## Manipuladores de eventos

Um manipulador de eventos é uma função que recebe a instância do servidor e os dados do evento.

A assinatura dos manipuladores de eventos é sempre igual.

```cpp
void on_player_chat(plugin_own_server_instance_t server, pumpkin_plugin_event_event_t *event) {
    auto &data = event->val.player_chat_event;
    data.cancelled = true;
}
```

A união `event->val` contém um membro para cada tipo de evento. Pode usá-la para aceder ao membro correspondente ao evento que registou.

`data` expõe os campos do evento. Neste exemplo, podemos aceder a:

- `player`
- `message`
- `cancelled`
- `recipients`
- `signature`

## Alterar e cancelar eventos

Como o manipulador recebe o evento através de um ponteiro, as alterações que fizer são devolvidas ao servidor. A maioria dos eventos tem um campo `cancelled`. Ao defini-lo, o evento é cancelado: o trecho de código acima impede o envio de mensagens de chat, e um evento de quebra de bloco cancelado mantém o bloco no lugar.

## Bloqueio

`blocking` determina se o servidor aguarda pelo manipulador. Isto permite que o manipulador altere ou cancele o evento. Um manipulador não bloqueante não atrasa o servidor, mas quaisquer alterações que fizer são descartadas; por isso, só é adequado para observar eventos, por exemplo, para registos ou estatísticas.

## Tipos de evento

O tipo `pumpkin_plugin_context_event_type_t` identifica o evento para o qual se regista. A API fornece constantes de tipos de evento, como:

- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_JOIN_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_DEATH_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_LEAVE_EVENT`

## Prioridades dos eventos

O tipo `pumpkin_plugin_context_event_priority_t` define a prioridade do manipulador. A API fornece constantes de prioridade, como:

```c

#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGHEST 0
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGH 1
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL 2
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOW 3
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOWEST 4

```

## Exemplo completo

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
