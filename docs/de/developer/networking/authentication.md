# Authentifizierung

## Warum Authentifizierung?

Offline‑Accounts (Accounts, die nur aus dem Spielernamen generiert werden, ohne einen Auth‑Server zu kontaktieren) können beliebige Spitznamen nutzen. Ohne zusätzliche Plugins können sich Spieler als andere ausgeben – auch als Operatoren.

## Offline‑Server

Standardmäßig ist `online_mode` in der Konfiguration aktiviert. Das schaltet Authentifizierung ein und verhindert Offline‑Accounts. Um Offline‑Accounts zu erlauben, setze `online_mode` in `configuration.toml` auf `false`.

## Wie Yggdrasil Auth funktioniert

1. Der Client erhält Token und UUID vom Launcher.
2. Beim Laden ruft der Client mit dem Token Daten wie Signier‑Schlüssel und gesperrte Server vom Auth‑Server ab.
3. Beim Join sendet der Client eine Join‑Anfrage an den Auth‑Server. Mojangs Server können sie ablehnen, falls der Account gebannt ist.
4. Der Client sendet Identifikationsdaten im Paket an den Server.
5. Der Server stellt basierend darauf eine `hasJoined`‑Anfrage. Bei Erfolg erhält er Profildaten (Skin etc.).

## Eigener Authentifizierungsserver

Pumpkin unterstützt eigene Auth‑Server. Die Auth‑URL kann in `features.toml` ersetzt werden.

### Pumpkin Auth Ablauf

1. **GET Request:** Pumpkin sendet einen GET Request an die konfigurierte URL.
2. **Status 200:** Erfolgreiche Auth gibt Statuscode 200 zurück.
3. **JSON Game Profile:** Pumpkin parst das zurückgegebene JSON.

### Game Profile

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // Optional, falls Aktionen vorliegen
}
```

#### Property

```rust
struct Property {
    name: String,
    value: String, // Base64 kodiert
    signature: Option<String>, // Optional, Base64 kodiert
}
```

#### Profile Action

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```
