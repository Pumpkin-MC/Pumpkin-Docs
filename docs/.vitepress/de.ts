import { defineConfig } from "vitepress";

export const de = defineConfig({
    lang: "de",
    description: "Hochperformante Minecraft-Server-Software in Rust",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Administration",
                link: "/de/admin/introduction",
            },
            {
                text: "Mitwirkende",
                link: "/de/developer/introduction",
            },
            {
                text: "Plugins",
                link: "/de/plugin-dev/introduction",
            },
            {
                text: "Webseite",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "Über",
                items: [
                    { text: "Helfen & Spenden", link: "/de/about/helping" },
                ],
            },
            {
                text: "Administration",
                collapsed: false,
                items: [
                    { text: "Übersicht", link: "/de/admin/introduction" },
                    { text: "Migration von Bukkit", link: "/de/admin/migrating-from-bukkit" },
                    {
                        text: "Konfiguration",
                        collapsed: true,
                        items: [
                            { text: "Einführung", link: "/de/config/introduction" },
                            { text: "Grundkonfiguration", link: "/de/config/basic" },
                            { text: "Welt", link: "/de/config/world" },
                            { text: "Chat & Anti-Spam", link: "/de/config/chat" },
                            { text: "Befehle", link: "/de/config/commands" },
                            { text: "Bedrock & NetherNet", link: "/de/config/bedrock" },
                            { text: "Proxy", link: "/de/config/proxy" },
                            { text: "Authentifizierung", link: "/de/config/authentication" },
                            { text: "Paket-Begrenzer", link: "/de/config/packet-limiter" },
                            { text: "Kompression", link: "/de/config/compression" },
                            { text: "Ressourcenpaket", link: "/de/config/resource-pack" },
                            { text: "Plugins", link: "/de/config/plugins" },
                            { text: "Server-Links", link: "/de/config/server-links" },
                            { text: "Spielerdaten", link: "/de/config/player-data" },
                            { text: "Logging", link: "/de/config/logging" },
                            { text: "Query", link: "/de/config/query" },
                            { text: "RCON", link: "/de/config/rcon" },
                            { text: "PVP", link: "/de/config/pvp" },
                            { text: "LAN-Broadcast", link: "/de/config/lan-broadcast" },
                        ],
                    },
                ],
            },
            {
                text: "Mitwirkende",
                items: [
                    { text: "Einführung", link: "/de/developer/introduction" },
                    { text: "Beitragsleitfaden", link: "/de/developer/contributing" },
                    { text: "Architektur", link: "/de/developer/architecture" },
                    { text: "Daten-Extraktor", link: "/de/developer/extractor" },
                    { text: "Code-Generierung", link: "/de/developer/codegen" },
                    { text: "Versionen portieren", link: "/de/developer/porting-versions" },
                    {
                        text: "Netzwerk",
                        collapsed: true,
                        items: [
                            {
                                text: "Einführung",
                                link: "/de/developer/networking/",
                            },
                            {
                                text: "Metadaten & Synchronisierte Daten",
                                link: "/de/developer/networking/metadata",
                            },
                            {
                                text: "Java Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Übersicht",
                                        link: "/de/developer/networking/java/overview",
                                    },
                                    {
                                        text: "Paket hinzufügen",
                                        link: "/de/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "Authentifizierung",
                                        link: "/de/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Bedrock Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Übersicht",
                                        link: "/de/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "Paket hinzufügen",
                                        link: "/de/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "Authentifizierung",
                                        link: "/de/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/de/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "Proxy-Weiterleitung",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Übersicht",
                                        link: "/de/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/de/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/de/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/de/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/de/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/de/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "Blöcke",
                        collapsed: true,
                        items: [
                            { text: "Übersicht", link: "/de/developer/blocks/" },
                            { text: "Block hinzufügen", link: "/de/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "Gegenstände",
                        collapsed: true,
                        items: [
                            { text: "Übersicht", link: "/de/developer/items/" },
                            { text: "Gegenstand hinzufügen", link: "/de/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "Entities",
                        collapsed: true,
                        items: [
                            { text: "Übersicht & Hierarchie", link: "/de/developer/entities/" },
                            { text: "Spawning & Tracking", link: "/de/developer/entities/spawning-and-tracking" },
                            { text: "Mob-KI & Ziele", link: "/de/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "Befehle",
                        collapsed: true,
                        items: [
                            { text: "Übersicht & Dispatcher", link: "/de/developer/commands/" },
                            { text: "Befehl hinzufügen", link: "/de/developer/commands/adding-commands" },
                            { text: "Argumente & Vorschläge", link: "/de/developer/commands/arguments-and-suggestions" },
                            { text: "Ausführung & Kontext", link: "/de/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "Plugin-Engine",
                        collapsed: true,
                        items: [
                            { text: "Übersicht", link: "/de/developer/plugins/" },
                            { text: "Plugin-Loader hinzufügen", link: "/de/developer/plugins/loaders" },
                            { text: "WASM-Signierung & Verifizierung", link: "/de/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "Welt-Engine", link: "/de/developer/world" },
                    { text: "Mobile Entwicklung", link: "/de/developer/mobile" },
                ],
            },
            {
                text: "Plugin-Entwicklung",
                items: [
                    {
                        text: "Einführung",
                        link: "/de/plugin-dev/introduction",
                    },
                    {
                        text: "Migration von Bukkit",
                        collapsed: true,
                        items: [
                            {
                                text: "Übersicht",
                                link: "/de/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "Befehle",
                                link: "/de/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "Events",
                                link: "/de/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "Inventare & GUIs",
                                link: "/de/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "Konfiguration & Daten",
                                link: "/de/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "Projekt erstellen",
                                link: "/de/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Grundlogik",
                                link: "/de/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Events",
                                link: "/de/plugin-dev/rust/events",
                            },
                            {
                                text: "Befehle",
                                items: [
                                    {
                                        text: "Erster Befehl",
                                        link: "/de/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Schere-Stein-Papier",
                                        link: "/de/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "Lizenzierung & Updates",
                                link: "/de/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
                        items: [
                            {
                                text: "Schnellstart",
                                link: "/de/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Grundlogik",
                                link: "/de/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "Erster Befehl",
                                link: "/de/plugin-dev/python/first-command",
                            },
                            {
                                text: "Events",
                                link: "/de/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "Schnellstart",
                                link: "/de/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "Erster Befehl",
                                link: "/de/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "Schnellstart",
                                link: "/de/plugin-dev/c/quick-start",
                            },
                            {
                                text: "Erster Befehl",
                                link: "/de/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "Schnellstart",
                                link: "/de/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Grundlogik",
                                link: "/de/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "Erster Befehl",
                                link: "/de/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "Schnellstart",
                                link: "/de/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "Erster Befehl",
                                link: "/de/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "Schnellstart",
                                link: "/de/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Zig",
                        collapsed: true,
                        items: [
                            {
                                text: "Schnellstart",
                                link: "/de/plugin-dev/zig/quick-start",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Fehlerbehebung",
                items: [
                    {
                        text: "Häufige Probleme",
                        link: "/de/troubleshooting/common_issues",
                    },
                ],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/Pumpkin-MC/Pumpkin" },
            { icon: "discord", link: "https://discord.gg/RNm224ZsDq" },
        ],

        logo: "/assets/icon.svg",
        footer: {
            message: "Veröffentlicht unter der MIT-Lizenz.",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "Diese Seite auf GitHub bearbeiten",
        },
        lastUpdated: {
            text: "Aktualisiert am",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
