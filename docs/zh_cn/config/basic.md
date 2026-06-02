# 基础配置

代表 `pumpkin.toml` 中的顶级字段。这些是服务器的核心设置。

## Java Edition

是否接受 Java Edition 客户端。

:::code-group

```toml [pumpkin.toml] {2}
java_edition = true
```

:::

## Java Edition 地址

Java Edition 服务器绑定的地址和端口。

:::code-group

```toml [pumpkin.toml] {2}
java_edition_address = "0.0.0.0:25565"
```

:::

## Bedrock Edition

是否接受 Bedrock Edition 客户端。

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition = true
```

:::

## Bedrock Edition 地址

Bedrock Edition 服务器绑定的地址和端口。

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition_address = "0.0.0.0:19132"
```

:::

## 种子（Seed）

用于世界生成的种子。

:::code-group

```toml [pumpkin.toml] {2}
seed = ""
```

:::

## 最大玩家数

服务器允许的最大玩家数量。`0` 表示不限制。

:::code-group

```toml [pumpkin.toml] {2}
max_players = 1000
```

:::

## 视距

玩家的最大视距。

:::code-group

```toml [pumpkin.toml] {2}
view_distance = 16
```

:::

## 模拟距离

玩家的最大模拟距离。

:::code-group

```toml [pumpkin.toml] {2}
simulation_distance = 10
```

:::

## 默认难度

默认游戏难度。

:::code-group

```toml [pumpkin.toml] {2}
default_difficulty = "Normal"
```

:::

```toml
Peaceful
Easy
Normal
Hard
```

## 操作员权限等级

`/op` 命令分配的权限等级。

:::code-group

```toml [pumpkin.toml] {2}
op_permission_level = 4
```

:::

## 允许下界（Nether）

是否启用了下界维度。

:::code-group

```toml [pumpkin.toml] {2}
allow_nether = true
```

:::

## 允许末地（End）

是否启用了末地维度。

:::code-group

```toml [pumpkin.toml] {2}
allow_end = true
```

:::

## 极限模式

服务器是否处于极限模式。

:::code-group

```toml [pumpkin.toml] {2}
hardcore = false
```

:::

## 在线模式

是否启用在线模式。需要有效的 Minecraft 账户。

:::code-group

```toml [pumpkin.toml] {2}
online_mode = true
```

:::

## 加密

是否启用数据包加密。

> [!IMPORTANT]
> 在线模式启用时必须启用。

:::code-group

```toml [pumpkin.toml] {2}
encryption = true
```

:::

## MOTD

每日消息；在状态屏幕上显示的服务器描述。

:::code-group

```toml [pumpkin.toml] {2}
motd = "A blazingly fast Pumpkin server!"
```

:::

## TPS

服务器的目标 tick 速率。

:::code-group

```toml [pumpkin.toml] {2}
tps = 20.0
```

:::

## 默认游戏模式

玩家的默认游戏模式。

:::code-group

```toml [pumpkin.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Survival
Creative
Adventure
Spectator
```

## 强制游戏模式

服务器是否在加入时强制设置游戏模式。

:::code-group

```toml [pumpkin.toml] {2}
force_gamemode = false
```

:::

## IP 清理

是否从日志中清除玩家 IP 地址。

:::code-group

```toml [pumpkin.toml] {2}
scrub_ips = true
```

:::

## 使用 Favicon

是否使用服务器 Favicon。

:::code-group

```toml [pumpkin.toml] {2}
use_favicon = true
```

:::

## Favicon 路径

服务器 Favicon 的路径。

:::code-group

```toml [pumpkin.toml] {2}
favicon_path = "icon.png"
```

:::

## 默认世界名称

世界的默认名称。

:::code-group

```toml [pumpkin.toml] {2}
default_level_name = "world"
```

:::

## 允许聊天举报

聊天消息是否应签名并可举报。

:::code-group

```toml [pumpkin.toml] {2}
allow_chat_reports = false
```

:::

## 白名单

是否启用白名单。

:::code-group

```toml [pumpkin.toml] {2}
white_list = false
```

:::

## 执行白名单

是否踢出不在白名单上的玩家。

:::code-group

```toml [pumpkin.toml] {2}
enforce_whitelist = false
```

:::
