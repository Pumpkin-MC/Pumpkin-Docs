# 创建新项目

Pumpkin 插件使用 [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html) 构建系统。

此插件的完整代码可在 [GitHub 上的模板](https://github.com/BjornTheProgrammer/Hello-Pumpkin-Wasm)中找到。

## 安装工具链

在编译插件之前，我们必须安装 `wasm32-wasip3` 目标。您可以通过运行以下命令来安装该目标：

```bash
rustup target add wasm32-wasip3
```

## 初始化新的 crate

首先，我们需要创建一个新的项目文件夹。您可以在已创建的文件夹中运行以下命令：

```bash
cargo new <project-name> --lib
```

完成后，我们要创建一个名为 `.cargo` 的新目录，并在其中添加一个 `config.toml` 文件，内容如下：

```toml [config.toml]
[build]
target = "wasm32-wasip3"
```

最终，新文件夹的结构应如下所示：

```bash
├── .cargo/
│   └── config.toml
├── src/
│   └── lib.rs
├── Cargo.toml
└── Cargo.lock
```

## 配置 crate

由于 Pumpkin 插件在运行时作为动态库加载，我们需要告诉 Cargo 将此 crate 构建为动态库。
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

接下来，我们需要从 [crates.io](https://crates.io) 添加一些基本依赖项：
:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["cdylib"]

[dependencies]
// [!code ++:5]
# 这是让插件创建更简单的 API crate，其中包含 WIT 定义
pumpkin-plugin-api = "0.2.1+26.3-26.51"
# 可选：用于市场许可和更新检查的实用工具
pumpkin-plugin-utils = "0.1.0-dev+26.2-26.45"
tracing = "0.1"
```

:::

为了提高性能并减小文件体积，我们建议启用链接时优化（Link-Time Optimization，LTO）。
请注意，这会增加编译时间。
:::code-group

```toml [Cargo.toml]
[profile.release] // [!code ++:2]
lto = true
```

:::
<small>仅为 release 构建启用 LTO。</small>
