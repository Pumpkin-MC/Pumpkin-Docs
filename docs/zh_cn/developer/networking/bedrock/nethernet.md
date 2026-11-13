# NetherNet WebRTC 传输

**NetherNet** 是 Mojang 为 Minecraft：基岩版设计的现代 WebRTC 传输协议。NetherNet 专为高韧性的点对点和中继通信而设计，可实现无缝的跨平台多人游戏（移动端、主机、桌面端），无需服务器运营者或玩家配置路由器端口转发。

Pumpkin 在 [`crates/pumpkin/src/net/bedrock/nethernet.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/bedrock/nethernet.rs) 中提供了原生、零依赖的 NetherNet 实现。

---

## 架构层

| 层 | 实现 | 职责 |
| :--- | :--- | :--- |
| **HTTP 信令** | Axum HTTP Router（`ice_router.rs`） | 处理 SDP Offer（`POST /offer`）、SDP Answer（`GET /answer`）和 ICE Candidates（`POST /candidate`） |
| **NAT 穿透** | ICE Agent | 协调 STUN/TURN 绑定发现和打洞 |
| **传输安全** | DTLS 握手 | 生成临时会话密钥，并使用 ECDSA P-384 密钥保护 WebRTC 传输 |
| **数据传输** | WebRTC DataChannels | 无序/有序数据报通道，将标准基岩版游戏批次流式传输到分发器 |

---

## Pumpkin 中的核心组件

Pumpkin 的 NetherNet 子系统分为四个独立模块：

### 1. 加密身份（`nethernet-key.der`）
- Pumpkin 生成并加载 **NIST P-384 ECDSA 私钥**（`nethernet-key.der`）。
- 用于对会话描述（SDP offer 和 answer）进行加密签名，向连接的客户端验证服务器身份。
- 使用标准 PKCS#8 DER 格式编码。

### 2. HTTP 信令路由器（`ice_router.rs`）
信令通过 [Axum](https://github.com/tokio-rs/axum) 路由器以 HTTP 处理：

- **`POST /offer`**：客户端提交 SDP offer，描述其 WebRTC 编解码器、传输配置文件和网络接口。
- **`GET /answer`**：Pumpkin 生成相应的本地 SDP answer，其中包含其协商的能力。
- **`POST /candidate`**：两端交换 trickle ICE candidates，以发现最快的直接网络路径（host、server-reflexive 或 relay）。

### 3. 本地网络发现（`discovery.rs`）
- 通过 UDP 组播在本地子网上监听并广播可用性。
- 允许同一 Wi-Fi 或 LAN 上的基岩版客户端自动发现并连接 Pumpkin 服务器，无需输入 IP 地址。

### 4. DataChannel 数据包流式传输
- 当 WebRTC 对等连接转换到 `Connected` 状态后，会打开一个有序、可靠的 **WebRTC DataChannel**。
- 基岩版批处理数据包（`0xfe`）通过 DataChannel 双向传输，直接进入 Pumpkin 的 `incoming_game_packet_send` 通道。

---

## 在 `pumpkin.toml` 中配置

NetherNet 在 `pumpkin.toml` 的 `[networking.bedrock.nethernet]` 下配置：

```toml
[networking.bedrock]
enabled = true
address = "0.0.0.0:19132"

[networking.bedrock.nethernet]
enabled = true
signaling_address = "0.0.0.0:19133"
ice_servers = [
    "stun:stun.l.google.com:19302"
]
```
