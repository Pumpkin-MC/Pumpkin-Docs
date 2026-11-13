# Phát triển Pumpkin trên Mobile

Nếu bạn là người dùng mobile và muốn chỉnh sửa mã nguồn, bạn hoàn toàn có thể làm điều đó!
(Trang này được viết trên Android sử dụng Helix.)

Đầu tiên, chúng ta cần một ứng dụng terminal.
Chúng tôi khuyến nghị [Termux](https://github.com/termux/termux-app/releases) vì nó ổn định và mã nguồn mở.
Tải file apk cần thiết cho kiến trúc thiết bị của bạn và cài đặt Termux.

Sau đó, bạn cần chạy một số lệnh. Chúng tôi sử dụng Helix vì sự đơn giản của nó.

```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

Nếu bạn muốn đóng góp, bạn cần cài đặt phần mềm GitHub.

```bash
  pkg install gh
```

Chúng tôi cũng khuyến nghị cài đặt fish shell vì nó thân thiện hơn bash.

```bash
  pkg install fish
  chsh -s fish
```

Bây giờ bạn đã cài đặt các công cụ cơ bản, chúng ta cần thực hiện một số thiết lập.
Nếu bạn muốn đóng góp, bạn cần đăng nhập vào GitHub.

```bash
  gh auth login
```

Cũng như thiết lập git: đổi editor thành vim, chỉnh sửa thông tin đăng nhập, v.v.

Sau đó, bạn cần clone repo Pumpkin. (Trước đó, bạn có thể tạo thư mục dự án với `mkdir proj`; việc này rất hữu ích)

```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

Nếu bạn muốn đóng góp, bạn cần fork repo của chúng tôi và đổi `Pumpkin-MC` thành tên người dùng GitHub của bạn.

Thiết lập đã hoàn tất! Chúc vui vẻ :)

## FAQ

### Cách sử dụng trình soạn thảo văn bản?

Gõ `hx <đường_dẫn>`.

### Cách điều hướng qua dự án?

Bạn có thể sử dụng `ls`, `cd` và các chương trình khác.
Bạn cũng có thể sử dụng `hx <thư_mục>` để duyệt thư mục của bạn khi khởi động.

### Cách gõ trong trình soạn thảo?

Nhấn `i` nếu bạn đang ở chế độ normal.

### LÀM SAO THOÁT KHỎI TRÌNH SOẠN THẢO????

Nhấn esc, sau đó gõ `:q!` nếu bạn không muốn lưu, hoặc `:wq` nếu bạn muốn lưu.

### Tôi có thể học cách sử dụng trình soạn thảo này ở đâu?

Chạy `hx --tutor` hoặc truy cập website chính thức của họ.

### Tại sao không dùng VS Code?

1) VS Code khó thiết lập, và nó hoạt động với chức năng hạn chế trên web.
2) rust-analyzer không hoạt động trên đó. Có thể một trình giả lập có thể giúp việc này, nhưng điều đó làm chậm biên dịch mã.
3) Với VS Code, rất mong muốn có chuột, trong khi ở Helix bạn chỉ cần bàn phím.
4) VS Code bị lag trên một số thiết bị.

### Tại sao gõ phím khó thế?

Mua một bàn phím bluetooth rẻ tiền và xem nó dễ dàng hơn thế nào.
