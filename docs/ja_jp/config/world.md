# ワールド

Pumpkin では、`pumpkin.toml` 内の `[world]` セクションで、ワールドのストレージ形式、自動保存の間隔、ライティングモードを細かく調整できます。

## 設定

:::code-group

```toml [pumpkin.toml]
[world]
lighting = "default"
autosave_ticks = 6000

[world.chunk]
type = "anvil"
write_in_place = false

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

### ワールド設定

- **`lighting`**: ライティングエンジンの光伝搬計算モード。
  - `"default"`: 標準のバニラ Minecraft の光伝搬。
  - `"full"`: 影がなく、すべての場所が最大の空の明るさになります。
  - `"dark"`: すべての場所が完全に真っ暗になります (光レベル 0)。
- **`autosave_ticks`**: ワールドが自動保存されるサーバーティックの間隔 (デフォルト: `6000`、20 TPS で 5 分に相当)。`0` に設定するとワールドの自動保存が無効になります。

### チャンクストレージ設定

- **`type`**: 使用するチャンクストレージ形式:
  - `"anvil"`: 標準の Minecraft Anvil リージョンファイル形式 (`.mca`)。
  - `"linear"`: ディスク使用量を抑えるために高速圧縮を使用する Linear リージョンストレージ形式。
  - `"pump"`: Pumpkin ネイティブの最適化されたワールド形式。
- **`write_in_place`**: 空きチャンクを再割り当てするのではなく、既存のリージョンファイル内の元の位置にチャンクを上書きするかどうか (デフォルト: `false`)。
- **`compression.algorithm`**: チャンクデータに使用される圧縮アルゴリズム (`"LZ4"`, `"ZLib"`, `"GZip"`, `"Custom"`)。
- **`compression.level`**: チャンクストレージの圧縮レベル (デフォルト: `6`)。
