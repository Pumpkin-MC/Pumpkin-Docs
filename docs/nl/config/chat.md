# Chat & Anti-Spam

Pumpkin biedt aanpasbare in-game chatformattering en ingebouwde anti-spambescherming onder `[chat]` in `pumpkin.toml`.

## Configuratie

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"

[chat.anti_spam]
enabled = true
spam_threshold = 200
message_cost = 20
decay_per_tick = 1
ops_bypass = true
```

:::

### Chatinstellingen

- **`format`**: De formaatstring voor chatberichten (standaard: `"<{DISPLAYNAME}> {MESSAGE}"`).
  - `{DISPLAYNAME}`: Weergavenaam van de speler.
  - `{MESSAGE}`: Tekst van het chatbericht.
  > [!NOTE]
  > Aangepaste chatformattering is niet van toepassing wanneer beveiligde chatrapportage (`allow_chat_reports = true`) is ingeschakeld.

### Anti-spambescherming

Pumpkin implementeert een leaky-bucket-spamteller om de server te beschermen tegen spammende spelers en bot-aanvallen:

- **`enabled`**: Of anti-spambescherming actief is (standaard: `true`).
- **`spam_threshold`**: De drempelwaarde van de spamteller in ticks waarbij een speler wordt gekickt (standaard: `200` ticks).
- **`message_cost`**: De hoeveelheid die wordt toegevoegd aan de spamteller van de speler voor elk verzonden chatbericht of commando (standaard: `20` ticks).
- **`decay_per_tick`**: De hoeveelheid die bij elke servertick van de spamteller van de speler wordt afgetrokken (standaard: `1` tick).
- **`ops_bypass`**: Of serveroperators de anti-spamcontroles omzeilen (standaard: `true`).
