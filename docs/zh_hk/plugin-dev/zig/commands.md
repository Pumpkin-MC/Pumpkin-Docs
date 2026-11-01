# 指令

指令透過 `pumpkin.cmd` 宣告為樹。伺服器會將這棵樹傳送給客戶端，客戶端用它自動完成指令，並在玩家輸入時檢查參數。只有輸入解析完成後，處理函數才會執行。

## 第一個指令

`pub const commands` 中列出的指令會在 `onLoad` 執行之前註冊：

```zig [src/main.zig]
const pumpkin = @import("pumpkin");
const cmd = pumpkin.cmd;
const msg = pumpkin.msg;

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
    };

    pub const commands: []const cmd.Spec = &.{.{
        .names = &.{ "hello", "hi" },
        .description = "Says hello.",
        .permission = "my-zig-plugin:command.hello",
        .run = hello,
    }};

    fn hello(sender: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
        sender.sendMessage(msg.fmt(.gold, "Hello, {s}!", .{sender.getName()}));
        return cmd.ok(1);
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

`names` 中的第一個條目是指令名稱，其餘為別名，因此 `/hello` 和 `/hi` 都能觸發此指令。

每個指令都需要一個權限節點，且該節點必須以插件名稱加冒號開頭。`cmd` 會向伺服器註冊該節點；當伺服器的權限設定未提及該節點時，`default` 決定誰擁有它。除非另行設定，否則預設值為 `.allow`。`.deny` 預設不授予任何人，`.{ .op = .two }` 則授予二級及以上的管理員。如果你自行註冊節點（例如註冊帶子節點的指令），請設定 `register_permission = false`；此時 `description` 和 `default` 不會註冊或更改該節點。

根權限適用於整棵指令樹。子節點沒有單獨的權限欄位；請在它們的處理函數中檢查任何額外的存取規則。

處理函數以 `cmd.ok(n)` 結束，其中 `n` 是指令結果；也可以以 `cmd.fail("...")` 結束，將訊息作為錯誤顯示給傳送者。

也可以在之後透過 `try cmd.register(ctx, spec)` 註冊指令，例如在 `onLoad` 中或任何具有插件上下文的位置。

## 參數

參數和固定單詞放在 `then` 中，每個節點又可以有自己的 `then`。任何帶有 `run` 的節點都是一條完整指令：

```zig
.{
    .names = &.{"heal"},
    .permission = "my-zig-plugin:command.heal",
    .default = .{ .op = .two },
    .then = &.{
        .argument("target", .players, .{
            .run = cmd.typed(heal),
            .then = &.{
                .argument("amount", .{ .float = .{ 0.5, null } }, .{ .run = cmd.typed(heal) }),
            },
        }),
        .literal("all", .{ .run = healAll }),
    },
}
```

這棵樹接受 `/heal <target>`、`/heal <target> <amount>` 和 `/heal all`。單獨的 `/heal` 會被拒絕，因為根節點沒有 `run`。

`.argument` 的第二個參數是參數類型。最常見的類型如下：

| 類型 | 接受內容 |
| --- | --- |
| `.players` | 玩家名稱，或 `@a`、`@p` 等選擇器 |
| `.{ .integer = .{ min, max } }` | 整數。任一界限都可以為 `null`；`.long` 接受 64 位整數。 |
| `.{ .float = .{ min, max } }` | 小數。`.double` 接受範圍更寬的浮點值。 |
| `.bool` | `true` 或 `false` |
| `.{ .string = .single_word }` | 單個單詞。`.quotable` 還接受帶引號的字符串，`.greedy` 則接收該行的剩餘部分。 |
| `.block_pos`、`.position3d` | 座標，包括 `~ ~1 ~` 這樣的相對座標 |
| `.gamemode` | 遊戲模式 |
| `.item`、`.block_state` | 物品或方塊 |

玩家輸入時，客戶端會檢查界限；解析指令時，伺服器也會檢查。`heal` 處理函數永遠不會收到小於 0.5 的數量。

`pumpkin.command.ArgumentType` 中的類型並非都能使用。`cmd.isSupported` 會指出哪些類型可用，在 `pub const commands` 中使用任何其他類型都會造成編譯錯誤。執行階段註冊時，`cmd.register` 會改為返回 `error.UnsupportedArgument`；權限註冊被拒絕時則返回 `error.PermissionRejected`。若要讀取該行的剩餘部分，請使用 `.{ .string = .greedy }`。

## 使用 `cmd.typed` 讀取參數

`cmd.typed` 包裝第三個參數為結構的處理函數，並從同名參數填充每個欄位：

```zig
fn heal(sender: cmd.Sender, _: pumpkin.Server, args: struct { target: pumpkin.Player, amount: ?f32 }) cmd.Result {
    if (args.amount) |amount| args.target.heal(amount) else args.target.setHealth(args.target.getMaxHealth());
    sender.sendMessage(msg.fmt(.green, "Healed {s}.", .{args.target.getName()}));
    return cmd.ok(1);
}
```

未提供對應參數時，可選欄位為 `null`；具有預設值的欄位（例如 `amount: f32 = 4`）則採用預設值。因此，在上面的指令樹中，一個處理函數可以同時處理 `/heal <target>` 和 `/heal <target> <amount>`。

欄位按類型與參數匹配。整數字段讀取整數或長整數參數，浮點欄位可以讀取整數或浮點參數。即使浮點參數的值是整數（例如 `2.0`），整數字段也會拒絕它；請改用 `.integer` 或 `.long` 節點。無法裝入欄位的值會導致指令失敗。`pumpkin.Player` 欄位要求參數恰好匹配一名玩家。由於 `.players` 也接受選擇器，在有多名玩家線上時，`/heal @a` 會失敗並提示 `'target' has to be exactly one player`。若要接受任意數量的玩家，請使用 `[]const pumpkin.Player`。其他所有類型也同樣按類型匹配：`bool`、用於文字的 `[]const u8`、`pumpkin.common.BlockPos`、`pumpkin.common.GameMode` 等等。如果沒有任何參數能生成某欄位的類型，就會造成編譯錯誤。

如果非可選欄位沒有對應參數，指令會失敗並提示 `missing argument 'name'`。在正確的指令樹中不會發生這種情況，因此看到該錯誤通常意味著欄位與參數的名稱不同。

## 手動讀取參數

處理函數也可以接受 `cmd.Args` 並自行讀取參數：

```zig
fn healAll(sender: cmd.Sender, srv: pumpkin.Server, _: cmd.Args) cmd.Result {
    const players = srv.getAllPlayers();
    for (players) |player| player.setHealth(player.getMaxHealth());
    sender.sendMessage(msg.fmt(.green, "Healed {d} players.", .{players.len}));
    return cmd.ok(@intCast(players.len));
}

