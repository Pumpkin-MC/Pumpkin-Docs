import { defineConfig } from "vitepress";

export const jaJP = defineConfig({
    lang: "ja-JP",
    description: "Rust で書かれた高性能 Minecraft サーバーソフトウェア",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "ホーム",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "概要",
                items: [
                    { text: "ベンチマーク", link: "/ja_jp/about/benchmarks" },
                ],
            },
            {
                text: "設定",
                items: [
                    { text: "はじめに", link: "/ja_jp/config/introduction" },
                    { text: "基本設定", link: "/ja_jp/config/basic" },
                    { text: "プロキシ", link: "/ja_jp/config/proxy" },
                    { text: "認証", link: "/ja_jp/config/authentication" },
                    { text: "圧縮", link: "/ja_jp/config/compression" },
                    { text: "リソースパック", link: "/ja_jp/config/resource-pack" },
                    { text: "コマンド", link: "/ja_jp/config/commands" },
                    { text: "RCON", link: "/ja_jp/config/rcon" },
                    { text: "PVP", link: "/ja_jp/config/pvp" },
                    { text: "ロギング", link: "/ja_jp/config/logging" },
                    { text: "Query", link: "/ja_jp/config/query" },
                    { text: "LAN ブロードキャスト", link: "/ja_jp/config/lan-broadcast" },
                ],
            },
            {
                text: "開発者",
                items: [
                    { text: "貢献ガイド", link: "/ja_jp/developer/contributing" },
                    { text: "はじめに", link: "/ja_jp/developer/introduction" },
                    {
                        text: "ネットワーキング",
                        link: "/ja_jp/developer/networking/networking",
                        items: [
                            {
                                text: "認証",
                                link: "/ja_jp/developer/networking/authentication",
                            },
                            {
                                text: "RCON",
                                link: "/ja_jp/developer/networking/rcon",
                            },
                        ],
                    },
                    { text: "ワールド", link: "/ja_jp/developer/world" },
                    { text: "モバイル開発", link: "/ja_jp/developer/mobile" },
                ],
            },
            {
                text: "プラグイン開発",
                items: [
                    {
                        text: "はじめに",
                        link: "/ja_jp/plugin-dev/introduction",
                    },
                    {
                        text: "Rust",
                        collapsed: false,
                        items: [
                            {
                                text: "プロジェクトの作成",
                                link: "/ja_jp/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "基本ロジック",
                                link: "/ja_jp/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "イベント",
                                link: "/ja_jp/plugin-dev/rust/events",
                            },
                            {
                                text: "コマンド",
                                items: [
                                    {
                                        text: "最初のコマンド",
                                        link: "/ja_jp/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "じゃんけん",
                                        link: "/ja_jp/plugin-dev/rust/command/rock-paper-scissors",
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
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/python/quick-start",
                            },
                            {
                                text: "基本ロジック",
                                link: "/ja_jp/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "イベント",
                                link: "/ja_jp/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: false,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/csharp/quick-start",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: false,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/c/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: false,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/go/quick-start",
                            },
                            {
                                text: "基本ロジック",
                                link: "/ja_jp/plugin-dev/go/basic-logic",
                            },
                        ],
                    },
                ],
            },
            {
                text: "トラブルシューティング",
                items: [
                    {
                        text: "よくある問題",
                        link: "/ja_jp/troubleshooting/common_issues.md",
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
            message: "MIT ライセンスの下で公開されています。",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "GitHub でこのページを編集する",
        },
        lastUpdated: {
            text: "最終更新",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
