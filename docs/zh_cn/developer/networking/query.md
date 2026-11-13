# GameSpy4 Query 协议

Pumpkin 原生支持基于 UDP 的 **GameSpy4 Query** 协议。外部监控系统、Discord 机器人和服务器列表平台使用 Query，以极小的网络开销轮询实时玩家数、MOTD、服务器版本和在线玩家列表。

Query 的线路编码在 [`crates/pumpkin-protocol/src/query.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-protocol/src/query.rs) 中实现，异步 UDP 监听器在 [`crates/pumpkin/src/net/query.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/query.rs) 中实现。

---

## 为什么使用 Query？（UDP 与状态 Ping 的对比）

标准 Minecraft 客户端通过 TCP `Status` 状态（SLP）ping 服务器，而 Query 基于无状态的 **UDP** 运行：

- **无需 TCP 握手**：避免 TCP 连接开销和连接状态表。
- **详细的服务器状态**：返回全面的键值元数据和完整的已连接玩家用户名列表（基本 TCP ping 无法提供这些信息）。
- **放大攻击防护**：强制使用加密挑战令牌，防止恶意行为者滥用 UDP 端口发起拒绝服务反射攻击。

---

## 握手与挑战令牌流程

为防止 UDP 欺骗和反射 DDoS 攻击，Query 需要进行两步握手：

1. **握手挑战**：客户端发送 `SHandshake`（`0xFEFD`、类型 `0x09` 和一个 32 位会话 ID）。Pumpkin 生成一个与客户端 `SocketAddr` 绑定的加密安全 32 位整数挑战令牌，并以 `CHandshake` 响应。
2. **状态查询**：客户端发送包含所接收挑战令牌的 `SStatusRequest`：
   - **基本状态**（无填充）：返回 MOTD、游戏类型（`SMP`）、地图名称、在线玩家数和最大玩家容量。
   - **完整状态**（4 字节填充）：返回详细的服务器元数据键值对（`hostname`、`gametype`、`game_id`、`version`、`plugins`、`map`、`numplayers`、`maxplayers`、`hostport`、`hostip`），随后是在线玩家用户名数组。

### 挑战令牌失效

在 `crates/pumpkin/src/net/query.rs` 中，挑战令牌存储在线程安全映射（`Arc<RwLock<HashMap<SocketAddr, i32>>>`）中。一个 Tokio 后台计时器每 30 秒清除所有挑战令牌，以防止重放滥用：

```rust
// 令牌严格绑定到客户端的 IP 和端口
let valid_challenge_tokens = Arc::new(RwLock::new(HashMap::new()));

// 后台过期循环
tokio::spawn(async move {
    let mut interval = time::interval(Duration::from_secs(30));
    loop {
        interval.tick().await;
        valid_challenge_tokens.write().await.clear();
    }
});
```

---

## 数据包格式

每个传入的 Query 数据包都以 2 字节魔数标头 `0xFEFD` 开头，后接 1 字节数据包类型：

| 类型字节 | 名称 | 方向 | 描述 |
| :--- | :--- | :--- | :--- |
| `0x09` | 握手请求 | 客户端 → 服务器 | 客户端请求挑战令牌。 |
| `0x09` | 握手响应 | 服务器 → 客户端 | 返回编码为 ASCII 字符串的数字令牌。 |
| `0x00` | 统计请求 | 客户端 → 服务器 | 使用挑战令牌请求基本或完整状态。 |
| `0x00` | 基本统计响应 | 服务器 → 客户端 | 11 字节的简短摘要。 |
| `0x00` | 完整统计响应 | 服务器 → 客户端 | 键值字典 + 以空字符分隔的玩家列表。 |

---

## 响应负载

### 1. 基本状态（`CBasicStatus`）
包含必要的服务器字段：
- **`motd`**：服务器的每日消息（已去除颜色代码）。
- **`gametype`**：固定字符串 `"SMP"`。
- **`map`**：当前世界/关卡名称（例如 `"world"`）。
- **`numplayers`**：在线玩家数。
- **`maxplayers`**：配置的最大玩家容量。
- **`hostport`**：端口号（`u16` 小端序）。
- **`hostip`**：服务器 IP 字符串。

### 2. 完整状态（`CFullStatus`）
返回两个以空字符结尾的部分：

1. **键值元数据映射**：
   - `hostname`：服务器描述 / MOTD。
   - `gametype`：`"SMP"`。
   - `game_id`：`"MINECRAFT"`。
   - `version`：服务器协议 / Minecraft 版本字符串。
   - `plugins`：已安装的服务器软件和插件名称。
   - `map`：关卡名称。
   - `numplayers` / `maxplayers`：容量统计。
   - `hostport` / `hostip`：网络绑定信息。
2. **玩家列表**：
   - 一个由以空字符结尾的 UTF-8 字符串组成的数组，包含所有当前已连接玩家的用户名。
   - 最后以终止空字节（`\0`）结束。

---

## 在 `pumpkin.toml` 中配置

```toml
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```
