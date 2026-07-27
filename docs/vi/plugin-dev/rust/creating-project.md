# Tạo một dự án mới

Các plugin của Pumpkin sử dụng hệ thống build [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html).

Mã nguồn hoàn chỉnh cho plugin này có thể được tìm thấy dưới dạng [template trên GitHub](https://github.com/BjornTheProgrammer/Hello-Pumpkin-Wasm).

## Cài đặt toolchain

Trước khi có thể biên dịch plugin, chúng ta phải cài đặt target `wasm32-wasip2`. Bạn có thể cài đặt target này bằng cách chạy:

```bash
rustup target add wasm32-wasip2
```

## Khởi tạo một crate mới

Trước tiên, chúng ta cần tạo một thư mục dự án mới. Bạn có thể làm điều này bằng cách chạy lệnh sau trong thư mục mà bạn đã tạo:

```bash
cargo new <project-name> --lib
```

Sau khi thêm phần này, chúng ta muốn tạo một thư mục mới có tên `.cargo` và thêm tệp `config.toml` với nội dung như sau

```toml [config.toml]
[build]
target = "wasm32-wasip2"
```

Tổng thể, cấu trúc thư mục mới của bạn sẽ trông như thế này:

```bash
├── .cargo/
│   └── config.toml
├── src/
│   └── lib.rs
├── Cargo.toml
└── Cargo.lock
```

## Cấu hình crate

Vì các plugin Pumpkin được tải tại runtime dưới dạng thư viện động, chúng ta cần yêu cầu Cargo biên dịch crate này dưới dạng thư viện động(Dynamic library).
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

Tiếp theo, chúng ta cần thêm một số dependency cơ bản. Vì Pumpkin vẫn đang trong giai đoạn phát triển ban đầu, các crate nội bộ chưa được xuất bản lên crates.io, do đó chúng ta cần yêu cầu Cargo tải các dependency trực tiếp từ GitHub.
:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["cdylib"]

[dependencies]
// [!code ++:3]
# This is the api crate that makes creating plugins easier, and has wit definitions
pumpkin-plugin-api = { version = "0.1.0", git = "https://github.com/Pumpkin-MC/Pumpkin", package = "pumpkin-plugin-api" }
tracing = "0.1"
```

:::

Để cải thiện hiệu suất và giảm kích thước tệp, chúng tôi khuyên bạn nên bật Link-Time Optimization (LTO).  
Lưu ý rằng điều này sẽ làm tăng thời gian biên dịch.
:::code-group

```toml [Cargo.toml]
[profile.release] // [!code ++:2]
lto = true
```

:::
<small>Chỉ bật LTO cho các bản build release.</small>