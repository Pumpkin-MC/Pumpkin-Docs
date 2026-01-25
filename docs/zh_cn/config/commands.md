# 命令

Pumpkin 支持原版命令，并允许你配置命令可以从哪里运行。

## 配置命令

#### `use_console`: 布尔值

是否接受来自控制台的命令。

:::code-group

```toml [features.toml] {2}
[commands]
use_console = false
```

:::

#### `log_console`: 布尔值

玩家的命令是否应该记录在控制台中。

:::code-group

```toml [features.toml] {2}
[commands]
log_console = false
```

:::

## 操作权限等级

所有玩家的默认权限等级。

:::code-group

```toml [configuration.toml] {2}
default_op_level = 0
```

:::

## 默认配置

默认情况下，Pumpkin 将允许来自控制台的命令，并记录玩家运行的所有命令。

:::code-group

```toml [features.toml]
[commands]
use_console = true
log_console = true
default_op_level = 0
```

:::
