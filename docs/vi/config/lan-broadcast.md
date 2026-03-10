# Mạng LAN

Pumpkin có thể quảng bá máy chủ trên toàn mạng LAN để giúp những người chơi cục bộ kết nối với máy chủ dễ dàng hơn.

## Cấu hình mạng LAN

#### `enabled`: Boolean

Bật và tắt mạng LAN.

:::code-group

```toml [features.toml] {2}
[lan_broadcast]
enabled = true
```

:::

#### `motd`: String (optional)

MOTD để quảng bá ra client; sử dụng MOTD của máy chủ theo mặc định.

> [!CAUTION] CHÚ Ý
> MOTD mạng LAN không hỗ trợ nhiều dòng, màu RGB hoặc gradient. Pumpkin không xác minh MOTD trước khi quảng bá nó. Nếu MOTD của máy chủ đang sử dụng các thành phần này, hãy cân nhắc định nghĩa trường này để client thấy MOTD phù hợp.

:::code-group

```toml [features.toml] {3}
[lan_broadcast]
enabled = true
motd = "[your MOTD here]"
```

:::

#### `port`: Integer (0-65535) (tùy chọn)

Port để bind. Nếu không được chỉ định, sẽ bind đến port 0 (bất kỳ port nào có sẵn trên hệ thống).

> [!IMPORTANT] QUAN TRỌNG
> Giao thức định nghĩa port để quảng bá. Tùy chọn này chỉ tồn tại để chỉ định port nào sẽ bind trên host. Tùy chọn này chỉ tồn tại để port có thể dự đoán được.

:::code-group

```toml [features.toml] {3}
[lan_broadcast]
enabled = true
port = 46733
```

:::

## Cấu hình mặc định

Theo mặc định, mạng LAN bị tắt.

:::code-group

```toml [features.toml]
[lan_broadcast]
enabled = false
motd = "[server MOTD here]"
port = 0
```

:::
