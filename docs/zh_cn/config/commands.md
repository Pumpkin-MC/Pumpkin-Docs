# 命令

Pumpkin 支持 Minecraft 命令，并允许在 `pumpkin.toml` 中配置控制台、TTY 和权限行为。

## 配置

:::code-group

```toml [pumpkin.toml]
[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0

# 可选的逐命令覆盖设置
[commands.overrides.gamemode]
permission_level = 4

[commands.overrides.tp]
enabled = false
```

:::

### 配置选项

- **`use_console`**：是否接受来自控制台的命令。
- **`use_tty`**：是否为交互式控制台输入启用 TTY 支持（rustyline）。
- **`log_console`**：是否将玩家执行的命令记录到控制台。
- **`broadcast_console_to_ops`**：是否将控制台和 RCON 命令输出广播给在线管理员（与原版 `broadcast-console-to-ops` 一致）。
- **`default_op_level`**：分配给非管理员的 OP 权限等级（0 到 4，默认：`0`）。

## 命令覆盖设置

你可以使用 `[commands.overrides.<command>]` 自定义权限或完全禁用单个命令。键名使用不带前导斜杠的命令名（例如 `gamemode`、`tp`）。

### 覆盖选项

- **`enabled`**：是否启用该命令（默认：`true`）。设为 `false` 时，该命令会被完全隐藏：无法运行，不会出现在 `/help` 中，也不会显示在 Tab 补全中。玩家尝试运行时会收到未知命令消息。
- **`permission_level`**：运行该命令所需的最低权限等级：
  - `0`：所有人都可以使用。
  - `2`：普通管理员（`/gamemode` 等典型的作弊命令）。
  - `3`：管理员（`/kick`、`/ban` 等管理命令）。
  - `4`：服务器所有者（`/stop`、`/op` 等完整服务器管理命令）。

省略 `permission_level` 可保留该命令的默认权限等级。
