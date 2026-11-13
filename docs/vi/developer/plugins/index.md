# Kiến trúc Động cơ Plugin

Pumpkin sở hữu một động cơ plugin mô-đun, đa-runtime được thiết kế cho hiệu suất, an toàn và khả năng tương tác giữa các ngôn ngữ.

Khác với các máy chủ Minecraft truyền thống phụ thuộc vào một class loader JVM duy nhất, Pumpkin cô lập việc thực thi plugin thông qua các loader chuyên biệt hỗ trợ cả **binary Rust gốc hiệu suất cao** và **thành phần WebAssembly sandboxed** được biên dịch từ Rust, Python, C#, C, Go hoặc Kotlin.

---

## Tổng quan Kiến trúc

### Phân tích Kiến trúc

| Hệ thống con | Crate Chính | Trách nhiệm |
| :--- | :--- | :--- |
| **Quản lý Plugin** | `crates/pumpkin/src/plugin` | Điều phối vòng đời (tải, kích hoạt, vô hiệu hóa), phân phối sự kiện và đăng ký loader |
| **Loader Gốc** | `crates/pumpkin/src/plugin/loader/native` | Tải thư viện động trực tiếp (`.so`, `.dll`, `.dylib`) cho các phần mở rộng Rust với chi phí bằng không |
| **Loader WASM** | `crates/pumpkin/src/plugin/loader/wasm` | Động cơ thực thi Wasmtime cho các thành phần sandboxed được biên dịch từ Rust, Python, Go, C#, C và Kotlin |
| **Thông số Giao diện** | `crates/pumpkin-plugin-wit` | WebAssembly Interface Types (WIT) định nghĩa các hàm có kiểu, các kiểu dữ liệu và host imports |
| **Bảo mật & Xác minh** | `crates/pumpkin/src/plugin/loader/wasm/sign` | Xác minh chữ ký mật mã thông qua W3C wasmsign2 / khóa công khai Ed25519 |

---

## Mô hình Thực thi Kép

| Tính năng | Plugin Gốc | Plugin WebAssembly (Wasmtime) |
| :--- | :--- | :--- |
| **Đuôi tệp** | `.so` (Linux), `.dll` (Windows), `.dylib` (macOS) | `.wasm` (Component Model) |
| **Ngôn ngữ** | Rust (biên dịch động) | Rust, Python, C#, C, Go, Kotlin |
| **Hiệu suất** | Thực thi CPU gốc (chi phí bằng không) | Biên dịch JIT với tốc độ gần như gốc |
| **Sandboxing** | Không (chạy trong không gian địa chỉ host) | Thực thi sandboxed cách ly bộ nhớ |
| **Bảo mật & Ký** | Quyền cấp độ hệ điều hành | Xác minh chữ ký W3C Wasm-Sign mật mã |
| **Gỡ bỏ Nóng** | Hạn chế (giới hạn thư viện dùng chung của hệ điều hành) | Hỗ trợ đầy full thu hồi bộ nhớ |

---

## Vòng đời Sự kiện & Phân phối

Plugin tương tác với Pumpkin chủ yếu thông qua các sự kiện:

1. **Phân phối Sự kiện**:
   - `server.plugin_manager.fire_blocking(&server, &mut event)`: Phân phối sự kiện đồng bộ trên luồng đang thực thi (ví dụ: hủy đặt khối của người chơi hoặc sửa đổi payload gói tin).
   - Các sự kiện bất đồng bộ chạy trên các task Tokio không chặn.
2. **Sự kiện có thể Hủy**:
   - Các handler có thể đặt `event.cancelled = true` để hủy logic game mặc định (như hủy di chuyển của người chơi, tương tác hoặc xử lý gói tin).

---

## Tài liệu Động cơ Plugin

Khám phá cơ chế bên trong của hệ thống plugin Pumpkin:

- **[Thêm một Plugin Loader](/developer/plugins/loaders)**: Hướng dẫn từng bước về việc triển khai trait `PluginLoader` cho các ngôn ngữ kịch bản và runtime mới.
- **[Ký & Xác minh WASM](/developer/plugins/wasm-signing)**: Thông số chi tiết về ký mật mã Ed25519, các section tùy chỉnh W3C `wasmsign2` và xác minh giấy phép marketplace.

> [!NOTE]
> Bạn đang tìm cách phát triển plugin bên thứ ba thay vì làm việc trên động cơ plugin nội bộ của Pumpkin? Hãy xem **[Hướng dẫn Phát triển Plugin](/plugin-dev/introduction)**.
