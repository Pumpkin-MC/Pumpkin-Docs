# Writing a Event Handler
Event handlers are one of the main functions of plugins, they allow a plugin to tap into the internal workings of the server, and alter it's behavior to perform some other action. For a simple example, we will implement a handler for the `player_join` event. 

The Pumpkin Plugin Event System tries to copy the Bukkit/Spigot Event system, so that developers coming from there will have a easier time learning Pumpkin.

The Event System also uses inheritance to make it easy to expect the data that you will get from an event.
## Join Event
To further explain the inheritance system, let's demonstrate it on the Player Join event:
```
Event
├── get_name() 
│
├── CancellableEvent
│   ├── is_cancelled()
│   └── set_cancelled()
│   │
│   └── PlayerEvent
│       ├── get_player()
│       │
│       └── PlayerJoinEvent
│           ├── get_join_message()
│           └── set_join_message() 
```
As you can see, the `PlayerJoinEvent` exposes two methods. But since it inherits the `PlayerEvent` type, it will also expose the `get_player()` method. This continues up the tree structure, so in the end, all the methods you see here will be available on the `PlayerJoinEvent`

## Implementing the Join Event
Individual event handlers are just structs which implement the `EventHandler<T>` trait (where T is a specific event implementation).

### What are blocking events?
The Pumpkin Plugin Event System differentiates between two types of evetns: blocking and non-blocking. Each have their benefits:
#### Blocking events
```diff
+ Can modify the event (like editing the join message)
+ Can cancel the event
+ Have a priority system
- Are executed in sequence
- Can slow down the server if not implemented well
```
#### Non-blocking events
```diff
+ Are executed in parallel
+ Are executed after all blocking events finish
+ Can still do some modifications (anything that is behin a Mutex or RwLock)
- Can not cancel the event
- No priority system
- Allow for less control over the event
```

### Writing a handler
Since our main aim here is to change the welcome message that the player sees when they join a server, we will be choosing the blocking event type with a low priority.

Add this code above the `on_load` method:
```rs
use async_trait::async_trait; // [!code ++:4]
use pumpkin_api_macros::{plugin_impl, plugin_method, with_runtime};
use pumpkin::plugin::{player::{join::PlayerJoinEventImpl, PlayerEvent, PlayerJoinEvent}, Context, EventHandler};
use pumpkin_util::text::{color::NamedColor, TextComponent};
use pumpkin_api_macros::{plugin_impl, plugin_method}; // [!code --:2]
use pumpkin::plugin::Context;

struct MyJoinHandler; // [!code ++:12]

#[with_runtime(global)]
#[async_trait]
impl EventHandler<PlayerJoinEventImpl> for MyJoinHandler {
    async fn handle_blocking(&self, event: &mut PlayerJoinEventImpl) {
        event.set_join_message(
            TextComponent::text(format!("Welcome, {}!", event.get_player().gameprofile.name))
                .color_named(NamedColor::Green),
        );
    }
}
```

**Explanation**:
- `struct MyJoinHandler;`: The struct for our event handler
- `#[with_runtime(global)]`: Pumpkin uses the tokio async runtime, which acts in wierd ways across the plugin boundary. Even though it is not necessary in this specific example, it is a good practise to wrap all async `impl`s that interact with async code with this macro.
- `#[async_trait]`: Rust doesn't have native support for traits with async methods. So we use the `async_trait` crate to allow this.
- `async fn handle_blocking()`: Since we chose for this event to be blocking, it is necessary to implement the `handle_blocking()` method instead of the `handle()` method.

::: warning IMPORTANT
It is important that the `#[with_runtime(global)]` macro is **above** the **`#[async_trait]`** macro. If they are in the opposite order, the `#[with_runtime(global)]` macro might not work
:::

### Registering the handler
Now that we have written the event handler, we need to tell the plugin to use it. We can do that by adding a single line to the `on_load` method:
```rs
use pumpkin::plugin::{player::{join::PlayerJoinEventImpl, PlayerEvent, PlayerJoinEvent}, Context, EventHandler, EventPriority}; // [!code ++]
use pumpkin::plugin::{player::{join::PlayerJoinEventImpl, PlayerEvent, PlayerJoinEvent}, Context, EventHandler}; // [!code --]

#[plugin_method]
async fn on_load(&mut self, server: &Context) -> Result<(), String> {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info")).init();

    log::info!("Hello, Pumpkin!");

    server.register_event(MyJoinHandler, EventPriority::Lowest, true).await; // [!code ++]

    Ok(())
}
```
Now if we build the plugin and join the server, we should see a green "Welcome !" message with our username!