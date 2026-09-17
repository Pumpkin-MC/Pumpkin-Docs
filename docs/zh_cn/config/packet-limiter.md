# 数据包限制器

Pumpkin 内置了数据包速率限制器，以保护服务器免受数据包泛洪、刷包攻击以及客户端漏洞利用的影响。可以针对 Java 版和基岩版客户端分别独立配置数据包速率限制。

## 配置

:::code-group

```toml [pumpkin.toml]
[networking.java.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"

[networking.bedrock.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"
```

:::

### 配置选项

- **`enabled`**：是否为该客户端版本启用数据包速率限制器（默认：`true`）。
- **`max_packet_rate`**：每个客户端连接每秒允许接收的最大数据包数量（默认：`500.0`）。设置为 `<= 0.0` 可在不禁用限制器模块的情况下取消速率限制。
- **`burst_capacity`**：用于应对客户端数据包短时突发的令牌桶突发容量（默认：`500.0`）。
- **`kick_message`**：当连接超出数据包限制时向玩家显示的断开连接消息（默认：`"Kicked for spamming packets"`）。
