# 日志

Pumpkin 允许你自定义日志中想要的内容。

## 配置日志

#### `enabled`: 布尔值

是否启用日志。

:::code-group

```toml [features.toml] {2}
[logging]
enabled = true
```

:::

#### `level`: 枚举

日志详细程度级别。可能的值有：

- Off
- Error
- Warn
- Info
- Debug
- Trace

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
level = "Debug"
```

:::

#### `env`: 布尔值

是否允许通过设置 `RUST_LOG` 环境变量来选择日志级别。

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
env = true
```

:::

#### `threads`: 布尔值

是否在日志消息中打印线程信息。

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
threads = false
```

:::

#### `color`: 布尔值

是否使用彩色输出打印到控制台。

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
color = false
```

:::

#### `timestamp`: 布尔值

是否在消息中打印时间戳。

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
timestamp = false
```

:::

## 默认配置

默认情况下，日志启用于 `Info` 级别，并会打印带有颜色、线程和时间戳的信息。

:::code-group

```toml [features.toml]
[logging]
enabled = true
level = "Info"
env = false
threads = true
color = true
timestamp = true
```

:::
