# 在行動裝置上開發 Pumpkin

如果你是行動裝置使用者並希望編輯原始碼，你可以做到這一點！
（本頁是在 Android 上使用 Helix 編寫的。）

首先，我們需要一個終端應用程式。
我們推薦 [Termux](https://github.com/termux/termux-app/releases)，因為它穩定且開源。
下載適合你裝置架構的 apk 檔案並安裝 Termux。

安裝後，你需要執行一些指令。我們使用 Helix 是因為它簡單易用。

```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

如果你想貢獻程式碼，你需要安裝 GitHub 軟體。

```bash
  pkg install gh
```

我們還推薦安裝 fish shell，因為它比 bash 更友好。

```bash
  pkg install fish
  chsh -s fish
```

現在你已經安裝了基本工具，我們需要進行一些設定。
如果你想貢獻程式碼，你需要登入 GitHub。

```bash
  gh auth login
```

還要設定 git：更改編輯器為 vim，編輯你的憑據等。

之後，你需要克隆 Pumpkin 倉庫。（在此之前，你可以使用 `mkdir proj` 建立一個專案目錄；這很有用）

```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

如果你想貢獻程式碼，你需要復刻我們的倉庫，並將 `Pumpkin-MC` 更改為你在 GitHub 上的使用者名稱。

設定現在都完成了！盡情享受 :)

## 常見問題

### 如何使用文字編輯器？

輸入 `hx <路徑>`。

### 如何瀏覽專案？

你可以使用 `ls`、`cd` 和其他程式。
你也可以使用 `hx <目錄>` 在啟動時瀏覽目錄。

### 如何在編輯器中輸入？

如果你處於普通模式，請按 `i`。

### 如何退出編輯器？？？？

按 esc，然後如果你不想儲存，輸入 `:q!`；如果想儲存，輸入 `:wq`。

### 在哪裡可以學習如何使用這個編輯器？

執行 `hx --tutor` 或造訪他們的官方網站。

### 為什麼不使用 VS Code？

1) VS Code 設定困難，且在網頁版上功能有限。
2) rust-analyzer 在其上不工作。也許模擬器可以解決這個問題，但那會減慢程式碼編譯速度。
3) 使用 VS Code 強烈建議使用滑鼠，而在 Helix 中你只需要鍵盤。
4) VS Code 在某些裝置上執行緩慢。

### 為什麼輸入這麼困難？

購買一個便宜的藍牙鍵盤，看看事情會變得多麼簡單。
