# 管理服务器 (MSMP) / RCON

> [!WARNING]
> 传统的 RCON（`[networking.rcon]`）已被 `[networking.management]` 下的 [Minecraft 服务器管理协议 (MSMP)](./management) 所取代。

## 配置

:::code-group

```toml [pumpkin.toml]
[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
allowed_origins = []
status_heartbeat_interval = 0
```

:::

### 管理服务器设置

- **`enabled`**：启用 Minecraft 服务器管理协议 (MSMP) WebSocket 服务的总开关（默认：`false`）。
- **`address`**：管理服务器监听 WebSocket 连接的 IP 地址和端口（默认：`"127.0.0.1:25585"`）。
- **`secret`**：用于验证管理客户端身份的 40 位字母数字密钥。如果在启动时留空（`""`），系统将自动生成一个随机的 40 位密钥。
- **`allowed_origins`**：允许通过 Web 浏览器连接的来源列表，通过 `Origin` HTTP 头进行验证（默认：`[]`）。
- **`status_heartbeat_interval`**：自动广播服务器状态心跳的时间间隔（秒）（`0` 表示禁用心跳广播，默认：`0`）。
