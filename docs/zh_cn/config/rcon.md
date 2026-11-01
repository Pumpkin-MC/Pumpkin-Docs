# RCON

RCON 允许你通过网络连接远程管理 Pumpkin 服务器。在 `pumpkin.toml` 中，相关设置位于 `[networking.rcon]` 下。

## 配置

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

### RCON 设置

- **`enabled`**：启用 RCON 服务的总开关。
- **`address`**：RCON 服务器绑定的 IP 地址和端口。
- **`password`**：RCON 客户端身份验证所需的密码。
- **`max_connections`**：允许的最大并发 RCON 客户端连接数。

### RCON 日志设置

- **`logged_successfully`**：记录客户端身份验证成功事件。
- **`wrong_password`**：记录身份验证失败尝试（密码错误）。
- **`commands`**：记录通过 RCON 执行的命令。
- **`quit`**：记录客户端断开连接事件。
