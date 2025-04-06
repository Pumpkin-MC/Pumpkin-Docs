# Writing the basic logic
## Plugin base
Even in a basic plugin, there is a lot going on under the hood, so to greatly simplify plugin development we will use the `pumpkin-api-macros` crate to create a basic empty plugin.

:::code-group
```rs:line-numbers [lib.rs]
use pumpkin_api_macros::plugin_impl;

#[plugin_impl]
pub struct MyPlugin {}

impl MyPlugin {
    pub fn new() -> Self {
        MyPlugin {}
    }
}

impl Default for MyPlugin {
    fn default() -> Self {
        Self::new()
    }
}
```
:::

This will create an empty plugin and implement all the necessary methods for it to be loaded by Pumpkin.

We can now try to compile our plugin for the first time. To do so, run this command in your project folder:
```bash
cargo build --release
```
::: tip NOTICE
If you are using Windows, you **must** use the `--release` flag, or you will run into issues. If you are on another platform, you don't have to use it if you want to save on compile time.
:::
The initial compilation will take a bit, but don't worry, later compilations will be faster.

If all went well, you should be left with a message like this:
```log
╰─ cargo build --release
   Compiling hello-pumpkin v0.1.0 (/home/vypal/Dokumenty/GitHub/hello-pumpkin)
    Finished `release` profile [optimized] target(s) in 0.68s
```

Now you can go to the `./target/release` folder (or `./target/debug` if you didn't use `--release`) and locate your plugin binary.

Depending on your operating system, the file will have one of three possible names:
- For Windows: `hello-pumpkin.dll`
- For MacOS: `libhello-pumpkin.dylib`
- For Linux: `libhello-pumpkin.so`

::: info NOTE
If you used a different project name in the `Cargo.toml` file, look for a file which contains your project name.
:::

You can rename this file to whatever you like, however you must keep the file extension (`.dll`, `.dylib`, or `.so`) the same.

## Testing the plugin
Now that we have our plugin binary, we can go ahead and test it on the Pumpkin server. Installing a plugin is as simple as putting the plugin binary that we just built into the `plugins/` folder of your Pumpkin server!

Thanks to the `#[plugin_impl]` macro, the plugin will have its details (like the name, authors, version, and description) built into the binary so that the server can read them. 

When you start up the server and run the `/plugins` command, you should see an output like this:
```
There is 1 plugin loaded:
hello-pumpkin
```

## Basic methods
The Pumpkin server currently uses two "methods" to tell the plugin about its state. These methods are `on_load` and `on_unload`.

These methods don't have to be implemented, but you will usually implement at least the `on_load` method. In this method you get access to a `Context` object which can give the plugin access to information about the server, but also allows the plugin to register command handlers and events.

To make implementing these methods easier, there is another macro provided by the `pumpkin-api-macros` crate. 
:::code-group
```rs [lib.rs]
use pumpkin_api_macros::{plugin_impl, plugin_method}; // [!code ++:2]
use pumpkin::plugin::Context;
use pumpkin_api_macros::plugin_impl; // [!code --]

#[plugin_method] // [!code ++:4]
async fn on_load(&mut self, server: &Context) -> Result<(), String> {
    Ok(())
}

#[plugin_impl]
pub struct MyPlugin {}

impl MyPlugin {
    pub fn new() -> Self {
        MyPlugin {}
    }
}

impl Default for MyPlugin {
    fn default() -> Self {
        Self::new()
    }
}
```
:::

::: warning IMPORTANT
It is important that you define any plugin methods before the `#[plugin_impl]` block.
:::

This method gets a mutable reference to its plugin object (in this case the `MyPlugin` struct) which it can use to initialize any data stored in the plugin's main struct, and a reference to a `Context` object. This object is specifically constructed for this plugin based on the plugin's metadata.

### Methods implemented on the `Context` object:
```rs
fn get_data_folder() -> String
```
Returns the path to the folder dedicated to this plugin, which should be used for persistent data storage
```rs
async fn get_player_by_name(player_name: String) -> Option<Arc<Player>>
```
If a player by the name `player_name` is found (has to be currently online), this function will return a reference to them.
```rs
async fn register_command(tree: CommandTree, permission: PermissionLvl)
```
Registers a new command handler, with a minimum required permission level.
```rs
async fn register_event(handler: Arc<H>, priority: EventPriority, blocking: bool)
```
Registers a new event handler with a set priority and if it is blocking or not.
By the way, `handler` is `Arc<T>`, which means you can implement a lot of events on one handler, and then register it.

## Basic on-load method
For now we will only implement a very basic `on_load` method to be able to see that the plugin is running.

Here we will set up the inner Pumpkin logger and set up a "Hello, Pumpkin!" so that we can see our plugin in action.

Add this to the `on_load` method:
:::code-group
```rs [lib.rs]
#[plugin_method]
async fn on_load(&mut self, server: &Context) -> Result<(), String> {
    pumpkin::init_log!(); // [!code ++:3]

    log::info!("Hello, Pumpkin!");

    Ok(())
}
```
:::

If we build the plugin again and start up the server, you should now see "Hello, Pumpkin!" somewhere in the log.