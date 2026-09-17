# 基岩版与 NetherNet

Pumpkin 原生支持 Minecraft 基岩版客户端，包括 NetherNet WebRTC/ICE 传输层以及用户名自定义。

## 配置

:::code-group

```toml [pumpkin.toml]
[networking.bedrock]
enabled = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"
username_prefix = ""
replace_username_spaces = true
chunk_caching = true

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
identity_key = "nethernet-key.der"
stun_servers = []
```

:::

### 基岩版选项

- **`enabled`**：是否接受来自基岩版客户端的连接（默认：`true`）。
- **`online_mode`**：是否对基岩版玩家强制执行 Xbox Live 身份验证（默认：`true`）。
- **`max_players`**：基岩版最大并发玩家数量（设置为 `0` 表示不限制，默认：`1000`）。
- **`view_distance`**：发送给基岩版客户端的最大区块视距（默认：`16`）。
- **`simulation_distance`**：基岩版玩家的最大 Tick 模拟距离（默认：`10`）。
- **`motd`**：在基岩版服务器列表中显示的每日消息（MOTD）。
- **`username_prefix`**：添加到基岩版玩家代号（Gamertag）前面的可选前缀（例如 `"."` 或 `"*"`），防止在跨平台联机服务器中与 Java 版账户发生名称冲突（默认：`""`）。
- **`replace_username_spaces`**：是否自动将基岩版玩家代号中的空格替换为下划线 `_`，以确保在 Minecraft 斜杠命令中可以正常引用玩家名称（默认：`true`）。
- **`chunk_caching`**：是否启用客户端区块 Blob 缓存以节省网络带宽（默认：`true`）。

### NetherNet 传输设置

NetherNet 是 Minecraft 基岩版的现代 WebRTC/ICE 网络传输协议：

- **`enabled`**：是否允许客户端使用 NetherNet 连接（默认：`true`）。
- **`address`**：用于 TCP 信令和 UDP ICE 多路复用的网络套接字地址（默认：`"0.0.0.0:19132"`）。
- **`external_ip`**：当服务器托管在 NAT 之后时对外通告的可选公网 IP 地址。
- **`identity_key`**：PKCS#8 P-384 身份私钥文件的路径，在重启时保留该文件以实现客户端的首次信任（TOFU）验证（默认：`"nethernet-key.der"`）。
- **`stun_servers`**：用于 ICE NAT 穿透的 STUN 服务器 URL 可选列表。
