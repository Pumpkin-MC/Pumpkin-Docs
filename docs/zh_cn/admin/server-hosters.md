# 服主与托管服务商指南

本指南涵盖了 Minecraft 托管服务商与游戏面板维护者（Pterodactyl、Pelican、PufferPanel、Crafty 及自定义容器平台）集成与运行 Pumpkin 服务器所需了解的全部内容。

---

## 1. 部署与文件结构差异（Java 服务端 vs. Pumpkin）

将原版（Vanilla）、Spigot 或 Paper 的模板迁移至 Pumpkin 的托管面板应注意以下部署差异：

| 特性 | 原版 / Paper / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **EULA 检查 (`eula.txt`)** | 启动前需要在 `eula.txt` 中设置 `eula=true` | **不需要**（采用 GPL 许可证实现，首次运行即可直接启动） |
| **配置文件** | `server.properties`、`spigot.yml`、`config/paper-global.yml` | 工作目录下的单一 `pumpkin.toml`（首次启动时自动生成） |
| **服务器图标** | `server-icon.png` | `icon.png`（或通过 `pumpkin.toml` 中的 `favicon_path` 指定自定义路径） |
| **日志文件路径** | `logs/latest.log` | 根目录下的 `latest.log`（可通过 `[logging] file` 配置） |
| **默认区块格式** | 原版 Anvil (`.mca`) | 原生 `.pump` 格式（`[world.chunk] type = "pump"`，或可选 `"anvil"` / `"linear"`） |
| **插件格式与目录** | `plugins/` 目录下的 `.jar` 文件 | `plugins/` 目录下的 `.wasm` WebAssembly 组件（或通过可选的 PatchBukkit 支持 `.jar`） |
| **插件市场** | Hangar / Modrinth / SpigotMC | [Pumpkin 插件市场](https://market.pumpkinmc.org)（内置 Ed25519 签名验证） |
| **远程管理** | 传统 TCP RCON / MSMP | 仅支持基于 WebSocket 的 [MSMP](../config/management)（`[networking.management]`，不支持传统 TCP RCON） |

### 世界格式与切换服务端软件
默认情况下，Pumpkin 使用原生 `.pump` 格式保存区块（`[world.chunk] type = "pump"`）。如果你的面板提供**世界导入/导出工具**，或者允许用户在同一世界文件夹下切换 Paper/原版与 Pumpkin，请在 `pumpkin.toml` 中将区块格式设为 `"anvil"`，以便使用标准的 `.mca` 区域文件：

```toml
[world.chunk]
type = "anvil"
```

### 持久化基岩版身份密钥
当启用基岩版 / NetherNet 时，Pumpkin 会生成 `nethernet-key.der`（通过 `[networking.bedrock.nethernet] identity_key` 配置），用于客户端首次使用信任（TOFU）身份验证。请确保该文件在容器重建时持久化保存在服务器的数据卷中，以免回头访问的基岩版客户端被拒绝连接。

---

## 2. 运行时与二进制分发

### 无需 JVM
Pumpkin 是由 Rust 编译而成的独立原生可执行文件（Linux/macOS 上为 `pumpkin`，Windows 上为 `pumpkin.exe`）：
- **极简基础镜像**：除非用户明确安装了可选的 [PatchBukkit](./migrating-from-bukkit#bukkit-插件兼容性-patchbukkit) 兼容层，否则容器内无需安装 Java 运行时环境（JRE/JDK）。极简 Linux 镜像（如 `debian:bookworm-slim` 或 `ghcr.io/pumpkin-mc/pumpkin:master`）均可开箱即用。
- **预编译二进制文件**：面向 `x86_64` 与 `aarch64`（Linux、Windows、macOS）的官方二进制文件发布在 [GitHub Releases](https://github.com/Pumpkin-MC/Pumpkin/releases) 和[下载页面](https://pumpkinmc.org/download)。
- **直接启动**：直接在服务器工作目录中执行 `./pumpkin`。**请勿**传递 JVM 启动参数（如 `-Xms`、`Xmx`、`-XX:+UseG1GC`、`-jar` 或 `--nogui`），因为二进制程序会拒绝未知的命令行标志。

---

## 3. 进程生命周期与控制台集成

| 生命周期钩子 | 预期行为 / 值 |
| :--- | :--- |
| **工作目录** | 在当前工作目录（`cwd`）下读写 `pumpkin.toml`、`world/`、`plugins/` 和 `latest.log`。 |
| **首次启动配置** | 如果不存在 `pumpkin.toml`，会自动生成默认配置文件。 |
| **启动就绪日志** | `Server is now running` |
| **优雅停机** | 向 `stdin` 写入 `stop\n`，或发送 `SIGINT` / `SIGTERM` 信号。 |
| **诊断命令** | `tps` 与 `tick query`（报告 TPS、MSPT 以及 P50/P95/P99 刻耗时百分位数）。 |

### 非交互式控制台（`stdin` / `stdout` 管道）
对于通过标准管道而非完整伪终端（PTY）附加到服务器进程的面板，请在 `pumpkin.toml` 中禁用交互式 `rustyline` TTY 行编辑，同时保持控制台命令执行开启：

```toml
[commands]
use_console = true
use_tty = false

[logging]
enabled = true
color = true # 如果面板日志查看器不支持 ANSI 转义序列，请设为 false
```

### 环境变量
- **`RUST_LOG`**：无需修改 `pumpkin.toml` 即可覆盖 `[logging] level`（例如 `RUST_LOG=debug` 或 `RUST_LOG=info`）。
- **`RAYON_NUM_THREADS`**：覆盖 Pumpkin 的 Rayon 并行计算线程池所生成的工作线程数（在 `/proc/cpuinfo` 暴露全部宿主机核心的共享容器环境中非常有用）。

### 无人值守的插件权限提示
默认情况下，当 WebAssembly 插件请求未批准的权限时，`[plugins]` 下的 `ask_permission_confirmation = true` 会在服务器控制台中发出交互提示。在无头（Headless）托管环境中，请确保用户可以在启动期间通过网页控制台发送输入，或者允许在 `pumpkin.toml` 中配置 `ask_permission_confirmation` 和 `allowed_permissions`（参见[插件配置](../config/plugins)）。

---

## 4. 端口分配、代理与出站网络

Pumpkin 不使用 `server.properties`，而是在 `pumpkin.toml` 中配置所有监听器和代理模式。

> [!IMPORTANT]
> **单端口共享节点：** Pumpkin 默认**同时**启用 Java 版（`25565`）和基于 NetherNet 的基岩版（`19132`）。在每个容器仅分配单个端口的共享节点上，多个实例会在 `19132` 端口发生冲突，除非你的面板为 `[networking.bedrock.nethernet]` 分配第二个端口，或者将 `[networking.bedrock] enabled = false`。

```toml
[networking.java]
enabled = true
address = "0.0.0.0:25565"
max_players = 1000

[networking.bedrock]
enabled = true # 如果未分配基岩版端口，请设为 false

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
external_ip = "" # 可选：在 NAT 后运行时设为节点的公网 IP

[networking.query]
enabled = false
address = "0.0.0.0:25565"

[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
```

### 状态监控与远程管理（无传统 RCON）
- **不支持传统 TCP RCON**：Pumpkin 不支持传统 TCP RCON。面板必须通过 `stdin` 发送命令，或使用 `[networking.management]` 下基于 WebSocket 的 [Minecraft 服务器管理协议 (MSMP)](../config/management)。
- **服务器列表 Ping 与 Query**：标准的 TCP 状态 Ping 可在 Java 版地址上正常工作，此外可在 `[networking.query]` 下启用 UDP [GameSpy4 Query](../config/query)。

### 代理网络（Velocity、BungeeCord、Vine）
如果你的面板支持自动化配置代理（如 Velocity 现代转发、BungeeCord/BungeeGuard 或 Vine），所有代理设置均位于 `pumpkin.toml` 的 `[networking.proxy]` 下，而非独立的 `spigot.yml` 或 `paper-global.yml` 文件中（参见[代理配置](../config/proxy)）。

### 出站 HTTPS 端点
请确保容器防火墙规则允许访问以下出站 HTTPS（`443`）端点：
- **Mojang / Xbox Live 身份验证**：用于正版在线模式（online-mode）会话与材质皮肤验证。
- **Pumpkin 插件市场 (`https://market.pumpkinmc.org`)**：在启动时用于验证已签名的市场 WASM 插件（`[plugins] verify_signatures = true`）以及可选的匿名遥测心跳（`[telemetry] enabled = true`，参见[遥测配置](../config/telemetry)）。

---

## 5. 资源限制与规格配置

- **内存限制**：由于原生 Rust 二进制文件动态向操作系统分配和释放内存，没有固定的 JVM 堆内存上限（`-Xms` / `-Xmx`），请在容器或操作系统层面强制执行内存限制（如 Docker `--memory`、`cgroup` 限制或 systemd `MemoryMax`）。单个插件的 WASM 内存也可以通过 `[plugins]` 下的 `max_memory_mb` 进行限制。
- **CPU 与多线程**：Pumpkin 使用 Tokio 处理异步网络 I/O，使用 Rayon 进行并行区块生成、光照计算和实体刻（Entity Ticking）。请使用标准的容器 CPU 约束（`--cpus`、`cpuset-cpus` 或 `RAYON_NUM_THREADS`）来控制共享宿主机上的多核利用率。
- **基准资源占用**：Pumpkin 启动耗时约 10 ms，空载内存占用约 60 MiB，在 1.5–2 GiB 内存下即可承载数百名并发玩家（各档位的 CPU 与内存画像请参见[性能基准](../about/benchmarks)）。

---

## 6. Pterodactyl / Pelican 预设（Egg）参考

为 Pumpkin 创建 Pterodactyl 或 Pelican 预设（Egg）时，可使用以下配置解析器与进程设置：

:::code-group

```json [Process Configuration]
{
  "startup": {
    "done": "Server is now running"
  },
  "stop": "stop",
  "configs": {
    "pumpkin.toml": {
      "parser": "file",
      "find": {
        "[networking.java]": "[networking.java]\nenabled = true\naddress = \"0.0.0.0:{{server.build.default.port}}\"",
        "use_tty = true": "use_tty = false"
      }
    }
  }
}
```

:::
