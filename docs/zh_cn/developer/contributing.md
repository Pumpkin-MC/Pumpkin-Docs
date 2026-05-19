# 为 Pumpkin 做贡献

我们感谢您对为 Pumpkin 做贡献的兴趣！本文档概述了提交错误报告、功能建议和代码更改的指南。

## 入门指南

最简单的入门方式是前往 [我们的 Discord 服务器](https://discord.gg/wT8XjrjKkf) 寻求帮助。

## 贡献方式

您可以通过多种方式为 Pumpkin 做贡献：

### 报告错误

  如果您遇到了一个错误，请先在问题追踪器上搜索现有问题。

  如果找不到重复的问题，请开启一个新问题。

  请遵循模板，提供对错误的清晰描述，如果可能的话，请附上重现步骤。
  截图、日志或代码片段也会有所帮助。

### 建议功能

  您是否有关于如何改进 Pumpkin 的想法？请通过在问题追踪器上开启一个 issue 来分享您的想法。

  详细描述所提议的功能，包括其优点和潜在的实施考虑因素。

### 贡献代码

  要开始为 Pumpkin 贡献代码，请在 GitHub 上复刻（fork）该仓库。

1. 首先，如果您还没有 GitHub 账户，请创建一个。

2. 前往 Pumpkin 的官方 [GitHub 组织](https://github.com/Pumpkin-MC) 并点击复刻（fork）按钮。

> 创建复刻（fork）意味着您现在拥有了 Pumpkin 源代码的自己的副本（但这并不意味着您拥有版权）。

  既然您有了一个可以编辑的副本，您将需要一些工具。
3. 为您的操作系统安装 [git](https://git-scm.com/downloads)。

- 要开始使用 git，请访问 [Git 入门](https://docs.github.com/en/get-started/getting-started-with-git)。

- 可选：如果您想要一个与 GitHub 交互的图形化工具，请安装 [GitHub-Desktop](https://desktop.github.com/download/)。

> 如果您不习惯使用命令行，GitHub Desktop 可能更容易上手，但它并不适合所有人。

- 要开始使用 GitHub Desktop，请访问 [GitHub Desktop 入门](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)。

- 如果您想贡献代码，请在 [rust-lang.org](https://www.rust-lang.org/) 安装 Rust。

- 如果您想为文档做贡献，请安装 [NodeJS](https://nodejs.org/en)。

### 反编译 Minecraft 的代码

在开发 Pumpkin 时，我们严重依赖官方 Minecraft 客户端并利用现有的服务器逻辑。我们经常参考 Minecraft 的官方代码。
可以使用 [mcsrc](https://mcsrc.dev/) 在线反编译 Minecraft 的代码或使用 Fabric Yarn：

```shell
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

反编译后，您可以在 `build/namedSrc` 目录中找到源代码。

### 其他信息

我们鼓励您对现有的 issue 和拉取请求进行评论，以分享您的想法并提供反馈。

如果您需要帮助，请随时在问题追踪器中提问，或联系项目维护者。

在提交大型贡献之前，请考虑开启一个 issue 或讨论，或者在我们的 Discord 上与我们交流，以讨论您的方法。
