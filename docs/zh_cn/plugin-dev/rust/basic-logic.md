# 编写基础逻辑

## 插件基础

即使是一个基础插件，其底层也涉及大量工作，因此为了极大简化插件开发过程，
我们将使用 `pumpkin-plugin-api` crate 来创建一个基本的空插件。

:::code-group

```rs:line-numbers [lib.rs]
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
            description: "一个简单的示例插件".into(),
        }
    }

    fn on_load(&mut self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("来自示例插件的问候！");
        Ok(())
    }

    fn on_unload(&mut self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("示例插件已卸载。再见！");
        Ok(())
    }
}

pumpkin_plugin_api::register_plugin!(HelloPlugin);
```

:::

这将创建一个空插件，并实现使其能被 Pumpkin 加载所需的所有方法。

现在，我们可以尝试首次编译插件了。为此，请在您的项目文件夹中运行以下命令：

```bash
cargo build --release
```

您不需要以发布模式（release）构建，
但这会极大减小 wasm 插件的大小并缩短启动时间。

如果一切顺利，您应该会看到类似这样的消息：

```log
╰─ cargo build --release
   Compiling hello-pumpkin-wasm v0.1.0 (/home/bjorn/Documents/GitHub/Hello-Pumpkin-Wasm)
    Finished `release` profile [optimized] target(s) in 0.05s
```

现在，您可以进入 `./target/wasm32-wasip2/release` 文件夹（如果您没有使用 `--release`，
则进入 `./target/wasm32-wasip2/debug`）并找到您的插件二进制文件。文件名将类似如下所示。

```
hello_pumpkin_wasm.wasm
```

::: info 注意
如果您在 `Cargo.toml` 文件中使用了不同的项目名称，请查找包含您项目名称的文件。
:::

您可以随意重命名此文件，但必须保持文件扩展名 (`.wasm`) 不变。

## 测试插件

现在我们有了插件二进制文件，可以继续在 Pumpkin 服务器上进行测试。
安装插件非常简单，只需将我们刚刚构建的插件二进制文件放入 Pumpkin 服务器的 `plugins/` 文件夹中即可！

当您启动服务器并运行 `/plugins` 命令时，应该会看到类似这样的输出：

```text
There is 1 plugin loaded（已加载 1 个插件）：
hello-pumpkin-wasm
```

## 在 `Context` 对象上实现的方法

```rs
fn get_server(&self) -> Server
```

返回服务器的一个实例。

```rs
fn register_command(&self, command: Command, permission: &str)
```

注册一个新的命令处理器，并指定该命令所需的权限。

```rs
fn register_event_handler<E, H>(&self, handler: H, event_priority: EventPriority, blocking: bool) -> Result<u32>
```

注册一个新的事件处理器，并指定其优先级以及是否为阻塞式。
