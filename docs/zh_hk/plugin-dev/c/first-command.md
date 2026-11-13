# 建立你的第一個指令

使用 C 為 Pumpkin 編寫指令開銷低、速度快，並使用 C WIT 綁定。

---

## 1. 快速範例

下面是一個完整的 C 插件檔案（`main.c`），它會註冊一個帶權限檢查的 `/hello` 指令，並向玩家傳送回應。

```c [main.c]
#include <stdio.h>
#include "pumpkin_api.h"

void plugin_on_load(pumpkin_context_t ctx) {
    // 1. 註冊權限節點
    pumpkin_permission_t perm = {
        .node = "my_c_plugin:hello",
        .description = "Allows executing the /hello command",
        .default_access = PERMISSION_DEFAULT_ALLOW
    };
    pumpkin_register_permission(ctx, &perm);

    // 2. 建構並註冊指令樹
    const char* names[] = {"hello", "hi"};
    pumpkin_command_t cmd = pumpkin_command_new(names, 2, "Greets the player");
    
    pumpkin_register_command(ctx, cmd, "my_c_plugin:hello");
}

int32_t plugin_handle_command(uint32_t command_id, pumpkin_sender_t sender, pumpkin_server_t server) {
    pumpkin_sender_send_message(sender, "Hello from C Plugin!");
    return 1;
}

pumpkin_metadata_t plugin_get_metadata() {
    pumpkin_metadata_t meta = {
        .name = "my_c_plugin",
        .version = "0.1.0",
        .description = "My first Pumpkin C plugin"
    };
    return meta;
}
```

---

## 2. 遊戲內預覽

指令註冊後，Minecraft 客戶端會自動為其提供自動自動完成、語法驗證和顏色高亮：

<img src="/assets/first_command_preview.png" alt="遊戲內指令自動自動完成預覽" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 步驟 1：定義權限結構
填充一個 `pumpkin_permission_t` 結構，並調用 `pumpkin_register_permission`：
```c
pumpkin_permission_t perm = {
    .node = "my_c_plugin:hello",
    .description = "Allows executing the /hello command",
    .default_access = PERMISSION_DEFAULT_ALLOW
};
pumpkin_register_permission(ctx, &perm);
```

### 步驟 2：構建指令樹
透過傳入名稱數組和描述來建立指令樹：
```c
const char* names[] = {"hello", "hi"};
pumpkin_command_t cmd = pumpkin_command_new(names, 2, "Greets the player");
```

### 步驟 3：註冊指令並處理執行
將指令句柄傳給 `pumpkin_register_command`，並在 `plugin_handle_command` 中處理回應：
```c
pumpkin_register_command(ctx, cmd, "my_c_plugin:hello");
```

:::

---

## 後續步驟

- 檢視 [C 快速入門指南](./quick-start)，設定編譯器工具鏈。
