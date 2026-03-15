# Bắt đầu nhanh

**Trạng thái hiện tại:**
Pre-release: Hiện đang trong quá trình phát triển và chưa sẵn sàng phát hành chính thức.

## Tải xuống bản Pre-Release

Bạn có thể tải xuống các bản dựng sẵn tại [Trang tải xuống Pre-release](https://pumpkinmc.org/download)

## Dựng từ mã nguồn (Rust)

Để biên dịch Pumpkin, hãy đảm bảo bạn đã cài đặt [Rust](https://www.rust-lang.org/tools/install).

1. **Sao chép kho lưu trữ** và điều hướng vào thư mục:

```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **Tùy chọn:** Nếu bạn muốn, bạn có thể đặt một thế giới Vanilla vào thư mục `Pumpkin/`. Chỉ cần đặt tên thư mục thế giới là `world`.

3. Chạy:

> [!NOTE] GHI CHÚ
> Quá trình dựng có thể mất một lúc, do có nhiều tối ưu hóa cho các bản phát hành (release builds).

```shell
cargo run --release
```

4. **Tùy chọn:** Để tối đa hóa hiệu suất bằng cách sử dụng các tính năng cụ thể trên CPU của bạn, bạn có thể thiết lập cờ biên dịch Rust `target-cpu=native`:.

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE] GHI CHÚ
> Để sử dụng (chơi trên) một server mà bạn tự host trên cùng hệ thống cục bộ (ví dụ: sử dụng Prism launcher trên Linux để đăng nhập và chạy/chơi minecraft và sử dụng Pumpkin để host server), bạn có thể cần sử dụng "localhost:25565" làm địa chỉ server thông qua đường dẫn 'Multiplayer' -> 'Add Server' -> 'Server Address', mặc dù địa chỉ đó không được liệt kê trong output run-server của terminal.
```text
localhost:25565
```

## Docker

> [!IMPORTANT] QUAN TRỌNG
> Hỗ trợ Docker hiện đang được thử nghiệm.

Nếu bạn chưa cài đặt, bạn cần [cài đặt Docker](https://docs.docker.com/engine/install/). Sau khi cài đặt Docker, bạn có thể chạy lệnh sau để khởi động server:

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`: Port mà bạn muốn dùng để kết nối với Pumpkin, ví dụ `25565`.
- `<server_data_location>`: Vị trí nơi bạn muốn lưu trữ dữ liệu và cấu hình server của mình, ví dụ `./data`.

### Ví dụ

Để chạy Pumpkin trên port `25565` và lưu trữ dữ liệu trong một thư mục có tên `./data`, bạn chạy lệnh sau:

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Server thử nghiệm (Test Server)

Pumpkin có một server chạy thử nghiệm được quản lý bởi @kralverde. Nó chạy trên commit mới nhất của nhánh master của Pumpkin.

- **IP:** pumpkin.kralverde.dev

**Thông số:**

- OS: Debian GNU/Linux bookworm 12.7 x86_64
- Kernel: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM
