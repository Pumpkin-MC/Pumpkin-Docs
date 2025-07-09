# RCON
RCON 是一种允许你从不同设备远程管理服务器的协议。Pumpkin 完全支持 RCON。

## 配置 RCON

#### `enabled`: 布尔值

:::code-group
```toml [features.toml] {2}
[rcon]
enabled = true
```
:::

#### `address`: 字符串
RCON 应监听的地址和端口。

:::code-group
```toml [features.toml] {3}
[rcon]
enabled = true
address = "0.0.0.0:25575"
```
:::

#### `password`: 字符串
用于 RCON 认证的密码。

:::code-group
```toml [features.toml] {3}
[rcon]
enabled = true
password = "[你的安全密码在这里]"
```
:::

#### `max_connections`: 整数
单次允许的最大 RCON 连接数。设置为 0 以禁用限制。

:::code-group
```toml [features.toml] {3}
[rcon]
enabled = true
max_connections = 5
```
:::

### 日志记录
#### `log_logged_successfully`: 布尔值
成功登录是否应记录到控制台。

:::code-group
```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```
:::

#### `log_wrong_password`: 布尔值
错误密码尝试是否应记录到控制台。

:::code-group
```toml [features.toml] {2}
[rcon.logging]
log_wrong_password = true
```
:::

#### `log_commands`: 布尔值
从 RCON 运行的命令是否应记录到控制台。

:::code-group
```toml [features.toml] {2}
[rcon.logging]
log_commands = true
```
:::

#### `log_quit`: 布尔值
RCON 客户端退出是否应被记录。

:::code-group
```toml [features.toml] {2}
[rcon.logging]
log_quit = true
```
:::

## 默认配置
默认情况下，RCON 是禁用的。

:::code-group
```toml [features.toml]
[rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 0

[rcon.logging]
log_logged_successfully = true
log_wrong_password = true
log_commands = true
log_quit = true
```
::: 