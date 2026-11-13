# Tổng quan về việc quản trị

Chào mừng bạn đến **Phần dành cho quản trị viên** dành cho các quản trị viên máy chủ Pumpkin. Pumpkin là một máy chủ Minecraft hiệu năng cao, đa luồng được viết bằng Rust, được thiết kế để hỗ trợ số lượng lớn người chơi với mức tiêu thụ tài nguyên tối thiểu.

---

## Các tính năng chính dành cho các quản trị viên máy chủ

- **Đa luồng cực mạnh**: Thiết kế từ đầu cho các bộ xử lý đa nhân hiện đại.
- **Kiến trúc Plugin WASM**: Thực thi plugin an toàn trong môi trường sandbox bằng Rust, Python, Kotlin, C#, Go hoặc C mà không tốn chi phí JVM.
- **Hỗ trợ Cross-Proxy nguyên bản**: Hỗ trợ sẵn cho Velocity, BungeeCord và chuyển tiếp một cách hiện đại.
- **Cấu hình dựa trên TOML**: Các file cấu hình sạch sẽ, dễ đọc nằm ở `pumpkin.toml` và các file TOML riêng cho từng tính năng.

---

## Hướng Dẫn & Chủ Đề Quản Trị

Khám phá các hướng dẫn quản trị sau đây:

- [Di chuyển từ Bukkit / Paper / Spigot Server](./migrating-from-bukkit) — Những khác biệt chính trong quản trị server, plugin, lưu trữ thế giới, và hiệu suất.
- [Cấu hình Máy chủ](../config/introduction) — Phân tích chi tiết các cài đặt trong `pumpkin.toml`.
- [Thiết lập Proxy](../config/proxy) — Cấu hình chuyển tiếp người chơi qua BungeeCord & Velocity.
- [Các Lệnh & Quyền hạn](../config/commands) — Quản lý lệnh operator và quyền hạn trong game.
- [Xác Thực](../config/authentication) — Chế độ trực tuyến so với chế độ ngoại tuyến và các cài đặt Yggdrasil.
- [Khắc phục Sự cố & Các vấn đề thường gặp](../troubleshooting/common_issues) — Giải quyết các vấn đề về port, bộ nhớ, và tải plugin.
