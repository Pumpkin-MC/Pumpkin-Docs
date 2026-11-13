# Bắt Đầu Nhanh

**Trạng thái hiện tại:**
Tiền phát hành: Hiện đang trong quá trình phát triển và chưa sẵn sàng cho phát hành chính thức.

::: tip Benchmark: Pumpkin vs. Paper vs. Folia (MC 26.3)
- **Thời gian khởi động lạnh:** **`9.6 ms – 12.9 ms`** trên Pumpkin so với **`4,650 ms – 4,905 ms`** trên Paper & Folia (**nhanh hơn ~380x – 480x**).
- **Dung lượng bộ nhớ:** **`60 MiB` khi rảnh** và **`1.42 GiB – 1.78 GiB` với 400 – 700 người chơi cùng lúc** trên Pumpkin so với **`10.8 GiB – 11.7 GiB`** trên Paper & Folia (cờ 10G của Aikar).
- **Dung lượng đơn vùng (20.0 TPS):** **`250 người chơi`** trên 1 lõi / 2 vCPU (so với `150` trên Paper & Folia) và **`700+ người chơi`** (`13.17 ms` MSPT ở 300; `18.89 ms` ở 400) trên 4 lõi / 8 vCPU (so với **`300 người chơi`** trên Paper & Folia).
- **Dung lượng đa vùng (8 Vùng @ 20.0 TPS):** **`600 người chơi`** (`42.79 ms` MSPT, `2.05 GiB` RAM) trên Pumpkin so với **`100 người chơi`** (`30.10 ms` MSPT, `11.26 GiB` RAM) trên Paper (**gấp 6 lần dung lượng của Paper** với một tick thế giới toàn cầu thống nhất).

Đọc đầy đủ **[Benchmark](/about/benchmarks)** có thể tái tạo.
:::

## Tải xuống tệp thực thi cho phiên bản Tiền phát hành

Bạn có thể tải xuống tệp nhị phân được biên dịch trước tại [Trang tải xuống Tiền phát hành](https://pumpkinmc.org/download)

## Biên dịch từ nguồn (Rust)

Để biên dịch được Pumpkin, bạn chắc chắn phải có [Rust](https://www.rust-lang.org/tools/install) được cài đặt từ trước.

1. **Sao chép kho lưu trữ** và di chuyển vào thư mục:

```shell
git clone --recurse-submodules https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **Tùy chọn:** Nếu bạn muốn, bạn có thể đặt một thế giới Vanilla vào trong thư mục `Pumpkin/`. Chỉ cần đặt tên thư mục đó là `world`.

3. Chạy:

> [!NOTE]
> Quá trình biên dịch có thể mất 1 lúc, do tối ưu hóa hạng nặng cho quá trình dựng phiên bản.

```shell
cargo run --release
```

4. **Tùy chọn:** Để tối ưu hóa hiệu năng bằng cách tận dụng các tính năng đặc thù của CPU, bạn có thể thiết lập cờ biên dịch Rust `target-cpu=native`: 

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE]
> Để sử dụng (chơi ở trên) một máy chủ bạn đang tự host ở trên cùng một hệ thống cục bộ (ví dụ: sử dụng Prism Launcher trên Linux để đăng nhập và chạy/chơi Minecraft và sử dụng Pumpkin để host máy chủ), bạn cần sử dụng "localhost:25565" là địa chỉ máy chủ thông qua giao diện 'Chơi nhiều người' -> 'Tạo máy chủ' -> 'Địa chỉ máy chủ' vì địa chỉ đó không được liệt kê trong đầu ra của máy chủ trong giao diện dòng lệnh.
```text
localhost:25565
```

## Docker

> [!IMPORTANT]
> Việc hỗ trợ Docker hiện tại đang là thử nghiệm.

Nếu bạn chưa có, bạn cần phải [cài đặt Docker](https://docs.docker.com/engine/install/). Sau khi cài đặt Docker, bạn có thể chạy lệnh sau để khởi động máy chủ:

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`: Là cổng mà bạn muốn kết nối đến Pumpkin, ví dụ `25565`
- `<server_data_location>`: Là chỗ mà bạn muốn lưu cấu hình máy chủ và dữ liệu của bạn, ví dụ `./data`

### Ví dụ

Để chạy Pumpkin trên cổng `25565` và lưu trữ ở thư mục `./data`, bạn sẽ chạy lệnh sau:

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Nix / NixOS

Pumpkin hiện đang khả dụng tại [nixpkgs](https://github.com/NixOS/nixpkgs) (được duy trì bởi [@DerGrumpf](https://github.com/DerGrumpf)) dưới tên gói `pumpkin-mc`, đi kèm với module NixOS `services.pumpkin-mc` để chạy nó giống như 1 dịch vụ systemd.

### Thử mà không cần cài đặt

```shell
nix run nixpkgs#pumpkin-mc
```

### Module NixOS 

Thêm cái này vào tệp `configuration.nix` của bạn:

```nix
services.pumpkin-mc = {
  enable = true;
  openFirewall = true;
};
```

Cái này chạy Pumpkin như một dịch vụ systemd được bảo vệ (`DynamicUser`, `ProtectSystem = "strict"`, không có quyền bổ sung) dưới `/var/lib/pumpkin-mc`. Module cung cấp các tuỳ chọn kiểu cho hầu hết `pumpkin.toml`. Nó hỗ trợ mạng Java/Bedrock/RCON/query/proxy, danh sách trắng, lưu trữ thế giới, ghi log, PvP và nhiều thứ khác, cộng với một tuỳ chọn `settings` tự do cho bất cứ thứ gì chưa được bao phủ.

> [!NOTE]
> Mật khẩu RCON và giá trị chuyển hướng bí mật của Velocity được đọc từ file khi dịch vụ khởi động (thông qua `rcon.passwordFile` / `proxy.velocity.secretFile`) thay vì lưu trong Nix store, nên chúng có thể hoạt động với các trình quản lý bí mật như `sops-nix` hoặc `agenix`.

Xem [mã nguồn module](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/games/pumpkin-mc.nix) để có đủ danh sách tùy chọn, hoặc chạy:
```shell
nixos-option services.pumpkin-mc
```

## Máy chủ thử nghiệm

Pumpkin có 1 máy chủ thử nghiệm được duy trì bởi @kralverde. Nó luôn chạy trên commit mới nhất của nhánh master của Pumpkin. 
- **IP:** pumpkin.kralverde.dev

**Cấu hình:**

- OS: Debian GNU/Linux bookworm 12.7 x86_64
- Kernel: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, không TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM
