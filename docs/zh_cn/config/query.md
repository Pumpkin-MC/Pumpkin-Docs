# 查询

查询协议是一种查询服务器状态的简单方法。Pumpkin 完全支持查询协议。

## 配置查询

#### `enabled`: 布尔值

是否监听查询协议请求。

:::code-group

```toml [pumpkin.toml] {2}
[networking.query]
enabled = true
```

:::

#### `poaddressrt`: 整数 (0-65535) (可选)

监听查询协议请求的端口。如果未指定，将使用与服务器相同的端口。

:::code-group

```toml [pumpkin.toml] {3}
[networking.query]
address = "0.0.0.0:25565"
```

:::

## 默认配置

默认情况下，查询功能是禁用的。如果启用，它将在服务器端口上运行，除非明确指定。

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::
