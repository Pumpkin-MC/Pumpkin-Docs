### 为 Pumpkin 做贡献

我们感谢您对 Pumpkin 贡献的兴趣！本文档概述了提交错误报告、功能建议和代码更改的指南。

### 入门

最简单的入门方式是在[我们的 Discord 服务器](https://discord.gg/wT8XjrjKkf)上寻求帮助。

### 如何贡献

您可以通过以下几种方式为 Pumpkin 做贡献：

#### 报告错误

  如果您遇到错误，请先在 issue tracker 上搜索现有问题。

  如果找不到重复的 issue，请创建一个新 issue。

  遵循模板并提供清晰的错误描述，包括重现步骤（如果可能）。
  屏幕截图、日志或代码片段也会有所帮助。

#### 建议功能

  您对如何改进 Pumpkin 有想法吗？通过在问题跟踪器上打开一个问题来分享您的想法。

  详细描述所提议的功能，包括其好处和潜在的实现考虑。

#### 贡献代码

  要开始为 Pumpkin 贡献代码，请在 GitHub 上 fork 仓库

1. 首先，如果您还没有 GitHub 账户，请创建一个

2. 前往 Pumpkin 的官方 [GitHub 组织](https://github.com/Pumpkin-MC) 并按下 fork 按钮

> 创建复刻意味着您现在拥有 Pumpkin 源代码的自己的副本（这并不意味着您拥有版权）。

  现在您有了可以编辑的副本，您需要一些工具。

3. 为您的操作系统安装 [git](https://git-scm.com/downloads)

- 要开始使用 git，请访问 [Git 入门](https://docs.github.com/en/get-started/getting-started-with-git)

- 可选：如果您想要一个与 GitHub 交互的图形工具，安装 [GitHub-Desktop](https://desktop.github.com/download/)

> 如果您不习惯命令行，GitHub Desktop 可能更容易使用，但并不适合所有人

- 要开始使用 GitHub Desktop，请访问 [GitHub Desktop 入门](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)

- 如果您想贡献代码，请在 [rust-lang.org](https://www.rust-lang.org/) 安装 Rust。

- 如果您想为文档做贡献，请安装 [NodeJS](https://nodejs.org/en)

### 反编译 Minecraft 代码

在 Pumpkin 工作时，我们严重依赖官方 Minecraft 客户端并利用现有的服务器逻辑。我们经常参考 Minecraft 的官方代码。
反编译 Minecraft 最简单的方法是使用 Fabric Yarn。在运行以下命令之前，请确保已安装 Gradle：

```
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

反编译后，您可以在 `build/namedSrc` 目录中找到源代码。

### 其他信息

我们鼓励您对现有 issue 和拉取请求发表评论，分享您的想法并提供反馈。

如果您需要帮助，请随时在问题跟踪器中提问或联系项目维护者。

在提交大型贡献之前，请考虑打开一个问题或讨论，或者在我们的 Discord 上与我们交流以讨论您的方法。
