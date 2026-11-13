# 插件

Pumpkin 提供了採用基於權能的安全模型的 WebAssembly (WASM) 插件執行環境。插件行為、簽名驗證及權限均在 `pumpkin.toml` 中的 `[plugins]` 下進行設定。

## 設定

:::code-group

```toml [pumpkin.toml]
[plugins]
enabled = true
hot_reload = false
ask_permission_confirmation = true
allow_unsigned = true
allowed_permissions = []
blocked_permissions = []
inherit_env = false
loopback_only = false
verify_signatures = true

# 可選的逐插件覆蓋設定
[plugins.overrides.my_plugin]
enabled = true
allow_unsigned = true
max_memory_mb = 128
allowed_permissions = ["fs:read:data"]
blocked_permissions = ["network:outbound"]
loopback_only = true

[plugins.overrides.my_plugin.environment]
API_KEY = "example_secret"
```

:::

### 全域插件設定

- **`enabled`**：啟用或停用插件執行環境的總開關（預設：`true`）。
- **`hot_reload`**：監視 `plugins/` 目錄並在執行時自動重新載入修改後的插件（預設：`false`）。
- **`ask_permission_confirmation`**：當插件請求未經批准的功能/權限時，在伺服器主控台中提示確認（預設：`true`）。
- **`allow_unsigned`**：是否允許載入未簽名的 WASM 插件（預設：`true`）。
- **`allowed_permissions`**：為所有插件全域預先批准的權限列表，繞過主控台互動式提示（預設：`[]`）。
- **`blocked_permissions`**：對所有插件全域拒絕的權限列表（預設：`[]`）。
- **`inherit_env`**：主機環境變數預設是否繼承到插件的 WASI 沙箱中（預設：`false`）。
- **`loopback_only`**：插件的出站網路連線是否限制為僅允許 `127.0.0.1` / 本地迴環（localhost）（預設：`false`）。
- **`max_memory_mb`**：（可選）每個插件實例的全域最大記憶體限制，單位為兆位元組（MB）。
- **`verify_signatures`**：Pumpkin 在載入 WASM 插件前是否驗證其加密簽名（預設：`true`）。

### 單個插件覆蓋設定

在 `[plugins.overrides.<plugin_name>]` 下針對特定插件微調權限與環境變數：

- **`enabled`**：啟用或停用該特定插件（預設：`true`）。
- **`allow_unsigned`**：覆蓋該特定插件是否可以無簽名執行（`true`/`false`）。
- **`max_memory_mb`**：專為此插件分配的最大記憶體限制（單位：MB）。
- **`allowed_permissions`**：為此插件預先批准的權限。
- **`blocked_permissions`**：為此插件顯式阻止的權限。
- **`loopback_only`**：覆蓋此插件的本地迴環網路限制。
- **`environment`**：直接傳遞到插件 WASI 環境中的自訂環境變數表。
