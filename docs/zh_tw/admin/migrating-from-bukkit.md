# 從 Bukkit / Spigot / Paper 遷移至 Pumpkin

本指南涵蓋將伺服器從 Bukkit、Spigot 或 Paper 遷移至 Pumpkin 時的架構與設定差異。

---

## 1. 架構差異

| 方面 | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **執行環境** | Java 虛擬機器（需要 Java 17/21+） | 原生執行檔（Rust 編譯，無需 Java） |
| **啟動指令** | `java [flags] -jar server.jar` | `./pumpkin` |
| **tick 迴圈** | 可將工作分派給非同步工作執行緒的單執行緒 tick 迴圈 | 跨 CPU 核心執行多執行緒 tick |
| **插件格式** | 面向 Bukkit API 的 Java 位元組碼（`.jar`） | WebAssembly（`.wasm`），或透過 PatchBukkit 支援 `.jar` |
| **插件開發語言** | Java、Kotlin、Scala | Rust、Python、Kotlin、C#、Go、C |
| **設定檔案** | `server.properties`、`paper.yml`、`spigot.yml` | `pumpkin.toml`（TOML 格式） |
| **記憶體管理** | JVM 垃圾回收（Garbage Collection） | 原生作業系統記憶體分配 |

---

## 2. 插件與擴充

### WebAssembly 插件
Pumpkin 的主要插件格式為 WebAssembly（`.wasm`）：
- **隔離性**：插件在沙箱化的 WebAssembly 執行環境中執行。
- **語言支援**：開發者可以使用 Rust、Python、Go、C#、C 或 Kotlin 將插件編譯為 WASM。
- **移植插件**：關於將自訂 Bukkit 插件移植到 Pumpkin，請參見[開發者遷移指南](../plugin-dev/migrating-from-bukkit/index)。

### Bukkit 插件相容性：PatchBukkit
對於依賴現有 Bukkit/Spigot `.jar` 插件的伺服器，**PatchBukkit** 專案提供了相容層：
- **架構**：PatchBukkit 在 Pumpkin 內部嵌入了一個 JVM 並重新實現了部分 Bukkit API，透過 JNI 和 FFI 與 Pumpkin 橋接。
- **插件目錄**：相容的 `.jar` 插件放置在 `patchbukkit/patchbukkit-plugins/` 目錄中。
- **現狀與限制**：PatchBukkit 仍在積極開發中。雖然支援標準 Bukkit API 呼叫，但依賴 NMS（`net.minecraft.server`）內部類、CraftBukkit 內部實現或位元組碼操作的插件可能無法正常工作。
- **Java 依賴**：使用 PatchBukkit 需要在主機系統上安裝 Java 執行環境（JRE/JDK）以執行內嵌的 JVM。

---

## 3. 設定與屬性

Pumpkin 使用 TOML 設定檔案替代 `server.properties` 和 YAML：

| Paper / Spigot（`server.properties`） | Pumpkin（`pumpkin.toml`） |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. 世界與資料儲存

- **格式相容性**：Pumpkin 支援標準的 Anvil 區塊格式（`.mca` 檔案）。
- **目錄結構**：從現有的 Paper/Spigot 複製世界時，請確保維度目錄（`world`、`world_nether`、`world_the_end`）與 Pumpkin 的目錄佈局相符。
- **需要最新的世界與資料包格式**：至少在目前階段，Pumpkin 僅支援對應目標 Minecraft 版本的最新世界格式和資料包格式。執行時不會自動轉換舊版世界格式或舊版資料包。
  - **在用戶端中升級世界**：如果要遷移較舊的世界，請在 Pumpkin 中載入前先進行升級。你可以直接在官方 Minecraft 用戶端中更新世界：使用匹配的最新版本開啟用戶端，進入**單人遊戲**，選擇該世界，點選**編輯**並選擇**最佳化世界**。或者，也可以在匹配最新版本的原版伺服器上執行一次該世界。
  - **資料包**：確保 `world/datapacks` 中的所有自訂資料包均已更新到目標版本所要求的格式版本。

---

## 5. 啟動與 JVM 標誌

### 無需安裝 Java
純淨的 Pumpkin 是一個獨立的自包含原生執行檔。執行該伺服器不需要在系統或容器中安裝 Java 執行環境（JRE/JDK）。

### 啟動指令對比
Paper 和 Spigot 伺服器通常使用帶有堆記憶體分配和垃圾回收引數的 JVM 啟動指令碼（如 Aikar's Flags）：

:::code-group

```bash [Paper (JVM)]
# 帶有 Aikar's Flags 的典型 Paper 啟動指令：
java -Xms10G -Xmx10G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -Dusing.aikars.flags=https://mcflags.emc.gs \
  -Daikars.new.flags=true \
  -jar paper.jar --nogui
```

```bash [Pumpkin (原生)]
# Linux / macOS:
./pumpkin

# Windows:
./pumpkin.exe

# Docker:
docker run -p 25565:25565 -v ./data:/data pumpkinmc/pumpkin:latest
```

:::

### 記憶體機制差異
- **無垃圾回收器**：Pumpkin 由 Rust 編寫，在編譯階段使用確定性的記憶體管理（RAII）。不存在執行階段的垃圾回收器，因此無需調優 GC 停頓。
- **無需固定堆記憶體**：原生程式中不存在 `-Xms` 和 `-Xmx` 標誌。記憶體根據區塊和實體的載入動態向作業系統申請，卸載後立即釋放。
- **JVM 標誌不適用**：用於調優垃圾回收策略、分代大小或 JVM 內部機制的引數均不適用，且無法傳遞給程式。

---

## 管理員檢查清單

1. [ ] 備份現有伺服器資料和世界檔案，並確保世界與資料包已升級到最新格式（例如透過用戶端的“最佳化世界”）。
2. [ ] 將 `server.properties` 中的設定對映至 `pumpkin.toml`。
3. [ ] 確定所需插件並尋找 WebAssembly（`.wasm`）替代，或使用 [PatchBukkit](#bukkit-插件相容性-patchbukkit) 進行測試。
4. [ ] 若使用代理網路，在 `pumpkin.toml` 中設定代理設定（`Velocity` / `BungeeCord`）。
5. [ ] 更新啟動指令碼以直接執行 `./pumpkin`，無需傳入 JVM 引數。
6. [ ] 啟動伺服器並檢查連線和日誌。
