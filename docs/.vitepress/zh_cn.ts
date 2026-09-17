import { defineConfig } from "vitepress";

export const zhCN = defineConfig({
    lang: "zh-CN",
    description: "使用 Rust 编写的高性能 Minecraft 服务器软件",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "管理",
                link: "/zh_cn/admin/introduction",
            },
            {
                text: "贡献者",
                link: "/zh_cn/developer/introduction",
            },
            {
                text: "插件开发",
                link: "/zh_cn/plugin-dev/introduction",
            },
            {
                text: "官网",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "关于",
                items: [
                    { text: "帮助与捐赠", link: "/zh_cn/about/helping" },
                ],
            },
            {
                text: "管理",
                collapsed: false,
                items: [
                    { text: "概述", link: "/zh_cn/admin/introduction" },
                    { text: "从 Bukkit 迁移", link: "/zh_cn/admin/migrating-from-bukkit" },
                    {
                        text: "配置",
                        collapsed: true,
                        items: [
                            { text: "介绍", link: "/zh_cn/config/introduction" },
                            { text: "基础配置", link: "/zh_cn/config/basic" },
                            { text: "世界", link: "/zh_cn/config/world" },
                            { text: "聊天与反垃圾", link: "/zh_cn/config/chat" },
                            { text: "命令", link: "/zh_cn/config/commands" },
                            { text: "基岩版与 NetherNet", link: "/zh_cn/config/bedrock" },
                            { text: "代理", link: "/zh_cn/config/proxy" },
                            { text: "身份验证", link: "/zh_cn/config/authentication" },
                            { text: "数据包限制器", link: "/zh_cn/config/packet-limiter" },
                            { text: "压缩", link: "/zh_cn/config/compression" },
                            { text: "资源包", link: "/zh_cn/config/resource-pack" },
                            { text: "插件", link: "/zh_cn/config/plugins" },
                            { text: "服务器链接", link: "/zh_cn/config/server-links" },
                            { text: "玩家数据", link: "/zh_cn/config/player-data" },
                            { text: "日志", link: "/zh_cn/config/logging" },
                            { text: "Query", link: "/zh_cn/config/query" },
                            { text: "RCON", link: "/zh_cn/config/rcon" },
                            { text: "PVP", link: "/zh_cn/config/pvp" },
                            { text: "局域网广播", link: "/zh_cn/config/lan-broadcast" },
                        ],
                    },
                ],
            },
            {
                text: "贡献者",
                items: [
                    { text: "介绍", link: "/zh_cn/developer/introduction" },
                    { text: "贡献指南", link: "/zh_cn/developer/contributing" },
                    { text: "架构", link: "/zh_cn/developer/architecture" },
                    { text: "数据提取器", link: "/zh_cn/developer/extractor" },
                    { text: "代码生成", link: "/zh_cn/developer/codegen" },
                    { text: "版本迁移", link: "/zh_cn/developer/porting-versions" },
                    {
                        text: "网络",
                        collapsed: true,
                        items: [
                            {
                                text: "介绍",
                                link: "/zh_cn/developer/networking/",
                            },
                            {
                                text: "元数据与同步数据",
                                link: "/zh_cn/developer/networking/metadata",
                            },
                            {
                                text: "Java Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概述",
                                        link: "/zh_cn/developer/networking/java/overview",
                                    },
                                    {
                                        text: "添加数据包",
                                        link: "/zh_cn/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "身份验证",
                                        link: "/zh_cn/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Bedrock Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概述",
                                        link: "/zh_cn/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "添加数据包",
                                        link: "/zh_cn/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "身份验证",
                                        link: "/zh_cn/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/zh_cn/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "代理转发",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概述",
                                        link: "/zh_cn/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/zh_cn/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/zh_cn/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/zh_cn/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/zh_cn/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/zh_cn/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "方块",
                        collapsed: true,
                        items: [
                            { text: "概述", link: "/zh_cn/developer/blocks/" },
                            { text: "添加方块", link: "/zh_cn/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "物品",
                        collapsed: true,
                        items: [
                            { text: "概述", link: "/zh_cn/developer/items/" },
                            { text: "添加物品", link: "/zh_cn/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "实体",
                        collapsed: true,
                        items: [
                            { text: "概述与层级", link: "/zh_cn/developer/entities/" },
                            { text: "生成与追踪", link: "/zh_cn/developer/entities/spawning-and-tracking" },
                            { text: "生物 AI 与目标", link: "/zh_cn/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "命令",
                        collapsed: true,
                        items: [
                            { text: "概述与调度器", link: "/zh_cn/developer/commands/" },
                            { text: "添加命令", link: "/zh_cn/developer/commands/adding-commands" },
                            { text: "参数与建议", link: "/zh_cn/developer/commands/arguments-and-suggestions" },
                            { text: "执行与上下文", link: "/zh_cn/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "插件引擎",
                        collapsed: true,
                        items: [
                            { text: "概述", link: "/zh_cn/developer/plugins/" },
                            { text: "添加插件加载器", link: "/zh_cn/developer/plugins/loaders" },
                            { text: "WASM 签名与校验", link: "/zh_cn/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "世界引擎", link: "/zh_cn/developer/world" },
                    { text: "移动端开发", link: "/zh_cn/developer/mobile" },
                ],
            },
            {
                text: "插件开发",
                items: [
                    {
                        text: "介绍",
                        link: "/zh_cn/plugin-dev/introduction",
                    },
                    {
                        text: "从 Bukkit 迁移",
                        collapsed: true,
                        items: [
                            {
                                text: "概述",
                                link: "/zh_cn/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "命令",
                                link: "/zh_cn/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "事件",
                                link: "/zh_cn/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "物品栏与 GUI",
                                link: "/zh_cn/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "配置与数据",
                                link: "/zh_cn/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "创建项目",
                                link: "/zh_cn/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "基本逻辑",
                                link: "/zh_cn/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "事件",
                                link: "/zh_cn/plugin-dev/rust/events",
                            },
                            {
                                text: "命令",
                                items: [
                                    {
                                        text: "首个命令",
                                        link: "/zh_cn/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "剪刀石头布",
                                        link: "/zh_cn/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "许可证与更新",
                                link: "/zh_cn/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入门",
                                link: "/zh_cn/plugin-dev/python/quick-start",
                            },
                            {
                                text: "基本逻辑",
                                link: "/zh_cn/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "首个命令",
                                link: "/zh_cn/plugin-dev/python/first-command",
                            },
                            {
                                text: "事件",
                                link: "/zh_cn/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入门",
                                link: "/zh_cn/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "首个命令",
                                link: "/zh_cn/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入门",
                                link: "/zh_cn/plugin-dev/c/quick-start",
                            },
                            {
                                text: "首个命令",
                                link: "/zh_cn/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入门",
                                link: "/zh_cn/plugin-dev/go/quick-start",
                            },
                            {
                                text: "基本逻辑",
                                link: "/zh_cn/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "首个命令",
                                link: "/zh_cn/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入门",
                                link: "/zh_cn/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "首个命令",
                                link: "/zh_cn/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "快速入门",
                                link: "/zh_cn/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                ],
            },
            {
                text: "故障排除",
                items: [
                    {
                        text: "常见问题",
                        link: "/zh_cn/troubleshooting/common_issues",
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
            message: "基于 MIT 许可发布。",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "在 GitHub 上编辑此页面",
        },
        lastUpdated: {
            text: "最后更新于",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
