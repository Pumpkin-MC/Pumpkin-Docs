# 基础配置

对应 `configuration.toml` 文件

## 服务器地址

服务器绑定的地址。

:::code-group

```toml [configuration.toml] {2}
server_address = "0.0.0.0:25565"
```

:::

## 种子

世界生成的种子值。

:::code-group

```toml [configuration.toml] {2}
seed = ""
```

:::

## 最大玩家数

服务器允许的最大玩家数量。

:::code-group

```toml [configuration.toml] {2}
max_players = 100000
```

:::

## 视距

玩家的最大视距。

:::code-group

```toml [configuration.toml] {2}
view_distance = 10
```

:::

## 模拟距离

玩家的最大模拟距离。

:::code-group

```toml [configuration.toml] {2}
simulation_distance = 10
```

:::

## 默认难度

默认游戏难度。

:::code-group

```toml [configuration.toml] {2}
default_difficulty = "Normal"
```

:::

```toml
Peaceful # 和平
Easy # 简单
Normal # 普通
Hard # 困难
```

## 操作权限等级

`/op` 命令分配的权限等级。

:::code-group

```toml [configuration.toml] {2}
op_permission_level = 4
```

:::

## 允许下界

是否启用下界维度。

:::code-group

```toml [configuration.toml] {2}
allow_nether = true
```

:::

## 允许末地

是否启用末地维度。

:::code-group

```toml [configuration.toml] {2}
allow_end = true
```

:::

## 极限模式

服务器是否处于极限模式。

:::code-group

```toml [configuration.toml] {2}
hardcore = false
```

:::

## 在线模式

是否启用在线模式。需要有效的 Minecraft 账号。

:::code-group

```toml [configuration.toml] {2}
online_mode = true
```

:::

## 加密

是否启用数据包加密。

> [!IMPORTANT]重要
> 启用在线模式时需要此选项。

:::code-group

```toml [configuration.toml] {2}
encryption = true
```

:::

## MOTD

每日信息；在状态屏幕上显示的服务器描述。

:::code-group

```toml [configuration.toml] {2}
motd = "一款极速的南瓜服务器！"
```

:::

## TPS

服务器的目标刻率。

:::code-group

```toml [configuration.toml] {2}
tps = 20.0
```

:::

## 默认游戏模式

玩家的默认游戏模式。

:::code-group

```toml [configuration.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Undefined # 未定义
Survival # 生存模式
Creative # 创造模式
Adventure # 冒险模式
Spectator # 观察者模式
```

## IP 记录

是否从日志中移除玩家的 IP 地址。

:::code-group

```toml [configuration.toml] {2}
scrub_ips = true
```

:::

## 使用图标

是否使用服务器图标。

:::code-group

```toml [configuration.toml] {2}
use_favicon = true
```

:::

## 图标路径

服务器图标的路径。

:::code-group

```toml [configuration.toml] {2}
favicon_path = "icon.png"
```

:::
