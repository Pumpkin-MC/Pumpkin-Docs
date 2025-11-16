# Ressourcenpaket

Server können Clients Ressourcenpakete senden, um das Aussehen des Spiels zu verändern. Pumpkin erlaubt die vollständige Konfiguration des Ressourcenpakets.

> [!TIP]
> Minifiziere dein Ressourcenpaket mit [PackSquash](https://packsquash.aylas.org/), damit Clients es schneller herunterladen können.

## Ressourcenpaket konfigurieren

#### `enabled`: Boolean

Ob ein Ressourcenpaket aktiviert ist.

:::code-group

```toml [features.toml] {2}
[resource_pack]
enabled = true
```

:::

#### `resource_pack_url`: String

Direkte Download‑URL des Ressourcenpakets.

> [!TIP]
> Du kannst dein Ressourcenpaket kostenlos bei [MCPacks](https://mc-packs.net/) hosten.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_url = "[dein download URL hier]"
```

:::

#### `resource_pack_sha1`: String

SHA1‑Hash des Ressourcenpakets.

> [!IMPORTANT]
> Auch wenn er nicht zwingend erforderlich ist, solltest du diesen Wert angeben. Andernfalls lädt der Client das Paket bei jedem Serverbeitritt erneut herunter, selbst wenn sich nichts geändert hat.

> [!WARNING]
> Aktualisiere diesen Wert, sobald sich das Ressourcenpaket ändert.

::: details Wie erhalte ich den SHA1‑Hash meines Ressourcenpakets?
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
resource_pack_sha1 = "[dein hash hier]"
```

:::

#### `prompt_message`: String

Die Nachricht, die dem Spieler beim Herunterladen angezeigt wird.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
prompt_message = "[deine Nachricht hier]"
```

:::

#### `force`: Boolean

Ob der Client gezwungen wird, das Ressourcenpaket zu laden. Lehnt der Client ab, wird er vom Server getrennt.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
force = false
```

:::

## Standardkonfiguration

Standardmäßig wird kein Ressourcenpaket an Clients gesendet.

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
