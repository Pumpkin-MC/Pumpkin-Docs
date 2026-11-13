# 编写基本逻辑

## 插件入口点

在 Go 中，插件必须实现 `api.Plugin` 接口，并在 `init()` 函数中注册自身。你还需要导入 `wit_exports` 以兼容 WebAssembly。

:::code-group

```go [main.go]
package main

import (
	"github.com/Pumpkin-MC/pumpkin-api-go/api"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_context"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_logging"
	_ "github.com/Pumpkin-MC/pumpkin-api-go/pkg/wit_exports" // WASM 导出所需
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

## 编译插件

要将插件编译为 WebAssembly，必须使用 **TinyGo**。标准 Go 编译器尚未以相同方式支持 Pumpkin 所需的特定 WASI 目标。

在项目文件夹中运行以下命令：

```bash
tinygo build -o my_plugin.wasm -target=wasi main.go
```

这会生成一个可由 Pumpkin 加载的 `my_plugin.wasm` 文件。

## 测试插件

安装插件非常简单，只需将插件二进制文件（`.wasm`）放入 Pumpkin 服务器的 `plugins/` 文件夹！

启动服务器并运行 `/plugins` 命令后，你应该能在列表中看到你的插件。
