# Guide for Server Hosters

This guide covers everything Minecraft hosting providers and game panel maintainers (Pterodactyl, Pelican, PufferPanel, Crafty, and custom container platforms) need to integrate and run Pumpkin servers.

---

## 1. Setup & File Layout Differences (Java Servers vs. Pumpkin)

Hosting panels migrating templates from Vanilla, Spigot, or Paper should account for the following setup differences:

| Feature | Vanilla / Paper / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **EULA Check (`eula.txt`)** | Requires `eula=true` in `eula.txt` before starting | **Not required** (GPL-licensed implementation; boots immediately on first run) |
| **Configuration File** | `server.properties`, `spigot.yml`, `config/paper-global.yml` | Single `pumpkin.toml` in the working directory (auto-generated on first boot) |
| **Server Icon** | `server-icon.png` | `icon.png` (or custom path via `favicon_path` in `pumpkin.toml`) |
| **Log File Path** | `logs/latest.log` | `latest.log` in the root directory (configurable via `[logging] file`) |
| **Default Chunk Format** | Vanilla Anvil (`.mca`) | Native `.pump` format (`[world.chunk] type = "pump"`, or `"anvil"` / `"linear"`) |
| **Plugin Format & Directory** | `.jar` files in `plugins/` | `.wasm` WebAssembly components in `plugins/` (`.jar` via optional PatchBukkit) |
| **Plugin Marketplace** | Hangar / Modrinth / SpigotMC | [Pumpkin Marketplace](https://market.pumpkinmc.org) (Ed25519 signature verification built-in) |
| **Remote Management** | Legacy TCP RCON / MSMP | WebSocket [MSMP](../config/management) only (`[networking.management]`; legacy TCP RCON is not supported) |

### World Format & Switching Server Software
By default, Pumpkin saves chunks in its native `.pump` format (`[world.chunk] type = "pump"`). If your panel offers a **World Importer/Exporter** or allows users to switch between Paper/Vanilla and Pumpkin on the same world folder, set the chunk format to `"anvil"` in `pumpkin.toml` so standard `.mca` region files are used:

```toml
[world.chunk]
type = "anvil"
```

### Persisting Bedrock Identity Keys
When Bedrock / NetherNet is enabled, Pumpkin generates `nethernet-key.der` (configured via `[networking.bedrock.nethernet] identity_key`) for client Trust On First Use (TOFU) authentication. Ensure this file is persisted in the server's data volume across container rebuilds so returning Bedrock clients are not rejected.

---

## 2. Runtime & Binary Distribution

### No JVM Required
Pumpkin is a standalone native executable compiled from Rust (`pumpkin` on Linux/macOS, `pumpkin.exe` on Windows):
- **Minimal Base Images**: You do not need a Java Runtime Environment (JRE/JDK) inside your container unless a user explicitly installs the optional [PatchBukkit](./migrating-from-bukkit#bukkit-plugin-compatibility-patchbukkit) compatibility layer. Minimal Linux images (such as `debian:bookworm-slim` or `ghcr.io/pumpkin-mc/pumpkin:master`) work out of the box.
- **Pre-Built Binaries**: Official binaries for `x86_64` and `aarch64` (Linux, Windows, macOS) are published on [GitHub Releases](https://github.com/Pumpkin-MC/Pumpkin/releases) and the [Download Page](https://pumpkinmc.org/download).
- **Direct Startup**: Execute `./pumpkin` directly in the server's working directory. Do **not** pass JVM flags (`-Xms`, `-Xmx`, `-XX:+UseG1GC`, `-jar`, or `--nogui`), as the binary will reject unknown flags.

---

## 3. Process Lifecycle & Console Integration

| Lifecycle Hook | Expected Behavior / Value |
| :--- | :--- |
| **Working Directory** | Reads and writes `pumpkin.toml`, `world/`, `plugins/`, and `latest.log` in `cwd`. |
| **First-Boot Config** | Automatically generates a default `pumpkin.toml` if none is present. |
| **Startup Readiness Log** | `Server is now running` |
| **Graceful Shutdown** | Write `stop\n` to `stdin`, or send `SIGINT` / `SIGTERM`. |
| **Diagnostics Commands** | `tps` and `tick query` (reports TPS, MSPT, and P50/P95/P99 tick percentiles). |

### Non-Interactive Console (`stdin` / `stdout` Pipes)
For panels that attach to the server process via standard pipes rather than a full pseudo-terminal (PTY), disable interactive `rustyline` TTY line-editing while keeping console command execution enabled in `pumpkin.toml`:

```toml
[commands]
use_console = true
use_tty = false

[logging]
enabled = true
color = true # Set to false if your panel log viewer does not support ANSI escape codes
```

### Environment Variables
- **`RUST_LOG`**: Overrides `[logging] level` (e.g., `RUST_LOG=debug` or `RUST_LOG=info`) without modifying `pumpkin.toml`.
- **`RAYON_NUM_THREADS`**: Overrides the number of worker threads spawned by Pumpkin's Rayon parallel compute pool (useful in shared container environments where `/proc/cpuinfo` exposes all host cores).

### Unattended Plugin Permission Prompts
By default, `ask_permission_confirmation = true` under `[plugins]` prompts in the server console when a WebAssembly plugin requests unapproved capabilities. In headless hosting environments, ensure users can send input via the web console during startup, or allow configuring `ask_permission_confirmation` and `allowed_permissions` in `pumpkin.toml` (see [Plugins Configuration](../config/plugins)).

---

## 4. Port Allocation, Proxies, & Outbound Networking

Instead of `server.properties`, Pumpkin configures all listeners and proxy modes in `pumpkin.toml`.

> [!IMPORTANT]
> **Single-Port Shared Nodes:** Pumpkin enables **both** Java Edition (`25565`) and Bedrock Edition via NetherNet (`19132`) by default. On shared nodes where a container is only assigned a single port, multiple instances will collide on port `19132` unless your panel either allocates a secondary port for `[networking.bedrock.nethernet]` or sets `[networking.bedrock] enabled = false`.

```toml
[networking.java]
enabled = true
address = "0.0.0.0:25565"
max_players = 1000

[networking.bedrock]
enabled = true # Set to false if no Bedrock port is allocated

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
external_ip = "" # Optional: set to the node's public IP when running behind NAT

[networking.query]
enabled = false
address = "0.0.0.0:25565"

[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
```

### Status Monitoring & Remote Management (No Legacy RCON)
- **No Legacy TCP RCON**: Legacy TCP RCON is not supported in Pumpkin. Panels must send commands via `stdin` or use the WebSocket-based [Minecraft Server Management Protocol (MSMP)](../config/management) under `[networking.management]`.
- **Server List Ping & Query**: Standard TCP status pings work on the Java address, and UDP [GameSpy4 Query](../config/query) can be enabled under `[networking.query]`.

### Proxy Networks (Velocity, BungeeCord, Vine)
If your panel automates proxy setups (such as Velocity modern forwarding, BungeeCord/BungeeGuard, or Vine), all proxy settings live under `[networking.proxy]` in `pumpkin.toml` rather than separate `spigot.yml` or `paper-global.yml` files (see [Proxy Configuration](../config/proxy)).

### Outbound HTTPS Endpoints
Ensure container firewall rules permit outbound HTTPS (`443`) to:
- **Mojang / Xbox Live Authentication**: For online-mode session and texture verification.
- **Pumpkin Marketplace (`https://market.pumpkinmc.org`)**: Used on startup when verifying signed marketplace WASM plugins (`[plugins] verify_signatures = true`) and for optional anonymous heartbeats (`[telemetry] enabled = true`, see [Telemetry Configuration](../config/telemetry)).

---

## 5. Resource Limits & Sizing

- **Memory Enforcement**: Because native Rust binaries allocate and free OS memory dynamically without a fixed JVM heap (`-Xms` / `-Xmx`), enforce memory caps at the container or OS level (Docker `--memory`, `cgroup` limits, or systemd `MemoryMax`). Per-plugin WASM memory can also be capped via `max_memory_mb` under `[plugins]`.
- **CPU & Threading**: Pumpkin uses Tokio for asynchronous network I/O and Rayon for parallel chunk generation, lighting, and entity ticking. Use standard container CPU constraints (`--cpus`, `cpuset-cpus`, or `RAYON_NUM_THREADS`) to control multi-core utilization on shared hosts.
- **Baseline Footprint**: Pumpkin boots in ~10 ms, idles at ~60 MiB RAM, and serves hundreds of concurrent players within 1.5–2 GiB RAM (see the [Benchmarks](../about/benchmarks) for per-tier CPU and memory profiles).

---

## 6. Pterodactyl / Pelican Egg Reference

When creating a Pterodactyl or Pelican egg for Pumpkin, use the following configuration parser and process settings:

:::code-group

```json [Process Configuration]
{
  "startup": {
    "done": "Server is now running"
  },
  "stop": "stop",
  "configs": {
    "pumpkin.toml": {
      "parser": "file",
      "find": {
        "[networking.java]": "[networking.java]\nenabled = true\naddress = \"0.0.0.0:{{server.build.default.port}}\"",
        "use_tty = true": "use_tty = false"
      }
    }
  }
}
```

:::
