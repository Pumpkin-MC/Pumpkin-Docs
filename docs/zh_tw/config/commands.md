# 指令

Pumpkin 支援 Minecraft 指令，並允許在 `pumpkin.toml` 中設定主控台、TTY 和權限行為。

## 設定

:::code-group

```toml [pumpkin.toml]
[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0

# 可選的逐指令覆蓋設定
[commands.overrides.gamemode]
permission_level = 4

[commands.overrides.tp]
enabled = false
```

:::

### 設定選項

- **`use_console`**：是否接受來自主控台的指令。
- **`use_tty`**：是否為互動式主控台輸入啟用 TTY 支援（rustyline）。
- **`log_console`**：是否將玩家執行的指令記錄到主控台。
- **`broadcast_console_to_ops`**：是否將主控台和 RCON 指令輸出廣播給線上管理員（與原版 `broadcast-console-to-ops` 一致）。
- **`default_op_level`**：分配給非管理員的 OP 權限等級（0 到 4，預設：`0`）。

## 指令覆蓋設定

你可以使用 `[commands.overrides.<command>]` 自訂權限或完全停用單個指令。鍵名使用不帶前導斜槓的指令名（例如 `gamemode`、`tp`）。

### 覆蓋選項

- **`enabled`**：是否啟用該指令（預設：`true`）。設為 `false` 時，該指令會被完全隱藏：無法執行，不會出現在 `/help` 中，也不會顯示在 Tab 自動完成中。玩家嘗試執行時會收到未知指令訊息。
- **`permission_level`**：執行該指令所需的最低權限等級：
  - `0`：所有人都可以使用。
  - `2`：普通管理員（`/gamemode` 等典型的作弊指令）。
  - `3`：管理員（`/kick`、`/ban` 等管理指令）。
  - `4`：伺服器所有者（`/stop`、`/op` 等完整伺服器管理指令）。

省略 `permission_level` 可保留該指令的預設權限等級。
