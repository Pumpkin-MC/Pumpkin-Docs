# Bắt Đầu Nhanh

[Plugin Gradle của Pumpkin](https://plugins.gradle.org/plugin/io.github.pumpkin-mc.plugin) xây dựng một plugin Kotlin dưới dạng thành phần WebAssembly. Nó sử dụng [Kotlin API](https://central.sonatype.com/artifact/io.github.pumpkin-mc/pumpkin-api-kt-wasm-wasi) được xuất bản trên Maven Central.

## Yêu cầu trước

- JDK 17 trở lên
- Một dự án Gradle với Gradle 9.x wrapper

Artifact API bao gồm các binding đã được tạo. Việc xây dựng plugin không yêu cầu `wit-bindgen` hay Rust; plugin Gradle sẽ tải các công cụ xây dựng còn lại.

## Tạo dự án plugin

Tạo một dự án Gradle Kotlin DSL có tên `my-kotlin-plugin`. Trong `settings.gradle.kts`, giải quyết các plugin từ Plugin Portal và các dependency từ Maven Central:

```kotlin [settings.gradle.kts]
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

rootProject.name = "my-kotlin-plugin"
```

Trong `build.gradle.kts`, áp dụng Kotlin Multiplatform và plugin Gradle của Pumpkin:

```kotlin [build.gradle.kts]
import org.jetbrains.kotlin.gradle.ExperimentalWasmDsl

plugins {
    kotlin("multiplatform") version "2.4.0"
    id("io.github.pumpkin-mc.plugin") version "0.1.0"
}

repositories {
    mavenCentral()
}

kotlin {
    @OptIn(ExperimentalWasmDsl::class)
    wasmWasi {
        nodejs()
        binaries.executable()
    }
}

pumpkin {
    apiVersion.set("0.1.0")
    pluginClass.set("example.ExamplePlugin")
}
```

`apiVersion` chọn bản phát hành `io.github.pumpkin-mc:pumpkin-api-kt-wasm-wasi`. Plugin Gradle thêm các nguồn của nó vào target Wasm và tạo bootstrap. Không cần khai báo dependency API riêng biệt.

## Viết plugin

Tạo `src/wasmWasiMain/kotlin/example/ExamplePlugin.kt`. Class đã cấu hình phải kế thừa `PumpkinPlugin` và có một constructor không tham số. Nếu bạn thay đổi package hoặc tên class của nó, hãy cập nhật `pumpkin.pluginClass` trong `build.gradle.kts`.

```kotlin [src/wasmWasiMain/kotlin/example/ExamplePlugin.kt]
package example

import plugin.PluginContext
import plugin.PluginMetadata
import plugin.PumpkinPlugin
import pumpkin.Logging

class ExamplePlugin : PumpkinPlugin() {
    override fun metadata() = PluginMetadata(
        name = "my-kotlin-plugin",
        version = "0.1.0",
        authors = listOf("Tên của bạn"),
        description = "Plugin Kotlin đầu tiên của tôi",
        dependencies = emptyList(),
        permissions = emptyList(),
    )

    override fun onLoad(context: PluginContext): Result<Unit> {
        Logging.log(Logging.Level.INFO, "Xin chào từ Kotlin!")
        return Result.success(Unit)
    }
}
```

API triển khai cầu nối xuất WIT. Plugin Gradle sử dụng `pumpkin.pluginClass` để tạo bootstrap, vì vậy plugin không cần hàm `main()` hay đăng ký thủ công.

## Xây dựng và tải

Từ dự án plugin của bạn:

```sh
./gradlew build
```

Thành phần được ghi vào `build/my-kotlin-plugin.wasm`. Sao chép nó vào thư mục `plugins/` của máy chủ Pumpkin và khởi động máy chủ.

Xem [Tổng quan API](./api-overview) cho lớp Kotlin và [định nghĩa WIT](https://github.com/Pumpkin-MC/Pumpkin/tree/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1) cho các loại và thao tác. Các hướng dẫn [sự kiện](./events), [nhiệm vụ](./tasks), và [lệnh](./first-command) có các ví dụ.

## Khắc phục sự cố

Nếu plugin Gradle không thể được giải quyết, hãy kiểm tra `gradlePluginPortal()` trong `settings.gradle.kts`. Nếu artifact API không thể được giải quyết, hãy kiểm tra `mavenCentral()` trong `build.gradle.kts` và đảm bảo `pumpkin.apiVersion` khớp với bản phát hành bạn đã chọn.

Các lỗi như `type-checking export func`, `no export ... found`, hoặc thiếu import `pumpkin:plugin/...` thường có nghĩa là plugin và máy chủ được xây dựng với các định nghĩa WIT khác nhau. Hãy chọn một bản phát hành API tương thích với máy chủ của bạn và xây dựng lại thành phần.
