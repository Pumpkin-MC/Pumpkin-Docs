# 添加插件加载器

Pumpkin 的插件架构与运行时无关。服务器不会假定所有插件都运行在 WebAssembly 或原生共享库中；相反，所有执行运行时都会实现统一的 [`PluginLoader`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/plugin/loader/mod.rs) trait。

本指南说明 `PluginLoader` 的工作方式，并演示如何为新的脚本运行时或虚拟机（例如 Lua、JavaScript/Boa 或 GraalVM）实现自定义加载器。

---

## `PluginLoader` Trait

所有插件加载器都会实现位于 `crates/pumpkin/src/plugin/loader/mod.rs` 的 `PluginLoader` trait：

```rust
use std::{any::Any, path::Path, pin::Pin, sync::Arc};
use crate::plugin::{PluginMetadata, api::Plugin};

pub type PluginLoadFuture<'a> = Pin<
    Box<
        dyn Future<
                Output = Result<
                    (Arc<dyn Plugin>, PluginMetadata, Box<dyn Any + Send + Sync>),
                    LoaderError,
                >,
            > + Send
            + 'a,
    >,
>;

pub type PluginUnloadFuture<'a> =
    Pin<Box<dyn Future<Output = Result<(), LoaderError>> + Send + 'a>>;

pub trait PluginLoader: Send + Sync {
    /// 判断此加载器是否处理目标文件。
    fn can_load(&self, path: &Path) -> bool;

    /// 异步加载、解析并初始化插件实例。
    fn load<'a>(&'a self, path: &'a Path) -> PluginLoadFuture<'a>;

    /// 卸载插件并回收相关资源。
    fn unload(&self, data: Box<dyn Any + Send + Sync>) -> PluginUnloadFuture<'_>;

    /// 表示运行时是否支持无内存泄漏的安全卸载。
    fn can_unload(&self) -> bool;
}
```

---

## Pumpkin 中的现有加载器

Pumpkin 目前提供两个官方加载器：

1. **`NativePluginLoader`（`loader/native.rs`）**：
   - 匹配动态库文件（Linux 为 `.so`，Windows 为 `.dll`，macOS 为 `.dylib`）。
   - 使用 [`libloading`](https://docs.rs/libloading/) 动态链接库。
   - 定位并调用外部入口函数（`pumpkin_plugin_init`）。
   - 由于操作系统级共享库卸载存在风险，`can_unload()` 返回 `false`。
2. **`WasmPluginLoader`（`loader/wasm/mod.rs`）**：
   - 匹配 `.wasm` 文件。
   - 验证加密签名（参见 [WASM 签名](/zh_cn/developer/plugins/wasm-signing)）。
   - 使用 [Wasmtime](https://wasmtime.dev/) JIT 编译 WebAssembly 组件。
   - 链接宿主 WIT 导出（`pumpkin-host-bindings`）。
   - 因为 Wasmtime 能安全释放来宾内存，`can_unload()` 返回 `true`。

---

## 分步：添加自定义插件加载器

下面说明如何创建自定义加载器（例如用于脚本运行时）：

### 第 1 步：定义加载器结构体

在 `crates/pumpkin/src/plugin/loader/my_loader.rs` 中创建新文件：

```rust
use std::{any::Any, path::Path, sync::Arc};
use crate::plugin::loader::{LoaderError, PluginLoadFuture, PluginLoader, PluginUnloadFuture};
use crate::plugin::{PluginMetadata, api::Plugin};

pub struct MyCustomLoader;

impl MyCustomLoader {
    #[must_use]
    pub fn new() -> Self {
        Self
    }
}
```

### 第 2 步：实现文件识别（`can_load`）

检查文件扩展名或文件头字节：

```rust
impl PluginLoader for MyCustomLoader {
    fn can_load(&self, path: &Path) -> bool {
        path.extension()
            .and_then(|ext| ext.to_str())
            .is_some_and(|ext| ext.eq_ignore_ascii_case("script"))
    }
```

### 第 3 步：实现异步加载（`load`）

`load` 方法读取脚本、初始化虚拟机、注册服务器宿主回调，并返回包含以下内容的元组：

1. `Arc<dyn Plugin>`：通用插件句柄。
2. `PluginMetadata`：名称、作者、版本、描述。
3. `Box<dyn Any + Send + Sync>`：卸载时保留的加载器专用上下文（例如虚拟机状态）。

```rust
    fn load<'a>(&'a self, path: &'a Path) -> PluginLoadFuture<'a> {
        Box::pin(async move {
            let script_content = tokio::fs::read_to_string(path).await
                .map_err(|e| LoaderError::InitializationFailed(e.to_string()))?;

            // 1. 从头部或随附清单解析插件元数据
            let metadata = PluginMetadata {
                name: "ExampleScript".into(),
                version: "1.0.0".into(),
                authors: vec!["Author".into()],
                description: Some("Custom script plugin".into()),
            };

            // 2. 初始化运行时实例
            let plugin_instance = Arc::new(MyScriptPluginWrapper::new(script_content));
            let runtime_state: Box<dyn Any + Send + Sync> = Box::new(());

            Ok((plugin_instance, metadata, runtime_state))
        })
    }
```

### 第 4 步：实现干净卸载（`unload` 和 `can_unload`）

如果你的运行时可以干净地终止且不泄漏资源：

```rust
    fn can_unload(&self) -> bool {
        true
    }

    fn unload(&self, data: Box<dyn Any + Send + Sync>) -> PluginUnloadFuture<'_> {
        Box::pin(async move {
            // 释放运行时状态并断开事件监听器
            drop(data);
            Ok(())
        })
    }
}
```

### 第 5 步：在 `PluginManager` 中注册加载器

打开 `crates/pumpkin/src/plugin/mod.rs`，并在 `PluginManager::new()` 中注册加载器：

```rust
// 在 crates/pumpkin/src/plugin/mod.rs 中
let mut loaders: Vec<Box<dyn PluginLoader>> = Vec::new();

loaders.push(Box::new(NativePluginLoader::new()));
loaders.push(Box::new(WasmPluginLoader::new()));
loaders.push(Box::new(MyCustomLoader::new())); // 添加自定义加载器
```

服务器启动期间扫描 `plugins/` 文件夹时，Pumpkin 会按顺序遍历所有已注册加载器，并把每个文件分派给第一个 `can_load` 返回 `true` 的加载器。
