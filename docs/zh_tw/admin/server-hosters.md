# 服主與託管服務商指南

本指南涵蓋了 Minecraft 託管服務商與遊戲面板維護者（Pterodactyl、Pelican、PufferPanel、Crafty 及自訂容器平台）整合與執行 Pumpkin 伺服器所需瞭解的全部內容。

---

## 1. 部署與檔案結構差異（Java 伺服端 vs. Pumpkin）

將原版（Vanilla）、Spigot 或 Paper 的模板遷移至 Pumpkin 的託管面板應注意以下部署差異：

| 特性 | 原版 / Paper / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **EULA 檢查 (`eula.txt`)** | 啟動前需要在 `eula.txt` 中設定 `eula=true` | **不需要**（採用 GPL 授權條款實作，首次執行即可直接啟動） |
| **設定檔案** | `server.properties`、`spigot.yml`、`config/paper-global.yml` | 工作目錄下的單一 `pumpkin.toml`（首次啟動時自動生成） |
| **伺服器圖示** | `server-icon.png` | `icon.png`（或透過 `pumpkin.toml` 中的 `favicon_path` 指定自訂路徑） |
| **日誌檔案路徑** | `logs/latest.log` | 根目錄下的 `latest.log`（可透過 `[logging] file` 設定） |
| **預設區塊格式** | 原版 Anvil (`.mca`) | 原生 `.pump` 格式（`[world.chunk] type = "pump"`，或可選 `"anvil"` / `"linear"`） |
| **插件格式與目錄** | `plugins/` 目錄下的 `.jar` 檔案 | `plugins/` 目錄下的 `.wasm` WebAssembly 元件（或透過可選的 PatchBukkit 支援 `.jar`） |
| **插件市集** | Hangar / Modrinth / SpigotMC | [Pumpkin 插件市集](https://market.pumpkinmc.org)（內建 Ed25519 簽章驗證） |
| **遠端管理** | 傳統 TCP RCON / MSMP | 僅支援基於 WebSocket 的 [MSMP](../config/management)（`[networking.management]`，不支援傳統 TCP RCON） |

### 世界格式與切換伺服端軟體
預設情況下，Pumpkin 使用原生 `.pump` 格式儲存區塊（`[world.chunk] type = "pump"`）。如果你的面板提供**世界匯入/匯出工具**，或者允許使用者在同一世界資料夾下切換 Paper/原版與 Pumpkin，請在 `pumpkin.toml` 中將區塊格式設為 `"anvil"`，以便使用標準的 `.mca` 區域檔案：

```toml
[world.chunk]
type = "anvil"
```

### 持久化基岩版身分金鑰
當啟用基岩版 / NetherNet 時，Pumpkin 會生成 `nethernet-key.der`（透過 `[networking.bedrock.nethernet] identity_key` 設定），用於用戶端首次使用信任（TOFU）身分驗證。請確保該檔案在容器重建時持久化儲存在伺服器的資料卷中，以免回訪的基岩版用戶端被拒絕連線。

---

## 2. 執行環境與二進位分發

### 無需 JVM
Pumpkin 是由 Rust 編譯而成的獨立原生執行檔（Linux/macOS 上為 `pumpkin`，Windows 上為 `pumpkin.exe`）：
- **極簡基礎映像**：除非使用者明確安裝了可選的 [PatchBukkit](./migrating-from-bukkit#bukkit-插件相容性-patchbukkit) 相容層，否則容器內無需安裝 Java 執行環境（JRE/JDK）。極簡 Linux 映像（如 `debian:bookworm-slim` 或 `ghcr.io/pumpkin-mc/pumpkin:master`）均可開箱即用。
- **預編譯二進位檔案**：面向 `x86_64` 與 `aarch64`（Linux、Windows、macOS）的官方二進位檔案發佈在 [GitHub Releases](https://github.com/Pumpkin-MC/Pumpkin/releases) 和[下載頁面](https://pumpkinmc.org/download)。
- **直接啟動**：直接在伺服器工作目錄中執行 `./pumpkin`。**請勿**傳遞 JVM 啟動引數（如 `-Xms`、`Xmx`、`-XX:+UseG1GC`、`-jar` 或 `--nogui`），因為二進位程式會拒絕未知的命令列標誌。

---

## 3. 處理程序生命週期與主控台整合

| 生命週期鉤子 | 預期行為 / 值 |
| :--- | :--- |
| **工作目錄** | 在目前工作目錄（`cwd`）下讀寫 `pumpkin.toml`、`world/`、`plugins/` 和 `latest.log`。 |
| **首次啟動設定** | 如果不存在 `pumpkin.toml`，會自動生成預設設定檔案。 |
| **啟動就緒日誌** | `Server is now running` |
| **優雅停機** | 向 `stdin` 寫入 `stop\n`，或傳送 `SIGINT` / `SIGTERM` 訊號。 |
| **診斷指令** | `tps` 與 `tick query`（報告 TPS、MSPT 以及 P50/P95/P99 tick 耗時百分位數）。 |

### 非互動式主控台（`stdin` / `stdout` 管線）
對於透過標準管線而非完整偽終端機（PTY）附加到伺服器處理程序的面板，請在 `pumpkin.toml` 中停用互動式 `rustyline` TTY 行編輯，同時保持主控台指令執行開啟：

```toml
[commands]
use_console = true
use_tty = false

[logging]
enabled = true
color = true # 如果面板日誌檢視器不支援 ANSI 跳脫序列，請設為 false
```

### 環境變數
- **`RUST_LOG`**：無需修改 `pumpkin.toml` 即可覆寫 `[logging] level`（例如 `RUST_LOG=debug` 或 `RUST_LOG=info`）。
- **`RAYON_NUM_THREADS`**：覆寫 Pumpkin 的 Rayon 平行計算執行緒池所產生的工作執行緒數（在 `/proc/cpuinfo` 暴露全部主機核心的共享容器環境中非常有用）。

### 無人值守的插件權限提示
預設情況下，當 WebAssembly 插件請求未批准的權限時，`[plugins]` 下的 `ask_permission_confirmation = true` 會在伺服器主控台中發出互動提示。在無頭（Headless）託管環境中，請確保使用者可以在啟動期間透過網頁主控台傳送輸入，或者允許在 `pumpkin.toml` 中設定 `ask_permission_confirmation` 和 `allowed_permissions`（參見[插件設定](../config/plugins)）。

---

## 4. 連接埠分配、代理與出站網路

Pumpkin 不使用 `server.properties`，而是在 `pumpkin.toml` 中設定所有監聽器和代理模式。

> [!IMPORTANT]
> **單一連接埠共享節點：** Pumpkin 預設**同時**啟用 Java 版（`25565`）和基於 NetherNet 的基岩版（`19132`）。在每個容器僅分配單一連接埠的共享節點上，多個實例會在 `19132` 連接埠發生衝突，除非你的面板為 `[networking.bedrock.nethernet]` 分配第二個連接埠，或者設定 `[networking.bedrock] enabled = false`。

```toml
[networking.java]
enabled = true
address = "0.0.0.0:25565"
max_players = 1000

[networking.bedrock]
enabled = true # 如果未分配基岩版連接埠，請設為 false

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
external_ip = "" # 可選：在 NAT 後執行時設為節點的公網 IP

[networking.query]
enabled = false
address = "0.0.0.0:25565"

[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
```

### 狀態監控與遠端管理（無傳統 RCON）
- **不支援傳統 TCP RCON**：Pumpkin 不支援傳統 TCP RCON。面板必須透過 `stdin` 傳送指令，或使用 `[networking.management]` 下基於 WebSocket 的 [Minecraft 伺服器管理協定 (MSMP)](../config/management)。
- **伺服器列表 Ping 與 Query**：標準的 TCP 狀態 Ping 可在 Java 版位址上正常運作，此外可在 `[networking.query]` 下啟用 UDP [GameSpy4 Query](../config/query)。

### 代理網路（Velocity、BungeeCord、Vine）
如果你的面板支援自動化設定代理（如 Velocity 現代轉發、BungeeCord/BungeeGuard 或 Vine），所有代理設定均位於 `pumpkin.toml` 的 `[networking.proxy]` 下，而非獨立的 `spigot.yml` 或 `paper-global.yml` 檔案中（參見[代理設定](../config/proxy)）。

### 出站 HTTPS 端點
請確保容器防火牆規則允許存取以下出站 HTTPS（`443`）端點：
- **Mojang / Xbox Live 身分驗證**：用於正版線上模式（online-mode）工作階段與材質皮膚驗證。
- **Pumpkin 插件市集 (`https://market.pumpkinmc.org`)**：在啟動時用於驗證已簽章的市集 WASM 插件（`[plugins] verify_signatures = true`）以及可選的匿名遙測心跳（`[telemetry] enabled = true`，參見[遙測設定](../config/telemetry)）。

---

## 5. 資源限制與規格配置

- **記憶體限制**：由於原生 Rust 二進位檔案動態向作業系統分配和釋放記憶體，沒有固定的 JVM 堆記憶體上限（`-Xms` / `-Xmx`），請在容器或作業系統層面強制執行記憶體限制（如 Docker `--memory`、`cgroup` 限制或 systemd `MemoryMax`）。單個插件的 WASM 記憶體也可以透過 `[plugins]` 下的 `max_memory_mb` 進行限制。
- **CPU 與多執行緒**：Pumpkin 使用 Tokio 處理非同步網路 I/O，使用 Rayon 進行平行區塊生成、光照計算和實體 tick（Entity Ticking）。請使用標準的容器 CPU 限制（`--cpus`、`cpuset-cpus` 或 `RAYON_NUM_THREADS`）來控制共享主機上的多核利用率。
- **基準資源佔用**：Pumpkin 啟動耗時約 10 ms，閒置記憶體佔用約 60 MiB，在 1.5–2 GiB 記憶體下即可承載數百名併發玩家（各檔位的 CPU 與記憶體剖析請參見[效能基準](../about/benchmarks)）。

---

## 6. Pterodactyl / Pelican 預設範本（Egg）參考

為 Pumpkin 建立 Pterodactyl 或 Pelican 預設範本（Egg）時，可使用以下設定解析器與處理程序設定：

:::code-group

```json [Process Configuration]
{
  "startup": {
    "done": "Server is now running"
  },
  "stop": "stop",
  "configs": {
    "pumpkin.toml": {
      "parser": "file",
      "find": {
        "[networking.java]": "[networking.java]\nenabled = true\naddress = \"0.0.0.0:{{server.build.default.port}}\"",
        "use_tty = true": "use_tty = false"
      }
    }
  }
}
```

:::
