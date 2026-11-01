# 建立你的第一個指令

在 Pumpkin 中註冊和處理自訂指令的設計對開發者友好、速度快，並採用類似 Mojang Brigadier 系統的結構。

---

## 1. 快速範例

下面是一個完整的最小 Rust 插件，它註冊一個帶有權限檢查的 `/hello` 指令，並向玩家傳送回應。

```rust [src/lib.rs]
use pumpkin_plugin_api::{
    command::{CommandHandler, CommandSender, ConsumedArgs, CommandError, Command},
    permission::{Permission, PermissionDefault},
    text::TextComponent,
    Context, Plugin, PluginMetadata, Server,
};

struct HelloExecutor;

impl CommandHandler for HelloExecutor {
    fn handle(
        &self,
        sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        sender.send_message(TextComponent::text("Hello from Pumpkin!"));
        Ok(1)
    }
}

pub struct MyPlugin;

impl Plugin for MyPlugin {
    fn new() -> Self {
        MyPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "my_plugin".into(),
            version: env!("CARGO_PKG_VERSION").into(),
            authors: vec!["Developer".into()],
            description: "My first Pumpkin plugin".into(),
        }
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 1. 註冊權限節點
        context.register_permission(&Permission {
            node: "my_plugin:hello".to_string(),
            description: "Allows executing the /hello command".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;

        // 2. 建構帶有別名和執行器的指令樹
        let names = ["hello".to_string(), "hi".to_string()];
        let command = Command::new(&names, "Greets the player").execute(HelloExecutor);

        // 3. 註冊指令
        context.register_command(command, "my_plugin:hello")?;

        Ok(())
    }
}
```

---

## 2. 遊戲內預覽

註冊後，你的指令會自動在 Minecraft 中獲得客戶端自動自動完成、語法驗證和顏色高亮功能：

<img src="/assets/first_command_preview.png" alt="遊戲內指令自動自動完成預覽" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 第 1 步：定義權限
Pumpkin 中的指令需要權限節點。使用 `PermissionDefault::Allow` 可預設允許所有玩家執行該指令：
```rust
context.register_permission(&Permission {
    node: "my_plugin:hello".to_string(),
    description: "Allows executing the /hello command".to_string(),
    default: PermissionDefault::Allow,
    children: Vec::new(),
})?;
```

### 第 2 步：構建指令樹
使用 `Command::new` 定義主名稱和別名，然後透過 `.execute(...)` 附加你的 `CommandHandler` 結構：
```rust
let names = ["hello".to_string(), "hi".to_string()];
let command = Command::new(&names, "Greets the player")
    .execute(HelloExecutor);
```

### 第 3 步：透過 Context 註冊
將指令樹和權限節點字符串傳遞給 `context.register_command`：
```rust
context.register_command(command, "my_plugin:hello")?;
```

:::

---

## 後續步驟

- 在[石頭剪刀布教程](./rock-paper-scissors)中探索複雜的子指令和參數解析。
- 學習如何在插件邏輯中處理物品欄和 GUI 互動。
