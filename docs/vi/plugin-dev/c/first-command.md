# Tạo Lệnh Đầu Tiên Của Bạn

Viết lệnh trong C cho Pumpkin có chi phí thấp, nhanh chóng và sử dụng C WIT bindings.

---

## 1. Ví dụ nhanh

Dưới đây là tệp plugin C hoàn chỉnh (`main.c`) đăng ký lệnh `/hello` với kiểm tra quyền và gửi phản hồi về cho người chơi.

```c [main.c]
#include <stdio.h>
#include "pumpkin_api.h"

void plugin_on_load(pumpkin_context_t ctx) {
    // 1. Đăng ký node quyền
    pumpkin_permission_t perm = {
        .node = "my_c_plugin:hello",
        .description = "Allows executing the /hello command",
        .default_access = PERMISSION_DEFAULT_ALLOW
    };
    pumpkin_register_permission(ctx, &perm);

    // 2. Xây dựng và đăng ký cây lệnh
    const char* names[] = {"hello", "hi"};
    pumpkin_command_t cmd = pumpkin_command_new(names, 2, "Greets the player");
    
    pumpkin_register_command(ctx, cmd, "my_c_plugin:hello");
}

int32_t plugin_handle_command(uint32_t command_id, pumpkin_sender_t sender, pumpkin_server_t server) {
    pumpkin_sender_send_message(sender, "Hello from C Plugin!");
    return 1;
}

pumpkin_metadata_t plugin_get_metadata() {
    pumpkin_metadata_t meta = {
        .name = "my_c_plugin",
        .version = "0.1.0",
        .description = "My first Pumpkin C plugin"
    };
    return meta;
}
```

---

## 2. Xem trước trong game

Sau khi đăng ký, lệnh của bạn sẽ tự động có tính năng tự động hoàn thành phía client, xác thực cú pháp và tô màu trong Minecraft:

<img src="/assets/first_command_preview.png" alt="Xem trước tự động hoàn thành lệnh trong game" width="500"/>

---

## 3. Cách hoạt động

::: details Phân tích từng bước

### Bước 1: Định nghĩa struct Permission
Điền vào struct `pumpkin_permission_t` và gọi `pumpkin_register_permission`:
```c
pumpkin_permission_t perm = {
    .node = "my_c_plugin:hello",
    .description = "Allows executing the /hello command",
    .default_access = PERMISSION_DEFAULT_ALLOW
};
pumpkin_register_permission(ctx, &perm);
```

### Bước 2: Xây dựng cây lệnh
Tạo cây lệnh bằng cách truyền mảng tên và mô tả:
```c
const char* names[] = {"hello", "hi"};
pumpkin_command_t cmd = pumpkin_command_new(names, 2, "Greets the player");
```

### Bước 3: Đăng ký lệnh và xử lý thực thi
Truyền handle lệnh cho `pumpkin_register_command` và xử lý phản hồi bên trong `plugin_handle_command`:
```c
pumpkin_register_command(ctx, cmd, "my_c_plugin:hello");
```

:::

---

## Các bước tiếp theo

- Xem [Hướng dẫn khởi động nhanh C](./quick-start) để thiết lập chuỗi công cụ biên dịch của bạn.
