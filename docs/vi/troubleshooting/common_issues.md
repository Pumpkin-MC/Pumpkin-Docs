# Các vấn đề thường gặp

1. ## Failed to verify username

    **Vấn đề:** Một số người chơi báo cáo gặp sự cố khi đăng nhập vào máy chủ, bao gồm cả việc gặp lỗi "Failed to verify username".

    **Nguyên nhân:** Vấn đề này liên quan đến xác thực, và thường liên quan đến cài đặt `prevent_proxy_connections`.

    **Cách khắc phục:** Tắt `prevent_proxy_connections` trong `features.toml`
