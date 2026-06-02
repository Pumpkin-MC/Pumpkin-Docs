# 聊天

Pumpkin 允许您自定义聊天消息格式。

## 配置聊天

#### `format`: 字符串

聊天消息的格式。支持 `{DISPLAYNAME}` 和 `{MESSAGE}` 等占位符。

:::code-group

```toml [pumpkin.toml] {2}
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::

### 可用占位符

| 占位符            | 描述              |
| ----------------- | ----------------- |
| `{DISPLAYNAME}`   | 玩家的显示名称    |
| `{MESSAGE}`       | 聊天消息的内容    |

## 默认配置

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::
