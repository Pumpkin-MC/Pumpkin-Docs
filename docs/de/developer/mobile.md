# Entwicklung auf dem Handy

Auch auf dem Smartphone kannst du am Pumpkin‑Quellcode arbeiten (diese Seite wurde auf Android mit Helix geschrieben).

Wir benötigen zunächst eine Terminal‑App. Wir empfehlen [Termux](https://github.com/termux/termux-app/releases) – stabil und Open Source. Lade die passende APK für deine Architektur und installiere Termux.

Danach folgende Pakete installieren (wir nutzen Helix wegen der Einfachheit):

```bash
pkg update && pkg upgrade
pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

Für Beiträge an Pumpkin installiere zusätzlich die GitHub‑CLI:

```bash
pkg install gh
```

Optional empfehlen wir die fish‑Shell, da sie nutzerfreundlicher ist als bash:

```bash
pkg install fish
chsh -s fish
```

Melde dich für Beiträge bei GitHub an:

```bash
gh auth login
```

Richte git ein (Editor, Credentials, etc.).

Klone anschließend das Pumpkin‑Repo (ggf. vorher `mkdir proj` anlegen):

```bash
git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

Für Beiträge forke das Repo und ersetze `Pumpkin-MC` durch deinen GitHub‑Nutzernamen.

Fertig mit dem Setup – viel Spaß :)

## FAQ

### Wie nutze ich den Editor?

`hx <pfad>`

### Navigation durchs Projekt?

Mit `ls`, `cd`, etc. Oder `hx <dir>` zum Browsen.

### Wie tippe ich im Editor?

`i` in den Insert‑Modus.

### WIE KOMME ICH HIER RAUS???

ESC, dann `:q!` ohne Speichern oder `:wq` mit Speichern.

### Wo lerne ich den Editor?

`hx --tutor` oder die offizielle Website.

### Warum nicht VS Code?

1) Aufwändigeres Setup, im Web eingeschränkt.
2) rust‑analyzer funktioniert dort mobil oft nicht.
3) VS Code ist mit Maus angenehmer; Helix braucht nur die Tastatur.
4) VS Code kann auf manchen Geräten laggen.

### Tippen ist mühsam!

Eine günstige Bluetooth‑Tastatur erleichtert vieles.
