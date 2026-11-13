# Gói tài nguyên

Pumpkin hỗ trợ phục vụ các gói tài nguyên cho khách hàng Java và Bedrock. Các tùy chọn gói tài nguyên được cấu hình trong `[resource_pack.java]` và `[resource_pack.bedrock]` trong `pumpkin.toml`.

## Gói tài nguyên Java

:::code-group

```toml [pumpkin.toml]
[resource_pack.java]
enabled = false
url = ""
sha1 = ""
prompt_message = ""
force = false
```

:::

### Tùy chọn

- **`enabled`**: Bật phục vụ gói tài nguyên cho khách hàng Java.
- **`url`**: URL tải xuống trực tiếp cho tệp zip gói tài nguyên Java.
- **`sha1`**: Kiểm tra tổng SHA-1 của tệp zip gói tài nguyên.
- **`prompt_message`**: Thông báo hiển thị cho người chơi khi được nhắc tải xuống.
- **`force`**: Ngắt kết nối người chơi từ chối tải xuống gói tài nguyên.

## Gói tài nguyên Bedrock

:::code-group

```toml [pumpkin.toml]
[resource_pack.bedrock]
enabled = false
force = false
packs = [
  # { uuid = "00000000-0000-0000-0000-000000000000", version = "1.0.0", size = 1048576, download_url = "https://example.com/pack.mcpack", path = "resource_packs/pack.mcpack" }
]
```

:::

### Tùy chọn

- **`enabled`**: Bật gói tài nguyên cho khách hàng Bedrock.
- **`force`**: Buộc khách hàng Bedrock tải xuống các gói cần thiết trước khi tham gia.
- **`packs`**: Mảng các định nghĩa gói tài nguyên Bedrock.

### Các trường gói Bedrock

Mỗi gói trong mảng `packs` chấp nhận các thuộc tính sau:

- **`uuid`**: (Bắt buộc) Mã định danh duy nhất (UUID) cho gói Bedrock khớp với `manifest.json` của nó.
- **`version`**: (Bắt buộc) Chuỗi phiên bản của gói (ví dụ: `"1.0.0"`).
- **`size`**: (Bắt buộc) Kích thước tệp của lưu trữ gói tính bằng byte.
- **`download_url`**: (Bắt buộc) URL tải xuống trực tiếp cho tệp `.mcpack` hoặc lưu trữ (có thể trống `""` khi phát trực tiếp gói cục bộ từ máy chủ).
- **`path`**: (Tùy chọn) Đường dẫn hệ thống tệp trên máy chủ đến lưu trữ gói cục bộ (`.mcpack` hoặc `.zip`). Khi được đặt (hoặc khi một tệp khớp tồn tại tại `resource_packs/<uuid>_<version>.mcpack`, `resource_packs/<uuid>_<version>.zip`, `resource_packs/<uuid>.mcpack`, hoặc `resource_packs/<uuid>.zip`), Pumpkin phát trực tiếp gói đến khách hàng Bedrock đang kết nối theo từng phần.
- **`content_key`**: (Tùy chọn) Khóa giải mã cho các gói marketplace/tùy chỉnh được mã hóa.
- **`sub_pack_name`**: (Tùy chọn) Tên gói con trong gói để kích hoạt.
- **`content_id`**: (Tùy chọn) Chuỗi mã định danh nội dung.
- **`has_scripts`**: (Tùy chọn) Có gói chứa các tập lệnh khách hàng hay không (`true`/`false`, mặc định: `false`).
- **`addon_pack`**: (Tùy chọn) Có gói được đánh dấu là gói addon hay không (mặc định: `false`).
- **`rtx_enabled`**: (Tùy chọn) Có bật các tính năng ray tracing / RTX cho gói hay không (mặc định: `false`).
