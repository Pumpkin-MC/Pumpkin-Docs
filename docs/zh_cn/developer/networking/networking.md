### 网络

Pumpkin 中的大部分网络代码可以在 [pumpkin-protocol](https://github.com/Pumpkin-MC/Pumpkin/tree/master/pumpkin-protocol) 包中找到。

服务器绑定（Serverbound）：客户端 → 服务器

客户端绑定（Clientbound）：服务器 → 客户端

### 结构

Pumpkin 协议中的数据包按功能和状态组织。

`server`：包含服务器绑定数据包的定义。

`client`：包含客户端绑定数据包的定义。

### 状态

**握手（Handshake）**：始终是由客户端发送的第一个数据包。这也决定了下一个状态，通常用于指示玩家是想执行状态请求、加入服务器，还是想被转移。

**状态（Status）**：表示客户端想要查看状态响应（MOTD）。

**登录（Login）**：登录序列。表示客户端想要加入服务器。

**配置（Config）**：配置数据包序列主要从服务器发送到客户端（功能、资源包、服务器链接等）。

**游戏（Play）**：最终状态，表示玩家现在准备好加入，也用于处理所有其他游戏玩法数据包。

### Minecraft 协议

您可以在 <https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol> 找到所有 Minecraft Java 数据包。在那里，您还可以看到它们处于哪个[状态](#状态)。
您还可以看到数据包的所有信息，根据它们是服务器绑定还是客户端绑定，我们可以读取或写入这些信息。

### 添加数据包

1. 添加数据包很简单。首先，派生：

```rust
// 对于客户端绑定数据包：
#[derive(Serialize)]

// 对于服务器绑定数据包：
#[derive(Deserialize)]
```

2. 接下来，您必须让系统知道您的结构表示一个数据包。这会自动从 JSON 数据包文件中获取数据包 ID。

```rust
use pumpkin_data::packet::clientbound::PLAY_DISCONNECT;

#[packet(PLAY_DISCONNECT)]
```

3. 现在您可以创建 `struct`。

> [!IMPORTANT]
> 请以 "C" 或 "S" 开始数据包名称，分别代表"客户端绑定"或"服务器绑定"。
> 此外，如果这是一个可以在多个[状态](#状态)下发送的数据包，请将状态添加到名称中。例如，有 3 个不同的断开连接数据包。
>
> - `CLoginDisconnect`
> - `CConfigDisconnect`
> - `CPlayDisconnect`

在您的数据包结构中创建字段，以表示将要发送的数据。

> [!IMPORTANT]
> 使用描述性字段名称和适当的数据类型。

例子：

```rust
pub struct CPlayDisconnect {
    reason: TextComponent,
    // 更多字段...
}

pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

4. （仅限客户端绑定数据包）`impl` 一个 `new` 函数，这样我们就可以通过输入值来实际创建它们。

```rust
impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}
```

5. 最后，所有内容应该组合在一起。

```rust
#[derive(Serialize)]
#[packet(PLAY_DISCONNECT)]
pub struct CPlayDisconnect {
    reason: TextComponent,
}

impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}

#[derive(Deserialize)]
#[packet(PLAY_MOVE_PLAYER_POS)]
pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

6. 您还可以手动序列化/反序列化数据包，这在数据包更复杂时很有用。

```diff
-#[derive(Serialize)]

+ impl ClientPacket for CPlayDisconnect {
+    fn write(&self, bytebuf: &mut BytesMut) {
+       bytebuf.put_slice(&self.reason.encode());
+    }

-#[derive(Deserialize)]

+ impl ServerPacket for SPlayerPosition {
+    fn read(bytebuf: &mut Bytes) -> Result<Self, ReadingError> {
+       Ok(Self {
+           x: bytebuf.try_get_f64()?,
+           feet_y: bytebuf.try_get_f64()?,
+           z: bytebuf.try_get_f64()?,
+           ground: bytebuf.try_get_bool()?,
+       })
+    }
```

7. 现在您可以发送客户端绑定数据包（参见[发送数据包](#发送数据包)）或监听服务器绑定数据包（参见[接收数据包](#接收数据包)）。

### 客户端

Pumpkin 将 `Client`（客户端）和 `Player`（玩家）分开分类。不在游戏状态的所有内容都是简单的 `Client`。以下是它们的区别：

**客户端**

- 只能处于状态：Status、Login、Transfer、Config
- 不是活动实体
- 资源消耗小

**玩家**

- 只能处于 Play 状态
- 是世界中的一个活动实体
- 有更多数据并消耗更多资源

#### 发送数据包

例子：

```rust
// 仅在 Status 状态下工作
client.send_packet(&CStatusResponse::new("{ description: "A Description"}"));
```

#### 接收数据包

对于 `Client`：
`src/client/mod.rs`

```diff
// 将数据包放入正确的状态
 fn handle_mystate_packet(
  &self,
    server: &Arc<Server>,
    packet: &mut RawPacket,
) -> Result<(), ReadingError> {
    let bytebuf = &mut packet.bytebuf;
    match packet.id.0 {
        SStatusRequest::PACKET_ID => {
                self.handle_status_request(server, SStatusRequest::read(bytebuf)?)
                    .await;
            }
+            MyPacket::PACKET_ID => {
+                self.handle_my_packet(MyPacket::read(bytebuf)?)
+                    .await;
            }
            _ => {
            log::error!(
                "Failed to handle packet id {} while in ... state",
                packet.id.0
            );
            }
    };
```
