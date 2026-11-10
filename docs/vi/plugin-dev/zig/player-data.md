# Dữ liệu Người chơi

`pumpkin.store` giữ dữ liệu một plugin có cho mỗi người chơi, như coin, home hoặc thống kê. Nó cũng hoạt động cho bất cứ thứ gì khác có tên, như thị trấn hoặc warp. Mỗi entry là một file trong thư mục dữ liệu plugin, JSON theo mặc định, vì vậy nó cần các permission `fs.read.data` và `fs.write.data`.

## Một store

Dữ liệu là một struct có các trường đều có mặc định:

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

`profiles.player(player)` trả về một con trỏ đến entry của người chơi. Thay đổi nó như bất kỳ struct nào khác. Không cần gọi save cho autosaving bình thường: store phát hiện nội dung đã thay đổi tại các kiểm tra lưu của nó. Sử dụng một lưu rõ ràng khi caller phải quan sát một failure ghi đĩa.

Mỗi người chơi nhận một file được đặt theo UUID của họ, ở đây `plugins/data/my-zig-plugin/players/<uuid>.json`:

```json
{
  "visits": 3,
  "coins": 0
}
```

## Các entry được giữ như thế nào

- Một entry được đọc từ file của nó lần đầu tiên nó được sử dụng. Một người chơi không có file bắt đầu với mặc định, và không có file được ghi cho đến khi có điều gì đó thay đổi.
- Các entry đã thay đổi được ghi mỗi phút và khi plugin unload. `autosave` thiết lập khoảng thời gian, ví dụ `.{ .dir = "players", .autosave = .seconds(30) }`.
- `idle` kiểm soát các kiểm tra autosave không sử dụng trước eviction. Với mặc định `1`, kiểm tra không sử dụng đầu tiên đánh dấu một entry nhàn rỗi và cái tiếp theo có thể thả nó sau khi lưu. Mỗi gọi `get` hoặc `player` reset counter đó. `null` giữ entry cho đến khi plugin unload. Tra cứu một entry đã được eviction đọc file lại.
- Một lưu ghi một file tạm thời và sau đó đổi tên nó qua file cũ, tránh một thay thế được ghi một phần. Thay đổi chưa lưu trong bộ nhớ vẫn có thể bị mất nếu server dừng bất ngờ.
- Các trường mà file thiếu lấy mặc định, vì vậy các trường mới có thể được thêm vào struct sau. Các trường mà struct không còn bị thả lần tiếp theo entry được ghi.

## Lỗi

`player` và `get` trả về một lỗi thay vì entry khi file của nó không thể sử dụng. `error.InvalidData` có nghĩa là file không thể được giải mã thành struct với codec đã chọn, ví dụ sau một chỉnh sửa tay xấu. Lỗi được log với đường dẫn file, và file được để như nó là thay vì được reset về mặc định, vì vậy sửa file mang dữ liệu trở lại. `error.ReadFailed` thường có nghĩa là thiếu permission `fs`.

## Định dạng file và giới hạn

`codec` của store quyết định phần mở rộng file và cách entry được ghi và đọc. `pumpkin.store.json(Profile, .indent_2)` là mặc định. Layout JSON khác, như `.indent_4` và `.minified`, sử dụng cùng định dạng với khoảng trắng khác. `pumpkin.store.toml(Profile)` lưu trữ entry trong file `.toml`.

```zig
var profiles: pumpkin.store.Store(Profile) = .{
    .dir = "players",
    .codec = pumpkin.store.toml(Profile),
    .idle = 3,
    .max_size = 4 * 1024 * 1024,
};
```

`max_size` giới hạn mỗi lần đọc file là 16 MiB trừ khi được thay đổi. Một `store.Codec(Profile)` tùy chỉnh cung cấp một `extension`, một hàm `encode` và một hàm `decode`. Decoder phải cấp phát string và slice với allocator được cung cấp của nó, cái này sống lâu như entry. Thay đổi một codec không di chuyển các file hiện có.

## String và list

Một string hoặc slice được lưu trữ trong một entry phải sống lâu như entry. `allocator` trả về bộ nhớ với đúng lifetime đó:

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

Bộ nhớ đó được giải phóng khi entry bị thả. Vì một entry có thể bị thả giữa các callback, tra cứu lại nó trong mỗi callback thay vì giữ con trỏ.

## Key khác

`profiles.get(key)` trả về entry cho bất kỳ key nào, như một tên thị trấn. Key có thể chứa chữ cái, chữ số, `-`, `_` và `.`, và không thể trống hoặc bắt đầu bằng một `.`, cái này giữ chúng trong folder của store. Kiểm tra mặc định cũng public như `store.isValidKey`. Thay thế `valid_key` để chấp nhận các key khác; một kiểm tra tùy chỉnh phải giữ path kết quả trong folder của store.

`exists(key)` cho biết liệu một key có entry, `save(key)` ghi một cái ngay lập tức, `flush()` ghi mọi entry đã thay đổi, và `remove(key)` xóa một entry và file của nó.

Entry của người chơi offline có thể được đọc với UUID của họ. Tuy nhiên, server chỉ tìm người chơi online theo tên, vì vậy một plugin tra cứu người chơi offline theo tên phải giữ danh sách tên và UUID riêng.

[Ví dụ `store`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/store.zig) đếm lượt thăm và giữ home mà người chơi thiết lập với `/sethome` và dịch chuyển lại với `/home`.

## Lưu rõ ràng và file được cache

```zig
fn saveProfile(player: pumpkin.Player) !void {
    const key = pumpkin.uuid.toString(player.getId());
    try profiles.save(key);
}
```

`save(key)` báo cáo một failure ghi cho caller và chỉ ghi các entry đã được tải vào store này. `flush()` và autosave log failure thay vì trả về chúng; entry thất bại vẫn dirty cho một attempt lưu khác. Một lưu thành công không phải là một transaction với inventory người chơi hoặc một store khác.

Trong khi một entry được cache, thay đổi file của nó trên đĩa không làm mới nó. Dừng plugin trước khi chỉnh sửa một file store đang hoạt động, hoặc nó có thể ghi đè các thay đổi của bạn tại lần lưu tiếp theo. Chuyển từ JSON sang TOML thay đổi file nào được đọc; nó không di chuyển dữ liệu cũ.

[Ví dụ vault](./menus#a-vault-with-pages) snapshot menu hiện tại của nó vào store data trước khi điều hướng và khi đóng. Autosave bình thường của nó vẫn kiểm soát khi dữ liệu đã thay đổi đó đến đĩa.
