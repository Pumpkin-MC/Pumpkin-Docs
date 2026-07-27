# Viết logic cơ bản

## Điểm vào của plugin

Trong Go, plugin của bạn phải triển khai interface `api.Plugin` và tự đăng ký trong hàm `init()`. Bạn cũng cần import `wit_exports` để đảm bảo tính tương thích với WebAssembly.

:::code-group

```go [main.go]
package main

import (
	"github.com/Pumpkin-MC/pumpkin-api-go/api"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_context"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_logging"
	_ "github.com/Pumpkin-MC/pumpkin-api-go/pkg/wit_exports" // Required for WASM exports
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

Để biên dịch plugin của bạn sang WebAssembly, bạn phải sử dụng **TinyGo**. Trình biên dịch Go tiêu chuẩn chưa hỗ trợ các target WASI cụ thể mà Pumpkin yêu cầu theo cùng một cách.

Chạy lệnh sau trong thư mục dự án của bạn:

```bash
tinygo build -o my_plugin.wasm -target=wasi main.go
```

Lệnh này sẽ tạo ra một tệp `my_plugin.wasm` mà Pumpkin có thể tải lên.

## Kiểm thử plugin

Cài đặt plugin cực kỳ đơn giản, bạn chỉ cần đặt tệp nhị phân của plugin (`.wasm`) vào thư mục `plugins/` của máy chủ Pumpkin!

Khi bạn khởi động máy chủ và chạy lệnh `/plugins`, bạn sẽ thấy plugin của mình xuất hiện trong danh sách.