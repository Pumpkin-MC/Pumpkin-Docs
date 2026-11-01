# Java 版網絡概述

Java 版網絡棧負責處理透過 TCP 連線的標準 Minecraft PC 客戶端。線路級結構和序列化邏輯位於 `pumpkin-protocol::java`，而連線管理和遊戲封包處理函數位於 `pumpkin::net::java`。

---

## 五種協定狀態

Minecraft Java 協定作為一個顯式有限狀態機執行。每個連線都從 `Handshake` 狀態開始，並根據客戶端請求和伺服器回應進行狀態轉換：

| 狀態 | 轉換觸發條件 | 用途與下一狀態 |
| :--- | :--- | :--- |
| **Handshake** | 客戶端發起連線 | 檢查協定版本，並轉換到 `Status`、`Login` 或 `Transfer` |
| **Status** | `NextState = 1` | 傳輸 MOTD、目前玩家數、伺服器圖示和 ping 回應 |
| **Login** | `NextState = 2` | 驗證帳號（Yggdrasil），協商加密（AES-128），轉換到 `Config` |
| **Transfer** | `NextState = 3` | 現代代理 / 伺服器轉移協商 |
| **Config** | 身份驗證成功 | 交換動態註冊表、資料標籤、功能標誌和資源包 |
| **Play** | 設定已確認 | 主要的雙向遊戲迴圈（區塊、移動、戰鬥、聊天） |

1. **握手（`0x00`）**：始終是客戶端傳送的第一個封包。它宣告客戶端的協定版本、伺服器位址、端口和期望的下一狀態（`Status`、`Login` 或 `Transfer`）。
2. **狀態**：輕量級查詢狀態。客戶端請求伺服器列表 ping，Pumpkin 則返回伺服器版本、玩家數、伺服器圖示和 MOTD。
3. **登入**：驗證玩家身份。如果啟用了 `online_mode`，Pumpkin 會執行加密握手（AES-128/CFB8），並透過 Mojang 的 Yggdrasil 會話伺服器驗證玩家帳號。
4. **設定**：在現代 Minecraft（1.20.2+）中引入。在玩家進入實際世界之前，伺服器會發送功能標誌、已知註冊表、資源包和自訂伺服器連結。
5. **遊玩**：主要的遊戲狀態。用於所有遊戲內操作，包括破壞方塊、實體移動、戰鬥、聊天和區塊流式傳輸。

---

## 連線表示：`JavaClient` 與 `Player`

為儘量減少記憶體使用並避免不必要的分配，Pumpkin 將遊玩前的連線與活躍玩家明確分開：

### `JavaClient`
- **範圍**：存在於 `Handshake`、`Status`、`Login` 和 `Config` 狀態。
- **位置**：`crates/pumpkin/src/net/java/mod.rs`。
- **特徵**：
  - 包含連線元資料：客戶端協定版本、遠端位址、加密/壓縮狀態。
  - 沒有世界座標、物理效果、物品欄或生物實體。
  - 記憶體佔用極低。

### `Player`
- **範圍**：僅存在於 `Play` 狀態。
- **位置**：`crates/pumpkin/src/entity/player/`。
- **特徵**：
  - 實現 `EntityBase`，表示 `World` 和 `Level` 中的生物實體。
  - 儲存物品欄界面、生命值、飢餓值、速度和區塊視野訂閱隊列。
  - 包含用於網絡傳輸的 `Arc<JavaClient>` 引用。

---

## 多版本支援（`JavaMinecraftVersion`）

Pumpkin 支援多個 Minecraft 客戶端版本。協定差異透過 `pumpkin_util::version::JavaMinecraftVersion` 統一處理：

- 封包 ID 可能因 Minecraft 版本而異。`#[java_packet(ID)]` 巨集會與 `pumpkin-data` 協作，解析目標版本對應的正確 ID。
- 讀取或寫入封包時，方法會接受 `&JavaMinecraftVersion` 引用，以便有條件地包含或省略在特定 Minecraft 更新中發生變化的欄位。

```rust
if *version <= JavaMinecraftVersion::V_1_7_6 {
    // 讀取早期 Minecraft 版本中存在的舊版 stance 座標
    let _stance = bytebuf.get_f64_be()?;
}
```

---

## 封包處理流程

傳入的 Java 封包會經過一套結構化處理流程：

1. **長度分幀**：`tokio_util::codec` 解碼 VarInt 幀長度。
2. **解壓與解密**：如果已啟用，原始緩衝區會透過 AES/CFB8 解密，並透過 ZLib 解壓。
3. **插件事件攔截**：向插件管理器分發 `PacketReceivedEvent`。插件可以在伺服器處理前檢查或取消封包。
4. **ID 分發**：在 `crates/pumpkin/src/net/java/mod.rs`（或相應的狀態模組）中，將封包 ID 與特定版本的常量進行匹配。
5. **處理**：反序列化封包結構，並由特定狀態的處理函數進行處理。
