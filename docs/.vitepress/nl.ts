import { defineConfig } from "vitepress";

export const nl = defineConfig({
    lang: "nl",
    description: "Een Minecraft-serversoftware met hoge prestaties, geschreven in Rust",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Documentatie",
                link: "/nl/about/introduction",
            },
        ],
        sidebar: [
            {
                text: "Over",
                items: [
                    { text: "Introductie", link: "/nl/about/introduction" },
                    { text: "Snelle start", link: "/nl/about/quick-start" },
                    { text: "Benchmarktests", link: "/nl/about/benchmarks" },
                ],
            },
            {
                text: "Configuratie",
                items: [
                    { text: "Introductie", link: "/nl/config/introduction" },
                    { text: "Basis", link: "/nl/config/basic" },
                    { text: "Proxy", link: "/nl/config/proxy" },
                    { text: "Authenticatie", link: "/nl/config/authentication" },
                    { text: "Compressie", link: "/nl/config/compression" },
                    { text: "Resource Pack", link: "/nl/config/resource-pack" },
                    { text: "Commando's", link: "/nl/config/commands" },
                    { text: "RCON", link: "/nl/config/rcon" },
                    { text: "PVP", link: "/nl/config/pvp" },
                    { text: "Logbestanden", link: "/nl/config/logging" },
                    { text: "Query", link: "/nl/config/query" },
                    { text: "LAN Broadcast", link: "/nl/config/lan-broadcast" },
                ],
            },
            {
                text: "Ontwikkelaars",
                items: [
                    { text: "Bijdragen", link: "/nl/developer/contributing" },
                    { text: "Introductie", link: "/nl/developer/introduction" },
                    {
                        text: "Netwerken",
                        link: "/nl/developer/networking/networking",
                        items: [
                            { text: "Authenticatie", link: "/nl/developer/networking/authentication" },
                            { text: "RCON", link: "/nl/developer/networking/rcon" },
                        ]
                    },
                    { text: "Wereld", link: "/nl/developer/world" },
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
                        text: "Plugintemplate",
                        link: "/nl/plugin-dev/plugin-template/introduction",
                        items: [
                            {
                                text: "Project aanmaken",
                                link: "/nl/plugin-dev/plugin-template/creating-project",
                            },
                            {
                                text: "Basislogica",
                                link: "/nl/plugin-dev/plugin-template/basic-logic",
                            },
                            {
                                text: "Join Event",
                                link: "/nl/plugin-dev/plugin-template/join-event",
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
                        link: "/nl/troubleshooting/common_issues.md",
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
                "https://github.com/Pumpkin-MC/Pumpkin-Website/blob/master/docs/:path",
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
    }
});
