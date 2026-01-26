# Kaynak Paketi

Sunucular, oyunun istemci tarafındaki görünümünü değiştirmek için istemcilere kaynak paketi gönderebilir. Pumpkin, kaynak paketini tamamen yapılandırmanıza olanak tanır.

> [!TIP]
> Kaynak paketinizi [PackSquash](https://packsquash.aylas.org/) kullanarak küçültün! Bu, istemcilerin kaynak paketini daha hızlı indirmesine yardımcı olabilir.

## Kaynak Paketini Yapılandırma

#### `enabled`: Boolean

Kaynak paketinin etkin olup olmadığı.

:::code-group

```toml [features.toml] {2}
[resource_pack]
enabled = true
```

:::

#### `resource_pack_url`: String

Kaynak paketine doğrudan indirme URL'si.

> [!TIP]
> Kaynak paketini ücretsiz olarak [MCPacks](https://mc-packs.net/) üzerinde barındırabilirsiniz.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_url = "[your download URL here]"
```

:::

#### `resource_pack_sha1`: String

Kaynak paketinin SHA1 hash'i.

> [!IMPORTANT]
> Zorunlu olmasa da bu alanı belirtmelisiniz; aksi halde istemci, kaynak pakette değişiklik olmasa bile sunucuya her katıldığında kaynak paketini yeniden indirir.

> [!WARNING]
> Kaynak paketini değiştirdiğinizde bu alanı güncellediğinizden emin olun.

::: details Kaynak paketimin SHA1 hash'ini nasıl alırım?
::: code-group

```powershell [Windows (PowerShell)]
Get-FileHash [file] SHA1
```

```shell [Mac OS]
shasum -a 1 [file]
```

```shell [Linux]
sha1sum [file]
```

:::

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_sha1 = "[your hash here]"
```

:::

#### `prompt_message`: String

Kullanıcıya kaynak paketini indirmesi istendiğinde gösterilecek mesaj.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
prompt_message = "[your message here]"
```

:::

#### `force`: Boolean

İstemciyi kaynak paketini indirmeye zorlayıp zorlamaması. İstemci indirmeyi reddederse sunucudan atılır.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
force = false
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak istemcilere kaynak paketi gönderilmez.

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
