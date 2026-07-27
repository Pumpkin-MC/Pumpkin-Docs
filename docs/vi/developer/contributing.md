# Đóng góp cho Pumpkin

Cảm ơn bạn đã quan tâm đến việc đóng góp cho Pumpkin! Tài liệu này phác thảo các hướng dẫn về việc gửi báo cáo lỗi, đề xuất tính năng và thay đổi mã nguồn.

## Bắt đầu

Cách dễ nhất để bắt đầu là yêu cầu trợ giúp trong [máy chủ Discord của chúng tôi](https://discord.gg/wT8XjrjKkf).

## Cách thức đóng góp

Có nhiều cách để bạn có thể đóng góp cho Pumpkin:

### Báo cáo lỗi

  Nếu bạn gặp phải lỗi, vui lòng tìm kiếm các issue đã có trên công cụ theo dõi lỗi (issue tracker) trước.

  Nếu bạn không tìm thấy issue trùng lặp, hãy mở một issue mới.

  Thực hiện theo mẫu (template) và cung cấp mô tả rõ ràng về lỗi, bao gồm các bước để tái hiện lỗi nếu có thể.
  Ảnh màn hình, log hoặc các đoạn mã (code snippets) cũng có thể rất hữu ích.

### Đề xuất tính năng

  Bạn có ý tưởng về cách cải thiện Pumpkin? Hãy chia sẻ ý kiến của bạn bằng cách mở một issue trên công cụ theo dõi lỗi.

  Mô tả chi tiết tính năng được đề xuất, bao gồm lợi ích và các lưu ý tiềm năng khi triển khai.

### Đóng góp mã nguồn

  Để bắt đầu đóng góp mã nguồn cho Pumpkin, hãy fork kho lưu trữ (repository) trên GitHub

1. Đầu tiên, hãy tạo một tài khoản GitHub nếu bạn chưa có

2. Truy cập [GitHub Organization](https://github.com/Pumpkin-MC) chính thức của Pumpkin và nhấn fork

> Tạo fork có nghĩa là bạn hiện có bản sao mã nguồn Pumpkin của riêng mình (điều này không có nghĩa là bạn sở hữu bản quyền).

  Bây giờ bạn đã có một bản sao có thể chỉnh sửa, bạn sẽ cần một vài công cụ.
3. Cài đặt [git](https://git-scm.com/downloads) cho hệ điều hành của bạn

- Để bắt đầu với git, hãy truy cập [Bắt đầu với Git](https://docs.github.com/en/get-started/getting-started-with-git)

- Tùy chọn: Nếu bạn muốn một công cụ giao diện đồ họa để tương tác với GitHub, hãy cài đặt [GitHub-Desktop](https://desktop.github.com/download/)

> GitHub Desktop có thể dễ dàng hơn nếu bạn chưa quen với dòng lệnh, nhưng nó không phải dành cho tất cả mọi người

- Để bắt đầu với GitHub Desktop, hãy truy cập [Bắt đầu với GitHub Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)

- Nếu bạn muốn đóng góp mã nguồn, hãy cài đặt Rust tại [rust-lang.org](https://www.rust-lang.org/).

- Nếu bạn muốn đóng góp cho tài liệu, hãy cài đặt [NodeJS](https://nodejs.org/en)

### Dịch ngược mã nguồn của Minecraft

Khi làm việc với Pumpkin, chúng tôi phụ thuộc nhiều vào client Minecraft chính thức và sử dụng lại logic server hiện có. Chúng tôi thường xuyên tham khảo mã nguồn chính thức của Minecraft.
Cách dễ nhất để dịch ngược Minecraft là sử dụng Fabric Yarn:

```shell
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

Sau khi dịch ngược, bạn có thể tìm thấy mã nguồn nằm trong `build/namedSrc`.

### Thông tin bổ sung

Chúng tôi khuyến khích bạn bình luận về các issue và pull request hiện có để chia sẻ suy nghĩ và cung cấp phản hồi.

Đừng ngần ngại đặt câu hỏi trong công cụ theo dõi lỗi hoặc liên hệ với những người bảo trì dự án (maintainers) nếu bạn cần hỗ trợ.

Trước khi gửi một đóng góp lớn, hãy cân nhắc mở một issue hoặc thảo luận (discussion), hoặc trò chuyện với chúng tôi trên Discord để trao đổi về hướng tiếp cận của bạn.