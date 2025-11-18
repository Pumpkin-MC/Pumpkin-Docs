# Häufige Probleme

1. ## Failed to verify username

    **Problem:** Einige Spieler berichten von Problemen beim Login, darunter der Fehler „Failed to verify username“.

    **Ursache:** Das hängt mit der Authentifizierung zusammen, häufig mit der Einstellung `prevent_proxy_connections`.

    **Lösung:** Deaktiviere `prevent_proxy_connections` in `features.toml`.
