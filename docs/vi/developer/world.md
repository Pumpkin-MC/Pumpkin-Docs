# Các định dạng thế giới

## Định dạng File Region

Minecraft Beta 1.3 đến Release 1.2 đã sử dụng một định dạng Minecraft được gọi là "Region file format".

Các tệp được lưu trữ ở định dạng này là các tệp `.mcr`, mỗi tệp lưu trữ một nhóm gồm 32x32 chunk được gọi là một region.

Bạn có thể tìm hiểu thêm chi tiết trên [Minecraft Wiki](https://minecraft.wiki/w/Region_file_format).

## Định dạng File Anvil

Thay thế cho Region File Format kể từ Minecraft Release 1.2, đây là định dạng tệp được sử dụng để lưu trữ các thế giới Vanilla Minecraft: Java Edition hiện đại.

Các tệp được lưu trữ ở định dạng này là các tệp `.mca`. Mặc dù vẫn sử dụng logic region tương tự, đã có một số thay đổi. Những thay đổi đáng chú ý bao gồm việc tăng giới hạn chiều cao lên 256, sau đó là 320, cũng như số lượng ID khối (block ID) nhiều hơn.

Bạn có thể tìm hiểu thêm chi tiết trên [Minecraft Wiki](https://minecraft.wiki/w/Anvil_file_format).

## Định dạng File Linear

Có một định dạng tệp hiện đại hơn được gọi là định dạng tệp Linear region. Nó giúp tiết kiệm dung lượng ổ đĩa và sử dụng thư viện zstd thay vì zlib. Điều này rất có lợi vì zlib đã cực kỳ cũ và lạc hậu.

Các tệp được lưu trữ ở định dạng này là các tệp `.linear`, giúp tiết kiệm khoảng 50% dung lượng ổ đĩa ở Overworld và Nether, và tiết kiệm tới 95% ở The End.

Bạn có thể tìm hiểu thêm chi tiết tại trang GitHub của [LinearRegionFileFormatTools](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools).

## Định dạng File Slime

Được phát triển bởi Hypixel nhằm khắc phục nhiều nhược điểm của định dạng tệp Anvil, Slime cũng thay thế zlib và tiết kiệm dung lượng hơn so với Anvil. Nó lưu trữ toàn bộ thế giới trong một tệp lưu duy nhất và cho phép tệp đó được tải vào nhiều instance khác nhau.

Các tệp được lưu trữ ở định dạng này là các tệp `.slime`.

Bạn có thể tìm hiểu thêm chi tiết trên trang GitHub của [Slime World Manager](https://github.com/cijaaimee/Slime-World-Manager#:~:text=Slime%20World%20Manager%20is%20a,worlds%20faster%20and%20save%20space.), cũng như trên [Dev Blog #5](https://hypixel.net/threads/dev-blog-5-storing-your-skyblock-island.2190753/) của Hypixel.

## Định dạng File Schematic

Không giống như các định dạng tệp khác được liệt kê, Định dạng Tệp Schematic không được sử dụng để lưu trữ thế giới Minecraft, mà thay vào đó được sử dụng trong các chương trình của bên thứ ba như MCEdit, WorldEdit và Schematica.

Các tệp được lưu trữ ở định dạng này là các tệp `.schematic`, và được lưu dưới định dạng NBT.

Bạn có thể tìm hiểu thêm chi tiết trên [Minecraft Wiki](https://minecraft.wiki/w/Schematic_file_format)

### Khởi tạo thế giới

Khi máy chủ đang khởi động, nó sẽ kiểm tra xem có bản lưu (save) nào hiện có hay không, còn được gọi là "world".

Pumpkin sau đó sẽ gọi quy trình khởi tạo thế giới:

#### Đã có bản lưu

`AnvilChunkReader` được gọi để xử lý các tệp region cho bản lưu đã cho

- Như đã đề cập ở trên, các tệp region lưu trữ 32x32 chunk
    > Mỗi tệp region được đặt tên tương ứng với tọa độ vị trí của nó trong thế giới

> r.{}.{}.mca

- Bảng vị trí (location table) được đọc từ tệp lưu, đại diện cho tọa độ chunk
- Bảng mốc thời gian (timestamp table) được đọc từ tệp lưu, đại diện cho lần cuối cùng chunk được chỉnh sửa

#### Chưa có bản lưu

Seed của thế giới được đặt thành "0". Trong tương lai, nó sẽ được đặt thành giá trị trong cấu hình "basic".

`PlainsGenerator` được gọi, vì cho đến nay `Plains` là biome duy nhất đã được triển khai.

- `PerlinTerrainGenerator` được gọi để thiết lập chiều cao chunk
- Chiều cao đá (Stone) được đặt thấp hơn chiều cao chunk 5 khối
- Chiều cao đất (Dirt) được đặt thấp hơn chiều cao chunk 2 khối
- Khối cỏ (Grass block) xuất hiện ở trên cùng của lớp đất
- Đá nền (Bedrock) được đặt tại y = -64
- Hoa và cỏ ngắn được rải rác ngẫu nhiên

`SuperflatGenerator` cũng có sẵn, nhưng hiện chưa thể gọi được.

- Đá nền (Bedrock) được đặt tại y = -64
- Đất (Dirt) được đặt cao hơn hai khối
- Khối cỏ (Grass block) được đặt cao hơn một khối nữa

Các khối có thể được đặt và phá vỡ, nhưng các thay đổi không thể lưu lại ở bất kỳ định dạng thế giới nào. Các thế giới Anvil hiện chỉ ở chế độ chỉ đọc (read only).