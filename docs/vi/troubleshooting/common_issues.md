# Các vấn đề thường gặp

1. ## Failed to verify username

    **Vấn đề:** Một số người chơi báo cáo gặp sự cố khi đăng nhập vào máy chủ, bao gồm cả việc gặp lỗi "Failed to verify username".

    **Nguyên nhân:** Điều này liên quan đến quá trình xác thực, và thường do cài đặt `prevent_proxy_connections`.

    **Cách khắc phục:** Tắt `prevent_proxy_connections` trong mục `[networking.java.authentication]` tại tệp `pumpkin.toml`