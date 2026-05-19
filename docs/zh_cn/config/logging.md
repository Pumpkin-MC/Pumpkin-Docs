# 日志

Pumpkin 允许你自定义日志中想要的内容。

## 配置日志

#### `enabled`: 布尔值

是否启用日志。

:::code-group

```toml [pumpkin.toml] {2}
[logging]
enabled = true
```

:::


#### `threads`: 布尔值

是否在日志消息中打印线程信息。

:::code-group

```toml [pumpkin.toml] {3}
[logging]
threads = true
```

:::

#### `color`: 布尔值

是否使用彩色输出打印到控制台。

:::code-group

```toml [pumpkin.toml] {3}
[logging]
color = true
```

:::

#### `timestamp`: 布尔值

是否在消息中打印时间戳。

:::code-group

```toml [pumpkin.toml] {3}
[logging]
timestamp = true
```

:::

#### `file`: Boolean

设置默认的日志文件

:::code-group

```toml [pumpkin.toml] {3}
[logging]
file = "latest.log"
```

:::

## 默认配置

默认情况下，日志启用于 `Info` 级别，并会打印带有颜色、线程和时间戳的信息。

:::code-group

```toml [pumpkin.toml]
[logging]
enabled = true
threads = true
color = true
timestamp = true
file = "latest.log"
```

:::
