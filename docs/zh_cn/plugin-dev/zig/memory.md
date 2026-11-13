# 句柄与内存

回调会从插件 API 接收字符串、列表、记录和句柄。句柄引用存在于服务器中的对象，例如 `Player`、`World` 或 `ItemStack`。回调返回时，所有这些内容都会自动清理，因此插件不会意外泄漏内存或句柄。

## 对象的生命周期

API 在回调期间提供的任何内容，在回调返回之前都保持有效。这包括事件数据、命令参数、API 调用的返回值、`player.getName()` 等字符串、`server.getAllPlayers()` 等切片以及句柄。

在回调内部，可以自由使用所有这些内容。但不能将其保存到全局变量并在之后的回调中使用，因为到那时内存可能已被复用，句柄也已被释放。

## 保留句柄

若要在之后的回调中使用句柄，请对其调用 `keep()`。此后句柄归你所有，直到使用 `deinit()` 释放它：

```zig
var host: ?pumpkin.Player = null;

fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
    if (host == null) {
        ev.player.keep();
        host = ev.player;
    }
}

fn onLeave(_: pumpkin.Server, ev: *pumpkin.EventData(.player_leave_event)) void {
    const current = host orelse return;
    if (std.meta.eql(current.getId(), ev.player.getId())) {
        current.deinit();
        host = null;
    }
}
```

通常，更简单的做法是存储 ID，并在需要时重新查找句柄，例如存储玩家的 UUID，再配合 `server.getPlayerByUuid` 使用。

有些函数会取得传入句柄的所有权，例如 `player.openGui(gui)`。它们的文档会注明“Consumes”，调用后不应再使用或释放该句柄。

## 保留数据

来自 API 的字符串和切片位于内存竞技场中，每次回调后都会重置。若要保留其中一个，请将其复制到生命周期超过回调的内存中。`pumpkin.abi.heap` 就是用于此目的的分配器：

```zig
var last_message: ?[]const u8 = null;

fn onChat(_: pumpkin.Server, ev: *pumpkin.EventData(.player_chat_event)) void {
    const copy = pumpkin.abi.heap.dupe(u8, ev.message) catch return;
    if (last_message) |old| pumpkin.abi.heap.free(old);
    last_message = copy;
}
```

对于只在回调期间需要的内存，请使用 `pumpkin.abi.arena()`。回调返回时，它会与其他所有内容一起重置，因此无需自行释放。

## API 调用期间发生的回调

API 调用可能在返回前运行插件的另一个回调。例如，`player.openGui` 会先关闭玩家当前打开的界面，这会在 `openGui` 仍在运行时触发 `inventory_close_event`。

发生这种情况时，内存和句柄仍能保持正确，因为内部回调只清理它自己接收的内容。但你自己的状态可能在调用期间发生变化。如果你的某个回调可能修改你自己的映射或列表，就不要在 API 调用前后一直持有指向该映射或列表内部的指针。

## 辅助函数中的所有权

保留句柄并不会保留其方法返回的字符串。`player.keep()` 保留的是资源，而 `player.getName()` 返回的仍是由回调拥有的文本。如果之后还需要该字符串，请单独复制。将句柄复制到另一个 Zig 变量也不会克隆底层服务器对象。

| 值 | 需要注意的生命周期 |
| --- | --- |
| 任务或回调数据中的 UUID 或整数 | 按值复制。 |
| 任务数据中的切片 | 只复制其指针和长度；其内容必须比任务存活更久。 |
| 菜单图标、提示标签和消息片段 | 同步消耗或构建；栈数组必须在打开调用返回前保持有效。 |
| `menu.items(player)` | 由菜单拥有；在其 `on_close` 回调期间可用。 |
| `config.value` 中的字符串和切片 | 直到安装另一个解析值或运行 `deinit`，即使加载后写入默认值失败也是如此。 |
| `store.allocator(entry)` 分配的内存 | 直到该条目被移除或驱逐。在每个回调中重新查找其条目。 |
| HTTP 响应体和套接字回调数据 | 保留前复制到自有内存中。 |

对于需要持久化的菜单或提示流程，请存储 UUID 和应用程序数据，而不是回调句柄。新菜单可能在 `menu.open` 返回前调用上一个菜单的关闭处理函数，因此只应在打开新菜单后记录它代表哪个页面。[仓库示例](./menus#带页面的仓库)采用了这一顺序。

插件堆不会在回调后自动重置。所有者使用完毕后，请释放你分配的内存；临时工作使用 `abi.arena()`，属于存储条目的字符串则使用该存储的分配器。将句柄传给文档注明会消耗它的 API 后，绝不要再反初始化该句柄。
