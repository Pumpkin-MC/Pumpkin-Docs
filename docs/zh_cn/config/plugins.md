# 插件

Pumpkin 提供了基于权能量化安全模型的 WebAssembly (WASM) 插件运行时。插件行为、签名验证及权限均在 `pumpkin.toml` 中的 `[plugins]` 下进行配置。

## 配置

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

# Optional per-plugin overrides
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

### 全局插件设置

- **`enabled`**：启用或禁用插件运行时的总开关（默认：`true`）。
- **`hot_reload`**：监视 `plugins/` 目录并在运行时自动重新加载修改后的插件（默认：`false`）。
- **`ask_permission_confirmation`**：当插件请求未经批准的功能/权限时，在服务器控制台中提示确认（默认：`true`）。
- **`allow_unsigned`**：是否允许加载未签名的 WASM 插件（默认：`true`）。
- **`allowed_permissions`**：为所有插件全局预先批准的权限列表，绕过控制台交互式提示（默认：`[]`）。
- **`blocked_permissions`**：对所有插件全局拒绝的权限列表（默认：`[]`）。
- **`inherit_env`**：宿主环境变量默认是否继承到插件的 WASI 沙箱中（默认：`false`）。
- **`loopback_only`**：插件的出站网络连接是否限制为仅允许 `127.0.0.1` / 本地回环（localhost）（默认：`false`）。
- **`max_memory_mb`**：（可选）每个插件实例的全局最大内存限制，单位为兆字节（MB）。
- **`verify_signatures`**：Pumpkin 在加载 WASM 插件前是否验证其加密签名（默认：`true`）。

### 单个插件覆盖设置

在 `[plugins.overrides.<plugin_name>]` 下针对特定插件微调权限与环境变量：

- **`enabled`**：启用或禁用该特定插件（默认：`true`）。
- **`allow_unsigned`**：覆盖该特定插件是否可以无签名运行（`true`/`false`）。
- **`max_memory_mb`**：专为此插件分配的最大内存限制（单位：MB）。
- **`allowed_permissions`**：为此插件预先批准的权限。
- **`blocked_permissions`**：为此插件显式阻止的权限。
- **`loopback_only`**：覆盖此插件的本地回环网络限制。
- **`environment`**：直接传递到插件 WASI 环境中的自定义环境变量表。
