# Liên kết máy chủ

Khách hàng Minecraft (từ 1.21) có thể hiển thị các liên kết máy chủ có thể nhấp trong menu tạm dừng và menu game. Cấu hình các liên kết máy chủ tiêu chuẩn và tùy chỉnh trong `[server_links]` trong `pumpkin.toml`.

## Cấu hình

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

### Tùy chọn cấu hình

- **`enabled`**: Công tắc chính để bật phát sóng liên kết máy chủ đến khách hàng đang kết nối (mặc định: `true`).
- **`bug_report`**: Liên kết đến trình theo dõi lỗi máy chủ hoặc dự án (mặc định: `"https://github.com/Pumpkin-MC/Pumpkin/issues"`).
- **`support`**: Liên kết đến hỗ trợ kỹ thuật hoặc bàn trợ giúp.
- **`status`**: Liên kết đến trang trạng thái/thời gian hoạt động máy chủ.
- **`feedback`**: Liên kết đến trang phản hồi người chơi hoặc đề xuất.
- **`community`**: Liên kết đến diễn đàn cộng đồng hoặc nhóm.
- **`website`**: Liên kết đến trang web chính thức.
- **`forums`**: Liên kết đến diễn đàn thảo luận.
- **`news`**: Liên kết đến blog máy chủ hoặc trang tin tức.
- **`announcements`**: Liên kết đến trang thông báo.

### Liên kết tùy chỉnh

Định nghĩa các liên kết khóa-giá trị tùy ý hiển thị trong menu khách hàng trong `[server_links.custom]`:

```toml
[server_links.custom]
"Store" = "https://store.example.com"
"Discord" = "https://discord.gg/example"
```
