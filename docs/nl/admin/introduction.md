# Beheerdersoverzicht

Welkom bij het **Beheergedeelte** voor Pumpkin-serverbeheerders. Pumpkin is een krachtige, multithreaded Minecraft-server geschreven in Rust, ontworpen om gigantische spelersaantallen te ondersteunen met een minimaal resourceverbruik.

---

## Belangrijkste functies voor serverbeheerders

- **Extreme multithreading**: Vanaf de grond af opgebouwd voor moderne multi-core processors.
- **WASM-pluginarchitectuur**: Veilige, gesandboxte plugin-uitvoering in Rust, Python, Kotlin, C#, Go of C zonder JVM-overhead.
- **Standaard cross-proxy-ondersteuning**: Directe ondersteuning voor Velocity, BungeeCord en moderne proxy-forwarding.
- **Op TOML gebaseerde configuratie**: Overzichtelijke, voor mensen leesbare configuratiebestanden in `pumpkin.toml` en functiespecifieke TOML-configuraties.

---

## Beheerdershandleidingen & Onderwerpen

Bekijk de volgende handleidingen voor serverbeheer:

- [Migreren van een Bukkit- / Paper- / Spigot-server](./migrating-from-bukkit) — Belangrijke verschillen in serverbeheer, plugins, wereldopslag en prestaties.
- [Serverconfiguratie](../config/introduction) — Gedetailleerd overzicht van de instellingen in `pumpkin.toml`.
- [Proxy-configuratie](../config/proxy) — BungeeCord- en Velocity-spelerforwarding instellen.
- [Commando's & Permissies](../config/commands) — Beheer van in-game operatorcommando's en permissies.
- [Authenticatie](../config/authentication) — Online-modus vs. offline-modus en Yggdrasil-instellingen.
- [Probleemoplossing & Veelvoorkomende problemen](../troubleshooting/common_issues) — Oplossingen voor problemen met poortbinding, geheugen en het laden van plugins.
