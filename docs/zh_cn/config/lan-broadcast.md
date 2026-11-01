# 局域网广播

Pumpkin 可以在本地网络中广播服务器通告，让局域网客户端轻松发现并加入服务器。

## 配置

:::code-group

```toml [pumpkin.toml]
[networking.lan_broadcast]
enabled = false
# motd = "My Custom LAN Server"
# port = 25565
```

:::

### 配置选项

- **`enabled`**：启用或禁用在本地网络中广播服务器信息（默认：`false`）。
- **`motd`**：（可选）在局域网客户端的服务器发现列表中显示的自定义单行服务器描述（MOTD）。如果省略，则默认使用服务器的 Java 版 MOTD 并移除换行符。
- **`port`**：（可选）在局域网广播中通告的端口。适用于端口转发，或 Docker 等容器化环境中需要使用可预测端口的场景。
