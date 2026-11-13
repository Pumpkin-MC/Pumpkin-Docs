# Trò chuyện & Chống Spam

Pumpkin cung cấp định dạng trò chuyện trong game có thể tùy chỉnh và bảo vệ chống spam tích hợp trong `[chat]` trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"

[chat.anti_spam]
enabled = true
spam_threshold = 200
# chat_spam_threshold_seconds = 10
# command_spam_threshold_seconds = 10
message_cost = 20
decay_per_tick = 1
ops_bypass = true
```

:::

### Cài đặt Trò chuyện

- **`format`**: Chuỗi định dạng tin nhắn trò chuyện (mặc định: `"<{DISPLAYNAME}> {MESSAGE}"`).
  - `{DISPLAYNAME}`: Tên hiển thị của người chơi.
  - `{MESSAGE}`: Văn bản tin nhắn trò chuyện.
  > [!NOTE]
  > Định dạng trò chuyện tùy chỉnh không áp dụng khi báo cáo trò chuyện an toàn (`allow_chat_reports = true`) được bật.

### Bảo vệ Chống Spam

Pumpkin triển khai bộ đếm spam leaky-bucket để bảo vệ máy chủ khỏi người chơi spam và lũ bot:

- **`enabled`**: Có bật bảo vệ chống spam hay không (mặc định: `true`).
- **`spam_threshold`**: Ngưỡng bộ đếm spam dựa trên tick cũ mà tại đó người chơi sẽ bị đá (mặc định: `200` tick).
- **`chat_spam_threshold_seconds`**: (Tùy chọn) Ngưỡng spam trò chuyện tính bằng giây (cũng chấp nhận `chat-spam-threshold-seconds`). Ghi đè `spam_threshold` cũ cho tin nhắn trò chuyện khi được đặt (`seconds * 20` tick).
- **`command_spam_threshold_seconds`**: (Tùy chọn) Ngưỡng spam lệnh tính bằng giây (cũng chấp nhận `command-spam-threshold-seconds`). Ghi đè `spam_threshold` cũ cho lệnh khi được đặt (`seconds * 20` tick).
- **`message_cost`**: Số lượng được thêm vào bộ đếm spam của người chơi cho mỗi tin nhắn trò chuyện hoặc lệnh được gửi (mặc định: `20` tick).
- **`decay_per_tick`**: Số lượng giảm từ bộ đếm spam của người chơi trên mỗi tick máy chủ (mặc định: `1` tick).
- **`ops_bypass`**: Người điều hành máy chủ có bỏ qua kiểm tra chống spam hay không (mặc định: `true`).
