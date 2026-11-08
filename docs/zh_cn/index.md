# 快速开始

**当前状态：**
预发布：目前正在开发中，尚未准备好正式发布。

::: tip 性能基准：Pumpkin vs. Paper vs. Folia (MC 26.3)
- **冷启动开机耗时：** Pumpkin 仅需 **`9.6 ms – 12.9 ms`**，相比之下 Paper 与 Folia 为 **`4,650 ms – 4,905 ms`**（**提速约 380x – 480x**）。
- **内存占用：** Pumpkin **空载 `60 MiB`**，在 **400 – 700 名并发玩家时占用 `1.42 GiB – 1.78 GiB`**；相比之下 Paper 与 Folia 占用 **`10.8 GiB – 11.7 GiB`**（Aikar 10G 参数）。
- **单区域承载能力（20.0 TPS）：** 1 核 / 2 vCPU 上可承载 **`250 名玩家`**（Paper 与 Folia 为 `150`）；4 核 / 8 vCPU 上可承载 **`700+ 名玩家`**（300 人时 MSPT 为 `13.17 ms`，400 人时为 `18.89 ms`，相比之下 Paper 与 Folia 仅为 **`300 名玩家`**）。
- **多区域承载能力（8 个区域 @ 20.0 TPS）：** Pumpkin 可承载 **`600 名玩家`**（`42.79 ms` MSPT，`2.05 GiB` RAM），相比之下 Paper 为 **`100 名玩家`**（`30.10 ms` MSPT，`11.26 GiB` RAM）（在统一全局世界 Tick 下达到 **Paper 的 6 倍承载能力**）。

阅读完整的可复现**[性能基准](/zh_cn/about/benchmarks)**。
:::

## 下载预发布二进制文件

你可以在[预发布下载页面](https://pumpkinmc.org/download)下载预构建的二进制文件。

## 从源码构建（Rust）

要编译 Pumpkin，请确保已安装 [Rust](https://www.rust-lang.org/tools/install)。

1. **克隆仓库**并进入该目录：

```shell
git clone --recurse-submodules https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **可选：** 如果需要，你可以将一个原版世界放入 `Pumpkin/` 目录，只需把世界文件夹命名为 `world`。

3. 运行：

> [!NOTE]
> 由于发布构建会进行大量优化，构建过程可能需要一些时间。

```shell
cargo run --release
```

4. **可选：** 要通过利用 CPU 的特定功能来最大限度提升性能，可以设置 `target-cpu=native` Rust 编译器标志：

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE]
> 要连接（进入）你在同一台本地系统上自行托管的服务器（例如，在 Linux 上使用 Prism 启动器登录并运行 Minecraft，同时使用 Pumpkin 托管服务器），你可能需要依次选择“多人游戏”→“添加服务器”→“服务器地址”，并将“localhost:25565”用作服务器地址，尽管终端的服务器运行输出中不会列出该地址。
```text
localhost:25565
```

## Docker

> [!IMPORTANT]
> Docker 支持目前处于实验阶段。

如果尚未安装，你需要先[安装 Docker](https://docs.docker.com/engine/install/)。安装 Docker 后，可以运行以下命令启动服务器：

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`：用于连接 Pumpkin 的端口，例如 `25565`。
- `<server_data_location>`：希望存储服务器配置和数据的位置，例如 `./data`。

### 示例

要在端口 `25565` 上运行 Pumpkin 并将数据存储在名为 `./data` 的目录中，请运行以下命令：

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Nix / NixOS

Pumpkin 以 `pumpkin-mc` 软件包的形式收录于 [nixpkgs](https://github.com/NixOS/nixpkgs)（由 [@DerGrumpf](https://github.com/DerGrumpf) 维护），同时提供 `services.pumpkin-mc` NixOS 模块，可将其作为 systemd 服务运行。

### 无需安装即可试用

```shell
nix run nixpkgs#pumpkin-mc
```

### NixOS 模块

将以下内容添加到你的 `configuration.nix`：

```nix
services.pumpkin-mc = {
  enable = true;
  openFirewall = true;
};
```

这会在 `/var/lib/pumpkin-mc` 下以经过安全加固的 systemd 服务运行 Pumpkin（`DynamicUser`、`ProtectSystem = "strict"`，无额外权能）。该模块为 `pumpkin.toml` 中的大部分配置提供了带类型的选项，包括 Java/基岩版/RCON/Query/代理网络、白名单、世界存储、日志、PVP 等，另有一个 `settings` 自由格式选项，可用于尚未覆盖的配置。

> [!NOTE]
> RCON 密码和 Velocity 转发密钥会在服务启动时从文件中读取（通过 `rcon.passwordFile` / `proxy.velocity.secretFile`），而不会存储在 Nix store 中，因此可与 `sops-nix` 或 `agenix` 等密钥管理器配合使用。

完整选项列表请参阅[模块源码](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/games/pumpkin-mc.nix)，或运行：

```shell
nixos-option services.pumpkin-mc
```

## 测试服务器

Pumpkin 有一个由 @kralverde 维护的测试服务器，运行 Pumpkin master 分支的最新提交。

- **IP：** pumpkin.kralverde.dev

**硬件与系统配置：**

- 操作系统：Debian GNU/Linux bookworm 12.7 x86_64
- 内核：Linux 6.1.0-21-cloud-amd64
- CPU：Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- 内存：4GB DIMM
