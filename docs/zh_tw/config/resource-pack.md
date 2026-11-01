# 資源包

Pumpkin 支援向 Java 版和基岩版用戶端提供資源包。資源包選項在 `pumpkin.toml` 的 `[resource_pack.java]` 和 `[resource_pack.bedrock]` 下設定。

## Java 版資源包

:::code-group

```toml [pumpkin.toml]
[resource_pack.java]
enabled = false
url = ""
sha1 = ""
prompt_message = ""
force = false
```

:::

### 選項

- **`enabled`**：啟用向 Java 版用戶端提供資源包的功能。
- **`url`**：Java 版資源包 ZIP 檔案的直接下載 URL。
- **`sha1`**：資源包 ZIP 檔案的 SHA-1 校驗和。
- **`prompt_message`**：提示玩家下載資源包時顯示的訊息。
- **`force`**：斷開拒絕下載資源包的玩家的連線。

## 基岩版資源包

:::code-group

```toml [pumpkin.toml]
[resource_pack.bedrock]
enabled = false
force = false
packs = [
  # { uuid = "00000000-0000-0000-0000-000000000000", version = "1.0.0", size = 1048576, download_url = "https://example.com/pack.mcpack" }
]
```

:::

### 選項

- **`enabled`**：為基岩版用戶端啟用資源包。
- **`force`**：強制基岩版用戶端在加入前下載所需資源包。
- **`packs`**：基岩版資源包定義陣列。

### 基岩版資源包欄位

`packs` 陣列中的每個資源包接受以下屬性：

- **`uuid`**：（必需）與基岩版資源包 `manifest.json` 匹配的唯一識別符號（UUID）。
- **`version`**：（必需）資源包的版本字串（例如 `"1.0.0"`）。
- **`size`**：（必需）資源包歸檔檔案的大小，單位為位元組。
- **`download_url`**：（必需）`.mcpack` 或歸檔檔案的直接下載 URL。
- **`content_key`**：（可選）加密的商城/自訂資源包的解密金鑰。
- **`sub_pack_name`**：（可選）資源包內要啟用的子包名稱。
- **`content_id`**：（可選）內容識別符號字串。
- **`has_scripts`**：（可選）資源包是否包含用戶端指令碼（`true`/`false`，預設：`false`）。
- **`addon_pack`**：（可選）是否將資源包標記為附加包（預設：`false`）。
- **`rtx_enabled`**：（可選）是否為資源包啟用光線追蹤/RTX 功能（預設：`false`）。
