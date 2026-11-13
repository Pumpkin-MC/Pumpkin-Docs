# Java 版网络概述

Java 版网络栈负责处理通过 TCP 连接的标准 Minecraft PC 客户端。线路级结构和序列化逻辑位于 `pumpkin-protocol::java`，而连接管理和游戏数据包处理函数位于 `pumpkin::net::java`。

---

## 五种协议状态

Minecraft Java 协议作为一个显式有限状态机运行。每个连接都从 `Handshake` 状态开始，并根据客户端请求和服务器响应进行状态转换：

| 状态 | 转换触发条件 | 用途与下一状态 |
| :--- | :--- | :--- |
| **Handshake** | 客户端发起连接 | 检查协议版本，并转换到 `Status`、`Login` 或 `Transfer` |
| **Status** | `NextState = 1` | 传输 MOTD、当前玩家数、服务器图标和 ping 响应 |
| **Login** | `NextState = 2` | 验证账户（Yggdrasil），协商加密（AES-128），转换到 `Config` |
| **Transfer** | `NextState = 3` | 现代代理 / 服务器转移协商 |
| **Config** | 身份验证成功 | 交换动态注册表、数据标签、功能标志和资源包 |
| **Play** | 配置已确认 | 主要的双向游戏循环（区块、移动、战斗、聊天） |

1. **握手（`0x00`）**：始终是客户端发送的第一个数据包。它声明客户端的协议版本、服务器地址、端口和期望的下一状态（`Status`、`Login` 或 `Transfer`）。
2. **状态**：轻量级查询状态。客户端请求服务器列表 ping，Pumpkin 则返回服务器版本、玩家数、服务器图标和 MOTD。
3. **登录**：验证玩家身份。如果启用了 `online_mode`，Pumpkin 会执行加密握手（AES-128/CFB8），并通过 Mojang 的 Yggdrasil 会话服务器验证玩家账户。
4. **配置**：在现代 Minecraft（1.20.2+）中引入。在玩家进入实际世界之前，服务器会发送功能标志、已知注册表、资源包和自定义服务器链接。
5. **游玩**：主要的游戏状态。用于所有游戏内操作，包括破坏方块、实体移动、战斗、聊天和区块流式传输。

---

## 连接表示：`JavaClient` 与 `Player`

为尽量减少内存使用并避免不必要的分配，Pumpkin 将游玩前的连接与活跃玩家明确分开：

### `JavaClient`
- **范围**：存在于 `Handshake`、`Status`、`Login` 和 `Config` 状态。
- **位置**：`crates/pumpkin/src/net/java/mod.rs`。
- **特征**：
  - 包含连接元数据：客户端协议版本、远程地址、加密/压缩状态。
  - 没有世界坐标、物理效果、物品栏或生物实体。
  - 内存占用极低。

### `Player`
- **范围**：仅存在于 `Play` 状态。
- **位置**：`crates/pumpkin/src/entity/player/`。
- **特征**：
  - 实现 `EntityBase`，表示 `World` 和 `Level` 中的生物实体。
  - 保存物品栏界面、生命值、饥饿值、速度和区块视野订阅队列。
  - 包含用于网络传输的 `Arc<JavaClient>` 引用。

---

## 多版本支持（`JavaMinecraftVersion`）

Pumpkin 支持多个 Minecraft 客户端版本。协议差异通过 `pumpkin_util::version::JavaMinecraftVersion` 统一处理：

- 数据包 ID 可能因 Minecraft 版本而异。`#[java_packet(ID)]` 宏会与 `pumpkin-data` 协作，解析目标版本对应的正确 ID。
- 读取或写入数据包时，方法会接受 `&JavaMinecraftVersion` 引用，以便有条件地包含或省略在特定 Minecraft 更新中发生变化的字段。

```rust
if *version <= JavaMinecraftVersion::V_1_7_6 {
    // 读取早期 Minecraft 版本中存在的旧版 stance 坐标
    let _stance = bytebuf.get_f64_be()?;
}
```

---

## 数据包处理流程

传入的 Java 数据包会经过一套结构化处理流程：

1. **长度分帧**：`tokio_util::codec` 解码 VarInt 帧长度。
2. **解压与解密**：如果已启用，原始缓冲区会通过 AES/CFB8 解密，并通过 ZLib 解压。
3. **插件事件拦截**：向插件管理器分发 `PacketReceivedEvent`。插件可以在服务器处理前检查或取消数据包。
4. **ID 分发**：在 `crates/pumpkin/src/net/java/mod.rs`（或相应的状态模块）中，将数据包 ID 与特定版本的常量进行匹配。
5. **处理**：反序列化数据包结构体，并由特定状态的处理函数进行处理。
