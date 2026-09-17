# Proxy Forwarding Overview

In multi-server Minecraft networks, players connect through a front-facing reverse proxy (such as Velocity, BungeeCord, or Vine) that routes connections between lobbies and sub-servers without requiring players to reconnect.

Because backend servers receive TCP connections directly from the proxy machine rather than the player, the server must be informed of the player's genuine **IP address**, **UUID**, **username**, and **skin properties**.

Pumpkin provides native support for all three major proxy forwarding protocols in [`crates/pumpkin/src/net/proxy/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net/proxy).

---

## The Proxy Forwarding Problem

Without secure proxy forwarding:
1. **IP Loss**: Every connected player appears with the proxy's loopback or internal IP (breaking IP bans and geo-location).
2. **UUID Spoofing & Bypasses**: Malicious users could connect directly to the backend server's port with any spoofed username or operator identity.

To prevent proxy bypasses, Pumpkin validates cryptographic secrets, tokens, or digital signatures sent by the proxy.

---

## Comparison of Supported Protocols

| Protocol | Protocol Transport | Security / Cryptography | Replay Protection | Crate Module |
| :--- | :--- | :--- | :--- | :--- |
| **[BungeeCord](/developer/networking/proxy/bungeecord)** | `SHandshake` server address string | Optional token in profile properties (`bungeeguard-token`) | None | `pumpkin::net::proxy::bungeecord` |
| **[Velocity](/developer/networking/proxy/velocity)** | Login plugin message (`velocity:player_info`) | Symmetric HMAC-SHA256 signature | None | `pumpkin::net::proxy::velocity` |
| **[Vine](/developer/networking/proxy/vine)** | Login plugin message (`vine:player_info`) | Asymmetric **Ed25519** digital signatures | 16-byte nonce challenge + 30s timestamp window | `pumpkin::net::proxy::vine` |

---

## Lifecycle Architecture

1. **Player Authentication**: The player connects to the proxy (BungeeCord, Velocity, or Vine) and authenticates against Mojang's session servers.
2. **Backend Connection**: The proxy connects to Pumpkin over TCP and sends `SHandshake`.
3. **Data Forwarding**:
   - **BungeeCord Mode**: The proxy injects the player's remote IP, UUID, and properties directly into the `SHandshake` hostname string (separated by null bytes `\0`).
   - **Modern Mode (Velocity / Vine)**: Pumpkin sends `CLoginPluginRequest` on a dedicated channel (`velocity:player_info` or `vine:player_info`). The proxy signs the player profile using HMAC-SHA256 (Velocity) or Ed25519 (Vine) and replies with `SLoginPluginResponse`.
4. **Validation & Session Initialization**: Pumpkin validates the signature, binds the real IP and GameProfile to the `JavaClient`, and sends `CLoginSuccess`.

---

## Proxy Documentation

- **[BungeeCord](/developer/networking/proxy/bungeecord)**: Legacy host string injection and optional BungeeGuard token validation.
- **[Velocity Modern Forwarding](/developer/networking/proxy/velocity)**: HMAC-SHA256 signed player info during the Login state.
- **[Vine Modern Forwarding](/developer/networking/proxy/vine)**: Next-generation proxy forwarding with Ed25519 signatures and replay attack prevention.
