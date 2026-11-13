# 快速入門

[Pumpkin Gradle 插件](https://plugins.gradle.org/plugin/io.github.pumpkin-mc.plugin)可將 Kotlin 插件構建為 WebAssembly 元件。它使用發布在 Maven Central 上的 [Kotlin API](https://central.sonatype.com/artifact/io.github.pumpkin-mc/pumpkin-api-kt-wasm-wasi)。

## 前提條件

- JDK 17 或更高版本
- 帶有 Gradle 9.x wrapper 的 Gradle 項目

API 構件包含生成的綁定。構建插件不需要 `wit-bindgen` 或 Rust；Gradle 插件會下載其餘構建工具。

## 建立插件項目

建立一個名為 `my-kotlin-plugin` 的 Gradle Kotlin DSL 項目。在 `settings.gradle.kts` 中，設定從 Plugin Portal 解析插件、從 Maven Central 解析依賴項：

```kotlin [settings.gradle.kts]
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

rootProject.name = "my-kotlin-plugin"
```

在 `build.gradle.kts` 中，應用 Kotlin Multiplatform 和 Pumpkin Gradle 插件：

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

`apiVersion` 用於選擇 `io.github.pumpkin-mc:pumpkin-api-kt-wasm-wasi` 的發布版本。Gradle 插件會將其原始碼新增到 Wasm 目標並生成引導程式碼，無需單獨宣告 API 依賴項。

## 編寫插件

建立 `src/wasmWasiMain/kotlin/example/ExamplePlugin.kt`。設定的類必須繼承 `PumpkinPlugin`，並具有無參數構建函數。如果更改其包名或類名，請更新 `build.gradle.kts` 中的 `pumpkin.pluginClass`。

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

API 實現了 WIT 匯出橋接層。Gradle 插件使用 `pumpkin.pluginClass` 生成引導程式碼，因此插件不需要 `main()` 函數或手動註冊。

## 構建並載入

在插件項目中執行：

```sh
./gradlew build
```

元件將輸出到 `build/my-kotlin-plugin.wasm`。將其複製到 Pumpkin 伺服器的 `plugins/` 目錄，然後啟動伺服器。

有關 Kotlin 層的資訊，請參閱 [API 概覽](./api-overview)；有關類型和操作的資訊，請參閱 [WIT 定義](https://github.com/Pumpkin-MC/Pumpkin/tree/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1)。[事件](./events)、[任務](./tasks)和[指令](./first-command)指南中提供了範例。

## 故障排除

如果無法解析 Gradle 插件，請檢查 `settings.gradle.kts` 中的 `gradlePluginPortal()`。如果無法解析 API 構件，請檢查 `build.gradle.kts` 中的 `mavenCentral()`，並確認 `pumpkin.apiVersion` 與你選擇的發布版本一致。

`type-checking export func`、`no export ... found` 或缺少 `pumpkin:plugin/...` 匯入等錯誤，通常意味著插件和伺服器基於不同的 WIT 定義構建。請選擇與伺服器相容的 API 發布版本，然後重新構建元件。
