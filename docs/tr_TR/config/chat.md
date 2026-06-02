# Sohbet

Pumpkin, sohbet mesajlarının biçimini özelleştirmenize olanak tanır.

## Sohbet Yapılandırma

#### `format`: Dize

Sohbet mesajları için biçim. `{DISPLAYNAME}` ve `{MESSAGE}` gibi yer tutucuları destekler.

:::code-group

```toml [pumpkin.toml] {2}
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::

### Kullanılabilir yer tutucular

| Yer tutucu        | Açıklama                       |
| ----------------- | ------------------------------ |
| `{DISPLAYNAME}`   | Oyuncunun görünen adı          |
| `{MESSAGE}`       | Sohbet mesajının içeriği       |

## Varsayılan yapılandırma

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::
