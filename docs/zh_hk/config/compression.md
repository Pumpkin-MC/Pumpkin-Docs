# 壓縮

封包壓縮可減少 Java 版和基岩版客戶端的帶寬佔用。在 `pumpkin.toml` 中，Java 版與基岩版的網絡壓縮以及世界區塊壓縮均可獨立設定。

## 網絡壓縮

### Java 版

:::code-group

```toml [pumpkin.toml]
[networking.java.compression]
enabled = true
threshold = 256
level = 4
```

:::

### 基岩版

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.compression]
enabled = true
threshold = 256
level = 4
```

:::

### 設定選項

- **`enabled`**：啟用網絡封包壓縮。
- **`threshold`**：觸發壓縮所需的最小封包負載大小（位元組）。
- **`level`**：壓縮等級（0 到 9，數值越高，消耗的 CPU 時間越多，但封包越小）。

## 世界區塊壓縮

區塊壓縮設定控制儲存的世界區塊資料在磁碟上的壓縮方式。

:::code-group

```toml [pumpkin.toml]
[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

- **`algorithm`**：區塊資料使用的壓縮演算法。支援 `"LZ4"`、`"ZLib"`、`"GZip"` 和 `"Custom"`（預設：`"LZ4"`）。
- **`level`**：區塊資料的壓縮等級（預設：`6`）。
