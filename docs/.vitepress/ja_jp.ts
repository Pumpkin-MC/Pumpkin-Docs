import { defineConfig } from "vitepress";

export const jaJP = defineConfig({
    lang: "ja-JP",
    description: "Rust で書かれた高性能 Minecraft サーバーソフトウェア",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "管理",
                link: "/ja_jp/admin/introduction",
            },
            {
                text: "開発者・貢献者",
                link: "/ja_jp/developer/introduction",
            },
            {
                text: "プラグイン",
                link: "/ja_jp/plugin-dev/introduction",
            },
            {
                text: "ウェブサイト",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "概要",
                items: [
                    { text: "ヘルプと寄付", link: "/ja_jp/about/helping" },
                ],
            },
            {
                text: "管理",
                collapsed: false,
                items: [
                    { text: "概要", link: "/ja_jp/admin/introduction" },
                    { text: "Bukkit からの移行", link: "/ja_jp/admin/migrating-from-bukkit" },
                    {
                        text: "設定",
                        collapsed: true,
                        items: [
                            { text: "はじめに", link: "/ja_jp/config/introduction" },
                            { text: "基本設定", link: "/ja_jp/config/basic" },
                            { text: "ワールド", link: "/ja_jp/config/world" },
                            { text: "チャット・スパム防止", link: "/ja_jp/config/chat" },
                            { text: "コマンド", link: "/ja_jp/config/commands" },
                            { text: "Bedrock & NetherNet", link: "/ja_jp/config/bedrock" },
                            { text: "プロキシ", link: "/ja_jp/config/proxy" },
                            { text: "認証", link: "/ja_jp/config/authentication" },
                            { text: "パケットリミッター", link: "/ja_jp/config/packet-limiter" },
                            { text: "圧縮", link: "/ja_jp/config/compression" },
                            { text: "リソースパック", link: "/ja_jp/config/resource-pack" },
                            { text: "プラグイン", link: "/ja_jp/config/plugins" },
                            { text: "サーバーリンク", link: "/ja_jp/config/server-links" },
                            { text: "プレイヤーデータ", link: "/ja_jp/config/player-data" },
                            { text: "ロギング", link: "/ja_jp/config/logging" },
                            { text: "Query", link: "/ja_jp/config/query" },
                            { text: "RCON", link: "/ja_jp/config/rcon" },
                            { text: "PVP", link: "/ja_jp/config/pvp" },
                            { text: "LAN ブロードキャスト", link: "/ja_jp/config/lan-broadcast" },
                        ],
                    },
                ],
            },
            {
                text: "開発者",
                items: [
                    { text: "はじめに", link: "/ja_jp/developer/introduction" },
                    { text: "貢献ガイド", link: "/ja_jp/developer/contributing" },
                    { text: "アーキテクチャ", link: "/ja_jp/developer/architecture" },
                    { text: "データ抽出ツール", link: "/ja_jp/developer/extractor" },
                    { text: "コード生成", link: "/ja_jp/developer/codegen" },
                    { text: "バージョン移行", link: "/ja_jp/developer/porting-versions" },
                    {
                        text: "ネットワーキング",
                        collapsed: true,
                        items: [
                            {
                                text: "はじめに",
                                link: "/ja_jp/developer/networking/",
                            },
                            {
                                text: "メタデータと同期データ",
                                link: "/ja_jp/developer/networking/metadata",
                            },
                            {
                                text: "Java Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概要",
                                        link: "/ja_jp/developer/networking/java/overview",
                                    },
                                    {
                                        text: "パケットの追加",
                                        link: "/ja_jp/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "認証",
                                        link: "/ja_jp/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Bedrock Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概要",
                                        link: "/ja_jp/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "パケットの追加",
                                        link: "/ja_jp/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "認証",
                                        link: "/ja_jp/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/ja_jp/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "プロキシ転送",
                                collapsed: true,
                                items: [
                                    {
                                        text: "概要",
                                        link: "/ja_jp/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/ja_jp/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/ja_jp/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/ja_jp/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/ja_jp/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/ja_jp/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "ブロック",
                        collapsed: true,
                        items: [
                            { text: "概要", link: "/ja_jp/developer/blocks/" },
                            { text: "ブロックの追加", link: "/ja_jp/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "アイテム",
                        collapsed: true,
                        items: [
                            { text: "概要", link: "/ja_jp/developer/items/" },
                            { text: "アイテムの追加", link: "/ja_jp/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "エンティティ",
                        collapsed: true,
                        items: [
                            { text: "概要と階層", link: "/ja_jp/developer/entities/" },
                            { text: "スポーンと追跡", link: "/ja_jp/developer/entities/spawning-and-tracking" },
                            { text: "Mob AI とゴール", link: "/ja_jp/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "コマンド",
                        collapsed: true,
                        items: [
                            { text: "概要とディスパッチャー", link: "/ja_jp/developer/commands/" },
                            { text: "コマンドの追加", link: "/ja_jp/developer/commands/adding-commands" },
                            { text: "引数とサジェスト", link: "/ja_jp/developer/commands/arguments-and-suggestions" },
                            { text: "実行とコンテキスト", link: "/ja_jp/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "プラグインエンジン",
                        collapsed: true,
                        items: [
                            { text: "概要", link: "/ja_jp/developer/plugins/" },
                            { text: "プラグインローダーの追加", link: "/ja_jp/developer/plugins/loaders" },
                            { text: "WASM 署名と検証", link: "/ja_jp/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "ワールドエンジン", link: "/ja_jp/developer/world" },
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
                        text: "Bukkit からの移行",
                        collapsed: true,
                        items: [
                            {
                                text: "概要",
                                link: "/ja_jp/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "コマンド",
                                link: "/ja_jp/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "イベント",
                                link: "/ja_jp/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "インベントリ & GUI",
                                link: "/ja_jp/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "設定とデータ",
                                link: "/ja_jp/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
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
                            {
                                text: "ライセンスとアップデート",
                                link: "/ja_jp/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
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
                                text: "最初のコマンド",
                                link: "/ja_jp/plugin-dev/python/first-command",
                            },
                            {
                                text: "イベント",
                                link: "/ja_jp/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "最初のコマンド",
                                link: "/ja_jp/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/c/quick-start",
                            },
                            {
                                text: "最初のコマンド",
                                link: "/ja_jp/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/go/quick-start",
                            },
                            {
                                text: "基本ロジック",
                                link: "/ja_jp/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "最初のコマンド",
                                link: "/ja_jp/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "最初のコマンド",
                                link: "/ja_jp/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Zig",
                        collapsed: true,
                        items: [
                            {
                                text: "クイックスタート",
                                link: "/ja_jp/plugin-dev/zig/quick-start",
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
                        link: "/ja_jp/troubleshooting/common_issues",
                    },
                ],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/Pumpkin-MC/Pumpkin" },
            { icon: "discord", link: "https://discord.gg/RNm224ZsDq" },
        ],

        logo: "/assets/icon.svg",
        footer: {
            message: "MIT ライセンスの下でリリースされています。",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "GitHub でこのページを編集",
        },
        lastUpdated: {
            text: "最終更新日",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
