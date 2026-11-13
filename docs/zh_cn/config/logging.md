# 日志

Pumpkin 在 `pumpkin.toml` 中提供可自定义的日志选项。

## 配置

:::code-group

```toml [pumpkin.toml]
[logging]
enabled = true
level = "info"
threads = false
thread_ids = false
target = false
color = true
timestamp = true
timestamp_format = "[hour]:[minute]:[second]"
file = "latest.log"
```

:::

### 配置选项

- **`enabled`**：启用或禁用服务器日志的总开关（默认：`true`）。
- **`level`**：控制台和文件输出的最低日志级别。可用级别为 `"trace"`、`"debug"`、`"info"`、`"warn"`、`"error"` 和 `"off"`（默认：`"info"`）。也可通过 `RUST_LOG` 环境变量覆盖。
- **`threads`**：是否在日志消息中包含线程名称（默认：`false`）。
- **`thread_ids`**：是否在日志消息中包含数字线程 ID（默认：`false`）。
- **`target`**：是否在日志条目中包含模块和组件目标（默认：`false`）。
- **`color`**：是否在控制台中启用 ANSI 彩色日志输出（默认：`true`）。
- **`timestamp`**：是否在日志条目中包含时间戳（默认：`true`）。
- **`timestamp_format`**：使用 `time` 格式描述语法的时间戳格式字符串（默认：`"[hour]:[minute]:[second]"`）。
- **`file`**：写入日志输出的文件路径（默认：`"latest.log"`）。
