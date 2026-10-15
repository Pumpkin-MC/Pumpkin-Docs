# Olaylar

Olaylar, eklentinizin oyuncuların katılması veya mesajların gönderilmesi gibi sunucuda gerçekleşen eylemlere tepki vermesini sağlar.

## Olay kaydetme

`pumpkin_context_register_event` kullanarak eklentinizin `on_load` işlevinde bir olay işleyicisi kaydedebilirsiniz.

```cpp
void pumpkin_context_register_event(
    pumpkin_plugin_context_borrow_context_t self,
    pumpkin_event_handler_t handler,
    pumpkin_plugin_context_event_type_t event_type,
    pumpkin_plugin_context_event_priority_t event_priority,
    bool blocking);
```
- `event-type`: Dinlenecek olayın türü.
- `event-priority`: Bu işleyicinin diğerlerine göre ne zaman çağrılacağını belirler.
- `blocking`: Olayın, bu işleyici tamamlanana kadar bekleyip beklemeyeceğini belirler.

### Örnek

```cpp
pumpkin_context_register_event(
    borrowed_ctx, 
    on_player_chat,
    PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_CHAT_EVENT,
    PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL,
    true);
```

## Olay işleyicileri

Olay işleyicisi, sunucu örneğini ve olay verilerini alan bir işlevdir.

Olay işleyicilerinin imzası her zaman aynıdır.

```cpp
void on_player_chat(plugin_own_server_instance_t server, pumpkin_plugin_event_event_t *event) {
    auto &data = event->val.player_chat_event;
    data.cancelled = true;
}
```

`event->val` birleşimi her olay türü için bir üye içerir. Kaydettiğiniz olay türüne ait üyeye buradan erişebilirsiniz.

`data`, olay alanlarını sunar. Bu örnekte şu alanlara erişebiliriz:

- `player`
- `message`
- `cancelled`
- `recipients`
- `signature`

## Olayları değiştirme ve iptal etme

İşleyici olayı bir işaretçi aracılığıyla aldığı için yaptığı değişiklikler sunucuya geri aktarılır. Çoğu olayda `cancelled` alanı bulunur. Bu alanı ayarlamak olayı iptal eder: Yukarıdaki kod parçası sohbet mesajlarının gönderilmesini engeller; iptal edilen bir blok kırma olayı da bloğu yerinde bırakır.

## Engelleme

`blocking`, sunucunun işleyiciyi bekleyip beklemeyeceğini belirler. Bu sayede işleyici olayı değiştirebilir veya iptal edebilir. Engellemeyen bir işleyici sunucuyu bekletmez, ancak yaptığı değişiklikler atılır. Bu nedenle yalnızca günlük veya istatistik gibi gözlem amaçları için uygundur.

## Olay türleri

`pumpkin_plugin_context_event_type_t` türü, hangi olaya kaydolduğunuzu belirtir. API şu tür olay sabitlerini sağlar:

- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_JOIN_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_DEATH_EVENT`
- `PUMPKIN_PLUGIN_EVENT_EVENT_TYPE_PLAYER_LEAVE_EVENT`

## Olay öncelikleri

`pumpkin_plugin_context_event_priority_t` türü işleyicinin önceliğini belirler. API şu öncelik sabitlerini sağlar:

```c

#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGHEST 0
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_HIGH 1
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_NORMAL 2
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOW 3
#define PUMPKIN_PLUGIN_EVENT_EVENT_PRIORITY_LOWEST 4

```

## Tam örnek

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
