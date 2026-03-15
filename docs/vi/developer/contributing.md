# Đóng góp cho Pumpkin

Chúng tôi đánh giá cao sự quan tâm của bạn trong việc đóng góp cho Pumpkin! Tài liệu này trình bày các nguyên tắc để gửi báo cáo lỗi (bug), đề xuất tính năng và thay đổi mã (code).

## Bắt đầu

Cách dễ nhất để bắt đầu là yêu cầu hỗ trợ trong [server Discord của chúng tôi](https://discord.gg/wT8XjrjKkf).

## Cách đóng góp

Có một vài cách bạn có thể đóng góp cho Pumpkin:

### Báo cáo lỗi (Reporting Bugs)

  Nếu bạn gặp lỗi, vui lòng tìm kiếm các vấn đề hiện có trên issue tracker trước tiên.

  Nếu bạn không thể tìm thấy vấn đề tương tự nào, hãy mở một vấn đề mới.

  Làm theo mẫu (template) và cung cấp mô tả chi tiết về lỗi, bao gồm các bước để tái tạo lại nếu có thể.
  Ảnh chụp màn hình, lịch sử nhật ký (logs) hoặc các đoạn mã cũng có thể hữu ích.

### Đề xuất tính năng (Suggesting Features)

  Bạn có ý tưởng về cách cải thiện Pumpkin không? Hãy chia sẻ suy nghĩ của bạn bằng cách mở một vấn đề trên issue tracker.

  Mô tả chi tiết về tính năng được đề xuất, bao gồm những lợi ích và các cân nhắc khả thi về việc triển khai.

### Đóng góp mã (Contributing Code)

  Để bắt đầu với việc đóng góp mã cho Pumpkin, hãy fork kho lưu trữ trên GitHub

1. Trước tiên, hãy tạo một tài khoản GitHub nếu bạn chưa có

2. Đi tới [Tổ chức GitHub](https://github.com/Pumpkin-MC) chính thức của Pumpkin và nhấn fork

> Tạo fork có nghĩa là bạn hiện có bộ mã nguồn Pumpkin của riêng mình (điều này không có nghĩa là bạn sở hữu bản quyền).

  Bây giờ bạn đã có một bản sao có thể chỉnh sửa, bạn sẽ cần một vài công cụ.
3. Cài đặt [git](https://git-scm.com/downloads) cho hệ điều hành của bạn

- Để bắt đầu làm quen với git, hãy truy cập [Getting started with Git](https://docs.github.com/en/get-started/getting-started-with-git)

- Tùy chọn: Nếu bạn cần một công cụ giao diện thiết kế để tương tác với GitHub, hãy cài đặt [GitHub-Desktop](https://desktop.github.com/download/)

> GitHub Desktop có thể dễ dùng hơn nếu bạn không thường sử dụng dòng lệnh, nhưng nó không dành cho tất cả mọi người

- Để bắt đầu làm quen với GitHub Desktop, hãy truy cập [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)

- Nếu bạn muốn đóng góp mã, vui lòng cài đặt Rust tại [rust-lang.org](https://www.rust-lang.org/).

- Nếu bạn muốn đóng góp bản dịch tài liệu, vui lòng cài đặt [NodeJS](https://nodejs.org/en)

### Dịch ngược (Decompiling) mã Minecraft

Khi làm việc tại Pumpkin, chúng tôi phụ thuộc phần lớn vào client Minecraft chính thức và sử dụng logic server hiện có. Chúng tôi thường đề cập tới mã nguồn Minecraft chính thức.
Cách dễ nhất để decompile Minecraft là bằng cách sử dụng Fabric Yarn. Hãy đảm bảo bạn đã cài đặt Gradle trước khi chạy các lệnh sau:

```shell
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

Sau khi dịch ngược, bạn có thể tìm thấy mã nguồn nằm ở đường dẫn `build/namedSrc`.

### Thông tin bổ sung

Chúng tôi khuyến khích bạn bình luận (comment) trên các issues và pull requests hiện có để chia sẻ suy nghĩ và cung cấp phản hồi.

Đừng ngần ngại hỏi các câu hỏi trong issue tracker hoặc liên hệ với các dự án maintainers nếu bạn cần hỗ trợ.

Trước khi gửi các đóng góp lớn, hãy cân nhắc tạo một issue hoặc discussion (thảo luận), hoặc trò chuyện với chúng tôi qua Discord để bàn thảo về giải pháp của bạn.
