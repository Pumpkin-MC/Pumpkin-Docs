# Bắt Đầu Nhanh

Các plugin Pumpkin sử dụng ngôn ngữ lập trình [Go](https://go.dev/) và được biên dịch thành WebAssembly.

## Yêu cầu trước

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt những thứ sau:
- [Go](https://go.dev/doc/install) (phiên bản mới nhất được đề xuất)
- [TinyGo](https://tinygo.org/getting-started/install/) (bắt buộc để biên dịch WASM)

## Khởi tạo module mới

Đầu tiên, tạo một thư mục mới cho dự án của bạn và khởi tạo một module Go:

```bash
mkdir hello-pumpkin
cd hello-pumpkin
go mod init github.com/yourname/hello-pumpkin
```

Tiếp theo, thêm Pumpkin Go API làm dependency:

```bash
go get github.com/Pumpkin-MC/pumpkin-api-go
```

## Cấu trúc dự án

Dự án của bạn phải có ít nhất một file `main.go`. Cấu trúc sẽ giống như sau:

```text
├── go.mod
├── go.sum
└── main.go
```
