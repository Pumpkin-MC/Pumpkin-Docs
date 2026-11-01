# 创建你的第一个命令

在 Pumpkin 中使用 C 语言编写命令具有低开销、运行速度快的特点，并且采用的是 C 语言的 WIT 绑定（bindings）。

---

## 1. 快速示例

下面是一个完整的 C 插件文件（`main.c`），它会注册一个带权限检查的 `/hello` 命令，并向玩家发送响应。

```c [main.c]
#include <stdio.h>
#include "pumpkin_api.h"

void plugin_on_load(pumpkin_context_t ctx) {
    // 1. 注册权限节点
    pumpkin_permission_t perm = {
        .node = "my_c_plugin:hello",
        .description = "Allows executing the /hello command",
        .default_access = PERMISSION_DEFAULT_ALLOW
    };
    pumpkin_register_permission(ctx, &perm);

    // 2. 构建并注册命令树
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

## 2. 游戏内预览

命令注册后，Minecraft 客户端会自动为其提供自动补全、语法验证和颜色高亮：

<img src="/assets/first_command_preview.png" alt="游戏内命令自动补全预览" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 步骤 1：定义权限结构体
填充一个 `pumpkin_permission_t` 结构体，并调用 `pumpkin_register_permission`：
```c
pumpkin_permission_t perm = {
    .node = "my_c_plugin:hello",
    .description = "Allows executing the /hello command",
    .default_access = PERMISSION_DEFAULT_ALLOW
};
pumpkin_register_permission(ctx, &perm);
```

### 步骤 2：构建命令树
通过传入名称数组和描述来创建命令树：
```c
const char* names[] = {"hello", "hi"};
pumpkin_command_t cmd = pumpkin_command_new(names, 2, "Greets the player");
```

### 步骤 3：注册命令并处理执行
将命令句柄传给 `pumpkin_register_command`，并在 `plugin_handle_command` 中处理响应：
```c
pumpkin_register_command(ctx, cmd, "my_c_plugin:hello");
```

:::

---

## 后续步骤

- 查看 [C 快速入门指南](./quick-start)，设置编译器工具链。
