# Thế giới

Pumpkin cho phép tinh chỉnh định dạng lưu trữ thế giới, khoảng thời gian tự động lưu, chế độ ánh sáng và biên tick thực thể song song trong `[world]` trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[world]
lighting = "default"
autosave_ticks = 6000

[world.chunk]
type = "pump"

[world.entity_islands]
unaudited_reach = 16.0
knockback_reach = 4.0
```

:::

Khi sử dụng định dạng Anvil tiêu chuẩn (`type = "anvil"`), nén chunk cũng có thể được cấu hình:

:::code-group

```toml [pumpkin.toml (Anvil)]
[world.chunk]
type = "anvil"

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

### Cài đặt thế giới

- **`lighting`**: Chế độ tính toán lan truyền động cơ ánh sáng.
  - `"default"`: Lan truyền ánh sáng Vanilla Minecraft tiêu chuẩn.
  - `"full"`: Ánh sáng bầu trời đầy đủ ở khắp nơi không có bóng.
  - `"dark"`: Ánh sáng hoàn toàn tối ở khắp nơi (không có ánh sáng).
- **`autosave_ticks`**: Số lượng tick máy chủ giữa các lần lưu thế giới tự động (mặc định: `6000`, tương đương 5 phút ở 20 TPS). Đặt `0` để tắt tự động lưu thế giới.

### Cài đặt lưu trữ chunk

- **`type`**: Định dạng lưu trữ chunk để sử dụng (mặc định: `"pump"`):
  - `"pump"`: Định dạng thế giới tối ưu gốc của Pumpkin (`.pump`).
  - `"anvil"`: Định dạng tệp vùng Anvil Minecraft tiêu chuẩn (`.mca`).
  - `"linear"`: Định dạng lưu trữ vùng tuyến tính (`.linear`) sử dụng nén nhanh cho dấu chân đĩa nhỏ hơn.
- **`compression.algorithm`**: Thuật toán nén được sử dụng cho dữ liệu chunk Anvil (`"LZ4"`, `"ZLib"`, `"GZip"`, `"Custom"`, mặc định: `"LZ4"`).
- **`compression.level`**: Cấp độ nén cho lưu trữ chunk Anvil (mặc định: `6`).

### Cài đặt đảo thực thể

Biên độ an toàn cho việc tick các thực thể trong các đảo song song trong `[world.entity_islands]`. Giá trị thấp hơn cho phép nhiều thực thể được tick song song hơn, trong khi giá trị cao hơn bảo tồn thứ tự tick nghiêm ngặt qua các tương tác rộng hơn:

- **`unaudited_reach`**: Khoảng cách tính bằng khối mà một thực thể có tick không được kiểm toán có thể vươn tới ngoài phạm vi theo dõi của nó (mặc định: `16.0`).
- **`knockback_reach`**: Khoảng cách tính bằng khối mà một cú đánh từ một thực thể không được kiểm toán có thể ném một thực thể được kiểm toán trong một tick đơn. Tăng giá trị này cho các cơ chế như súng TNT (mặc định: `4.0`).
