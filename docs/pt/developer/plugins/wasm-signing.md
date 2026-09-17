# WASM Plugin Signing & Verification

Pumpkin implements a cryptographic signing and license verification system for WebAssembly plugins. This ensures plugin integrity, authenticates author identity, and protects verified or marketplace plugins against unauthorized tampering.

The signing subsystem is implemented in [`crates/pumpkin/src/plugin/loader/wasm/wasm_host/signature.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/plugin/loader/wasm/wasm_host/signature.rs) based on the **W3C `wasmsign2`** specification using custom WebAssembly sections.

---

## Why Sign WebAssembly Plugins?

- **Tamper Protection**: Ensures that compiled bytecode has not been injected with malicious logic after compilation.
- **Author Identity**: Authenticates that a plugin was built and released by a verified developer.
- **Marketplace Licensing**: Validates license keys and entitlements for plugins distributed through the official [Pumpkin Marketplace](https://market.pumpkinmc.org).

---

## Custom Sections in the WASM Binary

Pumpkin embeds signing and verification metadata directly into two standard WebAssembly custom sections:
- **`pumpkin.metadata`**: Stores developer, publication, and license claims in JSON format.
- **`wasm_signature`**: Stores the cryptographic signature envelope compliant with the W3C `wasmsign2` standard.

### 1. `pumpkin.metadata` Section
Contains a JSON string holding publication and license claims:

```json
{
  "marketplace_url": "https://market.pumpkinmc.org",
  "plugin_id": 1024,
  "plugin_name": "EconomyPlus",
  "version": "1.2.0",
  "dev_id": 42,
  "dev_name": "DevName",
  "is_paid": true,
  "user_id": 1001,
  "license_key": "XXXX-XXXX-XXXX-XXXX",
  "issued_at": "2026-09-14T05:00:00Z"
}
```

### 2. `wasm_signature` Section
Follows the W3C `wasmsign2` envelope structure:

```json
{
  "version": 1,
  "algorithm": "Ed25519",
  "public_key_hex": "4a7b...",
  "signature_hex": "8e1c..."
}
```

---

## The Signing Pipeline

The signing process guarantees integrity by hashing and signing the clean WebAssembly bytecode combined with the metadata claims:

### Signing Algorithm Steps
1. **Sanitization (`strip_pumpkin_sections`)**: Uses [`wasmparser`](https://docs.rs/wasmparser/) to strip any preexisting `pumpkin.metadata` or `wasm_signature` custom sections to avoid recursion.
2. **Payload Construction**:
   ```rust
   let mut sign_payload = Vec::new();
   sign_payload.extend_from_slice(&clean_wasm);
   sign_payload.extend_from_slice(&metadata_json);
   ```
3. **Ed25519 Signature**: The payload is signed using [`ed25519-dalek`](https://docs.rs/ed25519-dalek/) with the developer's 32-byte secret key.
4. **Encoding**: Uses [`wasm-encoder`](https://docs.rs/wasm-encoder/) to append the `pumpkin.metadata` and `wasm_signature` custom sections to the clean binary.

---

## The Verification Pipeline

When Pumpkin boots and loads a WebAssembly plugin, the verification sequence executes before the plugin is instantiated:

1. **Custom Section Extraction**: The `WasmPluginLoader` scans the binary for `pumpkin.metadata` and `wasm_signature`.
2. **Key Retrieval**:
   - If the plugin is marked as marketplace-verified, Pumpkin verifies the public key against the Marketplace Public Key Endpoint (`https://market.pumpkinmc.org/api/v1/rest/public-key`).
   - If signed by an independent developer, the key is matched against trusted developer keys configured in `pumpkin.toml`.
3. **Bytecode Verification**:
   - Pumpkin strips the custom sections from the loaded binary to recover the original `clean_wasm`.
   - Reconstructs the payload `(clean_wasm + metadata_json)`.
   - Verifies the signature using `verifying_key.verify(&payload, &signature)`.
4. **License & Integrity Validation**:
   - If verification succeeds, Wasmtime instantiates the plugin safely.
   - If verification fails or the signature is invalid, loading is aborted with an error, protecting the server from running compromised code.
