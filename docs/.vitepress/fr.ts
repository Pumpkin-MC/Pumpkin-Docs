import { defineConfig } from "vitepress";

export const fr = defineConfig({
    lang: "fr",
    description: "Un logiciel de server Minecraft haute permformance écrit en Rust",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Home",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "About",
                items: [
                    { text: "Benchmarks", link: "/fr/about/benchmarks" },
                    { text: "Helping & Donating", link: "/fr/about/helping" },
                ],
            },
            {
                text: "Configuration",
                items: [
                    { text: "Introduction", link: "/fr/config/introduction" },
                    { text: "Basic", link: "/fr/config/basic" },
                    { text: "Proxy", link: "/fr/config/proxy" },
                    { text: "Authentication", link: "/fr/config/authentication" },
                    { text: "Compression", link: "/fr/config/compression" },
                    { text: "Resource Pack", link: "/fr/config/resource-pack" },
                    { text: "Commands", link: "/fr/config/commands" },
                    { text: "RCON", link: "/fr/config/rcon" },
                    { text: "PVP", link: "/fr/config/pvp" },
                    { text: "Logging", link: "/fr/config/logging" },
                    { text: "Query", link: "/fr/config/query" },
                    { text: "LAN Broadcast", link: "/fr/config/lan-broadcast" },
                ],
            },
            {
                text: "Developers",
                items: [
                    { text: "Contributing", link: "/fr/developer/contributing" },
                    { text: "Introduction", link: "/fr/developer/introduction" },
                    {
                        text: "Networking",
                        link: "/fr/developer/networking/networking",
                        items: [
                            {
                                text: "Authentication",
                                link: "/fr/developer/networking/authentication",
                            },
                            {
                                text: "RCON",
                                link: "/fr/developer/networking/rcon",
                            },
                        ],
                    },
                    { text: "World", link: "/fr/developer/world" },
                    { text: "Mobile dev", link: "/fr/developer/mobile" },
                ],
            },
            {
                text: "Plugin Development",
                items: [
                    {
                        text: "Introduction",
                        link: "/fr/plugin-dev/introduction",
                    },
                    {
                        text: "Rust",
                        collapsed: false,
                        items: [
                            {
                                text: "Creating Project",
                                link: "/fr/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Basic Logic",
                                link: "/fr/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Events",
                                link: "/fr/plugin-dev/rust/events",
                            },
                            {
                                text: "Commands",
                                items: [
                                    {
                                        text: "First Command",
                                        link: "/fr/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Rock-Paper-Scissors",
                                        link: "/fr/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: false,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/fr/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Basic Logic",
                                link: "/fr/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "Events",
                                link: "/fr/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: false,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/fr/plugin-dev/csharp/quick-start",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: false,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/fr/plugin-dev/c/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: false,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/fr/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Basic Logic",
                                link: "/fr/plugin-dev/go/basic-logic",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: false,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/fr/plugin-dev/kotlin/quick-start",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Troubleshooting",
                items: [
                    {
                        text: "Common Issues",
                        link: "/fr/troubleshooting/common_issues.md",
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
            message: "Released under the MIT License.",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "Edit this page on GitHub",
        },
        lastUpdated: {
            text: "Updated at",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
