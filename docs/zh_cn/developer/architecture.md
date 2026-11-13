# Pumpkin 架构与 Crate

Pumpkin 采用模块化 Cargo 工作区组织，由多个专用 crate 组成。每个 crate 都有明确的职责、严格定义的边界和尽可能少的交叉依赖。

这种架构能够实现高速并行编译、隔离测试和零成本数据共享，并使网络协议、游戏逻辑与世界管理之间保持清晰的分离。

---

## 工作区 Crate 概览

### 工作区架构一览

| 层级 | Crate | 职责 |
| :--- | :--- | :--- |
| **核心运行时** | `pumpkin` | 游戏循环、world tick 更新、玩家会话、实体管理和事件循环 |
| **网络与协议** | `pumpkin-protocol`、`pumpkin-auth`、`pumpkin-nbt` | Java 版/基岩版数据包序列化、Yggdrasil 与 Xbox Live 身份验证、SNBT |
| **世界与游戏玩法** | `pumpkin-world`、`pumpkin-inventory`、`pumpkin-command` | 区域 I/O（Anvil/Linear）、地形生成、block tick 更新、容器、Brigadier 命令树 |
| **可扩展性** | `pumpkin-plugin-runtime`、`pumpkin-host-bindings`、`pumpkin-plugin-api`、`pumpkin-plugin-wit` | 通过 Wasmtime 执行 WebAssembly 插件、WIT 宿主 API、原生与 WASM 加载器 |
| **基础设施** | `pumpkin-data`、`pumpkin-config`、`pumpkin-util` | 代码生成的注册表、类型化配置文件、数学向量、权限 |

---

## 各 Crate 详细说明

### 1. `pumpkin`（核心服务器）
- **路径**：`crates/pumpkin`
- **用途**：主服务器二进制程序和集中式编排引擎。
- **职责**：
  - 初始化配置、日志记录（`tracing`）和遥测。
  - 为 Minecraft: Java Edition、Minecraft: Bedrock Edition、RCON、Query 和 LAN 广播启动 Tokio 网络监听器。
  - 管理server tick 循环（`Server::tick`），协调世界更新、玩家操作、实体移动和区块广播。
  - 通过 `crates/pumpkin/src/net/java/` 和 `net/bedrock/` 分派传入的客户端数据包。
  - 集成插件管理器，在数据包处理前后触发事件处理器。

### 2. `pumpkin-protocol`（网络协议）
- **路径**：`crates/pumpkin-protocol`
- **用途**：为 Minecraft Java 版和基岩版提供高速网络传输格式序列化与反序列化。
- **职责**：
  - 实现 `ClientPacket`（序列化）和 `ServerPacket`（反序列化）trait。
  - 处理协议基础类型：`VarInt`、`VarLong`、UUID、NBT 复合标签和字符串编解码器。
  - 实现所有状态下的数据包：`Handshake`、`Status`、`Login`、`Config` 和 `Play`。
  - 提供数据包压缩（ZLib/Fast 压缩）和数据包加密（AES-128/CFB8）。
  - 封装 RCON 和 GameSpy4 Query 协议。

### 3. `pumpkin-world`（世界与区块）
- **路径**：`crates/pumpkin-world`
- **用途**：世界加载、保存、地形生成和区块管理。
- **职责**：
  - 支持多种区块存储格式：
    - **原版 Anvil（`.mca`）**：读取和写入标准区域文件。
    - **Linear（`.linear`）**：采用 zstd 压缩的高效区域格式，可节省 50–95% 的磁盘空间。
    - **Slime（`.slime`）**：单文件世界格式。
    - **Pump**：Pumpkin 原生区块存储格式。
  - 实现世界生成管线：Perlin 噪声高度图、3D 噪声路由器、生物群系气候参数、已放置地物、雕刻器和超平坦地形。
  - 管理方块光照和天空光照的传播。
  - 通过圆柱形区块迭代器协调区块加载、卸载和流式传输。

### 4. `pumpkin-data`（Minecraft 数据集与注册表）
- **路径**：`crates/pumpkin-data`
- **用途**：直接根据原版 Minecraft 资源和报告生成的编译期静态注册表与数据表。
- **职责**：
  - 包含方块、物品、生物群系、实体、声音、粒子、附魔和配方的完整 ID 映射、属性与定义。
  - 跨多个 Minecraft 协议版本查询数据包 ID。
  - 由 `tools/pumpkin-codegen` 生成的零成本查找表。

### 5. `pumpkin-config`（配置管理）
- **路径**：`crates/pumpkin-config`
- **用途**：TOML 配置解析、序列化和验证。
- **职责**：
  - 加载和写入 `pumpkin.toml`。
  - 配置服务器端口、压缩阈值、代理模式、资源包、日志级别、世界设置和基岩版集成。
  - 提供安全的默认值和模式验证。

