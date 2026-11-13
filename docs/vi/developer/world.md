# Hệ thống Thế giới & Định dạng

Hệ thống thế giới được quản lý chủ yếu trong crate [`pumpkin-world`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-world). Nó xử lý các định dạng lưu trữ thế giới, đọc và ghi chunk, tạo địa hình, tính toán ánh sáng và tick khối.

---

## Các Định dạng Thế giới Được Hỗ trợ

Pumpkin được thiết kế để hỗ trợ nhiều định dạng vùng và thế giới, mang lại cho quản trị viên máy chủ sự linh hoạt giữa khả năng tương thích vanilla và nén hiệu suất cao hiện đại.

### 1. Định dạng File Anvil (`.mca`)

Định dạng Anvil là định dạng tiêu chuẩn được sử dụng bởi vanilla Minecraft: Java Edition.

- **Cấu trúc**: Các chunk được nhóm thành các vùng chunk 32×32 lưu trong file `.mca` (`r.{x}.{z}.mca`).
- **Lớp Dữ liệu**: Mỗi chunk chứa palette trạng thái khối, palette biome, heightmap, tile entity và mảng ánh sáng.
- **Nén**: Các chunk riêng lẻ trong file vùng được nén bằng ZLib hoặc LZ4.
- **Hỗ trợ**: Pumpkin hỗ trợ **cả đọc và ghi** file vùng Anvil.

### 2. Định dạng Vùng Linear (`.linear`)

Linear là một giải pháp thay thế hiện đại cho Anvil giúp giảm drastically kích thước lưu thế giới và tăng tốc I/O đĩa bằng cách sử dụng nén **Zstandard (zstd)** trên toàn vùng thay vì các khối zlib trên mỗi chunk.

- **Tiết kiệm**: Giảm sử dụng đĩa ~50% ở Overworld và Nether, và lên đến ~95% ở The End.
- **Hiệu suất**: Tốc độ giải nén cao và giảm ghi đĩa khiến nó lý tưởng cho các máy chủ production throughput cao.
- **Hỗ trợ**: Hỗ trợ đọc/ghi native được tích hợp sẵn trong `pumpkin-world`.

### 3. Định dạng Thế giới Slime (`.slime`)

Ban đầu được phát triển bởi Hypixel, định dạng Slime đóng gói toàn bộ thế giới thành một file binary duy nhất, nhỏ gọn, dễ nhân bản. Nó được tối ưu hóa cho minigame và các thế giới instance tạm thời.

### 4. Định dạng Pump

Định dạng lưu trữ chunk native của Pumpkin được thiết kế đặc biệt cho tuần tự hóa nhanh mà không có chi phí thừa kế của định dạng Anvil.

---

Hệ thống thế giới tổ chức quản lý chunk và ticking thành các lớp phân cấp:

### Hệ thống Phân cấp

1. **`World`**: Quản lý các chiều (`overworld`, `the_nether`, `the_end`), định vị người chơi trong chiều đó và broadcast cập nhật.
2. **`Level`**: Cấu trúc dữ liệu cốt lõi chứa bảng chunk, ranh giới độ cao (-64 đến 320 cho thế giới vanilla 1.18+), registry khối và bộ lập lịch tick.
3. **`Chunker`**: Quản lý khoảng cách hiển thị và đăng ký người chơi. Sử dụng `CylindricalChunkIterator` để tính toán những chunk nào cần streaming đến người chơi khi họ di chuyển.

### Pipeline Chunk Bất đồng bộ

Để duy trì tốc độ tick 20 TPS ổn định:

- Các chunk được yêu cầu bởi người chơi được kiểm tra trong cache bộ nhớ.
- Các chunk chưa được cache được tải từ đĩa hoặc tạo qua các task nền **Rayon** mà không làm tắc nghẽn vòng lặp tick trò chơi chính.
- Các chunk đã hoàn thành được điều phối qua các kênh bất đồng bộ đến luồng kết nối của người chơi.

---

## Pipeline Tạo Thế giới

Khi một thế giới chưa có chunk đã lưu, hoặc khi người chơi khám phá vượt qua ranh giới đã tạo, Pumpkin tạo chunk mới qua một pipeline 6 giai đoạn:

1. **Bộ Định Tuyến Noise**: Thuật toán Perlin và Simplex noise 3D nhiều quãng tính toán độ lục địa tính, xói mòn và đỉnh/thung lũng.
2. **Định hình Mật độ**: Biến đổi các giá trị noise 3D liên tục thành mật độ địa hình và ngưỡng voxel khối vs không khí.
3. **Ánh xạ Khí hậu Biome**: Lấy mẫu nhiệt độ, độ ẩm, độ lục địa tính và xói mòn để gán ID biome.
4. **Quy tắc Bề mặt**: Đánh giá các quy tắc phân tầng để đặt cỏ, đất, cát, sa thạch hoặc deepslate tùy theo độ phơi sáng và độ cao.
5. **Carver**: Đục khắc các đường hầm hang động 3D, khe nứt và tầng ngậm nước vào đá-solid.
6. **Tính năng & Trang trí**: Đặt các mạch quặng, thảm thực vật, cây, công trình và lớp phủ bề mặt.

### 1. Bộ Định Tuyến Noise & Hàm Mật độ

Pumpkin triển khai thuật toán Perlin và Simplex noise 3D nhiều quãng của Minecraft:

- Tính toán độ lục địa tính, xói mòn, đỉnh & thung lũng và mật độ 3D.
- Tạo hình địa hình tự nhiên bao gồm vách dựng đứng, đảo lơ lửng, núi và hang động sâu.

### 2. Tham số Khí hậu Biome

Biome được phân giải động dựa trên các tọa độ khí hậu đa chiều:

- Nhiệt độ
- Độ ẩm
- Độ lục địa tính
- Xói mòn
- Độ sâu
- Độ kỳ lạ

Các tham số khớp với palette biome vanilla Minecraft và tạo ra các chuyển tiếp biome mượt mà.

### 3. Bộ Tạo

- **Bộ Tạo Địa hình Giống Vanilla**: Tạo noise 3D đầy đủ khớp với giới hạn thế giới Minecraft hiện đại (Y = -64 đến Y = 320).
- **Bộ Tạo Superflat**: Các lớp phẳng có thể cấu hình (vd: Bedrock tại Y=-64, Dirt, lớp trên cùng Grass Block).

---

## Ánh sáng & Ticking

### 1. Engine Ánh sáng

- **Ánh sáng Khối**: Được lan truyền động từ các khối phát ánh sáng (đuốc, glowstone, dung nham) lên đến cấp 15.
- **Ánh sáng Trời**: Được lan truyền theo chiều dọc từ trời xuống qua các khối trong suốt và bán trong suốt (lá, nước).
- Các mảng ánh sáng được tính toán và tuần tự hóa vào các packet chunk clientbound để client render bóng chính xác.

### 2. Tick Khối & Chunk

- **Tick Đã Lên lịch**: Các khối yêu cầu thực thi trì hoãn (dòng nước, cát rơi, redstone repeater).
- **Tick Ngẫu nhiên**: Các khối ngẫu nhiên được chọn trên mỗi sub-chunk mỗi tick để mô phỏng tăng trưởng cây, băng tan và chín cây trồng.
