# Plugins

Pumpkin supports WASM-based plugins. This section configures plugin-related settings.

## Configuring Plugins

#### `blocked_permissions`: String Array

List of permissions that are globally blocked for all plugins.

:::code-group

```toml [pumpkin.toml] {2}
[plugins]
blocked_permissions = []
```

:::

## Default Config

:::code-group

```toml [pumpkin.toml]
[plugins]
blocked_permissions = []
```

:::
