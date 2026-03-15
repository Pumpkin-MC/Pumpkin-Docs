# Proxy

Nhiều server sử dụng proxy để quản lý kết nối và phân phối người chơi trên các server. Pumpkin hỗ trợ các giao thức proxy sau:

- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://www.spigotmc.org/wiki/bungeecord-installation/)

> [!TIP]
> Velocity được khuyến nghị cho hầu hết các mạng server. Velocity hiện đại và hiệu quả hơn so với BungeeCord.

## Cấu hình Proxy

#### `enabled`: Boolean

Bật và tắt proxy.

:::code-group

```toml [features.toml]{2}
[proxy]
enabled = true
```

:::

### Velocity

#### `enabled`: Boolean

Bật và tắt Velocity.

:::code-group

```toml [features.toml]{2}
[proxy.velocity]
enabled = true
```

:::

#### `secret`: String

Secret như đã cấu hình trong Velocity.

:::code-group

```toml [features.toml]{3}
[proxy.velocity]
enabled = true
secret = "[proxy secret ở đây]"
```

:::

### BungeeCord

#### `enabled`: Boolean

Bật và tắt BungeeCord.

:::code-group

```toml [features.toml]{2}
[proxy.bungeecord]
enabled = true
```

:::

> [!CAUTION] CHÚ Ý
> BungeeCord không thể xác minh thông tin người chơi có từ proxy của bạn hay không. Đảm bảo tường lửa của server được cấu hình đúng.

## Cấu hình mặc định

Theo mặc định, proxy bị tắt. Đây là cấu hình mặc định:

:::code-group

```toml [features.toml]
[proxy]
enabled = false

[proxy.velocity]
enabled = false
secret = ""

[proxy.bungeecord]
enabled = false
```

:::
