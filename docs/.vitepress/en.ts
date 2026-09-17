import { defineConfig } from "vitepress";

export const en = defineConfig({
    lang: "en-US",
    description: "A High-performance Minecraft server software written in Rust",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Administration",
                link: "/admin/introduction",
            },
            {
                text: "Contributors",
                link: "/developer/introduction",
            },
            {
                text: "Plugins",
                link: "/plugin-dev/introduction",
            },
            {
                text: "Website",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "About",
                items: [
                    { text: "Helping & Donating", link: "/about/helping" },
                ],
            },
            {
                text: "Administration",
                collapsed: false,
                items: [
                    { text: "Overview", link: "/admin/introduction" },
                    { text: "Migrating from Bukkit", link: "/admin/migrating-from-bukkit" },
                    {
                        text: "Configuration",
                        collapsed: true,
                        items: [
                            { text: "Introduction", link: "/config/introduction" },
                            { text: "Basic", link: "/config/basic" },
                            { text: "World", link: "/config/world" },
                            { text: "Chat & Anti-Spam", link: "/config/chat" },
                            { text: "Commands", link: "/config/commands" },
                            { text: "Bedrock & NetherNet", link: "/config/bedrock" },
                            { text: "Proxy", link: "/config/proxy" },
                            { text: "Authentication", link: "/config/authentication" },
                            { text: "Packet Limiter", link: "/config/packet-limiter" },
                            { text: "Compression", link: "/config/compression" },
                            { text: "Resource Pack", link: "/config/resource-pack" },
                            { text: "Plugins", link: "/config/plugins" },
                            { text: "Server Links", link: "/config/server-links" },
                            { text: "Player Data", link: "/config/player-data" },
                            { text: "Logging", link: "/config/logging" },
                            { text: "Query", link: "/config/query" },
                            { text: "RCON", link: "/config/rcon" },
                            { text: "PVP", link: "/config/pvp" },
                            { text: "LAN Broadcast", link: "/config/lan-broadcast" },
                        ],
                    },
                ],
            },
            {
                text: "Contributors",
                items: [
                    { text: "Introduction", link: "/developer/introduction" },
                    { text: "Contributing Guide", link: "/developer/contributing" },
                    { text: "Architecture", link: "/developer/architecture" },
                    { text: "Data Extractor", link: "/developer/extractor" },
                    { text: "Code Generation", link: "/developer/codegen" },
                    { text: "Porting Versions", link: "/developer/porting-versions" },
                    {
                        text: "Networking",
                        collapsed: true,
                        items: [
                            {
                                text: "Introduction",
                                link: "/developer/networking/",
                            },
                            {
                                text: "Metadata & Synced Data",
                                link: "/developer/networking/metadata",
                            },
                            {
                                text: "Java Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Overview",
                                        link: "/developer/networking/java/overview",
                                    },
                                    {
                                        text: "Adding a Packet",
                                        link: "/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "Authentication",
                                        link: "/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Bedrock Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Overview",
                                        link: "/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "Adding a Packet",
                                        link: "/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "Authentication",
                                        link: "/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "Proxy Forwarding",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Overview",
                                        link: "/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "Blocks",
                        collapsed: true,
                        items: [
                            { text: "Overview", link: "/developer/blocks/" },
                            { text: "Adding a Block", link: "/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "Items",
                        collapsed: true,
                        items: [
                            { text: "Overview", link: "/developer/items/" },
                            { text: "Adding an Item", link: "/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "Entities",
                        collapsed: true,
                        items: [
                            { text: "Overview & Hierarchy", link: "/developer/entities/" },
                            { text: "Spawning & Tracking", link: "/developer/entities/spawning-and-tracking" },
                            { text: "Mob AI & Goals", link: "/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "Commands",
                        collapsed: true,
                        items: [
                            { text: "Overview & Dispatcher", link: "/developer/commands/" },
                            { text: "Adding a Command", link: "/developer/commands/adding-commands" },
                            { text: "Arguments & Suggestions", link: "/developer/commands/arguments-and-suggestions" },
                            { text: "Execution & Context", link: "/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "Plugin Engine",
                        collapsed: true,
                        items: [
                            { text: "Overview", link: "/developer/plugins/" },
                            { text: "Adding a Plugin Loader", link: "/developer/plugins/loaders" },
                            { text: "WASM Signing & Verification", link: "/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "World Engine", link: "/developer/world" },
                    { text: "Mobile Development", link: "/developer/mobile" },
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
                        text: "Migrating from Bukkit",
                        collapsed: true,
                        items: [
                            {
                                text: "Overview",
                                link: "/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "Commands",
                                link: "/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "Events",
                                link: "/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "Inventories & GUIs",
                                link: "/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "Configuration & Data",
                                link: "/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "Creating Project",
                                link: "/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Basic Logic",
                                link: "/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Events",
                                link: "/plugin-dev/rust/events",
                            },
                            {
                                text: "Commands",
                                items: [
                                    {
                                        text: "First Command",
                                        link: "/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Rock-Paper-Scissors",
                                        link: "/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "Licensing & Updates",
                                link: "/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Basic Logic",
                                link: "/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "First Command",
                                link: "/plugin-dev/python/first-command",
                            },
                            {
                                text: "Events",
                                link: "/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "First Command",
                                link: "/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/plugin-dev/c/quick-start",
                            },
                            {
                                text: "First Command",
                                link: "/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Basic Logic",
                                link: "/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "First Command",
                                link: "/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "First Command",
                                link: "/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/plugin-dev/d/quick-start",
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
                        link: "/troubleshooting/common_issues",
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
