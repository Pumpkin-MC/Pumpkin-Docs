# Bắt đầu nhanh

Hướng dẫn này sẽ giúp bạn bắt đầu viết các plugin cho máy chủ Pumpkin bằng Kotlin.

:::warning
Cho đến khi chuỗi công cụ (toolchain) thành phần Kotlin + Wasm trở nên hoàn thiện hơn, có thể sẽ xuất hiện một số điểm kỳ lạ và bất tiện. 

Các lỗi (bugs) cũng là điều dự kiến có thể xảy ra.
:::

## Yêu cầu tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau:
- JDK 17 trở lên
    - Để chạy Gradle 9.4
- [Rust](https://rust-lang.org/)
    - Điều này là bắt buộc vì một thành phần quan trọng (wit-bindgen) được viết bằng Rust và Rust phải được build từ một bản fork hỗ trợ Kotlin cụ thể.
    - Bạn chỉ cần bản cài đặt Rust mặc định cho nền tảng host của mình. KHÔNG cần cho bất kỳ target WebAssembly nào.
- [wasm-tools](https://github.com/bytecodealliance/wasm-tools)
    - Để đóng gói file Wasm mà Kotlin tạo ra thành một component
- Make (ví dụ: [GNU Make](https://www.gnu.org/software/make/))
    - Để chạy `Makefile` tiện ích. Bạn có thể chọn không dùng Make và thực hiện thủ công các bước bên trong.

## Thiết lập dự án

Không giống như hầu hết các gói API khác hiện có, [pumpkin-api-kt](https://github.com/Pumpkin-MC/pumpkin-api-kt) là một TEMPLATE (mẫu dự án), không phải là một gói Maven.

Để bắt đầu, hãy clone template này (và đổi tên theo ý bạn):
```sh
git clone --recurse-submodules https://github.com/Pumpkin-MC/pumpkin-api-kt
mv pumpkin-api-kt my_kotlin_plugin
cd my_kotlin_plugin
```

Tiếp theo, chúng ta sẽ muốn cập nhật submodule `wit` để sử dụng phiên bản mới nhất của Pumpkin plugin API.

```sh
cd wit
git pull origin master
cd ..
```

Cuối cùng, đổi tên dự án Gradle. Thay đổi `rootProject.name` trong `settings.gradle.kts`, VÀ `PROJECT_NAME` trong `Makefile`. Cả hai giá trị này phải khớp nhau. Bất kể bạn đặt tên dự án là gì, đó sẽ là tên file Wasm được tạo ra.

## Tạo plugin đầu tiên của bạn

Là một phần của template, một plugin cơ bản đã được cài đặt sẵn tại `src/wasmWasiMain/kotlin/plugin/Plugin.kt`. 

Bạn có thể thoải mái chỉnh sửa phần metadata ở cuối file. Tuy nhiên, trước khi thay đổi bất kỳ điều gì khác, bạn nên build plugin trước (xem phần tiếp theo) để các binding được khởi tạo và tính năng gợi ý mã nguồn (IDE completion) hoạt động cho `pumpkin`.

## Biên dịch plugin

Để build plugin của bạn thành một WebAssembly component:

```sh
make
```

File `.wasm` đã biên dịch sẽ nằm trong thư mục `build`. Bạn có thể đặt file này vào thư mục `plugins` của máy chủ Pumpkin.

Lưu ý rằng việc thực hiện lần đầu tiên có thể mất một chút thời gian do hệ thống cần build `wit-bindgen` từ mã nguồn Rust.

Mỗi lần chạy `make`, hệ thống sẽ kiểm tra bản cập nhật của `wit-bindgen`. Bạn có thể chạy `make componentify` thay thế sau khi thiết lập ban đầu để tránh việc kiểm tra này.

## Xử lý sự cố

### Lỗi Linker
Nếu bạn bắt đầu gặp các lỗi như
```
main ThreadId(01) pumpkin::plugin: Failed to load plugin from
"./plugins/my_plugin.wasm": Wasm plugin initialization error: plugin failed
to load with error: component imports instance 'pumpkin:plugin/gui@0.1.0', but
a matching implementation was not found in the linker
```
hoặc các lỗi "linker" khác khi tải plugin vào Pumpkin, hãy cập nhật submodule `wit`.

```sh
cd wit
git pull origin master
cd ..
```