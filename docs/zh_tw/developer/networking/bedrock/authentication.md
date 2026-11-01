# 基岩版身分驗證

Minecraft：基岩版實現了基於 JSON Web Token（JWT）的證書鏈身分驗證協定，其加密信任錨為 Microsoft / Xbox Live 的根公鑰。

身分驗證由 [`pumpkin-auth`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-auth) crate 提供支援，並在 `crates/pumpkin/src/net/bedrock/login/` 中的基岩版登入握手期間處理。

---

## 握手流程

基岩版用戶端發起連線時，會發送一個 `SLogin` 封包，其中包含用戶端協定版本、**身分鏈**和**用戶端資料**：

1. **獲取令牌**：基岩版用戶端登入 Xbox Live，獲取由 Microsoft CA 簽名的鏈式 JSON Web Token（JWT）證書。
2. **傳輸登入資訊**：用戶端將此身分鏈和一個單獨的 `ClientData` JWT 一起打包到 `SLogin` 中。
3. **鏈驗證**：Pumpkin 遍歷證書鏈，根據 Mojang 的根公鑰驗證每個令牌的簽名，並提取玩家的 Xbox 使用者 ID（XUID）、玩家代號和臨時會話公鑰。
4. **硬體驗證**：Pumpkin 使用用戶端的臨時公鑰驗證 `ClientData` 負載，並提取幾何模型、皮膚和裝置作業系統遙測資料。
5. **會話授權**：驗證完成後，Pumpkin 發出 `CPlayStatus`（登入成功），並進入資源包協商階段。

---

## 令牌負載

### 1. 身分鏈（`Chain`）
一個 JWT 令牌陣列，構成不間斷的信任鏈：
- **根令牌**：由 Mojang 官方公共根證書頒發機構進行加密簽名。
- **中間令牌**：由 Xbox Live 服務簽發，用於驗證玩家的 Xbox Live 使用者 ID（**XUID**）和玩家代號，並為會話生成臨時 ECDSA 公鑰。
- **宣告**：包含 `extraData`，其中有 `displayName`、`identity`（UUID）、`XUID` 和 `titleId`。

### 2. 用戶端資料（`ClientData`）
一個單獨的 JWT，使用用戶端臨時私鑰簽名，該私鑰與身分鏈中的公鑰相對應：
- **硬體與環境**：`DeviceOS`、`DeviceModel`、`CurrentInputMode`、`DefaultInputMode`、`ClientRandomId`。
- **遊戲版本**：`GameVersion` 字串。
- **玩家外觀**：完整的皮膚紋理點陣圖、披風資料、幾何模型名稱和 Persona 定義。

---

## 在 `pumpkin-auth` 中驗證

Pumpkin 使用 **NIST P-384 ECDSA** 加密演算法驗證令牌簽名：

```rust
// 位於 crates/pumpkin/src/net/bedrock/login/mod.rs
match AuthPayload::verify(&jwt_payload) {
    Ok(profile) => {
        // 已成功根據 Mojang 公鑰完成驗證
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

### 線上模式與離線模式
- **線上模式**（`pumpkin.toml` 中的 `online_mode = true`）：證書鏈必須成功透過 Mojang 公鑰驗證。自簽名或未簽名的令牌會立即被拒絕。
- **離線模式**（`online_mode = false`）：Pumpkin 接受自簽名的用戶端鏈，在提取裝飾性皮膚和裝置元資料的同時生成離線 UUID。
