# 快速开始

本指南将帮助你开始使用 [D 语言](https://dlang.org/)编写 Pumpkin 服务器插件。

针对 Pumpkin 的 D 语言插件通过官方提供的 [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d) 绑定编译为 WebAssembly（Wasm）组件。

---

## 前置要求

在构建 D 语言插件之前，请确保已安装以下工具：

- **[LDC](https://github.com/ldc-developers/ldc)**：1.43 或更高版本（基于 LLVM 的 D 语言编译器）。
- **`addon-wasi`**：LDC 的 WASI 目标支持包。
- **[DUB](https://dub.pm/)**：D 语言的包管理器与构建工具（通常随 LDC 一起提供）。

---

## 1. 初始化项目

为你的插件项目创建一个新目录，并添加 `dub.json` 配置文件：

```bash
mkdir my-d-plugin
cd my-d-plugin
```

在项目根目录下创建 `dub.json`：

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "基于 D 语言构建的极简 Pumpkin 插件。",
    "license": "proprietary",
    "authors": ["你的名字"],
    "copyright": "Copyright © 2026, 你的名字",

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
> WebAssembly 链接器需要 `-Xcc=-mexec-model=reactor` 标志，以便将该插件作为响应器（暴露入口点的组件）处理，而不是作为具有退出点的命令行程序。

---

## 2. 编写插件代码

创建 `source` 目录并在 `source/app.d` 中添加代码：

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "你的名字".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "D 语言编写的示例插件。".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // 传入的资源在使用后必须释放

        log(Level.info, "来自 D 语言插件的问候！".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

---

## 3. 构建插件

将插件编译为面向 `wasm32-wasip2` 的 WebAssembly 组件：

```bash
dub build -b release -a wasm32-wasip2
```

编译完成后，会在项目根目录生成 `my-d-plugin.wasm` 文件。

---

## 4. 运行插件

1. 将生成的 `.wasm` 文件复制到 Pumpkin 服务器的 `plugins/` 目录中：
   ```bash
   cp my-d-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. 启动或重启 Pumpkin 服务器：
   ```bash
   ./pumpkin
   ```
3. 查看控制台日志确认插件已成功加载：
   ```text
   [INFO] 来自 D 语言插件的问候！
   ```
