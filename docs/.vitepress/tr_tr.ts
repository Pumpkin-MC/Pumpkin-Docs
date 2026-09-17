import { defineConfig } from "vitepress";

export const trTR = defineConfig({
    lang: "tr-TR",
    description: "Rust ile yazılmış yüksek performanslı Minecraft sunucu yazılımı",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Yönetim",
                link: "/tr_TR/admin/introduction",
            },
            {
                text: "Geliştiriciler",
                link: "/tr_TR/developer/introduction",
            },
            {
                text: "Eklentiler",
                link: "/tr_TR/plugin-dev/introduction",
            },
            {
                text: "Web Sitesi",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "Hakkında",
                items: [
                    { text: "Yardım & Bağış", link: "/tr_TR/about/helping" },
                ],
            },
            {
                text: "Yönetim",
                collapsed: false,
                items: [
                    { text: "Genel Bakış", link: "/tr_TR/admin/introduction" },
                    { text: "Bukkit'ten Geçiş", link: "/tr_TR/admin/migrating-from-bukkit" },
                    {
                        text: "Yapılandırma",
                        collapsed: true,
                        items: [
                            { text: "Giriş", link: "/tr_TR/config/introduction" },
                            { text: "Temel", link: "/tr_TR/config/basic" },
                            { text: "Dünya", link: "/tr_TR/config/world" },
                            { text: "Sohbet & Anti-Spam", link: "/tr_TR/config/chat" },
                            { text: "Komutlar", link: "/tr_TR/config/commands" },
                            { text: "Bedrock & NetherNet", link: "/tr_TR/config/bedrock" },
                            { text: "Proxy", link: "/tr_TR/config/proxy" },
                            { text: "Kimlik Doğrulama", link: "/tr_TR/config/authentication" },
                            { text: "Paket Sınırlayıcı", link: "/tr_TR/config/packet-limiter" },
                            { text: "Sıkıştırma", link: "/tr_TR/config/compression" },
                            { text: "Kaynak Paketi", link: "/tr_TR/config/resource-pack" },
                            { text: "Eklentiler", link: "/tr_TR/config/plugins" },
                            { text: "Sunucu Bağlantıları", link: "/tr_TR/config/server-links" },
                            { text: "Oyuncu Verileri", link: "/tr_TR/config/player-data" },
                            { text: "Günlük Kaydı (Logging)", link: "/tr_TR/config/logging" },
                            { text: "Query", link: "/tr_TR/config/query" },
                            { text: "RCON", link: "/tr_TR/config/rcon" },
                            { text: "PVP", link: "/tr_TR/config/pvp" },
                            { text: "LAN Yayını", link: "/tr_TR/config/lan-broadcast" },
                        ],
                    },
                ],
            },
            {
                text: "Geliştiriciler",
                items: [
                    { text: "Giriş", link: "/tr_TR/developer/introduction" },
                    { text: "Katkı Kılavuzu", link: "/tr_TR/developer/contributing" },
                    { text: "Mimari", link: "/tr_TR/developer/architecture" },
                    { text: "Veri Çıkarıcı", link: "/tr_TR/developer/extractor" },
                    { text: "Kod Üretimi", link: "/tr_TR/developer/codegen" },
                    { text: "Sürüm Yükseltme", link: "/tr_TR/developer/porting-versions" },
                    {
                        text: "Ağ İletişimi",
                        collapsed: true,
                        items: [
                            {
                                text: "Giriş",
                                link: "/tr_TR/developer/networking/",
                            },
                            {
                                text: "Meta Veriler & Senkronize Veriler",
                                link: "/tr_TR/developer/networking/metadata",
                            },
                            {
                                text: "Java Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Genel Bakış",
                                        link: "/tr_TR/developer/networking/java/overview",
                                    },
                                    {
                                        text: "Paket Ekleme",
                                        link: "/tr_TR/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "Kimlik Doğrulama",
                                        link: "/tr_TR/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Bedrock Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Genel Bakış",
                                        link: "/tr_TR/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "Paket Ekleme",
                                        link: "/tr_TR/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "Kimlik Doğrulama",
                                        link: "/tr_TR/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/tr_TR/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "Proxy Yönlendirme",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Genel Bakış",
                                        link: "/tr_TR/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/tr_TR/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/tr_TR/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/tr_TR/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/tr_TR/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/tr_TR/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "Bloklar",
                        collapsed: true,
                        items: [
                            { text: "Genel Bakış", link: "/tr_TR/developer/blocks/" },
                            { text: "Blok Ekleme", link: "/tr_TR/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "Eşyalar",
                        collapsed: true,
                        items: [
                            { text: "Genel Bakış", link: "/tr_TR/developer/items/" },
                            { text: "Eşya Ekleme", link: "/tr_TR/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "Varlıklar",
                        collapsed: true,
                        items: [
                            { text: "Genel Bakış & Hiyerarşi", link: "/tr_TR/developer/entities/" },
                            { text: "Oluşum & Takip", link: "/tr_TR/developer/entities/spawning-and-tracking" },
                            { text: "Yaratık Yapay Zekası & Hedefler", link: "/tr_TR/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "Komutlar",
                        collapsed: true,
                        items: [
                            { text: "Genel Bakış & Dağıtıcı", link: "/tr_TR/developer/commands/" },
                            { text: "Komut Ekleme", link: "/tr_TR/developer/commands/adding-commands" },
                            { text: "Argümanlar & Öneriler", link: "/tr_TR/developer/commands/arguments-and-suggestions" },
                            { text: "Çalıştırma & Bağlam", link: "/tr_TR/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "Eklenti Motoru",
                        collapsed: true,
                        items: [
                            { text: "Genel Bakış", link: "/tr_TR/developer/plugins/" },
                            { text: "Eklenti Yükleyici Ekleme", link: "/tr_TR/developer/plugins/loaders" },
                            { text: "WASM İmzalama & Doğrulama", link: "/tr_TR/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "Dünya Motoru", link: "/tr_TR/developer/world" },
                    { text: "Mobil Geliştirme", link: "/tr_TR/developer/mobile" },
                ],
            },
            {
                text: "Eklenti Geliştirme",
                items: [
                    {
                        text: "Giriş",
                        link: "/tr_TR/plugin-dev/introduction",
                    },
                    {
                        text: "Bukkit'ten Geçiş",
                        collapsed: true,
                        items: [
                            {
                                text: "Genel Bakış",
                                link: "/tr_TR/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "Komutlar",
                                link: "/tr_TR/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "Olaylar (Events)",
                                link: "/tr_TR/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "Envanterler & Arayüzler",
                                link: "/tr_TR/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "Yapılandırma & Veri",
                                link: "/tr_TR/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "Proje Oluşturma",
                                link: "/tr_TR/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Temel Mantık",
                                link: "/tr_TR/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Olaylar (Events)",
                                link: "/tr_TR/plugin-dev/rust/events",
                            },
                            {
                                text: "Komutlar",
                                items: [
                                    {
                                        text: "İlk Komut",
                                        link: "/tr_TR/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Taş-Kağıt-Makas",
                                        link: "/tr_TR/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "Lisanslama & Güncellemeler",
                                link: "/tr_TR/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
                        items: [
                            {
                                text: "Hızlı Başlangıç",
                                link: "/tr_TR/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Temel Mantık",
                                link: "/tr_TR/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "İlk Komut",
                                link: "/tr_TR/plugin-dev/python/first-command",
                            },
                            {
                                text: "Olaylar (Events)",
                                link: "/tr_TR/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "Hızlı Başlangıç",
                                link: "/tr_TR/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "İlk Komut",
                                link: "/tr_TR/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "Hızlı Başlangıç",
                                link: "/tr_TR/plugin-dev/c/quick-start",
                            },
                            {
                                text: "İlk Komut",
                                link: "/tr_TR/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "Hızlı Başlangıç",
                                link: "/tr_TR/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Temel Mantık",
                                link: "/tr_TR/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "İlk Komut",
                                link: "/tr_TR/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "Hızlı Başlangıç",
                                link: "/tr_TR/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "İlk Komut",
                                link: "/tr_TR/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "Hızlı Başlangıç",
                                link: "/tr_TR/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Sorun Giderme",
                items: [
                    {
                        text: "Yaygın Sorunlar",
                        link: "/tr_TR/troubleshooting/common_issues",
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
            message: "MIT Lisansı altında yayınlandı.",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "Bu sayfayı GitHub'da düzenleyin",
        },
        lastUpdated: {
            text: "Son güncelleme",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
