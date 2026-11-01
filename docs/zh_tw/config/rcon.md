# RCON

RCON 允許你透過網路連線遠端管理 Pumpkin 伺服器。在 `pumpkin.toml` 中，相關設定位於 `[networking.rcon]` 下。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 10

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true
```

:::

### RCON 設定

- **`enabled`**：啟用 RCON 服務的總開關。
- **`address`**：RCON 伺服器綁定的 IP 位址和埠。
- **`password`**：RCON 用戶端身分驗證所需的密碼。
- **`max_connections`**：允許的最大併發 RCON 用戶端連線數。

### RCON 日誌設定

- **`logged_successfully`**：記錄用戶端身分驗證成功事件。
- **`wrong_password`**：記錄身分驗證失敗嘗試（密碼錯誤）。
- **`commands`**：記錄透過 RCON 執行的指令。
- **`quit`**：記錄用戶端斷開連線事件。
