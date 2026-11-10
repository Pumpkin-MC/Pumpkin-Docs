# Tạo dự án mới

 Các plugin Pumpkin sử dụng hệ thống build [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html).

Mã nguồn hoàn chỉnh cho plugin này có thể được tìm thấy dưới dạng [mẫu trên GitHub](https://github.com/BjornTheProgrammer/Hello-Pumpkin-Wasm).

## Cài đặt toolchain

Trước khi chúng ta có thể biên dịch một plugin, chúng ta cần cài đặt target `wasm32-wasip2`. Bạn có thể cài đặt target bằng cách chạy:

```bash
rustup target add wasm32-wasip2
```

## Khởi tạo crate mới

Đầu tiên chúng ta cần tạo một thư mục dự án mới. Bạn có thể làm điều này bằng cách chạy lệnh sau trong thư mục bạn đã tạo:

```bash
cargo new <tên-dự-án> --lib
```

Sau khi thêm điều này, chúng ta muốn tạo một thư mục mới có tên `.cargo` và thêm vào một file `config.toml` với nội dung sau

```toml [config.toml]
[build]
target = "wasm32-wasip2"
```

Tổng thể cấu trúc thư mục mới của bạn sẽ trông như thế này:

```bash
├── .cargo/
│   └── config.toml
├── src/
│   └── lib.rs
├── Cargo.toml
└── Cargo.lock
```

## Cấu hình crate

Vì các plugin Pumpkin được tải lúc runtime dưới dạng dynamic libraries, chúng ta cần báo cho Cargo biết để build crate này như một thư viện dạng đó.
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

Tiếp theo chúng ta cần thêm một số dependency cơ bản từ [crates.io](https://crates.io):
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
# Đây là crate api giúp việc tạo plugin dễ dàng hơn, và có các định nghĩa wit
pumpkin-plugin-api = "0.2.1+26.3-26.51"
# Tùy chọn: các tiện ích cho giấy phép marketplace và kiểm tra cập nhật
pumpkin-plugin-utils = "0.1.0-dev+26.2-26.45"
tracing = "0.1"
```

:::

Để cải thiện hiệu năng và giảm kích thước file, chúng tôi khuyên bật Link-Time Optimization (LTO).  
Hãy lưu ý rằng điều này sẽ làm tăng thời gian biên dịch.
:::code-group

```toml [Cargo.toml]
[profile.release] // [!code ++:2]
lto = true
```

:::
<small>Bật LTO chỉ cho các bản build release.</small>
