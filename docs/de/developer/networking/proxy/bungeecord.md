# BungeeCord Forwarding

Pumpkin provides native support for BungeeCord and Waterfall proxy networks, including **BungeeGuard** authentication token verification.

Implementation is located in [`crates/pumpkin/src/net/proxy/bungeecord.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/bungeecord.rs).

---

## How BungeeCord Forwarding Operates

Unlike modern protocols that use custom login channels, BungeeCord operates by encoding client metadata directly into the `server_address` field of the initial `SHandshake` packet.

The string uses null character (`\0`) delimiters:

```text
[original_host]\0[player_ip:port]\0[player_uuid]\0[properties_json]
```

1. **`original_host`**: The domain name the player originally typed into their client.
2. **`player_ip:port`**: The genuine IP address and ephemeral source port of the client.
3. **`player_uuid`**: The player's Mojang UUID (32 hex characters without hyphens or 36 characters with hyphens).
4. **`properties_json`**: A JSON array containing skin textures, cape textures, and Mojang cryptographic signatures.

---

## The Security Risk: Proxy Bypasses

Because BungeeCord's handshake string is unauthenticated plain text, an attacker could connect directly to an exposed backend port, inject an arbitrary UUID and operator username, and gain full server control.

Traditionally, this required strict Linux firewall rules (`iptables` / `ufw`) to restrict port access exclusively to the proxy IP.

---

## BungeeGuard Protection

To eliminate proxy bypasses without relying solely on network firewalls, Pumpkin integrates **BungeeGuard** token verification:

1. The BungeeCord proxy injects a shared secret into the player's profile properties under the key `bungeeguard-token`.
2. When Pumpkin processes the handshake in `bungeecord_login`:
   - It checks whether `secret` is configured in `pumpkin.toml`.
   - It inspects the forwarded properties for `bungeeguard-token`.
   - If the token matches, Pumpkin **strips the secret property** from the player's profile (so other plugins cannot read it) and completes the login.
   - If the token is missing or incorrect, Pumpkin rejects the connection with `BungeeCordError::MissingToken` or `BungeeCordError::InvalidToken`.

```rust
// In crates/pumpkin/src/net/proxy/bungeecord.rs
if !secret.is_empty() {
    let Some(token_index) = properties.iter().position(|p| p.name == BUNGEEGUARD_TOKEN_PROPERTY) else {
        return Err(BungeeCordError::MissingToken);
    };

    if properties[token_index].value != secret {
        return Err(BungeeCordError::InvalidToken);
    }
    properties.remove(token_index);
}
```

---

## Configuration in `pumpkin.toml`

To enable BungeeCord forwarding with BungeeGuard:

```toml
[networking.proxy]
enabled = true

[networking.proxy.bungeecord]
enabled = true
# Optional: Configure the BungeeGuard shared secret to block direct connections
secret = "YOUR_BUNGEEGUARD_SECRET_HERE"
```
