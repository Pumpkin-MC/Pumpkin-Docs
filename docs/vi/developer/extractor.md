# Trình Trích xuất Dữ liệu Vanilla

[Pumpkin Extractor](https://github.com/Pumpkin-MC/Extractor) là một Fabric mod chuyên dụng được viết bằng Kotlin introspect một máy chủ hoặc client Minecraft vanilla đang chạy để dump các registry trò chơi chính thức và metadata runtime thành các file JSON có cấu trúc.

Các dump JSON này được tiêu thụ bởi [`pumpkin-codegen`](/developer/codegen) để tạo mã Rust có kiểu mạnh trong `pumpkin-data` và `pumpkin-world`.

---

## Datapack vs. Extractor: Triết lý Dữ liệu của Chúng tôi

Trước khi tạo một extractor mới, điều quan trọng là phải hiểu hệ thống phân cấp dữ liệu của Pumpkin:

> [!IMPORTANT]
> **Chúng tôi ưu tiên sử dụng vanilla datapack bất cứ khi nào có thể.**
> Nếu Minecraft vanilla đã hiển thị một registry hoặc hệ thống qua các file JSON datapack chính thức, chúng tôi tiêu thụ datapack trực tiếp thay vì viết mã extractor tùy chỉnh.

### Khi nào Sử dụng Datapack vs. Khi nào Sử dụng Extractor

| Nguồn | Khi nào Sử dụng | Ví dụ |
| :--- | :--- | :--- |
| **Vanilla Datapack** *(Ưu tiên)* | Bất kỳ dữ liệu nào được tuần tự hóa chính thức thành JSON bởi Mojang trong `data/minecraft/`. | Công thức, tag (`blocks`, `items`, `fluids`), biome, loại chiều, loại sát thương, vật liệu trim, tham số noise worldgen. |
| **Fabric Extractor** *(Chỉ khi cần thiết)* | Dữ liệu trò chơi **được hardcode trong Java bytecode** không thể xuất từ file datapack thô. | Hình dạng va chạm khối, AABB bounding box, độ cứng khối,t mapping ID packet sang trạng thái, ID dữ liệu theo dõi entity, thời gian đốt nhiên liệu, cơ hội composter và bảng chuyển đổi chậu hoa. |

---

## Kiến trúc Mod Extractor

Extractor chạy trên đỉnh Fabric loader sử dụng Yarn mapping chính thức của Fabric:

- **Điểm Vào Mod (`src/main/kotlin/de/snowii/extractor/Extractor.kt`)**: Đăng ký với sự kiện `ServerLifecycleEvents.SERVER_STARTED` của Fabric. Khi máy chủ headless hoàn tất khởi động, nó gọi tất cả các extractor đã đăng ký và dump file vào `run/pumpkin_extractor_output/`.
- **Giao diện Extractor**: Mỗi trình trích xuất dữ liệu triển khai giao diện `Extractor.Extractor`:
  ```kotlin
  interface Extractor {
      fun fileName(): String

      @Throws(Exception::class)
      fun extract(server: MinecraftServer): JsonElement

      // Trả về true nếu đầu ra thuộc về tests/ thay vì thư mục đầu ra gốc
      fun isTest(): Boolean = false
  }
  ```
- **Thư mục Đầu ra**: Các file JSON được lưu vào `pumpkin_extractor_output/` được mã hóa UTF-8 mà không có HTML escaping.

---

## Cách Thêm một Extractor Mới

Thực hiện quy trình làm việc từng bước này khi bạn cần trích xuất cơ chế vanilla hardcode mới:

### Bước 1: Xác minh Dữ liệu Không thể Lấy từ Datapack
Kiểm tra client/server JAR Minecraft chính thức hoặc báo cáo dữ liệu của Mojang:
- Kiểm tra `data/minecraft/` cho các registry, tag hoặc định nghĩa JSON hiện có.
- Nếu dữ liệu có mặt trong datapack, hãy thêm trực tiếp vào `Pumpkin/assets/datapacks/` thay vì viết một extractor.

### Bước 2: Tạo Lớp Extractor
Nếu dữ liệu được hardcode trong các phương thức Java, tạo một lớp Kotlin mới trong:
```text
src/main/kotlin/de/snowii/extractor/extractors/<TênExtractor>.kt
```

Triển khai giao diện `Extractor.Extractor`:

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

        // Truy vấn các phương thức runtime vanilla
        server.fuelValues().fuelItems().forEach { fuel ->
            val itemId = BuiltInRegistries.ITEM.getKey(fuel).toString()
            val burnDuration = server.fuelValues().burnDuration(ItemStack(fuel))
            fuelsJson.add(itemId, JsonPrimitive(burnDuration))
        }

        return fuelsJson
    }
}
```

### Bước 3: Đăng ký Extractor
Mở `src/main/kotlin/de/snowii/extractor/Extractor.kt` và thêm một instance của lớp bạn vào mảng `extractors`:

```kotlin
val extractors = arrayOf(
    // ... các extractor hiện có ...
    Blocks(),
    Items(),
    Entities(),
    Fuels(), // [!code ++]
)
```

### Bước 4: Chạy Extractor
Thực thi task máy chủ headless trong repository Extractor:

```bash
./gradlew runServer
```

Sau khi trích xuất hoàn tất, định vị file JSON mới của bạn trong:
```text
run/pumpkin_extractor_output/<file_của_bạn>.json
```

### Bước 5: Tích hợp với `pumpkin-codegen`
1. Di chuyển file JSON đã tạo vào Pumpkin:
   ```bash
   cp run/pumpkin_extractor_output/fuels.json ../Pumpkin/assets/
   ```
2. Trong repository `Pumpkin`, mở `tools/pumpkin-codegen`:
   - Tạo một parser cho `<file_của_bạn>.json`.
   - Viết một mẫu tạo mã để tạo các struct Rust hoặc bảng tra cứu tĩnh tương ứng trong `crates/pumpkin-data`.
3. Chạy tạo mã:
   ```bash
   cargo run -p pumpkin-codegen
   ```
4. Xác minh rằng `pumpkin-data` biên dịch và vượt qua tất cả unit test:
   ```bash
   cargo test -p pumpkin-data
   ```

---

## Thực hành Tốt nhất cho Đóng góp Extractor

- **Sắp xếp Key Một cách Định trước**: Khi tạo object hoặc danh sách JSON, sắp xếp các mục theo ID registry số hoặc theo bảng chữ cái theo định danh (`minecraft:stone`, `minecraft:dirt`). Điều này ngăn chặn các git diff ồn khi chạy lại trích xuất qua các bản cập nhật.
- **Ưu tiên Các kiểu Tiêu chuẩn**: Sử dụng các định danh vanilla (`net.minecraft.resources.Identifier`) làm key chuỗi thay vì các số nguyên tùy ý khi có thể.
- **Access Widener**: Nếu các trường hoặc phương thức vanilla riêng tư cần được truy cập, hãy khai báo một access widener trong `src/main/resources/extractor.accesswidener` thay vì sử dụng reflection runtime dễ hỏng.
