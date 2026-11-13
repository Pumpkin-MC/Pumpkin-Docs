# NetherNet WebRTC 傳輸

**NetherNet** 是 Mojang 為 Minecraft：基岩版設計的現代 WebRTC 傳輸協定。NetherNet 專為高韌性的點對點和中繼通訊而設計，可實現無縫的跨平臺多人遊戲（流動裝置、主機、桌面端），無需伺服器運營者或玩家設定路由器端口轉發。

Pumpkin 在 [`crates/pumpkin/src/net/bedrock/nethernet.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/bedrock/nethernet.rs) 中提供了原生、零依賴的 NetherNet 實現。

---

## 架構層

| 層 | 實現 | 職責 |
| :--- | :--- | :--- |
| **HTTP 信令** | Axum HTTP Router（`ice_router.rs`） | 處理 SDP Offer（`POST /offer`）、SDP Answer（`GET /answer`）和 ICE Candidates（`POST /candidate`） |
| **NAT 穿透** | ICE Agent | 協調 STUN/TURN 綁定發現和打洞 |
| **傳輸安全** | DTLS 握手 | 生成臨時會話金鑰，並使用 ECDSA P-384 金鑰保護 WebRTC 傳輸 |
| **資料傳輸** | WebRTC DataChannels | 無序/有序封包通道，將標準基岩版遊戲批次流式傳輸到分發器 |

---

## Pumpkin 中的核心元件

Pumpkin 的 NetherNet 子系統分為四個獨立模組：

### 1. 加密身份（`nethernet-key.der`）
- Pumpkin 生成並載入 **NIST P-384 ECDSA 私鑰**（`nethernet-key.der`）。
- 用於對會話描述（SDP offer 和 answer）進行加密簽名，向連線的客戶端驗證伺服器身份。
- 使用標準 PKCS#8 DER 格式編碼。

### 2. HTTP 信令路由器（`ice_router.rs`）
信令透過 [Axum](https://github.com/tokio-rs/axum) 路由器以 HTTP 處理：

- **`POST /offer`**：客戶端提交 SDP offer，描述其 WebRTC 編解碼器、傳輸設定檔案和網絡界面。
- **`GET /answer`**：Pumpkin 生成相應的本地 SDP answer，其中包含其協商的能力。
- **`POST /candidate`**：兩端交換 trickle ICE candidates，以發現最快的直接網絡路徑（host、server-reflexive 或 relay）。

### 3. 本地網絡發現（`discovery.rs`）
- 透過 UDP 組播在本地子網上監聽並廣播可用性。
- 允許同一 Wi-Fi 或 LAN 上的基岩版客戶端自動發現並連線 Pumpkin 伺服器，無需輸入 IP 位址。

### 4. DataChannel 封包流式傳輸
- 當 WebRTC 對等連線轉換到 `Connected` 狀態後，會開啟一個有序、可靠的 **WebRTC DataChannel**。
- 基岩版批處理封包（`0xfe`）透過 DataChannel 雙向傳輸，直接進入 Pumpkin 的 `incoming_game_packet_send` 通道。

---

## 在 `pumpkin.toml` 中設定

NetherNet 在 `pumpkin.toml` 的 `[networking.bedrock.nethernet]` 下設定：

```toml
[networking.bedrock]
enabled = true
address = "0.0.0.0:19132"

[networking.bedrock.nethernet]
enabled = true
signaling_address = "0.0.0.0:19133"
ice_servers = [
    "stun:stun.l.google.com:19302"
]
```
