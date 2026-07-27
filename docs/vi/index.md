# Bắt đầu nhanh

**Trạng thái hiện tại:**
Pre-release: Hiện đang trong quá trình phát triển và chưa sẵn sàng cho bản phát hành chính thức.

## Tải xuống bản thực thi Pre-Release

Bạn có thể tải xuống các bản thực thi được dựng sẵn (pre-built) tại [Trang tải xuống Pre-release](https://pumpkinmc.org/download)

## Biên dịch từ Mã nguồn (Rust)

Để biên dịch Pumpkin, hãy đảm bảo bạn đã cài đặt [Rust](https://www.rust-lang.org/tools/install).

1. **Clone repository** và di chuyển vào thư mục:

```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **Tùy chọn:** Nếu muốn, bạn có thể đặt một thế giới Vanilla vào thư mục `Pumpkin/`. Chỉ cần đặt tên cho thư mục thế giới đó là `world`.

3. Chạy lệnh:

> [!NOTE]
> Quá trình biên dịch có thể mất một khoảng thời gian do các tối ưu hóa sâu cho bản release.

```shell
cargo run --release
```

4. **Tùy chọn:** Để tối đa hóa hiệu năng bằng cách tận dụng các tính năng riêng biệt của CPU, bạn có thể thiết lập cờ biên dịch Rust `target-cpu=native`:

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE]
> Để kết nối (chơi trên) máy chủ mà bạn tự host trên cùng một hệ thống cục bộ (ví dụ: sử dụng Prism launcher trên Linux để đăng nhập và chơi Minecraft, đồng thời dùng Pumpkin để host máy chủ), bạn có thể cần sử dụng "localhost:25565" làm địa chỉ máy chủ thông qua đường dẫn 'Multiplayer' -> 'Add Server' -> 'Server Address', mặc dù địa chỉ đó không được liệt kê trong đầu ra chạy máy chủ của terminal.
```text
localhost:25565
```

## Docker

> [!IMPORTANT]
> Hỗ trợ Docker hiện đang ở giai đoạn thử nghiệm.

Nếu bạn chưa cài đặt, bạn cần [cài đặt Docker](https://docs.docker.com/engine/install/). Sau khi cài đặt Docker, bạn có thể chạy lệnh sau để khởi chạy máy chủ:

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`: Cổng mà bạn muốn kết nối tới Pumpkin, ví dụ `25565`.
- `<server_data_location>`: Vị trí nơi bạn muốn lưu trữ cấu hình và dữ liệu máy chủ của mình, ví dụ `./data`.

### Ví dụ

Để chạy Pumpkin trên cổng `25565` và lưu trữ dữ liệu trong thư mục có tên `./data`, bạn chạy lệnh sau:

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Máy chủ thử nghiệm

Pumpkin có một máy chủ thử nghiệm được duy trì bởi @kralverde. Máy chủ này chạy trên commit mới nhất thuộc nhánh master của Pumpkin.

- **IP:** pumpkin.kralverde.dev

**Cấu hình:**

- Hệ điều hành: Debian GNU/Linux bookworm 12.7 x86_64
- Kernel: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM