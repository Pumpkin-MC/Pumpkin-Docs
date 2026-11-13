# 事件

遊戲中發生的大多數事情都會觸發伺服器事件：玩家加入、聊天、破壞方塊、死亡。插件可以監聽其中任何事件，檢視事件內容、修改事件或取消事件。

## 監聽事件

事件列在 `pub const events` 中，左側是事件名稱，右側是處理函數：

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

每個處理函數都會接收伺服器和指向事件的指標。`pumpkin.EventData(.player_chat_event)` 是該事件資料的類型，因此編譯器知道它包含哪些欄位，事件名稱拼寫錯誤時將無法編譯。事件及其欄位會生成到 `pumpkin.event` 中，在 `pumpkin.EventData(.` 上使用程式碼自動完成是快速瀏覽它們的好方法。

## 修改和取消事件

由於處理函數透過指標接收事件，它所做的任何修改都會返回伺服器。大多數事件都有 `cancelled` 欄位。設定該欄位會阻止事件發生：上面的聊天訊息將永遠不會發送，被取消的方塊破壞會保留原方塊。其他欄位的工作方式相同。上面的 `onBreak` 處理函數允許方塊被破壞，但阻止其掉落任何物品；`player_join_event` 還有一個可以替換的 `join_message`。

## 優先順序和阻塞

可以將處理函數與 `pumpkin.EventOptions` 配對，為其指定選項：

```zig
pub const events = .{
    .player_chat_event = .{ onChat, pumpkin.EventOptions{ .priority = .high } },
    .player_join_event = .{ onJoin, pumpkin.EventOptions{ .blocking = false } },
};
```

`priority` 可以是 `.highest`、`.high`、`.normal`、`.low` 和 `.lowest` 之一，預設為 `.normal`。

`blocking` 決定伺服器是否等待處理函數完成。預設會等待，這正是處理函數能夠修改或取消事件的原因。非阻塞處理函數不會阻礙伺服器，但它所做的任何修改都會被丟棄，因此只適用於單純觀察事件的處理函數，例如日誌記錄或統計。

## 在執行階段註冊處理函數

`pub const events` 中的處理函數會在 `onLoad` 執行之前註冊。若要稍後註冊，或僅在滿足某些條件時註冊，請使用插件的上下文調用 `pumpkin.on`：

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.on(ctx, .player_death_event, onDeath, .{});
}

fn onDeath(_: pumpkin.Server, ev: *pumpkin.EventData(.player_death_event)) void {
    std.log.info("{s} died", .{ev.player.getName()});
}
```

最後一個參數接受相同的 `EventOptions`。

[`hello` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig)會監聽事件並修改加入訊息。

## 輔助函數使用的事件

除了宣告自己的事件外，還要在 `onLoad` 中初始化輔助函數：

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.menu.listen(ctx);
    try pumpkin.prompt.listen(ctx, .{});
}
```

`menu.listen` 處理物品欄點選、選單關閉和玩家離開。`prompt.listen` 處理聊天和離開，並註冊可點選選項背後的指令。它們不會取代 `pub const events` 中的處理函數。請讓提示的聊天處理函數保持阻塞，以便捕獲的答案在廣播前被取消；非阻塞處理函數無法將答案設為私密。

事件值仍受[回調生命週期](./memory)限制。請複製需要保留的文字，並將玩家的 UUID 傳給[任務](./scheduling)，而不是儲存事件指標或其 `Player` 句柄。
