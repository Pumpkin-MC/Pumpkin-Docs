# Bắt Đầu Nhanh

**Trạng thái hiện tại:**
Tiền phát hành: Hiện đang trong quá trình phát triển và chưa sẵn sàng cho phát hành chính thức.

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

> [!CHÚ Ý]
> Quá trình biên dịch có thể mất 1 lúc, do tối ưu hóa hạng nặng cho quá trình dựng phiên bản.

```shell
cargo run --release
```

4. **Tùy chọn:** Để tối ưu hóa hiệu năng bằng cách tận dụng các tính năng đặc thù của CPU, bạn có thể thiết lập cờ biên dịch Rust `target-cpu=native`: 

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!CHÚ Ý]
> Để sử dụng (chơi ở trên) một máy chủ bạn đang tự host ở trên cùng một hệ thống cục bộ (ví dụ: sử dụng Prism Launcher trên Linux để đăng nhập và chạy/chơi Minecraft và sử dụng Pumpkin để host máy chủ), bạn cần sử dụng "localhost:25565" là địa chỉ máy chủ thông qua giao diện 'Chơi nhiều người' -> 'Tạo máy chủ' -> 'Địa chỉ máy chủ' vì địa chỉ đó không được liệt kê trong đầu ra của máy chủ trong giao diện dòng lệnh.
```text
localhost:25565
```

## Docker

> [!IMPORTANT]
> Docker support is currently experimental.

If you haven't already, you need to [install Docker](https://docs.docker.com/engine/install/). After installing Docker, you can run the following command to start the server:

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`: The port you want to connect to Pumpkin with, for example `25565`.
- `<server_data_location>`: The location where you want your server config and data to be stored, for example `./data`.

### Example

To run Pumpkin on port `25565` and store data in a directory called `./data`, you would run the following command:

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Nix / NixOS

Pumpkin is available in [nixpkgs](https://github.com/NixOS/nixpkgs) (maintained by [@DerGrumpf](https://github.com/DerGrumpf)) as the `pumpkin-mc` package, along with a `services.pumpkin-mc` NixOS module for running it as a systemd service.

### Try it without installing

```shell
nix run nixpkgs#pumpkin-mc
```

### NixOS module

Add the following to your `configuration.nix`:

```nix
services.pumpkin-mc = {
  enable = true;
  openFirewall = true;
};
```

This runs Pumpkin as a hardened systemd service (`DynamicUser`, `ProtectSystem = "strict"`, no extra capabilities) under `/var/lib/pumpkin-mc`. The module exposes typed options for most of `pumpkin.toml`. Java/Bedrock/RCON/query/proxy networking, whitelist, world storage, logging, PvP, and more, plus a `settings` freeform option for anything not yet covered.

> [!NOTE]
> RCON passwords and Velocity forwarding secrets are read from files at service start (via `rcon.passwordFile` / `proxy.velocity.secretFile`) rather than stored in the Nix store, so they work with secret managers like `sops-nix` or `agenix`.

See the [module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/games/pumpkin-mc.nix) for the full list of options, or run:

```shell
nixos-option services.pumpkin-mc
```

## Test Server

Pumpkin has a test server maintained by @kralverde. Its runs on the latest commit of Pumpkin's master branch.

- **IP:** pumpkin.kralverde.dev

**Specs:**

- OS: Debian GNU/Linux bookworm 12.7 x86_64
- Kernel: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM
