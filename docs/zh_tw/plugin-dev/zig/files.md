# 檔案與設定

Zig 插件針對 `wasm32-wasi` 建構，因此可以在其中使用標準的 `std.Io` 檔案函式。不過，插件在沙盒中執行。插件只能存取其元資料中請求的內容，伺服器管理員仍可撤銷這些存取權限。

## 請求存取權限

插件需要的權限放在 `metadata.permissions` 中：

```zig
pub const metadata: pumpkin.Metadata = .{
    .name = "my-zig-plugin",
    .version = "0.1.0",
    .permissions = &.{ "fs.read.data", "fs.write.data" },
};
```

| 權限 | 允許的操作 |
| --- | --- |
| `fs.read.data` | 讀取插件資料資料夾中的檔案 |
| `fs.write.data` | 讀取和寫入插件資料資料夾中的檔案 |
| `sys.env` | 讀取伺服器的環境變數 |

[網路](./networking#權限)列出了網路存取所需的權限。

伺服器載入請求權限的插件時，會在主控台詢問管理員是否授予這些權限，並記住答案。這些權限控制插件自身可以執行的操作。它們與控制哪些玩家可以執行[指令](./commands)的權限節點相互獨立。

## 設定檔案

`pumpkin.config` 將插件設定儲存在其資料資料夾的檔案中。設定由一個結構表示，其欄位預設值就是預設設定：

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");
const cmd = pumpkin.cmd;
const msg = pumpkin.msg;

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const Config = struct {
    message: []const u8 = "Welcome to the server!",
    color: msg.Color = .gold,
    title: struct {
        enabled: bool = true,
        text: []const u8 = "Welcome",
        stay: i32 = 60,
    } = .{},
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

    pub const commands: []const cmd.Spec = &.{.{
        .names = &.{"welcome"},
        .permission = "my-zig-plugin:command.welcome",
        .default = .{ .op = .two },
        .then = &.{.literal("reload", .{ .run = reload })},
    }};

    var config: pumpkin.config.File(Config) = .{ .path = "config.toml" };

    pub fn onLoad(_: pumpkin.Context) !void {
        try config.load();
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        const c = config.value;
        ev.player.sendSystemMessage(msg.fmt(c.color, "{s}", .{c.message}), false);
        if (c.title.enabled) {
            ev.player.sendTitleAnimation(10, c.title.stay, 20);
            ev.player.showTitle(msg.plain(c.title.text));
        }
    }

    fn reload(_: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
        config.load() catch return cmd.fail("the config has an error, see the server log");
        return cmd.ok(1);
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

插件首次載入時，`load` 會使用預設值寫入 `plugins/data/my-zig-plugin/config.toml`：

```toml
message = "Welcome to the server!"
color = "gold"

[title]
enabled = true
text = "Welcome"
stay = 60
```

之後，`load` 會將檔案讀取到 `config.value`。巢狀結構會成為表，列舉按名稱寫入，切片會成為陣列。上面的 `/welcome reload` 無需重啟即可應用檔案更改。

檔案與結構不必完全一致：

- 檔案缺少的設定使用預設值，且 `load` 會將其新增到檔案中。插件新版本增加的設定就是透過這種方式進入現有設定的。可選欄位可以省略，不會被新增。
- 結構沒有的設定會記錄在日誌中。它們會保留在檔案裡，直到儲存或缺失設定重寫將型別化設定序列化；序列化會省略未知欄位。
- 語法錯誤會連同位置一起記錄；型別錯誤的設定會記錄為轉換錯誤。兩者都會返回錯誤並保留先前的 `config.value`。
- 新增缺失設定可能需要在載入新值後寫入檔案。如果該寫入失敗，即使 `config.value` 已包含新設定，`load` 也會返回錯誤。

`config.save()` 將 `config.value` 寫回檔案，`config.deinit()` 釋放已載入的值。`path` 以 `.json` 結尾的檔案會按 JSON 而非 TOML 讀寫。

`config.value` 中的字串會保持有效，直到 `load` 安裝另一個解析值或 `deinit` 釋放它們。即使隨後寫入缺失預設值失敗，也可能已經安裝了新值。對於伺服器執行期間會變化的資料（例如玩家的金幣），請改用[玩家資料](./player-data)。

## 選擇檔案行為

`File(T)` 為設定載入的各個環節提供了預設值：

| 欄位 | 行為 |
| --- | --- |
| `format` | `.toml` 或 `.json`；`null` 根據檔名選擇。 |
| `create` | `false` 在檔案缺失時返回 `error.FileNotFound`，而不是建立檔案。 |
| `add_missing` | `false` 為缺失設定使用預設值，但不將其寫入檔案。 |
| `report_unknown` | `false` 抑制有關結構沒有的設定的警告。 |
| `max_size` | 接受的最大檔案大小，預設為 16 MiB。 |

例如，`.{ .path = "settings", .format = .toml, .create = false, .add_missing = false }` 讀取現有 TOML 檔案，不建立它，也不向其中新增預設值。顯式呼叫 `save()` 時仍會寫入目前值。

`pumpkin.config.toml` 公開了供其他檔案使用的 TOML 解析器和寫入器。`parse(allocator, text, diagnostics)` 返回 `std.json.Value` 樹，`stringify(allocator, value)` 將值轉換為 TOML。`Diagnostics` 報告解析錯誤的行、列和訊息。

## 其他檔案

擁有任一 `fs` 權限後，插件會將其資料資料夾視為目前目錄，因此其中的檔案透過 `std.Io.Dir.cwd()` 開啟。檔案函式還需要一個 `std.Io`，可由 `pumpkin.io()` 返回：

```zig
const io = pumpkin.io();
const dir = std.Io.Dir.cwd();

try dir.writeFile(io, .{ .sub_path = "notes.txt", .data = "hello" });
const notes = try dir.readFileAlloc(io, "notes.txt", pumpkin.abi.heap, .limited(64 * 1024));
defer pumpkin.abi.heap.free(notes);
```

無法存取資料資料夾之外的檔案。`notes` 使用 `pumpkin.abi.heap` 分配，因此在回呼返回後仍然有效。只在回呼期間需要的資料請使用 `pumpkin.abi.arena()`。[控制代碼與記憶體](./memory)更詳細地介紹了兩者的區別。

[`config` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/config.zig)使用設定中的訊息和標題歡迎玩家，並透過 `/welcome reload` 重新載入設定。

## 包含陣列的設定

TOML 寫入器支援陣列中的結構和元組。設定可以儲存一組命名目的地，而無需改用 JSON：

```zig
const Config = struct {
    destinations: []const struct { name: []const u8, x: i32, z: i32 } = &.{
        .{ .name = "spawn", .x = 0, .z = 0 },
        .{ .name = "market", .x = 100, .z = -20 },
    },
};
```

寫入器將每個目的地序列化為 TOML 內聯表。`load()` 不會驗證最小頁數或允許的座標範圍等應用程式規則；讀取 `config.value` 後請自行檢查，就像[倉庫範例](./menus#帶頁面的倉庫)檢查容量那樣。
