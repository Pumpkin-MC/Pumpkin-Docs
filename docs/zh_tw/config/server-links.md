# 伺服器連結

Minecraft 用戶端（自 1.21 起）可以在暫停選單和遊戲選單中顯示可點選的伺服器連結。在 `pumpkin.toml` 的 `[server_links]` 下可以設定標準連結與自訂伺服器連結。

## 設定

:::code-group

```toml [pumpkin.toml]
[server_links]
enabled = true
bug_report = "https://github.com/Pumpkin-MC/Pumpkin/issues"
support = ""
status = ""
feedback = ""
community = ""
website = ""
forums = ""
news = ""
announcements = ""

[server_links.custom]
# "Store" = "https://store.example.com"
# "Discord" = "https://discord.gg/example"
```

:::

### 設定選項

- **`enabled`**：向連線的用戶端廣播伺服器連結的總開關（預設：`true`）。
- **`bug_report`**：伺服器或專案的缺陷追蹤器連結（預設：`"https://github.com/Pumpkin-MC/Pumpkin/issues"`）。
- **`support`**：技術支援或幫助臺連結。
- **`status`**：伺服器執行狀態/監控頁面連結。
- **`feedback`**：玩家反饋或建議頁面連結。
- **`community`**：社群論壇或交流群連結。
- **`website`**：官方網站連結。
- **`forums`**：討論論壇連結。
- **`news`**：伺服器部落格或新聞頁面連結。
- **`announcements`**：公告頁面連結。

### 自訂連結

在 `[server_links.custom]` 下可以定義在用戶端選單中顯示的任意鍵值對連結：

```toml
[server_links.custom]
"Store" = "https://store.example.com"
"Discord" = "https://discord.gg/example"
```
