# Pumpking Development on Mobile

If you are a mobile user and want to edit the source code, you can do this!
(This page was written on Android using Helix.)

First of all, we need a terminal app.
We recommend [Termux](https://github.com/termux/termux-app/releases) because it's stable and open source.
Download the needed apk file for your device's architecture and install Termux.

After this, you need to run some commands. We use Helix for its simplicity.
```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

If you want to contribute, you need to install the GitHub software.
```bash
  pkg install gh
```

We also recommend installing the fish shell because it's more friendly than bash.
```bash
  pkg install fish
  chsh -s fish
```

Now that you've installed basic tools, we need to do some setup.
If you want to contribute, you need log into GitHub.
```bash
  gh auth login
```

Also setup git: change the editor to vim, edit your credentials, etc.

After this, you need to clone the Pumpkin repo. (Before this, you can create a project directory with `mkdir proj`; it's useful)
```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

If you want to contribute, you need to fork our repo and change `Pumpkin-MC` to your username on GitHub.

Setup's all done now! Enjoy :)

# FAQ

## How to use the text editor?
Type `hx <path>`.

## How to navigate through the project?
You can use `ls`, `cd`, and other programs.
You can also use `hx <dir>` to browse your directory on startup.

## How can I type in the editor?
Press `i` if you are in normal mode.

## HOW EXIT FROM EDITOR????
Press esc, then type `:q!` if you don't want to save, or `:wq` if you do want to save.

## Where can I learn how to use this editor?
Run `hx --tutor` or go their official website.

## Why not use VS Code?
1) VS Code is hard to set up, and it works with limited functionality on web.
2) rust-analyzer doesn't work on it. Maybe an emulator can help with this, but that slows down code compilation.
3) With VS Code, it's highly desirable to have a mouse, while in Helix you only need a keyboard.
4) VS Code is laggy on some devices.

## Why is it so hard to type?
Buy a cheap bluetooth keyboard and see how much easier it becomes.
