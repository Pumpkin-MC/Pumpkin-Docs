# 網路概述

Pumpkin 採用高效能的非同步網路棧，能夠同時為 **Minecraft：Java 版** 和 **Minecraft：基岩版** 用戶端提供服務。

所有協定定義、序列化 trait 和線路級編解碼器都隔離在 [`pumpkin-protocol`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-protocol) crate 中，而用戶端連線管理、會話狀態機和遊戲封包分發則由 [`pumpkin/src/net`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net) 管理。

---

## 支援的版本

由於 Java 版和基岩版在傳輸層、封包編碼和狀態模型上存在根本差異，Pumpkin 將兩者的網路實現分開：

| 功能 | Minecraft：Java 版 | Minecraft：基岩版 |
| :--- | :--- | :--- |
| **傳輸層** | TCP 通訊端流 | 透過 RakNet 和 NetherNet 使用 UDP |
| **幀封裝** | 以 VarInt 長度為字首的幀 | 封裝在 `0xfe` 標頭中的批處理封包 |
| **加密** | AES-128 / CFB8 流密碼 | 加密會話握手 |
| **壓縮** | 逐封包進行 ZLib 壓縮（超過可設定閾值時） | 逐批次進行 Deflate / ZLib 壓縮 |
| **狀態模型** | 顯式狀態：握手、狀態、登入、設定、遊玩 | 由封包驅動的狀態推進 |
| **協定 Crate** | `pumpkin-protocol::java` | `pumpkin-protocol::bedrock` |
| **伺服器網路模組** | `pumpkin::net::java` | `pumpkin::net::bedrock` |

---

## 網路架構

網路處理流程會先透過專用的傳輸層和編解碼層處理傳入連線，再將其交由統一的伺服器遊戲迴圈：

1. **傳輸監聽器**：獨立的監聽器分別綁定到對應埠——Java 版使用 Tokio TCP（`:25565`），基岩版使用 UDP/RakNet/NetherNet（`:19132`）。
2. **會話抽象**：每個接受的連線都會生成一個獨立的會話任務（`JavaClient` 或 `BedrockClient`），負責管理線路幀封裝和加密。
3. **編解碼器反序列化**：透過 `pumpkin-protocol::java`（`ClientPacket`/`ServerPacket`）和 `pumpkin-protocol::bedrock`（`PacketWrite`/`PacketRead`），將線路位元組反序列化為強型別封包結構。
4. **統一的遊戲分發**：解碼後的封包被分發到統一的遊戲迴圈中，用於更新玩家實體狀態並流式傳輸世界區塊。

---

## 瀏覽網路文件

查閱各版本的文件：

- **[實體元資料與同步資料](/zh_tw/developer/networking/metadata)**：同步實體的視覺狀態（Java 版中的 DataWatchers，基岩版中的 Actor Data）。
- **[Java 版](/zh_tw/developer/networking/java/overview)**：
  - **[架構與生命週期](/zh_tw/developer/networking/java/overview)**：狀態機、`JavaClient` 與 `Player` 的區別，以及多版本協商。
  - **[如何新增封包](/zh_tw/developer/networking/java/adding-packets)**：定義、序列化和分發 Java 版封包的指南。
  - **[身分驗證](/zh_tw/developer/networking/java/authentication)**：Mojang Yggdrasil 驗證、GameProfile 和代理轉發。
- **[基岩版](/zh_tw/developer/networking/bedrock/overview)**：
  - **[架構與傳輸](/zh_tw/developer/networking/bedrock/overview)**：RakNet 和 NetherNet 整合、批處理以及會話處理。
  - **[如何新增封包](/zh_tw/developer/networking/bedrock/adding-packets)**：定義和處理基岩版封包的指南。
  - **[身分驗證與 NetherNet](/zh_tw/developer/networking/bedrock/authentication)**：JWT 證書鏈驗證、WebRTC DataChannels、P-384 金鑰和信令。
- **[RCON](/zh_tw/developer/networking/rcon)**：用於行政管理的 Valve 遠端主控台協定實現。
