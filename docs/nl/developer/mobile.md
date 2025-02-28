# Mobile pumpkin developing

If you are mobile user and want edit source code - you can do this!
(this page was written on android using helix)

First of all we need terminal app.
We recommend [termux](https://github.com/termux/termux-app/releases), because its stable and opensource.
Download needed apk file for your architecture of device and install termux.

After this, you need run some commands. We use helix with it simplicity.
```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

If you want contribute, you need install github.
```bash
  pkg install gh
```

Also we recommend install fish shell, because its more friendly that bash.
```bash
  pkg install fish
  chsh -s fish
```

Now you installed basic tools, but we need some setup.
If you want contribute you need login into github.
```bash
  gh auth login
```

Also setup git: change editor to vim, edit credentials and etc.

After this, you need clone pumpkin repo. (before this you can create projects dir with `mkdir proj`, its useful)
```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

If you want contribute, you need fork our repo, and change `Pumpkin-MC` to your username on github.

Now all setup done! Enjoy :)

# FAQ

## How use editor?
Type `hx <path>`.

## How navigate over project?
You can use `ls`, `cd` and other programs.
You can also use `hx <dir>` for locate over dir when start.

## How i can type in editor?
Press `i` if you in normal mode.

## HOW EXIT FROM EDITOR????
Press esc, when type `:q!`` if you dont want save edited data, or `:wq` if want.

## Where i can learn how use this editor?
Type `hx --tutor` or go to official website.

## Why not use vscode?
1) Vscode is hard to setup, by the way its works only on web with limited functional.
2) Rust analyzer dont work on it, maybe emulator can hep with it, but its slow down code compilation.
3) Vscode not good for android devices, because its highly desirable to have a mouse, while in helix you need only keyboard.
4) Vscode laggy on some devices.

## Why its so hard to type?
Buy cheap bluetooth keyboard and see how it simple.
