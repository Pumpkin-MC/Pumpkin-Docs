# Quick Start

**Current Status:**
Pre-release: Currently under development and not yet ready for official release.

## Download Pre-Release binaries

You can download pre-built binaries on the [Pre-release Download Page](https://pumpkinmc.org/download)

## Build from Source (Rust)

To compile Pumpkin, ensure you have [Rust](https://www.rust-lang.org/tools/install) installed.

1. **Clone the repository** and navigate into the directory:

```shell
git clone --recurse-submodules https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **Optional:** If you wish, you can place a Vanilla world into the `Pumpkin/` directory. Just name the world folder `world`.

3. Run:

> [!NOTE]
> The build process may take a while, due to heavy optimizations for release builds.

```shell
cargo run --release
```

4. **Optional:** To maximize performance by utilizing your CPU's specific features, you can set the `target-cpu=native` Rust compiler flag:.

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE]
> To use (to play on) a server that you are self-hosting on the same local system (e.g. using Prism launcher on Linux to login and run/play minecraft and using Pumpkin to host the server) you may need to use "localhost:25565" as the server address through the 'Multiplayer' -> 'Add Server' -> 'Server Address' pathway, though that address is not listed in the terminal's run-server output.
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
