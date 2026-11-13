# 编写基本逻辑

## 插件基础

即使是基础插件，底层也有许多工作要做。为了大幅简化插件开发，
我们将使用 `pumpkin-plugin-api` crate 创建一个基本的空插件。

:::code-group

```rust:line-numbers [lib.rs]
use pumpkin_plugin_api::{Context, Plugin, PluginMetadata};
use tracing::*;

struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "Hello Plugin".into(),
            version: env!("CARGO_PKG_VERSION").into(),
            authors: vec!["Bjorn".into()],
            description: "A simple example plugin".into(),
        }
    }

    fn on_load(&self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Hello from the example plugin!");
        Ok(())
    }

    fn on_unload(&self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Example plugin unloaded. Goodbye!");
        Ok(())
    }
}

pumpkin_plugin_api::register_plugin!(HelloPlugin);
```

:::

这将创建一个空插件，并实现 Pumpkin 加载它所需的全部方法。

现在我们可以尝试首次编译插件。为此，请在项目文件夹中运行以下命令：

```bash
cargo build --release
```

您不必以 release 模式构建，但这能大幅减小 wasm 插件的体积，
并缩短启动时间。

如果一切顺利，您应该会看到类似以下的消息：

```log
╰─ cargo build --release
   Compiling hello-pumpkin-wasm v0.1.0 (/home/bjorn/Documents/GitHub/Hello-Pumpkin-Wasm)
    Finished `release` profile [optimized] target(s) in 0.05s
```

现在，您可以前往 `./target/wasm32-wasip3/release` 文件夹（如果未使用 `--release`，
则前往 `./target/wasm32-wasip3/debug`），找到插件二进制文件。文件名类似如下：

```
hello_pumpkin_wasm.wasm
```

::: info 注意
如果您在 `Cargo.toml` 文件中使用了不同的项目名称，请查找文件名中包含该项目名称的文件。
:::

您可以将此文件重命名为任何喜欢的名称，但必须保持文件扩展名（`.wasm`）不变。

## 测试插件

有了插件二进制文件后，我们就可以在 Pumpkin 服务器上测试它。安装插件非常简单，
只需将刚刚构建的插件二进制文件放入 Pumpkin 服务器的 `plugins/` 文件夹即可！

启动服务器并运行 `/plugins` 命令后，您应该会看到类似以下的输出：

```text
已加载 1 个插件：
hello-pumpkin-wasm
```

## `Context` 对象上实现的方法

```rust
fn get_server(&self) -> Server
```

返回服务器实例。

```rust
fn register_command(&self, command: Command, permission: &str)
```

注册一个新的命令处理器，并指定该命令所需的权限。

```rust
fn register_event_handler<E, H>(&self, handler: H, event_priority: EventPriority, blocking: bool) -> Result<u32>
```

注册一个具有指定优先级的新事件处理器，并指定它是否为阻塞处理器。
