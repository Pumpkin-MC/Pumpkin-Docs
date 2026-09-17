# Häufige Probleme

1. ## Failed to verify username

    **Problem:** Einige Spieler berichten von Problemen beim Login, darunter der Fehler „Failed to verify username“.

    **Ursache:** Das hängt mit der Authentifizierung zusammen, häufig mit der Einstellung `prevent_proxy_connections`.

    **Lösung:** Deaktiviere `prevent_proxy_connections` in `pumpkin.toml`.

2. ## Verbindung über 0.0.0.0 schlägt fehl

    **Problem:** Spieler, die dem Server auf demselben PC beitreten möchten, können keine Verbindung herstellen (z. B. Fehler „Connection refused“), wenn sie `0.0.0.0` oder `0.0.0.0:25565` eingeben.

    **Ursache:** In `pumpkin.toml` weist `0.0.0.0` den Server an, auf allen lokalen Netzwerkschnittstellen zu lauschen. Es ist eine Bind-Adresse für den Server, aber keine gültige Zieladresse für den Minecraft-Client.

    **Lösung:**
    - Wenn du vom **selben PC** aus beitrittst, verwende `localhost` oder `127.0.0.1`.
    - Wenn du von einem **anderen Gerät im selben lokalen Netzwerk (LAN)** aus beitrittst, verwende die lokale IP-Adresse des Host-PCs (z. B. `192.168.x.x`).
    - Wenn Spieler über das **Internet** beitreten sollen, müssen sie deine öffentliche IP-Adresse oder Domain verwenden (mit entsprechender Portweiterleitung im Router).
