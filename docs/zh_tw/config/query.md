# Query

Query 協定允許外部應用程式（例如伺服器列表或監控系統）向 Pumpkin 請求狀態詳情。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = false
address = "0.0.0.0:25565"
```

:::

### 設定選項

- **`enabled`**：啟用或停用 GS4 Query 監聽器（預設：`false`）。
- **`address`**：Query 監聽器綁定的網路位址和埠（預設：`"0.0.0.0:25565"`）。
