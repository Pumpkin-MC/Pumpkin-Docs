# WASM 插件簽名與驗證

Pumpkin 為 WebAssembly 插件實現了加密簽名與授權驗證系統。它可確保插件完整性、驗證作者身份，並保護已驗證或市集插件免受未經授權的篡改。

簽名子系統基於 **W3C `wasmsign2`** 規範，使用自訂 WebAssembly 節，在 [`crates/pumpkin/src/plugin/loader/wasm/wasm_host/signature.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/plugin/loader/wasm/wasm_host/signature.rs) 中實現。

---

## 為什麼要為 WebAssembly 插件簽名？

- **防篡改**：確保編譯後的位元組碼在編譯完成後沒有被注入惡意邏輯。
- **作者身份**：驗證插件確實由已驗證開發者建構和釋出。
- **市集授權**：驗證透過官方 [Pumpkin 市集](https://market.pumpkinmc.org) 分發插件的授權金鑰和授權。

---

## WASM 二進位檔案中的自訂節

Pumpkin 將簽名和驗證元資料直接嵌入兩個標準 WebAssembly 自訂節：

- **`pumpkin.metadata`**：以 JSON 格式儲存開發者、釋出和授權宣告。
- **`wasm_signature`**：儲存符合 W3C `wasmsign2` 標準的加密簽名信封。

### 1. `pumpkin.metadata` 節

包含儲存釋出與授權宣告的 JSON 字串：

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

### 2. `wasm_signature` 節

遵循 W3C `wasmsign2` 信封結構：

```json
{
  "version": 1,
  "algorithm": "Ed25519",
  "public_key_hex": "4a7b...",
  "signature_hex": "8e1c..."
}
```

---

## 簽名流程

簽名流程透過對乾淨的 WebAssembly 位元組碼和元資料宣告的組合進行雜湊和簽名來保證完整性：

### 簽名演算法步驟

1. **清理（`strip_pumpkin_sections`）**：使用 [`wasmparser`](https://docs.rs/wasmparser/) 移除任何已存在的 `pumpkin.metadata` 或 `wasm_signature` 自訂節，避免遞迴。
2. **構造負載**：

   ```rust
   let mut sign_payload = Vec::new();
   sign_payload.extend_from_slice(&clean_wasm);
   sign_payload.extend_from_slice(&metadata_json);
   ```

3. **Ed25519 簽名**：使用開發者的 32 位元組金鑰，透過 [`ed25519-dalek`](https://docs.rs/ed25519-dalek/) 對負載簽名。
4. **編碼**：使用 [`wasm-encoder`](https://docs.rs/wasm-encoder/) 將 `pumpkin.metadata` 和 `wasm_signature` 自訂節附加到乾淨的二進位檔案中。

---

## 驗證流程

Pumpkin 啟動並載入 WebAssembly 插件時，會在插件例項化前執行驗證序列：

1. **提取自訂節**：`WasmPluginLoader` 掃描二進位檔案中的 `pumpkin.metadata` 和 `wasm_signature`。
2. **獲取金鑰**：
   - 如果插件標記為市集已驗證，Pumpkin 會透過市集公鑰端點（`https://market.pumpkinmc.org/api/v1/rest/public-key`）驗證公鑰。
   - 如果由獨立開發者簽名，則將金鑰與 `pumpkin.toml` 中設定的可信開發者金鑰匹配。
3. **位元組碼驗證**：
   - Pumpkin 從已載入二進位檔案中移除自訂節，恢復原始 `clean_wasm`。
   - 重新構造負載 `(clean_wasm + metadata_json)`。
   - 使用 `verifying_key.verify(&payload, &signature)` 驗證簽名。
4. **授權與完整性驗證**：
   - 驗證成功時，Wasmtime 會安全地例項化插件。
   - 驗證失敗或簽名無效時，載入會以錯誤中止，防止伺服器執行遭到篡改的程式碼。
