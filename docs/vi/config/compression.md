# Nén

Nén gói giảm sử dụng băng thông cho cả client Java và Bedrock. Trong `pumpkin.toml`, nén được cấu hình độc lập cho mạng Java và Bedrock, cũng như nén chunk thế giới.

## Nén Mạng

### Phiên bản Java

:::code-group

```toml [pumpkin.toml]
[networking.java.compression]
enabled = true
threshold = 256
level = 4
```

:::

### Phiên bản Bedrock

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.compression]
enabled = true
threshold = 256
level = 4
```

:::

### Các Tùy chọn Cấu hình

- **`enabled`**: Bật nén gói mạng.
- **`threshold`**: Kích thước tải trọng gói tối thiểu (tính bằng byte) cần trước khi kích hoạt nén.
- **`level`**: Cấp nén (0 đến 9, nơi giá trị cao hơn đánh đổi thời gian CPU cho kích thước gói nhỏ hơn).

## Nén Chunk Thế giới

Cài đặt nén chunk kiểm soát cách dữ liệu chunk thế giới được lưu trữ được nén trên đĩa khi `[world.chunk]` được cấu hình với `type = "anvil"` (định dạng chunk mặc định là `"pump"`).

:::code-group

```toml [pumpkin.toml]
[world.chunk]
type = "anvil"

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

- **`algorithm`**: Thuật toán nén được sử dụng cho dữ liệu chunk. Các tùy chọn được hỗ trợ là `"LZ4"`, `"ZLib"`, `"GZip"`, và `"Custom"` (mặc định: `"LZ4"`).
- **`level`**: Cấp nén cho dữ liệu chunk (mặc định: `6`).
