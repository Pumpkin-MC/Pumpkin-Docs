import { defineConfig } from "vitepress";

export const nl = defineConfig({
    lang: "nl",
    description: "Een Minecraft-serversoftware met hoge prestaties, geschreven in Rust",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Beheer",
                link: "/nl/admin/introduction",
            },
            {
                text: "Bijdragers",
                link: "/nl/developer/introduction",
            },
            {
                text: "Plugins",
                link: "/nl/plugin-dev/introduction",
            },
            {
                text: "Website",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "Over",
                items: [
                    { text: "Helpen & Doneren", link: "/nl/about/helping" },
                ],
            },
            {
                text: "Beheer",
                collapsed: false,
                items: [
                    { text: "Overzicht", link: "/nl/admin/introduction" },
                    { text: "Migreren van Bukkit", link: "/nl/admin/migrating-from-bukkit" },
                    {
                        text: "Configuratie",
                        collapsed: true,
                        items: [
                            { text: "Introductie", link: "/nl/config/introduction" },
                            { text: "Basis", link: "/nl/config/basic" },
                            { text: "Wereld", link: "/nl/config/world" },
                            { text: "Chat & Anti-Spam", link: "/nl/config/chat" },
                            { text: "Commando's", link: "/nl/config/commands" },
                            { text: "Bedrock & NetherNet", link: "/nl/config/bedrock" },
                            { text: "Proxy", link: "/nl/config/proxy" },
                            { text: "Authenticatie", link: "/nl/config/authentication" },
                            { text: "Pakketlimiet", link: "/nl/config/packet-limiter" },
                            { text: "Compressie", link: "/nl/config/compression" },
                            { text: "Resource Pack", link: "/nl/config/resource-pack" },
                            { text: "Plugins", link: "/nl/config/plugins" },
                            { text: "Serverlinks", link: "/nl/config/server-links" },
                            { text: "Spelergegevens", link: "/nl/config/player-data" },
                            { text: "Logbestanden", link: "/nl/config/logging" },
                            { text: "Query", link: "/nl/config/query" },
                            { text: "RCON", link: "/nl/config/rcon" },
                            { text: "PVP", link: "/nl/config/pvp" },
                            { text: "LAN Broadcast", link: "/nl/config/lan-broadcast" },
                        ],
                    },
                ],
            },
            {
                text: "Bijdragers",
                items: [
                    { text: "Introductie", link: "/nl/developer/introduction" },
                    { text: "Bijdragegids", link: "/nl/developer/contributing" },
                    { text: "Architectuur", link: "/nl/developer/architecture" },
                    { text: "Gegevensextractor", link: "/nl/developer/extractor" },
                    { text: "Codegeneratie", link: "/nl/developer/codegen" },
                    { text: "Versies overzetten", link: "/nl/developer/porting-versions" },
                    {
                        text: "Netwerken",
                        collapsed: true,
                        items: [
                            {
                                text: "Introductie",
                                link: "/nl/developer/networking/",
                            },
                            {
                                text: "Metadata & Gesynchroniseerde Gegevens",
                                link: "/nl/developer/networking/metadata",
                            },
                            {
                                text: "Java Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Overzicht",
                                        link: "/nl/developer/networking/java/overview",
                                    },
                                    {
                                        text: "Pakket toevoegen",
                                        link: "/nl/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "Authenticatie",
                                        link: "/nl/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Bedrock Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Overzicht",
                                        link: "/nl/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "Pakket toevoegen",
                                        link: "/nl/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "Authenticatie",
                                        link: "/nl/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/nl/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "Proxy-doorsturing",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Overzicht",
                                        link: "/nl/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/nl/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/nl/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/nl/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/nl/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/nl/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "Blokken",
                        collapsed: true,
                        items: [
                            { text: "Overzicht", link: "/nl/developer/blocks/" },
                            { text: "Blok toevoegen", link: "/nl/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "Items",
                        collapsed: true,
                        items: [
                            { text: "Overzicht", link: "/nl/developer/items/" },
                            { text: "Item toevoegen", link: "/nl/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "Entities",
                        collapsed: true,
                        items: [
                            { text: "Overzicht & Hiërarchie", link: "/nl/developer/entities/" },
                            { text: "Spawning & Tracking", link: "/nl/developer/entities/spawning-and-tracking" },
                            { text: "Mob-AI & Doelen", link: "/nl/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "Commando's",
                        collapsed: true,
                        items: [
                            { text: "Overzicht & Dispatcher", link: "/nl/developer/commands/" },
                            { text: "Commando toevoegen", link: "/nl/developer/commands/adding-commands" },
                            { text: "Argumenten & Suggesties", link: "/nl/developer/commands/arguments-and-suggestions" },
                            { text: "Uitvoering & Context", link: "/nl/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "Plugin-engine",
                        collapsed: true,
                        items: [
                            { text: "Overzicht", link: "/nl/developer/plugins/" },
                            { text: "Plugin-loader toevoegen", link: "/nl/developer/plugins/loaders" },
                            { text: "WASM-ondertekening & Verificatie", link: "/nl/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "Wereld-engine", link: "/nl/developer/world" },
                    { text: "Mobiele ontwikkeling", link: "/nl/developer/mobile" },
                ],
            },
            {
                text: "Pluginontwikkeling",
                items: [
                    {
                        text: "Introductie",
                        link: "/nl/plugin-dev/introduction",
                    },
                    {
                        text: "Migreren van Bukkit",
                        collapsed: true,
                        items: [
                            {
                                text: "Overzicht",
                                link: "/nl/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "Commando's",
                                link: "/nl/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "Events",
                                link: "/nl/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "Inventarissen & GUI's",
                                link: "/nl/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "Configuratie & Gegevens",
                                link: "/nl/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "Project aanmaken",
                                link: "/nl/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Basislogica",
                                link: "/nl/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Events",
                                link: "/nl/plugin-dev/rust/events",
                            },
                            {
                                text: "Commando's",
                                items: [
                                    {
                                        text: "Eerste commando",
                                        link: "/nl/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Steen-papier-schaar",
                                        link: "/nl/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "Licenties & Updates",
                                link: "/nl/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/nl/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Basislogica",
                                link: "/nl/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "Eerste commando",
                                link: "/nl/plugin-dev/python/first-command",
                            },
                            {
                                text: "Events",
                                link: "/nl/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/nl/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "Eerste commando",
                                link: "/nl/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/nl/plugin-dev/c/quick-start",
                            },
                            {
                                text: "Eerste commando",
                                link: "/nl/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/nl/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Basislogica",
                                link: "/nl/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "Eerste commando",
                                link: "/nl/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/nl/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "Eerste commando",
                                link: "/nl/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/nl/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Zig",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/nl/plugin-dev/zig/quick-start",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Probleemoplossing",
                items: [
                    {
                        text: "Veelvoorkomende problemen",
                        link: "/nl/troubleshooting/common_issues",
                    },
                ],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/Pumpkin-MC/Pumpkin" },
            { icon: "discord", link: "https://discord.gg/RNm224ZsDq" },
        ],

        logo: "/assets/favicon.ico",
        footer: {
            message: "Uitgebracht onder de MIT-licentie.",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "Bewerk deze pagina op GitHub",
        },
        lastUpdated: {
            text: "Laatst bijgewerkt op",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
