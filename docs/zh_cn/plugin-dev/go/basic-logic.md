# 基础逻辑

## 插件入口

在 Go 中，你的插件必须实现 `api.Plugin` 接口，并在 `init()` 函数中注册自身。此外，为了兼容 WebAssembly，你还需要导入 `wit_exports`。

:::code-group

```go [main.go]
package main

import (
	"github.com/Pumpkin-MC/pumpkin-api-go/api"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_context"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_logging"
	_ "github.com/Pumpkin-MC/pumpkin-api-go/pkg/wit_exports" // 用于 WASM 导出的必需项
)

type MyPlugin struct {
	api.DefaultPlugin
}

func (p *MyPlugin) Metadata() api.Metadata {
	return api.Metadata{
		Name:    "我的 GO 插件",
		Version: "0.1.0",
		Authors: []string{"you"},
	}
}

func (p *MyPlugin) OnLoad(ctx *pumpkin_plugin_context.Context) {
	pumpkin_plugin_logging.Log(pumpkin_plugin_logging.LevelInfo(), "Go 插件已加载！")
}

func init() {
	api.RegisterPlugin(&MyPlugin{})
}

func main() {}
```

:::

## 编译插件

要将您的插件编译为 WebAssembly，您必须使用 **TinyGo**。标准的 Go 编译器目前尚无法以 Pumpkin 所需的方式支持特定的 WASI 目标。

请在您的项目文件夹中运行以下命令：

```bash
tinygo build -o my_plugin.wasm -target=wasi main.go
```

这将生成一个 `my_plugin.wasm` 文件，Pumpkin 可以加载该文件。

## 测试插件

安装插件非常简单，只需将插件二进制文件（`.wasm`）放入 Pumpkin 服务器的 `plugins/` 文件夹即可！

当您启动服务器并运行 `/plugins` 命令时，您应该能看到您的插件列表。
