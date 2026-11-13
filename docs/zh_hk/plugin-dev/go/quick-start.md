# 快速入門

Pumpkin 插件使用 [Go](https://go.dev/) 程式語言編寫，並編譯為 WebAssembly。

## 前提條件

在開始之前，請確保已安裝以下內容：
- [Go](https://go.dev/doc/install)（建議使用最新版本）
- [TinyGo](https://tinygo.org/getting-started/install/)（WASM 編譯所需）

## 初始化新模組

首先，為項目建立一個新目錄並初始化 Go 模組：

```bash
mkdir hello-pumpkin
cd hello-pumpkin
go mod init github.com/yourname/hello-pumpkin
```

接下來，將 Pumpkin Go API 新增為依賴項：

```bash
go get github.com/Pumpkin-MC/pumpkin-api-go
```

## 項目結構

項目至少應包含一個 `main.go` 檔案。結構應如下所示：

```text
├── go.mod
├── go.sum
└── main.go
```
