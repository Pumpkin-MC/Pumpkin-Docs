# 资源包
服务器可以向客户端发送资源包，以改变客户端上游戏的外观。Pumpkin 允许你完全配置资源包。

> [!TIP]
> 使用 [PackSquash](https://packsquash.aylas.org/) 压缩你的资源包！这可以帮助客户端更快地下载资源包。

## 配置资源包

#### `enabled`: 布尔值
是否启用资源包。

:::code-group
```toml [features.toml] {2}
[resource_pack]
enabled = true
```
:::

#### `resource_pack_url`: 字符串
资源包的直接下载 URL。

> [!TIP]
> 你可以在 [MCPacks](https://mc-packs.net/) 免费托管资源包。

:::code-group
```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_url = "[你的下载 URL 在这里]"
```
:::

#### `resource_pack_sha1`: 字符串
资源包的 SHA1 哈希值。

> [!IMPORTANT]
> 虽然不需要指定，但你应该指定此字段，因为否则客户端每次加入服务器时都会重新下载资源包，即使资源包没有变化。

> [!WARNING]
> 如果资源包被修改，请确保更新此字段。

::: details 如何获取资源包的 SHA1 哈希值？
::: code-group
```powershell [Windows (PowerShell)]
Get-FileHash [文件] SHA1
```
```shell [Mac OS]
shasum -a 1 [文件]
```
```shell [Linux]
sha1sum [文件]
```
:::

:::code-group
```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_sha1 = "[你的哈希值在这里]"
```
:::

#### `prompt_message`: 字符串
当提示用户下载资源包时显示的消息。

:::code-group
```toml [features.toml] {3}
[resource_pack]
enabled = true
prompt_message = "[你的消息在这里]"
```
:::

#### `force`: 布尔值
是否强制客户端下载资源包。如果客户端拒绝下载，他们将被踢出服务器。

:::code-group
```toml [features.toml] {3}
[resource_pack]
enabled = true
force = false
```
:::

## 默认配置
默认情况下，不向客户端发送资源包。

:::code-group
```toml [features.toml]
[resource_pack]
enabled = false
resource_pack_url = ""
resource_pack_sha1 = ""
prompt_message = ""
force = false
```
::: 