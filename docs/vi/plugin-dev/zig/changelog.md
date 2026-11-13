# Changelog

Các thay đổi đối với binding và helper Zig, được nhóm theo phiên bản `pumpkin-api-zig`. Các phiên bản này riêng biệt với các release server Pumpkin. Plugin API revision được đặt tên bởi một release vẫn phải khớp với server.

## 0.2.0

WIT: [pumpkin-plugin-wit@79cc4f0](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/79cc4f05a7f47e5672169d3bef593855267ec5e2).

### Helper và ví dụ mới

- [Chat prompts](./prompts): đặt câu hỏi, phân tích câu trả lời số, thử lại xác thực và trình bày lựa chọn có thể click hoặc gõ. Session hỗ trợ hủy bỏ, thay thế, timeout, văn bản tùy chỉnh và khớp, filter capture và command lựa chọn có thể cấu hình.
- [Menus](./menus): đánh dấu các slot tự do giống rương `free`, đặt các `stacks` hiện có và đọc nội dung thông qua `menu.items`, bao gồm trong `on_close`.
- [Vault](./menus#a-vault-with-pages): kho lưu trữ cá nhân với lựa chọn trang, chỉ báo slot đã chiếm, `/vault <page>` và sức chứa có thể cấu hình từ 1 đến 45 trang. Các trang cao hơn đã chiếm vẫn có thể truy cập khi sức chứa được hạ xuống.
- Ví dụ menu thêm `/trash`, và ví dụ heal chấp nhận `/heal` đơn giản cho người gửi.

### Kiểm soát nhiều hơn đối với helper

- [Commands](./commands): thay thế lỗi đối số được gõ thông qua `cmd.bad_argument`, trả về thất bại được định dạng với `cmd.failWith` và bỏ qua đăng ký permission tự động với `register_permission`.
- [Items](./items): thiết lập nghiêng mặc định, chọn ID modifier, đọc và ghi namespace dữ liệu rõ ràng, và kiểm tra sức chứa kho đồ với `item.room`. Xem giới hạn offhand được tài liệu hóa của nó trước khi sử dụng cho giao dịch.
- [Configuration](./files): chọn TOML hoặc JSON độc lập với tên file, kiểm soát việc tạo file và ghi đè cài đặt thiếu, chặn cảnh báo unknown-key và giới hạn đọc file. TOML writer hỗ trợ struct và tuple trong mảng.
- [Player data](./player-data): chọn layout JSON, TOML hoặc codec tùy chỉnh; cấu hình xác thực key, eviction nhàn rỗi và giới hạn read-size. Thay đổi định dạng không di chuyển các file hiện có.
- [Networking](./networking): cấu hình buffer nhận TCP cho kết nối đi và được chấp nhận, và chọn bundle chứng chỉ HTTPS với `http.ca_file`. `/nettest` thêm coverage cho buffer tùy chỉnh và dòng quá dài.

### Sửa lỗi

- Tuần tự hóa TOML không còn thất bại trên struct hoặc tuple trong mảng.
- Nút màu được tạo runtime giữ storage backing riêng cho tên của chúng.

## 0.1.1

WIT: [pumpkin-plugin-wit@75f96e9](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/75f96e9475c44295f346e87531e7508f40057622).

Fixed một compile-time branch quota failure khi một plugin khai báo ba hoặc nhiều sự kiện. [So sánh 0.1.0 và 0.1.1](https://github.com/Pumpkin-MC/pumpkin-api-zig/compare/v0.1.0...v0.1.1).

## 0.1.0

WIT: [pumpkin-plugin-wit@75f96e9](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/75f96e9475c44295f346e87531e7508f40057622).

Release ban đầu cho Zig 0.16.0, building plugin sebagai WebAssembly component:

- Plugin API được tạo và binding `wasi:sockets`, với canonical ABI runtime và callback resource management.
- `addPlugin` và `target` cho plugin build, import Zig bổ sung và C dependency tương thích WASI.
- Đăng ký sự kiện, declarative command tree và styled text helper.
- Locked inventory menu và item helper cho việc xây dựng, chỉnh sửa, cấp phát và thu hồi stack.
- Công việc bị trì hoãn và lặp lại với dữ liệu được copy và cancellation tracking.
- Cấu hình TOML và JSON, per-player file store, HTTP/HTTPS và TCP/UDP networking.
- Plugin ví dụ, `/nettest` cho kiểm tra mạng server-side, và automated build và release workflow.

Xem các release [0.1.0](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.1.0), [0.1.1](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.1.1) và [0.2.0](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.2.0) cho artifact và plugin API revision của chúng.
