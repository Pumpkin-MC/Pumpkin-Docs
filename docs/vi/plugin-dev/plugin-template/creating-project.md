# Khởi tạo một dự án mới

Các plugin Pumpkin sử dụng hệ thống build [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html).

Toàn bộ code cho plugin này có thể được tìm thấy tại [template trên GitHub](https://github.com/vyPal/Hello-Pumpkin).

## Khởi tạo một crate mới

Đầu tiên chúng ta cần tạo một thư mục cho dự án (project folder) mới. Bạn có thể làm điều đó bằng cách chạy lệnh này trong thư mục bạn vừa tạo:

```bash
cargo new <project-name> --lib
```

Điều này sẽ tạo ra một thư mục với một vài tệp tin bên trong nó. Cấu trúc thư mục của bạn nên trông giống như thế này:

```bash
├── Cargo.toml
└── src
    └── lib.rs
```

## Cấu hình crate

Bởi vì các plugin Pumpkin được load ở thời gian chạy (runtime) như một thư viện động (dynamic libraries), chúng ta cần điều hướng cho Cargo build crate này như thế.
:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2024"

[lib] // [!code ++:3]
crate-type = ["cdylib"]

[dependencies]
```

:::

Tiếp theo chúng ta cần thêm một vài library (dependencies) cơ bản. Vì Pumpkin hiện vẫn đang trong giai đoạn đầu việc của phát triển, các crate nội bộ sẽ chưa được xuất bản lên crates.io, do đó chúng ta cần điều hướng Cargo tải phần dependencies đó trực tiếp từ GitHub.
:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["cdylib"]

[dependencies]
// [!code ++:13]
# Đây là crate cơ sở (base crate) với hầu hết các định nghĩa thuộc phân loại bậc cao (high-level type definitions)
pumpkin = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin" } 
# Các tiện ích khác được Pumpkin sử dụng (e.g. TextComponent, Vectors...)
pumpkin-util = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin-util" }
# Các Macros giúp phát triển plugin một cách dễ dàng hơn
pumpkin-api-macros = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin-api-macros" }

# Một rust asynchronous runtime
tokio = "1.48"
# Các file log
log = "0.4"
```

:::

Để tăng cường hiệu suất và đưa kích thước file nhỏ gọn hơn, chúng tôi đề xuất bật Link-Time Optimization (LTO).  
Xin hãy lưu ý là điều này sẽ làm thời gian compile tốn lâu hơn.
:::code-group

```toml [Cargo.toml]
[profile.release] // [!code ++:2]
lto = true
```

:::
<small>Chỉ bật LTO cho các bản release builds.</small>
