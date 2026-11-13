# 移植到更新的 Minecraft 版本

將 Pumpkin 升級以支援更新的 Minecraft 版本——無論是次要補丁（例如從 `1.21.4` 到 `1.21.5`）還是重大更新（例如從 `1.21` 到 `26.1`/`26.2`）——都是一個結構化、多步驟的過程。

> [!IMPORTANT]
> **必須首先移植 Extractor 模組！**
> Pumpkin 無法獨立移植。Pumpkin 資源（`blocks.json`、`items.json`、`entities.json`、`packets.json`、`tracked_data.json`、`synced_registries.json` 等）的主要來源是我們專用的 Fabric 模組：[Pumpkin-MC/Extractor](https://github.com/Pumpkin-MC/Extractor)。在執行 `pumpkin-codegen` 或更新伺服器 crate 之前，你**必須先在目標 Minecraft 版本上移植並執行 Extractor**。

### 移植生命週期一覽

| 階段 | 職責 | 主要 Crate/工具 |
| :--- | :--- | :--- |
| **1. 移植 Extractor** | 提取原版方塊狀態、實體、物品、封包和註冊表 | `Pumpkin-MC/Extractor`（Fabric 模組） |
| **2. 更新資料包** | 讀取新的資料包、標籤、配方和基岩版對映 | `assets/datapacks/<ver>`、`assets/bedrock` |
| **3. 版本宣告** | 註冊協定版本和 ViaVersion/ViaBackwards 重對映節點 | `pumpkin-util`、`tools/pumpkin-codegen` |
| **4. 程式碼生成** | 重新生成零成本 Rust 資料表和註冊表 | `pumpkin-codegen` -> `pumpkin-data` |
| **5. 編譯器修復** | 更新封包佈局、編解碼器和資料元件 | `pumpkin-protocol`、`pumpkin-inventory` |
| **6. 遊戲邏輯** | 實現新的方塊行為、物品機制和生物 AI | `crates/pumpkin/src/block`、`item`、`entity` |
| **7. 多版本質素保障** | 驗證向後相容性、測試套件和客戶端加入 | `cargo test`、`pumpkin-gametest` |

---

## 第 1 階段：首先移植 Extractor 模組（`Pumpkin-MC/Extractor`）

[Extractor](https://github.com/Pumpkin-MC/Extractor) 是一個基於 Kotlin 的 Fabric 模組，它會啟動真實的 Minecraft 客戶端或伺服器實例，檢查即時遊戲註冊表，並將資料提取為 Pumpkin 所需的確切 JSON 格式。

### 1. 克隆或更新 Extractor 倉庫
```bash
git clone https://github.com/Pumpkin-MC/Extractor
cd Extractor
```

### 2. 更新 `gradle.properties`
升級依賴版本，使其與目標 Minecraft 版本、Yarn 對映和 Fabric 生態相匹配：

```properties
minecraft_version=26.2
yarn_mappings=26.2+build.1:v2
loader_version=0.16.10
fabric_version=0.115.0+26.2
```

### 3. 解決 Extractor 編譯錯誤
Minecraft 和 Fabric 的內部 API 經常隨版本變化。檢查並修復 `src/main/kotlin/de/snowii/extractor/extractors/` 中所有失效的提取器：
- **`Blocks.kt`**：提取方塊狀態、硬度、爆炸抗性、亮度和碰撞箱偏移。
- **`Items.kt`**：提取物品 ID、最大堆棧數量和預設元件。
- **`Entities.kt`**：提取實體 ID、尺寸（寬度、高度）和眼部高度。
- **`Packets.kt`**：提取握手、狀態、登入、設定和遊戲狀態下的封包 ID。
- **`SyncedRegistries.kt`**：提取同步到客戶端的動態註冊表。
- **`TrackedData.kt`**：提取實體追蹤資料索引和序列化器。
- **`MultiNoise.kt` 與 `Biome.kt`**：提取世界生成生物群系樹和噪聲參數。

### 4. 執行 Extractor
執行伺服器執行器（如需轉儲翻譯/界面，則執行客戶端執行器）：

```bash
./gradlew runServer
```

提取完成後，所有轉儲的 JSON 檔案都將位於 `run/pumpkin_extractor_output/`。

### 5. 替換 Pumpkin 中的舊資原始檔
從 `run/pumpkin_extractor_output/` 複製新生成的 JSON 檔案，用它們**替換 Pumpkin 中的舊資原始檔**：
- 替換 `Pumpkin/assets/` 中的核心遊戲資源（`blocks.json`、`items.json`、`entities.json`、`packets.json`、`properties.json`、`synced_registries.json`、`tracked_data.json`、`en_us.json` 等）。
- 替換 `Pumpkin/crates/pumpkin-world/assets/` 中的世界生成測試檔案。

---

## 第 2 階段：更新資源與資料包

原始提取器資源就位後，更新 Pumpkin 中按版本劃分的資料包和補充檔案：

### 1. 新增按版本劃分的資料包
從新的 Minecraft 伺服器 JAR 中提取內建原版資料包，並將其放在 `assets/datapacks/<version>/` 下：

```
assets/datapacks/<version>/
└── data/
    ├── minecraft/
    │   ├── advancement/
    │   ├── chat_type/
    │   ├── damage_type/
    │   ├── dimension_type/
    │   ├── enchantment/
    │   ├── item_modifier/
    │   ├── loot_table/
    │   ├── recipe/
    │   ├── tags/
    │   └── worldgen/
    └── c/
        └── tags/（通用/常見標籤）
```

### 2. 更新按版本劃分的資源
更新或生成相應版本的元資料檔案：
- `assets/registry/<version>_synced_registries.json`：在 `Configuration` 網絡狀態期間流式傳輸到客戶端的動態註冊表。
- `assets/tags/<version>_tags.json`：標籤集合。
- `assets/tracked_data/<version>_tracked_data.json`：實體元資料索引。

### 3. 更新基岩版對映
如果同時移植基岩版支援，請使用 [GeyserMC](https://github.com/GeyserMC/Geyser) 和基岩版專用伺服器（BDS）的最新對映更新 `assets/bedrock/` 中的檔案。

### 4. 反編譯原始碼以進行逆向工程（可選但推薦）
對於複雜的更改——例如世界生成噪聲路由器公式和自訂方塊碰撞形狀——請將匹配的原版 JAR 反編譯到 `minecraft-sources-<version>/`（使用 Vineflower 或 Fabric Loom 以及官方 Mojang 對映）以供參考。

---

## 第 3 階段：註冊版本常量與 ViaVersion 對映

Pumpkin 透過 **ViaBackwards**/**ViaRewind** 對映表驅動的自動協定重對映來支援多版本客戶端。

### 1. 在 `pumpkin-util` 中宣告版本
開啟 `crates/pumpkin-util/src/version.rs`，將新版本新增到 [`JavaMinecraftVersion`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-util/src/version.rs)：

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum JavaMinecraftVersion {
    // ... 現有版本 ...
    V_1_21_4,
    V_1_21_11,
    V_26_2, // 新的目標版本
}

impl JavaMinecraftVersion {
    pub const fn protocol_version(&self) -> i32 {
        match self {
            // ...
            Self::V_26_2 => 770, // 協定版本號
        }
    }

    pub const fn version_name(&self) -> &'static str {
        match self {
            // ...
            Self::V_26_2 => "26.2",
        }
    }
}
```

### 2. 在 `pumpkin-codegen` 中宣告版本
開啟 `tools/pumpkin-codegen/src/version.rs`，將相同的列舉變體新增到程式碼生成 AST 中。

### 3. 新增 ViaVersion/ViaBackwards 對映
要讓舊版本客戶端能夠連線到更新後的伺服器（例如 `1.21.4` 客戶端連線到 `26.2` 伺服器）：
1. 從 [ViaBackwards 倉庫](https://github.com/ViaVersion/ViaBackwards)獲取 NBT 對映檔案：
   `mappings-<new_version>to<previous_version>.nbt`
2. 將其儲存到：
   `assets/viabackwards/data/mappings-<new_version>to<previous_version>.nbt`
3. 在 `tools/pumpkin-codegen/src/remap/mod.rs` 中，將新節點連結到 `remap_nodes!` 巨集：

```rust
let node_26_2 = $crate::remap::MappingNode {
    version: $crate::version::JavaMinecraftVersion::V_26_2,
    value: "../../assets/viabackwards/data/mappings-26.2to26.1.nbt",
    child: Some(&node_26_1),
};
$remapper.process(&node_26_2)
```

4. 檢查 `tools/pumpkin-codegen/src/remap/`，確保特定的重對映構建器（`block_state.rs`、`item_id.rs`、`entity_id.rs`、`sound_id.rs`、`argument_type.rs`）能夠正確處理 ViaVersion 引入的任何新重對映結構。

---

## 第 4 階段：執行程式碼生成（`pumpkin-codegen`）

所有提取器資源、資料包和對映節點就位後，從工作區根目錄執行程式碼生成工具：

```bash
cargo run -p pumpkin-codegen
```

### 會重新生成哪些內容？
`pumpkin-codegen` 將零成本 Rust 資料表生成到 `crates/pumpkin-data/src/generated/`：
- **`block.rs`**：所有方塊 ID、屬性、狀態掩碼和碰撞形狀。
- **`item.rs`**：物品、預設元件和工具等級。
- **`entity_type.rs` 與 `tracked_data.rs`**：實體類型 ID、預設邊界框和元資料序列化器。
- **`packet.rs`**：跨協定狀態的服務端接收和客戶端接收封包 ID 常量。
- **`recipes.rs`**：從新資料包解析出的所有合成、燒煉和切石配方。
- **`tag.rs`**：標籤查詢（`#minecraft:mineable/axe`、`#c:iron_ingots`）。
- **`remap/*.rs`**：狀態重對映查詢表（`block_state_remap.rs`、`item_id_remap.rs`、`entity_id_remap.rs`、`sound_id_remap.rs`）。

---

## 第 5 階段：解決工作區編譯錯誤

重新生成 `pumpkin-data` 後，Rust 編譯器會標記整個工作區中的破壞性變更。執行：

```bash
cargo check --workspace
```

### 常見的編譯故障與修復：

#### 1. 封包 ID 與佈局變更（`pumpkin-protocol`）
Mojang 經常新增、移動或修改封包 ID 和載荷：
- 更新 `pumpkin-protocol/src/java/client/` 和 `pumpkin-protocol/src/java/server/`。
- 檢查 `LoginSuccess`、`PlayLogin`、`Respawn` 和 `PlayerSpawnData` 等封包是否新增了欄位（例如新的遊戲模式標誌、維度屬性或傳送 ID）。
- 對於基岩版，檢查 `pumpkin-protocol/src/bedrock/` 中的 `StartGame`、`NetworkItem` 和容器事務封包。

#### 2. 資料元件變更
如果物品從舊的 NBT 結構切換到新的資料元件（或者元件被重新命名/重構）：
- 更新 `crates/pumpkin-data/src/data_component.rs`。
- 更新 `pumpkin-inventory` 中的序列化和反序列化。

#### 3. 註冊表同步
在 `Configuration` 階段，伺服器會向 Java 版客戶端傳送動態註冊表內容。如果原版 Minecraft 添加了新的註冊表（例如鍛造模板材料、旗幟圖案、樂器聲音）：
- 驗證 `crates/pumpkin-data/src/generated/registry.rs`。
- 確保 `pumpkin/src/net/java/config.rs` 將所有必需的註冊表編解碼器流式傳輸到客戶端。

---

## 第 6 階段：實現新方塊、物品與實體的邏輯

伺服器能夠編譯後，必須實現所有新增的遊戲內容。

### 1. 新方塊
1. 在 `pumpkin-data::Block` 中找到新的方塊識別符號。
2. 在 `crates/pumpkin/src/block/blocks/<block_name>.rs` 下建立實現 [`BlockBehaviour`](/zh_hk/developer/blocks/adding-blocks) 的行為模組：
   ```rust
   pub struct NewBlockBehaviour;

   impl BlockBehaviour for NewBlockBehaviour {
       fn on_use(&self, block: &Block, player: &Arc<Player>, location: BlockPos, world: &Arc<World>) {
           // 互動邏輯
       }
   }
   ```
3. 在 `crates/pumpkin/src/block/mod.rs` 的方塊註冊表中註冊該行為。

### 2. 新物品
1. 在 `pumpkin-data::Item` 中找到新的物品識別符號。
2. 如果物品具有獨特的右鍵點選或使用行為（例如武器、彈射物、樂器），請在 `crates/pumpkin/src/item/items/<item_name>.rs` 中建立實現 [`ItemBehaviour`](/zh_hk/developer/items/adding-items) 的物品行為。
3. 如果物品會放置實體（例如刷怪蛋、船、礦車），請在 `pumpkin/src/item/items/spawn_egg.rs` 中設定實體生成邏輯。
4. 在 `crates/pumpkin/src/item/mod.rs` 中註冊該行為。

### 3. 新實體
1. 檢查 `pumpkin-data::entity_type::EntityType` 中是否有新的實體 ID。
2. 在 `crates/pumpkin/src/entity/mob/` 或 `living/` 中建立擴充 [`LivingEntity`](/zh_hk/developer/entities/) 的實體結構。
3. 實現 `TrackedData` 欄位，使其符合原版客戶端的預期（例如姿勢、動畫、發光狀態）。
4. 使用[生物 AI 與目標系統](/zh_hk/developer/entities/ai-and-mobs)分配 AI 目標和導航任務。
5. 在 `crates/pumpkin/src/entity/spawning.rs` 中新增生成封包構造。

---

## 第 7 階段：多版本與 ViaVersion 驗證

確保舊版客戶端仍可無縫連線：

1. **驗證生成的重對映表**：
   檢查 `crates/pumpkin-data/src/generated/block_state_remap.rs` 和 `item_id_remap.rs`。確保新增方塊狀態能夠在舊版客戶端上妥善回退到相容的等效狀態（例如將新的木材變種對映為橡木或雲杉木）。
2. **封包轉換**：
   驗證 `pumpkin-protocol` 中的封包寫入器在為連線序列化資料時會應用 `remap` 函數，前提是該連線協商得到的 `protocol_version` 低於伺服器的原生版本。

---

## 第 8 階段：測試與驗證檢查清單

在為版本移植建立拉取請求之前，請完成以下質素保障檢查清單：

- [ ] **自動化測試**：
  ```bash
  cargo test --workspace
  ```
- [ ] **遊戲測試套件**：
  ```bash
  cargo test -p pumpkin-gametest
  ```
- [ ] **嚴格的 Linter 規則**：
  ```bash
  cargo clippy --workspace --all-targets -- -D warnings
  ```
- [ ] **拼寫檢查**：
  ```bash
  typos
  ```
- [ ] **Java 版客戶端遊戲內測試**：
  - 使用原生新版 Minecraft 客戶端連線。
  - 測試登入、世界載入、區塊生成和玩家移動。
  - 放置並破壞新方塊；驗證碰撞箱和紅石回應。
  - 使用並裝備新物品；測試攻擊速度、耐久度和動畫。
  - 生成新實體並與其戰鬥；測試動畫、受傷音效和掉落物。
- [ ] **舊版客戶端遊戲內測試**：
  - 使用受支援的舊版客戶端（例如 1.21.x）連線。
  - 驗證方塊、物品和實體的轉換不會導致客戶端崩潰或不同步。
- [ ] **基岩版客戶端遊戲內測試**：
  - 驗證基岩版客戶端能夠完成身份驗證、加入遊戲、載入世界區塊並檢視自訂物品。
