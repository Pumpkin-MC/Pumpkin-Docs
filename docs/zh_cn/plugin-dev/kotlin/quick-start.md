# 快速入门

[Pumpkin Gradle 插件](https://plugins.gradle.org/plugin/io.github.pumpkin-mc.plugin)可将 Kotlin 插件构建为 WebAssembly 组件。它使用发布在 Maven Central 上的 [Kotlin API](https://central.sonatype.com/artifact/io.github.pumpkin-mc/pumpkin-api-kt-wasm-wasi)。

## 前提条件

- JDK 17 或更高版本
- 带有 Gradle 9.x wrapper 的 Gradle 项目

API 构件包含生成的绑定。构建插件不需要 `wit-bindgen` 或 Rust；Gradle 插件会下载其余构建工具。

## 创建插件项目

创建一个名为 `my-kotlin-plugin` 的 Gradle Kotlin DSL 项目。在 `settings.gradle.kts` 中，配置从 Plugin Portal 解析插件、从 Maven Central 解析依赖项：

```kotlin [settings.gradle.kts]
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

rootProject.name = "my-kotlin-plugin"
```

在 `build.gradle.kts` 中，应用 Kotlin Multiplatform 和 Pumpkin Gradle 插件：

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

`apiVersion` 用于选择 `io.github.pumpkin-mc:pumpkin-api-kt-wasm-wasi` 的发布版本。Gradle 插件会将其源代码添加到 Wasm 目标并生成引导代码，无需单独声明 API 依赖项。

## 编写插件

创建 `src/wasmWasiMain/kotlin/example/ExamplePlugin.kt`。配置的类必须继承 `PumpkinPlugin`，并具有无参数构造函数。如果更改其包名或类名，请更新 `build.gradle.kts` 中的 `pumpkin.pluginClass`。

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
        authors = listOf("Your name"),
        description = "My first Kotlin plugin",
        dependencies = emptyList(),
        permissions = emptyList(),
    )

    override fun onLoad(context: PluginContext): Result<Unit> {
        Logging.log(Logging.Level.INFO, "Hello from Kotlin!")
        return Result.success(Unit)
    }
}
```

API 实现了 WIT 导出桥接层。Gradle 插件使用 `pumpkin.pluginClass` 生成引导代码，因此插件不需要 `main()` 函数或手动注册。

## 构建并加载

在插件项目中运行：

```sh
./gradlew build
```

组件将输出到 `build/my-kotlin-plugin.wasm`。将其复制到 Pumpkin 服务器的 `plugins/` 目录，然后启动服务器。

有关 Kotlin 层的信息，请参阅 [API 概览](./api-overview)；有关类型和操作的信息，请参阅 [WIT 定义](https://github.com/Pumpkin-MC/Pumpkin/tree/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1)。[事件](./events)、[任务](./tasks)和[命令](./first-command)指南中提供了示例。

## 故障排除

如果无法解析 Gradle 插件，请检查 `settings.gradle.kts` 中的 `gradlePluginPortal()`。如果无法解析 API 构件，请检查 `build.gradle.kts` 中的 `mavenCentral()`，并确认 `pumpkin.apiVersion` 与你选择的发布版本一致。

`type-checking export func`、`no export ... found` 或缺少 `pumpkin:plugin/...` 导入等错误，通常意味着插件和服务器基于不同的 WIT 定义构建。请选择与服务器兼容的 API 发布版本，然后重新构建组件。
