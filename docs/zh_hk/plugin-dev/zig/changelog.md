# 更新日誌

Zig 綁定和輔助函數的更改，按 `pumpkin-api-zig` 版本分組。這些版本獨立於 Pumpkin 伺服器的發布版本。發布版本所指明的插件 API 修訂仍必須與伺服器匹配。

## 0.2.0

WIT：[pumpkin-plugin-wit@79cc4f0](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/79cc4f05a7f47e5672169d3bef593855267ec5e2)。

### 新增輔助函數和範例

- [聊天提示](./prompts)：提出問題、解析數字答案、重試驗證，並提供可點選或可鍵入的選項。會話支援取消、替換、超時、自訂文字和匹配、捕獲過濾器以及可設定的選項指令。
- [選單](./menus)：將類似箱子的欄位標記為 `free`，放入現有的 `stacks`，並透過 `menu.items` 讀取內容，包括在 `on_close` 期間讀取。
- [倉庫](./menus#帶頁面的倉庫)：支援頁面選擇的個人儲存，顯示已佔用欄位，提供 `/vault <page>`，並可將容量設定為 1 至 45 頁。降低容量後，較高頁面上已佔用的欄位仍可存取。
- 選單範例新增 `/trash`，治療範例現在允許傳送者單獨使用 `/heal`。

### 更靈活地控制輔助函數

- [指令](./commands)：透過 `cmd.bad_argument` 替換類型化參數的錯誤提示，透過 `cmd.failWith` 返回帶樣式的失敗訊息，並透過 `register_permission` 跳過自動權限註冊。
- [物品](./items)：設定預設斜體、選擇修飾符 ID、讀寫顯式資料名稱空間，以及使用 `item.room` 檢查物品欄容量。將其用於交易前，請先閱讀文件中關於副手的限制。
- [設定](./files)：獨立於檔名選擇 TOML 或 JSON，控制檔案建立和缺失設定的重寫，抑制未知鍵警告，並限制檔案讀取大小。TOML 寫入器支援數組中的結構和元組。
- [玩家資料](./player-data)：選擇 JSON 佈局、TOML 或自訂編解碼器；設定鍵驗證、閒置驅逐和讀取大小限制。更改格式不會遷移現有檔案。
- [網絡](./networking)：為傳出連線和已接受的連線設定 TCP 接收緩衝區，並透過 `http.ca_file` 選擇 HTTPS 證書包。`/nettest` 新增了對自訂緩衝區和超長行的檢查。

### 修復

- TOML 序列化不再因數組中的結構或元組而失敗。
- 執行階段生成的彩色按鈕現在會為其名稱使用各自獨立的後備儲存。

## 0.1.1

WIT：[pumpkin-plugin-wit@75f96e9](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/75f96e9475c44295f346e87531e7508f40057622)。

修復了插件宣告三個或更多事件時發生的編譯階段分支配額失敗。[比較 0.1.0 和 0.1.1](https://github.com/Pumpkin-MC/pumpkin-api-zig/compare/v0.1.0...v0.1.1)。

## 0.1.0

WIT：[pumpkin-plugin-wit@75f96e9](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/75f96e9475c44295f346e87531e7508f40057622)。

面向 Zig 0.16.0 的初始版本，可將插件構建為 WebAssembly 元件：

- 生成的插件 API 和 `wasi:sockets` 綁定，包含規範 ABI 執行階段和回調資源管理。
- 用於插件構建的 `addPlugin` 和 `target`，支援額外的 Zig 匯入及相容 WASI 的 C 依賴。
- 事件註冊、宣告式指令樹和帶樣式的文字輔助函數。
- 鎖定的物品欄選單，以及用於構建、編輯、給予和收取物品堆棧的物品輔助函數。
- 支援複製資料和取消跟蹤的延遲任務與重複任務。
- TOML 和 JSON 設定、按玩家劃分的檔案儲存、HTTP/HTTPS 以及 TCP/UDP 網絡。
- 範例插件、用於伺服器端網絡檢查的 `/nettest`，以及自動化構建和發布工作流。

請參閱 [0.1.0](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.1.0)、[0.1.1](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.1.1) 和 [0.2.0](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.2.0) 發布頁面，瞭解其構建產物和插件 API 修訂。
