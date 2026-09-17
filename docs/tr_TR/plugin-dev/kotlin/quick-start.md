# Quick Start

This guide will help you get started with writing Pumpkin server plugins using Kotlin.

:::warning
Until the Kotlin + Wasm component toolchain matures more, there will be some oddity and inconvenience. 

Bugs are also expected.
:::

## Prerequisites

Before you start, ensure you have the following installed:
- JDK 17 or later
    - To run Gradle 9.4
- [Rust](https://rust-lang.org/)
    - This is required as a key component (wit-bindgen) is written and Rust must be built from a particular Kotlin-enabled fork.
    - You only need a default Rust install for your host platform. NOT for any WebAssembly targets
- [wasm-tools](https://github.com/bytecodealliance/wasm-tools)
    - To bundle the Wasm Kotlin produces into a component
- Make (e.g. [GNU Make](https://www.gnu.org/software/make/))
    - To run the convenience `Makefile`. You may opt to do without and perform the contained steps manually.

## Setting up the project

Unlike most of the other APIs packages available, [pumpkin-api-kt](https://github.com/Pumpkin-MC/pumpkin-api-kt) is a TEMPLATE, not e.g. a Maven package.

To start off, clone the template (and rename it as you please):
```sh
git clone --recurse-submodules https://github.com/Pumpkin-MC/pumpkin-api-kt
mv pumpkin-api-kt my_kotlin_plugin
cd my_kotlin_plugin
```

Next, we'll want to update the `wit` submodule so we are using the latest version of the Pumpkin plugin API.

```sh
cd wit
git pull origin master
cd ..
```

Finally, rename the Gradle project. Change the `rootProject.name` in `settings.gradle.kts`, AND the `PROJECT_NAME` in `Makefile`. They must both match. Whatever you name the project, is going to be the filename of the Wasm produced.

## Creating your first plugin

As part of the template, a basic plugin is implemented in `src/wasmWasiMain/kotlin/plugin/Plugin.kt`. 

Feel free to modify the metadata at the bottom. However, before changing anything else, it's recommended that you build the plugin (see next section) first so that the bindings are generated and IDE completion works for `pumpkin`.

## Building the plugin

To build your plugin into a WebAssembly component:

```sh
make
```

The compiled `.wasm` file will be located in `build`. You can place this file in the `plugins` folder of your Pumpkin server.

Note that doing this the first time might take awhile, while it builds `wit-bindgen` from Rust source.

Running `make` will check for `wit-bindgen` updates each time. You may want to run instead `make componentify` after the initial setup to avoid this.

## Troubleshooting

### Linker errors
If you start getting errors like
```
main ThreadId(01) pumpkin::plugin: Failed to load plugin from
"./plugins/my_plugin.wasm": Wasm plugin initialization error: plugin failed
to load with error: component imports instance 'pumpkin:plugin/gui@0.1.0', but
a matching implementation was not found in the linker
```
or other "linker" errors when loading your plugin into Pumpkin, update the `wit` submodule.

```sh
cd wit
git pull origin master
cd ..
```
