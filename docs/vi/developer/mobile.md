# Phát triển Pumpkin trên điện thoại

Nếu bạn là một người dùng sử dụng điện thoại di động và muốn chỉnh sửa mã nguồn, bạn có thể thực hiện được điều này!
(Trang này được viết trên Android bằng trình soạn thảo Helix.)

Đầu tiên, chúng ta cần một ứng dụng dòng lệnh (terminal).
Chúng tôi xin đề xuất [Termux](https://github.com/termux/termux-app/releases) vì tính ổn định và là mã nguồn mở.
Tải xuống tệp apk tương thích với kiến trúc vi xử lý của thiết bị và cài đặt Termux.

Sau đó, bạn cần chạy một vài lệnh. Chúng tôi sử dụng Helix vì tính đơn giản của nó.

```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

Nếu bạn muốn đóng góp, bạn cần cài đặt phần mềm GitHub.

```bash
  pkg install gh
```

Chúng tôi cũng khuyến khích cài đặt fish shell vì nó thân thiện hơn so với bash.

```bash
  pkg install fish
  chsh -s fish
```

Sau khi hoàn tất cài đặt các công cụ cơ bản, chúng ta cần thực hiện một số thiết lập.
Nếu bạn muốn đóng góp, bạn cần phải đăng nhập tài khoản vào GitHub.

```bash
  gh auth login
```

Cũng thiết lập cả git: thay đổi trình biên tập thành vim, chỉnh sửa thông tin đăng nhập của bạn, v.v.

Sau quá trình này, bạn cần clone repo của Pumpkin. (Trước đó, bạn có thể tạo một thư mục cho dự án bằng lệnh `mkdir proj`; nó khá hữu ích)

```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

Nếu bạn muốn đóng góp, bạn cần phải fork repo của chúng tôi và thay đổi phần `Pumpkin-MC` sang tên đăng nhập của bạn trên GitHub.

Tất cả phần thiết lập đã xong! Chúc bạn vui vẻ :)

## Những câu hỏi thường gặp (FAQ)

### Sử dụng trình soạn thảo văn bản như thế nào?

Gõ lệnh `hx <đường dẫn>`.

### Làm sao để duyệt tệp tin qua dự án?

Bạn có thể sử dụng các lệnh như `ls`, `cd`, và một số chương trình khác.
Bạn cũng có thể dùng lệnh `hx <thư mục>` để xem các thư mục của mình lúc mới mở lên.

### Làm thế nào để có thể gõ chữ trong trình soạn thảo?

Nhấn phím `i` nếu bạn đang ở chế độ normal.

### LÀM SAO ĐỂ THOÁT KHỎI TRÌNH SOẠN THẢO????

Nhấn nút esc, sau đó gõ `:q!` nếu bạn không muốn lưu file, hoặc `:wq` nếu bạn muốn lưu.

### Tôi có thể học cách dùng trình soạn thảo này ở đâu?

Chạy lệnh `hx --tutor` hoặc mở trang chủ chính thức của họ.

### Tại sao lại không dùng VS Code?

1) VS Code rất khó để thiết lập, và nó chỉ hoạt động trên web với các tính năng bị giới hạn.
2) Tính năng rust-analyzer không hoạt động trên nó. Có thể dùng trình giả lập sẽ có ích trong việc này, nhưng nó làm chậm quá trình compile code.
3) Với VS Code, sử dụng con trỏ chuột đem lại lợi ích rất lớn, trong khi với Helix bạn chỉ cần có mỗi một bàn phím.
4) VS Code khá là giật lag trên một số thiết bị.

### Tại sao việc gõ chữ lại khó khăn như thế?

Hãy mua một cái bàn phím bluetooth giá rẻ và bạn sẽ thấy mọi thứ trở nên dễ dàng hơn nhiều.
