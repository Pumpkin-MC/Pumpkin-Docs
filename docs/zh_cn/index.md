# 快速开始

**当前状态:**
预发布：目前正在开发中，尚未准备好正式发布。

## 下载预发布二进制文件

您可以在[预发布下载页面](https://pumpkinmc.org/download)下载预构建的二进制文件

## 从源码构建（Rust）

要使用 Rust 运行 Pumpkin，请确保您已安装 [Rust](https://www.rust-lang.org/tools/install)。

1. 克隆仓库：

```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **可选：** 如果需要，您可以将原版世界放入 `Pumpkin/` 目录中。只需将世界文件夹命名为 `world`。

3. 运行：

> [!NOTE]注意
> 由于发布版本的大量优化，构建过程可能需要一些时间。

```shell
cargo run --release
```

4. **可选：** 如果您想使用 CPU 特定功能，可以设置 `target-cpu=native` Rust 编译器标志。

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE]注意
> 要在本地系统上连接自托管的服务器（例如在 Linux 上使用 Prism 启动器登录并运行 Minecraft，同时用 Pumpkin 托管服务器），您可能需要在"多人游戏"→"添加服务器"→"服务器地址"中输入"localhost:25565"作为服务器地址，尽管该地址不会显示在终端的运行服务器输出中。
```text
localhost:25565
```

## Docker

> [!IMPORTANT]重要
> Docker 支持目前处于实验阶段。

如果您尚未安装，需要先[安装 Docker](https://docs.docker.com/engine/install/)。安装 Docker 后，可以运行以下命令启动服务器：

```shell
docker run --rm \
    -p <暴露端口>:25565  \
    -v <服务器数据位置>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<暴露端口>`：您想要连接 Pumpkin 的端口，例如 `25565`。
- `<服务器数据位置>`：您希望存储服务器配置和数据的位置，例如 `./data`。

### 示例

要在端口 `25565` 上运行 Pumpkin 并将数据存储在名为 `./data` 的目录中，您可以运行以下命令：

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## 测试服务器

Pumpkin 有一个由 @kralverde 维护的测试服务器。它运行在 Pumpkin master 分支的最新提交上。

- **IP:** pumpkin.kralverde.dev

**配置:**

- 系统: Debian GNU/Linux bookworm 12.7 x86_64
- 内核: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, 禁用 TSX) (2) @ 2.40 GHz
- 内存: 4GB DIMM
