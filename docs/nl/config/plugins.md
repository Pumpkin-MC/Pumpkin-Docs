# Plugins

Pumpkin biedt een WebAssembly (WASM) plugin-runtime met beveiliging op basis van capabilities. Plugingedrag, handtekeningverificatie en permissies worden geconfigureerd onder `[plugins]` in `pumpkin.toml`.

## Configuratie

:::code-group

```toml [pumpkin.toml]
[plugins]
enabled = true
hot_reload = false
ask_permission_confirmation = true
allow_unsigned = true
allowed_permissions = []
blocked_permissions = []
inherit_env = false
loopback_only = false
verify_signatures = true

# Optionele overschrijvingen per plugin
[plugins.overrides.my_plugin]
enabled = true
allow_unsigned = true
max_memory_mb = 128
allowed_permissions = ["fs:read:data"]
blocked_permissions = ["network:outbound"]
loopback_only = true

[plugins.overrides.my_plugin.environment]
API_KEY = "example_secret"
```

:::

### Globale plugininstellingen

- **`enabled`**: Hoofdschakelaar om de plugin-runtime in of uit te schakelen (standaard: `true`).
- **`hot_reload`**: De map `plugins/` in de gaten houden en gewijzigde plugins automatisch herladen tijdens runtime (standaard: `false`).
- **`ask_permission_confirmation`**: Een bevestiging vragen in de serverconsole wanneer een plugin niet-goedgekeurde capabilities/permissies aanvraagt (standaard: `true`).
- **`allow_unsigned`**: Het laden van niet-ondertekende WASM-plugins toestaan (standaard: `true`).
- **`allowed_permissions`**: Lijst met permissies die globaal vooraf zijn goedgekeurd voor alle plugins, waardoor interactieve consolevragen worden overgeslagen (standaard: `[]`).
- **`blocked_permissions`**: Lijst met permissies die globaal worden geweigerd voor alle plugins (standaard: `[]`).
- **`inherit_env`**: Of omgevingsvariabelen van de host standaard worden overgenomen in WASI-sandboxes van plugins (standaard: `false`).
- **`loopback_only`**: Of uitgaande netwerkverbindingen van plugins worden beperkt tot `127.0.0.1` / localhost (standaard: `false`).
- **`max_memory_mb`**: (Optioneel) Globale maximale geheugenlimiet in megabytes (MB) per plugin-instantie.
- **`verify_signatures`**: Of Pumpkin cryptografische handtekeningen op WASM-plugins verifieert vóór het laden (standaard: `true`).

### Overschrijvingen per plugin

Stem permissies en omgevingsvariabelen voor specifieke plugins nauwkeurig af onder `[plugins.overrides.<plugin_name>]`:

- **`enabled`**: Schakel deze specifieke plugin in of uit (standaard: `true`).
- **`allow_unsigned`**: Overschrijf of deze specifieke plugin niet-ondertekend mag draaien (`true`/`false`).
- **`max_memory_mb`**: Maximale geheugenlimiet in MB die specifiek voor deze plugin is toegewezen.
- **`allowed_permissions`**: Vooraf goedgekeurde permissies voor deze plugin.
- **`blocked_permissions`**: Expliciet geblokkeerde permissies voor deze plugin.
- **`loopback_only`**: Overschrijf de loopback-netwerkbeperking voor deze plugin.
- **`environment`**: Tabel met aangepaste omgevingsvariabelen die rechtstreeks worden doorgegeven aan de WASI-omgeving van de plugin.
