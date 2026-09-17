# Adding a Plugin Loader

Pumpkin's plugin architecture is runtime-agnostic. The server does not assume all plugins run in WebAssembly or native shared libraries; instead, all execution runtimes implement the unified [`PluginLoader`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/plugin/loader/mod.rs) trait.

This guide explains how `PluginLoader` operates and demonstrates how to implement a custom loader for new script runtimes or virtual machines (such as Lua, JavaScript/Boa, or GraalVM).

---

## The `PluginLoader` Trait

All plugin loaders implement the `PluginLoader` trait located in `crates/pumpkin/src/plugin/loader/mod.rs`:

```rust
use std::{any::Any, path::Path, pin::Pin, sync::Arc};
use crate::plugin::{PluginMetadata, api::Plugin};

pub type PluginLoadFuture<'a> = Pin<
    Box<
        dyn Future<
                Output = Result<
                    (Arc<dyn Plugin>, PluginMetadata, Box<dyn Any + Send + Sync>),
                    LoaderError,
                >,
            > + Send
            + 'a,
    >,
>;

pub type PluginUnloadFuture<'a> =
    Pin<Box<dyn Future<Output = Result<(), LoaderError>> + Send + 'a>>;

pub trait PluginLoader: Send + Sync {
    /// Determines whether this loader handles the target file.
    fn can_load(&self, path: &Path) -> bool;

    /// Loads, parses, and initializes a plugin instance asynchronously.
    fn load<'a>(&'a self, path: &'a Path) -> PluginLoadFuture<'a>;

    /// Unloads the plugin and reclaims associated resources.
    fn unload(&self, data: Box<dyn Any + Send + Sync>) -> PluginUnloadFuture<'_>;

    /// Indicates whether the runtime supports safe unloading without memory leaks.
    fn can_unload(&self) -> bool;
}
```

---

## Existing Loaders in Pumpkin

Pumpkin currently provides two official loaders:

1. **`NativePluginLoader` (`loader/native.rs`)**:
   - Matches dynamic library files (`.so` on Linux, `.dll` on Windows, `.dylib` on macOS).
   - Dynamically links the library using [`libloading`](https://docs.rs/libloading/).
   - Locates and invokes the extern entrypoint function (`pumpkin_plugin_init`).
   - `can_unload()` returns `false` due to OS-level shared library unloading hazards.
2. **`WasmPluginLoader` (`loader/wasm/mod.rs`)**:
   - Matches `.wasm` files.
   - Verifies cryptographic signatures (see [WASM Signing](/developer/plugins/wasm-signing)).
   - JIT-compiles WebAssembly components using [Wasmtime](https://wasmtime.dev/).
   - Links host WIT exports (`pumpkin-host-bindings`).
   - `can_unload()` returns `true` because Wasmtime safely drops guest memory.

---

## Step-by-Step: Adding a Custom Plugin Loader

Here is how to create a custom loader (e.g., for a scripting runtime):

### Step 1: Define the Loader Struct
Create a new file in `crates/pumpkin/src/plugin/loader/my_loader.rs`:

```rust
use std::{any::Any, path::Path, sync::Arc};
use crate::plugin::loader::{LoaderError, PluginLoadFuture, PluginLoader, PluginUnloadFuture};
use crate::plugin::{PluginMetadata, api::Plugin};

pub struct MyCustomLoader;

impl MyCustomLoader {
    #[must_use]
    pub fn new() -> Self {
        Self
    }
}
```

### Step 2: Implement File Recognition (`can_load`)
Check the file extension or inspect header bytes:

```rust
impl PluginLoader for MyCustomLoader {
    fn can_load(&self, path: &Path) -> bool {
        path.extension()
            .and_then(|ext| ext.to_str())
            .is_some_and(|ext| ext.eq_ignore_ascii_case("script"))
    }
```

### Step 3: Implement Asynchronous Loading (`load`)
The `load` method reads the script, initializes the VM, registers server host callbacks, and returns a tuple containing:
1. `Arc<dyn Plugin>`: The generic plugin handle.
2. `PluginMetadata`: Name, author, version, description.
3. `Box<dyn Any + Send + Sync>`: Loader-specific context (e.g., VM state) retained for unloading.

```rust
    fn load<'a>(&'a self, path: &'a Path) -> PluginLoadFuture<'a> {
        Box::pin(async move {
            let script_content = tokio::fs::read_to_string(path).await
                .map_err(|e| LoaderError::InitializationFailed(e.to_string()))?;

            // 1. Parse plugin metadata from header or accompanying manifest
            let metadata = PluginMetadata {
                name: "ExampleScript".into(),
                version: "1.0.0".into(),
                authors: vec!["Author".into()],
                description: Some("Custom script plugin".into()),
            };

            // 2. Initialize runtime instance
            let plugin_instance = Arc::new(MyScriptPluginWrapper::new(script_content));
            let runtime_state: Box<dyn Any + Send + Sync> = Box::new(());

            Ok((plugin_instance, metadata, runtime_state))
        })
    }
```

### Step 4: Implement Clean Unloading (`unload` & `can_unload`)
If your runtime can cleanly terminate without leaking resources:

```rust
    fn can_unload(&self) -> bool {
        true
    }

    fn unload(&self, data: Box<dyn Any + Send + Sync>) -> PluginUnloadFuture<'_> {
        Box::pin(async move {
            // Drop runtime state and disconnect event listeners
            drop(data);
            Ok(())
        })
    }
}
```

### Step 5: Register the Loader in `PluginManager`

Open `crates/pumpkin/src/plugin/mod.rs` and register your loader in `PluginManager::new()`:

```rust
// In crates/pumpkin/src/plugin/mod.rs
let mut loaders: Vec<Box<dyn PluginLoader>> = Vec::new();

loaders.push(Box::new(NativePluginLoader::new()));
loaders.push(Box::new(WasmPluginLoader::new()));
loaders.push(Box::new(MyCustomLoader::new())); // Add custom loader
```

During server startup, Pumpkin iterates through all registered loaders in sequence when scanning the `plugins/` folder, dispatching each file to the first loader whose `can_load` returns `true`.
