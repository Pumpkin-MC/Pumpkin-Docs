# 區域網廣播

Pumpkin 可以在本地網絡中廣播伺服器通告，讓區域網客戶端輕鬆發現並加入伺服器。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.lan_broadcast]
enabled = false
# motd = "My Custom LAN Server"
# port = 25565
```

:::

### 設定選項

- **`enabled`**：啟用或停用在本地網絡中廣播伺服器資訊（預設：`false`）。
- **`motd`**：（可選）在區域網客戶端的伺服器發現列表中顯示的自訂單行伺服器描述（MOTD）。如果省略，則預設使用伺服器的 Java 版 MOTD 並移除換行符。
- **`port`**：（可選）在區域網廣播中通告的端口。適用於端口轉發，或 Docker 等容器化環境中需要使用可預測端口的場景。
