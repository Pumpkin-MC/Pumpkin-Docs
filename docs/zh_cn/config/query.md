# Query

Query 协议允许外部应用程序（例如服务器列表或监控系统）向 Pumpkin 请求状态详情。

## 配置

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = false
address = "0.0.0.0:25565"
```

:::

### 配置选项

- **`enabled`**：启用或禁用 GS4 Query 监听器（默认：`false`）。
- **`address`**：Query 监听器绑定的网络地址和端口（默认：`"0.0.0.0:25565"`）。
