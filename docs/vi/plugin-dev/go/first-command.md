# Tạo Lệnh Đầu Tiên Của Bạn

Việc đăng ký lệnh trong Go với Pumpkin được xây dựng dựa trên idiom tiêu chuẩn của Go sử dụng biên dịch TinyGo WASM.

---

## 1. Ví dụ nhanh

Dưới đây là file plugin Go hoàn chỉnh (`main.go`) đăng ký lệnh `/hello` với kiểm tra quyền và gửi phản hồi lại cho người chơi.

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
	// 1. Đăng ký node quyền
	ctx.RegisterPermission(pumpkin_plugin_permission.Permission{
		Node:        "my_go_plugin:hello",
		Description: "Allows executing the /hello command",
		Default:     pumpkin_plugin_permission.PermissionDefaultAllow(),
	})

	// 2. Xây dựng và đăng ký cây lệnh
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

## 2. Xem trước trong game

Sau khi đăng ký, lệnh của bạn sẽ tự động có tính năng tự động hoàn thành ở phía client, kiểm tra cú pháp, và hiển thị màu trong Minecraft:

<img src="/assets/first_command_preview.png" alt="In-Game Command Autocompletion Preview" width="500"/>

---

## 3. Cách hoạt động

::: details Phân tích từng bước

### Bước 1: Đăng ký quyền
Gọi `ctx.RegisterPermission` bên trong `OnLoad`:
```go
ctx.RegisterPermission(pumpkin_plugin_permission.Permission{
    Node:        "my_go_plugin:hello",
    Description: "Allows executing the /hello command",
    Default:     pumpkin_plugin_permission.PermissionDefaultAllow(),
})
```

### Bước 2: Xây dựng cây lệnh
Khởi tạo cây lệnh với `pumpkin_plugin_command.New`:
```go
cmd := pumpkin_plugin_command.New([]string{"hello", "hi"}, "Greets the player")
```

### Bước 3: Đăng ký & thực thi
Đăng ký lệnh với `ctx.RegisterCommand` và xử lý việc thực thi trong `HandleCommand`:
```go
ctx.RegisterCommand(cmd, "my_go_plugin:hello")
```

:::

---

## Các bước tiếp theo

- Làm theo [Hướng dẫn Bắt đầu Nhanh với Go](./quick-start) để thiết lập biên dịch TinyGo.
- Tìm hiểu thêm về [Logic Cơ bản](./basic-logic).
