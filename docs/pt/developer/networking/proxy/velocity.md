# Velocity Modern Forwarding

[Velocity](https://papermc.io/software/velocity) is a high-performance proxy created by PaperMC. It uses modern plugin messaging during the `Login` state to securely transmit player data with **HMAC-SHA256** message authentication codes.

Pumpkin implements Velocity modern forwarding in [`crates/pumpkin/src/net/proxy/velocity.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/velocity.rs).

---

## How Velocity Forwarding Operates

Unlike BungeeCord, which injects unauthenticated data into the handshake string, Velocity operates during the **Login** state over a dedicated plugin channel:

1. **Handshake & Login**: The player authenticates with Velocity. Velocity initiates a standard TCP connection to Pumpkin and transmits `SHandshake` and `SLoginStart`.
2. **Channel Query**: Recognizing that Velocity modern forwarding is enabled, Pumpkin pauses the login sequence and dispatches a `CLoginPluginRequest` on channel `velocity:player_info`.
3. **Payload Generation**: Velocity bundles the player's remote address, UUID, username, and skin textures. It calculates a 32-byte HMAC-SHA256 signature across this payload using the shared secret.
4. **Signature Verification**: Velocity sends `SLoginPluginResponse`. Pumpkin validates the HMAC-SHA256 digest against its configured secret. If valid, Pumpkin overwrites the connection's network address and GameProfile and transitions to `Config` / `Play`.

---

## Wire Payload Structure

The payload in `SLoginPluginResponse` is structured as follows:

```text
┌─────────────────────────────────────────────────────────────┐
│ 32-byte HMAC-SHA256 Signature                               │
├─────────────────────────────────────────────────────────────┤
│ Forwarding Protocol Version (VarInt: 1 - 4)                 │
├─────────────────────────────────────────────────────────────┤
│ Client Remote IP Address (String / IPv4 / IPv6)             │
├─────────────────────────────────────────────────────────────┤
│ Player UUID (128-bit / UUID)                                │
├─────────────────────────────────────────────────────────────┤
│ Player Username (String)                                    │
├─────────────────────────────────────────────────────────────┤
│ Profile Properties Count (VarInt)                           │
│  ├─ Property Name (String)                                  │
│  ├─ Property Value (String)                                 │
│  └─ Optional Signature (String)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Cryptographic Validation in Pumpkin

Inside `crates/pumpkin/src/net/proxy/velocity.rs`:

```rust
use hmac::{Hmac, KeyInit, Mac};
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

// Extract signature and payload
let (signature, data_to_verify) = data.split_at(32);

// Initialize HMAC with secret from pumpkin.toml
let mut mac = HmacSha256::new_from_slice(secret.as_bytes())
    .map_err(|_| VelocityError::FailedVerifyIntegrity)?;

mac.update(data_to_verify);

// Constant-time verification prevents timing attacks
mac.verify_slice(signature)
    .map_err(|_| VelocityError::FailedVerifyIntegrity)?;
```

If the signature does not match (e.g., if an attacker attempts to connect directly to the backend without knowing the secret), Pumpkin drops the connection immediately.

---

## Configuration in `pumpkin.toml`

1. Open `velocity.toml` on your Velocity proxy and set:
   ```toml
   player-info-forwarding-mode = "modern"
   forwarding-secret-file = "forwarding.secret"
   ```
2. Copy the generated secret string from `forwarding.secret` into `pumpkin.toml`:
   ```toml
   [networking.proxy]
   enabled = true

   [networking.proxy.velocity]
   enabled = true
   secret = "YOUR_VELOCITY_FORWARDING_SECRET_HERE"
   ```
