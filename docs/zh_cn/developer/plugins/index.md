# 插件引擎架构

Pumpkin 提供模块化、多运行时的插件引擎，设计目标是性能、安全性和跨语言互操作性。

不同于依赖单一 JVM 类加载器的传统 Minecraft 服务器，Pumpkin 通过专用加载器隔离插件执行，同时支持**原生高性能 Rust 二进制文件**和由 Rust、Python、C#、C、Go 或 Kotlin 编译而来的**沙盒化 WebAssembly 组件**。

---

## 架构概览

### 架构组成

| 子系统 | 主要 Crate | 职责 |
| :--- | :--- | :--- |
| **插件管理器** | `crates/pumpkin/src/plugin` | 生命周期编排（加载、启用、禁用）、事件分派和加载器注册 |
| **原生加载器** | `crates/pumpkin/src/plugin/loader/native` | 直接加载动态库（`.so`、`.dll`、`.dylib`），用于零开销 Rust 扩展 |
| **WASM 加载器** | `crates/pumpkin/src/plugin/loader/wasm` | 用于 Rust、Python、Go、C#、C 和 Kotlin 编译沙盒组件的 Wasmtime 执行引擎 |
| **接口规范** | `crates/pumpkin-plugin-wit` | 定义类型化函数、类型和宿主导入的 WebAssembly Interface Types（WIT） |
| **安全与验证** | `crates/pumpkin/src/plugin/loader/wasm/sign` | 基于 W3C wasmsign2 / Ed25519 公钥的加密签名验证 |

---

## 双执行模型

| 特性 | 原生插件 | WebAssembly（Wasmtime）插件 |
| :--- | :--- | :--- |
| **文件扩展名** | `.so`（Linux）、`.dll`（Windows）、`.dylib`（macOS） | `.wasm`（组件模型） |
| **语言** | Rust（动态编译） | Rust、Python、C#、C、Go、Kotlin |
| **性能** | 原生 CPU 执行（零开销） | JIT 编译，接近原生速度 |
| **沙盒** | 无（在宿主地址空间运行） | 内存隔离的沙盒执行 |
| **安全与签名** | 操作系统级权限 | 加密 W3C Wasm-Sign 验证 |
| **热卸载** | 受限（受操作系统共享库约束） | 完全支持内存回收 |

---

## 事件生命周期与分派

插件主要通过事件与 Pumpkin 交互：

1. **事件分派**：
   - `server.plugin_manager.fire_blocking(&server, &mut event)`：在执行线程上同步分派事件（例如取消玩家放置方块或修改数据包负载）。
   - 异步事件运行在非阻塞 Tokio 任务上。
2. **可取消事件**：
   - 处理器可以设置 `event.cancelled = true`，以中止默认游戏逻辑（例如取消玩家移动、交互或数据包处理）。

---

## 插件引擎文档

深入了解 Pumpkin 插件系统的内部机制：

- **[添加插件加载器](/zh_cn/developer/plugins/loaders)**：为新的脚本语言和运行时实现 `PluginLoader` trait 的分步指南。
- **[WASM 签名与验证](/zh_cn/developer/plugins/wasm-signing)**：Ed25519 加密签名、W3C `wasmsign2` 自定义节和市场许可证验证的详细规范。

> [!NOTE]
> 如果你希望开发第三方插件，而不是修改 Pumpkin 内部插件引擎，请查阅 **[插件开发指南](/zh_cn/plugin-dev/introduction)**。
