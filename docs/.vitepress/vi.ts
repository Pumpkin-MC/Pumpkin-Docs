import { defineConfig } from "vitepress";

export const vi = defineConfig({
    lang: "vi-VN",
    description: "Một Minecraft server software hiệu năng cao được viết bằng Rust",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Trang chủ",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "Giới thiệu",
                items: [
                    { text: "Benchmark", link: "/vi/about/benchmarks" },
                ],
            },
            {
                text: "Cấu hình",
                items: [
                    { text: "Giới thiệu", link: "/vi/config/introduction" },
                    { text: "Cơ bản", link: "/vi/config/basic" },
                    { text: "Proxy", link: "/vi/config/proxy" },
                    { text: "Xác thực", link: "/vi/config/authentication" },
                    { text: "Nén dữ liệu", link: "/vi/config/compression" },
                    { text: "Gói tài nguyên", link: "/vi/config/resource-pack" },
                    { text: "Lệnh", link: "/vi/config/commands" },
                    { text: "RCON", link: "/vi/config/rcon" },
                    { text: "PVP", link: "/vi/config/pvp" },
                    { text: "Ghi log", link: "/vi/config/logging" },
                    { text: "Query", link: "/vi/config/query" },
                    { text: "Mạng LAN", link: "/vi/config/lan-broadcast" },
                ],
            },
            {
                text: "Nhà phát triển",
                items: [
                    { text: "Cộng tác", link: "/vi/developer/contributing" },
                    { text: "Giới thiệu", link: "/vi/developer/introduction" },
                    {
                        text: "Network",
                        link: "/vi/developer/networking/networking",
                        items: [
                            {
                                text: "Xác thực",
                                link: "/vi/developer/networking/authentication",
                            },
                            {
                                text: "RCON",
                                link: "/vi/developer/networking/rcon",
                            },
                        ],
                    },
                    { text: "Thế giới", link: "/vi/developer/world" },
                    { text: "Di động", link: "/vi/developer/mobile" },
                ],
            },
            {
                text: "Phát triển Plugin",
                items: [
                    {
                        text: "Giới thiệu",
                        link: "/vi/plugin-dev/introduction",
                    },
                    {
                        text: "Plugin mẫu",
                        collapsed: false,
                        items: [
                            {
                                text: "Tạo dự án",
                                link: "/vi/plugin-dev/plugin-template/creating-project",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/vi/plugin-dev/plugin-template/basic-logic",
                            },
                            {
                                text: "Events",
                                items: [
                                    { text: "Event vào game", link: "/vi/plugin-dev/plugin-template/join-event" },
                                ]
                            },
                            {
                                text: "Lệnh",
                                items: [
                                    {
                                        text: "Lệnh đầu tiên",
                                        link: "/vi/plugin-dev/plugin-template/command/first-command"
                                    },
                                    {
                                        text: "Kéo búa bao",
                                        link: "/vi/plugin-dev/plugin-template/command/rock-paper-scissors"
                                    },
                                ]
                            },
                            {
                                text: "Kho đồ",
                                link: "/vi/plugin-dev/plugin-template/inventories",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Chuẩn đoán lỗi",
                items: [
                    {
                        text: "Các vấn đề thường gặp",
                        link: "/vi/troubleshooting/common_issues.md",
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
            text: "Chỉnh sửa trang này trên GitHub",
        },
        lastUpdated: {
            text: "Cập nhật vào",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
