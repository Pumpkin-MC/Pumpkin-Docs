# Nén dữ liệu

Nén gói tin giúp giảm mức sử dụng băng thông cho cả client Java và Bedrock. Trong `pumpkin.toml`, tính năng nén được cấu hình độc lập cho kết nối mạng của Java và Bedrock, cũng như nén chunk thế giới.

## Nén dữ liệu mạng

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

### Tùy chọn cấu hình

- **`enabled`**: Bật/tắt tính năng nén gói tin mạng.
- **`threshold`**: Kích thước payload tối thiểu của gói tin (tính bằng byte) cần thiết trước khi kích hoạt nén.
- **`level`**: Mức độ nén (từ 0 đến 9, giá trị càng cao sẽ đánh đổi thời gian xử lý của CPU để lấy kích thước gói tin nhỏ hơn).

## Nén Chunk Thế giới

Các thiết lập nén chunk kiểm soát cách dữ liệu chunk thế giới được lưu trữ và nén trên ổ đĩa.

:::code-group

```toml [pumpkin.toml]
[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

- **`algorithm`**: Thuật toán nén được sử dụng cho dữ liệu chunk (ví dụ: `"LZ4"`).
- **`level`**: Mức độ nén cho dữ liệu chunk.