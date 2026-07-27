# Phát triển Pumpkin trên thiết bị di động

Nếu bạn là người dùng thiết bị di động và muốn chỉnh sửa mã nguồn, bạn hoàn toàn có thể làm điều này!
(Trang này được viết trên Android bằng Helix.)

Trước hết, chúng ta cần một ứng dụng terminal.
Chúng tôi khuyên dùng [Termux](https://github.com/termux/termux-app/releases) vì nó ổn định và là mã nguồn mở.
Tải xuống tệp apk cần thiết cho kiến trúc thiết bị của bạn và tiến hành cài đặt Termux.

Sau đó, bạn cần chạy một số lệnh. Chúng tôi sử dụng Helix vì sự đơn giản của nó.

```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

Nếu bạn muốn đóng góp, bạn cần cài đặt phần mềm GitHub.

```bash
  pkg install gh
```

Chúng tôi cũng khuyên bạn nên cài đặt fish shell vì nó thân thiện hơn bash.

```bash
  pkg install fish
  chsh -s fish
```

Bây giờ bạn đã cài đặt các công cụ cơ bản, chúng ta cần thực hiện một số thiết lập.
Nếu bạn muốn đóng góp, bạn cần đăng nhập vào GitHub.

```bash
  gh auth login
```

Đồng thời thiết lập git: thay đổi trình biên tập thành vim, chỉnh sửa thông tin xác thực của bạn, v.v.

Sau đó, bạn cần clone repo Pumpkin. (Trước đó, bạn có thể tạo một thư mục dự án bằng `mkdir proj`; việc này rất tiện lợi)

```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

Nếu bạn muốn đóng góp, bạn cần fork repo của chúng tôi và thay đổi `Pumpkin-MC` thành tên người dùng của bạn trên GitHub.

Mọi thiết lập đã hoàn tất! Chúc bạn trải nghiệm vui vẻ :)

## FAQ

### Làm thế nào để sử dụng trình chỉnh sửa văn bản?

Nhập `hx <path>`.

### Làm thế nào để điều hướng trong dự án?

Bạn có thể sử dụng `ls`, `cd` và các chương trình khác.
Bạn cũng có thể sử dụng `hx <dir>` để duyệt thư mục của mình khi khởi động.

### Làm thế nào để gõ văn bản trong trình chỉnh sửa?

Nhấn `i` nếu bạn đang ở chế độ normal mode.

### LÀM THẾ NÀO ĐỂ THOÁT KHỎI TRÌNH CHỈNH SỬA????

Nhấn esc, sau đó nhập `:q!` nếu bạn không muốn lưu, hoặc `:wq` nếu bạn muốn lưu.

### Tôi có thể học cách sử dụng trình chỉnh sửa này ở đâu?

Chạy `hx --tutor` hoặc truy cập trang web chính thức của họ.

### Tại sao không sử dụng VS Code?

1) VS Code khó thiết lập và hoạt động với chức năng bị giới hạn trên web.
2) rust-analyzer không hoạt động trên đó. Có thể một trình giả lập sẽ giúp ích cho việc này, nhưng điều đó làm chậm quá trình biên dịch mã.
3) Với VS Code, việc có chuột là điều rất cần thiết, trong khi với Helix bạn chỉ cần bàn phím.
4) VS Code bị giật lag trên một số thiết bị.

### Tại sao gõ phím lại khó khăn như vậy?

Hãy mua một chiếc bàn phím bluetooth giá rẻ và xem mọi thứ trở nên dễ dàng hơn như thế nào.