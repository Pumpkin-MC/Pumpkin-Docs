# Nén dữ liệu

Nén dữ liệu được sử dụng để giảm kích thước của các gói tin. Điều này có lợi để giảm băng thông phía máy chủ và cũng để giúp những người chơi có kết nối internet chậm hơn.

## Cấu hình nén dữ liệu

#### `enabled`: Boolean

Bật và tắt nén dữ liệu.

> [!TIP]
> Có thể có lợi khi tắt nén dữ liệu nếu máy chủ được đặt sau proxy.

:::code-group

```toml [features.toml] {2}
[packet_compression]
enabled = true
```

:::

#### `threshold`: Integer (0-1024)

Kích thước gói tin tối thiểu trước khi máy chủ cố gắng nén gói tin.

> [!CAUTION] CHÚ Ý
> Tăng giá trị này có thể gây hại cho người chơi có kết nối chậm.

:::code-group

```toml [features.toml] {2}
[packet_compression]
threshold = 256
```

:::

#### `level`: Integer (0-9)

Giá trị từ 0 tới 9: 0 để tắt nén dữ liệu, 1 là nén nhanh nhất (tốn dung lượng), và 9 là nén tối đa (tốn thời gian).

:::code-group

```toml [features.toml] {2}
[packet_compression]
level = 4
```

:::

## Cấu hình mặc định

Theo mặc định, nén dữ liệu được bật.

:::code-group

```toml [features.toml]
[packet_compression]
enabled = true
threshold = 256
level = 4
```

:::
