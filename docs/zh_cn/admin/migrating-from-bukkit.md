# 从 Bukkit / Spigot / Paper 迁移至 Pumpkin

本指南涵盖将服务器从 Bukkit、Spigot 或 Paper 迁移至 Pumpkin 时的架构与配置差异。

---

## 1. 架构差异

| 方面 | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **运行时环境** | Java 虚拟机（需要 Java 17/21+） | 原生可执行文件（Rust 编译，无需 Java） |
| **启动命令** | `java [flags] -jar server.jar` | `./pumpkin` |
| **Tick 循环** | 带有异步工作分配的单线程 Tick 循环 | 跨 CPU 核心的多线程 Tick 执行 |
| **插件格式** | 面向 Bukkit API 的 Java 字节码（`.jar`） | WebAssembly（`.wasm`），或通过 PatchBukkit 支持 `.jar` |
| **插件开发语言** | Java、Kotlin、Scala | Rust、Python、Kotlin、C#、Go、C |
| **配置文件** | `server.properties`、`paper.yml`、`spigot.yml` | `pumpkin.toml`（TOML 格式） |
| **内存管理** | JVM 垃圾回收（Garbage Collection） | 原生操作系统内存分配 |

---

## 2. 插件与扩展

### WebAssembly 插件
Pumpkin 的主要插件格式为 WebAssembly（`.wasm`）：
- **隔离性**：插件在沙箱化的 WebAssembly 运行时中运行。
- **语言支持**：开发者可以使用 Rust、Python、Go、C#、C 或 Kotlin 将插件编译为 WASM。
- **移植插件**：关于将自定义 Bukkit 插件移植到 Pumpkin，请参见[开发者迁移指南](../plugin-dev/migrating-from-bukkit/index)。

### Bukkit 插件兼容性：PatchBukkit
对于依赖现有 Bukkit/Spigot `.jar` 插件的服务器，**PatchBukkit** 项目提供了兼容层：
- **架构**：PatchBukkit 在 Pumpkin 内部嵌入了一个 JVM 并重新实现了部分 Bukkit API，通过 JNI 和 FFI 与 Pumpkin 桥接。
- **插件目录**：兼容的 `.jar` 插件放置在 `patchbukkit/patchbukkit-plugins/` 目录中。
- **现状与限制**：PatchBukkit 仍在积极开发中。标准 Bukkit API 调用受支持；严重依赖 NMS（`net.minecraft.server`）内部类、CraftBukkit 反射或字节码操作的插件可能无法正常工作。
- **Java 依赖**：使用 PatchBukkit 需要在宿主系统上安装 Java 运行时（JRE/JDK）以运行内嵌的 JVM。

---

## 3. 配置与属性

Pumpkin 使用 TOML 配置文件替代 `server.properties` 和 YAML：

| Paper / Spigot（`server.properties`） | Pumpkin（`pumpkin.toml`） |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. 世界与数据存储

- **格式兼容性**：Pumpkin 支持标准的 Anvil 区块格式（`.mca` 文件）。
- **目录结构**：从现有的 Paper/Spigot 复制世界时，请确保维度目录（`world`、`world_nether`、`world_the_end`）与 Pumpkin 的目录布局相符。
- **需要最新的世界与数据包格式**：至少在目前阶段，Pumpkin 仅支持对应目标 Minecraft 版本的最新世界格式和数据包格式。运行时不会自动转换旧版世界格式或旧版数据包。
  - **在客户端中升级世界**：如果要迁移较旧的世界，请在导入 Pumpkin 前先进行升级。您可以直接在官方 Minecraft 客户端中更新世界：使用匹配的最新版本打开客户端，进入**单人游戏**，选择该世界，点击**编辑**并选择**优化世界**。或者，您也可以在匹配最新版本的原版/Paper 服务器中启动并保存一次该世界。
  - **数据包**：确保 `world/datapacks` 中的所有自定义数据包均已更新到目标版本所要求的格式版本。

---

## 5. 启动与 JVM 标志

### 无需安装 Java
纯净的 Pumpkin 是一个独立的自包含原生可执行文件。运行该服务器不需要在系统或容器中安装 Java 运行时（JRE/JDK）。

### 启动命令对比
Paper 和 Spigot 服务器通常使用带有堆内存分配和垃圾回收参数的 JVM 启动脚本（如 Aikar's Flags）：

:::code-group

```bash [Paper (JVM)]
# 带有 Aikar's Flags 的典型 Paper 启动命令：
java -Xms10G -Xmx10G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -Dusing.aikars.flags=https://mcflags.emc.gs \
  -Daikars.new.flags=true \
  -jar paper.jar --nogui
```

```bash [Pumpkin (原生)]
# Linux / macOS:
./pumpkin

# Windows:
./pumpkin.exe

# Docker:
docker run -p 25565:25565 -v ./data:/data pumpkinmc/pumpkin:latest
```

:::

### 内存机制差异
- **无垃圾回收器**：Pumpkin 由 Rust 编写，在编译期使用确定性的内存管理（RAII）。不存在运行时的垃圾回收器，因此无需调优 GC 停顿。
- **无需固定堆内存**：原生程序中不存在 `-Xms` 和 `-Xmx` 标志。内存根据区块和实体的加载动态向操作系统申请，卸载后立即释放。
- **JVM 标志不适用**：用于调优垃圾回收策略、分代大小或 JVM 内部机制的参数均不适用，且无法传递给程序。

---

## 管理员检查清单

1. [ ] 备份现有服务器数据和世界文件，并确保世界与数据包已升级到最新格式（例如通过客户端的“优化世界”）。
2. [ ] 将 `server.properties` 中的设置映射至 `pumpkin.toml`。
3. [ ] 确定所需插件并寻找 WebAssembly（`.wasm`）替代，或使用 [PatchBukkit](#bukkit-插件兼容性patchbukkit) 进行测试。
4. [ ] 若使用代理网络，在 `pumpkin.toml` 中配置代理设置（`Velocity` / `BungeeCord`）。
5. [ ] 更新启动脚本以直接运行 `./pumpkin`，无需传入 JVM 参数。
6. [ ] 启动服务器并检查连接和日志。
