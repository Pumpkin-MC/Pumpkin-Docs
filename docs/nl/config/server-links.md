# Serverlinks

Minecraft-clients (sinds 1.21) kunnen aanklikbare serverlinks weergeven in het pauzemenu en de spelmenu's. Configureer standaard en aangepaste serverlinks onder `[server_links]` in `pumpkin.toml`.

## Configuratie

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

### Configuratie-opties

- **`enabled`**: Hoofdschakelaar om het uitzenden van serverlinks naar verbindende clients in te schakelen (standaard: `true`).
- **`bug_report`**: Link naar bugtracker van de server of het project (standaard: `"https://github.com/Pumpkin-MC/Pumpkin/issues"`).
- **`support`**: Link naar technische ondersteuning of helpdesk.
- **`status`**: Link naar uptime-/statuspagina van de server.
- **`feedback`**: Link naar feedback- of suggestiepagina voor spelers.
- **`community`**: Link naar communityforums of -groep.
- **`website`**: Link naar officiële website.
- **`forums`**: Link naar discussieforums.
- **`news`**: Link naar serverblog of nieuwspagina.
- **`announcements`**: Link naar aankondigingenpagina.

### Aangepaste links

Definieer willekeurige sleutel-waardelinks die in clientmenu's worden getoond onder `[server_links.custom]`:

```toml
[server_links.custom]
"Store" = "https://store.example.com"
"Discord" = "https://discord.gg/example"
```
