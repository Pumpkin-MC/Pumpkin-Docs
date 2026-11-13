# 代理转发概述

在多服务器 Minecraft 网络中，玩家通过面向玩家的反向代理（例如 Velocity、BungeeCord 或 Vine）连接，由代理在大厅和子服务器之间路由连接，无需玩家重新连接。

由于后端服务器接收到的 TCP 连接直接来自代理机器而非玩家，因此必须将玩家真实的 **IP 地址**、**UUID**、**用户名**和**皮肤属性**告知服务器。

Pumpkin 在 [`crates/pumpkin/src/net/proxy/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net/proxy) 中原生支持全部三种主要代理转发协议。

---

## 代理转发问题

如果没有安全的代理转发：
1. **IP 丢失**：每个已连接玩家显示的都会是代理的回环或内部 IP（导致 IP 封禁和地理位置功能失效）。
2. **UUID 欺骗与绕过**：恶意用户可以使用任意伪造的用户名或管理员身份，直接连接到后端服务器端口。

为防止绕过代理，Pumpkin 会验证代理发送的加密密钥、令牌或数字签名。

---

## 支持的协议对比

| 协议 | 协议传输方式 | 安全性 / 加密技术 | 重放保护 | Crate 模块 |
| :--- | :--- | :--- | :--- | :--- |
| **[BungeeCord](/zh_cn/developer/networking/proxy/bungeecord)** | `SHandshake` 服务器地址字符串 | 档案属性中的可选令牌（`bungeeguard-token`） | 无 | `pumpkin::net::proxy::bungeecord` |
| **[Velocity](/zh_cn/developer/networking/proxy/velocity)** | 登录插件消息（`velocity:player_info`） | 对称 HMAC-SHA256 签名 | 无 | `pumpkin::net::proxy::velocity` |
| **[Vine](/zh_cn/developer/networking/proxy/vine)** | 登录插件消息（`vine:player_info`） | 非对称 **Ed25519** 数字签名 | 16 字节随机数挑战 + 30 秒时间戳窗口 | `pumpkin::net::proxy::vine` |

---

## 生命周期架构

1. **玩家身份验证**：玩家连接到代理（BungeeCord、Velocity 或 Vine），并通过 Mojang 的会话服务器进行身份验证。
2. **后端连接**：代理通过 TCP 连接到 Pumpkin，并发送 `SHandshake`。
3. **数据转发**：
   - **BungeeCord 模式**：代理将玩家的远程 IP、UUID 和属性直接注入 `SHandshake` 主机名字符串（以空字节 `\0` 分隔）。
   - **现代模式（Velocity / Vine）**：Pumpkin 在专用通道（`velocity:player_info` 或 `vine:player_info`）上发送 `CLoginPluginRequest`。代理使用 HMAC-SHA256（Velocity）或 Ed25519（Vine）为玩家档案签名，并以 `SLoginPluginResponse` 回复。
4. **验证与会话初始化**：Pumpkin 验证签名，将真实 IP 和 GameProfile 绑定到 `JavaClient`，并发送 `CLoginSuccess`。

---

## 代理文档

- **[BungeeCord](/zh_cn/developer/networking/proxy/bungeecord)**：旧版主机字符串注入和可选的 BungeeGuard 令牌验证。
- **[Velocity 现代转发](/zh_cn/developer/networking/proxy/velocity)**：在登录状态下使用 HMAC-SHA256 签名的玩家信息。
- **[Vine 现代转发](/zh_cn/developer/networking/proxy/vine)**：采用 Ed25519 签名和重放攻击防护的下一代代理转发。
