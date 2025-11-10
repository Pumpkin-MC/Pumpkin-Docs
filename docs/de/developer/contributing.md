# Beitrag leisten zu Pumpkin

Vielen Dank für dein Interesse, zu Pumpkin beizutragen! Dieses Dokument beschreibt Richtlinien für Bugreports, Feature‑Vorschläge und Code‑Beiträge.

## Erste Schritte

Am einfachsten startest du, indem du Hilfe auf unserem [Discord‑Server](https://discord.gg/wT8XjrjKkf) erfragst.

## Wie kann ich beitragen?

Es gibt mehrere Möglichkeiten, zu Pumpkin beizutragen:

### Bugs melden

Wenn du einen Bug findest, suche zuerst im Issue‑Tracker nach bestehenden Issues.

Falls du kein Duplikat findest, eröffne ein neues Issue.

Folge der Vorlage und beschreibe den Bug klar, inklusive Schritten zur Reproduktion. Screenshots, Logs oder Code‑Snippets helfen ebenfalls.

### Features vorschlagen

Hast du eine Idee, wie Pumpkin besser werden kann? Teile sie, indem du ein Issue im Issue‑Tracker eröffnest.

Beschreibe die vorgeschlagene Funktion im Detail, inklusive Nutzen und möglicher Implementierungsaspekte.

### Code beitragen

Um Code beizutragen, forke das Repository auf GitHub.

1. Erstelle zuerst einen GitHub‑Account, falls nicht vorhanden.
2. Gehe zur offiziellen [GitHub‑Organisation von Pumpkin](https://github.com/Pumpkin-MC) und klicke auf Fork.

> Ein Fork bedeutet, dass du nun eine eigene Kopie des Pumpkin‑Quellcodes hast (du erwirbst dadurch nicht das Urheberrecht).

Nun brauchst du einige Tools:
3. Installiere [git](https://git-scm.com/downloads) für dein Betriebssystem.
   - Einstieg in Git: [Getting started with Git](https://docs.github.com/en/get-started/getting-started-with-git)
   - Optional: Für eine grafische Oberfläche zu GitHub, installiere [GitHub Desktop](https://desktop.github.com/download/)
     > GitHub Desktop kann für Einsteiger leichter sein, ist aber nicht für jeden geeignet.
   - Einstieg in GitHub Desktop: [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)

- Wenn du Code beitragen willst, installiere Rust: [rust-lang.org](https://www.rust-lang.org/)
- Wenn du zur Doku beitragen willst, installiere [NodeJS](https://nodejs.org/en)

### Minecraft dekompilieren

In der Entwicklung von Pumpkin beziehen wir uns oft auf den offiziellen Minecraft‑Client und bestehende Serverlogik. Wir schauen häufig in den offiziellen Code.
Am einfachsten dekompilierst du Minecraft mit Fabric Yarn. Stelle sicher, dass Gradle installiert ist, bevor du folgende Befehle ausführst:

```shell
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

Nach dem Dekompilieren findest du den Sourcecode unter `build/namedSrc`.

### Weitere Hinweise

Wir freuen uns über Kommentare zu bestehenden Issues und Pull Requests.

Stelle Fragen gern im Issue‑Tracker oder kontaktiere die Maintainer, wenn du Unterstützung brauchst.

Bevor du einen großen Beitrag einsendest, eröffne ggf. ein Issue oder eine Diskussion oder sprich mit uns auf Discord über deinen Ansatz.
