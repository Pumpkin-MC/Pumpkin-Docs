# 事件

游戏中发生的大多数事情都会触发服务器事件：玩家加入、聊天、破坏方块、死亡。插件可以监听其中任何事件，查看事件内容、修改事件或取消事件。

## 监听事件

事件列在 `pub const events` 中，左侧是事件名称，右侧是处理函数：

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
    };

    pub const events = .{
        .player_join_event = onJoin,
        .player_chat_event = onChat,
        .block_break_event = onBreak,
    };

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} joined", .{ev.player.getName()});
    }

    fn onChat(_: pumpkin.Server, ev: *pumpkin.EventData(.player_chat_event)) void {
        if (std.mem.indexOf(u8, ev.message, "spoiler") != null) ev.cancelled = true;
    }

    fn onBreak(_: pumpkin.Server, ev: *pumpkin.EventData(.block_break_event)) void {
        ev.should_drop = false;
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

每个处理函数都会接收服务器和指向事件的指针。`pumpkin.EventData(.player_chat_event)` 是该事件数据的类型，因此编译器知道它包含哪些字段，事件名称拼写错误时将无法编译。事件及其字段会生成到 `pumpkin.event` 中，在 `pumpkin.EventData(.` 上使用代码补全是快速浏览它们的好方法。

## 修改和取消事件

由于处理函数通过指针接收事件，它所做的任何修改都会传回服务器。大多数事件都有 `cancelled` 字段。设置该字段会阻止事件发生：上面的聊天消息将永远不会发送，被取消的方块破坏会保留原方块。其他字段的工作方式相同。上面的 `onBreak` 处理函数允许方块被破坏，但阻止其掉落任何物品；`player_join_event` 还有一个可以替换的 `join_message`。

## 优先级和阻塞

可以将处理函数与 `pumpkin.EventOptions` 配对，为其指定选项：

```zig
pub const events = .{
    .player_chat_event = .{ onChat, pumpkin.EventOptions{ .priority = .high } },
    .player_join_event = .{ onJoin, pumpkin.EventOptions{ .blocking = false } },
};
```

`priority` 可以是 `.highest`、`.high`、`.normal`、`.low` 和 `.lowest` 之一，默认为 `.normal`。

`blocking` 决定服务器是否等待处理函数完成。默认会等待，这正是处理函数能够修改或取消事件的原因。非阻塞处理函数不会阻碍服务器，但它所做的任何修改都会被丢弃，因此只适用于单纯观察事件的处理函数，例如日志记录或统计。

## 在运行时注册处理函数

`pub const events` 中的处理函数会在 `onLoad` 运行之前注册。若要稍后注册，或仅在满足某些条件时注册，请使用插件的上下文调用 `pumpkin.on`：

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.on(ctx, .player_death_event, onDeath, .{});
}

fn onDeath(_: pumpkin.Server, ev: *pumpkin.EventData(.player_death_event)) void {
    std.log.info("{s} died", .{ev.player.getName()});
}
```

最后一个参数接受相同的 `EventOptions`。

[`hello` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig)会监听事件并修改加入消息。

## 辅助函数使用的事件

除了声明自己的事件外，还要在 `onLoad` 中初始化辅助函数：

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.menu.listen(ctx);
    try pumpkin.prompt.listen(ctx, .{});
}
```

`menu.listen` 处理物品栏点击、菜单关闭和玩家离开。`prompt.listen` 处理聊天和离开，并注册可点击选项背后的命令。它们不会取代 `pub const events` 中的处理函数。请让提示的聊天处理函数保持阻塞，以便捕获的答案在广播前被取消；非阻塞处理函数无法将答案设为私密。

事件值仍受[回调生命周期](./memory)限制。请复制需要保留的文本，并将玩家的 UUID 传给[任务](./scheduling)，而不是保存事件指针或其 `Player` 句柄。
