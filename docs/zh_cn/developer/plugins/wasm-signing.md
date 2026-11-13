# WASM 插件签名与验证

Pumpkin 为 WebAssembly 插件实现了加密签名与许可证验证系统。它可确保插件完整性、验证作者身份，并保护已验证或市场插件免受未经授权的篡改。

签名子系统基于 **W3C `wasmsign2`** 规范，使用自定义 WebAssembly 节，在 [`crates/pumpkin/src/plugin/loader/wasm/wasm_host/signature.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/plugin/loader/wasm/wasm_host/signature.rs) 中实现。

---

## 为什么要为 WebAssembly 插件签名？

- **防篡改**：确保编译后的字节码在编译完成后没有被注入恶意逻辑。
- **作者身份**：验证插件确实由已验证开发者构建和发布。
- **市场许可证**：验证通过官方 [Pumpkin 市场](https://market.pumpkinmc.org) 分发插件的许可证密钥和授权。

---

## WASM 二进制文件中的自定义节

Pumpkin 将签名和验证元数据直接嵌入两个标准 WebAssembly 自定义节：

- **`pumpkin.metadata`**：以 JSON 格式存储开发者、发布和许可证声明。
- **`wasm_signature`**：存储符合 W3C `wasmsign2` 标准的加密签名信封。

### 1. `pumpkin.metadata` 节

包含保存发布与许可证声明的 JSON 字符串：

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

### 2. `wasm_signature` 节

遵循 W3C `wasmsign2` 信封结构：

```json
{
  "version": 1,
  "algorithm": "Ed25519",
  "public_key_hex": "4a7b...",
  "signature_hex": "8e1c..."
}
```

---

## 签名流程

签名流程通过对干净的 WebAssembly 字节码和元数据声明的组合进行哈希和签名来保证完整性：

### 签名算法步骤

1. **清理（`strip_pumpkin_sections`）**：使用 [`wasmparser`](https://docs.rs/wasmparser/) 移除任何已存在的 `pumpkin.metadata` 或 `wasm_signature` 自定义节，避免递归。
2. **构造负载**：

   ```rust
   let mut sign_payload = Vec::new();
   sign_payload.extend_from_slice(&clean_wasm);
   sign_payload.extend_from_slice(&metadata_json);
   ```

3. **Ed25519 签名**：使用开发者的 32 字节密钥，通过 [`ed25519-dalek`](https://docs.rs/ed25519-dalek/) 对负载签名。
4. **编码**：使用 [`wasm-encoder`](https://docs.rs/wasm-encoder/) 将 `pumpkin.metadata` 和 `wasm_signature` 自定义节附加到干净的二进制文件中。

---

## 验证流程

Pumpkin 启动并加载 WebAssembly 插件时，会在插件实例化前执行验证序列：

1. **提取自定义节**：`WasmPluginLoader` 扫描二进制文件中的 `pumpkin.metadata` 和 `wasm_signature`。
2. **获取密钥**：
   - 如果插件标记为市场已验证，Pumpkin 会通过市场公钥端点（`https://market.pumpkinmc.org/api/v1/rest/public-key`）验证公钥。
   - 如果由独立开发者签名，则将密钥与 `pumpkin.toml` 中配置的可信开发者密钥匹配。
3. **字节码验证**：
   - Pumpkin 从已加载二进制文件中移除自定义节，恢复原始 `clean_wasm`。
   - 重新构造负载 `(clean_wasm + metadata_json)`。
   - 使用 `verifying_key.verify(&payload, &signature)` 验证签名。
4. **许可证与完整性验证**：
   - 验证成功时，Wasmtime 会安全地实例化插件。
   - 验证失败或签名无效时，加载会以错误中止，防止服务器运行遭到篡改的代码。
