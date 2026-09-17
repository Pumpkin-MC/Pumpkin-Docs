# Server-Links

Minecraft-Clients können (seit Version 1.21) anklickbare Server-Links im Pausenmenü und in den Spielmenüs anzeigen. Standardmäßige und benutzerdefinierte Server-Links werden unter `[server_links]` in `pumpkin.toml` konfiguriert.

## Konfiguration

:::code-group

```toml [pumpkin.toml]
[server_links]
enabled = true
bug_report = "https://github.com/Pumpkin-MC/Pumpkin/issues"
support = ""
status = ""
feedback = ""
community = ""
website = ""
forums = ""
news = ""
announcements = ""

[server_links.custom]
# "Store" = "https://store.example.com"
# "Discord" = "https://discord.gg/example"
```

:::

### Konfigurationsoptionen

- **`enabled`**: Hauptschalter zum Aktivieren der Übertragung von Server-Links an sich verbindende Clients (Standard: `true`).
- **`bug_report`**: Link zum Bug-Tracker des Servers oder Projekts (Standard: `"https://github.com/Pumpkin-MC/Pumpkin/issues"`).
- **`support`**: Link zum technischen Support oder Helpdesk.
- **`status`**: Link zur Server-Uptime- oder Statusseite.
- **`feedback`**: Link zu einer Seite für Spieler-Feedback oder Vorschläge.
- **`community`**: Link zu Community-Foren oder -Gruppen.
- **`website`**: Link zur offiziellen Webseite.
- **`forums`**: Link zu Diskussionsforen.
- **`news`**: Link zum Server-Blog oder zur News-Seite.
- **`announcements`**: Link zur Ankündigungsseite.

### Benutzerdefinierte Links

Beliebige Key-Value-Links, die in den Client-Menüs angezeigt werden, können unter `[server_links.custom]` definiert werden:

```toml
[server_links.custom]
"Store" = "https://store.example.com"
"Discord" = "https://discord.gg/example"
```
