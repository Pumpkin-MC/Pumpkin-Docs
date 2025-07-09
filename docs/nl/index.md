# Snelle Start

**Huidige Status:**

Pre-release: Momenteel in ontwikkeling en nog niet klaar voor officiële release.

Om Pumpkin te laten draaien, moet je het eerst klonen:
```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

Je moet mogelijk ook [rust installeren](https://www.rust-lang.org/tools/install) als je het nog niet hebt.

**Optioneel:**

Je kunt een vanilla wereld in de Pumpkin/ directory plaatsen als je wilt. Noem de wereld gewoon `world`

Voer dan uit:

> [!NOTE]
> Dit kan even duren omdat we zware optimalisaties voor release builds hebben ingeschakeld
>
> Om verdere optimalisaties specifiek voor je CPU toe te passen en je CPU-functies te gebruiken, moet je de target-cpu=native
> Rust-vlag instellen.

```shell
cargo run --release
```

## Docker

Experimentele Docker-ondersteuning is beschikbaar.
De afbeelding is momenteel nergens gepubliceerd, maar je kunt het volgende commando gebruiken om het te bouwen en te implementeren:

```shell
docker compose up --build
```

Na het uitvoeren van dit commando zou er een `data/` map moeten verschijnen waarin je alle serverbestanden kunt vinden.
Binnen deze `data/` map kun je je `world/` map plaatsen (zorg ervoor dat je de server opnieuw start)


## Test Server
Pumpkin heeft een testserver onderhouden door @kralverde. Het draait op de nieuwste commit van Pumpkin

- **IP:** pumpkin.kralverde.dev

**Specificaties:**
- OS: Debian GNU/Linux bookworm 12.7 x86_64
- Kernel: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, geen TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM
