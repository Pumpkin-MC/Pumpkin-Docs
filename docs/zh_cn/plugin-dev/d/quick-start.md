# 快速入门

本指南将帮助你开始使用 [D 编程语言](https://dlang.org/)编写 Pumpkin 服务器插件。

Pumpkin 的 D 插件使用官方 [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d) 绑定编译为 WebAssembly（Wasm）组件。

---

## 前提条件

在为 Pumpkin 构建 D 插件之前，请确保已安装以下内容：

- **[LDC](https://github.com/ldc-developers/ldc)**：1.43 或更高版本（基于 LLVM 的 D 编译器）。
- **`addon-wasi`**：LDC 的 WASI 目标包。
- **[DUB](https://dub.pm/)**：D 的包管理与构建工具（通常随 LDC 一起提供）。

---

## 1. 设置项目

为插件项目创建一个新目录，并添加 `dub.json` 配置文件：

```bash
mkdir my-d-plugin
cd my-d-plugin
```

在项目根目录创建 `dub.json`：

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "A minimal Pumpkin plugin built with D.",
    "license": "proprietary",
    "authors": ["You"],
    "copyright": "Copyright © 2026, You",

    "dependencies": {
        "pumpkin-api-d": "~>0.1.0"
    },

    "targetType": "executable",
    "dflags": ["-Xcc=-mexec-model=reactor"],
    "buildTypes": {
        "debug": {
            "buildOptions": ["debugMode", "debugInfo"]
        },
        "release": {
            "buildOptions": ["optimize", "inline"],
            "dflags": ["-L-S"]
        }
    }
}
```

> [!NOTE]
> WebAssembly 链接器需要 `-Xcc=-mexec-model=reactor` 标志，以便将插件视为 reactor（公开入口点的组件），而不是具有退出点的命令行程序。

---

## 2. 编写插件

创建一个 `source` 目录，并将代码放入 `source/app.d`：

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "You".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "An example plugin in D.".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // 传入的资源在使用后必须清理

        log(Level.info, "Hello from D plugin!".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

### 关键要素：
- **`@GetMetadata`**：定义 Pumpkin 加载组件时请求的插件信息（名称、版本、作者、描述、权限）。
- **`@OnLoad`**：Pumpkin 初始化插件时调用的入口点。确保使用 `ctx.witDrop` 释放传入的上下文资源（`ctx`）。
- **`mixin RegisterPlugin!MyPlugin;`**：生成 Pumpkin 的 WASM 加载器所需的 WebAssembly 组件导出和样板代码。

---

## 3. 构建插件

将插件编译为面向 `wasm32-wasip2` 的 WebAssembly 组件：

```bash
dub build -b release -a wasm32-wasip2
```

这会在项目根目录生成 `my-d-plugin.wasm`。

---

## 4. 运行插件

1. 将编译后的 `.wasm` 文件复制到服务器的 `plugins/` 目录：
   ```bash
   cp my-d-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. 启动或重启 Pumpkin：
   ```bash
   ./pumpkin
   ```
3. 检查服务器日志，确认插件已加载：
   ```text
   [INFO] Hello from D plugin!
   ```
