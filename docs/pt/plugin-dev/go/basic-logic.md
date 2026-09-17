# Writing the basic logic

## Plugin Entry Point

In Go, your plugin must implement the `api.Plugin` interface and register itself in the `init()` function. You also need to import `wit_exports` for WebAssembly compatibility.

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

## Compiling the plugin

To compile your plugin to WebAssembly, you must use **TinyGo**. The standard Go compiler does not yet support the specific WASI targets required by Pumpkin in the same way.

Run the following command in your project folder:

```bash
tinygo build -o my_plugin.wasm -target=wasi main.go
```

This will generate a `my_plugin.wasm` file that can be loaded by Pumpkin.

## Testing the plugin

Installing a plugin is as simple as putting the plugin binary (`.wasm`) into the `plugins/` folder of your Pumpkin server!

When you start up the server and run the `/plugins` command, you should see your plugin listed.
