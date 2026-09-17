# Bedrock Edition Authentication

Minecraft: Bedrock Edition implements a certificate chain authentication protocol based on JSON Web Tokens (JWT) cryptographically anchored to Microsoft / Xbox Live root public keys.

Authentication handling is powered by the [`pumpkin-auth`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-auth) crate and processed during the Bedrock login handshake in `crates/pumpkin/src/net/bedrock/login/`.

---

## The Handshake Flow

When a Bedrock client initiates connection, it sends an `SLogin` packet containing the client's protocol version, an **Identity Chain**, and **Client Data**:

1. **Token Acquisition**: The Bedrock client signs into Xbox Live, obtaining a chained JSON Web Token (JWT) certificate signed by Microsoft's CA.
2. **Login Transmission**: The client packages this identity chain alongside a separate `ClientData` JWT into `SLogin`.
3. **Chain Validation**: Pumpkin walks the certificate chain, verifying each token's signature against Mojang's public root keys and extracting the player's Xbox User ID (XUID), Gamertag, and ephemeral session public key.
4. **Hardware Verification**: Pumpkin verifies the `ClientData` payload using the client's ephemeral public key, extracting geometry, skins, and device OS telemetry.
5. **Session Authorization**: Once validated, Pumpkin emits `CPlayStatus` (Login Success) and progresses to resource pack negotiation.

---

## Token Payloads

### 1. Identity Chain (`Chain`)
An array of JWT tokens forming an unbroken chain of trust:
- **Root Token**: Cryptographically signed by Mojang's official public root certificate authority.
- **Intermediate Tokens**: Issued by Xbox Live services, verifying the player's Xbox Live User ID (**XUID**), gamertag, and generating an ephemeral ECDSA public key for the session.
- **Claims**: Includes `extraData` with `displayName`, `identity` (UUID), `XUID`, and `titleId`.

### 2. Client Data (`ClientData`)
A separate JWT signed with the client's ephemeral private key corresponding to the public key in the identity chain:
- **Hardware & Environment**: `DeviceOS`, `DeviceModel`, `CurrentInputMode`, `DefaultInputMode`, `ClientRandomId`.
- **Game Version**: `GameVersion` string.
- **Player Cosmetics**: Full skin texture bitmaps, cape data, geometry names, and persona definitions.

---

## Verification in `pumpkin-auth`

Pumpkin verifies token signatures using **NIST P-384 ECDSA** cryptography:

```rust
// In crates/pumpkin/src/net/bedrock/login/mod.rs
match AuthPayload::verify(&jwt_payload) {
    Ok(profile) => {
        // Successfully verified against Mojang public keys
        info!("Authenticated Bedrock player: {} (XUID: {})", profile.name, profile.xuid);
    }
    Err(LoginError::ChainValidationFailed(err)) => {
        warn!("Bedrock JWT chain validation failed: {err}");
        self.try_kick(DisconnectReason::Kicked, "Authentication failed".into());
    }
    Err(LoginError::SelfSignedNotAllowed) => {
        warn!("Rejected unauthenticated self-signed Bedrock client");
        self.try_kick(DisconnectReason::Kicked, "Server enforces Xbox Live authentication".into());
    }
}
```

### Online vs. Offline Mode
- **Online Mode** (`online_mode = true` in `pumpkin.toml`): The chain must successfully validate against Mojang's public keys. Self-signed or unsigned tokens are immediately rejected.
- **Offline Mode** (`online_mode = false`): Pumpkin accepts self-signed client chains, generating offline UUIDs while extracting cosmetic skins and device metadata.
