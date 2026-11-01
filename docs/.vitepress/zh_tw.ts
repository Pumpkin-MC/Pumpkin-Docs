import { defineConfig } from "vitepress";

export const zhTW = defineConfig({
    lang: "zh-TW",
    description: "使用 Rust 編寫的高效能 Minecraft 伺服器軟體",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "管理",
                link: "/zh_tw/admin/introduction",
            },
            {
                text: "貢獻者",
                link: "/zh_tw/developer/introduction",
            },
            {
                text: "插件開發",
                link: "/zh_tw/plugin-dev/introduction",
            },
            {
                text: "官網",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "關於",
                items: [
                    { text: "幫助與捐贈", link: "/zh_tw/about/helping" },
                ],
            },
            {
                text: "管理",
                collapsed: false,
                items: [
                    { text: "概述", link: "/zh_tw/admin/introduction" },
                    { text: "從 Bukkit 遷移", link: "/zh_tw/admin/migrating-from-bukkit" },
                    {
                        text: "設定",
                        collapsed: true,
                        items: [
                            { text: "介紹", link: "/zh_tw/config/introduction" },
                            { text: "基礎設定", link: "/zh_tw/config/basic" },
                            { text: "世界", link: "/zh_tw/config/world" },
                            { text: "聊天與反洗版", link: "/zh_tw/config/chat" },
                            { text: "指令", link: "/zh_tw/config/commands" },
                            { text: "基岩版與 NetherNet", link: "/zh_tw/config/bedrock" },
                            { text: "代理", link: "/zh_tw/config/proxy" },
                            { text: "身分驗證", link: "/zh_tw/config/authentication" },
                            { text: "資料包限制器", link: "/zh_tw/config/packet-limiter" },
                            { text: "壓縮", link: "/zh_tw/config/compression" },
                            { text: "資源包", link: "/zh_tw/config/resource-pack" },
                            { text: "插件", link: "/zh_tw/config/plugins" },
                            { text: "伺服器連結", link: "/zh_tw/config/server-links" },
                            { text: "玩家資料", link: "/zh_tw/config/player-data" },
                            { text: "日誌", link: "/zh_tw/config/logging" },
                            { text: "Query", link: "/zh_tw/config/query" },
                            { text: "RCON", link: "/zh_tw/config/rcon" },
                            { text: "PVP", link: "/zh_tw/config/pvp" },
                            { text: "區域網廣播", link: "/zh_tw/config/lan-broadcast" },
                        ],
                    },
                ],
            },
            {
                text: "貢獻者",
                items: [
                    { text: "介紹", link: "/zh_tw/developer/introduction" },
                    { text: "貢獻指南", link: "/zh_tw/developer/contributing" },
                    { text: "架構", link: "/zh_tw/developer/architecture" },
                    { text: "資料提取器", link: "/zh_tw/developer/extractor" },
                    { text: "程式碼生成", link: "/zh_tw/developer/codegen" },
                    { text: "版本遷移", link: "/zh_tw/developer/porting-versions" },
                    {
                        text: "網路",
                        collapsed: true,
                        items: [
                            {
                                text: "介紹",
                                link: "/zh_tw/developer/networking/",
                            },
                            {
                                text: "元資料與同步資料",
                                link: "/zh_tw/developer/networking/metadata",
                            },
                            {
                                text: "Java Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概述",
                                        link: "/zh_tw/developer/networking/java/overview",
                                    },
                                    {
                                        text: "新增資料包",
                                        link: "/zh_tw/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "身分驗證",
                                        link: "/zh_tw/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Bedrock Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概述",
                                        link: "/zh_tw/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "新增資料包",
                                        link: "/zh_tw/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "身分驗證",
                                        link: "/zh_tw/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/zh_tw/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "代理轉發",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概述",
                                        link: "/zh_tw/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/zh_tw/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/zh_tw/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/zh_tw/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/zh_tw/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/zh_tw/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "方塊",
                        collapsed: true,
                        items: [
                            { text: "概述", link: "/zh_tw/developer/blocks/" },
                            { text: "新增方塊", link: "/zh_tw/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "物品",
                        collapsed: true,
                        items: [
                            { text: "概述", link: "/zh_tw/developer/items/" },
                            { text: "新增物品", link: "/zh_tw/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "實體",
                        collapsed: true,
                        items: [
                            { text: "概述與層級", link: "/zh_tw/developer/entities/" },
                            { text: "生成與追蹤", link: "/zh_tw/developer/entities/spawning-and-tracking" },
                            { text: "生物 AI 與目標", link: "/zh_tw/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "指令",
                        collapsed: true,
                        items: [
                            { text: "概述與排程器", link: "/zh_tw/developer/commands/" },
                            { text: "新增指令", link: "/zh_tw/developer/commands/adding-commands" },
                            { text: "引數與建議", link: "/zh_tw/developer/commands/arguments-and-suggestions" },
                            { text: "執行與上下文", link: "/zh_tw/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "插件引擎",
                        collapsed: true,
                        items: [
                            { text: "概述", link: "/zh_tw/developer/plugins/" },
                            { text: "新增插件載入器", link: "/zh_tw/developer/plugins/loaders" },
                            { text: "WASM 簽名與校驗", link: "/zh_tw/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "世界引擎", link: "/zh_tw/developer/world" },
                    { text: "行動裝置開發", link: "/zh_tw/developer/mobile" },
                ],
            },
            {
                text: "插件開發",
                items: [
                    {
                        text: "介紹",
                        link: "/zh_tw/plugin-dev/introduction",
                    },
                    {
                        text: "從 Bukkit 遷移",
                        collapsed: true,
                        items: [
                            {
                                text: "概述",
                                link: "/zh_tw/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "指令",
                                link: "/zh_tw/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "事件",
                                link: "/zh_tw/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "物品欄與 GUI",
                                link: "/zh_tw/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "設定與資料",
                                link: "/zh_tw/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "建立專案",
                                link: "/zh_tw/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "基本邏輯",
                                link: "/zh_tw/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "事件",
                                link: "/zh_tw/plugin-dev/rust/events",
                            },
                            {
                                text: "指令",
                                items: [
                                    {
                                        text: "首個指令",
                                        link: "/zh_tw/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "剪刀石頭布",
                                        link: "/zh_tw/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "授權與更新",
                                link: "/zh_tw/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入門",
                                link: "/zh_tw/plugin-dev/python/quick-start",
                            },
                            {
                                text: "基本邏輯",
                                link: "/zh_tw/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "首個指令",
                                link: "/zh_tw/plugin-dev/python/first-command",
                            },
                            {
                                text: "事件",
                                link: "/zh_tw/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入門",
                                link: "/zh_tw/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "首個指令",
                                link: "/zh_tw/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入門",
                                link: "/zh_tw/plugin-dev/c/quick-start",
                            },
                            {
                                text: "首個指令",
                                link: "/zh_tw/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入門",
                                link: "/zh_tw/plugin-dev/go/quick-start",
                            },
                            {
                                text: "基本邏輯",
                                link: "/zh_tw/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "首個指令",
                                link: "/zh_tw/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入門",
                                link: "/zh_tw/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "API 概覽",
                                link: "/zh_tw/plugin-dev/kotlin/api-overview",
                            },
                            {
                                text: "回呼參考",
                                link: "/zh_tw/plugin-dev/kotlin/callbacks",
                            },
                            {
                                text: "介面對照表",
                                link: "/zh_tw/plugin-dev/kotlin/interfaces",
                            },
                            {
                                text: "任務",
                                link: "/zh_tw/plugin-dev/kotlin/tasks",
                            },
                            {
                                text: "事件",
                                link: "/zh_tw/plugin-dev/kotlin/events",
                            },
                            {
                                text: "首個指令",
                                link: "/zh_tw/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入門",
                                link: "/zh_tw/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Zig",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入門",
                                link: "/zh_tw/plugin-dev/zig/quick-start",
                            },
                            {
                                text: "事件",
                                link: "/zh_tw/plugin-dev/zig/events",
                            },
                            {
                                text: "指令",
                                link: "/zh_tw/plugin-dev/zig/commands",
                            },
                            {
                                text: "文字",
                                link: "/zh_tw/plugin-dev/zig/text",
                            },
                            {
                                text: "選單",
                                link: "/zh_tw/plugin-dev/zig/menus",
                            },
                            {
                                text: "聊天提示",
                                link: "/zh_tw/plugin-dev/zig/prompts",
                            },
                            {
                                text: "物品",
                                link: "/zh_tw/plugin-dev/zig/items",
                            },
                            {
                                text: "排程",
                                link: "/zh_tw/plugin-dev/zig/scheduling",
                            },
                            {
                                text: "檔案與設定",
                                link: "/zh_tw/plugin-dev/zig/files",
                            },
                            {
                                text: "玩家資料",
                                link: "/zh_tw/plugin-dev/zig/player-data",
                            },
                            {
                                text: "網路",
                                link: "/zh_tw/plugin-dev/zig/networking",
                            },
                            {
                                text: "控制代碼與記憶體",
                                link: "/zh_tw/plugin-dev/zig/memory",
                            },
                            {
                                text: "更新日誌",
                                link: "/zh_tw/plugin-dev/zig/changelog",
                            },
                        ],
                    },
                    {
                        text: "TypeScript",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入門",
                                link: "/zh_tw/plugin-dev/typescript/quick-start",
                            },
                            {
                                text: "基本邏輯",
                                link: "/zh_tw/plugin-dev/typescript/basic-logic",
                            },
                            {
                                text: "首個指令",
                                link: "/zh_tw/plugin-dev/typescript/first-command",
                            },
                            {
                                text: "事件",
                                link: "/zh_tw/plugin-dev/typescript/events",
                            },
                        ],
                    },
                ],
            },
            {
                text: "故障排除",
                items: [
                    {
                        text: "常見問題",
                        link: "/zh_tw/troubleshooting/common_issues",
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
            message: "基於 MIT 授權條款釋出。",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "在 GitHub 上編輯此頁面",
        },
        lastUpdated: {
            text: "最後更新於",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
