# 編寫基本邏輯

## 插件入口點

在 Go 中，插件必須實現 `api.Plugin` 介面，並在 `init()` 函式中註冊自身。你還需要匯入 `wit_exports` 以相容 WebAssembly。

:::code-group

```go [main.go]
package main

import (
	"github.com/Pumpkin-MC/pumpkin-api-go/api"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_context"
	"github.com/Pumpkin-MC/pumpkin-api-go/pkg/pumpkin_plugin_logging"
	_ "github.com/Pumpkin-MC/pumpkin-api-go/pkg/wit_exports" // WASM 匯出所需
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

## 編譯插件

要將插件編譯為 WebAssembly，必須使用 **TinyGo**。標準 Go 編譯器尚未以相同方式支援 Pumpkin 所需的特定 WASI 目標。

在專案資料夾中執行以下指令：

```bash
tinygo build -o my_plugin.wasm -target=wasi main.go
```

這會生成一個可由 Pumpkin 載入的 `my_plugin.wasm` 檔案。

## 測試插件

安裝插件非常簡單，只需將插件二進位檔案（`.wasm`）放入 Pumpkin 伺服器的 `plugins/` 資料夾！

啟動伺服器並執行 `/plugins` 指令後，你應該能在列表中看到你的插件。
