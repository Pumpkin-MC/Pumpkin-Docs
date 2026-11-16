# Running Vine Behind nginx

This guide shows how to put [nginx](https://nginx.org/) in front of [Vine](https://github.com/Pumpkin-MC/Vine). It starts with the simplest safe setup (everything on one machine) and ends with optional extras.

You do not need to understand every detail. Follow the steps in order and read the **Rules you must not break** section at the end.

## What you are building

```text
Players
   |
   v
nginx            public, port 25565        (only passes bytes along)
   |
   v
Vine             private, 127.0.0.1:25577  (routing, login, forwarding)
   |
   v
Your servers     private, 127.0.0.1:25566  (Pumpkin, Paper, ...)
```

Only nginx is reachable from the internet. Vine and your servers are not.

Why nginx at all? It is a hardened front door: it absorbs junk connections, can spread players over several Vine machines, and can be reloaded without kicking anyone.

## Before you start

You need:

- A Linux machine with root (sudo) access.
- nginx with the `stream` module. Check it with:

```bash
nginx -V 2>&1 | grep -o with-stream
```

If this prints nothing, install the stream package of your distribution (for example `libnginx-mod-stream` on Debian/Ubuntu).

- A running Vine and at least one backend server (see the Vine README).

## Step 1: Configure Vine

Open `vine.toml` and set these values:

```toml
[server]
# Listen on this machine only. Players never connect here directly.
bind_address = "127.0.0.1:25577"

[network]
# nginx will send the real player address in a small header (PROXY protocol).
proxy_protocol = true
```

Why `proxy_protocol`? Without it, every player looks like they come from 127.0.0.1 (nginx). Then the connection rate limit treats all players as one person, and your servers see the wrong IP address for everyone.

Restart Vine after changing `bind_address`.

## Step 2: Configure nginx

Edit `/etc/nginx/nginx.conf`. The `stream` block goes at the top level, NOT inside `http`:

```nginx
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 16384;
}

stream {
    server {
        listen 25565 so_keepalive=on;
        listen [::]:25565 so_keepalive=on ipv6only=on;

        proxy_pass 127.0.0.1:25577;
        proxy_protocol on;             # must match proxy_protocol = true in Vine
        proxy_connect_timeout 5s;
    }
}
```

Test and apply:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` must say "syntax is ok" before you reload.

## Step 3: Close everything except nginx

This step protects you. Do not skip it.

On Ubuntu/Debian with ufw (allow SSH first, or you lock yourself out):

```bash
sudo ufw allow OpenSSH
sudo ufw allow 25565/tcp
sudo ufw enable
```

Do NOT open 25577 (Vine) or 25566 (your server). Because they listen on 127.0.0.1, they are only reachable from the same machine.

If you run things in Docker: published ports bypass ufw. Publish them to localhost only, for example `127.0.0.1:25577:25565`.

## Step 4: Test it

1. Start Vine with debug logging for one test run:

```bash
RUST_LOG=debug ./vine
```

2. Join with a Minecraft client from another computer (not from the server itself).
3. In the Vine log, look for a line like `PROXY protocol resolved client IP: <your public IP>`.

If you see your real IP, the setup works. If you see 127.0.0.1, nginx and Vine do not agree on PROXY protocol (see Troubleshooting).

## Optional: Several domains

nginx passes the Minecraft handshake through unchanged, so Vine can send each domain to a different server:

```toml
[routing]
default_server = "lobby"

[routing.forced_hosts]
"survival.example.com" = "survival"
"minigames.example.com" = "minigames"
```

nginx itself cannot choose a server by domain for Minecraft. Let Vine do it.

## Optional: Bedrock Edition

Skip this if you only host Java players. Bedrock uses TCP and UDP on port 19132 and is less tested than Java.

Set in `vine.toml`:

```toml
[bedrock]
enabled = true
bind_address = "127.0.0.1:19132"
external_ip = "YOUR.PUBLIC.IP"      # the public IP of this machine
backend_address = "127.0.0.1:19133"
```

Add to the `stream` block, using your real public IP in both `listen` lines (a plain `listen 19132` would clash with Vine on the same port):

```nginx
    server {
        listen YOUR.PUBLIC.IP:19132;
        proxy_pass 127.0.0.1:19132;
    }
    server {
        listen YOUR.PUBLIC.IP:19132 udp;
        proxy_pass 127.0.0.1:19132;
        proxy_timeout 120s;
    }
```

Do not add `proxy_protocol on;` here. Bedrock does not use it.

Open the port for both protocols:

```bash
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```

Keep the public port the same as Vine's Bedrock port (19132 in both places). Bedrock clients are told Vine's own port, so a different public port will break joining.

## Optional: Several Vine machines

Replace the single `proxy_pass` with a group, so nginx spreads players and skips a dead machine:

```nginx
stream {
    upstream vine_java {
        hash $remote_addr consistent;
        server 10.0.0.11:25577 max_fails=3 fail_timeout=10s;
        server 10.0.0.12:25577 max_fails=3 fail_timeout=10s;
    }

    server {
        listen 25565 so_keepalive=on;
        proxy_pass vine_java;
        proxy_protocol on;
        proxy_connect_timeout 5s;
        proxy_next_upstream on;
        proxy_next_upstream_tries 2;
    }
}
```

Now Vine must listen on a private network address (for example 10.0.0.11:25577) instead of 127.0.0.1. Firewall it so that only the nginx machine can connect:

```bash
sudo ufw allow from 10.0.0.5 to any port 25577 proto tcp
```

(10.0.0.5 is the nginx machine in this example.)

Use the same `vine.toml` on every Vine machine. For Bedrock, use the same server list and `hash` rule for the TCP and the UDP group.

## Changing things later

| What you change | What to do | Do players get kicked? |
| :--- | :--- | :--- |
| Servers, domains, MOTD, rate limit in `vine.toml` | Run `/vine reload` | No |
| `bind_address` in `vine.toml` | Restart Vine | Yes |
| nginx config | `sudo nginx -t` then `sudo systemctl reload nginx` | No |

After many nginx reloads, old nginx workers can stay alive while players are still connected. Put this in the top level of `nginx.conf` to clean them up eventually:

```nginx
worker_shutdown_timeout 10m;
```

## Rules you must not break

1. **PROXY protocol must match on both sides.** nginx `proxy_protocol on;` and Vine `proxy_protocol = true`, or both off. If only one side uses it, every player fails to connect.
2. **Never expose Vine or your backend servers to the internet.** Bind them to 127.0.0.1 or a private address, and allow only the ports nginx needs in your firewall.
3. **Backends must only accept Vine.** If players can reach a backend directly, they can skip login checks and join with any name. Use forwarding (Velocity or Vine mode with a secret) on the backend and keep it private.
4. **Do not use the `http` block for Minecraft.** Only the `stream` block works.
5. **Raise the file limits.** Every player uses two connections in nginx and two in Vine. Keep `worker_rlimit_nofile` and `worker_connections` as above, and with systemd set `LimitNOFILE=65535` for Vine. Otherwise you get "Too many open files" under load.
6. **Check config before reloading.** Always run `sudo nginx -t` first. A broken config means nginx does not reload.
7. **Keep clocks in sync** (use NTP) on all machines if you use Vine forwarding, because it checks timestamps.
8. **Do not change the public Bedrock port** without also changing Vine's Bedrock port.

## Troubleshooting

| Symptom | Likely cause | Fix |
| :--- | :--- | :--- |
| Every join fails, Vine log says "PROXY protocol error" | nginx does not send PROXY protocol, but Vine expects it | Add `proxy_protocol on;` to the nginx server block |
| Every join fails, Vine logs decode errors or handshake timeouts | nginx sends PROXY protocol, but Vine does not expect it | Set `proxy_protocol = true` in `vine.toml` and `/vine reload` |
| Players get "Connection throttled" or drops during busy times | Vine sees only the nginx IP | Enable PROXY protocol on both sides (rule 1) |
| Server list works but joining times out | Vine cannot reach the backend | Check the server address in `[servers]` and the backend firewall |
| `nginx -t` complains about `stream` | Stream module not installed | Install your distribution's nginx stream module |
| Bedrock players cannot join, Java works | Wrong `external_ip` or port, or UDP closed | Check the Bedrock section and `ufw allow 19132/udp` |
| "Too many open files" in the log | File limits too low | See rule 5 |

## Related pages

- [Proxy configuration for Pumpkin backends](../config/proxy)
- [Vine modern forwarding](/developer/networking/proxy/vine)
