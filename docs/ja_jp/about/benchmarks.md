# ベンチマーク

ここでは、一般的な Minecraft サーバーソフトウェアと Pumpkin を比較しています。

> [!CAUTION]
> **この比較は公平ではありません。** Pumpkin は現時点で他のサーバーよりもはるかに少ない機能しか持っていないため、リソース使用量が少なく見えるかもしれません。
> また、他のサーバーが何年もかけて最適化されてきたことも考慮する必要があります。
> バニラのフォークは、バニラのロジック全体を書き直す必要がないため、最適化のみに集中できます。

![9 つの Minecraft ゲームウィンドウを示すスクリーンショット](https://github.com/user-attachments/assets/e08fbb00-42fe-4479-a03b-11bb6886c91a)

## 仕様

### 技術仕様

#### ソフトウェア

- ディストリビューション: Manjaro Linux
- アーキテクチャ: x86_64 (64ビット)
- カーネルバージョン: 6.11.3-arch1-1

#### ハードウェア

- マザーボード: MAG B650 TOMAHAWK WIFI
- CPU: AMD Ryzen 7600X 6コア
- RAM: Corsair 2x16GB DDR5 6000Mhz
- ストレージ: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
- 冷却: be quiet Dark Rock Elite

#### Rust

- ツールチェイン: stable-x86_64-unknown-linux-gnu (1.81.0)
- Rust コンパイラ: rustc 1.81.0 (eeb90cda1 2024-09-04)

#### Java

- JDK バージョン: OpenJDK 23 64-Bit 2024-09-17
- JRE バージョン: OpenJDK Runtime Environment (build 23+37)
- ベンダー: Oracle

#### ゲーム

- Minecraft バージョン: 1.21.1
- 描画距離: 10
- シミュレーション距離: 10
- オンラインモード: false
- RCON: false

<sub><sup>非プレミアムアカウントでのテストを容易にするため、オンラインモードは無効にしました。</sup></sub>

> [!NOTE]
> より正確な結果を得るため、すべてのテストは複数回実行されています。
> すべてのプレイヤーはスポーン時に移動しませんでした。最初の 8 チャンクのみがロードされました。
> すべてのサーバーは独自の地形生成を使用しました。事前にロードされたワールドはありません。

> [!IMPORTANT]
> `CPU Max` は通常、最初のチャンクがロードされるため、プレイヤーが 1 人の時に高くなります。

## Pumpkin

ビルド: [8febc50](https://github.com/Snowiiii/Pumpkin/commit/8febc5035d5611558c13505b7724e6ca284e0ada)

コンパイル引数: `--release`

実行引数:

**ファイルサイズ:** <FmtNum :n=12.3 />MB

**起動時間:** <FmtNum :n=8 />ms

**シャットダウン時間:** <FmtNum :n=0 />ms

| プレイヤー数 | RAM                   | CPU アイドル        | CPU 最大           |
| ------- | --------------------- | ---------------- | ------------------ |
| 0       | <FmtNum :n=392.2 />KB | <FmtNum :n=0 />% | <FmtNum :n=0 />%   |
| 1       | <FmtNum :n=24.9 />MB  | <FmtNum :n=0 />% | <FmtNum :n=4 />%   |
| 2       | <FmtNum :n=25.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=0.6 />% |
| 5       | <FmtNum :n=26 />MB    | <FmtNum :n=0 />% | <FmtNum :n=1 />%   |
| 10      | <FmtNum :n=27.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=1.5 />% |

<sub><sup>Pumpkin はロード済みのチャンクをキャッシュしているので、プレイヤーデータ以外の追加 RAM 使用量がほぼなく、CPU 使用率も最小限に抑えられます。</sup></sub>

### コンパイル時間

ゼロからのコンパイル:

**Debug:** <FmtNum :n=10.35 />秒
**Release:** <FmtNum :n=38.40 />秒

再コンパイル (pumpkin crate):

**Debug:** <FmtNum :n=1.82 />秒
**Release:** <FmtNum :n=28.68 />秒

## バニラ

リリース: [1.21.1](https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar)

コンパイル引数:

実行引数: `nogui`

**ファイルサイズ:** <FmtNum :n=51.6 />MB

**起動時間:** <FmtNum :n=7 />秒

**シャットダウン時間:** <FmtNum :n=4 />秒

| プレイヤー数 | RAM                   | CPU アイドル                              | CPU 最大           |
| ------- | --------------------- | ---------------------------------------- | ------------------ |
| 0       | <FmtNum n="860" />MB  | <FmtNum n="0.1" /> - <FmtNum n="0.3" />% | <FmtNum n="51" />% |
| 1       | <FmtNum n="1.5" />GB  | <FmtNum n="0.9" /> - <FmtNum n="1" />%   | <FmtNum n="41" />% |
| 2       | <FmtNum n="1.6" />GB  | <FmtNum n="1" /> - <FmtNum n="1.1" />%   | <FmtNum n="10" />% |
| 5       | <FmtNum n="1.8" />GB  | <FmtNum n="2" />%                        | <FmtNum n="20" />% |
| 10      | <FmtNum n="2.2" />GB  | <FmtNum n="4" />%                        | <FmtNum n="24" />% |

## Paper

ビルド: [122](https://api.papermc.io/v2/projects/paper/versions/1.21.1/builds/122/downloads/paper-1.21.1-122.jar)

コンパイル引数:

実行引数: `nogui`

**ファイルサイズ:** <FmtNum :n=49.4 />MB

**起動時間:** <FmtNum :n=7 />秒

**シャットダウン時間:** <FmtNum :n=3 />秒

| プレイヤー数 | RAM                 | CPU アイドル                            | CPU 最大          |
| ------- | ------------------- | -------------------------------------- | ----------------- |
| 0       | <FmtNum :n=1.1 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=36 />% |
| 1       | <FmtNum :n=1.7 />GB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=47 />% |
| 2       | <FmtNum :n=1.8 />GB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=10 />% |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.5 />%                     | <FmtNum :n=15 />% |
| 10      | <FmtNum :n=2 />GB   | <FmtNum :n=3 />%                       | <FmtNum :n=20 />% |

## Purpur

ビルド: [2324](https://api.purpurmc.org/v2/purpur/1.21.1/2324/download)

コンパイル引数:

実行引数: `nogui`

**ファイルサイズ:** <FmtNum :n=53.1 />MB

**起動時間:** <FmtNum :n=8 />秒

**シャットダウン時間:** <FmtNum :n=4 />秒

| プレイヤー数 | RAM                 | CPU アイドル                            | CPU 最大          |
| ------- | ------------------- | -------------------------------------- | ----------------- |
| 0       | <FmtNum :n=1.4 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=25 />% |
| 1       | <FmtNum :n=1.6 />GB | <FmtNum :n=0.7 /> - <FmtNum :n=1.0 />% | <FmtNum :n=35 />% |
| 2       | <FmtNum :n=1.7 />GB | <FmtNum :n=1.1 /> - <FmtNum :n=1.3 />% | <FmtNum :n=9 />%  |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.6 />%                     | <FmtNum :n=20 />% |
| 10      | <FmtNum :n=2.2 />GB | <FmtNum :n=2 /> - <FmtNum :n=2.5 />%   | <FmtNum :n=26 />% |

## Minestom

コミット: [0ca1dda2fe](https://github.com/Minestom/Minestom/commit/0ca1dda2fe11390a1b89a228bbe7bf78fefc73e1)

コンパイル引数:

実行引数:

**言語:** ベンチマークは Kotlin 2.0.0 で実行 (Minestom 自体は Java 製)

**ファイルサイズ:** <FmtNum :n=2.8 />MB (ライブラリ)

**起動時間:** <FmtNum :n=310 />ms

**シャットダウン時間:** <FmtNum :n=0 />ms

<sub>[使用したサンプルコード](https://minestom.net/docs/setup/your-first-server)</sub>

| プレイヤー数 | RAM                 | CPU アイドル                            | CPU 最大         |
| ------- | ------------------- | -------------------------------------- | ---------------- |
| 0       | <FmtNum :n=228 />MB | <FmtNum :n=0.1 /> - <FmtNum :n=0.3 />% | <FmtNum :n=1 />% |
| 1       | <FmtNum :n=365 />MB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=5 />% |
| 2       | <FmtNum :n=371 />MB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=4 />% |
| 5       | <FmtNum :n=390 />MB | <FmtNum :n=1.0 />%                     | <FmtNum :n=6 />% |
| 10      | <FmtNum :n=421 />MB | <FmtNum :n=3 />%                       | <FmtNum :n=9 />% |

ベンチマーク実行日時: <FmtDateTime :d="new Date('2024-10-15T16:34Z')" />
