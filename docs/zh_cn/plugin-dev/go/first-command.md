# 创建你的第一个命令

在 Pumpkin 中使用 Go 注册命令遵循标准的 Go 惯例，并通过 TinyGo 编译为 WASM。

---

## 1. 快速示例

下面是一个完整的 Go 插件文件（`main.go`），它会注册一个带权限检查的 `/hello` 命令，并向玩家发送响应。

```go [main.go]
package main

import (
	"github.com/Pumpkin-MC/pumpkin-api-go/api"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_command"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_context"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_permission"
	_ "github.com/Pumpkin-MC/pumpkin-api-go/pkg/wit_exports"
)

type MyPlugin struct {
	api.DefaultPlugin
}

func (p *MyPlugin) Metadata() api.Metadata {
	return api.Metadata{
		Name:        "my_go_plugin",
		Version:     "0.1.0",
		Authors:     []string{"Developer"},
		Description: "My first Pumpkin Go plugin",
	}
}

func (p *MyPlugin) OnLoad(ctx *pumpkin_plugin_context.Context) {
	// 1. 注册权限节点
	ctx.RegisterPermission(pumpkin_plugin_permission.Permission{
		Node:        "my_go_plugin:hello",
		Description: "Allows executing the /hello command",
		Default:     pumpkin_plugin_permission.PermissionDefaultAllow(),
	})

	// 2. 构建并注册命令树
	cmd := pumpkin_plugin_command.New([]string{"hello", "hi"}, "Greets the player")
	ctx.RegisterCommand(cmd, "my_go_plugin:hello")
}

func (p *MyPlugin) HandleCommand(cmdID uint32, sender pumpkin_plugin_command.CommandSender) int32 {
	sender.SendMessage("Hello from Go Plugin!")
	return 1
}

func init() {
	api.RegisterPlugin(&MyPlugin{})
}

func main() {}
```

---

## 2. 游戏内预览

命令注册后，Minecraft 客户端会自动为其提供自动补全、语法验证和颜色高亮：

<img src="/assets/first_command_preview.png" alt="游戏内命令自动补全预览" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 步骤 1：注册权限
在 `OnLoad` 中调用 `ctx.RegisterPermission`：
```go
ctx.RegisterPermission(pumpkin_plugin_permission.Permission{
    Node:        "my_go_plugin:hello",
    Description: "Allows executing the /hello command",
    Default:     pumpkin_plugin_permission.PermissionDefaultAllow(),
})
```

### 步骤 2：构建命令树
使用 `pumpkin_plugin_command.New` 实例化命令树：
```go
cmd := pumpkin_plugin_command.New([]string{"hello", "hi"}, "Greets the player")
```

### 步骤 3：注册并执行
使用 `ctx.RegisterCommand` 注册命令，并在 `HandleCommand` 中处理执行：
```go
ctx.RegisterCommand(cmd, "my_go_plugin:hello")
```

:::

---

## 后续步骤

- 按照 [Go 快速入门指南](./quick-start) 设置 TinyGo 编译环境。
- 进一步了解[基本逻辑](./basic-logic)。
