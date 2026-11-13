# 任務排程

插件可以使用 `pumpkin.tasks` 稍後執行程式碼，或按計時器重複執行。輔助函數按每秒 20 tick 換算秒和分鐘。任務在 tick 上執行，因此 tick 速率變化或伺服器延遲會改變它們的實際時間。

## 延遲任務和重複任務

```zig
const tasks = pumpkin.tasks;

pub fn onLoad(_: pumpkin.Context) !void {
    _ = tasks.after(.minutes(1), announce, {});
    _ = tasks.every(.minutes(5), autosave, {});
}

fn announce(srv: pumpkin.Server) void {
    srv.broadcast("The server has been up for a minute.");
}

fn autosave(_: pumpkin.Server) void {
    std.log.info("saving", .{});
}
```

`tasks.after(delay, handler, data)` 會在距目前 `delay` 後執行一次處理函數。`tasks.every(period, handler, data)` 每隔 `period` 執行一次，首次執行從一個週期後開始。`tasks.repeat(delay, period, handler, data)` 的作用相同，但首次在 `delay` 後執行，因此 `.fromTicks(0)` 會讓它在下一個 tick 開始執行。

時長寫作 `.fromTicks(n)`、`.milliseconds(n)`、`.seconds(n)` 或 `.minutes(n)`。毫秒會向上取整為完整 tick。重複週期為零時會被限制為一個 tick。

插件卸載時仍在排程中的任務會被取消，因此插件不必自行清理它們。

## 向任務傳遞值

最後一個參數是任務攜帶的值。排程任務時會複製該值，處理函數透過其第二個參數接收它：

```zig
fn scheduleTeleport(player: pumpkin.Player) void {
    _ = tasks.after(.seconds(5), teleport, player.getId());
}

fn teleport(srv: pumpkin.Server, id: pumpkin.uuid.Uuid) void {
    const player = srv.getPlayerByUuid(id) orelse return;
    player.sendSystemMessage(pumpkin.msg.plain("Whoosh!"), false);
}
```

請儲存玩家的 UUID，而不是 `Player` 句柄。排程任務的回調返回時，該句柄就會被釋放，如[句柄與記憶體](./memory)中所述；如果玩家在此期間離開，`getPlayerByUuid` 會返回 `null`。

該值可以是任意類型，例如包含多個欄位的結構。但其中的切片不會被複製，因此任務稍後需要的字符串必須先複製到 `pumpkin.abi.heap`，再由任務在使用完畢後釋放。取消任務會釋放它儲存的值副本，但不會釋放該值指向的內容，因此如果任務可能在執行前被取消，還應在取消任務的位置釋放字符串。因插件卸載而取消的任務不需要這樣做。

無需攜帶值的任務傳入 `{}`，處理函數只接收伺服器，如上面的 `announce`。

## 修改值和停止任務

處理函數還可以接收指向該值的指標以及 `tasks.Task` 本身。對值的修改會保留到下一次執行，`task.cancel()` 則可以從任務內部停止任務：

```zig
const Countdown = struct {
    player: pumpkin.uuid.Uuid,
    left: u32,
};

fn startCountdown(player: pumpkin.Player) void {
    _ = tasks.repeat(.fromTicks(0), .seconds(1), tick, Countdown{ .player = player.getId(), .left = 10 });
}

fn tick(srv: pumpkin.Server, countdown: *Countdown, task: tasks.Task) void {
    const player = srv.getPlayerByUuid(countdown.player) orelse return task.cancel();
    if (countdown.left == 0) {
        player.showTitle(pumpkin.msg.fmt(.green, "Go!", .{}));
        return task.cancel();
    }
    player.showTitle(pumpkin.msg.fmt(.gold, "{d}", .{countdown.left}));
    countdown.left -= 1;
}
```

## 從外部取消

`after`、`every` 和 `repeat` 會返回 `Task`，可以保留它並在稍後取消：

```zig
var restart: ?tasks.Task = null;

fn scheduleRestart() void {
    restart = tasks.after(.minutes(10), doRestart, {});
}

fn abortRestart() void {
    if (restart) |task| task.cancel();
    restart = null;
}
```

`task.pending()` 表示任務是否仍在排程中。取消已經執行或已經取消的任務不會產生任何影響，因此保留的 `Task` 可以隨時取消。

## 不攜帶值的任務

`pumpkin.runLater(handler, delay_ticks)` 和 `pumpkin.runEvery(handler, delay_ticks, period_ticks)` 會直接在伺服器的排程器上排程 `fn (pumpkin.Server) void`。它們接受 tick 數，並返回伺服器原始任務 ID，供 `pumpkin.scheduler.cancelTask` 使用，而不是返回擁有複製值的 `tasks.Task`。如果需要攜帶值、跟蹤取消狀態或由輔助函數自動清理，請優先使用 `pumpkin.tasks`。

[`tasks` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tasks.zig)包含本頁的倒計時和一個只執行一次的提醒。

## 其他輔助函數使用的超時

提示接受相同的 `tasks.Duration`，例如 `.timeout = .seconds(30)`。儲存將其用於 `.autosave = .minutes(1)`。使用 `timeout = null` 可讓提示無限期保持開啟，使用 `idle = null` 可讓儲存條目一直保留在快取中；這兩個選項屬於不同的生命週期。

將工作排程到稍後執行並不會讓它並行執行。任務回調仍會像事件或指令一樣一直執行到完成。任務中的 HTTP 請求或阻塞式通訊端讀取仍會延遲其他回調。請將耗時工作拆分為多個短任務，或使用[網絡](./networking)中介紹的輪詢回調。
