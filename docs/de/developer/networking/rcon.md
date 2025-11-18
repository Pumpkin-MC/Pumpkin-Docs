# RCON (Remote Console)

## Was ist RCON?

RCON ist ein von Valve entworfenes Protokoll zur Remote‑Verwaltung von Gameservern. Es erlaubt das Ausführen von Befehlen von einem anderen Gerät (z. B. Smartphone oder separater Rechner).

## Warum RCON?

- **Bequemlichkeit:** Verwaltung von überall mit Internetzugang.
- **Flexibilität:** Befehle ohne direkte Serverzugriffsstelle ausführen.
- **Effizienz:** Aufgaben automatisieren und Management vereinfachen.

## SSH vs RCON

### SSH

- Bietet starke Verschlüsselung zum Schutz der zwischen Client und Server übertragenen Daten.
- Primär für die sichere Anmeldung und Ausführung von Befehlen auf einem entfernten Rechner konzipiert.
- Wird häufig zur Verwaltung von Linux/Unix-Systemen, zur Netzwerkkonfiguration und zum Ausführen von Skripten verwendet.
- Bietet eine Shell-ähnliche Umgebung, die die Ausführung verschiedener Befehle und die Interaktion mit dem entfernten System ermöglicht.

### RCON

- Speziell für die Fernadministration von Spielservern entwickelt, ermöglicht es Ihnen, die Servereinstellungen und -vorgänge zu steuern und zu verwalten.
- In der Regel weniger sicher als SSH, da es häufig auf Klartextpasswörtern basiert.
- Wird hauptsächlich von Spielserver-Administratoren zur Verwaltung von Spielservern verwendet.
- Verfügt über eine begrenzte Anzahl spielspezifischer Befehle.

### Pakete

RCON ist sehr simpel:

| Feld | Beschreibung |
| ---- | ------------ |
| ID   | Zeigt Erfolg oder Fehlschlag der Authentifizierung |
| Type | Pakettyp |
| Body | Nachricht (String) – Befehl oder Passwort |

#### Serverbound (Client→Server)
| Type | Paket.      |
| ---- | ----------- |
| 2    | Auth.       |
| 3    | ExecCommand |

#### Clientbound (Server→Client)
| Type | Paket        |
| ---- | ------------ |
| 2    | AuthResponse |
| 0    | Output       |

### Ablauf

1. **Authentifizierung:**

    - Der RCON-Client sendet ein Authentifizierungspaket mit dem gewünschten Passwort.
    - Der Server überprüft das Passwort und antwortet mit einem Authentifizierungsantwortpaket.
    - Bei erfolgreicher Authentifizierung enthält das Antwortpaket dieselbe ID wie das vom Client gesendete. Andernfalls ist die ID -1.

2. **Befehlsausführung:**

    - Der authentifizierte Client kann nun Befehlsausführungspakete senden. Jedes Paket enthält den auszuführenden Befehl.
    - Der Server verarbeitet den Befehl und sendet ein Ausgabepaket mit dem Ergebnis oder Fehlermeldungen zurück.