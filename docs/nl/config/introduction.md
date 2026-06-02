# Configuratie

Pumpkin biedt een robuust configuratiesysteem waarmee je verschillende aspecten van het servergedrag kunt aanpassen zonder externe plugins. Dit biedt flexibiliteit en controle over de werking van de server.

## Configuratiebestand

Pumpkin gebruikt één enkel configuratiebestand:

- `pumpkin.toml`: het hoofdconfiguratiebestand met alle serverinstellingen, van basisnetwerkconfiguratie tot geavanceerde functies

Wanneer Pumpkin voor het eerst start, wordt `pumpkin.toml` gegenereerd met standaardwaarden in de werkmap. Je kunt het bestand voor of na de eerste start bewerken. Ontbrekende velden worden automatisch aangevuld met standaardwaarden bij het opstarten.

## Structuur

De configuratie is georganiseerd in secties:

- **Top-level velden**: kerninstellingen zoals editie-ondersteuning, adressen, seed, spelerlimieten, moeilijkheidsgraad en spelregels
- **`[logging]`**: log-uitvoer en opmaak
- **`[resource_pack]`**: resourcepacks voor Java en Bedrock
- **`[world]`**: wereldgeneratie, chunk-opslag, verlichting en automatisch opslaan
- **`[networking]`**: authenticatie, compressie, proxy, query, RCON en LAN-broadcast
- **`[commands]`**: opdrachtsysteem
- **`[chat]`**: chatberichtopmaak
- **`[pvp]`**: PvP-regels en -mechanica
- **`[server_links]`**: links die aan clients worden getoond
- **`[player_data]`**: opslag van spelersgegevens
- **`[fun]`**: experimentele functies
- **`[recipe]`**: receptenboek-configuratie
- **`[plugins]`**: plugin-rechtigheidsinstellingen

## Serverversie

Pumpkin richt zich op ondersteuning voor de nieuwste Minecraft-versie. Als je een Pumpkin-server voor een andere versie wilt hosten, kun je [ViaProxy](https://github.com/ViaVersion/ViaProxy) gebruiken.

- Zorg ervoor dat proxyverbindingen zijn toegestaan.
- Pumpkin en ViaProxy hebben geen onderlinge verbinding; dien geen issues in met betrekking tot hun code. Dit is een proxy van een derde partij en Pumpkin neemt geen verantwoordelijkheid voor de voor- of nadelen ervan.

### Belangrijkste functies

- Uitgebreide aanpassing: Serverinstellingen, spelersgedrag, wereldgeneratie en meer configureren.
- Prestatie-optimalisatie: Serverprestaties optimaliseren via configuratie-aanpassingen.
- Plugin-vrije aanpassing: Gewenste wijzigingen bereiken zonder extra plugins.
