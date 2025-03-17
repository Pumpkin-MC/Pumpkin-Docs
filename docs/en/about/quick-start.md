# Quick Start

**Current Status:**
Pre-release: Currently under development and not yet ready for official release.

## First Steps
To get Pumpkin running, you first have to clone it:
```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```
## Rust
This is the intended way to install Pumpkin.

You may also have to [install Rust](https://www.rust-lang.org/tools/install) if you don't already have it.

**Optional:**

If you wish, you can place a Vanilla world into the `Pumpkin/ directory`. Just name the world folder `world`.

Then run:

> [!NOTE]
> This can take a while because we enabled heavy optimizations for release builds.
>
> To apply further optimizations specific to your CPU and use your CPU features, you should set the `target-cpu=native`
> Rust compiler flag.

```shell
cargo run --release
```
To set the Rust flag to `target-cpu=native`, use the following command to launch the server instead.
```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

## Docker

Experimental Docker support is available.

You may also have to [install Docker](https://docs.docker.com/engine/install/).

The Docker image is currently not published anywhere, but you can use the following command from the cloned directory named `Pumpkin` where you ran the [clone](#first-steps) command from to build and deploy it:

```shell
docker build . -T pumpkin && docker run pumpkin --rm -p <Exposed Port>:25565 -v <Server Data Location>:/pumpkin -it 
```
- Replace `<Exposed Port>` with the port you want to connect with to Pumpkin, for example `25565`
- Replace `<Server Data Location>` with the location where you want your server config to be stored, for example `./data`
For example, with the `<Server Data Location>` set to `./data` and the `<Exposed Port>` set to `25565`, the command is as follows:
```shell
docker build . -t pumpkin && docker run pumpkin --rm -p 25565:25565 -v ./data:/pumpkin -it 
```
After running this command a folder should appear in your chosen location in which you'll be able to find all the server files.
Within this folder you can put your `world/` folder (make sure you restart the server).


## Test Server
Pumpkin has a test server maintained by @kralverde. Its runs on the latest commit of Pumpkin's master branch.

- **IP:** pumpkin.kralverde.dev

**Specs:**
- OS: Debian GNU/Linux bookworm 12.7 x86_64
- Kernel: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM
