import { defineConfig } from "vitepress";

export const zhCN = defineConfig({
    lang: "zh-CN",
    description: "一款用 Rust 编写的高性能 Minecraft 服务器软件",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "文档",
                link: "/zh_cn/about/introduction",
            },
        ],
        sidebar: [
            {
                text: "关于",
                items: [
                    { text: "性能基准", link: "/zh_cn/about/benchmarks" },
                ],
            },
            {
                text: "配置",
                items: [
                    { text: "介绍", link: "/zh_cn/config/introduction" },
                    { text: "基础配置", link: "/zh_cn/config/basic" },
                    { text: "代理", link: "/zh_cn/config/proxy" },
                    { text: "身份验证", link: "/zh_cn/config/authentication" },
                    { text: "压缩", link: "/zh_cn/config/compression" },
                    { text: "资源包", link: "/zh_cn/config/resource-pack" },
                    { text: "命令", link: "/zh_cn/config/commands" },
                    { text: "RCON", link: "/zh_cn/config/rcon" },
                    { text: "PVP", link: "/zh_cn/config/pvp" },
                    { text: "日志", link: "/zh_cn/config/logging" },
                    { text: "查询", link: "/zh_cn/config/query" },
                    { text: "局域网广播", link: "/zh_cn/config/lan-broadcast" },
                ],
            },
            {
                text: "开发者",
                items: [
                    { text: "贡献指南", link: "/zh_cn/developer/contributing" },
                    { text: "介绍", link: "/zh_cn/developer/introduction" },
                    {
                        text: "网络",
                        link: "/zh_cn/developer/networking/networking",
                        items: [
                            {
                                text: "身份验证",
                                link: "/zh_cn/developer/networking/authentication",
                            },
                            {
                                text: "RCON",
                                link: "/zh_cn/developer/networking/rcon",
                            },
                        ],
                    },
                    { text: "世界", link: "/zh_cn/developer/world" },
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
                        text: "Rust",
                        collapsed: false,
                        items: [
                            {
                                text: "创建项目",
                                link: "/zh_cn/plugin-dev/plugin-template/creating-project",
                            },
                            {
                                text: "基本逻辑",
                                link: "/zh_cn/plugin-dev/plugin-template/basic-logic",
                            },
                            {
                                text: "事件",
                                items: [
                                    { text: "加入事件", link: "/zh_cn/plugin-dev/plugin-template/join-event" },
                                ]
                            },
                            {
                                text: "命令",
                                items: [
                                    {
                                        text: "第一个命令",
                                        link: "/zh_cn/plugin-dev/plugin-template/command/first-command"
                                    },
                                    {
                                        text: "剪刀石头布",
                                        link: "/zh_cn/plugin-dev/plugin-template/command/rock-paper-scissors"
                                    },
                                ]
                            },
                            {
                                text: "背包",
                                link: "/zh_cn/plugin-dev/plugin-template/inventories",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: false,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/zh_cn/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Basic Logic",
                                link: "/zh_cn/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "Events",
                                link: "/zh_cn/plugin-dev/python/events",
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
                        link: "/zh_cn/troubleshooting/common_issues.md",
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
            message: "基于 MIT 许可证发布。",
            copyright: `版权所有 © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "在 GitHub 上编辑此页面",
        },
        lastUpdated: {
            text: "更新于",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
