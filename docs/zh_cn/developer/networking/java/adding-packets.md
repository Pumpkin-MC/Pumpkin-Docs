# 添加 Java 版数据包

本指南将介绍如何在 Pumpkin 中实现、序列化、分发和发送新的 Java 版数据包。

---

## 命名约定

为保持整个代码库中数据包定义的一致性，请遵循以下命名约定：

- **客户端接收数据包**（服务器 → 客户端）必须以 **`C`** 开头（例如 `CBlockUpdate`、`CPlayDisconnect`）。
- **服务器接收数据包**（客户端 → 服务器）必须以 **`S`** 开头（例如 `SChatCommand`、`SPlayerPosition`）。
- 如果一个数据包存在于多个状态中，请在数据包操作前添加状态名称作为前缀（例如 `CLoginDisconnect`、`CConfigDisconnect` 和 `CPlayDisconnect`）。

---

## 第 1 步：在 `pumpkin-data` 中查找数据包 ID

所有受支持 Minecraft 版本的数据包 ID 都维护在 `pumpkin-data` 中。导入相应的常量：

```rust
// 客户端接收的游玩状态断开连接数据包
use pumpkin_data::packet::clientbound::play::DISCONNECT;

// 服务器接收的游玩状态玩家位置数据包
use pumpkin_data::packet::serverbound::play::MOVE_PLAYER_POS;
```

---

## 第 2 步：实现客户端接收数据包

客户端接收数据包由 Pumpkin 发送给 Minecraft 客户端。它们实现 `pumpkin-protocol` 中的 `ClientPacket` trait。

### 1. 创建结构体文件
将文件放在 `crates/pumpkin-protocol/src/java/client/<state>/<packet_name>.rs`（例如 `play/disconnect.rs`）：

```rust
use std::io::Write;
use pumpkin_data::packet::clientbound::play::DISCONNECT;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ClientPacket;
use pumpkin_protocol::ser::{NetworkWriteExt, WritingError};
use pumpkin_util::text::TextComponent;
use pumpkin_util::version::JavaMinecraftVersion;

/// 在游玩状态下向玩家显示包含消息的断开连接界面。
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
        // 使用 NetworkWriteExt 方法序列化字段
        write.write_component(self.reason, version)
    }
}
```

### 2. 导出模块
在 `crates/pumpkin-protocol/src/java/client/<state>/mod.rs` 中：

```rust
mod disconnect;
pub use disconnect::*;
```

---

## 第 3 步：实现服务器接收数据包

服务器接收数据包由 Pumpkin 从游戏客户端接收。它们实现 `pumpkin-protocol` 中的 `ServerPacket` trait。

### 1. 创建结构体文件
将文件放在 `crates/pumpkin-protocol/src/java/server/<state>/<packet_name>.rs`（例如 `play/player_position.rs`）：

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

        // 如有必要，处理特定版本的字段
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

### 2. 导出模块
在 `crates/pumpkin-protocol/src/java/server/<state>/mod.rs` 中：

```rust
mod player_position;
pub use player_position::*;
```

---

## 第 4 步：网络编解码扩展辅助工具

`NetworkWriteExt` 和 `NetworkReadExt` 为标准 Minecraft 类型提供了辅助方法：

| 数据类型 | 读取方法 | 写入方法 |
| :--- | :--- | :--- |
| **`VarInt`** | `bytebuf.get_var_int()?` | `write.write_var_int(val)?` |
| **`VarLong`** | `bytebuf.get_var_long()?` | `write.write_var_long(val)?` |
| **`String`** | `bytebuf.get_string()?` | `write.write_string(val)?` |
| **`UUID`** | `bytebuf.get_uuid()?` | `write.write_uuid(&val)?` |
| **`TextComponent`** | `bytebuf.get_component()?` | `write.write_component(val, version)?` |
| **`Position`** | `bytebuf.get_block_pos()?` | `write.write_block_pos(val)?` |
| **`NBT`** | `bytebuf.get_nbt()?` | `write.write_nbt(&val)?` |

---

## 第 5 步：在 `pumpkin` 中处理传入数据包

传入的服务器接收数据包必须在 `crates/pumpkin/src/net/java/` 中相应的状态处理函数里处理。

对于**游玩状态**中的数据包，打开 `crates/pumpkin/src/net/java/mod.rs` 并更新 `handle_play_packet`：

```rust
// 位于 crates/pumpkin/src/net/java/mod.rs
pub fn handle_play_packet(
    &self,
    player: &Arc<Player>,
    server: &Arc<Server>,
    packet: &RawPacket,
) -> Result<(), Box<dyn PumpkinError>> {
    let version = self.version.load();
    let mut payload = &packet.payload[..];

    match packet.id {
        // 匹配特定版本的数据包 ID
        id if id == SPlayerPosition::to_id(version) => {
            let packet = SPlayerPosition::read(&mut payload, &version)?;
            self.handle_player_position(player, &packet);
        }
        _ => {}
    }
    Ok(())
}
```

然后实现处理函数：

```rust
impl JavaClient {
    pub fn handle_player_position(&self, player: &Arc<Player>, packet: &SPlayerPosition) {
        // 验证坐标、更新玩家位置、检查碰撞
        player.set_position(packet.position);
    }
}
```

---

## 第 6 步：发送传出数据包

向玩家发送客户端接收数据包：

```rust
// 1. 直接发送到玩家的连接
player.client.send_packet(&CPlayDisconnect::new(&reason));

// 2. 广播给所有正在观察该区块的玩家
world.broadcast_packet_except(
    &[player.gameprofile.id],
    &CBlockUpdate::new(block_pos, block_id),
).await;
```
