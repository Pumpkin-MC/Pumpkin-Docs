# Konfiguration

Pumpkin bietet ein robustes Konfigurationssystem, mit dem Sie verschiedene Aspekte des Serververhaltens ohne externe Plugins anpassen können. Dies ermöglicht Flexibilität und Kontrolle über den Serverbetrieb.

## Konfigurationsdatei

Pumpkin verwendet eine einzige Konfigurationsdatei:

- `pumpkin.toml`: Die Hauptkonfigurationsdatei mit allen Servereinstellungen, von grundlegender Netzwerkkonfiguration bis hin zu erweiterten Funktionen

Beim ersten Start von Pumpkin wird `pumpkin.toml` mit Standardwerten im Arbeitsverzeichnis erstellt. Sie können die Datei vor oder nach dem ersten Start bearbeiten. Fehlende Felder werden beim Start automatisch mit Standardwerten ergänzt.

## Struktur

Die Konfiguration ist in Bereiche unterteilt:

- **Top-Level-Felder**: Kerneinstellungen wie Edition-Unterstützung, Adressen, Seed, Spielerlimits, Schwierigkeitsgrad und Spielregeln
- **`[logging]`**: Log-Ausgabe und -Formatierung
- **`[resource_pack]`**: Ressourcenpakete für Java und Bedrock
- **`[world]`**: Weltgenerierung, Chunk-Speicherung, Beleuchtung und Autosave
- **`[networking]`**: Authentifizierung, Komprimierung, Proxy, Query, RCON und LAN-Broadcast
- **`[commands]`**: Befehlssystem
- **`[chat]`**: Chat-Nachrichtenformatierung
- **`[pvp]`**: PvP-Regeln und -Mechaniken
- **`[server_links]`**: Links, die Clients angezeigt werden
- **`[player_data]`**: Speicherung von Spielerdaten
- **`[fun]`**: Experimentelle Funktionen
- **`[recipe]`**: Rezeptbuch-Konfiguration
- **`[plugins]`**: Plugin-Berechtigungseinstellungen

## Serverversion

Pumpkin unterstützt die neueste Minecraft-Version. Wenn Sie einen Pumpkin-Server für eine andere Version hosten möchten, können Sie [ViaProxy](https://github.com/ViaVersion/ViaProxy) verwenden.

- Stellen Sie sicher, dass Proxy-Verbindungen erlaubt sind.
- Pumpkin und ViaProxy stehen in keiner Verbindung; melden Sie keine Issues bezüglich des ViaProxy-Codes. Dies ist eine Drittanbieter-Proxy-Lösung, für die Pumpkin keine Verantwortung übernimmt.

### Schlüsselfunktionen

- Umfangreiche Anpassung: Servereinstellungen, Spielerverhalten, Weltgenerierung und mehr konfigurieren.
- Performance-Optimierung: Serverleistung durch Konfigurationsanpassungen verbessern.
- Plugin-freie Anpassung: Gewünschte Änderungen ohne zusätzliche Plugins erreichen.
