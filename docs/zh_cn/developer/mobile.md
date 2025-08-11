# 在移动设备上开发 Pumpkin

如果您是移动设备用户并希望编辑源代码，您可以做到这一点！
（本页是在 Android 上使用 Helix 编写的。）

首先，我们需要一个终端应用程序。
我们推荐 [Termux](https://github.com/termux/termux-app/releases)，因为它稳定且开源。
下载适合您设备架构的 apk 文件并安装 Termux。

安装后，您需要运行一些命令。我们使用 Helix 是因为它简单易用。

```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

如果您想贡献代码，您需要安装 GitHub 软件。

```bash
  pkg install gh
```

我们还推荐安装 fish shell，因为它比 bash 更友好。

```bash
  pkg install fish
  chsh -s fish
```

现在您已经安装了基本工具，我们需要进行一些设置。
如果您想贡献代码，您需要登录 GitHub。

```bash
  gh auth login
```

还要设置 git：更改编辑器为 vim，编辑您的凭据等。

之后，您需要克隆 Pumpkin 仓库。（在此之前，您可以使用 `mkdir proj` 创建一个项目目录；这很有用）

```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

如果您想贡献代码，您需要复刻我们的仓库，并将 `Pumpkin-MC` 更改为您在 GitHub 上的用户名。

设置现在都完成了！尽情享受 :)

# 常见问题

## 如何使用文本编辑器？

输入 `hx <路径>`。

## 如何浏览项目？

您可以使用 `ls`、`cd` 和其他程序。
您也可以使用 `hx <目录>` 在启动时浏览目录。

## 如何在编辑器中输入？

如果您处于普通模式，请按 `i`。

## 如何退出编辑器？？？？

按 esc，然后如果您不想保存，输入 `:q!`；如果想保存，输入 `:wq`。

## 在哪里可以学习如何使用这个编辑器？

运行 `hx --tutor` 或访问他们的官方网站。

## 为什么不使用 VS Code？

1) VS Code 设置困难，且在网页版上功能有限。
2) rust-analyzer 在其上不工作。也许模拟器可以解决这个问题，但那会减慢代码编译速度。
3) 使用 VS Code 强烈建议使用鼠标，而在 Helix 中您只需要键盘。
4) VS Code 在某些设备上运行缓慢。

## 为什么输入这么困难？

购买一个便宜的蓝牙键盘，看看事情会变得多么简单。
