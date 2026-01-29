# Kaynak packet

Sunucular, oyunun istemci tarafındaki görünümünü değiştirmek için istemcilere kaynak packet gönderebilir. Pumpkin, kaynak packet tamamen yapılandırmanıza olanak tanır.

> [!TIP]
> Kaynak packet [PackSquash](https://packsquash.aylas.org/) kullanarak küçültün! Bu, istemcilerin kaynak packet daha hızlı indirmesine yardımcı olabilir.

## Kaynak packet Yapılandırma

#### `enabled`: Boolean

Kaynak packet etkin olup olmadığı.

:::code-group

```toml [features.toml] {2}
[resource_pack]
enabled = true
```

:::

#### `resource_pack_url`: String

Kaynak packet doğrudan indirme URL'si.

> [!TIP]
> Kaynak packet ücretsiz olarak [MCPacks](https://mc-packs.net/) üzerinde barındırabilirsiniz.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_url = "[your download URL here]"
```

:::

#### `resource_pack_sha1`: String

Kaynak packet SHA1 hash'i.

> [!IMPORTANT]
> Zorunlu olmasa da bu alanı belirtmelisiniz; aksi halde istemci, kaynak packet değişiklik olmasa bile sunucuya her katıldığında kaynak packet yeniden indirir.

> [!WARNING]
> Kaynak packet değiştirdiğinizde bu alanı güncellediğinizden emin olun.

::: details Kaynak packet SHA1 hash'ini nasıl alırım?
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

Kullanıcıya kaynak packet indirmesi istendiğinde gösterilecek mesaj.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
prompt_message = "[your message here]"
```

:::

#### `force`: Boolean

İstemciyi kaynak packet indirmeye zorlayıp zorlamaması. İstemci indirmeyi reddederse sunucudan atılır.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
force = false
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak istemcilere kaynak packet gönderilmez.

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

