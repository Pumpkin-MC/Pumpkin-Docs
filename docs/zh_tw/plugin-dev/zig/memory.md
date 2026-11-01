# 控制代碼與記憶體

回呼會從插件 API 接收字串、列表、記錄和控制代碼。控制代碼引用存在於伺服器中的物件，例如 `Player`、`World` 或 `ItemStack`。回呼返回時，所有這些內容都會自動清理，因此插件不會意外洩漏記憶體或控制代碼。

## 物件的生命週期

API 在回呼期間提供的任何內容，在回呼返回之前都保持有效。這包括事件資料、指令引數、API 呼叫的返回值、`player.getName()` 等字串、`server.getAllPlayers()` 等切片以及控制代碼。

在回呼內部，可以自由使用所有這些內容。但不能將其儲存到全域性變數並在之後的回呼中使用，因為到那時記憶體可能已被複用，控制代碼也已被釋放。

## 保留控制代碼

若要在之後的回呼中使用控制代碼，請對其呼叫 `keep()`。此後控制代碼歸你所有，直到使用 `deinit()` 釋放它：

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

通常，更簡單的做法是儲存 ID，並在需要時重新查詢控制代碼，例如儲存玩家的 UUID，再配合 `server.getPlayerByUuid` 使用。

有些函式會取得傳入控制代碼的所有權，例如 `player.openGui(gui)`。它們的文件會註明“Consumes”，呼叫後不應再使用或釋放該控制代碼。

## 保留資料

來自 API 的字串和切片位於記憶體競技場中，每次回呼後都會重置。若要保留其中一個，請將其複製到生命週期超過回呼的記憶體中。`pumpkin.abi.heap` 就是用於此目的的分配器：

```zig
var last_message: ?[]const u8 = null;

fn onChat(_: pumpkin.Server, ev: *pumpkin.EventData(.player_chat_event)) void {
    const copy = pumpkin.abi.heap.dupe(u8, ev.message) catch return;
    if (last_message) |old| pumpkin.abi.heap.free(old);
    last_message = copy;
}
```

對於只在回呼期間需要的記憶體，請使用 `pumpkin.abi.arena()`。回呼返回時，它會與其他所有內容一起重置，因此無需自行釋放。

## API 呼叫期間發生的回呼

API 呼叫可能在返回前執行插件的另一個回呼。例如，`player.openGui` 會先關閉玩家目前開啟的介面，這會在 `openGui` 仍在執行時觸發 `inventory_close_event`。

發生這種情況時，記憶體和控制代碼仍能保持正確，因為內部回呼只清理它自己接收的內容。但你自己的狀態可能在呼叫期間發生變化。如果你的某個回呼可能修改你自己的對映或列表，就不要在 API 呼叫前後一直持有指向該對映或列表內部的指標。

## 輔助函式中的所有權

保留控制代碼並不會保留其方法返回的字串。`player.keep()` 保留的是資源，而 `player.getName()` 返回的仍是由回呼擁有的文字。如果之後還需要該字串，請單獨複製。將控制代碼複製到另一個 Zig 變數也不會克隆底層伺服器物件。

| 值 | 需要注意的生命週期 |
| --- | --- |
| 任務或回呼資料中的 UUID 或整數 | 按值複製。 |
| 任務資料中的切片 | 只複製其指標和長度；其內容必須比任務存活更久。 |
| 選單圖示、提示標籤和訊息片段 | 同步消耗或建構；棧陣列必須在開啟呼叫返回前保持有效。 |
| `menu.items(player)` | 由選單擁有；在其 `on_close` 回呼期間可用。 |
| `config.value` 中的字串和切片 | 直到安裝另一個解析值或執行 `deinit`，即使載入後寫入預設值失敗也是如此。 |
| `store.allocator(entry)` 分配的記憶體 | 直到該條目被移除或驅逐。在每個回呼中重新查詢其條目。 |
| HTTP 回應體和通訊端回呼資料 | 保留前複製到自有記憶體中。 |

對於需要持久化的選單或提示流程，請儲存 UUID 和應用程式資料，而不是回呼控制代碼。新選單可能在 `menu.open` 返回前呼叫上一個選單的關閉處理函式，因此只應在開啟新選單後記錄它代表哪個頁面。[倉庫範例](./menus#帶頁面的倉庫)採用了這一順序。

插件堆不會在回呼後自動重置。所有者使用完畢後，請釋放你分配的記憶體；臨時工作使用 `abi.arena()`，屬於儲存條目的字串則使用該儲存的分配器。將控制代碼傳給文件註明會消耗它的 API 後，絕不要再反初始化該控制代碼。
