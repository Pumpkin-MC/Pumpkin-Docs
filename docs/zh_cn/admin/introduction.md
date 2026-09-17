# 管理员概述

欢迎来到面向 Pumpkin 服务器管理员的**管理员指南**。Pumpkin 是一款使用 Rust 编写的高性能、多线程 Minecraft 服务器，旨在以极低的资源消耗支持海量并发玩家。

---

## 服务器管理员核心特性

- **极致多线程**：专为现代多核处理器从底层设计打造。
- **WASM 插件架构**：安全、沙箱化的插件执行环境，支持使用 Rust、Python、Kotlin、C#、Go 或 C 开发，无 JVM 开销。
- **原生跨代理支持**：开箱即用支持 Velocity、BungeeCord 及现代代理转发。
- **基于 TOML 的配置**：清晰、人类可读的配置文件，位于 `pumpkin.toml` 及各特定功能的 TOML 配置文件中。

---

## 管理员指南与主题

探索以下管理指南：

- [从 Bukkit / Paper / Spigot 服务器迁移](./migrating-from-bukkit) — 服务器管理、插件、世界存储和性能方面的核心差异。
- [服务器配置](../config/introduction) — `pumpkin.toml` 设置的详细分解说明。
- [代理设置](../config/proxy) — 配置 BungeeCord 与 Velocity 玩家转发。
- [命令与权限](../config/commands) — 管理游戏内管理员命令与权限。
- [身份验证](../config/authentication) — 正版在线模式与离线模式以及 Yggdrasil 设置。
- [故障排除与常见问题](../troubleshooting/common_issues) — 解决端口绑定、内存以及插件加载问题。
