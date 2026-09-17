# Bedrock & NetherNet

Pumpkin bietet native Unterstützung für Minecraft Bedrock Edition-Clients, einschließlich des NetherNet-WebRTC/ICE-Transports und Anpassungen für Benutzernamen.

## Konfiguration

:::code-group

```toml [pumpkin.toml]
[networking.bedrock]
enabled = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"
username_prefix = ""
replace_username_spaces = true
chunk_caching = true

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
identity_key = "nethernet-key.der"
stun_servers = []
```

:::

### Bedrock-Optionen

- **`enabled`**: Gibt an, ob Verbindungen von Bedrock-Edition-Clients akzeptiert werden (Standard: `true`).
- **`online_mode`**: Gibt an, ob die Xbox-Live-Authentifizierung für Bedrock-Spieler erzwungen wird (Standard: `true`).
- **`max_players`**: Maximale Anzahl gleichzeitiger Bedrock-Spieler (`0` deaktiviert das Limit, Standard: `1000`).
- **`view_distance`**: Maximale Chunk-Sichtweite, die an Bedrock-Clients gesendet wird (Standard: `16`).
- **`simulation_distance`**: Maximale Tick-Simulationsdistanz für Bedrock-Spieler (Standard: `10`).
- **`motd`**: „Message of the Day“, die in der Bedrock-Serverliste angezeigt wird.
- **`username_prefix`**: Optionales Präfix, das Bedrock-Spieler-Gamertags vorangestellt wird (z. B. `"."` oder `"*"`), um Namenskollisionen mit Java-Edition-Accounts auf Crossplay-Servern zu verhindern (Standard: `""`).
- **`replace_username_spaces`**: Gibt an, ob Leerzeichen in Bedrock-Gamertags automatisch durch Unterstriche `_` ersetzt werden, damit Spielernamen in Minecraft-Befehlen verwendet werden können (Standard: `true`).
- **`chunk_caching`**: Gibt an, ob clientseitiges Chunk-Blob-Caching aktiviert ist, um Netzwerkbandbreite zu sparen (Standard: `true`).

### NetherNet-Transporteinstellungen

NetherNet ist der moderne WebRTC/ICE-Netzwerktransport von Minecraft Bedrock:

- **`enabled`**: Gibt an, ob sich Clients über NetherNet verbinden dürfen (Standard: `true`).
- **`address`**: Netzwerk-Socket-Adresse für TCP-Signalisierung und UDP-ICE-Multiplexing (Standard: `"0.0.0.0:19132"`).
- **`external_ip`**: Optionale öffentliche IP-Adresse, die angekündigt wird, wenn der Server hinter NAT betrieben wird.
- **`identity_key`**: Dateipfad zur privaten PKCS#8-P-384-Identitätsschlüsseldatei, die über Server-Neustarts hinweg für Trust On First Use (TOFU) des Clients erhalten bleibt (Standard: `"nethernet-key.der"`).
- **`stun_servers`**: Optionale Liste von STUN-Server-URLs für das ICE-NAT-Traversal.
