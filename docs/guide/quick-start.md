# Quick Start

Currently Pumpkin is under heavy development and not yet ready for official release

## Building

### Cloning

To get Pumpkin running, you first have to clone it
```sh
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

### Importing a world

**This step is not required.**
You can place a vanilla world into the `Pumpkin` directory if you want by naming the folder `world`

### Compiling

> [!NOTE]
> This can take a while because we enabled heavy optimizations for release builds.
>
> To apply further optimizations specific to your CPU and use your CPU features, you should set the `target-cpu=native`
> Rust flag

```sh
cargo run --release
```

## Docker

Experimental Docker support is available.
The image is currently not published anywhere, so you have to clone the repository and then build and deploy it

```sh
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
docker compose up --build
```

After running this command a `data` folder should appear in which you'll be able to find all the server files.
Within the `data` folder you can place a vanilla world by naming the folder `world`

## Test server
Pumpkin has a test server maintained by [@kralverde](https://discord.com/users/807785856608894997). It always runs on the latest commit

The server is accessible via `pumpkin.kralverde.dev` and running on the version `1.21.4`

### Specifications
- Distribution: Debian GNU/Linux bookworm 12.7
- Architecture: x86_64 (64-bit)
- Kernel Version: 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM
