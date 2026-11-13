# Viết logic cơ bản

## Điểm khởi đầu của Plugin

Trong Go, plugin của bạn phải triển khai interface `api.Plugin` và tự đăng ký trong hàm `init()`. Bạn cũng cần import `wit_exports` để tương thích với WebAssembly.

:::code-group

```go [main.go]
package main

import (
	"github.com/Pumpkin-MC/pumpkin-api-go/api"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_context"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_logging"
	_ "github.com/Pumpkin-MC/pumpkin-api-go/pkg/wit_exports" // Bắt buộc cho WASM exports
)

type MyPlugin struct {
	api.DefaultPlugin
}

func (p *MyPlugin) Metadata() api.Metadata {
	return api.Metadata{
		Name:    "my-go-plugin",
		Version: "0.1.0",
		Authors: []string{"you"},
	}
}

func (p *MyPlugin) OnLoad(ctx *pumpkin_plugin_context.Context) {
	pumpkin_plugin_logging.Log(pumpkin_plugin_logging.LevelInfo(), "Go plugin loaded!")
}

func init() {
	api.RegisterPlugin(&MyPlugin{})
}

func main() {}
```

:::

## Biên dịch plugin

Để biên dịch plugin của bạn thành WebAssembly, bạn phải sử dụng **TinyGo**. Trình biên dịch Go tiêu chuẩn chưa hỗ trợ các target WASI cụ thể mà Pumpkin yêu cầu theo cùng cách.

Chạy lệnh sau trong thư mục dự án của bạn:

```bash
tinygo build -o my_plugin.wasm -target=wasi main.go
```

Lệnh này sẽ tạo ra file `my_plugin.wasm` có thể được Pumpkin tải.

## Kiểm thử plugin

Cài đặt một plugin đơn giản như việc đặt file nhị phân plugin (`.wasm`) vào thư mục `plugins/` của server Pumpkin!

Khi bạn khởi động server và chạy lệnh `/plugins`, bạn sẽ thấy plugin của mình được liệt kê.
