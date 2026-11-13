# 网络与协议

Pumpkin 包含一个高性能网络栈，同时支持 **Minecraft：Java 版** 和 **Minecraft：基岩版**。

大多数协议定义、编解码器和序列化逻辑位于 [`pumpkin-protocol`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-protocol) crate 中，而连接处理与游戏数据包分发位于 [`pumpkin`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net) crate 中。

> [!NOTE]
> 专用子分类中提供了详细指南：
> - **[网络简介](/zh_cn/developer/networking/)**
> - **Java 版**：**[架构](/zh_cn/developer/networking/java/overview)**、**[添加 Java 数据包](/zh_cn/developer/networking/java/adding-packets)** 和 **[身份验证](/zh_cn/developer/networking/java/authentication)**
> - **基岩版**：**[架构](/zh_cn/developer/networking/bedrock/overview)** 和 **[添加基岩版数据包](/zh_cn/developer/networking/bedrock/adding-packets)**

---

## 方向与协议术语

- **服务器接收（Serverbound，客户端 → 服务器）**：由游戏客户端发送、Pumpkin 接收的数据包。以 `S` 为前缀（例如 `SChatMessage`、`SPlayerPosition`）。
- **客户端接收（Clientbound，服务器 → 客户端）**：由 Pumpkin 发送给游戏客户端的数据包。以 `C` 为前缀（例如 `CPlayDisconnect`、`CBlockUpdate`）。

---

## 协议状态

Minecraft Java 协议作为一个具有五种不同状态的有限状态机运行：

1. **握手（Handshake）**：客户端连接时发送的初始数据包。它指定协议版本、服务器地址和目标下一状态（`Status`、`Login` 或 `Transfer`）。
2. **状态（Status）**：用于多人游戏服务器列表的轻量级查询状态（MOTD、在线玩家数、延迟 ping）。
3. **登录（Login）**：验证玩家身份（通过 Mojang Yggdrasil 或离线模式），设置加密（AES-128/CFB8），并在启用时激活数据包压缩。
4. **配置（Config）**：在现代 Minecraft 版本中引入，用于在游玩前配置客户端设置、协商功能、资源包和服务器链接。
5. **游玩（Play）**：处理实体、世界区块、物品栏交互、聊天和移动的主要游戏状态。

---

## 在 `pumpkin-protocol` 中定义数据包

`pumpkin-protocol` 中的数据包按版本（`java`、`bedrock`）、方向（`client`、`server`）和状态（`handshake`、`status`、`login`、`config`、`play`）组织。

### 1. 客户端接收数据包（`ClientPacket`）

创建客户端接收数据包的步骤：

1. 从 `pumpkin-data` 获取数据包 ID 常量。
2. 使用 `#[java_packet(PACKET_CONSTANT)]` 标注结构体。
3. 实现 `ClientPacket`，使用 `NetworkWriteExt` 将数据包字段写入字节流。

```rust
use std::io::Write;
use pumpkin_data::packet::clientbound::play::DISCONNECT;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ClientPacket;
use pumpkin_protocol::ser::{NetworkWriteExt, WritingError};
use pumpkin_util::text::TextComponent;
use pumpkin_util::version::JavaMinecraftVersion;

/// 在游玩状态下断开玩家连接。
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
        // 写入针对目标客户端版本格式化的文本组件
        write.write_component(self.reason, version)
    }
}
```

### 2. 服务器接收数据包（`ServerPacket`）

创建服务器接收数据包的步骤：

1. 从 `pumpkin-data` 获取数据包 ID 常量。
2. 使用 `#[java_packet(PACKET_CONSTANT)]` 标注结构体。
3. 实现 `ServerPacket<'a>`，使用 `NetworkReadExt` 从传入的字节切片中读取字段。

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

### 实用的序列化辅助工具（`NetworkWriteExt` 和 `NetworkReadExt`）

Pumpkin 为字节流提供了扩展 trait，用于处理标准 Minecraft 原始类型：

- `write_var_int(i32)` / `get_var_int()`：可变长度的 32 位整数。
- `write_var_long(i64)` / `get_var_long()`：可变长度的 64 位整数。
- `write_string(&str)` / `get_string()`：以 VarInt 长度为前缀的 UTF-8 字符串。
- `write_uuid(&Uuid)` / `get_uuid()`：128 位玩家或实体 UUID。
- `write_component(&TextComponent)`：序列化格式化的聊天/UI 文本。
- `write_nbt(&NBTTag)` / `get_nbt()`：序列化/反序列化二进制 NBT 标签。

---

## `pumpkin` 中的数据包流与处理

传入数据包会经过以下几个阶段，然后才会修改游戏状态：

1. **帧解码**：Tokio TCP 流解码 VarInt 长度前缀，并在启用加密时解密帧。
2. **事件拦截**：向已注册的插件发出 `PacketReceivedEvent`。如果事件被取消，数据包会立即被丢弃。
3. **版本感知分发**：根据客户端协商的协议版本映射线路数据包 ID。
4. **状态处理**：将解析后的数据包结构体路由到对应的处理函数（例如 `handle_play_packet`）。
5. **状态变更**：修改玩家会话、世界区块或实体状态。

### 1. `Client` 与 `Player`

Pumpkin 严格区分游玩前的连接和活跃玩家：

- **`Client`**：表示处于 `Handshake`、`Status`、`Login` 或 `Config` 状态的连接。它是轻量级的，不关联世界，也没有物理实体。在 `crates/pumpkin/src/net/java/mod.rs` 中处理。
- **`Player`**：表示 `Play` 状态下活跃 `World` 中的生物实体。保存物品栏、生命值、速度和区块订阅队列。在 `crates/pumpkin/src/entity/player/` 中处理。

### 2. 数据包分发（`handle_play_packet`）

在 `crates/pumpkin/src/net/java/mod.rs` 中，通过匹配特定版本的数据包 ID 来分发数据包：

```rust
pub fn handle_play_packet(
    &self,
    player: &Arc<Player>,
    server: &Arc<Server>,
    packet: &RawPacket,
) -> Result<(), Box<dyn PumpkinError>> {
    let version = self.version.load();

    // 触发插件事件，允许插件观察或取消数据包
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

### 3. 发送数据包

向客户端发送数据包：

```rust
// 直接发送给单个玩家
player.client.send_packet(&CPlayDisconnect::new(&reason));

// 广播给世界中附近的玩家
world.broadcast_packet_except(
    &[player.gameprofile.id],
    &CBlockUpdate::new(block_pos, block_id),
).await;
```

---

## 压缩与加密

- **压缩**：客户端通过登录状态后，如果 `pumpkin.toml` 中启用了 `compression_threshold`，超过阈值大小的数据包将使用 ZLib/fast 压缩。
- **加密**：在在线模式下，登录状态中交换共享密钥后，会立即激活 128 位 AES/CFB8 加密。
