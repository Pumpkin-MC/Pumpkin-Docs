import { defineConfig } from "vitepress";

export const trTR = defineConfig({
    lang: "tr-TR",
    description: "Rust ile yazılmış yüksek performanslı bir Minecraft sunucu yazılımı",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Ana Sayfa",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "Hakkında",
                items: [
                    { text: "Kıyaslamalar", link: "/tr_TR/about/benchmarks" },
                ],
            },
            {
                text: "Yapılandırma",
                items: [
                    { text: "Giriş", link: "/tr_TR/config/introduction" },
                    { text: "Temel", link: "/tr_TR/config/basic" },
                    { text: "Proxy", link: "/tr_TR/config/proxy" },
                    { text: "Kimlik Doğrulama", link: "/tr_TR/config/authentication" },
                    { text: "Sıkıştırma", link: "/tr_TR/config/compression" },
                    { text: "Kaynak Paketi", link: "/tr_TR/config/resource-pack" },
                    { text: "Komutlar", link: "/tr_TR/config/commands" },
                    { text: "RCON", link: "/tr_TR/config/rcon" },
                    { text: "PVP", link: "/tr_TR/config/pvp" },
                    { text: "Günlükleme", link: "/tr_TR/config/logging" },
                    { text: "Query", link: "/tr_TR/config/query" },
                    { text: "LAN Yayını", link: "/tr_TR/config/lan-broadcast" },
                ],
            },
            {
                text: "Geliştiriciler",
                items: [
                    { text: "Katkıda Bulunma", link: "/tr_TR/developer/contributing" },
                    { text: "Giriş", link: "/tr_TR/developer/introduction" },
                    {
                        text: "Ağ",
                        link: "/tr_TR/developer/networking/networking",
                        items: [
                            {
                                text: "Kimlik Doğrulama",
                                link: "/tr_TR/developer/networking/authentication",
                            },
                            {
                                text: "RCON",
                                link: "/tr_TR/developer/networking/rcon",
                            },
                        ],
                    },
                    { text: "Dünya", link: "/tr_TR/developer/world" },
                    { text: "Mobil geliştirme", link: "/tr_TR/developer/mobile" },
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
                        text: "Eklenti Şablonu",
                        link: "/tr_TR/plugin-dev/plugin-template/introduction",
                        items: [
                            {
                                text: "Proje Oluşturma",
                                link: "/tr_TR/plugin-dev/plugin-template/creating-project",
                            },
                            {
                                text: "Temel Mantık",
                                link: "/tr_TR/plugin-dev/plugin-template/basic-logic",
                            },
                            {
                                text: "Katılma Olayı",
                                link: "/tr_TR/plugin-dev/plugin-template/join-event",
                            },
                            {
                                text: "Taş-Kağıt-Makas Komutu",
                                link: "/tr_TR/plugin-dev/plugin-template/rock-paper-scissors",
                            },
                            {
                                text: "Envanterler",
                                link: "/tr_TR/plugin-dev/plugin-template/inventories",
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
                        link: "/tr_TR/troubleshooting/common_issues.md",
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
            message: "MIT Lisansı altında yayımlanmıştır.",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Website/blob/master/docs/:path",
            text: "Bu sayfayı GitHub'da düzenle",
        },
        lastUpdated: {
            text: "Güncellenme",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
