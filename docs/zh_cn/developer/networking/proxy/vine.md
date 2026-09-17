# Vine Modern Forwarding

**Vine** is a next-generation, high-performance Minecraft proxy written in Rust. Designed for ultra-low latency, multi-threading, and enterprise-grade security, Vine introduces modern cryptographic forwarding based on **Ed25519 asymmetric signatures** and **replay attack protection**.

Pumpkin provides native support for Vine forwarding in [`crates/pumpkin/src/net/proxy/vine.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/vine.rs).

---

## Why Vine Forwarding?

While Velocity's HMAC-SHA256 forwarding represents an improvement over legacy BungeeCord, it relies on a **symmetric shared secret**. If one backend server in a network is compromised, an attacker obtains the shared secret and can forge authenticated player logins across the entire server cluster.

Vine solves this with:
1. **Asymmetric Public-Key Cryptography (Ed25519)**: The proxy signs player data using its private key. Backend servers only store the proxy's **Public Key** (`public_key`). Even if a backend server is compromised, the attacker cannot forge identities to other servers.
2. **Replay Attack Protection (16-byte Challenge Nonce)**: Pumpkin generates a cryptographic random 16-byte nonce for each connection. The proxy must sign and return this nonce. Replaying a captured login packet is impossible.
3. **Timestamp Drift Window**: Transmits a Unix timestamp that must be within ±30 seconds of the backend's system clock (`MAX_TIMESTAMP_DRIFT_SECS = 30`).

---

## The Handshake Sequence

1. **Connection**: The player connects and authenticates with Vine. Vine opens a backend connection to Pumpkin and sends `SHandshake` and `SLoginStart`.
2. **Challenge Query**: Pumpkin generates a cryptographically random 16-byte nonce and sends `CLoginPluginRequest` on the `vine:player_info` channel.
3. **Asymmetric Signing**: Vine serializes the version, timestamp, the returned 16-byte nonce, the client IP address, and the player GameProfile. It signs this byte stream with its Ed25519 private key.
4. **Tri-fold Validation**: Vine replies with `SLoginPluginResponse`. Pumpkin verifies:
   - **Clock Skew**: The embedded timestamp is within ±30 seconds of UTC time.
   - **Nonce Check**: The signed nonce exactly matches the 16-byte challenge generated in step 2.
   - **Ed25519 Signature**: The signature is cryptographically valid against the configured `public_key`.
5. **Session Success**: If all three checks pass, Pumpkin applies the verified identity and emits `CLoginSuccess`.

---

## Wire Payload Structure

The `SLoginPluginResponse` data layout:

```text
┌─────────────────────────────────────────────────────────────┐
│ 64-byte Ed25519 Digital Signature                           │
├─────────────────────────────────────────────────────────────┤
│ Forwarding Protocol Version (i32: 1)                        │
├─────────────────────────────────────────────────────────────┤
│ Unix Timestamp in Seconds (i64)                             │
├─────────────────────────────────────────────────────────────┤
│ 16-byte Challenge Nonce                                     │
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

## Verification in Pumpkin

In `crates/pumpkin/src/net/proxy/vine.rs`:

```rust
use ed25519_dalek::{Signature, Verifier, VerifyingKey};

// 1. Validate payload length (64-byte signature + 25-byte headers minimum)
if data.len() < 89 {
    return Err(VineError::DataTooShort);
}

// 2. Extract signature and signed payload
let (sig_bytes, signed_data) = data.split_at(64);
let signature = Signature::from_slice(sig_bytes)
    .map_err(|_| VineError::InvalidSignature)?;

// 3. Verify timestamp skew (30 second maximum drift)
let skew = (server_now - timestamp).abs();
if skew > MAX_TIMESTAMP_DRIFT_SECS {
    return Err(VineError::TimestampExpired(skew, MAX_TIMESTAMP_DRIFT_SECS));
}

// 4. Verify challenge nonce matches connection state
if received_nonce != expected_nonce {
    return Err(VineError::ChallengeMismatch);
}

// 5. Verify Ed25519 signature with proxy's public key
verifying_key.verify(signed_data, &signature)
    .map_err(|_| VineError::InvalidSignature)?;
```

---

## Configuration in `pumpkin.toml`

Configure Vine forwarding in `pumpkin.toml`:

```toml
[networking.proxy]
enabled = true

[networking.proxy.vine]
enabled = true
# 64-character hex-encoded Ed25519 public key of the Vine proxy
public_key = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

# Alternatively, if secret is supplied, the public key is derived automatically
secret = ""
```
