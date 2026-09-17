# 迁移概述与架构

从 **Bukkit / Spigot / Paper** 插件开发迁移到 Pumpkin，意味着从以 Java 为中心的面向对象模型转变为编译型的多语言 **WebAssembly (WASM)** 组件模型。

---

下表对比了传统的 Bukkit/Paper 范式与 Pumpkin 现代 WebAssembly 架构的差异：

| 概念 | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **语言支持** | Java / Kotlin / Scala (JVM) | Rust、Python、Kotlin、C#、Go、C |
| **二进制输出** | `.jar` Java 归档 | `.wasm` WebAssembly 组件 |
| **插件描述符** | `plugin.yml` 文件 | 声明式代码 `PluginMetadata` 结构体 |
| **生命周期钩子** | `onEnable()` / `onDisable()` | `on_load(context)` / `on_unload(context)` |
| **安全性与隔离性** | 无限制的 JVM 反射 | 沙箱化 WASM 权能模型 |
| **并发模型** | 单线程 Tick 循环 (`BukkitScheduler`) | 带有异步运行时的多线程原生执行 |

---

## 详细迁移主题

探索关于迁移各个主要插件子系统的专属指南：

- [迁移命令](./commands) — 从 `getCommand().setExecutor()` 和 `plugin.yml` 过渡到 Brigadier 命令树。
- [迁移事件](./events) — 使用 Pumpkin 的阻塞与非阻塞事件系统替换 `@EventHandler` 和 `Listener` 接口。
- [迁移物品栏与 GUI](./inventories) — 从 `Bukkit.createInventory()` 迁移到 Pumpkin 容器与窗口处理器。
- [迁移配置与数据](./configuration) — 使用原生 TOML、JSON 或自定义存储替换 `getConfig()` / `config.yml`。
