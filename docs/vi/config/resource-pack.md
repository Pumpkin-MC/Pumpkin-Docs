# Gói tài nguyên

Server có thể gửi gói tài nguyên cho client để thay đổi giao diện của game trên client. Pumpkin cho phép bạn tùy chỉnh gói tài nguyên.

> [!TIP]
> Nén gói tài nguyên của bạn bằng [PackSquash](https://packsquash.aylas.org/)! Điều này có thể giúp client tải gói tài nguyên nhanh hơn.

## Cấu hình gói tài nguyên

#### `enabled`: Boolean

Bật và tắt gói tài nguyên.

:::code-group

```toml [features.toml] {2}
[resource_pack]
enabled = true
```

:::

#### `resource_pack_url`: String

URL tải trực tiếp gói tài nguyên.

> [!TIP]
> Bạn có thể host gói tài nguyên miễn phí tại [MCPacks](https://mc-packs.net/).

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_url = "[your download URL here]"
```

:::

#### `resource_pack_sha1`: String

SHA1 hash của gói tài nguyên.

> [!IMPORTANT] QUAN TRỌNG
> Mặc dù không bắt buộc phải chỉ định, bạn nên chỉ định trường này vì client sẽ tải lại gói tài nguyên mỗi khi tham gia server, ngay cả khi không có thay đổi nào đối với gói tài nguyên.

> [!WARNING] CẢNH BÁO
> Hãy đảm bảo cập nhật trường này nếu gói tài nguyên được sửa đổi.

::: details Làm thế nào để lấy SHA1 hash của gói tài nguyên?
::: code-group

```powershell [Windows (PowerShell)]
Get-FileHash [file] SHA1
```

```shell [Mac OS]
shasum -a 1 [file]
```

```shell [Linux]
sha1sum [file]
```

:::

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_sha1 = "[your hash here]"
```

:::

#### `prompt_message`: String

Thông báo hiển thị cho người dùng khi được yêu cầu tải gói tài nguyên.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
prompt_message = "[your message here]"
```

:::

#### `force`: Boolean

Bắt buộc client tải gói tài nguyên. Nếu client từ chối tải, họ sẽ bị kick khỏi server.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
force = false
```

:::

## Cấu hình mặc định

Theo mặc định, không có gói tài nguyên nào được gửi cho client.

:::code-group

```toml [features.toml]
[resource_pack]
enabled = false
resource_pack_url = ""
resource_pack_sha1 = ""
prompt_message = ""
force = false
```

:::
