# 基岩版网络概述

Pumpkin 原生支持 **Minecraft：基岩版** 客户端（iOS、Android、Windows、Xbox、PlayStation、Switch）。

基岩版协议结构和线路编解码器位于 `pumpkin-protocol::bedrock`，而连接管理和游戏处理函数位于 `pumpkin::net::bedrock`。

---

## 传输层：RakNet 和 NetherNet

与仅通过 TCP 流通信的 Java 版不同，基岩版通过 UDP 运行，主要使用两种传输层：

1. **RakNet（端口 19132）**：
   - 最初由 Jenkins Software 开发的可靠、有序 UDP 网络库。
   - 提供连接握手、数据包确认（ACK/NACK）、MTU 协商，以及针对大于网络 MTU 的负载的数据包拆分。
2. **NetherNet**：
   - 现代基岩版使用的现代点对点和中继传输协议。
   - 通过 `crates/pumpkin/src/net/bedrock/nethernet.rs` 集成到 Pumpkin 中。

---

## 数据包分帧与批处理（`0xfe`）

基岩版不会直接通过网络发送单个游戏数据包，而是将多个游戏数据包捆绑到一个**批处理数据包**中：

1. **标头字节**：每个基岩版游戏数据包批次都以 `0xfe` 开头。
2. **压缩**：超过协商阈值时，`0xfe` 后面的负载会使用 **Deflate**（或 ZLib）压缩。
3. **子数据包分帧**：解压后，批次包含一个或多个顺序排列的游戏数据包，每个数据包都以 `VarUInt` 编码的长度为前缀。

在 Pumpkin 中，批次解码和组装由 `crates/pumpkin-protocol/src/bedrock/` 中的 `BedrockBatchDecoder` 和 `BedrockBatchEncoder` 管理。

---

## 连接生命周期与状态推进

基岩版不像 Java 版那样具有显式的协议状态，而是遵循严格的数据包顺序：

| 步骤 | 交换的数据包 | 用途 |
| :--- | :--- | :--- |
| **1. 网络设置** | `SRequestNetworkSettings` -> `CNetworkSettings` | 协商压缩算法（Deflate/Snappy）和负载阈值 |
| **2. 身份验证** | `SLogin` -> `CPlayStatus` | 传输 JWT 身份链和客户端硬件数据；验证 Xbox Live 令牌 |
| **3. 资源协商** | `CResourcePacksInfo` -> `SResourcePackClientResponse` | 协商服务器资源包和下载行为 |
| **4. 世界初始化** | `CStartGame` + `CItemRegistry` + `CCreativeContent` | 传输世界生成位置、维度设置、玩家实体运行时 ID 和物品调色板 |
| **5. 准备生成** | `SSetLocalPlayerAsInitialized` -> `CPlayStatus` | 表示客户端加载完成，并转换到活跃的游戏内游玩状态 |

---

## `pumpkin` 中的数据包分发

在 `crates/pumpkin/src/net/bedrock/mod.rs` 中，解压后的子数据包会根据其数字数据包 ID 进行分发：

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

## 身份验证与 NetherNet

- **JWT 身份验证**：基岩版通过由 Microsoft / Xbox Live 根机构签名的证书链来验证玩家身份。
- **NetherNet WebRTC**：使用 WebRTC DataChannels、ICE NAT 穿透和 P-384 ECDSA 密钥的高性能点对点传输。

完整的实现细节请参阅 **[基岩版身份验证与 NetherNet](/zh_cn/developer/networking/bedrock/authentication)**。
