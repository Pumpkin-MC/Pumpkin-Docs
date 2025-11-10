import { defineConfig } from "vitepress";

export const de = defineConfig({
    lang: "de",
    description: "Hochperformante Minecraft-Server-Software in Rust",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Startseite",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "Über",
                items: [
                    { text: "Benchmarks", link: "/de/about/benchmarks" },
                ],
            },
            {
                text: "Konfiguration",
                items: [
                    { text: "Einführung", link: "/de/config/introduction" },
                    { text: "Grundkonfiguration", link: "/de/config/basic" },
                    { text: "Proxy", link: "/de/config/proxy" },
                    { text: "Authentifizierung", link: "/de/config/authentication" },
                    { text: "Kompression", link: "/de/config/compression" },
                    { text: "Ressourcenpaket", link: "/de/config/resource-pack" },
                    { text: "Befehle", link: "/de/config/commands" },
                    { text: "RCON", link: "/de/config/rcon" },
                    { text: "PVP", link: "/de/config/pvp" },
                    { text: "Logging", link: "/de/config/logging" },
                    { text: "Query", link: "/de/config/query" },
                    { text: "LAN-Broadcast", link: "/de/config/lan-broadcast" },
                ],
            },
            {
                text: "Entwickler",
                items: [
                    { text: "Beitragen", link: "/de/developer/contributing" },
                    { text: "Einführung", link: "/de/developer/introduction" },
                    {
                        text: "Netzwerk",
                        link: "/de/developer/networking/networking",
                        items: [
                            {
                                text: "Authentifizierung",
                                link: "/de/developer/networking/authentication",
                            },
                            {
                                text: "RCON",
                                link: "/de/developer/networking/rcon",
                            },
                        ],
                    },
                    { text: "Welt", link: "/de/developer/world" },
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
                        text: "Plugin-Vorlage",
                        link: "/de/plugin-dev/plugin-template/introduction",
                        items: [
                            {
                                text: "Projekt erstellen",
                                link: "/de/plugin-dev/plugin-template/creating-project",
                            },
                            {
                                text: "Grundlogik",
                                link: "/de/plugin-dev/plugin-template/basic-logic",
                            },
                            {
                                text: "Join-Event",
                                link: "/de/plugin-dev/plugin-template/join-event",
                            },
                            {
                                text: "Schere-Stein-Papier Befehl",
                                link: "/de/plugin-dev/plugin-template/rock-paper-scissors",
                            },
                            {
                                text: "Inventare",
                                link: "/de/plugin-dev/plugin-template/inventories",
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
                        link: "/de/troubleshooting/common_issues.md",
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
            message: "Veröffentlicht unter der MIT-Lizenz.",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Website/blob/master/docs/:path",
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
