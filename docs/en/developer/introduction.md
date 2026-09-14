# Contributor Documentation

Welcome to the internal contributor and developer documentation for Pumpkin!

Pumpkin is an ultra-high-performance, extensible Minecraft server software written entirely in modern **Rust**. Designed from the ground up for concurrency, memory safety, and vanilla fidelity, Pumpkin supports both **Minecraft: Java Edition** and **Minecraft: Bedrock Edition**.

This section provides comprehensive documentation for contributors working on the core Pumpkin server, its internal crates, and supporting tooling.

---

## Core Philosophy & Design Principles

Pumpkin is built on several foundational engineering principles:

- **Zero-Cost Abstractions & Raw Performance**: We leverage Rust's zero-cost abstractions, efficient memory layouts, and cache-friendly data structures to minimize CPU and RAM overhead.
- **Strict Concurrency Model**:
  - **Asynchronous I/O via Tokio**: Network socket handling, client handshakes, packets streaming, and file I/O run efficiently on an asynchronous runtime.
  - **Parallel Compute via Rayon**: Heavy, CPU-bound computations—such as terrain generation, lighting calculations, chunk serialization, and physics—are dispatched to Rayon thread pools to prevent blocking the async network loop.
  - **Thread-safe Communication**: Non-blocking channels (`tokio::sync::mpsc`, crossbeam) coordinate work seamlessly between async tasks and thread pools.
- **Robust Quality & Panic Freedom**: Pumpkin enforces strict Clippy rules. In production server code, panics, `unwrap()`, `expect()`, and unhandled errors are denied at compile time.
- **Modular Workspace Architecture**: Functionality is divided cleanly into focused crates (`pumpkin-protocol`, `pumpkin-world`, `pumpkin-inventory`, `pumpkin-command`, `pumpkin-data`, etc.). Each crate has specific responsibilities and clear dependency boundaries.
- **Protocol Fidelity**: We strive for strict vanilla compatibility while providing modern features like Linear region format support, Bedrock cross-play, and a polyglot WebAssembly plugin runtime.

---

## Documentation Roadmap

Explore the contributor documentation to understand how Pumpkin works and how to contribute effectively:

| Section | Description |
| :--- | :--- |
| **[Contributing Guide](/developer/contributing)** | Step-by-step instructions for environment setup, building, testing, clippy rules, and PR standards. |
| **[Architecture & Crates](/developer/architecture)** | Deep dive into Pumpkin's multi-crate workspace structure, crate responsibilities, and data flow. |
| **[Data Extractor](/developer/extractor)** | Extracting hardcoded vanilla Minecraft registries, bounding boxes, and packet structures via our Fabric mod. |
| **[Networking Overview](/developer/networking/)** | Core networking architecture, transports, and multi-edition support. |
| **[Java Edition Networking](/developer/networking/java/overview)** | Protocol states, [adding packets](/developer/networking/java/adding-packets), and [authentication](/developer/networking/java/authentication). |
| **[Bedrock Edition Networking](/developer/networking/bedrock/overview)** | RakNet/NetherNet transport, [adding packets](/developer/networking/bedrock/adding-packets), [authentication](/developer/networking/bedrock/authentication), and [NetherNet](/developer/networking/bedrock/nethernet). |
| **[Proxy Forwarding](/developer/networking/proxy/)** | Secure player info forwarding for [BungeeCord](/developer/networking/proxy/bungeecord), [Velocity](/developer/networking/proxy/velocity), and [Vine](/developer/networking/proxy/vine). |
| **[Query Protocol](/developer/networking/query)** | GameSpy4 UDP query implementation for external monitoring bots and server lists. |
| **[Blocks](/developer/blocks/)** | Block architecture, states, collisions, properties, and [adding block behaviors](/developer/blocks/adding-blocks). |
| **[Items](/developer/items/)** | Item architecture, data components, food, cooldowns, and [adding item behaviors](/developer/items/adding-items). |
| **[Entities & Mobs](/developer/entities/)** | Entity trait hierarchy, [spawning & tracking](/developer/entities/spawning-and-tracking), and [mob AI & pathfinding](/developer/entities/ai-and-mobs). |
| **[Commands](/developer/commands/)** | Pure-Rust Brigadier command tree, [adding commands](/developer/commands/adding-commands), [arguments & suggestions](/developer/commands/arguments-and-suggestions), and [execution context](/developer/commands/execution-and-context). |
| **[Plugin Engine](/developer/plugins/)** | Internal plugin engine architecture, [adding plugin loaders](/developer/plugins/loaders), and [WASM signing & licensing](/developer/plugins/wasm-signing). |
| **[World Engine & Formats](/developer/world)** | Chunk loading, saving, Anvil/Linear/Slime/Pump formats, terrain generation, and lighting. |
| **[Code Generation](/developer/codegen)** | How `tools/pumpkin-codegen` processes vanilla Minecraft data to generate `pumpkin-data`. |
| **[Porting Minecraft Versions](/developer/porting-versions)** | End-to-end guide to upgrading Pumpkin: data extraction, assets & datapacks, codegen, compiler fixes, new block/item/entity logic, and ViaVersion remapping. |
| **[Mobile Development](/developer/mobile)** | Developing and compiling Pumpkin on mobile environments like Android (Termux). |

---

## Plugin Development vs. Core Development

> [!NOTE]
> If you are looking to build third-party plugins that extend Pumpkin rather than contributing to the server itself, please check out the dedicated **[Plugin Development](/plugin-dev/introduction)** section.
>
> Pumpkin supports writing plugins in **Rust**, **Python**, **C#**, **C**, **Go**, and **Kotlin** powered by our WebAssembly (Wasmtime) runtime and WIT interfaces.
