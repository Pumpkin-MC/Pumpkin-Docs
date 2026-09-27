# Quick Start

The [Pumpkin Gradle plugin](https://plugins.gradle.org/plugin/io.github.pumpkin-mc.plugin) builds a Kotlin plugin as a WebAssembly component. It uses the [Kotlin API](https://central.sonatype.com/artifact/io.github.pumpkin-mc/pumpkin-api-kt-wasm-wasi) published on Maven Central.

## Prerequisites

- JDK 17 or later
- A Gradle project with a Gradle 9.x wrapper

The API artifact includes generated bindings. Plugin builds do not require `wit-bindgen` or Rust; the Gradle plugin downloads the remaining build tools.

## Create a plugin project

Create a Gradle Kotlin DSL project named `my-kotlin-plugin`. In `settings.gradle.kts`, resolve plugins from the Plugin Portal and dependencies from Maven Central:

```kotlin [settings.gradle.kts]
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

rootProject.name = "my-kotlin-plugin"
```

In `build.gradle.kts`, apply Kotlin Multiplatform and the Pumpkin Gradle plugin:

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

`apiVersion` selects the `io.github.pumpkin-mc:pumpkin-api-kt-wasm-wasi` release. The Gradle plugin adds its sources to the Wasm target and generates the bootstrap. No separate API dependency declaration is needed.

## Write the plugin

Create `src/wasmWasiMain/kotlin/example/ExamplePlugin.kt`. The configured class must extend `PumpkinPlugin` and have a no-argument constructor. If you change its package or class name, update `pumpkin.pluginClass` in `build.gradle.kts`.

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

The API implements the WIT export bridge. The Gradle plugin uses `pumpkin.pluginClass` to generate the bootstrap, so the plugin needs no `main()` function or manual registration.

## Build and load

From your plugin project:

```sh
./gradlew build
```

The component is written to `build/my-kotlin-plugin.wasm`. Copy it to your Pumpkin server's `plugins/` directory and start the server.

See the [API overview](./api-overview) for the Kotlin layer and the [WIT reference](../wit/) for types and operations. The [events](./events), [tasks](./tasks), and [command](./first-command) guides have examples.

## Troubleshooting

If the Gradle plugin cannot be resolved, check `gradlePluginPortal()` in `settings.gradle.kts`. If the API artifact cannot be resolved, check `mavenCentral()` in `build.gradle.kts` and that `pumpkin.apiVersion` matches the release you selected.

Errors such as `type-checking export func`, `no export ... found`, or a missing `pumpkin:plugin/...` import often mean the plugin and server were built against different WIT definitions. Choose an API release compatible with your server and rebuild the component.
