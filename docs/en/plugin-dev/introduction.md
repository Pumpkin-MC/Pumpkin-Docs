# Pumpkin Plugin Development

::: warning
The Pumpkin Plugin API is still in a very early stage of development and may change at any time.
If you run into any issues please reach out on [our Discord server](https://discord.gg/aaNuD6rFEe).
:::

Pumpkin has two different ways of developing plugins for the server. There are
[native plugins](./native-plugin-template/creating-project) and there are
[wasm plugins](./native-plugin-template/creating-project). These ways have quite a few differences
between them.

The Pumpkin Plugin API takes inspiration from the Spigot/Bukkit plugin API in many places,
so if you have previous experience with these and have experience with Rust development,
you should have a pretty easy time writing plugins for Pumpkin. :smile:

## Wasm Plugins

Wasm plugins have the advantage of always being supported by future Pumpkin versions. If you build
a wasm plugin, it should always work for future versions of Pumpkin. You should always default
building with wasm plugins.

Pros
* Plugins are sandboxed
* Future support is guaranteed
* Compile times are orders of magnitude faster
* You can compile Wasm plugins from other languages

Cons
* Not as in depth API
* Does not have access to the entire operating system
* Startup times are slower
* Newer API, and as such missing functionality

## Native Plugins

Native plugins are incredibly fragile. You must compile against the same commit that the Pumpkin
server was built on in order to ensure compatibility. However nlugins integrate with the server
software on a very deep level allowing for many things that would not be possible on other server software.

Pros
* Fast startup
* Complete control of the entire server via API

Cons
* Very fragile if not actively maintained
* Can crash the entire server if not properly coded
* Compile times are incredibly slow
* You cannot use any toolchain you wish
