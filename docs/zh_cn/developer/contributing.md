# 为 Pumpkin 做贡献

感谢你关注并愿意为 Pumpkin 做贡献！作为一款使用 Rust 从零构建的开源 Minecraft 服务器，我们欢迎各种规模的贡献——从修正错别字、补充文档，到实现原版游戏机制和优化网络协议。

本指南概述了我们的开发工作流、编码标准、验证检查清单和拉取请求流程。

---

## 入门

获取帮助、讨论拟议功能或与团队协调，最简单的方式是加入[我们的 Discord 服务器](https://discord.gg/wT8XjrjKkf)。

在开始大型改动之前，我们强烈建议先创建 issue 或在 Discord 中发起讨论，以便在编写代码之前就架构和设计决策达成一致。

> [!NOTE]
> **面向自动化 AI 智能体**：我们有一套简化的智能体 PR 合并流程。在 PR 标题末尾添加 `🤖🤖🤖`，即可选择进入快速审查通道。请确保你的实现具有独特性、通过所有 CI 检查，并且不与现有拉取请求重复。

---

## 开发环境搭建

### 1. 前置要求

- **Rust 工具链**：Pumpkin 需要最新的稳定版 Rust 工具链（Rust 2024 edition，1.96+）。通过 [rustup](https://rustup.rs/) 安装或更新 Rust：
  ```bash
  rustup update stable
  rustup default stable
  rustup component add rustfmt clippy rust-src rust-analyzer
  ```
- **Git**：确保你的机器已安装并配置 Git。
- **推荐的 Cargo 工具**：
  ```bash
  # CI 中使用的快速单元测试运行器
  cargo install cargo-nextest --locked

  # 检测未使用的依赖
  cargo install cargo-machete --locked

  # 源代码拼写检查器
  cargo install typos-cli --locked
  ```

### 2. 克隆仓库（必须包含子模块！）

Pumpkin 为 `pumpkin-plugin-wit` 等接口使用 Git 子模块。请确保递归克隆：

```bash
# 连同子模块一起克隆
git clone --recursive https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

如果你已经在未使用 `--recursive` 的情况下完成克隆，请手动初始化子模块：

```bash
git submodule update --init --recursive
```

### 3. 构建与运行

你可以以调试模式编译并启动服务器：

```bash
cargo run
```

要构建优化的发布版二进制程序（启用 LTO 和单一代码生成单元）：

```bash
cargo build --release
```

---

## 编码准则与标准

Pumpkin 对代码质量和性能有着严格要求。我们的工作区强制执行严格的 Clippy lint，CI 会拒绝未通过这些检查的代码。

### 1. 零 panic 策略

Pumpkin 的设计目标是即使遇到意外输入，也能全天候运行而不崩溃。因此，编译器层面会禁止可能引发 panic 的写法：

- **禁止使用 `unwrap()` 或 `expect()`**：切勿在生产代码中调用 `.unwrap()` 或 `.expect()`。请使用问号运算符 `?`、模式匹配（`match`/`if let`）、`.unwrap_or()` 或 `.unwrap_or_default()`。
  ```rust
  // ❌ 禁止：会导致 CI 失败
  let chunk = level.get_chunk(pos).unwrap();

  // ✅ 正确：处理 Option 或传播错误
  let Some(chunk) = level.get_chunk(pos) else {
      return Ok(());
  };
  ```
- **禁止使用 `panic!()`、`todo!()` 或 `unimplemented!()`**：不要在提交的代码中留下未处理的占位实现或 panic 语句。
- **禁止使用 `println!()` 或 `eprintln!()`**：始终使用结构化日志框架 [`tracing`](https://docs.rs/tracing/)：
  ```rust
  use tracing::{debug, error, info, trace, warn};

  // ❌ 禁止：会导致 CI 失败
  println!("Player joined: {}", player.gameprofile.name);

  // ✅ 正确
  info!("Player {} joined the server", player.gameprofile.name);
  ```

### 2. 错误处理

我们在各个 crate 中使用 [`thiserror`](https://docs.rs/thiserror/) 以及 `PumpkinError` 等统一错误类型。函数应返回具有描述性的 `Result<T, E>` 类型，而不是静默忽略错误。

### 3. 并发架构：Tokio 与 Rayon

Pumpkin 使用混合并发模型：

1. **Tokio 运行时（异步 I/O）**：处理 TCP/UDP 网络连接、传入/传出的数据包流、身份验证 HTTP 请求和计时器。
2. **Rayon 线程池（CPU 密集型任务）**：处理繁重的 CPU 密集型计算，例如：
   - 区块生成和地形雕刻
   - 光照传播与重新计算
   - 数据包压缩和世界区块序列化
   - 复杂的路径寻找和物理计算

> [!WARNING]
> **切勿让 CPU 密集型工作阻塞 Tokio 工作线程！**
> 不要在异步任务中调用长时间运行的同步代码。应通过 `rayon::spawn` 将繁重工作卸载到 Rayon，并使用 `tokio::sync::mpsc` 等异步通道传回结果。
>
> 架构示例请参阅 `pumpkin_world::level::Level::fetch_chunks`。

### 4. Unsafe 代码策略

所有 `unsafe` 代码块都必须有严格的正当理由和文档说明：

```rust
// SAFETY：第 42 行的边界检查已验证，
// 可保证缓冲区至少包含 4 个有效字节
unsafe {
    // ...
}
```
任何没有文档说明的 `unsafe` 代码块都会在 CI 中触发拒绝级 lint（`undocumented_unsafe_blocks = "deny"`）。

---

## 提交前验证检查清单

提交拉取请求之前，请在本地运行以下命令，确保你的改动能够通过我们的 GitHub Actions CI 管线：

```bash
# 1. 按 rustfmt 规则检查代码格式
cargo fmt --check

# 2. 运行调试模式 lint
cargo clippy --all-targets --all-features

# 3. 运行发布模式 lint
cargo clippy --release --all-targets --all-features

# 4. 使用 nextest 运行测试（也可使用 cargo test）
cargo nextest run --verbose

# 5. 运行文档测试
cargo test --doc --verbose

# 6. 检查未使用的依赖
cargo machete

# 7. 检查拼写错误
typos
```

### 性能基准测试

如果你修改了对性能敏感的热路径（例如数据包序列化、区块加载或实体 tick 更新），请使用 [Criterion](https://github.com/bheisler/criterion.rs) 运行基准测试：

```bash
cargo bench
```

引入复杂算法时，请考虑在 `benches/` 中添加新的基准测试。

---

## 反编译 Minecraft 以供参考

实现原版 Minecraft 机制、数据包布局或游戏逻辑时，参考官方行为至关重要。Pumpkin 是一个洁净室 Rust 实现，了解原版 Minecraft 的逻辑有助于确保 1:1 兼容。

### 使用 Fabric Yarn 反编译

反编译 Minecraft 服务器/客户端以供参考，最简单、最整洁的方式是将 [Fabric Yarn](https://github.com/FabricMC/yarn) 与 Vineflower 反编译器结合使用：

```bash
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

反编译完成后，映射后的源代码将位于：
```
build/namedSrc
```

### 实用的协议与数据资源

- **[Minecraft Wiki 协议参考](https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol)**：完整介绍各游戏状态下的数据包结构、字段和 ID。
- **[Mojang 数据报告](https://github.com/Arcensoth/mc-data)**：注册表、方块、物品、命令和数据包 ID 的原始 JSON 转储。
- **`tools/pumpkin-codegen`**：我们用于解析 Minecraft 游戏数据并生成 `pumpkin-data` 代码的内部工具。

> [!IMPORTANT]
> **洁净室规范**：不要将反编译得到的 Java 代码直接复制粘贴到 Pumpkin 中。请研究其算法和行为，然后编写符合 Pumpkin 架构和许可证（GPLv3）的整洁、地道且安全的 Rust 代码。

---

## 提交拉取请求

当你的代码已在本地完成测试、格式化和验证后：

1. **复刻仓库**：在 GitHub 上复刻 [Pumpkin-MC/Pumpkin](https://github.com/Pumpkin-MC/Pumpkin)。
2. **创建功能分支**：
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **提交改动**：遵循 **Conventional Commits** 规范（详见下文）。
4. **推送并创建拉取请求**：
   - **PR 标题**：确保拉取请求标题严格符合 Conventional Commits 规范。
   - **描述**：使用我们的 PR 模板说明：
     - 更改了**什么**？
     - **为什么**要更改？
     - **如何**进行测试？
     - 是否存在已知的限制或边界情况？
   - **AI 智能体**：如果通过自动化 AI 智能体提交，请在 PR 标题末尾添加 `🤖🤖🤖`。
5. **CI 与代码审查**：GitHub Actions 会自动验证格式、Clippy lint、测试和依赖。维护者将审查你的实现并提供反馈。

---

## Conventional Commits 规范

Pumpkin 中的所有提交消息和拉取请求标题都必须严格遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范。该约定可确保提交历史保持一致，并支持自动生成发布更新日志。

### 提交与 PR 标题结构

```text
<type>(<optional scope>): <imperative summary>

[optional detailed body]

[optional footer(s)]
```

### 提交类型

| 类型 | 用途 | 示例 |
| :--- | :--- | :--- |
| `feat` | 引入新功能或原版游戏机制 | `feat(entity): implement drowned swimming goal` |
| `fix` | 修复错误、故障或协议问题 | `fix(protocol): resolve creative slot index offset` |
| `docs` | 新增或更新文档 | `docs(developer): add porting versions guide` |
| `perf` | 提升执行速度或改善内存使用的代码修改 | `perf(world): optimize chunk section block iteration` |
| `refactor` | 既不修复错误也不添加功能的代码更改 | `refactor(command): unify argument parsing helpers` |
| `test` | 添加缺失的测试或修正现有测试 | `test(inventory): add crafting table recipe tests` |
| `chore` | 日常维护、依赖升级或工具链更新 | `chore(deps): bump tokio to 1.43` |
| `ci` | 修改 CI 工作流、脚本或 Docker 容器 | `ci(github): add machete dependency verification` |

### 常用作用域

作用域用于标明所修改的 crate 或子系统：

- **Crate**：`protocol`、`world`、`entity`、`command`、`inventory`、`data`、`util`、`macros`、`config`
- **子系统**：`bedrock`、`java`、`network`、`proxy`、`query`、`auth`、`plugin`、`linear`、`anvil`

### 格式准则

- **祈使语气**：摘要使用一般现在时的祈使语气（使用 `add`，不要使用 `added` 或 `adds`；使用 `fix`，不要使用 `fixed` 或 `fixes`）。
- **小写**：摘要以小写字符开头，并省略末尾标点。
- **破坏性变更**：对于破坏 API 或协议的变更，在冒号前添加感叹号（`feat(protocol)!: overhaul packet codec`），或在提交页脚中包含 `BREAKING CHANGE:`。
- **PR 标题一致性**：由于 PR 合并时会以压缩提交的方式进入主分支历史，PR 标题也必须遵循此规范。