### 6. `pumpkin-inventory`（物品栏与容器）
- **路径**：`crates/pumpkin-inventory`
- **用途**：服务端容器窗口处理器和物品栏机制。
- **职责**：
  - 管理玩家物品栏、箱子容器、工作台、熔炉和村民交易界面。
  - 验证客户端的槽位点击、拖动操作、物品堆叠和物品拆分。
  - 协调窗口数据包同步，确保客户端物品栏与服务端一致。

### 7. `pumpkin-command`（命令分派器）
- **路径**：`crates/pumpkin-command`
- **用途**：受 Brigadier 启发的分层命令树分派器和解析器。
- **职责**：
  - 使用类型化参数（`Integer`、`Float`、`Entity`、`BlockPos` 等）构建模块化命令树。
  - 执行经过权限检查的命令。
  - 向已连接的客户端提供实时自动补全建议。

### 8. `pumpkin-auth`（身份验证与会话校验）
- **路径**：`crates/pumpkin-auth`
- **用途**：加密身份验证和玩家身份核验。
- **职责**：
  - 通过 Mojang 的 Yggdrasil 身份验证服务器验证客户端会话。
  - 处理登录状态下的 RSA 密钥对生成和共享密钥交换。
  - 支持离线模式 UUID 生成和自定义身份验证端点。
  - 实现代理转发协议：[BungeeCord](https://github.com/SpigotMC/BungeeCord)、[BungeeGuard](https://github.com/lucko/BungeeGuard)，以及使用 HMAC-SHA256 签名的 [Velocity](https://github.com/PaperMC/Velocity) 现代转发。

### 9. `pumpkin-nbt`（命名二进制标签编解码器）
- **路径**：`crates/pumpkin-nbt`
- **用途**：高吞吐量二进制 NBT 解析器和序列化器。
- **职责**：
  - 解析和编码所有标准 NBT 标签类型（`Byte`、`Short`、`Int`、`Long`、`Float`、`Double`、`ByteArray`、`String`、`List`、`Compound`、`IntArray`、`LongArray`）。
  - 支持 Gzip、Zlib 压缩层以及未压缩的网络 NBT。

### 10. `pumpkin-plugin-*`（可扩展性基础设施）
- **路径**：
  - `crates/pumpkin-plugin-api`：用于编译原生插件的 Rust 开发者 SDK。
  - `crates/pumpkin-plugin-runtime`：由 Wasmtime 驱动的 WebAssembly 执行宿主。
  - `crates/pumpkin-plugin-wit`：WebAssembly 接口类型（WIT）规范。
  - `crates/pumpkin-host-bindings`：连接 Wasmtime 与服务器核心的自动生成宿主绑定。
- **用途**：通过沙箱内存和接近原生的性能，实现安全的多语言插件执行（Rust、Python、C#、C、Go、Kotlin）。

### 11. `pumpkin-util` 与 `pumpkin-macros`（基础设施）
- **路径**：`crates/pumpkin-util`、`crates/pumpkin-macros`、`crates/pumpkin-api-macros`
- **用途**：基础类型、共享算法和过程宏。
- **职责**：
  - 数学工具：`Vector2`、`Vector3`、`BoundingBox` 和角度转换。
  - 文本与聊天格式化：`TextComponent` 和 JSON 组件序列化。
  - `#[java_packet(...)]` 等过程宏，用于将数据包结构体绑定到协议 ID 和数据包 trait。

### 12. `tools/`（开发者工具）
- **`tools/pumpkin-codegen`**：自动代码生成器，解析 Minecraft 版本 JAR、数据报告和资源归档，并将 Rust 源文件输出到 `pumpkin-data`。
- **`tools/pumpkin-fuzzer`**：针对网络数据包解析器、NBT 读取器和区域文件解码器的模糊测试套件，用于发现潜在的崩溃途径或内存异常。

---

## 并发与线程模型

| 组件 | 运行时/线程池 | 主要工作负载 | 通信机制 |
| :--- | :--- | :--- | :--- |
| **网络与套接字 I/O** | Tokio 异步运行时 | TCP 数据包读取、基岩版 UDP 数据包、帧处理、会话握手 | 异步任务（`tokio::spawn`）、非阻塞反应器 |
| **繁重计算** | Rayon 线程池 | 地形生成、噪声路由器、光照传播、区块压缩 | 通过 crossbeam/Rayon 迭代器运行的工作线程 |
| **线程间桥梁** | Tokio 通道 | 将已完成的区块和已编码的数据包分派回网络任务 | 非阻塞 `tokio::sync::mpsc` 通道 |

Pumpkin 严格遵循以下职责分离原则：
- **I/O 密集型**：由 Tokio 异步任务管理。
- **CPU 密集型**：由 Rayon 线程池管理。
- **通信**：通过跨线程通道（`tokio::sync::mpsc`）协调，绝不阻塞 Tokio 反应器循环。
