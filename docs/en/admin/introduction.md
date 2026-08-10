# Administration Overview

Welcome to the **Admin Section** for Pumpkin server administrators. Pumpkin is a high-performance, multithreaded Minecraft server written in Rust, engineered to support massive player counts with minimal resource consumption.

---

## Key Features for Server Admins

- **Extreme Multithreading**: Designed from the ground up for modern multi-core processors.
- **WASM Plugin Architecture**: Secure, sandboxed plugin execution in Rust, Python, Kotlin, C#, Go, or C without JVM overhead.
- **Native Cross-Proxy Support**: Out-of-the-box support for Velocity, BungeeCord, and modern proxy forwarding.
- **TOML-Based Configuration**: Clean, human-readable configuration files located in `pumpkin.toml` and feature-specific TOML configs.

---

## Admin Guides & Topics

Explore the following administration guides:

- [Migrating from Bukkit / Paper / Spigot Server](./migrating-from-bukkit) — Key differences in server administration, plugins, world storage, and performance.
- [Server Configuration](../config/introduction) — Detailed breakdown of `pumpkin.toml` settings.
- [Proxy Setup](../config/proxy) — Configuring BungeeCord & Velocity player forwarding.
- [Commands & Permissions](../config/commands) — Managing in-game operator commands and permissions.
- [Authentication](../config/authentication) — Online-mode vs offline-mode and Yggdrasil settings.
- [Troubleshooting & Common Issues](../troubleshooting/common_issues) — Resolving port binding, memory, and plugin loading issues.
