# 原版資料提取器

[Pumpkin Extractor](https://github.com/Pumpkin-MC/Extractor) 是一個使用 Kotlin 編寫的專用 Fabric 模組，它會檢查正在執行的原版 Minecraft 伺服器或用戶端，並將權威的遊戲註冊表和執行階段元資料轉儲為結構化 JSON 檔案。

[`pumpkin-codegen`](/zh_tw/developer/codegen) 會讀取這些 JSON 轉儲，在 `pumpkin-data` 和 `pumpkin-world` 中生成強型別 Rust 程式碼。

---

## 資料包與提取器：我們的資料理念

在建立新的提取器之前，必須先了解 Pumpkin 的資料層級：

> [!IMPORTANT]
> **只要條件允許，我們就優先使用原版資料包。**
> 如果原版 Minecraft 已經透過官方資料包 JSON 檔案公開了某個註冊表或系統，我們就直接使用該資料包，而不是編寫自訂提取器程式碼。

### 何時使用資料包，何時使用提取器

| 來源 | 使用時機 | 範例 |
| :--- | :--- | :--- |
| **原版資料包** *（首選）* | Mojang 在 `data/minecraft/` 中正式序列化為 JSON 的任何資料。 | 配方、標籤（`blocks`、`items`、`fluids`）、生物群系、維度型別、傷害型別、鍛造模板材料、世界生成噪聲引數。 |
| **Fabric 提取器** *（僅在必要時使用）* | **硬編碼在 Java 位元組碼中**、無法從原始資料包檔案匯出的遊戲資料。 | 方塊碰撞形狀、AABB 邊界框、方塊硬度、封包 ID 到狀態的對映、實體追蹤資料 ID、燃料燃燒時長、堆肥桶機率和花盆轉換表。 |

---

## 提取器模組架構

提取器基於 Fabric 載入器執行，並使用官方 Fabric Yarn 對映：

- **模組入口點（`src/main/kotlin/de/snowii/extractor/Extractor.kt`）**：註冊到 Fabric 的 `ServerLifecycleEvents.SERVER_STARTED` 事件。無介面伺服器完成啟動後，它會呼叫所有已註冊的提取器，並將檔案轉儲到 `run/pumpkin_extractor_output/`。
- **提取器介面**：每個資料提取器都實現 `Extractor.Extractor` 介面：
  ```kotlin
  interface Extractor {
      fun fileName(): String

      @Throws(Exception::class)
      fun extract(server: MinecraftServer): JsonElement

      // 如果輸出應放在 tests/ 而非根輸出目錄，則返回 true
      fun isTest(): Boolean = false
  }
  ```
- **輸出目錄**：JSON 檔案以 UTF-8 編碼儲存到 `pumpkin_extractor_output/`，不進行 HTML 轉義。

---

## 如何新增新的提取器

需要提取新的硬編碼原版機制時，請按照以下步驟操作：

### 第 1 步：確認無法從資料包獲取資料
檢查官方 Minecraft 用戶端/伺服器 JAR 或 Mojang 的資料報告：
- 檢查 `data/minecraft/` 中是否已有相應的註冊表、標籤或 JSON 定義。
- 如果資料包中已有該資料，請直接將其新增到 `Pumpkin/assets/datapacks/`，不要編寫提取器。

### 第 2 步：建立提取器類
如果資料硬編碼在 Java 方法中，請在以下位置建立新的 Kotlin 類：
```text
src/main/kotlin/de/snowii/extractor/extractors/<ExtractorName>.kt
```

實現 `Extractor.Extractor` 介面：

```kotlin
package de.snowii.extractor.extractors

import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive
import de.snowii.extractor.Extractor
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.server.MinecraftServer
import net.minecraft.world.item.Item
import net.minecraft.world.item.ItemStack

class Fuels : Extractor.Extractor {
    override fun fileName(): String {
        return "fuels.json"
    }

    override fun extract(server: MinecraftServer): JsonElement {
        val fuelsJson = JsonObject()

        // 查詢原版執行階段方法
        server.fuelValues().fuelItems().forEach { fuel ->
            val itemId = BuiltInRegistries.ITEM.getKey(fuel).toString()
            val burnDuration = server.fuelValues().burnDuration(ItemStack(fuel))
            fuelsJson.add(itemId, JsonPrimitive(burnDuration))
        }

        return fuelsJson
    }
}
```

### 第 3 步：註冊提取器
開啟 `src/main/kotlin/de/snowii/extractor/Extractor.kt`，將你的類實例新增到 `extractors` 陣列中：

```kotlin
val extractors = arrayOf(
    // ... 現有提取器 ...
    Blocks(),
    Items(),
    Entities(),
    Fuels(), // [!code ++]
)
```

### 第 4 步：執行提取器
在 Extractor 倉庫中執行無介面伺服器任務：

```bash
./gradlew runServer
```

提取完成後，在以下位置找到新生成的 JSON 檔案：
```text
run/pumpkin_extractor_output/<your_file>.json
```

### 第 5 步：與 `pumpkin-codegen` 整合
1. 將生成的 JSON 檔案移入 Pumpkin：
   ```bash
   cp run/pumpkin_extractor_output/fuels.json ../Pumpkin/assets/
   ```
2. 在 `Pumpkin` 倉庫中開啟 `tools/pumpkin-codegen`：
   - 為 `<your_file>.json` 建立解析器。
   - 編寫程式碼生成模板，在 `crates/pumpkin-data` 中生成相應的 Rust 結構或靜態查詢表。
3. 執行程式碼生成：
   ```bash
   cargo run -p pumpkin-codegen
   ```
4. 驗證 `pumpkin-data` 能夠編譯並透過所有單元測試：
   ```bash
   cargo test -p pumpkin-data
   ```

---

## 提取器貢獻最佳實踐

- **確定性地排序鍵**：生成 JSON 物件或列表時，按註冊表數字 ID 或識別符號字母順序（`minecraft:stone`、`minecraft:dirt`）對條目排序。這樣可避免跨更新重新執行提取時產生無關的 git diff。
- **優先使用標準型別**：盡可能使用原版識別符號（`net.minecraft.resources.Identifier`）作為字串鍵，而不是任意整數。
- **存取擴充器**：如果需要存取原版的私有欄位或方法，請在 `src/main/resources/extractor.accesswidener` 中宣告存取擴充器，而不要使用脆弱的執行階段反射。
