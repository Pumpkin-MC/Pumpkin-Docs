# RCON

RCON 是一种允许你从不同设备远程管理服务器的协议。Pumpkin 完全支持 RCON。

## 配置 RCON

#### `enabled`: 布尔值

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon]
enabled = false
```

:::

#### `address`: 字符串

RCON 应监听的地址和端口。

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
address = "0.0.0.0:25575"
```

:::

#### `password`: 字符串

用于 RCON 认证的密码。

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
password = "[your safe password here]"
```

:::

#### `max_connections`: 整数

单次允许的最大 RCON 连接数。设置为 0 以禁用限制。

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
max_connections = 10
```

:::

### 日志记录

#### `logged_successfully`: 布尔值

成功登录是否应记录到控制台。

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
logged_successfully = true
```

:::

#### `wrong_password`: 布尔值

错误密码尝试是否应记录到控制台。

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
wrong_password = true
```

:::

#### `commands`: 布尔值

从 RCON 运行的命令是否应记录到控制台。

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
commands = true
```

:::

#### `quit`: 布尔值

RCON 客户端退出是否应被记录。

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
quit = true
```

:::

## 默认配置

默认情况下，RCON 是禁用的。

:::code-group

```toml [pumpkin.toml]
[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 10

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true
```

:::
