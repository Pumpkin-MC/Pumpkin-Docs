# 创建一个新项目

Pumpkin 插件使用 [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html) 构建系统。

此插件的完整代码可作为模板在 [GitHub](https://github.com/BjornTheProgrammer/Hello-Pumpkin-Wasm) 上找到。

## 安装工具链

在编译插件之前，我们必须安装 `wasm32-wasip2` 目标。
您可以通过运行以下命令来安装该目标：

```bash
rustup target add wasm32-wasip2
```

## 初始化一个新的 crate

首先，我们需要创建一个新的项目文件夹。您可以在您创建的文件夹中运行以下命令来完成此操作：

```bash
cargo new <project-name> --lib
```

在此之后，我们想要创建一个名为 `.cargo` 的新目录，
并添加一个包含以下内容的 `config.toml` 文件

```toml [config.toml]
[build]
target = "wasm32-wasip2"
```

总的来说，您的新文件夹结构应如下所示：

```bash
├── .cargo/
│   └── config.toml
├── src/
│   └── lib.rs
├── Cargo.toml
└── Cargo.lock
```

## 配置 crate

由于 Pumpkin 插件在运行时作为动态库加载，我们需要告知 Cargo 将该 crate 构建为动态库。
:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin-wasm"
version = "0.1.0"
edition = "2024"

[lib] // [!code ++:2]
crate-type = ["cdylib"]

[dependencies]
```

:::

接下来，我们需要添加一些基础的依赖项。由于 Pumpkin 仍处于早期开发阶段，其内部 crate 尚未发布到 crates.io，因此我们需要告知 Cargo 直接从 GitHub 下载这些依赖项。
:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["cdylib"]

[dependencies]
// [!code ++:3]
# 这是一个 API crate，它能够简化插件的创建过程，并包含 WIT 定义。
pumpkin-plugin-api = { version = "0.1.0", git = "https://github.com/Pumpkin-MC/Pumpkin", package = "pumpkin-plugin-api" }
tracing = "0.1"
```

:::

为了提升性能并减小文件体积，我们建议启用链接时优化（LTO）。
请注意，这将会增加编译时间。
:::code-group

```toml [Cargo.toml]
[profile.release] // [!code ++:2]
lto = true
```

:::
<small>仅为发布构建启用 LTO。</small>
