# 管理服务器 (MSMP)

Pumpkin 基于 WebSocket 实现了 [Minecraft 服务器管理协议 (MSMP)](https://minecraft.wiki/w/Minecraft_Server_Management_Protocol)，用于替代传统的 RCON 进行远程管理、状态监控以及 JSON-RPC 命令交互。相关配置项位于 `pumpkin.toml` 的 `[networking.management]` 下。

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

### 配置选项

- **`enabled`**: 启用 Minecraft 服务器管理协议 (MSMP) WebSocket 服务的总开关（默认值：`false`）。
- **`address`**: 管理服务器监听 WebSocket 连接的 IP 地址和端口（默认值：`"127.0.0.1:25585"`）。
- **`secret`**: 用于验证管理客户端身份的 40 位字母数字密钥。如果在启动时留空（`""`），系统将自动生成一个随机的 40 位密钥。
- **`allowed_origins`**: 允许通过 Web 浏览器连接的来源列表，通过 `Origin` HTTP 头进行验证（默认值：`[]`）。
- **`status_heartbeat_interval`**: 自动广播服务器状态心跳的时间间隔（秒）（`0` 表示禁用心跳广播，默认值：`0`）。
