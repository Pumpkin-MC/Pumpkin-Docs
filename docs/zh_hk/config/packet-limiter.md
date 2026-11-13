# 封包限制器

Pumpkin 內建了封包速率限制器，以保護伺服器免受封包泛洪、刷包攻擊以及客戶端漏洞利用的影響。可以針對 Java 版和基岩版客戶端分別獨立設定封包速率限制。

## 設定

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

### 設定選項

- **`enabled`**：是否為該客戶端版本啟用封包速率限制器（預設：`true`）。
- **`max_packet_rate`**：每個客戶端連線每秒允許接收的最大封包數量（預設：`500.0`）。設定為 `<= 0.0` 可在不停用限制器模組的情況下取消速率限制。
- **`burst_capacity`**：用於應對客戶端封包短時突發的令牌桶突發容量（預設：`500.0`）。
- **`kick_message`**：當連線超出封包限制時向玩家顯示的斷開連線訊息（預設：`"Kicked for spamming packets"`）。
