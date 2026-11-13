# 新增基岩版封包

本指南介紹如何在 Pumpkin 中實現、編碼、解碼和處理新的 Minecraft：基岩版封包。

---

## 命名約定

- **用戶端接收封包**（伺服器 → 用戶端）必須以 **`C`** 開頭（例如 `CChunkRadiusUpdated`、`CContainerOpen`）。
- **伺服器接收封包**（用戶端 → 伺服器）必須以 **`S`** 開頭（例如 `SRequestChunkRadius`、`SPlayerAction`）。

---

## 第 1 步：確定封包 ID

在基岩版協定中，封包 ID 是由 Mojang 分配的固定整數常量。請透過官方協定文件或網路封包跟蹤確認數字 ID。

例如：
- `Disconnect` 封包 ID：`5`
- `RequestChunkRadius` 封包 ID：`69`

---

## 第 2 步：實現用戶端接收封包

用戶端接收封包實現 `pumpkin-protocol::serial` 中的 `PacketWrite` trait。

### 1. 建立封包檔案
將檔案放在 `crates/pumpkin-protocol/src/bedrock/client/<packet_name>.rs`：

```rust
use std::io::{Error, Write};
use pumpkin_macros::packet;
use crate::{codec::var_int::VarInt, serial::PacketWrite};

#[packet(5)]
pub struct CDisconnect {
    pub reason: VarInt,
    pub skip_message: bool,
    pub message: String,
    pub filtered_message: String,
}

impl CDisconnect {
    #[must_use]
    pub const fn new(reason: i32, message: String) -> Self {
        Self {
            reason: VarInt(reason),
            skip_message: message.is_empty(),
            message,
            filtered_message: String::new(),
        }
    }
}

impl PacketWrite for CDisconnect {
    fn write<W: Write>(&self, writer: &mut W) -> Result<(), Error> {
        self.reason.write(writer)?;
        self.skip_message.write(writer)?;
        if !self.skip_message {
            self.message.write(writer)?;
            self.filtered_message.write(writer)?;
        }
        Ok(())
    }
}
```

### 2. 匯出模組
在 `crates/pumpkin-protocol/src/bedrock/client/mod.rs` 中：

```rust
pub mod disconnect;
pub use disconnect::*;
```

---

## 第 3 步：實現伺服器接收封包

伺服器接收封包實現 `PacketRead` trait。當欄位實現 `PacketRead` 時，Pumpkin 提供過程派生巨集 `#[derive(PacketRead)]` 用於自動反序列化。

### 1. 建立封包檔案
將檔案放在 `crates/pumpkin-protocol/src/bedrock/server/<packet_name>.rs`：

```rust
use pumpkin_macros::packet;
use crate::{codec::var_int::VarInt, serial::PacketRead};

#[derive(PacketRead, Debug)]
#[packet(69)]
pub struct SRequestChunkRadius {
    pub chunk_radius: VarInt,
    pub max_chunk_radius: u8,
}
```

如果封包需要自訂解析邏輯，請手動實現 `PacketRead`：

```rust
use std::io::{Error, Read};
use crate::serial::PacketRead;

impl PacketRead for SMyCustomPacket {
    fn read<R: Read>(reader: &mut R) -> Result<Self, Error> {
        let chunk_radius = VarInt::read(reader)?;
        let max_chunk_radius = u8::read(reader)?;
        Ok(Self { chunk_radius, max_chunk_radius })
    }
}
```

### 2. 匯出模組
在 `crates/pumpkin-protocol/src/bedrock/server/mod.rs` 中：

```rust
pub mod request_chunk_radius;
pub use request_chunk_radius::*;
```

---

## 第 4 步：在 `pumpkin` 中分發傳入封包

傳入封包在 `crates/pumpkin/src/net/bedrock/mod.rs` 中分發：

```rust
// 位於 BedrockClient::handle_game_packet 內
match packet.id {
    SRequestChunkRadius::PACKET_ID => {
        let packet = SRequestChunkRadius::read(reader)?;
        self.handle_request_chunk_radius(player, &packet);
    }
    _ => {}
}
```

---

## 第 5 步：實現處理函式

在 `crates/pumpkin/src/net/bedrock/play/<packet_name>.rs` 中實現處理邏輯：

```rust
use super::*;
use pumpkin_protocol::bedrock::server::request_chunk_radius::SRequestChunkRadius;

impl BedrockClient {
    pub fn handle_request_chunk_radius(&self, player: &Arc<Player>, packet: &SRequestChunkRadius) {
        let requested_radius = packet.chunk_radius.0;

        // 將視距限制在伺服器設定範圍內
        let clamped = requested_radius.clamp(2, 16);

        // 通知用戶端視野半徑已被接受
        self.try_enqueue_client_packet(&CChunkRadiusUpdated {
            chunk_radius: VarInt(clamped),
        });
    }
}
```

記得在 `crates/pumpkin/src/net/bedrock/play/mod.rs` 中註冊新模組：

```rust
pub mod request_chunk_radius;
```

---

## 第 6 步：傳送傳出封包

向已連線的用戶端傳送基岩版封包：

```rust
// 將封包加入用戶端的傳出批次佇列
self.try_enqueue_client_packet(&CChunkRadiusUpdated {
    chunk_radius: VarInt(view_distance),
});
```

批處理封包會自動壓縮，使用 `0xfe` 分幀，並透過 RakNet/NetherNet 通訊端傳輸。
