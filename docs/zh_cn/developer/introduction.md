# 贡献者文档

欢迎查阅 Pumpkin 的内部贡献者与开发者文档！

Pumpkin 是一款完全使用现代 **Rust** 编写的超高性能、可扩展 Minecraft 服务器软件。Pumpkin 从设计之初就注重并发、内存安全和原版保真度，同时支持 **Minecraft: Java Edition** 和 **Minecraft: Bedrock Edition**。

本节为参与 Pumpkin 服务器核心、内部 crate 及配套工具开发的贡献者提供全面的文档。

---

## 核心理念与设计原则

Pumpkin 建立在以下几项基础工程原则之上：

- **零成本抽象与极致性能**：我们利用 Rust 的零成本抽象、高效内存布局和缓存友好的数据结构，尽可能降低 CPU 和内存开销。
- **严格的并发模型**：
  - **通过 Tokio 实现异步 I/O**：网络套接字处理、客户端握手、数据包流式传输和文件 I/O 均在异步运行时上高效执行。
  - **通过 Rayon 实现并行计算**：地形生成、光照计算、区块序列化和物理计算等繁重的 CPU 密集型任务会分派到 Rayon 线程池，避免阻塞异步网络循环。
  - **线程安全通信**：非阻塞通道（`tokio::sync::mpsc`、crossbeam）在异步任务与线程池之间无缝协调工作。
- **可靠的质量保障与无 panic 运行**：Pumpkin 强制执行严格的 Clippy 规则。在生产服务器代码中，panic、`unwrap()`、`expect()` 和未处理的错误都会在编译期被禁止。
- **模块化工作区架构**：各项功能清晰地划分到职责专一的 crate 中（`pumpkin-protocol`、`pumpkin-world`、`pumpkin-inventory`、`pumpkin-command`、`pumpkin-data` 等）。每个 crate 都有明确的职责和清晰的依赖边界。
- **协议保真度**：我们力求严格兼容原版，同时提供 Linear 区域格式支持、基岩版跨平台联机和多语言 WebAssembly 插件运行时等现代功能。

---

## 文档导航

浏览贡献者文档，了解 Pumpkin 的工作方式以及如何高效地参与贡献：

| 章节 | 说明 |
| :--- | :--- |
| **[贡献指南](/zh_cn/developer/contributing)** | 环境搭建、构建、测试、Clippy 规则和 PR 规范的分步说明。 |
| **[架构与 Crate](/zh_cn/developer/architecture)** | 深入介绍 Pumpkin 的多 crate 工作区结构、各 crate 的职责以及数据流。 |
| **[数据提取器](/zh_cn/developer/extractor)** | 通过我们的 Fabric 模组提取硬编码的原版 Minecraft 注册表、边界框和数据包结构。 |
| **[网络概述](/zh_cn/developer/networking/)** | 核心网络架构、传输方式和多版本支持。 |
| **[Java 版网络](/zh_cn/developer/networking/java/overview)** | 协议状态、[添加数据包](/zh_cn/developer/networking/java/adding-packets)和[身份验证](/zh_cn/developer/networking/java/authentication)。 |
| **[基岩版网络](/zh_cn/developer/networking/bedrock/overview)** | RakNet/NetherNet 传输、[添加数据包](/zh_cn/developer/networking/bedrock/adding-packets)、[身份验证](/zh_cn/developer/networking/bedrock/authentication)和 [NetherNet](/zh_cn/developer/networking/bedrock/nethernet)。 |
| **[代理转发](/zh_cn/developer/networking/proxy/)** | 为 [BungeeCord](/zh_cn/developer/networking/proxy/bungeecord)、[Velocity](/zh_cn/developer/networking/proxy/velocity) 和 [Vine](/zh_cn/developer/networking/proxy/vine) 提供安全的玩家信息转发。 |
| **[Query 协议](/zh_cn/developer/networking/query)** | 面向外部监控机器人和服务器列表的 GameSpy4 UDP 查询实现。 |
| **[方块](/zh_cn/developer/blocks/)** | 方块架构、方块状态、碰撞、属性以及[添加方块行为](/zh_cn/developer/blocks/adding-blocks)。 |
| **[物品](/zh_cn/developer/items/)** | 物品架构、数据组件、食物、冷却时间以及[添加物品行为](/zh_cn/developer/items/adding-items)。 |
| **[实体与生物](/zh_cn/developer/entities/)** | 实体 trait 层次结构、[生成与追踪](/zh_cn/developer/entities/spawning-and-tracking)，以及[生物 AI 与路径寻找](/zh_cn/developer/entities/ai-and-mobs)。 |
| **[命令](/zh_cn/developer/commands/)** | 纯 Rust 的 Brigadier 命令树、[添加命令](/zh_cn/developer/commands/adding-commands)、[参数与建议](/zh_cn/developer/commands/arguments-and-suggestions)，以及[执行上下文](/zh_cn/developer/commands/execution-and-context)。 |
| **[插件引擎](/zh_cn/developer/plugins/)** | 内部插件引擎架构、[添加插件加载器](/zh_cn/developer/plugins/loaders)，以及 [WASM 签名与许可](/zh_cn/developer/plugins/wasm-signing)。 |
| **[世界引擎与格式](/zh_cn/developer/world)** | 区块加载、保存、Anvil/Linear/Slime/Pump 格式、地形生成和光照。 |
| **[代码生成](/zh_cn/developer/codegen)** | `tools/pumpkin-codegen` 如何处理原版 Minecraft 数据并生成 `pumpkin-data`。 |
| **[移植 Minecraft 版本](/zh_cn/developer/porting-versions)** | 升级 Pumpkin 的端到端指南：数据提取、资源与数据包、代码生成、编译器修复、新的方块/物品/实体逻辑，以及 ViaVersion 重映射。 |
| **[移动端开发](/zh_cn/developer/mobile)** | 在 Android（Termux）等移动端环境中开发和编译 Pumpkin。 |

---

## 插件开发与核心开发

> [!NOTE]
> 如果你希望开发用于扩展 Pumpkin 的第三方插件，而不是为服务器本身做贡献，请查阅专门的 **[插件开发](/zh_cn/plugin-dev/introduction)** 章节。
>
> 依托我们的 WebAssembly（Wasmtime）运行时和 WIT 接口，Pumpkin 支持使用 **Rust**、**Python**、**C#**、**C**、**Go** 和 **Kotlin** 编写插件。
