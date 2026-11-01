# 玩家数据

`pumpkin.store` 保存插件为每个玩家记录的数据，例如金币、家或统计数据。它也适用于其他有名称的对象，例如城镇或传送点。每个条目都是插件数据文件夹中的一个文件，默认使用 JSON，因此需要 `fs.read.data` 和 `fs.write.data` 权限。

## 一个存储

数据是一个所有字段都有默认值的结构体：

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");
const msg = pumpkin.msg;

const Profile = struct {
    visits: u32 = 0,
    coins: u64 = 0,
};

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .permissions = &.{ "fs.read.data", "fs.write.data" },
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    var profiles: pumpkin.store.Store(Profile) = .{ .dir = "players" };

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        const profile = profiles.player(ev.player) catch return;
        profile.visits += 1;
        ev.player.sendSystemMessage(msg.fmt(.gold, "Welcome! This is visit number {d}.", .{profile.visits}), false);
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

`profiles.player(player)` 返回指向该玩家条目的指针。像修改其他结构体一样修改它即可。正常自动保存不需要调用保存函数：存储会在保存检查时检测内容变化。只有当调用方必须获知磁盘写入失败时，才需要显式保存。

每个玩家都有一个以其 UUID 命名的文件，这里是 `plugins/data/my-zig-plugin/players/<uuid>.json`：

```json
{
  "visits": 3,
  "coins": 0
}
```

## 条目的保留方式

- 条目首次使用时会从对应文件读取。没有文件的玩家从默认值开始，在内容发生变化之前不会写入文件。
- 发生变化的条目每分钟以及插件卸载时写入。`autosave` 设置保存间隔，例如 `.{ .dir = "players", .autosave = .seconds(30) }`。
- `idle` 控制条目在多少次未使用的自动保存检查后被驱逐。默认值为 `1` 时，第一次未使用检查会将条目标记为闲置，下一次检查可以在保存后将其丢弃。每次调用 `get` 或 `player` 都会重置该计数器。`null` 会将条目保留到插件卸载。查找已驱逐的条目会再次读取文件。
- 保存时会先写入临时文件，再重命名覆盖旧文件，避免替换文件只写入一部分。但如果服务器意外停止，内存中未保存的更改仍可能丢失。
- 文件缺少的字段使用默认值，因此之后可以向结构体添加新字段。结构体不再具有的字段会在下次写入条目时被丢弃。

## 错误

当条目文件无法使用时，`player` 和 `get` 会返回错误，而不是条目。`error.InvalidData` 表示无法使用所选编解码器将文件解码为结构体，例如手动编辑出错后。错误会和文件路径一起记录到日志中，文件保持原样，不会重置为默认值，因此修复文件后即可恢复数据。`error.ReadFailed` 通常表示缺少 `fs` 权限。

## 文件格式和限制

存储的 `codec` 决定文件扩展名以及条目的写入和读取方式。默认使用 `pumpkin.store.json(Profile, .indent_2)`。其他 JSON 布局（例如 `.indent_4` 和 `.minified`）使用相同格式，只是空白不同。`pumpkin.store.toml(Profile)` 将条目存储在 `.toml` 文件中。

```zig
var profiles: pumpkin.store.Store(Profile) = .{
    .dir = "players",
    .codec = pumpkin.store.toml(Profile),
    .idle = 3,
    .max_size = 4 * 1024 * 1024,
};
```

`max_size` 将每次文件读取限制为 16 MiB，除非另行更改。自定义 `store.Codec(Profile)` 提供 `extension`、`encode` 函数和 `decode` 函数。解码器必须使用提供的分配器分配字符串和切片，该分配器的生命周期与条目相同。更改编解码器不会迁移现有文件。

## 字符串和列表

条目中存储的字符串或切片必须与条目存活同样长的时间。`allocator` 返回生命周期恰好如此的内存：

```zig
const Home = struct { name: []const u8, x: f64, y: f64, z: f64 };
const Profile = struct { homes: []const Home = &.{} };

fn addHome(player: pumpkin.Player, name: []const u8) !void {
    const profile = try profiles.player(player);
    const memory = profiles.allocator(profile);
    const x, const y, const z = player.getPosition();
    const home: Home = .{ .name = try memory.dupe(u8, name), .x = x, .y = y, .z = z };
    profile.homes = try std.mem.concat(memory, Home, &.{ profile.homes, &.{home} });
}
```

条目被丢弃时，该内存会被释放。由于条目可能在两次回调之间被丢弃，请在每个回调中重新查找它，而不是保留指针。

## 其他键

`profiles.get(key)` 返回任意键对应的条目，例如城镇名称。键可以包含字母、数字、`-`、`_` 和 `.`，但不能为空或以 `.` 开头，这可确保其路径位于存储文件夹内。`player(p)` 就是使用玩家 UUID 的 `get`。默认检查也通过 `store.isValidKey` 公开。可以替换 `valid_key` 来接受不同的键；自定义检查必须确保生成的路径仍位于存储文件夹内。

`exists(key)` 表示键是否有对应条目，`save(key)` 立即写入一个条目，`flush()` 写入所有已更改的条目，`remove(key)` 删除条目及其文件。

可以通过 UUID 读取离线玩家的条目。但服务器只能按名称查找在线玩家，因此需要按名称查找离线玩家的插件必须自行维护名称和 UUID 列表。

[`store` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/store.zig)会统计访问次数，并保存玩家通过 `/sethome` 设置、通过 `/home` 传送返回的家。

## 显式保存和缓存文件

```zig
fn saveProfile(player: pumpkin.Player) !void {
    const key = pumpkin.uuid.toString(player.getId());
    try profiles.save(key);
}
```

`save(key)` 会向调用方报告写入失败，并且只写入已加载到此存储中的条目。`flush()` 和自动保存会记录失败而不是返回错误；失败的条目会保持已修改状态，以便再次尝试保存。成功保存并不构成与玩家物品栏或另一个存储之间的事务。

条目缓存期间，更改其磁盘文件不会刷新缓存。编辑正在使用的存储文件前，请停止插件，否则下次保存可能覆盖你的更改。从 JSON 切换到 TOML 会改变所读取的文件，但不会迁移旧数据。

[仓库示例](./menus#带页面的仓库)会在导航前和关闭时将当前菜单快照保存到存储数据中。正常自动保存仍决定这些更改何时写入磁盘。
