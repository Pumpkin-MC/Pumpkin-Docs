# Chat

Pumpkin staat toe om het formaat van chatberichten aan te passen.

## Chat configureren

#### `format`: Tekenreeks

Het formaat voor chatberichten. Ondersteunt plaatshouders zoals `{DISPLAYNAME}` en `{MESSAGE}`.

:::code-group

```toml [pumpkin.toml] {2}
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::

### Beschikbare plaatshouders

| Plaatshouder      | Beschrijving                  |
| ----------------- | ----------------------------- |
| `{DISPLAYNAME}`   | De weergavenaam van de speler |
| `{MESSAGE}`       | De inhoud van het chatbericht |

## Standaardconfiguratie

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::
