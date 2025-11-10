# RCON (Remote Console)

## Was ist RCON?

RCON ist ein von Valve entworfenes Protokoll zur Remote‑Verwaltung von Gameservern. Es erlaubt das Ausführen von Befehlen von einem anderen Gerät (z. B. Smartphone oder separater Rechner).

## Warum RCON?

- **Bequemlichkeit:** Verwaltung von überall mit Internetzugang.
- **Flexibilität:** Befehle ohne direkte Serverzugriffsstelle ausführen.
- **Effizienz:** Aufgaben automatisieren und Management vereinfachen.

## SSH vs RCON

### SSH
- Starke Verschlüsselung.
- Universelles Remote‑Login für Systemverwaltung.
- Shell‑Umgebung mit umfassenden Befehlen.

### RCON
- Speziell für Gameserver‑Administration.
- Oft weniger sicher (häufig Klartext‑Passwörter).
- Begrenzter, spielbezogener Befehlsumfang.

### Pakete

RCON ist sehr simpel:

| Feld | Beschreibung |
| ---- | ------------ |
| ID   | Zeigt Erfolg oder Fehlschlag der Authentifizierung |
| Type | Pakettyp |
| Body | Nachricht (String) – Befehl oder Passwort |

#### Serverbound (Client→Server)
| Type | Paket |
| ---- | ----- |
| 2    | Auth  |
| 3    | ExecCommand |

#### Clientbound (Server→Client)
| Type | Paket |
| ---- | ----- |
| 2    | AuthResponse |
| 0    | Output |

### Ablauf

1. **Authentifizierung:** Client sendet Passwort; Server antwortet mit AuthResponse (ID −1 bei Fehlschlag).
2. **Befehlsausführung:** Authentifizierter Client sendet Befehle; Server antwortet mit Output‑Packet.
