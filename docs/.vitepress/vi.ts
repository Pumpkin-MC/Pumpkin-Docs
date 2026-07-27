import { defineConfig } from "vitepress";

export const vi = defineConfig({
    lang: "vi-VN",
    description: "Phần mềm máy chủ Minecraft hiệu năng cao được viết bằng Rust",

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
                    { text: "Đánh giá hiệu năng", link: "/vi/about/benchmarks" },
                    { text: "Trợ giúp & Quyên góp", link: "/vi/about/helping" },
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
                    { text: "Ghi log (Logging)", link: "/vi/config/logging" },
                    { text: "Truy vấn (Query)", link: "/vi/config/query" },
                    { text: "Phát trong mạng LAN", link: "/vi/config/lan-broadcast" },
                ],
            },
            {
                text: "Nhà phát triển",
                items: [
                    { text: "Đóng góp", link: "/vi/developer/contributing" },
                    { text: "Giới thiệu", link: "/vi/developer/introduction" },
                    {
                        text: "Mạng",
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
                    { text: "Lập trình di động", link: "/vi/developer/mobile" },
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
                        text: "Rust",
                        collapsed: false,
                        items: [
                            {
                                text: "Tạo dự án",
                                link: "/vi/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/vi/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Sự kiện",
                                link: "/vi/plugin-dev/rust/events",
                            },
                            {
                                text: "Lệnh",
                                items: [
                                    {
                                        text: "Lệnh đầu tiên",
                                        link: "/vi/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Oẳn tù tì (Kéo-Búa-Bao)",
                                        link: "/vi/plugin-dev/rust/command/rock-paper-scissors",
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
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/vi/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "Sự kiện",
                                link: "/vi/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: false,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/csharp/quick-start",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: false,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/c/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: false,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/vi/plugin-dev/go/basic-logic",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: false,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/kotlin/quick-start",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Xử lý sự cố",
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

        outlineTitle: "Trên trang này",
        docFooter: {
            prev: "Trang trước",
            next: "Trang tiếp theo",
        },
        returnToTopLabel: "Trở lên đầu trang",
        sidebarMenuLabel: "Trình đơn (Menu)",
        darkModeSwitchLabel: "Giao diện",
        lightModeSwitchTitle: "Chuyển sang giao diện sáng",
        darkModeSwitchTitle: "Chuyển sang giao diện tối",

        footer: {
            message: "Phát hành theo Giấy phép MIT.",
            copyright: `Bản quyền © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "Chỉnh sửa trang này trên GitHub",
        },
        lastUpdated: {
            text: "Cập nhật lần cuối",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});