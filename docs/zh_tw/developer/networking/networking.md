# 網路與協定

Pumpkin 包含一個高效能網路棧，同時支援 **Minecraft：Java 版** 和 **Minecraft：基岩版**。

大多數協定定義、編解碼器和序列化邏輯位於 [`pumpkin-protocol`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-protocol) crate 中，而連線處理與遊戲封包分發位於 [`pumpkin`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net) crate 中。

> [!NOTE]
> 專用子分類中提供了詳細指南：
> - **[網路簡介](/zh_tw/developer/networking/)**
> - **Java 版**：**[架構](/zh_tw/developer/networking/java/overview)**、**[新增 Java 封包](/zh_tw/developer/networking/java/adding-packets)** 和 **[身分驗證](/zh_tw/developer/networking/java/authentication)**
> - **基岩版**：**[架構](/zh_tw/developer/networking/bedrock/overview)** 和 **[新增基岩版封包](/zh_tw/developer/networking/bedrock/adding-packets)**

---

## 方向與協定術語

- **伺服器接收（Serverbound，用戶端 → 伺服器）**：由遊戲用戶端傳送、Pumpkin 接收的封包。以 `S` 為字首（例如 `SChatMessage`、`SPlayerPosition`）。
- **用戶端接收（Clientbound，伺服器 → 用戶端）**：由 Pumpkin 傳送給遊戲用戶端的封包。以 `C` 為字首（例如 `CPlayDisconnect`、`CBlockUpdate`）。

---

## 協定狀態

Minecraft Java 協定作為一個具有五種不同狀態的有限狀態機執行：

1. **握手（Handshake）**：用戶端連線時傳送的初始封包。它指定協定版本、伺服器位址和目標下一狀態（`Status`、`Login` 或 `Transfer`）。
2. **狀態（Status）**：用於多人遊戲伺服器列表的輕量級查詢狀態（MOTD、線上玩家數、延遲 ping）。
3. **登入（Login）**：驗證玩家身份（透過 Mojang Yggdrasil 或離線模式），設定加密（AES-128/CFB8），並在啟用時啟用封包壓縮。
4. **設定（Config）**：在現代 Minecraft 版本中引入，用於在遊玩前設定用戶端設定、協商功能、資源包和伺服器連結。
5. **遊玩（Play）**：處理實體、世界區塊、物品欄互動、聊天和移動的主要遊戲狀態。

---

## 在 `pumpkin-protocol` 中定義封包

`pumpkin-protocol` 中的封包按版本（`java`、`bedrock`）、方向（`client`、`server`）和狀態（`handshake`、`status`、`login`、`config`、`play`）組織。

### 1. 用戶端接收封包（`ClientPacket`）

建立用戶端接收封包的步驟：

1. 從 `pumpkin-data` 獲取封包 ID 常量。
2. 使用 `#[java_packet(PACKET_CONSTANT)]` 標註結構。
3. 實現 `ClientPacket`，使用 `NetworkWriteExt` 將封包欄位寫入位元組流。

```rust
use std::io::Write;
use pumpkin_data::packet::clientbound::play::DISCONNECT;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ClientPacket;
use pumpkin_protocol::ser::{NetworkWriteExt, WritingError};
use pumpkin_util::text::TextComponent;
use pumpkin_util::version::JavaMinecraftVersion;

/// 在遊玩狀態下斷開玩家連線。
#[java_packet(DISCONNECT)]
pub struct CPlayDisconnect<'a> {
    pub reason: &'a TextComponent,
}

impl<'a> CPlayDisconnect<'a> {
    pub const fn new(reason: &'a TextComponent) -> Self {
        Self { reason }
    }
}

impl ClientPacket for CPlayDisconnect<'_> {
    fn write_packet_data(
        &self,
        mut write: impl Write,
        version: &JavaMinecraftVersion,
    ) -> Result<(), WritingError> {
        // 寫入針對目標用戶端版本格式化的文字元件
        write.write_component(self.reason, version)
    }
}
```

### 2. 伺服器接收封包（`ServerPacket`）

建立伺服器接收封包的步驟：

1. 從 `pumpkin-data` 獲取封包 ID 常量。
2. 使用 `#[java_packet(PACKET_CONSTANT)]` 標註結構。
3. 實現 `ServerPacket<'a>`，使用 `NetworkReadExt` 從傳入的位元組切片中讀取欄位。

