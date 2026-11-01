# 建立新專案

Pumpkin 插件使用 [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html) 建構系統。

此插件的完整程式碼可在 [GitHub 上的模板](https://github.com/BjornTheProgrammer/Hello-Pumpkin-Wasm)中找到。

## 安裝工具鏈

在編譯插件之前，我們必須安裝 `wasm32-wasip2` 目標。你可以透過執行以下指令來安裝該目標：

```bash
rustup target add wasm32-wasip2
```

## 初始化新的 crate

首先，我們需要建立一個新的專案資料夾。你可以在已建立的資料夾中執行以下指令：

```bash
cargo new <project-name> --lib
```

完成後，我們要建立一個名為 `.cargo` 的新目錄，並在其中新增一個 `config.toml` 檔案，內容如下：

```toml [config.toml]
[build]
target = "wasm32-wasip2"
```

最終，新資料夾的結構應如下所示：

```bash
├── .cargo/
│   └── config.toml
├── src/
│   └── lib.rs
├── Cargo.toml
└── Cargo.lock
```

## 設定 crate

由於 Pumpkin 插件在執行時作為動態程式庫載入，我們需要告訴 Cargo 將此 crate 建構為動態程式庫。
:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin-wasm"
version = "0.1.0"
edition = "2024"

[lib] // [!code ++:2]
crate-type = ["cdylib"]

[dependencies]
```

:::

接下來，我們需要從 [crates.io](https://crates.io) 新增一些基本依賴項：
:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["cdylib"]

[dependencies]
// [!code ++:5]
# 這是讓插件建立更簡單的 API crate，其中包含 WIT 定義
pumpkin-plugin-api = "0.2.1+26.3-26.51"
# 可選：用於市集授權和更新檢查的實用工具
pumpkin-plugin-utils = "0.1.0-dev+26.2-26.45"
tracing = "0.1"
```

:::

為了提高效能並減小檔案體積，我們建議啟用連結時最佳化（Link-Time Optimization，LTO）。
請注意，這會增加編譯時間。
:::code-group

```toml [Cargo.toml]
[profile.release] // [!code ++:2]
lto = true
```

:::
<small>僅為 release 建構啟用 LTO。</small>
