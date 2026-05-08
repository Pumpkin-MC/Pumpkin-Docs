# クイックスタート

**現在のステータス:**
プレリリース: 現在開発中で、まだ正式リリースの準備は整っていません。

## プレリリースバイナリのダウンロード

ビルド済みバイナリは [プレリリースダウンロードページ](https://pumpkinmc.org/download) からダウンロードできます。

## ソースからビルドする (Rust)

Pumpkin をコンパイルするには、[Rust](https://www.rust-lang.org/tools/install) がインストールされていることを確認してください。

1. **リポジトリをクローン** し、ディレクトリに移動します:

```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **任意:** 必要に応じて、バニラのワールドを `Pumpkin/` ディレクトリ内に配置できます。ワールドフォルダの名前は `world` にしてください。

3. 実行:

> [!NOTE]
> リリースビルドの大規模な最適化のため、ビルドプロセスには時間がかかる場合があります。

```shell
cargo run --release
```

4. **任意:** CPU 固有の機能を活用してパフォーマンスを最大化するには、`target-cpu=native` Rust コンパイラフラグを設定できます:

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE]
> 同じローカルシステム上でセルフホスティングしているサーバーで遊ぶ場合(例えば Linux で Prism Launcher を使ってログインして Minecraft をプレイし、Pumpkin でサーバーをホスティングする場合)、'マルチプレイ' -> 'サーバーを追加' -> 'サーバーアドレス' から "localhost:25565" をサーバーアドレスとして使う必要がある場合があります。ターミナルの run-server 出力にはこのアドレスは表示されないことに注意してください。
```text
localhost:25565
```

## Docker

> [!IMPORTANT]
> Docker のサポートは現時点では実験的なものです。

まだの場合は、[Docker をインストール](https://docs.docker.com/engine/install/) する必要があります。Docker をインストールした後、次のコマンドを実行してサーバーを起動できます:

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`: Pumpkin に接続したいポート番号、例えば `25565`。
- `<server_data_location>`: サーバー設定とデータを保存したい場所、例えば `./data`。

### 例

ポート `25565` で Pumpkin を実行し、データを `./data` ディレクトリに保存するには、次のコマンドを実行します:

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## テストサーバー

Pumpkin には @kralverde が運用するテストサーバーがあります。Pumpkin の master ブランチの最新コミットで動作しています。

- **IP:** pumpkin.kralverde.dev

**スペック:**

- OS: Debian GNU/Linux bookworm 12.7 x86_64
- カーネル: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM
