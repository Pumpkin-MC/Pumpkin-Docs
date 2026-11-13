# Chuyển porta Sang Phiên bản Minecraft Mới hơn

Nâng cấp Pumpkin để hỗ trợ một bản phát hành Minecraft mới hơn—dù là bản vá phụ (ví dụ: `1.21.4` đến `1.21.5`) hay bản cập nhật chính (ví dụ: `1.21` đến `26.1`/`26.2`)—là một quy trình có cấu trúc, nhiều bước.

> [!IMPORTANT]
> **Mod Extractor phải được chuyển porta trước!**
> Pumpkin không thể được chuyển porta một cách cô lập. Nguồn chính cho các asset của Pumpkin (`blocks.json`, `items.json`, `entities.json`, `packets.json`, `tracked_data.json`, `synced_registries.json`, v.v.) là Fabric mod chuyên dụng của chúng tôi: [Pumpkin-MC/Extractor](https://github.com/Pumpkin-MC/Extractor). Bạn **phải chuyển porta và chạy Extractor trên phiên bản Minecraft mục tiêu trước** khi chạy `pumpkin-codegen` hoặc cập nhật các crate máy chủ.

### Vòng đời Chuyển porta Nhìn nhanh

| Giai đoạn | Trách nhiệm | Crate / Công cụ Chính |
| :--- | :--- | :--- |
| **1. Chuyển porta Extractor** | Trích xuất trạng thái khối vanilla, entity, vật phẩm, packet và registry | `Pumpkin-MC/Extractor` (Fabric mod) |
| **2. Cập nhật Datapack** | Nạp datapack mới, tag, công thức và mapping Bedrock | `assets/datapacks/<ver>`, `assets/bedrock` |
| **3. Khai báo Phiên bản** | Đăng ký phiên bản giao thức và các node remap ViaVersion/ViaBackwards | `pumpkin-util`, `tools/pumpkin-codegen` |
| **4. Tạo Mã** | Tạo lại các bảng dữ liệu và registry Rust không tốn kém | `pumpkin-codegen` -> `pumpkin-data` |
| **5. Sửa lỗi Compiler** | Cập nhật bố cục packet, codec và data component | `pumpkin-protocol`, `pumpkin-inventory` |
| **6. Logic Gameplay** | Triển khai hành vi khối mới, cơ chế vật phẩm và AI mob | `crates/pumpkin/src/block`, `item`, `entity` |
| **7. QA Đa phiên bản** | Xác minh khả năng tương thích ngược, test suite và join client | `cargo test`, `pumpkin-gametest` |

---

## Giai đoạn 1: Chuyển porta Mod Extractor Trước (`Pumpkin-MC/Extractor`)

[Extractor](https://github.com/Pumpkin-MC/Extractor) là một Fabric mod dựa trên Kotlin khởi động một instance client hoặc máy chủ Minecraft thực tế để introspect các registry trò chơi trực tiếp và trích xuất dữ liệu thành các định dạng JSON chính xác mà Pumpkin mong đợi.

### 1. Clone hoặc Cập nhật Repository Extractor
```bash
git clone https://github.com/Pumpkin-MC/Extractor
cd Extractor
```

### 2. Cập nhật `gradle.properties`
Bump các phiên bản phụ thuộc để khớp với phiên bản Minecraft mục tiêu, Yarn mapping và hệ sinh thái Fabric:

```properties
minecraft_version=26.2
yarn_mappings=26.2+build.1:v2
loader_version=0.16.10
fabric_version=0.115.0+26.2
```

### 3. Giải quyết Lỗi Biên dịch Extractor
Minecraft và các API nội bộ Fabric thường xuyên thay đổi giữa các bản phát hành. Kiểm tra và sửa các extractor bị hỏng trong `src/main/kotlin/de/snowii/extractor/extractors/`:
- **`Blocks.kt`**: Trích xuất trạng thái khối, độ cứng, sức đề kháng, độ sáng và offset hộp va chạm.
- **`Items.kt`**: Trích xuất ID vật phẩm, kích thước stack tối đa và component mặc định.
- **`Entities.kt`**: Trích xuất ID entity, kích thước (chiều rộng, chiều cao) và chiều cao mắt.
- **`Packets.kt`**: Trích xuất ID packet cho các trạng thái handshake, status, login, configuration và play.
- **`SyncedRegistries.kt`**: Trích xuất các registry động được đồng bộ hóa đến client.
- **`TrackedData.kt`**: Trích xuất các chỉ số dữ liệu entity được theo dõi và bộ tuần tự hóa.
- **`MultiNoise.kt` & `Biome.kt`**: Trích xuất cây biome tạo thế giới và tham số noise.

### 4. Chạy Extractor
Thực thi runner máy chủ (hoặc runner client cho dump translation/màn hình):

```bash
./gradlew runServer
```

Sau khi trích xuất hoàn tất, tất cả file JSON đã dump sẽ nằm trong `run/pumpkin_extractor_output/`.

### 5. Thay thế File Asset Cũ trong Pumpkin
Sao chép các file JSON mới được tạo từ `run/pumpkin_extractor_output/` và sử dụng chúng để **thay thế các file asset cũ** trong Pumpkin:
- Thay thế các asset trò chơi cốt lõi trong `Pumpkin/assets/` (`blocks.json`, `items.json`, `entities.json`, `packets.json`, `properties.json`, `synced_registries.json`, `tracked_data.json`, `en_us.json`, v.v.).
- Thay thế các file test tạo thế giới trong `Pumpkin/crates/pumpkin-world/assets/`.

---

## Giai đoạn 2: Cập nhật Asset & Datapack

Khi các asset extractor thô đã sẵn sàng, cập nhật các datapack theo phiên bản và file bổ sung trong Pumpkin:

### 1. Thêm Datapack theo Phiên bản
Trích xuất datapack vanilla nội bộ từ JAR máy chủ Minecraft mới và đặt nó dưới `assets/datapacks/<phiên_bản>/`:

```
assets/datapacks/<phiên_bản>/
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
        └── tags/ (Conventional / Common Tags)
```

### 2. Cập nhật Asset theo Phiên bản
Cập nhật hoặc tạo các file metadata theo phiên bản tương ứng:
- `assets/registry/<phiên_bản>_synced_registries.json`: Registry động được streaming đến client trong trạng thái mạng `Configuration`.
- `assets/tags/<phiên_bản>_tags.json`: Bộ sưu tập tag.
- `assets/tracked_data/<phiên_bản>_tracked_data.json`: Các chỉ số metadata entity.

### 3. Cập nhật Mapping Bedrock
Nếu chuyển porta hỗ trợ Bedrock Edition đồng thời, cập nhật các file trong `assets/bedrock/` sử dụng mapping mới nhất từ [GeyserMC](https://github.com/GeyserMC/Geyser) và Bedrock Dedicated Server (BDS).

### 4. Phân giải Nguồn để Kỹ thuật ngược (Tùy chọn nhưng Khuyến nghị)
Đối với các thay đổi phức tạp—như công thức bộ định tuyến noise worldgen và hình dạng va chạm khối tùy chỉnh—phân giải JAR vanilla phù hợp vào `minecraft-sources-<phiên_bản>/` (sử dụng Vineflower hoặc Fabric Loom với mapping Mojang chính thức) để tham khảo.

---

## Giai đoạn 3: Đăng ký Hằng số Phiên bản & Mapping ViaVersion

Pumpkin hỗ trợ client đa phiên bản thông qua remapping giao thức tự động được hỗ trợ bởi các bảng mapping **ViaBackwards** / **ViaRewind**.

### 1. Khai báo Phiên bản trong `pumpkin-util`
Mở `crates/pumpkin-util/src/version.rs` và thêm phiên bản mới vào [`JavaMinecraftVersion`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-util/src/version.rs):

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum JavaMinecraftVersion {
    // ... các phiên bản hiện có ...
    V_1_21_4,
    V_1_21_11,
    V_26_2, // Phiên bản mục tiêu mới
}

impl JavaMinecraftVersion {
    pub const fn protocol_version(&self) -> i32 {
        match self {
            // ...
            Self::V_26_2 => 770, // Số phiên bản giao thức
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

### 2. Khai báo Phiên bản trong `pumpkin-codegen`
Mở `tools/pumpkin-codegen/src/version.rs` và thêm biến thể enum giống hệt vào AST codegen.

### 3. Thêm Mapping ViaVersion / ViaBackwards
Để cho phép client trên các phiên bản cũ hơn kết nối đến máy chủ đã cập nhật (vd: client `1.21.4` kết nối đến máy chủ `26.2`):
1. Lấy file mapping NBT từ repository [ViaBackwards](https://github.com/ViaVersion/ViaBackwards):
   `mappings-<phiên_bản_mới>to<phiên_bản_trước>.nbt`
2. Lưu vào:
   `assets/viabackwards/data/mappings-<phiên_bản_mới>to<phiên_bản_trước>.nbt`
3. Trong `tools/pumpkin-codegen/src/remap/mod.rs`, liên kết node mới vào macro `remap_nodes!`:

```rust
let node_26_2 = $crate::remap::MappingNode {
    version: $crate::version::JavaMinecraftVersion::V_26_2,
    value: "../../assets/viabackwards/data/mappings-26.2to26.1.nbt",
    child: Some(&node_26_1),
};
$remapper.process(&node_26_2)
```

4. Kiểm tra `tools/pumpkin-codegen/src/remap/` để đảm bảo các builder remap cụ thể (`block_state.rs`, `item_id.rs`, `entity_id.rs`, `sound_id.rs`, `argument_type.rs`) xử lý đúng các cấu trúc remap mới được giới thiệu bởi ViaVersion.

---

## Giai đoạn 4: Chạy Tạo Mã (`pumpkin-codegen`)

Khi tất cả asset extractor, datapack và node mapping đã sẵn sàng, thực thi công cụ codegen từ gốc workspace:

```bash
cargo run -p pumpkin-codegen
```

### Cái gì Được Tạo lại?
`pumpkin-codegen` tạo các bảng dữ liệu Rust không tốn kém vào `crates/pumpkin-data/src/generated/`:
- **`block.rs`**: Tất cả ID khối, thuộc tính, mask trạng thái và hình dạng va chạm.
- **`item.rs`**: Vật phẩm, component mặc định và cấp độ công cụ.
- **`entity_type.rs` & `tracked_data.rs`**: ID loại entity, bounding box mặc định và bộ tuần tự hóa metadata.
- **`packet.rs`**: Các hằng số ID packet serverbound và clientbound trên các trạng thái giao thức.
- **`recipes.rs`**: Tất cả công thức chế tạo, nấu và cắt đá được phân tích từ datapack mới.
- **`tag.rs`**: Tra cứu tag (`#minecraft:mineable/axe`, `#c:iron_ingots`).
- **`remap/*.rs`**: Các bảng tra cứu remap trạng thái (`block_state_remap.rs`, `item_id_remap.rs`, `entity_id_remap.rs`, `sound_id_remap.rs`).

---

## Giai đoạn 5: Giải quyết Lỗi Biên dịch Workspace

Sau khi tạo lại `pumpkin-data`, compiler Rust sẽ gắn cờ các thay đổi phá vỡ trên toàn workspace. Chạy:

```bash
cargo check --workspace
```

### Các Lỗi Compiler Phổ biến & Cách sửa:

#### 1. Thay đổi ID & Bố cục Packet (`pumpkin-protocol`)
Mojang thường xuyên thêm, di chuyển hoặc thay đổi ID packet và payload:
- Cập nhật `pumpkin-protocol/src/java/client/` và `pumpkin-protocol/src/java/server/`.
- Kiểm tra các packet như `LoginSuccess`, `PlayLogin`, `Respawn` và `PlayerSpawnData` cho các trường mới thêm (vd: cờ chế độ chơi mới, thuộc tính chiều hoặc ID teleport).
- Đối với Bedrock Edition, kiểm tra `StartGame`, `NetworkItem` và packet giao dịch container trong `pumpkin-protocol/src/bedrock/`.

#### 2. Thay đổi Data Component
Nếu vật phẩm chuyển từ cấu trúc NBT cũ sang Data Component mới (hoặc nếu component được đổi tên/cấu trúc lại):
- Cập nhật `crates/pumpkin-data/src/data_component.rs`.
- Cập nhật tuần tự hóa và giải tuần tự hóa trong `pumpkin-inventory`.

#### 3. Đồng bộ Registry
Trong giai đoạn `Configuration`, máy chủ gửi nội dung registry động đến client Java. Nếu registry mới được thêm vào vanilla Minecraft (vd: vật liệu trim, mẫu banner, âm thanh nhạc cụ):
- Xác minh `crates/pumpkin-data/src/generated/registry.rs`.
- Đảm bảo `pumpkin/src/net/java/config.rs` streaming tất cả codec registry yêu cầu đến client.

---

## Giai đoạn 6: Triển khai Logic cho Khối, Vật phẩm & Entity Mới

Sau khi máy chủ biên dịch, bất kỳ nội dung gameplay mới được giới thiệu đều phải được triển khai.

### 1. Khối Mới
1. Định vị các định danh khối mới trong `pumpkin-data::Block`.
2. Tạo một module hành vi dưới `crates/pumpkin/src/block/blocks/<tên_khối>.rs` triển khai [`BlockBehaviour`](/developer/blocks/adding-blocks):
   ```rust
   pub struct NewBlockBehaviour;

   impl BlockBehaviour for NewBlockBehaviour {
       fn on_use(&self, block: &Block, player: &Arc<Player>, location: BlockPos, world: &Arc<World>) {
           // Logic tương tác
       }
   }
   ```
3. Đăng ký hành vi trong registry khối trong `crates/pumpkin/src/block/mod.rs`.

### 2. Vật phẩm Mới
1. Định vị các định danh vật phẩm mới trong `pumpkin-data::Item`.
2. Nếu vật phẩm có hành vi right-click hoặc sử dụng độc nhất (vd: vũ khí, đạn đạo, nhạc cụ), tạo một hành vi vật phẩm trong `crates/pumpkin/src/item/items/<tên_vật_phẩm>.rs` triển khai [`ItemBehaviour`](/developer/items/adding-items).
3. Nếu vật phẩm đặt entity (vd: trứng sinh, thuyền, xe mỏ), cấu hình logic spawn entity trong `pumpkin/src/item/items/spawn_egg.rs`.
4. Đăng ký hành vi trong `crates/pumpkin/src/item/mod.rs`.

### 3. Entity Mới
1. Kiểm tra `pumpkin-data::entity_type::EntityType` cho ID entity mới.
2. Tạo một struct entity trong `crates/pumpkin/src/entity/mob/` hoặc `living/` mở rộng [`LivingEntity`](/developer/entities/).
3. Triển khai các trường `TrackedData` để khớp với kỳ vọng client vanilla (vd: tư thế, hoạt ảnh, trạng thái phát sáng).
4. Gán mục tiêu AI và task điều hướng sử dụng [hệ thống Mob AI & Goals](/developer/entities/ai-and-mobs).
5. Thêm xây dựng packet spawn trong `crates/pumpkin/src/entity/spawning.rs`.

---

## Giai đoạn 7: Xác minh Đa phiên bản & ViaVersion

Đảm bảo rằng các client cũ hơn vẫn có thể kết nối một cách liền mạch:

1. **Xác minh Bảng Remap Được Tạo**:
   Kiểm tra `crates/pumpkin-data/src/generated/block_state_remap.rs` và `item_id_remap.rs`. Đảm bảo rằng các trạng thái khối mới dự phòng gracefully các tương đương tương thích trên phiên bản client cũ hơn (vd: biến thể gỗ mới mapping sang sồi hoặc vân sam).
2. **Dịch Packet**:
   Xác minh rằng các packet writer trong `pumpkin-protocol` áp dụng các hàm `remap` khi tuần tự hóa dữ liệu cho kết nối có `protocol_version` đã thương lượng cũ hơn phiên bản native của máy chủ.

---

## Giai đoạn 8: Checklist Kiểm tra & Xác minh

Trước khi mở Pull Request cho một port phiên bản, hoàn thành checklist QA sau:

- [ ] **Test Tự động**:
  ```bash
  cargo test --workspace
  ```
- [ ] **Suite Game Test**:
  ```bash
  cargo test -p pumpkin-gametest
  ```
- [ ] **Quy tắc Linter Nghiêm ngặt**:
  ```bash
  cargo clippy --workspace --all-targets -- -D warnings
  ```
- [ ] **Kiểm tra Chính tả**:
  ```bash
  typos
  ```
- [ ] **Test Client Java Trong Trò chơi**:
  - Kết nối với phiên bản client Minecraft mới native.
  - Test đăng nhập, tải thế giới, tạo chunk và di chuyển người chơi.
  - Đặt và phá các khối mới; xác minh hộp va chạm và phản ứng redstone.
  - Sử dụng và trang bị vật phẩm mới; test tốc độ tấn công, độ bền và hoạt ảnh.
  - Spawn và chiến đấu với entity mới; test hoạt ảnh, âm thanh bị thương và drop.
- [ ] **Test Client Phiên bản Cũ hơn Trong Trò chơi**:
  - Kết nối với một phiên bản client cũ hơn được hỗ trợ (vd: 1.21.x).
  - Xác minh rằng các khối, vật phẩm và entity dịch mà không gây crash client hoặc đồng bộ sai.
- [ ] **Test Client Bedrock Trong Trò chơi**:
  - Xác minh rằng các client Bedrock có thể xác thực, tham gia, tải chunk thế giới và xem vật phẩm tùy chỉnh.
