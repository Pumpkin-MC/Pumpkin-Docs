# 资源包

Pumpkin 支持向 Java 版和基岩版客户端提供资源包。资源包选项在 `pumpkin.toml` 的 `[resource_pack.java]` 和 `[resource_pack.bedrock]` 下配置。

## Java 版资源包

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

### 选项

- **`enabled`**：启用向 Java 版客户端提供资源包的功能。
- **`url`**：Java 版资源包 ZIP 文件的直接下载 URL。
- **`sha1`**：资源包 ZIP 文件的 SHA-1 校验和。
- **`prompt_message`**：提示玩家下载资源包时显示的消息。
- **`force`**：断开拒绝下载资源包的玩家的连接。

## 基岩版资源包

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

### 选项

- **`enabled`**：为基岩版客户端启用资源包。
- **`force`**：强制基岩版客户端在加入前下载所需资源包。
- **`packs`**：基岩版资源包定义数组。

### 基岩版资源包字段

`packs` 数组中的每个资源包接受以下属性：

- **`uuid`**：（必需）与基岩版资源包 `manifest.json` 匹配的唯一标识符（UUID）。
- **`version`**：（必需）资源包的版本字符串（例如 `"1.0.0"`）。
- **`size`**：（必需）资源包归档文件的大小，单位为字节。
- **`download_url`**：（必需）`.mcpack` 或归档文件的直接下载 URL。
- **`content_key`**：（可选）加密的商城/自定义资源包的解密密钥。
- **`sub_pack_name`**：（可选）资源包内要启用的子包名称。
- **`content_id`**：（可选）内容标识符字符串。
- **`has_scripts`**：（可选）资源包是否包含客户端脚本（`true`/`false`，默认：`false`）。
- **`addon_pack`**：（可选）是否将资源包标记为附加包（默认：`false`）。
- **`rtx_enabled`**：（可选）是否为资源包启用光线追踪/RTX 功能（默认：`false`）。
