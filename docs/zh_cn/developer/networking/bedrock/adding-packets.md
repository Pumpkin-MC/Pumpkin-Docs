# 添加基岩版数据包

本指南介绍如何在 Pumpkin 中实现、编码、解码和处理新的 Minecraft：基岩版数据包。

---

## 命名约定

- **客户端接收数据包**（服务器 → 客户端）必须以 **`C`** 开头（例如 `CChunkRadiusUpdated`、`CContainerOpen`）。
- **服务器接收数据包**（客户端 → 服务器）必须以 **`S`** 开头（例如 `SRequestChunkRadius`、`SPlayerAction`）。

---

## 第 1 步：确定数据包 ID

在基岩版协议中，数据包 ID 是由 Mojang 分配的固定整数常量。请通过官方协议文档或网络数据包跟踪确认数字 ID。

例如：
- `Disconnect` 数据包 ID：`5`
- `RequestChunkRadius` 数据包 ID：`69`

---

## 第 2 步：实现客户端接收数据包

客户端接收数据包实现 `pumpkin-protocol::serial` 中的 `PacketWrite` trait。

### 1. 创建数据包文件
将文件放在 `crates/pumpkin-protocol/src/bedrock/client/<packet_name>.rs`：

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

### 2. 导出模块
在 `crates/pumpkin-protocol/src/bedrock/client/mod.rs` 中：

```rust
pub mod disconnect;
pub use disconnect::*;
```

---

## 第 3 步：实现服务器接收数据包

服务器接收数据包实现 `PacketRead` trait。当字段实现 `PacketRead` 时，Pumpkin 提供过程派生宏 `#[derive(PacketRead)]` 用于自动反序列化。

### 1. 创建数据包文件
将文件放在 `crates/pumpkin-protocol/src/bedrock/server/<packet_name>.rs`：

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

如果数据包需要自定义解析逻辑，请手动实现 `PacketRead`：

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

### 2. 导出模块
在 `crates/pumpkin-protocol/src/bedrock/server/mod.rs` 中：

```rust
pub mod request_chunk_radius;
pub use request_chunk_radius::*;
```

---

## 第 4 步：在 `pumpkin` 中分发传入数据包

传入数据包在 `crates/pumpkin/src/net/bedrock/mod.rs` 中分发：

```rust
// 位于 BedrockClient::handle_game_packet 内
match packet.id {
    SRequestChunkRadius::PACKET_ID => {
        let packet = SRequestChunkRadius::read(reader)?;
        self.handle_request_chunk_radius(player, &packet);
    }
    _ => {}
}
```

---

## 第 5 步：实现处理函数

在 `crates/pumpkin/src/net/bedrock/play/<packet_name>.rs` 中实现处理逻辑：

```rust
use super::*;
use pumpkin_protocol::bedrock::server::request_chunk_radius::SRequestChunkRadius;

impl BedrockClient {
    pub fn handle_request_chunk_radius(&self, player: &Arc<Player>, packet: &SRequestChunkRadius) {
        let requested_radius = packet.chunk_radius.0;

        // 将视距限制在服务器配置范围内
        let clamped = requested_radius.clamp(2, 16);

        // 通知客户端视野半径已被接受
        self.try_enqueue_client_packet(&CChunkRadiusUpdated {
            chunk_radius: VarInt(clamped),
        });
    }
}
```

记得在 `crates/pumpkin/src/net/bedrock/play/mod.rs` 中注册新模块：

```rust
pub mod request_chunk_radius;
```

---

## 第 6 步：发送传出数据包

向已连接的客户端发送基岩版数据包：

```rust
// 将数据包加入客户端的传出批次队列
self.try_enqueue_client_packet(&CChunkRadiusUpdated {
    chunk_radius: VarInt(view_distance),
});
```

批处理数据包会自动压缩，使用 `0xfe` 分帧，并通过 RakNet/NetherNet 套接字传输。
