# Changelog

Changes to the Zig bindings and helpers, grouped by `pumpkin-api-zig` version. These versions are separate from Pumpkin server releases. The plugin API revision named by a release must still match the server.

## 0.2.0

WIT: [pumpkin-plugin-wit@79cc4f0](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/79cc4f05a7f47e5672169d3bef593855267ec5e2).

### New helpers and examples

- [Chat prompts](./prompts): ask questions, parse numeric answers, retry validation and present clickable or typed choices. Sessions support cancellation, replacement, timeouts, custom text and matching, capture filters and a configurable choice command.
- [Menus](./menus): mark chest-like `free` slots, place existing `stacks` and read contents through `menu.items`, including during `on_close`.
- [Vault](./menus#a-vault-with-pages): personal storage with page selection, occupied-slot indicators, `/vault <page>` and capacity configurable from 1 to 45 pages. Occupied higher pages remain reachable when capacity is lowered.
- The menu example adds `/trash`, and the heal example accepts a bare `/heal` for the sender.

### More control over helpers

- [Commands](./commands): replace typed argument errors through `cmd.bad_argument`, return styled failures with `cmd.failWith` and skip automatic permission registration with `register_permission`.
- [Items](./items): set default italics, choose modifier IDs, read and write explicit data namespaces, and inspect inventory capacity with `item.room`. See its documented offhand limitation before using it for trades.
- [Configuration](./files): choose TOML or JSON independently of the file name, control file creation and missing-setting rewrites, suppress unknown-key warnings and bound file reads. The TOML writer supports structs and tuples inside arrays.
- [Player data](./player-data): choose JSON layouts, TOML or a custom codec; configure key validation, idle eviction and read-size limits. Format changes do not migrate existing files.
- [Networking](./networking): configure TCP receive buffers for outgoing and accepted connections, and choose the HTTPS certificate bundle with `http.ca_file`. `/nettest` adds coverage for custom buffers and overlong lines.

### Fixes

- TOML serialization no longer fails on structs or tuples inside arrays.
- Runtime-generated color buttons keep separate backing storage for their names.

## 0.1.1

WIT: [pumpkin-plugin-wit@75f96e9](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/75f96e9475c44295f346e87531e7508f40057622).

Fixed a compile-time branch quota failure when a plugin declared three or more events. [Compare 0.1.0 and 0.1.1](https://github.com/Pumpkin-MC/pumpkin-api-zig/compare/v0.1.0...v0.1.1).

## 0.1.0

WIT: [pumpkin-plugin-wit@75f96e9](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/75f96e9475c44295f346e87531e7508f40057622).

Initial release for Zig 0.16.0, building plugins as WebAssembly components:

- Generated plugin API and `wasi:sockets` bindings, with the canonical ABI runtime and callback resource management.
- `addPlugin` and `target` for plugin builds, additional Zig imports and WASI-compatible C dependencies.
- Event registration, declarative command trees and styled text helpers.
- Locked inventory menus and item helpers for building, editing, giving and taking stacks.
- Delayed and repeating tasks with copied data and cancellation tracking.
- TOML and JSON configuration, per-player file stores, HTTP/HTTPS and TCP/UDP networking.
- Example plugins, `/nettest` for server-side networking checks, and automated build and release workflows.

See the [0.1.0](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.1.0), [0.1.1](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.1.1) and [0.2.0](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.2.0) releases for their artifacts and plugin API revisions.
