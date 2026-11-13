# 新增插件載入器

Pumpkin 的插件架構與執行環境無關。伺服器不會假定所有插件都執行在 WebAssembly 或原生共享程式庫中；相反，所有執行環境都會實現統一的 [`PluginLoader`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/plugin/loader/mod.rs) trait。

本指南說明 `PluginLoader` 的工作方式，並演示如何為新的指令碼執行環境或虛擬機器（例如 Lua、JavaScript/Boa 或 GraalVM）實現自訂載入器。

---

## `PluginLoader` Trait

所有插件載入器都會實現位於 `crates/pumpkin/src/plugin/loader/mod.rs` 的 `PluginLoader` trait：

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
    /// 判斷此載入器是否處理目標檔案。
    fn can_load(&self, path: &Path) -> bool;

    /// 非同步載入、解析並初始化插件實例。
    fn load<'a>(&'a self, path: &'a Path) -> PluginLoadFuture<'a>;

    /// 卸載插件並回收相關資源。
    fn unload(&self, data: Box<dyn Any + Send + Sync>) -> PluginUnloadFuture<'_>;

    /// 表示執行階段是否支援無記憶體洩漏的安全卸載。
    fn can_unload(&self) -> bool;
}
```

---

## Pumpkin 中的現有載入器

Pumpkin 目前提供兩個官方載入器：

1. **`NativePluginLoader`（`loader/native.rs`）**：
   - 匹配動態程式庫檔案（Linux 為 `.so`，Windows 為 `.dll`，macOS 為 `.dylib`）。
   - 使用 [`libloading`](https://docs.rs/libloading/) 動態連結庫。
   - 定位並呼叫外部入口函式（`pumpkin_plugin_init`）。
   - 由於作業系統級共享程式庫卸載存在風險，`can_unload()` 返回 `false`。
2. **`WasmPluginLoader`（`loader/wasm/mod.rs`）**：
   - 匹配 `.wasm` 檔案。
   - 驗證加密簽名（參見 [WASM 簽名](/zh_tw/developer/plugins/wasm-signing)）。
   - 使用 [Wasmtime](https://wasmtime.dev/) JIT 編譯 WebAssembly 元件。
   - 連結主機 WIT 匯出（`pumpkin-host-bindings`）。
   - 因為 Wasmtime 能安全釋放來賓記憶體，`can_unload()` 返回 `true`。

---

## 分步：新增自訂插件載入器

下面說明如何建立自訂載入器（例如用於指令碼執行環境）：

### 第 1 步：定義載入器結構

在 `crates/pumpkin/src/plugin/loader/my_loader.rs` 中建立新檔案：

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

### 第 2 步：實現檔案識別（`can_load`）

檢查副檔名或檔案頭位元組：

```rust
impl PluginLoader for MyCustomLoader {
    fn can_load(&self, path: &Path) -> bool {
        path.extension()
            .and_then(|ext| ext.to_str())
            .is_some_and(|ext| ext.eq_ignore_ascii_case("script"))
    }
```

### 第 3 步：實現非同步載入（`load`）

`load` 方法讀取指令碼、初始化虛擬機器、註冊伺服器主機回呼，並返回包含以下內容的元組：

1. `Arc<dyn Plugin>`：通用插件控制代碼。
2. `PluginMetadata`：名稱、作者、版本、描述。
3. `Box<dyn Any + Send + Sync>`：卸載時保留的載入器專用上下文（例如虛擬機器狀態）。

```rust
    fn load<'a>(&'a self, path: &'a Path) -> PluginLoadFuture<'a> {
        Box::pin(async move {
            let script_content = tokio::fs::read_to_string(path).await
                .map_err(|e| LoaderError::InitializationFailed(e.to_string()))?;

            // 1. 從頭部或隨附清單解析插件元資料
            let metadata = PluginMetadata {
                name: "ExampleScript".into(),
                version: "1.0.0".into(),
                authors: vec!["Author".into()],
                description: Some("Custom script plugin".into()),
            };

            // 2. 初始化執行環境實例
            let plugin_instance = Arc::new(MyScriptPluginWrapper::new(script_content));
            let runtime_state: Box<dyn Any + Send + Sync> = Box::new(());

            Ok((plugin_instance, metadata, runtime_state))
        })
    }
```

### 第 4 步：實現乾淨卸載（`unload` 和 `can_unload`）

如果你的執行階段可以乾淨地終止且不洩漏資源：

```rust
    fn can_unload(&self) -> bool {
        true
    }

    fn unload(&self, data: Box<dyn Any + Send + Sync>) -> PluginUnloadFuture<'_> {
        Box::pin(async move {
            // 釋放執行階段狀態並斷開事件監聽器
            drop(data);
            Ok(())
        })
    }
}
```

### 第 5 步：在 `PluginManager` 中註冊載入器

開啟 `crates/pumpkin/src/plugin/mod.rs`，並在 `PluginManager::new()` 中註冊載入器：

```rust
// 在 crates/pumpkin/src/plugin/mod.rs 中
let mut loaders: Vec<Box<dyn PluginLoader>> = Vec::new();

loaders.push(Box::new(NativePluginLoader::new()));
loaders.push(Box::new(WasmPluginLoader::new()));
loaders.push(Box::new(MyCustomLoader::new())); // 新增自訂載入器
```

伺服器啟動期間掃描 `plugins/` 資料夾時，Pumpkin 會按順序遍歷所有已註冊載入器，並把每個檔案分派給第一個 `can_load` 返回 `true` 的載入器。
