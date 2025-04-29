# Pacote de Recursos

Servidores podem enviar pacotes de recursos para os clientes a fim de alterar a aparência do jogo no cliente. Pumpkin permite que você configure completamente o pacote de recursos.

> [!TIP] DICA
> Minifique seu pacote de recursos usando o [PackSquash](https://packsquash.aylas.org/)! Isso pode ajudar os clientes a baixar o pacote de recursos mais rápido.

## Configurando o Pacote de Recursos

#### `enabled`: Booleano

Se o pacote de recursos está habilitado ou não.

:::code-group

```toml [features.toml] {2}
[resource_pack]
enabled = true
```

:::

#### `resource_pack_url`: String

A URL direta de download do pacote de recursos.

> [!TIP] DICA
> Você pode hospedar o pacote de recursos gratuitamente no [MCPacks](https://mc-packs.net/).

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_url = "[sua URL de download aqui]"
```

:::

#### `resource_pack_sha1`: String

O hash SHA1 do pacote de recursos.

> [!IMPORTANT] IMPORTANTE
> Embora não seja necessário especificar, você deve informar este campo porque, caso contrário, o cliente fará o download do pacote de recursos toda vez que entrar no servidor, mesmo que não haja alterações no pacote.

> [!WARNING] AVISO
> Certifique-se de atualizar este campo se o pacote de recursos for modificado.

::: detalhes Como obter o hash SHA1 do meu pacote de recursos?
::: code-group

```powershell [Windows (PowerShell)]
Get-FileHash [arquivo] SHA1
```

```shell [Mac OS]
shasum -a 1 [arquivo]
```

```shell [Linux]
sha1sum [arquivo]
```

:::

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_sha1 = "[seu hash aqui]"
```

:::

#### `prompt_message`: String

A mensagem a ser exibida para o usuário quando for solicitado o download do pacote de recursos.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
prompt_message = "[sua mensagem aqui]"
```

:::

#### `force`: Booleano

Se deve forçar o cliente a baixar o pacote de recursos ou não. Se o cliente recusar o download, ele será expulso do servidor.

:::code-group

```toml [features.toml] {3}
[resource_pack]
enabled = true
force = false
```

:::

## Configuração Padrão

Por padrão, nenhum pacote de recursos é enviado para os clientes.

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
