# 网络概述

Pumpkin 采用高性能的异步网络栈，能够同时为 **Minecraft：Java 版** 和 **Minecraft：基岩版** 客户端提供服务。

所有协议定义、序列化 trait 和线路级编解码器都隔离在 [`pumpkin-protocol`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-protocol) crate 中，而客户端连接管理、会话状态机和游戏数据包分发则由 [`pumpkin/src/net`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net) 管理。

---

## 支持的版本

由于 Java 版和基岩版在传输层、数据包编码和状态模型上存在根本差异，Pumpkin 将两者的网络实现分开：

| 功能 | Minecraft：Java 版 | Minecraft：基岩版 |
| :--- | :--- | :--- |
| **传输层** | TCP 套接字流 | 通过 RakNet 和 NetherNet 使用 UDP |
| **帧封装** | 以 VarInt 长度为前缀的帧 | 封装在 `0xfe` 标头中的批处理数据包 |
| **加密** | AES-128 / CFB8 流密码 | 加密会话握手 |
| **压缩** | 逐数据包进行 ZLib 压缩（超过可配置阈值时） | 逐批次进行 Deflate / ZLib 压缩 |
| **状态模型** | 显式状态：握手、状态、登录、配置、游玩 | 由数据包驱动的状态推进 |
| **协议 Crate** | `pumpkin-protocol::java` | `pumpkin-protocol::bedrock` |
| **服务器网络模块** | `pumpkin::net::java` | `pumpkin::net::bedrock` |

---

## 网络架构

网络处理流程会先通过专用的传输层和编解码层处理传入连接，再将其交由统一的服务器游戏循环：

1. **传输监听器**：独立的监听器分别绑定到对应端口——Java 版使用 Tokio TCP（`:25565`），基岩版使用 UDP/RakNet/NetherNet（`:19132`）。
2. **会话抽象**：每个接受的连接都会生成一个独立的会话任务（`JavaClient` 或 `BedrockClient`），负责管理线路帧封装和加密。
3. **编解码器反序列化**：通过 `pumpkin-protocol::java`（`ClientPacket`/`ServerPacket`）和 `pumpkin-protocol::bedrock`（`PacketWrite`/`PacketRead`），将线路字节反序列化为强类型数据包结构体。
4. **统一的游戏分发**：解码后的数据包被分发到统一的游戏循环中，用于更新玩家实体状态并流式传输世界区块。

---

## 浏览网络文档

查阅各版本的文档：

- **[实体元数据与同步数据](/zh_cn/developer/networking/metadata)**：同步实体的视觉状态（Java 版中的 DataWatchers，基岩版中的 Actor Data）。
- **[Java 版](/zh_cn/developer/networking/java/overview)**：
  - **[架构与生命周期](/zh_cn/developer/networking/java/overview)**：状态机、`JavaClient` 与 `Player` 的区别，以及多版本协商。
  - **[如何添加数据包](/zh_cn/developer/networking/java/adding-packets)**：定义、序列化和分发 Java 版数据包的指南。
  - **[身份验证](/zh_cn/developer/networking/java/authentication)**：Mojang Yggdrasil 验证、GameProfile 和代理转发。
- **[基岩版](/zh_cn/developer/networking/bedrock/overview)**：
  - **[架构与传输](/zh_cn/developer/networking/bedrock/overview)**：RakNet 和 NetherNet 集成、批处理以及会话处理。
  - **[如何添加数据包](/zh_cn/developer/networking/bedrock/adding-packets)**：定义和处理基岩版数据包的指南。
  - **[身份验证与 NetherNet](/zh_cn/developer/networking/bedrock/authentication)**：JWT 证书链验证、WebRTC DataChannels、P-384 密钥和信令。
- **[RCON](/zh_cn/developer/networking/rcon)**：用于行政管理的 Valve 远程控制台协议实现。
