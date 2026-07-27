# Resource Pack

Pumpkin hỗ trợ cung cấp resource pack cho các client Java và Bedrock. Các tùy chọn resource pack được cấu hình trong mục `[resource_pack.java]` và `[resource_pack.bedrock]` trong file `pumpkin.toml`.

## Java Resource Pack

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

- **`enabled`**: Bật tính năng cung cấp resource pack cho các client Java.
- **`url`**: URL tải xuống trực tiếp file zip của Java resource pack.
- **`sha1`**: Mã kiểm tra (checksum) SHA-1 của file zip resource pack.
- **`prompt_message`**: Tin nhắn hiển thị cho người chơi khi được yêu cầu tải xuống.
- **`force`**: Ngắt kết nối những người chơi từ chối tải xuống resource pack.

## Bedrock Resource Pack

:::code-group

```toml [pumpkin.toml]
[resource_pack.bedrock]
enabled = false
force = false
packs = []
```

:::

### Tùy chọn

- **`enabled`**: Bật resource pack cho các client Bedrock.
- **`force`**: Bắt buộc các client Bedrock phải tải xuống các pack được yêu cầu.
- **`packs`**: Mảng chứa các định nghĩa resource pack cho Bedrock.