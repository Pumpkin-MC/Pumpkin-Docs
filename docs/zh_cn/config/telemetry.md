# 遥测

Pumpkin 包含可选的匿名遥测功能以及可选择加入的公开服务器目录。遥测相关配置项位于 `pumpkin.toml` 的 `[telemetry]` 下。

## 配置

:::code-group

```toml [pumpkin.toml]
[telemetry]
enabled = true
endpoint = "https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"
interval_secs = 300
public = false
# server_name = "My Pumpkin Server"
```

:::

### 配置选项

- **`enabled`**: 是否启用匿名遥测（默认值：`true`）。
- **`endpoint`**: 遥测后端数据接收端点 URL（默认值：`"https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"`）。
- **`interval_secs`**: 心跳发送时间间隔（秒）（默认值：`300` 秒 / 5 分钟，最小值：`60` 秒）。
- **`public`**: 是否选择加入并在社区公开服务器目录中展示此服务器（默认值：`false`）。
- **`server_name`**: （可选）当 `public` 为 `true` 时在分析控制面板上显示的公开服务器名称。
