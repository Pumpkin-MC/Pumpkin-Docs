# 服务器链接

Minecraft 客户端（自 1.21 起）可以在暂停菜单和游戏菜单中显示可点击的服务器链接。在 `pumpkin.toml` 的 `[server_links]` 下可以配置标准链接与自定义服务器链接。

## 配置

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

### 配置选项

- **`enabled`**：向连接的客户端广播服务器链接的总开关（默认：`true`）。
- **`bug_report`**：服务器或项目的缺陷追踪器链接（默认：`"https://github.com/Pumpkin-MC/Pumpkin/issues"`）。
- **`support`**：技术支持或帮助台链接。
- **`status`**：服务器运行状态/监控页面链接。
- **`feedback`**：玩家反馈或建议页面链接。
- **`community`**：社区论坛或交流群链接。
- **`website`**：官方网站链接。
- **`forums`**：讨论论坛链接。
- **`news`**：服务器博客或新闻页面链接。
- **`announcements`**：公告页面链接。

### 自定义链接

在 `[server_links.custom]` 下可以定义在客户端菜单中显示的任意键值对链接：

```toml
[server_links.custom]
"Store" = "https://store.example.com"
"Discord" = "https://discord.gg/example"
```
