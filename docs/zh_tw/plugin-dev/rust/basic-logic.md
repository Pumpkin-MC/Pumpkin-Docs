# 編寫基本邏輯

## 插件基礎

即使是基礎插件，底層也有許多工作要做。為了大幅簡化插件開發，
我們將使用 `pumpkin-plugin-api` crate 建立一個基本的空插件。

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

這將建立一個空插件，並實現 Pumpkin 載入它所需的全部方法。

現在我們可以嘗試首次編譯插件。為此，請在專案資料夾中執行以下指令：

```bash
cargo build --release
```

你不必以 release 模式建構，但這能大幅減小 wasm 插件的體積，
並縮短啟動時間。

如果一切順利，你應該會看到類似以下的訊息：

```log
╰─ cargo build --release
   Compiling hello-pumpkin-wasm v0.1.0 (/home/bjorn/Documents/GitHub/Hello-Pumpkin-Wasm)
    Finished `release` profile [optimized] target(s) in 0.05s
```

現在，你可以前往 `./target/wasm32-wasip2/release` 資料夾（如果未使用 `--release`，
則前往 `./target/wasm32-wasip2/debug`），找到插件二進位檔案。檔名類似如下：

```
hello_pumpkin_wasm.wasm
```

::: info 注意
如果你在 `Cargo.toml` 檔案中使用了不同的專案名稱，請查詢檔名中包含該專案名稱的檔案。
:::

你可以將此檔案重新命名為任何喜歡的名稱，但必須保持副檔名（`.wasm`）不變。

## 測試插件

有了插件二進位檔案後，我們就可以在 Pumpkin 伺服器上測試它。安裝插件非常簡單，
只需將剛剛建構的插件二進位檔案放入 Pumpkin 伺服器的 `plugins/` 資料夾即可！

啟動伺服器並執行 `/plugins` 指令後，你應該會看到類似以下的輸出：

```text
已載入 1 個插件：
hello-pumpkin-wasm
```

## `Context` 物件上實現的方法

```rust
fn get_server(&self) -> Server
```

返回伺服器例項。

```rust
fn register_command(&self, command: Command, permission: &str)
```

註冊一個新的指令處理器，並指定該指令所需的權限。

```rust
fn register_event_handler<E, H>(&self, handler: H, event_priority: EventPriority, blocking: bool) -> Result<u32>
```

註冊一個具有指定優先順序的新事件處理器，並指定它是否為阻塞處理器。
