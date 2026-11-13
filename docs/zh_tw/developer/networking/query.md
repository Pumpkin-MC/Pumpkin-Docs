# GameSpy4 Query 協定

Pumpkin 原生支援基於 UDP 的 **GameSpy4 Query** 協定。外部監控系統、Discord 機器人和伺服器列表平臺使用 Query，以極小的網路開銷輪詢即時玩家數、MOTD、伺服器版本和線上玩家列表。

Query 的線路編碼在 [`crates/pumpkin-protocol/src/query.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-protocol/src/query.rs) 中實現，非同步 UDP 監聽器在 [`crates/pumpkin/src/net/query.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/query.rs) 中實現。

---

## 為什麼使用 Query？（UDP 與狀態 Ping 的對比）

標準 Minecraft 用戶端透過 TCP `Status` 狀態（SLP）ping 伺服器，而 Query 基於無狀態的 **UDP** 執行：

- **無需 TCP 握手**：避免 TCP 連線開銷和連線狀態表。
- **詳細的伺服器狀態**：返回全面的鍵值元資料和完整的已連線玩家使用者名稱列表（基本 TCP ping 無法提供這些資訊）。
- **放大攻擊防護**：強制使用加密挑戰令牌，防止惡意行為者濫用 UDP 埠發起拒絕服務反射攻擊。

---

## 握手與挑戰令牌流程

為防止 UDP 欺騙和反射 DDoS 攻擊，Query 需要進行兩步握手：

1. **握手挑戰**：用戶端傳送 `SHandshake`（`0xFEFD`、型別 `0x09` 和一個 32 位會話 ID）。Pumpkin 生成一個與用戶端 `SocketAddr` 綁定的加密安全 32 位整數挑戰令牌，並以 `CHandshake` 回應。
2. **狀態查詢**：用戶端傳送包含所接收挑戰令牌的 `SStatusRequest`：
   - **基本狀態**（無填充）：返回 MOTD、遊戲型別（`SMP`）、地圖名稱、線上玩家數和最大玩家容量。
   - **完整狀態**（4 位元組填充）：返回詳細的伺服器元資料鍵值對（`hostname`、`gametype`、`game_id`、`version`、`plugins`、`map`、`numplayers`、`maxplayers`、`hostport`、`hostip`），隨後是線上玩家使用者名稱陣列。

### 挑戰令牌失效

在 `crates/pumpkin/src/net/query.rs` 中，挑戰令牌儲存線上程安全對映（`Arc<RwLock<HashMap<SocketAddr, i32>>>`）中。一個 Tokio 後臺計時器每 30 秒清除所有挑戰令牌，以防止重放濫用：

```rust
// 令牌嚴格綁定到用戶端的 IP 和埠
let valid_challenge_tokens = Arc::new(RwLock::new(HashMap::new()));

// 後臺過期迴圈
tokio::spawn(async move {
    let mut interval = time::interval(Duration::from_secs(30));
    loop {
        interval.tick().await;
        valid_challenge_tokens.write().await.clear();
    }
});
```

---

## 封包格式

每個傳入的 Query 封包都以 2 位元組魔數標頭 `0xFEFD` 開頭，後接 1 位元組封包型別：

| 型別位元組 | 名稱 | 方向 | 描述 |
| :--- | :--- | :--- | :--- |
| `0x09` | 握手請求 | 用戶端 → 伺服器 | 用戶端請求挑戰令牌。 |
| `0x09` | 握手回應 | 伺服器 → 用戶端 | 返回編碼為 ASCII 字串的數字令牌。 |
| `0x00` | 統計請求 | 用戶端 → 伺服器 | 使用挑戰令牌請求基本或完整狀態。 |
| `0x00` | 基本統計回應 | 伺服器 → 用戶端 | 11 位元組的簡短摘要。 |
| `0x00` | 完整統計回應 | 伺服器 → 用戶端 | 鍵值字典 + 以空字元分隔的玩家列表。 |

---

## 回應負載

### 1. 基本狀態（`CBasicStatus`）
包含必要的伺服器欄位：
- **`motd`**：伺服器的每日訊息（已去除顏色程式碼）。
- **`gametype`**：固定字串 `"SMP"`。
- **`map`**：目前世界/關卡名稱（例如 `"world"`）。
- **`numplayers`**：線上玩家數。
- **`maxplayers`**：設定的最大玩家容量。
- **`hostport`**：埠號（`u16` 小端序）。
- **`hostip`**：伺服器 IP 字串。

### 2. 完整狀態（`CFullStatus`）
返回兩個以空字元結尾的部分：

1. **鍵值元資料對映**：
   - `hostname`：伺服器描述 / MOTD。
   - `gametype`：`"SMP"`。
   - `game_id`：`"MINECRAFT"`。
   - `version`：伺服器協定 / Minecraft 版本字串。
   - `plugins`：已安裝的伺服器軟體和插件名稱。
   - `map`：關卡名稱。
   - `numplayers` / `maxplayers`：容量統計。
   - `hostport` / `hostip`：網路綁定資訊。
2. **玩家列表**：
   - 一個由以空字元結尾的 UTF-8 字串組成的陣列，包含所有目前已連線玩家的使用者名稱。
   - 最後以終止空位元組（`\0`）結束。

---

## 在 `pumpkin.toml` 中設定

```toml
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```
