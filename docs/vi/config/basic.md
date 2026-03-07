# Cấu hình cơ bản

Giải thích `configuration.toml`

## Địa chỉ máy chủ

Địa chỉ để bind server.

:::code-group

```toml [configuration.toml] {2}
server_address = "0.0.0.0:25565"
```

:::

## Seed

Seed cho world generation..

:::code-group

```toml [configuration.toml] {2}
seed = ""
```

:::

## Số lượng người chơi tối đa

Số lượng người chơi tối đa được phép trên server.

:::code-group

```toml [configuration.toml] {2}
max_players = 100000
```

:::

## View distance

View distance tối đa cho người chơi.

:::code-group

```toml [configuration.toml] {2}
view_distance = 10
```

:::

## Simulation distance

Simulation distance tối đa cho người chơi.

:::code-group

```toml [configuration.toml] {2}
simulation_distance = 10
```

:::

## Độ khó mặc định

Độ khó mặc định của game.

:::code-group

```toml [configuration.toml] {2}
default_difficulty = "Normal"
```

:::

```toml
Peaceful
Easy
Normal
Hard
```

## Cấp độ quyền op

Cấp độ quyền được gán bởi lệnh `/op`.

:::code-group

```toml [configuration.toml] {2}
op_permission_level = 4
```

:::

## Cho phép nether

Cho phép Nether dimension.

:::code-group

```toml [configuration.toml] {2}
allow_nether = true
```

:::

## Cho phép end

Cho phép End dimension.

:::code-group

```toml [configuration.toml] {2}
allow_end = true
```

:::

## Hardcore

Bật chế độ hardcore.

:::code-group

```toml [configuration.toml] {2}
hardcore = false
```

:::

## Online Mode

Bật chế độ online mode. Yêu cầu tài khoản Minecraft hợp lệ.

:::code-group

```toml [configuration.toml] {2}
online_mode = true
```

:::

## Mã hóa

Bật mã hóa packet.

> [!IMPORTANT] QUAN TRỌNG
> Bắt buộc khi bật online mode.

:::code-group

```toml [configuration.toml] {2}
encryption = true
```

:::

## MOTD

Message of the Day; mô tả server hiển thị trên màn hình trạng thái.

:::code-group

```toml [configuration.toml] {2}
motd = "A Blazing fast Pumpkin Server!"
```

:::

## TPS

Target tick rate của server.

:::code-group

```toml [configuration.toml] {2}
tps = 20.0
```

:::

## Chế độ chơi mặc định

Chế độ chơi mặc định cho người chơi.

:::code-group

```toml [configuration.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Undefined
Survival
Creative
Adventure
Spectator
```

## IP Scrubbing

Xóa IP người chơi khỏi log.

:::code-group

```toml [configuration.toml] {2}
scrub_ips = true
```

:::

## Sử dụng favicon

Sử dụng favicon cho server.

:::code-group

```toml [configuration.toml] {2}
use_favicon = true
```

:::

## Đường dẫn favicon

Đường dẫn đến favicon của server.

:::code-group

```toml [configuration.toml] {2}
favicon_path = "icon.png"
```

:::
