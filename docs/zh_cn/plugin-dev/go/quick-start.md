# 快速入门

Pumpkin 插件使用 [Go](https://go.dev/) 编程语言编写，并编译为 WebAssembly。

## 前提条件

在开始之前，请确保已安装以下内容：
- [Go](https://go.dev/doc/install)（建议使用最新版本）
- [TinyGo](https://tinygo.org/getting-started/install/)（WASM 编译所需）

## 初始化新模块

首先，为项目创建一个新目录并初始化 Go 模块：

```bash
mkdir hello-pumpkin
cd hello-pumpkin
go mod init github.com/yourname/hello-pumpkin
```

接下来，将 Pumpkin Go API 添加为依赖项：

```bash
go get github.com/Pumpkin-MC/pumpkin-api-go
```

## 项目结构

项目至少应包含一个 `main.go` 文件。结构应如下所示：

```text
├── go.mod
├── go.sum
└── main.go
```
