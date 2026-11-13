# Các vấn đề thường gặp

1. ## Không thể xác minh tên người dùng

    **Vấn đề:** Một số người chơi báo cáo gặp sự cố khi đăng nhập vào máy chủ, bao gồm lỗi "Failed to verify username" (Không thể xác minh tên người dùng).

    **Nguyên nhân:** Điều này liên quan đến xác thực, thường là với cài đặt `prevent_proxy_connections`.

    **Khắc phục:** Tắt `prevent_proxy_connections` trong `[networking.java.authentication]` trong `pumpkin.toml`

2. ## Không thể kết nối bằng 0.0.0.0

    **Vấn đề:** Người chơi cố gắng tham gia một máy chủ đang chạy trên chính máy của họ không thể kết nối (ví dụ: gặp lỗi "Connection refused") khi nhập `0.0.0.0` hoặc `0.0.0.0:25565`.

    **Nguyên nhân:** Trong `pumpkin.toml`, `0.0.0.0` là địa chỉ listener ký tự đại diện yêu cầu Pumpkin liên kết và lắng nghe trên tất cả các giao diện mạng cục bộ. Đây không phải là địa chỉ đích hợp lệ cho khách hàng Minecraft kết nối đến.

    **Khắc phục:**
    - Khi kết nối từ **cùng một máy**, nhập `localhost` hoặc `127.0.0.1` trong khách hàng Minecraft.
    - Khi kết nối từ **thiết bị khác trên cùng một mạng cục bộ (LAN)**, sử dụng địa chỉ IP cục bộ của máy chủ lưu trữ (ví dụ: `192.168.x.x`).
    - Khi kết nối qua **internet**, người chơi khác phải kết nối bằng địa chỉ IP công khai hoặc tên miền của bạn (với cổng `25565` được chuyển tiếp trên bộ định tuyến của bạn).
