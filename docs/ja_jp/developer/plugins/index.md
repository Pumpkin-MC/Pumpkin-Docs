# Plugin Engine Architecture

Pumpkin features a modular, multi-runtime plugin engine designed for performance, safety, and cross-language interoperability.

Unlike traditional Minecraft servers that rely on a single JVM class loader, Pumpkin isolates plugin execution through dedicated loaders supporting both **native high-performance Rust binaries** and **sandboxed WebAssembly components** compiled from Rust, Python, C#, C, Go, or Kotlin.

---

## Architectural Overview

### Architectural Breakdown

| Subsystem | Primary Crate | Responsibility |
| :--- | :--- | :--- |
| **Plugin Manager** | `crates/pumpkin/src/plugin` | Lifecycle orchestration (load, enable, disable), event dispatching, and loader registration |
| **Native Loader** | `crates/pumpkin/src/plugin/loader/native` | Direct dynamic library loading (`.so`, `.dll`, `.dylib`) for zero-overhead Rust extensions |
| **WASM Loader** | `crates/pumpkin/src/plugin/loader/wasm` | Wasmtime execution engine for sandboxed components compiled from Rust, Python, Go, C#, C, and Kotlin |
| **Interface Specifications** | `crates/pumpkin-plugin-wit` | WebAssembly Interface Types (WIT) defining typed functions, types, and host imports |
| **Security & Verification** | `crates/pumpkin/src/plugin/loader/wasm/sign` | Cryptographic signature verification via W3C wasmsign2 / Ed25519 public keys |

---

## The Dual Execution Model

| Feature | Native Plugins | WebAssembly (Wasmtime) Plugins |
| :--- | :--- | :--- |
| **File Extension** | `.so` (Linux), `.dll` (Windows), `.dylib` (macOS) | `.wasm` (Component Model) |
| **Languages** | Rust (compiled dynamically) | Rust, Python, C#, C, Go, Kotlin |
| **Performance** | Native CPU execution (zero overhead) | JIT-compiled with near-native speed |
| **Sandboxing** | None (runs in host address space) | Memory-isolated sandboxed execution |
| **Security & Signing** | OS-level permissions | Cryptographic W3C Wasm-Sign verification |
| **Hot Unloading** | Limited (OS shared library constraints) | Fully supported memory reclamation |

---

## Event Lifecycle & Dispatching

Plugins interact with Pumpkin primarily through events:

1. **Event Dispatch**:
   - `server.plugin_manager.fire_blocking(&server, &mut event)`: Dispatches events synchronously on the executing thread (e.g., cancelling player block placement or modifying packet payloads).
   - Asynchronous events run on non-blocking Tokio tasks.
2. **Cancellable Events**:
   - Handlers can set `event.cancelled = true` to abort the default game logic (such as cancelling player movement, interactions, or packet processing).

---

## Plugin Engine Documentation

Explore the internal mechanics of Pumpkin's plugin system:

- **[Adding a Plugin Loader](/developer/plugins/loaders)**: Step-by-step guide on implementing the `PluginLoader` trait for new scripting languages and runtimes.
- **[WASM Signing & Verification](/developer/plugins/wasm-signing)**: Detailed specification of Ed25519 cryptographic signing, W3C `wasmsign2` custom sections, and marketplace license verification.

> [!NOTE]
> Looking to develop third-party plugins rather than working on Pumpkin's internal plugin engine? Check out the **[Plugin Development Guide](/plugin-dev/introduction)**.
