# 玩家資料

`pumpkin.store` 儲存插件為每個玩家記錄的資料，例如金幣、家或統計資料。它也適用於其他有名稱的物件，例如城鎮或傳送點。每個條目都是插件資料資料夾中的一個檔案，預設使用 JSON，因此需要 `fs.read.data` 和 `fs.write.data` 權限。

## 一個儲存

資料是一個所有欄位都有預設值的結構：

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

`profiles.player(player)` 返回指向該玩家條目的指標。像修改其他結構一樣修改它即可。正常自動儲存不需要調用儲存函數：儲存會在儲存檢查時檢測內容變化。只有當調用方必須獲知磁碟寫入失敗時，才需要顯式儲存。

每個玩家都有一個以其 UUID 命名的檔案，這裡是 `plugins/data/my-zig-plugin/players/<uuid>.json`：

```json
{
  "visits": 3,
  "coins": 0
}
```

## 條目的保留方式

- 條目首次使用時會從對應檔案讀取。沒有檔案的玩家從預設值開始，在內容發生變化之前不會寫入檔案。
- 發生變化的條目每分鐘以及插件卸載時寫入。`autosave` 設定儲存間隔，例如 `.{ .dir = "players", .autosave = .seconds(30) }`。
- `idle` 控制條目在多少次未使用的自動儲存檢查後被驅逐。預設值為 `1` 時，第一次未使用檢查會將條目標記為閒置，下一次檢查可以在儲存後將其丟棄。每次調用 `get` 或 `player` 都會重置該計數器。`null` 會將條目保留到插件卸載。查詢已驅逐的條目會再次讀取檔案。
- 儲存時會先寫入臨時檔案，再重新命名覆蓋舊檔案，避免替換檔案只寫入一部分。但如果伺服器意外停止，記憶體中未儲存的更改仍可能丟失。
- 檔案缺少的欄位使用預設值，因此之後可以向結構新增新欄位。結構不再具有的欄位會在下次寫入條目時被丟棄。

## 錯誤

當條目檔案無法使用時，`player` 和 `get` 會返回錯誤，而不是條目。`error.InvalidData` 表示無法使用所選編解碼器將檔案解碼為結構，例如手動編輯出錯後。錯誤會和檔案路徑一起記錄到日誌中，檔案保持原樣，不會重置為預設值，因此修復檔案後即可恢復資料。`error.ReadFailed` 通常表示缺少 `fs` 權限。

## 檔案格式和限制

儲存的 `codec` 決定副檔名以及條目的寫入和讀取方式。預設使用 `pumpkin.store.json(Profile, .indent_2)`。其他 JSON 佈局（例如 `.indent_4` 和 `.minified`）使用相同格式，只是空白不同。`pumpkin.store.toml(Profile)` 將條目儲存在 `.toml` 檔案中。

```zig
var profiles: pumpkin.store.Store(Profile) = .{
    .dir = "players",
    .codec = pumpkin.store.toml(Profile),
    .idle = 3,
    .max_size = 4 * 1024 * 1024,
};
```

`max_size` 將每次檔案讀取限制為 16 MiB，除非另行更改。自訂 `store.Codec(Profile)` 提供 `extension`、`encode` 函數和 `decode` 函數。解碼器必須使用提供的分配器分配字符串和切片，該分配器的生命週期與條目相同。更改編解碼器不會遷移現有檔案。

## 字符串和列表

條目中儲存的字符串或切片必須與條目存活同樣長的時間。`allocator` 返回生命週期恰好如此的記憶體：

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

條目被丟棄時，該記憶體會被釋放。由於條目可能在兩次回調之間被丟棄，請在每個回調中重新查詢它，而不是保留指標。

## 其他鍵

`profiles.get(key)` 返回任意鍵對應的條目，例如城鎮名稱。鍵可以包含字母、數字、`-`、`_` 和 `.`，但不能為空或以 `.` 開頭，這可確保其路徑位於儲存資料夾內。`player(p)` 就是使用玩家 UUID 的 `get`。預設檢查也透過 `store.isValidKey` 公開。可以替換 `valid_key` 來接受不同的鍵；自訂檢查必須確保生成的路徑仍位於儲存資料夾內。

`exists(key)` 表示鍵是否有對應條目，`save(key)` 立即寫入一個條目，`flush()` 寫入所有已更改的條目，`remove(key)` 刪除條目及其檔案。

可以透過 UUID 讀取離線玩家的條目。但伺服器只能按名稱查詢線上玩家，因此需要按名稱查詢離線玩家的插件必須自行維護名稱和 UUID 列表。

[`store` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/store.zig)會統計存取次數，並儲存玩家透過 `/sethome` 設定、透過 `/home` 傳送返回的家。

## 顯式儲存和快取檔案

```zig
fn saveProfile(player: pumpkin.Player) !void {
    const key = pumpkin.uuid.toString(player.getId());
    try profiles.save(key);
}
```

`save(key)` 會向調用方報告寫入失敗，並且只寫入已載入到此儲存中的條目。`flush()` 和自動儲存會記錄失敗而不是返回錯誤；失敗的條目會保持已修改狀態，以便再次嘗試儲存。成功儲存並不構成與玩家物品欄或另一個儲存之間的事務。

條目快取期間，更改其磁碟檔案不會重新整理快取。編輯正在使用的儲存檔案前，請停止插件，否則下次儲存可能覆蓋你的更改。從 JSON 切換到 TOML 會改變所讀取的檔案，但不會遷移舊資料。

[倉庫範例](./menus#帶頁面的倉庫)會在導航前和關閉時將目前選單快照儲存到儲存資料中。正常自動儲存仍決定這些更改何時寫入磁碟。
