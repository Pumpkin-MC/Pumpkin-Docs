# Query

Giao thức Query là một cách đơn giản để truy vấn trạng thái của server. Pumpkin hỗ trợ đầy đủ giao thức Query.

## Cấu hình Query

#### `enabled`: Boolean

Bật và tắt Query.

:::code-group

```toml [features.toml] {2}
[query]
enabled = true
```

:::

#### `port`: Integer (0-65535) (optional)

Port để lắng nghe các yêu cầu Query. Nếu không được chỉ định, nó sẽ sử dụng cùng port với server.

:::code-group

```toml [features.toml] {3}
[query]
enabled = true
port = 12345
```

:::

## Cấu hình mặc định

Theo mặc định, Query bị tắt. Nó sẽ chạy trên port của server nếu được bật trừ khi được chỉ định rõ ràng.

:::code-group

```toml [features.toml]
[query]
enabled = true
port = 25565
```

:::
