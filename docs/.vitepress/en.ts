import { defineConfig } from "vitepress";

export const en = defineConfig({
    lang: "en-US",
    description: "A High-performance Minecraft server software written in Rust",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Documentation",
                link: "/about/introduction",
            },
        ],
        sidebar: [
            {
                text: "About",
                items: [
                    { text: "Introduction", link: "/about/introduction" },
                    { text: "Quick Start", link: "/about/quick-start" },
                    { text: "Benchmarks", link: "/about/benchmarks" },
                ],
            },
            {
                text: "Configuration",
                items: [
                    { text: "Introduction", link: "/config/introduction" },
                    { text: "Basic", link: "/config/basic" },
                    { text: "Proxy", link: "/config/proxy" },
                    { text: "Authentication", link: "/config/authentication" },
                    { text: "Compression", link: "/config/compression" },
                    { text: "Resource Pack", link: "/config/resource-pack" },
                    { text: "Commands", link: "/config/commands" },
                    { text: "RCON", link: "/config/rcon" },
                    { text: "PVP", link: "/config/pvp" },
                    { text: "Logging", link: "/config/logging" },
                    { text: "Query", link: "/config/query" },
                    { text: "LAN Broadcast", link: "/config/lan-broadcast" },
                ],
            },
            {
                text: "Developers",
                items: [
                    { text: "Contributing", link: "/developer/contributing" },
                    { text: "Introduction", link: "/developer/introduction" },
                    {
                        text: "Networking",
                        link: "/developer/networking/networking",
                        items: [
                            { text: "Authentication", link: "/developer/networking/authentication" },
                            { text: "RCON", link: "/developer/networking/rcon" },
                        ]
                    },
                    { text: "World", link: "developer/world" },
                    { text: "Mobile dev", link: "developer/mobile" },
                ],
            },
            {
                text: "Plugin Development",
                items: [
                    {
                        text: "Introduction",
                        link: "/plugin-dev/introduction",
                    },
                    {
                        text: "Plugin Template",
                        link: "/plugin-dev/plugin-template/introduction",
                        items: [
                            {
                                text: "Creating Project",
                                link: "/plugin-dev/plugin-template/creating-project",
                            },
                            {
                                text: "Basic Logic",
                                link: "/plugin-dev/plugin-template/basic-logic",
                            },
                            {
                                text: "Join Event",
                                link: "/plugin-dev/plugin-template/join-event",
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
                        link: "/troubleshooting/common_issues.md",
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
                "https://github.com/Pumpkin-MC/Pumpkin-Website/blob/master/docs/:path",
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
    }
});
