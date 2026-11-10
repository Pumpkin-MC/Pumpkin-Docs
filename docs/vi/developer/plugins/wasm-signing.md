# Ký & Xác minh Plugin WASM

Pumpkin triển khai hệ thống ký mật mã và xác minh giấy phép cho các plugin WebAssembly. Điều này đảm bảo tính toàn vẹn của plugin, xác thực danh tính tác giả và bảo vệ các plugin đã xác minh hoặc marketplace khỏi việc can thiệp trái phép.

Hệ thống con ký được triển khai trong [`crates/pumpkin/src/plugin/loader/wasm/wasm_host/signature.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/plugin/loader/wasm/wasm_host/signature.rs) dựa trên thông số kỹ thuật **W3C `wasmsign2`** sử dụng các section tùy chỉnh WebAssembly.

---

## Tại sao phải Ký Plugin WebAssembly?

- **Bảo vệ chống Can thiệp**: Đảm bảo rằng bytecode đã biên dịch không bị chèn logic độc hại sau khi biên dịch.
- **Danh tính Tác giả**: Xác thực rằng một plugin được xây dựng và phát hành bởi một nhà phát triển đã xác minh.
- **Cấp phép Marketplace**: Xác thực các khóa giấy phép và quyền lợi cho các plugin được phân phối qua [Pumpkin Marketplace](https://market.pumpkinmc.org) chính thức.

---

## Các Section Tùy chỉnh trong Binary WASM

Pumpkin nhúng siêu dữ liệu ký và xác minh trực tiếp vào hai section tùy chỉnh WebAssembly tiêu chuẩn:
- **`pumpkin.metadata`**: Lưu trữ các tuyên bố nhà phát triển, xuất bản và giấy phép ở định dạng JSON.
- **`wasm_signature`**: Lưu trữ envelope chữ ký mật mã tuân thủ tiêu chuẩn W3C `wasmsign2`.

### 1. Section `pumpkin.metadata`
Chứa một chuỗi JSON giữ các tuyên bố xuất bản và giấy phép:

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

### 2. Section `wasm_signature`
Tuân theo cấu trúc envelope W3C `wasmsign2`:

```json
{
  "version": 1,
  "algorithm": "Ed25519",
  "public_key_hex": "4a7b...",
  "signature_hex": "8e1c..."
}
```

---

## Pipeline Ký

Quá trình ký đảm bảo tính toàn vẹn bằng cách băm và ký bytecode WebAssembly sạch kết hợp với các tuyên bố siêu dữ liệu:

### Các Bước Thuật toán Ký
1. **Vệ sinh (`strip_pumpkin_sections`)**: Sử dụng [`wasmparser`](https://docs.rs/wasmparser/) để loại bỏ bất kỳ section tùy chỉnh `pumpkin.metadata` hoặc `wasm_signature` hiện có để tránh đệ quy.
2. **Xây dựng Payload**:
   ```rust
   let mut sign_payload = Vec::new();
   sign_payload.extend_from_slice(&clean_wasm);
   sign_payload.extend_from_slice(&metadata_json);
   ```
3. **Chữ ký Ed25519**: Payload được ký bằng [`ed25519-dalek`](https://docs.rs/ed25519-dalek/) với khóa bí mật 32-byte của nhà phát triển.
4. **Mã hóa**: Sử dụng [`wasm-encoder`](https://docs.rs/wasm-encoder/) để nối các section tùy chỉnh `pumpkin.metadata` và `wasm_signature` vào binary sạch.

---

## Pipeline Xác minh

Khi Pumpkin khởi động và tải một plugin WebAssembly, chuỗi xác minh thực thi trước khi plugin được khởi tạo:

1. **Trích xuất Section Tùy chỉnh**: `WasmPluginLoader` quét binary để tìm `pumpkin.metadata` và `wasm_signature`.
2. **Truy xuất Khóa**:
   - Nếu plugin được đánh dấu là marketplace-verified, Pumpkin xác minh khóa công khai với Marketplace Public Key Endpoint (`https://market.pumpkinmc.org/api/v1/rest/public-key`).
   - Nếu được ký bởi một nhà phát triển độc lập, khóa được khớp với các khóa nhà phát triển đáng tin cậy được cấu hình trong `pumpkin.toml`.
3. **Xác minh Bytecode**:
   - Pumpkin loại bỏ các section tùy chỉnh từ binary đã tải để khôi phục `clean_wasm` gốc.
   - Tái tạo payload `(clean_wasm + metadata_json)`.
   - Xác minh chữ ký bằng `verifying_key.verify(&payload, &signature)`.
4. **Xác thực Giấy phép & Tính toàn vẹn**:
   - Nếu xác minh thành công, Wasmtime khởi tạo plugin một cách an toàn.
   - Nếu xác minh thất bại hoặc chữ ký không hợp lệ, quá trình tải bị hủy bỏ với lỗi, bảo vệ máy chủ khỏi việc chạy mã bị xâm phạm.
