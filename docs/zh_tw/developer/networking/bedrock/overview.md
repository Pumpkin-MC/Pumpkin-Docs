# 基岩版網路概述

Pumpkin 原生支援 **Minecraft：基岩版** 用戶端（iOS、Android、Windows、Xbox、PlayStation、Switch）。

基岩版協定結構和線路編解碼器位於 `pumpkin-protocol::bedrock`，而連線管理和遊戲處理函式位於 `pumpkin::net::bedrock`。

---

## 傳輸層：RakNet 和 NetherNet

與僅透過 TCP 流通訊的 Java 版不同，基岩版透過 UDP 執行，主要使用兩種傳輸層：

1. **RakNet（埠 19132）**：
   - 最初由 Jenkins Software 開發的可靠、有序 UDP 網路庫。
   - 提供連線握手、封包確認（ACK/NACK）、MTU 協商，以及針對大於網路 MTU 的負載的封包拆分。
2. **NetherNet**：
   - 現代基岩版使用的現代點對點和中繼傳輸協定。
   - 透過 `crates/pumpkin/src/net/bedrock/nethernet.rs` 整合到 Pumpkin 中。

---

## 封包分幀與批處理（`0xfe`）

基岩版不會直接透過網路傳送單個遊戲封包，而是將多個遊戲封包捆綁到一個**批處理封包**中：

1. **標頭位元組**：每個基岩版遊戲封包批次都以 `0xfe` 開頭。
2. **壓縮**：超過協商閾值時，`0xfe` 後面的負載會使用 **Deflate**（或 ZLib）壓縮。
3. **子封包分幀**：解壓後，批次包含一個或多個順序排列的遊戲封包，每個封包都以 `VarUInt` 編碼的長度為字首。

在 Pumpkin 中，批次解碼和組裝由 `crates/pumpkin-protocol/src/bedrock/` 中的 `BedrockBatchDecoder` 和 `BedrockBatchEncoder` 管理。

---

## 連線生命週期與狀態推進

基岩版不像 Java 版那樣具有顯式的協定狀態，而是遵循嚴格的封包順序：

| 步驟 | 交換的封包 | 用途 |
| :--- | :--- | :--- |
| **1. 網路設定** | `SRequestNetworkSettings` -> `CNetworkSettings` | 協商壓縮演算法（Deflate/Snappy）和負載閾值 |
| **2. 身分驗證** | `SLogin` -> `CPlayStatus` | 傳輸 JWT 身份鏈和用戶端硬體資料；驗證 Xbox Live 令牌 |
| **3. 資源協商** | `CResourcePacksInfo` -> `SResourcePackClientResponse` | 協商伺服器資源包和下載行為 |
| **4. 世界初始化** | `CStartGame` + `CItemRegistry` + `CCreativeContent` | 傳輸世界生成位置、維度設定、玩家實體執行階段 ID 和物品調色盤 |
| **5. 準備生成** | `SSetLocalPlayerAsInitialized` -> `CPlayStatus` | 表示用戶端載入完成，並轉換到活躍的遊戲內遊玩狀態 |

---

## `pumpkin` 中的封包分發

在 `crates/pumpkin/src/net/bedrock/mod.rs` 中，解壓後的子封包會根據其數字封包 ID 進行分發：

```rust
match packet.id {
    SPlayerAuthInput::PACKET_ID => {
        let packet = SPlayerAuthInput::read(reader)?;
        self.handle_player_auth_input(player, packet, server);
    }
    SRequestChunkRadius::PACKET_ID => {
        let packet = SRequestChunkRadius::read(reader)?;
        self.handle_request_chunk_radius(player, &packet);
    }
    SInventoryTransaction::PACKET_ID => {
        let packet = SInventoryTransaction::read(reader)?;
        self.handle_inventory_action(player, packet);
    }
    _ => {
        trace!("Unhandled Bedrock packet ID: {}", packet.id);
    }
}
```

---

## 身分驗證與 NetherNet

- **JWT 身分驗證**：基岩版透過由 Microsoft / Xbox Live 根機構簽名的證書鏈來驗證玩家身份。
- **NetherNet WebRTC**：使用 WebRTC DataChannels、ICE NAT 穿透和 P-384 ECDSA 金鑰的高效能點對點傳輸。

完整的實現細節請參閱 **[基岩版身分驗證與 NetherNet](/zh_tw/developer/networking/bedrock/authentication)**。
