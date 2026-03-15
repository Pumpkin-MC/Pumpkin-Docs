# Các định dạng thế giới (World Formats)

## Region File Format

Minecraft Beta 1.3 đến Release 1.2 sử dụng một định dạng Minecraft được biết đến với tên "Region file format".

Các tệp được lưu trữ theo định dạng này là các tệp `.mcr`, mỗi tệp lưu trữ một nhóm 32x32 chunk gọi là một region.

Bạn có thể tìm thêm chi tiết trên [Minecraft Wiki](https://minecraft.wiki/w/Region_file_format).

## Anvil File Format

Thay thế cho Region File Format sau Minecraft Release 1.2, đây là định dạng tệp được sử dụng để lưu trữ các thế giới Vanilla Minecraft: Java Edition hiện đại.

Các tệp được lưu trữ theo định dạng này là các tệp `.mca`. Dù sử dụng cùng logic region, đã có một số thay đổi nhỏ. Các thay đổi đáng chú ý bao gồm việc tăng
giới hạn chiều cao lên 256, sau đó lên 320, cũng như số lượng ID khối lớn hơn.

Bạn có thể tìm thêm chi tiết trên [Minecraft Wiki](https://minecraft.wiki/w/Anvil_file_format).

## Linear File Format

Có một định dạng tệp hiện đại hơn đa phần được biết đến với tên Linear region file format. Nó tiết kiệm không gian đĩa và sử dụng thư viện zstd thay vì zlib. Điều này có lợi vì zlib đã cực kỳ cũ và lỗi thời.

Các tệp được lưu trữ theo định dạng này là các tệp `.linear` và nó giúp tiết kiệm khoảng 50% không gian đĩa ở Overworld và Nether, cũng như tiết kiệm 95% ở the End.

Bạn có thể tìm hiểu thêm chi tiết tại trang GitHub của [LinearRegionFileFormatTools](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools).

## Slime File Format

Được phát triển bởi Hypixel để khắc phục nhiều cạm bẫy của định dạng tệp Anvil, Slime cũng thay thế zlib và tiết kiệm không gian so với Anvil. Nó lưu toàn bộ thế giới trong một
tệp lưu duy nhất và cho phép tệp đó được load vào nhiều phiên bản (instances) khác nhau.

Các tệp được lưu trữ theo định dạng này là các tệp `.slime`.

Bạn có thể tìm hiểu thêm chi tiết trên trang GitHub của [Slime World Manager](https://github.com/cijaaimee/Slime-World-Manager#:~:text=Slime%20World%20Manager%20is%20a,worlds%20faster%20and%20save%20space.), cũng như tại [Dev Blog #5](https://hypixel.net/threads/dev-blog-5-storing-your-skyblock-island.2190753/) của Hypixel.

## Schematic File Format

Khác với các định dạng tệp khác được liệt kê, Schematic File Format không được sử dụng để lưu trữ thế giới Minecraft, mà thay vào đó được sử dụng trong các chương trình của bên thứ 3 như MCEdit, WorldEdit và Schematica.

Các tệp được lưu trữ theo định dạng này là các tệp `.schematic` và được lưu ở định dạng NBT.

Bạn có thể tìm thêm chi tiết trên [Minecraft Wiki](https://minecraft.wiki/w/Schematic_file_format)

### Khởi tạo thế giới (World Generation)

Khi server đang khởi động, nó kiểm tra xem có tệp lưu (save) nào xuất hiện không, còn được gọi là "world".

Pumpkin sau đó gọi world generation (trình khởi tạo thế giới):

#### Có bản lưu (Save Present)

`AnvilChunkReader` được gọi để xử lý các tệp region cho tệp lưu này

- Như đã nêu trên, các tệp region lưu 32x32 chunks
  > Mỗi tệp region được đặt tên tương ứng với tọa độ vị trí của nó trong thế giới

> r.{}.{}.mca

- Bảng (table) vị trí được đọc từ tệp save, biểu thị tọa độ chunk
- Bảng timestamp được đọc từ tệp save, biểu thị thời điểm chunk được sửa đổi lần cuối cùng

#### Không có bản lưu (No Save Present)

World seed được đặt là "0". Trong tương lai, nó sẽ được đặt bằng giá trị ở cấu hình "basic" (cơ bản).

`PlainsGenerator` được gọi, bởi tới hiện tại `Plains` là biome duy nhất đã được triển khai.

- `PerlinTerrainGenerator` được gọi để thiết lập chunk height
- Độ cao của đá (Stone height) được thiết lập tại mức 5 dưới chunk height
- Độ cao của đất (Dirt height) được thiết lập tại mức 2 dưới chunk height
- Các khối cỏ xuất hiện ở lớp trên cùng của phần đất
- Bedrock được đặt tại y = -64
- Hoa và cỏ ngắn (short grass) mọc rải rác một cách ngẫu nhiên

`SuperflatGenerator` hiện cũng có sẵn, nhưng nó hiện chưa thể được gọi tới.

- Bedrock được đặt tại y = -64
- Lớp đất được đặt cao hơn 2 khối
- Các khối cỏ được đặt lên 1 khối nữa

Các blocks có thể đặt ra và đập vỡ, nhưng những thay đổi hiện chưa có khả năng để lưu trữ trong bất kì định dạng thế giới nào. Các thế giới dạng Anvil hiện chỉ có tính read-only (chỉ đọc).
