# Bukkit / Spigot / Paper から Pumpkin への移行

このガイドでは、サーバーを Bukkit、Spigot、または Paper から Pumpkin に移行する際のアーキテクチャおよび設定の違いについて説明します。

---

## 1. アーキテクチャの違い

| 項目 | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **実行環境** | Java 仮想マシン (Java 17/21+ が必要) | ネイティブ実行ファイル (Rust コンパイル済み、Java 不要) |
| **起動コマンド** | `java [flags] -jar server.jar` | `./pumpkin` |
| **ティックループ** | 非同期タスクオフロードを伴うシングルスレッド | CPU コア全体にわたるマルチスレッド実行 |
| **プラグイン形式** | Bukkit API 向け Java バイトコード (`.jar`) | WebAssembly (`.wasm`)、または PatchBukkit 経由の `.jar` |
| **プラグイン言語** | Java, Kotlin, Scala | Rust, Python, Kotlin, C#, Go, C |
| **設定ファイル** | `server.properties`, `paper.yml`, `spigot.yml` | `pumpkin.toml` (TOML 形式) |
| **メモリ管理** | JVM ガベージコレクション (GC) | OS ネイティブメモリ割り当て |

---

## 2. プラグインと拡張機能

### WebAssembly プラグイン
Pumpkin の主要なプラグイン形式は WebAssembly (`.wasm`) です:
- **分離性**: プラグインはサンドボックス化された WebAssembly ランタイム内で実行されます。
- **言語サポート**: Rust、Python、Go、C#、C、または Kotlin から WASM へコンパイルできます。
- **カスタムプラグイン**: 独自の Bukkit プラグインを移植する場合は、[開発者向け移行ガイド](../plugin-dev/migrating-from-bukkit/index)を参照してください。

### Bukkit プラグインの互換性: PatchBukkit
既存の Bukkit/Spigot `.jar` プラグインを必要とするサーバー向けに、**PatchBukkit** プロジェクトが互換レイヤーを提供しています:
- **アーキテクチャ**: PatchBukkit は Pumpkin 内に JVM を組み込み、Bukkit API の一部を再実装して、JNI および FFI 経由で Pumpkin に仲介します。
- **プラグインの配置**: 互換性のある `.jar` プラグインは `patchbukkit/patchbukkit-plugins/` に配置します。
- **状況と制限**: PatchBukkit は開発中です。標準的な Bukkit API 呼び出しはサポートされていますが、内部の NMS (`net.minecraft.server`) クラス、CraftBukkit リフレクション、またはバイトコード操作に依存するプラグインは正常に動作しない場合があります。
- **Java の必要性**: PatchBukkit を実行するには、組み込み JVM を実行するためにホスト環境に Java ランタイム (JRE/JDK) が必要です。

---

## 3. 設定とプロパティ

Pumpkin では `server.properties` や YAML の代わりに TOML 設定ファイルを使用します:

| Paper / Spigot (`server.properties`) | Pumpkin (`pumpkin.toml`) |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. ワールドとデータストレージ

- **形式の互換性**: Pumpkin は標準的な Anvil チャンク形式 (`.mca` ファイル) を読み込みます。
- **ディレクトリ配置**: 既存の Paper/Spigot からワールドをコピーする際は、ディメンションディレクトリ (`world`, `world_nether`, `world_the_end`) が Pumpkin の想定する配置と一致していることを確認してください。
- **最新のワールドおよびデータパック形式が必要**: 少なくとも現時点では、Pumpkin は対象の Minecraft バージョンに対応する最新のワールド形式およびデータパック形式のみをサポートしています。古いワールド形式や以前のデータパックバージョンを起動時に自動変換する機能はありません。
  - **クライアントでのワールド更新**: 古いバージョンで生成されたワールドを移行する場合は、Pumpkin に読み込む前に更新してください。公式の Minecraft クライアントで直接ワールドをアップグレードできます。対応する最新バージョンのクライアントを起動し、**シングルプレイ**から対象ワールドを選択して**編集** -> **ワールドを最適化**を実行します。または、最新バージョンのバニラサーバーで一度ワールドを起動して保存することでも更新可能です。
  - **データパック**: `world/datapacks` 内のすべてのデータパックが、対象バージョンで要求されるパック形式に更新されていることを確認してください。

---

## 5. 起動と JVM フラグ

### Java のインストールは不要
純粋な Pumpkin は単体の自己完結型ネイティブ実行ファイルです。サーバーを実行するために OS やコンテナ内に Java ランタイム (JRE/JDK) をインストールする必要はありません。

### 起動コマンドの比較
Paper や Spigot サーバーでは通常、ヒープ割り当てやガベージコレクション設定を含む JVM 起動スクリプト (Aikar's Flags など) を使用します:

:::code-group

```bash [Paper (JVM)]
# Aikar's Flags を用いた典型的な Paper 起動コマンド:
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

```bash [Pumpkin (ネイティブ)]
# Linux / macOS:
./pumpkin

# Windows:
./pumpkin.exe

# Docker:
docker run -p 25565:25565 -v ./data:/data pumpkinmc/pumpkin:latest
```

:::

### メモリモデルの違い
- **ガベージコレクターなし**: Pumpkin は Rust で記述されており、コンパイル時の決定論的なメモリ管理 (RAII) を使用します。ランタイムガベージコレクターはなく、GC 一時停止の調整もありません。
- **固定ヒープ割り当てなし**: ネイティブバイナリには `-Xms` や `-Xmx` などのフラグは存在しません。メモリはチャンクやエンティティのロードに応じて動的に確保され、アンロード時に解放されます。
- **JVM フラグは適用不可**: ガベージコレクション戦略、世代サイズ、または JVM 内部パラメータを調整するフラグは不要であり、バイナリに渡すことはできません。

---

## 管理者チェックリスト

1. [ ] 既存のサーバーデータとワールドファイルのバックアップを作成し、ワールドとデータパックが最新形式に更新されていることを確認する (クライアントの「ワールドを最適化」など)。
2. [ ] `server.properties` の設定を `pumpkin.toml` に反映する。
3. [ ] 必要なプラグインを確認し、WebAssembly (`.wasm`) の代替を探すか、[PatchBukkit](#bukkit-プラグインの互換性patchbukkit) でテストする。
4. [ ] プロキシネットワークを使用する場合は、`pumpkin.toml` でプロキシ設定 (`Velocity` / `BungeeCord`) を行う。
5. [ ] 起動スクリプトを更新し、JVM 引数なしで `./pumpkin` を直接実行するように変更する。
6. [ ] サーバーを起動し、接続性とログを確認する。