fn give(_: cmd.Sender, _: pumpkin.Server, args: cmd.Args) cmd.Result {
    const targets = cmd.get(args, "targets", .players) orelse return cmd.fail("nobody to give to");
    const amount = cmd.int(args, "amount") orelse 1;
    _ = targets;
    _ = amount;
    return cmd.ok(1);
}
```

`cmd.get(args, name, kind)` 在參數按指定類型解析時返回該參數，否則返回 `null`。`cmd.int` 和 `cmd.float` 將任意數字參數分別讀取為 `i64` 或 `f64`。

## 參數錯誤

當必需欄位缺失或參數無法填充欄位時，`cmd.typed` 會調用 `cmd.bad_argument`。替換此鉤子即可翻譯錯誤訊息或更改其樣式。它接收發送者、參數名稱和一個 `cmd.Problem`：`.missing`、`.out_of_range`、`.not_whole` 或 `.not_one_player`。

```zig
pub fn onLoad(_: pumpkin.Context) !void {
    cmd.bad_argument = argumentError;
}

fn argumentError(_: cmd.Sender, name: []const u8, problem: cmd.Problem) cmd.Result {
    return cmd.failWith(msg.fmt(.red, "Invalid {s}: {s}", .{ name, @tagName(problem) }));
}
```

該鉤子返回 `cmd.Result`。`cmd.failWith` 接受帶樣式的文字符件，而 `cmd.fail` 接受純文字。只需自訂處理部分錯誤時，仍可使用 `cmd.defaultBadArgument`。

## 建議

客戶端已經可以自動完成玩家名稱等內建參數類型。對於只有插件知道的值，請為參數提供 `suggest` 函數：

```zig
.argument("kit", .{ .string = .single_word }, .{ .run = giveKit, .suggest = suggestKits }),

fn suggestKits(_: cmd.Sender, _: pumpkin.Server, request: pumpkin.command.SuggestionRequest) pumpkin.command.CommandSuggestions {
    return cmd.suggestions(request, &.{ "starter", "builder", "warrior" });
}
```

`cmd.suggestions` 會提供與玩家目前輸入內容字首匹配的值，匹配時區分大小寫。

[`heal` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig)包含一棵透過 `cmd.typed` 讀取參數的指令樹。

## 帶參數和不帶參數的指令

當指令有實用的無參數形式時，請將 `run` 放在根節點，並將其他形式的 `run` 放在參數節點上。在[治療範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig)中，`/heal` 治療傳送者，而 `/heal <target> [amount]` 選擇另一名玩家。根處理函數會檢查 `sender.asPlayer()`，因為指令也可能來自控制台。

對於自訂參數錯誤鉤子未處理的情況，請使用 `cmd.defaultBadArgument(sender, name, problem)`。該鉤子會改變類型化參數的錯誤；指令自身邏輯中的失敗仍直接返回 `cmd.fail` 或 `cmd.failWith`。
