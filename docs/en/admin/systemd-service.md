# Running Pumpkin as a systemd Service

On a Linux server you usually want Pumpkin to start at boot, restart if it crashes and keep running after you log out. On distributions that use systemd (Debian, Ubuntu, Fedora, Arch, openSUSE and most others) a *unit file* does all of that. This page walks through a minimal, hardened unit for a Pumpkin server.

::: tip NixOS
NixOS users do not need to write a unit by hand: the `services.pumpkin-mc` module described on the [Getting Started](../#nixos-module) page already runs Pumpkin as a systemd service.
:::

## 1. Create a user and a directory

Pumpkin reads and writes `pumpkin.toml`, `world/`, `plugins/` and `latest.log` in its working directory, so give it a directory of its own and a system user that owns it:

```bash
sudo useradd --system --home-dir /opt/pumpkin --shell /usr/sbin/nologin pumpkin
sudo mkdir -p /opt/pumpkin
sudo chown pumpkin:pumpkin /opt/pumpkin
```

## 2. Install the binary

Download the Linux binary for your architecture from the [Download Page](https://pumpkinmc.org/download) (or build it yourself as described under [Build from Source](../#build-from-source-rust)), then place it in the directory and make it executable:

```bash
sudo mv pumpkin /opt/pumpkin/pumpkin
sudo chown pumpkin:pumpkin /opt/pumpkin/pumpkin
sudo chmod 755 /opt/pumpkin/pumpkin
```

## 3. Disable the interactive console

systemd runs the server without a terminal. Keep console commands available but turn off the TTY line editing in `pumpkin.toml` (the file is generated on the first start; you can also create it beforehand):

```toml
[commands]
use_console = true
use_tty = false

[logging]
enabled = true
color = false # journald stores the raw text; ANSI codes would only add noise
```

## 4. Write the unit file

Create `/etc/systemd/system/pumpkin.service`:

```ini
[Unit]
Description=Pumpkin Minecraft server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=pumpkin
Group=pumpkin
WorkingDirectory=/opt/pumpkin
ExecStart=/opt/pumpkin/pumpkin

# Pumpkin saves the world and shuts down cleanly on SIGTERM.
KillSignal=SIGTERM
TimeoutStopSec=90

# Restart on crashes, but not after a clean `stop` from the console.
Restart=on-failure
RestartSec=5

# Optional: the server has no fixed heap like the JVM, so cap it here.
# MemoryMax=4G

# Hardening. Pumpkin only needs to write inside its own directory.
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
PrivateDevices=true
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictSUIDSGID=true
ReadWritePaths=/opt/pumpkin

[Install]
WantedBy=multi-user.target
```

What the important lines do:

| Line | Why |
| :--- | :--- |
| `WorkingDirectory=/opt/pumpkin` | Pumpkin looks for `pumpkin.toml`, `world/` and `plugins/` in the current directory. |
| `KillSignal=SIGTERM` / `TimeoutStopSec=90` | `systemctl stop` sends `SIGTERM`; Pumpkin saves and exits. The timeout gives a large world time to save before systemd would `SIGKILL` it. |
| `Restart=on-failure` | A crash brings the server back after 5 seconds; a clean exit (for example the `stop` command) does not. Use `Restart=always` if you want it back even after `stop`. |
| `ProtectSystem=strict` + `ReadWritePaths=` | The whole filesystem is read-only for the service except the server directory. |
| `MemoryMax=` | Pumpkin allocates memory dynamically, there is no `-Xmx`. If you need a hard limit, set it here. |

::: warning Plugin permission prompts
When `ask_permission_confirmation = true` under `[plugins]`, a plugin that requests new capabilities waits for an answer in the console, which is not available under systemd. Either pre-approve the capabilities with `allowed_permissions` or set `ask_permission_confirmation = false` in `pumpkin.toml` (see [Plugins Configuration](../config/plugins)).
:::

## 5. Enable and start

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now pumpkin.service
```

Check that it came up (the readiness line is `Server is now running`):

```bash
systemctl status pumpkin.service
journalctl -u pumpkin.service -f
```

## Day-to-day commands

| Task | Command |
| :--- | :--- |
| Start / stop / restart | `sudo systemctl start pumpkin`, `sudo systemctl stop pumpkin`, `sudo systemctl restart pumpkin` |
| Start at boot (on / off) | `sudo systemctl enable pumpkin` / `sudo systemctl disable pumpkin` |
| Follow the log | `journalctl -u pumpkin -f` |
| Log since the last boot | `journalctl -u pumpkin -b` |
| Apply a changed unit file | `sudo systemctl daemon-reload && sudo systemctl restart pumpkin` |

## Sending console commands

The service has no attached terminal, so the server console cannot be typed into directly. Two options:

- **Management protocol (recommended):** enable `[networking.management]` in `pumpkin.toml` and use the WebSocket [MSMP](../config/management) interface; it also lets you run commands from another machine.
- **A named pipe for stdin:** if you must use stdin, add `ExecStartPre=-/usr/bin/mkfifo -m 600 /opt/pumpkin/console.fifo` and `StandardInput=file:/opt/pumpkin/console.fifo` to the `[Service]` section. Commands are then sent with `echo "say hello" > /opt/pumpkin/console.fifo`. This is more fragile than MSMP and is not needed for stopping the server, which `systemctl stop` already handles through `SIGTERM`.

## Several servers on one machine

Use a [template unit](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html#Description) named `pumpkin@.service` with `WorkingDirectory=/opt/pumpkin/%i` and `ExecStart=/opt/pumpkin/pumpkin` (or one binary per directory), then run `systemctl enable --now pumpkin@survival pumpkin@creative`. Each instance keeps its own `pumpkin.toml`, so give each one a different `server_address` port.
