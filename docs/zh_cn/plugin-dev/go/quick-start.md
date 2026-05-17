# 创建新项目

使用 [Go](https://go.dev/) 编程语言编写 Pumpkin 插件，并编译为 WebAssembly。

## 前置条件

在开始之前，请确保您已安装以下内容：
- [Go](https://go.dev/doc/install) (推荐安装最新版本)
- [TinyGo](https://tinygo.org/getting-started/install/) (用于 WebAssembly 编译)

## 初始化新模块

首先，为您的项目创建一个新目录并初始化 Go 模块：

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

您的项目结构应至少包含一个 `main.go` 文件。典型的目录结构如下：

```text
├── go.mod
├── go.sum
└── main.go
```