```rust
use pumpkin_data::packet::serverbound::play::MOVE_PLAYER_POS;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ServerPacket;
use pumpkin_protocol::ser::{NetworkReadExt, ReadingError};
use pumpkin_util::math::vector3::Vector3;
use pumpkin_util::version::JavaMinecraftVersion;

#[java_packet(MOVE_PLAYER_POS)]
pub struct SPlayerPosition {
    pub position: Vector3<f64>,
    pub collision: u8,
}

impl<'a> ServerPacket<'a> for SPlayerPosition {
    fn read(bytebuf: &mut &'a [u8], version: &JavaMinecraftVersion) -> Result<Self, ReadingError> {
        let x = bytebuf.get_f64_be()?;
        let y = bytebuf.get_f64_be()?;
        if *version <= JavaMinecraftVersion::V_1_7_6 {
            let _stance = bytebuf.get_f64_be()?;
        }
        let z = bytebuf.get_f64_be()?;
        let collision = bytebuf.get_u8()?;

        Ok(Self {
            position: Vector3::new(x, y, z),
            collision,
        })
    }
}
```

### 實用的序列化輔助工具（`NetworkWriteExt` 和 `NetworkReadExt`）

Pumpkin 為位元組流提供了擴充 trait，用於處理標準 Minecraft 原始型別：

- `write_var_int(i32)` / `get_var_int()`：可變長度的 32 位整數。
- `write_var_long(i64)` / `get_var_long()`：可變長度的 64 位整數。
- `write_string(&str)` / `get_string()`：以 VarInt 長度為字首的 UTF-8 字串。
- `write_uuid(&Uuid)` / `get_uuid()`：128 位玩家或實體 UUID。
- `write_component(&TextComponent)`：序列化格式化的聊天/UI 文字。
- `write_nbt(&NBTTag)` / `get_nbt()`：序列化/反序列化二進位 NBT 標籤。

---

## `pumpkin` 中的封包流與處理

傳入封包會經過以下幾個階段，然後才會修改遊戲狀態：

1. **幀解碼**：Tokio TCP 流解碼 VarInt 長度字首，並在啟用加密時解密幀。
2. **事件攔截**：向已註冊的插件發出 `PacketReceivedEvent`。如果事件被取消，封包會立即被丟棄。
3. **版本感知分發**：根據用戶端協商的協定版本對映線路封包 ID。
4. **狀態處理**：將解析後的封包結構路由到對應的處理函式（例如 `handle_play_packet`）。
5. **狀態變更**：修改玩家會話、世界區塊或實體狀態。

### 1. `Client` 與 `Player`

Pumpkin 嚴格區分遊玩前的連線和活躍玩家：

- **`Client`**：表示處於 `Handshake`、`Status`、`Login` 或 `Config` 狀態的連線。它是輕量級的，不關聯世界，也沒有物理實體。在 `crates/pumpkin/src/net/java/mod.rs` 中處理。
- **`Player`**：表示 `Play` 狀態下活躍 `World` 中的生物實體。儲存物品欄、生命值、速度和區塊訂閱佇列。在 `crates/pumpkin/src/entity/player/` 中處理。

### 2. 封包分發（`handle_play_packet`）

在 `crates/pumpkin/src/net/java/mod.rs` 中，透過匹配特定版本的封包 ID 來分發封包：

```rust
pub fn handle_play_packet(
    &self,
    player: &Arc<Player>,
    server: &Arc<Server>,
    packet: &RawPacket,
) -> Result<(), Box<dyn PumpkinError>> {
    let version = self.version.load();

    // 觸發插件事件，允許插件觀察或取消封包
    let mut event = PacketReceivedEvent::new(player.clone(), packet.id, packet.payload.clone());
    server.plugin_manager.fire_blocking(server, &mut event);
    if event.cancelled {
        return Ok(());
    }

    let mut payload = &event.payload[..];
    match event.packet_id {
        id if id == SConfirmTeleport::to_id(version) => {
            self.handle_confirm_teleport(player, &SConfirmTeleport::read(&mut payload, &version)?);
        }
        id if id == SChatCommand::to_id(version) => {
            let packet = SChatCommand::read(&mut payload, &version)?;
            self.handle_chat_command(player, server, &packet);
        }
        id if id == SPlayerPosition::to_id(version) => {
            let packet = SPlayerPosition::read(&mut payload, &version)?;
            self.handle_player_position(player, &packet);
        }
        _ => {
            trace!("Unhandled play packet id: {:#04x}", event.packet_id);
        }
    }
    Ok(())
}
```

### 3. 傳送封包

向用戶端傳送封包：

```rust
// 直接傳送給單個玩家
player.client.send_packet(&CPlayDisconnect::new(&reason));

// 廣播給世界中附近的玩家
world.broadcast_packet_except(
    &[player.gameprofile.id],
    &CBlockUpdate::new(block_pos, block_id),
).await;
```

---

## 壓縮與加密

- **壓縮**：用戶端透過登入狀態後，如果 `pumpkin.toml` 中啟用了 `compression_threshold`，超過閾值大小的封包將使用 ZLib/fast 壓縮。
- **加密**：線上上模式下，登入狀態中交換共享金鑰後，會立即啟用 128 位 AES/CFB8 加密。
