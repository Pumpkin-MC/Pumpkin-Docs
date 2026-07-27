# Tạo một dự án mới

Các plugin của Pumpkin sử dụng ngôn ngữ lập trình [Go](https://go.dev/) và được biên dịch sang WebAssembly.

## Yêu cầu tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau:
- [Go](https://go.dev/doc/install) (khuyến nghị phiên bản mới nhất)
- [TinyGo](https://tinygo.org/getting-started/install/) (bắt buộc để biên dịch WASM)

## Khởi tạo một module mới

Đầu tiên, tạo một thư mục mới cho dự án của bạn và khởi tạo một module Go:

```bash
mkdir hello-pumpkin
cd hello-pumpkin
go mod init github.com/yourname/hello-pumpkin
```

Tiếp theo, thêm Pumpkin Go API làm một dependency:

```bash
go get github.com/Pumpkin-MC/pumpkin-api-go
```

## Cấu trúc dự án

Dự án của bạn nên có ít nhất một tệp `main.go`. Cấu trúc sẽ trông như thế này:

```text
├── go.mod
├── go.sum
└── main.go
```