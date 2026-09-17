# Plugins

Pumpkin bietet eine WebAssembly (WASM)-Plugin-Laufzeitumgebung mit fähigkeitenbasierter Sicherheit (Capability-based Security). Das Verhalten von Plugins, Signaturverifizierung und Berechtigungen werden unter `[plugins]` in `pumpkin.toml` konfiguriert.

## Konfiguration

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

# Optional per-plugin overrides
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

### Globale Plugin-Einstellungen

- **`enabled`**: Hauptschalter zum Aktivieren oder Deaktivieren der Plugin-Laufzeitumgebung (Standard: `true`).
- **`hot_reload`**: Überwacht das `plugins/`-Verzeichnis und lädt geänderte Plugins zur Laufzeit automatisch neu (Standard: `false`).
- **`ask_permission_confirmation`**: Fragt in der Serverkonsole nach Bestätigung, wenn ein Plugin nicht vorab genehmigte Berechtigungen anfordert (Standard: `true`).
- **`allow_unsigned`**: Erlaubt das Laden von unsignierten WASM-Plugins (Standard: `true`).
- **`allowed_permissions`**: Liste von Berechtigungen, die global für alle Plugins vorab genehmigt sind, wodurch interaktive Konsolenabfragen übersprungen werden (Standard: `[]`).
- **`blocked_permissions`**: Liste von Berechtigungen, die für alle Plugins global verweigert werden (Standard: `[]`).
- **`inherit_env`**: Gibt an, ob Umgebungsvariablen des Hosts standardmäßig in die WASI-Sandboxen der Plugins vererbt werden (Standard: `false`).
- **`loopback_only`**: Gibt an, ob ausgehende Netzwerkverbindungen von Plugins auf `127.0.0.1` / localhost beschränkt sind (Standard: `false`).
- **`max_memory_mb`**: (Optional) Globales maximales Speicherlimit in Megabyte (MB) pro Plugin-Instanz.
- **`verify_signatures`**: Gibt an, ob Pumpkin kryptografische Signaturen von WASM-Plugins vor dem Laden überprüft (Standard: `true`).

### Plugin-spezifische Überschreibungen

Berechtigungen und Umgebungsvariablen für bestimmte Plugins können unter `[plugins.overrides.<plugin_name>]` fein abgestimmt werden:

- **`enabled`**: Aktiviert oder deaktiviert dieses spezifische Plugin (Standard: `true`).
- **`allow_unsigned`**: Überschreibt, ob dieses spezifische Plugin unsigniert ausgeführt werden darf (`true`/`false`).
- **`max_memory_mb`**: Maximales Speicherlimit in MB, das speziell für dieses Plugin zugewiesen wird.
- **`allowed_permissions`**: Vorab genehmigte Berechtigungen für dieses Plugin.
- **`blocked_permissions`**: Explizit blockierte Berechtigungen für dieses Plugin.
- **`loopback_only`**: Überschreibt die Loopback-Netzwerkbeschränkung für dieses Plugin.
- **`environment`**: Tabelle benutzerdefinierter Umgebungsvariablen, die direkt an die WASI-Umgebung des Plugins übergeben werden.
