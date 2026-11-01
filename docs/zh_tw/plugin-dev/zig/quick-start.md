# 快速入門

可以使用 [Zig](https://ziglang.org/) 和 [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) 綁定編寫 Pumpkin 插件。插件會編譯為 WebAssembly 元件，由伺服器從其 `plugins` 資料夾載入。

綁定從插件 API 生成，因此 API 提供的所有功能都可以在 Zig 中使用。此外，綁定還為幾乎每個插件都會執行的操作提供了輔助函式：監聽[事件](./events)、宣告[指令](./commands)、建構[文字](./text)、顯示[選單](./menus)、在聊天中[提問](./prompts)、發放[物品](./items)、[排程](./scheduling)工作、讀取[設定檔案](./files)、儲存[玩家資料](./player-data)以及進行[網路](./networking)通訊。

這些指南涵蓋 `pumpkin-api-zig` 0.2.0。[更新日誌](./changelog)列出了自 0.1.0 以來的更改。插件自己的 `metadata.version` 獨立於綁定版本。

## 前置要求

你需要在 `PATH` 中安裝 [Zig](https://ziglang.org/download/) 0.16.0 和 [`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)。建構過程使用 `wasm-tools` 將插件 API 附加到你的程式碼，並將其打包為元件。

## 設定專案

為插件建立一個目錄：

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

將綁定新增為依賴：

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig#v0.2.0
```

[釋出頁面](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases)列出了每個已釋出版本。若要更新，請使用新版本再次執行該指令。

然後建立 `build.zig`：

```zig [build.zig]
const std = @import("std");
const pumpkin_api = @import("pumpkin_api_zig");

pub fn build(b: *std.Build) void {
    _ = pumpkin_api.addPlugin(b, b.dependency("pumpkin_api_zig", .{}), .{
        .name = "my-zig-plugin",
        .root_source_file = b.path("src/main.zig"),
    });
}
```

`addPlugin` 會針對 `wasm32-wasi` 編譯 `src/main.zig`，將 API 作為 `pumpkin` 模組提供給它，並將結果轉換為元件。

如果你在開發綁定本身，也可以改為依賴本地檢出的副本。路徑相對於你的專案：

```zig [build.zig.zon]
.dependencies = .{
    .pumpkin_api_zig = .{ .path = "../pumpkin-api-zig" },
},
```

## 編寫插件

將以下內容放入 `src/main.zig`：

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .authors = &.{"You"},
        .description = "An example plugin in Zig.",
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    pub fn onLoad(_: pumpkin.Context) !void {
        std.log.info("Hello from Zig!", .{});
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} joined", .{ev.player.getName()});
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

插件是傳給 `pumpkin.register` 的結構，後者會生成伺服器呼叫插件所需的一切。結構的宣告描述插件。只有 `metadata` 是必需的：它儲存伺服器顯示的名稱、版本、作者和描述，還可以列出對其他插件的 `dependencies` 以及插件需要的 `permissions`，後者在[檔案與設定](./files)中介紹。`events` 列出要監聽的事件。`onLoad` 在插件的事件和指令註冊後執行，`onUnload` 在插件解除安裝前執行。

將 `std_options.logFn` 設定為 `pumpkin.logFn` 會把 `std.log` 輸出傳送到伺服器主控台；如果使用 `std.log.scoped`，輸出前還會帶上作用域。

API 提供的一切（包括事件的 `player`）都只存活到回呼返回。[控制代碼與記憶體](./memory)介紹瞭如何延長其保留時間。

## 建構和執行

```bash
zig build
cp zig-out/my-zig-plugin.wasm /path/to/pumpkin/plugins/
```

啟動或重啟伺服器，日誌中應顯示插件的訊息：

```text
[INFO] Hello from Zig!
```

> [!WARNING]
> 每個釋出版本都會指明其建構所針對的插件 API 修訂。伺服器和插件需要相容的修訂；否則伺服器會拒絕插件並提示 `Plugin was built against a different iteration of the API`。更新任一方之前，請檢查[你的釋出版本對應的 WIT 提交](./changelog)。

## 範例

綁定倉庫為 API 的每個部分都提供了一個小型插件。使用 `zig build` 建構倉庫會將它們全部建構到 `zig-out/` 中。

| 範例 | 展示內容 |
| --- | --- |
| [`hello`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig) | 事件、指令和帶樣式的文字 |
| [`heal`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig) | 使用 `cmd.typed` 讀取指令引數 |
| [`menu`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/menu.zig) | 帶按鈕和自由欄位的物品欄選單 |
| [`prompt`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/prompt.zig) | 在聊天中回答的問題和可點選的選項 |
| [`vault`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/vault.zig) | 支援頁面選擇、使用情況指示和可設定容量的個人儲存 |
| [`items`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/items.zig) | 建構、編輯和識別物品，以及給予和收取物品 |
| [`tasks`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tasks.zig) | 攜帶一個值的延遲任務和重複任務 |
| [`config`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/config.zig) | 可重新載入的 TOML 設定檔案 |
| [`store`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/store.zig) | 在獨立檔案中儲存每個玩家的資料 |
| [`https`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/https.zig) | 使用 `pumpkin.http` 發起 Web 請求 |
| [`tcp-server`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tcp-server.zig) | 橋接聊天的 TCP 伺服器 |
| [`udp`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/udp.zig) | 接收和回覆 UDP 封包 |
| [`dns`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/dns.zig) | 查詢主機名的位址 |
| [`http`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/http.zig) | 建立帶超時的 TCP 連線併發送純 HTTP 請求 |
| [`nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) | 透過 `/nettest` 執行所有網路路徑並報告各項結果 |

## 從 0.1.1 更新

更改依賴後，使用 `zig build` 重新建構插件，並將新的 `.wasm` 複製到伺服器。替換可正常工作的安裝前，請確認其插件 API 修訂與伺服器匹配。

新輔助函式和選項在各自頁面中介紹：

| 方面 | 0.2.0 中的用法 |
| --- | --- |
| [聊天提示](./prompts) | 問題、可點選選項、驗證、超時和自訂匹配。 |
| [選單](./menus) | `free` 欄位、現有 `stacks`、`menu.items` 和可設定的倉庫範例。 |
| [指令](./commands) | `cmd.bad_argument` 和 `register_permission`。 |
| [物品](./items) | 斜體樣式、顯式修飾符 ID、共享資料名稱空間和容量檢查。 |
| [設定](./files) | 格式選擇、檔案大小限制，以及檔案建立和重寫控制。 |
| [玩家資料](./player-data) | 編解碼器、鍵檢查、閒置驅逐和有界讀取。 |
| [網路](./networking) | 接收緩衝區大小和 HTTPS 證書包路徑。 |
