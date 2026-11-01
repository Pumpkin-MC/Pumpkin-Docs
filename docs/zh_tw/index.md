# 快速開始

**目前狀態：**
預釋出：目前正在開發中，尚未準備好正式釋出。

## 下載預釋出二進位檔案

你可以在[預釋出下載頁面](https://pumpkinmc.org/download)下載預建構的二進位檔案。

## 從原始碼建構（Rust）

要編譯 Pumpkin，請確保已安裝 [Rust](https://www.rust-lang.org/tools/install)。

1. **克隆倉庫**並進入該目錄：

```shell
git clone --recurse-submodules https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **可選：** 如果需要，你可以將一個原版世界放入 `Pumpkin/` 目錄，只需把世界資料夾命名為 `world`。

3. 執行：

> [!NOTE]
> 由於釋出建構會進行大量最佳化，建構過程可能需要一些時間。

```shell
cargo run --release
```

4. **可選：** 要透過利用 CPU 的特定功能來最大限度提升效能，可以設定 `target-cpu=native` Rust 編譯器標誌：

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE]
> 要連線（進入）你在同一臺本地系統上自行託管的伺服器（例如，在 Linux 上使用 Prism 啟動器登入並執行 Minecraft，同時使用 Pumpkin 託管伺服器），你可能需要依次選擇“多人遊戲”→“新增伺服器”→“伺服器位址”，並將“localhost:25565”用作伺服器位址，儘管終端的伺服器執行輸出中不會列出該位址。
```text
localhost:25565
```

## Docker

> [!IMPORTANT]
> Docker 支援目前處於實驗階段。

如果尚未安裝，你需要先[安裝 Docker](https://docs.docker.com/engine/install/)。安裝 Docker 後，可以執行以下指令啟動伺服器：

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`：用於連線 Pumpkin 的埠，例如 `25565`。
- `<server_data_location>`：希望儲存伺服器設定和資料的位置，例如 `./data`。

### 範例

要在埠 `25565` 上執行 Pumpkin 並將資料儲存在名為 `./data` 的目錄中，請執行以下指令：

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Nix / NixOS

Pumpkin 以 `pumpkin-mc` 軟體包的形式收錄於 [nixpkgs](https://github.com/NixOS/nixpkgs)（由 [@DerGrumpf](https://github.com/DerGrumpf) 維護），同時提供 `services.pumpkin-mc` NixOS 模組，可將其作為 systemd 服務執行。

### 無需安裝即可試用

```shell
nix run nixpkgs#pumpkin-mc
```

### NixOS 模組

將以下內容新增到你的 `configuration.nix`：

```nix
services.pumpkin-mc = {
  enable = true;
  openFirewall = true;
};
```

這會在 `/var/lib/pumpkin-mc` 下以經過安全加固的 systemd 服務執行 Pumpkin（`DynamicUser`、`ProtectSystem = "strict"`，無額外權能）。該模組為 `pumpkin.toml` 中的大部分設定提供了帶型別的選項，包括 Java/基岩版/RCON/Query/代理網路、白名單、世界儲存、日誌、PVP 等，另有一個 `settings` 自由格式選項，可用於尚未覆蓋的設定。

> [!NOTE]
> RCON 密碼和 Velocity 轉發金鑰會在服務啟動時從檔案中讀取（透過 `rcon.passwordFile` / `proxy.velocity.secretFile`），而不會儲存在 Nix store 中，因此可與 `sops-nix` 或 `agenix` 等金鑰管理器配合使用。

完整選項列表請參閱[模組原始碼](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/games/pumpkin-mc.nix)，或執行：

```shell
nixos-option services.pumpkin-mc
```

## 測試伺服器

Pumpkin 有一個由 @kralverde 維護的測試伺服器，執行 Pumpkin master 分支的最新提交。

- **IP：** pumpkin.kralverde.dev

**硬體與系統設定：**

- 作業系統：Debian GNU/Linux bookworm 12.7 x86_64
- 核心：Linux 6.1.0-21-cloud-amd64
- CPU：Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- 記憶體：4GB DIMM
