# 程式碼生成（`pumpkin-codegen`）

Minecraft 是一款龐大的遊戲，包含數千種方塊狀態、物品、封包 ID、聲音事件、配方和生物群系參數。這些註冊表在 Minecraft 更新時經常發生變化。

為了在無需手動維護數萬個易錯常量的情況下保持 100% 的保真度，Pumpkin 使用了自動程式碼生成工具：[`tools/pumpkin-codegen`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/tools/pumpkin-codegen)。

---

## 用途與工作流

`pumpkin-codegen` 解析官方 Minecraft 伺服器資料生成器報告、資原始檔和版本規範，並將零成本、強類型的 Rust 檔案直接輸出到 [`crates/pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data)。

該管線分為三個不同的階段：
1. **讀取**：從 `assets/` 和 `assets/datapacks/` 讀取原始 JSON 資源和原版伺服器報告。
2. **轉換**：規範化狀態、計算位集、處理 ViaVersion 重對映並優化查詢表。
3. **輸出**：將編譯後的 Rust 常量和結構輸出到 [`crates/pumpkin-data/src/generated`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data/src/generated)。

---

## 生成的資料集

`pumpkin-codegen` 在 `pumpkin-data` 中生成以下元件：

| 類別 | 說明 | 生成的原始檔 |
| :--- | :--- | :--- |
| **封包** | 所支援的 Minecraft 版本中，所有協定狀態的服務端接收和客戶端接收封包 ID。 | `packet.rs` |
| **方塊** | 方塊定義、預設狀態、狀態屬性（朝向、充能、含水等）和方塊碰撞箱。 | `block.rs` |
| **物品** | 物品定義、堆棧數量、耐久度、資料元件、食物屬性和裝備欄位。 | `item.rs` |
| **註冊表** | 生物群系、維度、聊天類型、傷害類型、鍛造模板材料和旗幟圖案的動態註冊表。 | `registry.rs` |
| **生物群系與噪聲** | 氣候參數、噪聲路由器設定、3D 噪聲設定和表面規則。 | `biome.rs`、`noise_router.rs` |
| **實體** | 實體類型、預設邊界框、屬性和受追蹤的實體元資料模式。 | `entity_type.rs`、`tracked_data.rs` |
| **配方與合成** | 有序、無序、熔煉、高爐、煙燻和切石配方。 | `recipes.rs` |
| **標籤** | 方塊標籤、物品標籤、流體標籤和實體類型標籤（例如 `#minecraft:mineable/pickaxe`）。 | `tag.rs` |
| **附魔與藥水** | 附魔定義、藥水效果和釀造臺配方。 | `enchantments.rs`、`potion.rs` |
| **翻譯** | 用於聊天訊息和物品名稱的官方本地化鍵。 | `translations.rs` |
| **插件 WIT** | 定義插件界面的 WebAssembly 元件模型 WIT 檔案。 | `wit/` |

---

## 執行程式碼生成

要在本地執行程式碼生成器：

```bash
# 進入工作區根目錄
cd Pumpkin

# 執行程式碼生成工具
cargo run -p pumpkin-codegen
```

### 何時應執行程式碼生成？

- **升級到新的 Minecraft 版本**：將 Pumpkin 移植到新的 Minecraft 次要或主要版本時。
- **新增協定對映**：新增對較舊或較新客戶端協定版本的支援時。
- **更新 WIT 定義**：向 WebAssembly 插件 API 新增新函數或類型時。

---

## 資料來源

`pumpkin-codegen` 從以下幾個主要來源讀取資料：

1. **Minecraft 資料生成器報告**：透過執行 `java -DbundlerMainClass=net.minecraft.data.Main -jar server.jar --reports` 生成。
2. **Minecraft 客戶端資源**：從客戶端 `.jar` 檔案中提取，用於翻譯鍵、模型形狀和聲音對映。
3. **Minecraft 協定 Wiki**：與協定規範交叉核對封包 ID。
