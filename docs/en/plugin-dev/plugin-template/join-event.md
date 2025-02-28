# Writing a Event Handler
Event handlers are one of the main functions of plugins, they allow a plugin to tap into the internal workings of the server, and alter it's behavior to perform some other action. For a simple example, we will implement a handler for the `player_join` event. 

The Pumpkin Plugin Event System tries to copy the Bukkit/Spigot Event system, so that developers coming from there will have a easier time learning Pumpkin.
But Rust have different conceptions and rules, so its not all like in Bukkit/Spigot.
Rust not have inheritance, instead of this Rust have only composition.

The Event System uses traits for dynamically handle some events: `Event`, `Cancellable`, `PlayerEvent` and etc.
Cancellable can be also not Event, because its trait.

## Implementing the Join Event
Individual event handlers are just structs which implement the `EventHandler<T>` trait (where T is a specific event implementation).

### What are blocking events?
The Pumpkin Plugin Event System differentiates between two types of events: blocking and non-blocking. Each have their benefits:
#### Blocking events
```diff
Pros:
+ Can modify the event (like editing the join message)
+ Can cancel the event
+ Have a priority system
Cons:
- Are executed in sequence
- Can slow down the server if not implemented well
```
#### Non-blocking events
```diff
Pros:
+ Are executed in parallel
+ Are executed after all blocking events finish
+ Can still do some modifications (anything that is behin a Mutex or RwLock)
Cons:
- Can not cancel the event
- No priority system
- Allow for less control over the event
```

### Writing a handler
Since our main aim here is to change the welcome message that the player sees when they join a server, we will be choosing the blocking event type with a low priority.

Add this code above the `on_load` method:
:::code-group
```rs [lib.rs]
use async_trait::async_trait; // [!code ++:4]
use pumpkin_api_macros::with_runtime;
use pumpkin::plugin::{player::PlayerJoinEvent, Context, EventHandler};
use pumpkin_util::text::{color::NamedColor, TextComponent};

struct MyJoinHandler; // [!code ++:12]

#[with_runtime(global)]
#[async_trait]
impl EventHandler<PlayerJoinEvent> for MyJoinHandler {
    async fn handle_blocking(&self, event: &mut PlayerJoinEvent) {
        event.join_message =
            TextComponent::text(format!("Welcome, {}!", event.player.gameprofile.name))
                .color_named(NamedColor::Green);
    }
}
```
:::

**Explanation**:
- `struct MyJoinHandler;`: The struct for our event handler
- `#[with_runtime(global)]`: Pumpkin uses the tokio async runtime, which acts in weird ways across the plugin boundary. Even though it is not necessary in this specific example, it is a good practice to wrap all async `impl`s that interact with async code with this macro.
- `#[async_trait]`: Rust doesn't have native support for traits with async methods. So we use the `async_trait` crate to allow this.
- `async fn handle_blocking()`: Since we chose for this event to be blocking, it is necessary to implement the `handle_blocking()` method instead of the `handle()` method.

::: warning IMPORTANT
It is important that the `#[with_runtime(global)]` macro is **above** the **`#[async_trait]`** macro. If they are in the opposite order, the `#[with_runtime(global)]` macro might not work
:::

### Registering the handler
Now that we have written the event handler, we need to tell the plugin to use it. We can do that by adding a single line to the `on_load` method:
:::code-group
```rs [lib.rs]
use pumpkin::plugin::{player::PlayerJoinEvent, Context, EventHandler, EventPriority}; // [!code ++]
use pumpkin::plugin::{player::PlayerJoinEvent, Context, EventHandler}; // [!code --]

#[plugin_method]
async fn on_load(&mut self, server: &Context) -> Result<(), String> {
    pumpkin::init_log!();

    log::info!("Hello, Pumpkin!");

    server.register_event(Arc::new(MyJoinHandler), EventPriority::Lowest, true).await; // [!code ++]

    Ok(())
}
```
:::
Now if we build the plugin and join the server, we should see a green "Welcome !" message with our username!