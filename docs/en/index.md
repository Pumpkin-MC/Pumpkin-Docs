# Quick Start

**Current Status:**
Pre-release: Currently under development and not yet ready for official release.

## Rust

To run Pumpkin with Rust, ensure you have [Rust](https://www.rust-lang.org/tools/install) installed.

1. Clone the repository:
```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **Optional:** If you wish, you can place a Vanilla world into the `Pumpkin/` directory. Just name the world folder `world`.

3. Run:

> [!NOTE]
> The build process may take a while, due to heavy optimizations for release builds.

```shell
cargo run --release
```

4. **Optional:** If you want to use your CPU features, you can set the `target-cpu=native` Rust compiler flag.
```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
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

## Test Server
Pumpkin has a test server maintained by @kralverde. Its runs on the latest commit of Pumpkin's master branch.

- **IP:** pumpkin.kralverde.dev

**Specs:**
- OS: Debian GNU/Linux bookworm 12.7 x86_64
- Kernel: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM