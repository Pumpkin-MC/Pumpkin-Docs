# 新增 Java 版封包

本指南將介紹如何在 Pumpkin 中實現、序列化、分發和傳送新的 Java 版封包。

---

## 命名約定

為保持整個程式碼庫中封包定義的一致性，請遵循以下命名約定：

- **用戶端接收封包**（伺服器 → 用戶端）必須以 **`C`** 開頭（例如 `CBlockUpdate`、`CPlayDisconnect`）。
- **伺服器接收封包**（用戶端 → 伺服器）必須以 **`S`** 開頭（例如 `SChatCommand`、`SPlayerPosition`）。
- 如果一個封包存在於多個狀態中，請在封包操作前新增狀態名稱作為字首（例如 `CLoginDisconnect`、`CConfigDisconnect` 和 `CPlayDisconnect`）。

---

## 第 1 步：在 `pumpkin-data` 中查詢封包 ID

所有受支援 Minecraft 版本的封包 ID 都維護在 `pumpkin-data` 中。匯入相應的常量：

```rust
// 用戶端接收的遊玩狀態斷開連線封包
use pumpkin_data::packet::clientbound::play::DISCONNECT;

// 伺服器接收的遊玩狀態玩家位置封包
use pumpkin_data::packet::serverbound::play::MOVE_PLAYER_POS;
```

---

## 第 2 步：實現用戶端接收封包

用戶端接收封包由 Pumpkin 傳送給 Minecraft 用戶端。它們實現 `pumpkin-protocol` 中的 `ClientPacket` trait。

### 1. 建立結構檔案
將檔案放在 `crates/pumpkin-protocol/src/java/client/<state>/<packet_name>.rs`（例如 `play/disconnect.rs`）：

```rust
use std::io::Write;
use pumpkin_data::packet::clientbound::play::DISCONNECT;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ClientPacket;
use pumpkin_protocol::ser::{NetworkWriteExt, WritingError};
use pumpkin_util::text::TextComponent;
use pumpkin_util::version::JavaMinecraftVersion;

/// 在遊玩狀態下向玩家顯示包含訊息的斷開連線介面。
#[java_packet(DISCONNECT)]
pub struct CPlayDisconnect<'a> {
    pub reason: &'a TextComponent,
}

impl<'a> CPlayDisconnect<'a> {
    #[must_use]
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
        // 使用 NetworkWriteExt 方法序列化欄位
        write.write_component(self.reason, version)
    }
}
```

### 2. 匯出模組
在 `crates/pumpkin-protocol/src/java/client/<state>/mod.rs` 中：

```rust
mod disconnect;
pub use disconnect::*;
```

---

## 第 3 步：實現伺服器接收封包

伺服器接收封包由 Pumpkin 從遊戲用戶端接收。它們實現 `pumpkin-protocol` 中的 `ServerPacket` trait。

### 1. 建立結構檔案
將檔案放在 `crates/pumpkin-protocol/src/java/server/<state>/<packet_name>.rs`（例如 `play/player_position.rs`）：

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

        // 如有必要，處理特定版本的欄位
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

### 2. 匯出模組
在 `crates/pumpkin-protocol/src/java/server/<state>/mod.rs` 中：

```rust
mod player_position;
pub use player_position::*;
```

---

## 第 4 步：網路編解碼擴充輔助工具

`NetworkWriteExt` 和 `NetworkReadExt` 為標準 Minecraft 型別提供了輔助方法：

| 資料型別 | 讀取方法 | 寫入方法 |
| :--- | :--- | :--- |
| **`VarInt`** | `bytebuf.get_var_int()?` | `write.write_var_int(val)?` |
| **`VarLong`** | `bytebuf.get_var_long()?` | `write.write_var_long(val)?` |
| **`String`** | `bytebuf.get_string()?` | `write.write_string(val)?` |
| **`UUID`** | `bytebuf.get_uuid()?` | `write.write_uuid(&val)?` |
| **`TextComponent`** | `bytebuf.get_component()?` | `write.write_component(val, version)?` |
| **`Position`** | `bytebuf.get_block_pos()?` | `write.write_block_pos(val)?` |
| **`NBT`** | `bytebuf.get_nbt()?` | `write.write_nbt(&val)?` |

---

## 第 5 步：在 `pumpkin` 中處理傳入封包

傳入的伺服器接收封包必須在 `crates/pumpkin/src/net/java/` 中相應的狀態處理函數里處理。

對於**遊玩狀態**中的封包，開啟 `crates/pumpkin/src/net/java/mod.rs` 並更新 `handle_play_packet`：

```rust
// 位於 crates/pumpkin/src/net/java/mod.rs
pub fn handle_play_packet(
    &self,
    player: &Arc<Player>,
    server: &Arc<Server>,
    packet: &RawPacket,
) -> Result<(), Box<dyn PumpkinError>> {
    let version = self.version.load();
    let mut payload = &packet.payload[..];

    match packet.id {
        // 匹配特定版本的封包 ID
        id if id == SPlayerPosition::to_id(version) => {
            let packet = SPlayerPosition::read(&mut payload, &version)?;
            self.handle_player_position(player, &packet);
        }
        _ => {}
    }
    Ok(())
}
```

然後實現處理函式：

```rust
impl JavaClient {
    pub fn handle_player_position(&self, player: &Arc<Player>, packet: &SPlayerPosition) {
        // 驗證座標、更新玩家位置、檢查碰撞
        player.set_position(packet.position);
    }
}
```

---

## 第 6 步：傳送傳出封包

向玩家傳送用戶端接收封包：

```rust
// 1. 直接傳送到玩家的連線
player.client.send_packet(&CPlayDisconnect::new(&reason));

// 2. 廣播給所有正在觀察該區塊的玩家
world.broadcast_packet_except(
    &[player.gameprofile.id],
    &CBlockUpdate::new(block_pos, block_id),
).await;
```
