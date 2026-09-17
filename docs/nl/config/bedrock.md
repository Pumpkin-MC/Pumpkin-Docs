# Bedrock & NetherNet

Pumpkin bevat ingebouwde ondersteuning voor Minecraft Bedrock Edition-clients, inclusief NetherNet WebRTC/ICE-transport en aanpasbare gebruikersnamen.

## Configuratie

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

### Bedrock-opties

- **`enabled`**: Of verbindingen van Bedrock Edition-clients worden geaccepteerd (standaard: `true`).
- **`online_mode`**: Of Xbox Live-authenticatie wordt afgedwongen voor Bedrock-spelers (standaard: `true`).
- **`max_players`**: Maximaal aantal gelijktijdige Bedrock-spelers (`0` schakelt de limiet uit, standaard: `1000`).
- **`view_distance`**: Maximale chunk-zichtafstand die naar Bedrock-clients wordt verzonden (standaard: `16`).
- **`simulation_distance`**: Maximale tick-simulatieafstand voor Bedrock-spelers (standaard: `10`).
- **`motd`**: Message of the Day weergegeven in de Bedrock-serverlijst.
- **`username_prefix`**: Optioneel voorvoegsel dat vóór Bedrock-gamertags wordt geplaatst (bijv. `"."` of `"*"`), om naamconflicten met Java Edition-accounts op cross-play-servers te voorkomen (standaard: `""`).
- **`replace_username_spaces`**: Of spaties in Bedrock-gamertags automatisch worden vervangen door underscores `_`, zodat spelersnamen kunnen worden gebruikt in Minecraft-slashcommando's (standaard: `true`).
- **`chunk_caching`**: Of chunk-blob-caching aan de clientzijde is ingeschakeld om netwerkbandbreedte te besparen (standaard: `true`).

### NetherNet-transportinstellingen

NetherNet is het moderne WebRTC/ICE-netwerktransport van Minecraft Bedrock:

- **`enabled`**: Of clients verbinding mogen maken via NetherNet (standaard: `true`).
- **`address`**: Netwerksocketadres voor TCP-signalering en UDP-ICE-multiplexing (standaard: `"0.0.0.0:19132"`).
- **`external_ip`**: Optioneel openbaar IP-adres dat wordt geadverteerd wanneer de server achter NAT wordt gehost.
- **`identity_key`**: Bestandspad naar het PKCS#8 P-384 privésleutelbestand voor identiteit, behouden tussen herstarts voor Trust On First Use (TOFU) van de client (standaard: `"nethernet-key.der"`).
- **`stun_servers`**: Optionele lijst van STUN-server-URL's voor ICE-NAT-traversal.
