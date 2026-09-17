# Administrationsübersicht

Willkommen im **Admin-Bereich** für Pumpkin-Serveradministratoren. Pumpkin ist ein hochperformanter, multithreaded Minecraft-Server, der in Rust geschrieben wurde und darauf ausgelegt ist, riesige Spielerzahlen bei minimalem Ressourcenverbrauch zu unterstützen.

---

## Hauptfunktionen für Server-Admins

- **Extremes Multithreading**: Von Grund auf für moderne Mehrkernprozessoren entwickelt.
- **WASM-Plugin-Architektur**: Sichere, isolierte (sandboxed) Plugin-Ausführung in Rust, Python, Kotlin, C#, Go oder C ohne JVM-Overhead.
- **Nativer Cross-Proxy-Support**: Standardmäßige Unterstützung für Velocity, BungeeCord und moderne Proxy-Weiterleitungen.
- **TOML-basierte Konfiguration**: Übersichtliche, menschenlesbare Konfigurationsdateien in `pumpkin.toml` und funktionsspezifischen TOML-Konfigurationen.

---

## Admin-Leitfäden & Themen

Entdecke die folgenden Administrationsleitfäden:

- [Migration von Bukkit- / Paper- / Spigot-Servern](./migrating-from-bukkit) — Wesentliche Unterschiede in der Serveradministration, bei Plugins, Weltspeicherung und Performance.
- [Serverkonfiguration](../config/introduction) — Detaillierte Übersicht über die Einstellungen in `pumpkin.toml`.
- [Proxy-Einrichtung](../config/proxy) — Konfiguration der Weiterleitung für BungeeCord & Velocity.
- [Befehle & Berechtigungen](../config/commands) — Verwalten von In-Game-Operator-Befehlen und Berechtigungen.
- [Authentifizierung](../config/authentication) — Online-Modus vs. Offline-Modus und Yggdrasil-Einstellungen.
- [Fehlerbehebung & Häufige Probleme](../troubleshooting/common_issues) — Behebung von Port-Bindungs-, Speicher- und Plugin-Ladefehlern.
