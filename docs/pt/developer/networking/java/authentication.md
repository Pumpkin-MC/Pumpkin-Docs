# Java Edition Authentication

Authentication verifies the identity of players connecting to Pumpkin to prevent username spoofing and account impersonation.

Pumpkin handles authentication in the [`pumpkin-auth`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-auth) crate and orchestrates it during the `Login` state in `crates/pumpkin/src/net/java/login/`.

---

## Why Authentication Matters

Offline (non-authenticated) accounts generate player UUIDs strictly based on their offline username string (`UUID::new_v3(...)`). Without verification, any user can join using the username of an operator or administrator and gain privileged access.

In online mode (`online_mode = true` in `pumpkin.toml`), Pumpkin cryptographically verifies with Mojang's session servers that the connecting client owns the requested account.

---

## How Yggdrasil Authentication Works

The authentication exchange between the client, Pumpkin, and Mojang's Yggdrasil servers follows these steps:

1. **Initiation**: The client sends `SLoginStart` declaring its desired username and optional offline UUID.
2. **Key Exchange**: Pumpkin replies with `CEncryptionBegin`, providing a random 4-byte verify token, the server ID string, and Pumpkin's 1024-bit RSA public key.
3. **Session Join**: The client generates a random 16-byte shared secret (`AES-128`), computes a SHA-1 server hash, and calls Mojang's session server (`POST /session/minecraft/join`) using its authenticated Microsoft access token.
4. **Verification**: The client sends `SEncryptionResponse` containing the RSA-encrypted shared secret and encrypted verify token. Pumpkin decrypts the token with its RSA private key, recalculates the SHA-1 digest, and queries Mojang (`GET /session/minecraft/hasJoined`).
5. **Profile Retrieval**: Mojang validates that the client and server hashes match, returning the authenticated player's UUID, username, and signed skin/cape texture properties (`GameProfile`).
6. **Encryption Activation**: Pumpkin activates full-stream symmetric encryption (`AES-128/CFB8`) and completes the login sequence by sending `CLoginSuccess`.

---

## Game Profile Structure

When Mojang's `hasJoined` endpoint validates a session, it returns a `GameProfile` containing the player's authenticated UUID, username, and signed texture properties:

```rust
pub struct GameProfile {
    pub id: Uuid,
    pub name: String,
    pub properties: Vec<Property>,
    pub profile_actions: Option<Vec<ProfileAction>>,
}

pub struct Property {
    pub name: String,
    pub value: String, // Base64 encoded texture data
    pub signature: Option<String>, // Cryptographic signature verifying authenticity
}
```

Pumpkin verifies that skin and cape signatures are cryptographically signed with Mojang's public key to prevent clients from injecting malicious payloads or unauthorized textures.

---

## Custom Authentication Endpoints

For private networks or enterprise environments running custom Yggdrasil-compatible authentication servers, endpoints can be customized in `pumpkin.toml`:

```toml
[networking.java.authentication]
enabled = true
fallbacks = []
connect_timeout = 5000
read_timeout = 5000
prevent_proxy_connections = false

[networking.java.authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[networking.java.authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```

---

## Proxy Authentication Forwarding

When running Pumpkin behind proxies, client connections terminate at the proxy. Pumpkin supports the three primary proxy forwarding standards:

- **Velocity Modern Forwarding**: Validates player data forwarded with HMAC-SHA256 secret tokens (`[networking.proxy.velocity]`).
- **BungeeGuard**: Token-based authentication header validation for BungeeCord setups.
- **Legacy BungeeCord**: Handshake forwarding appending IP, UUID, and properties to the server host string.
