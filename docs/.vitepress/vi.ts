import { defineConfig } from "vitepress";

export const vi = defineConfig({
    lang: "vi-VN",
    description: "Một phần mềm máy chủ Minecraft hiệu năng cao được viết bằng Rust",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Đánh giá hiệu năng",
                link: "/vi/about/benchmarks",
            },
            {
                text: "Quản trị",
                link: "/vi/admin/introduction",
            },
            {
                text: "Người đóng góp",
                link: "/vi/developer/introduction",
            },
            {
                text: "Plugins",
                link: "/vi/plugin-dev/introduction",
            },
            {
                text: "Website",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "Giới thiệu",
                items: [
                    { text: "Đánh giá hiệu năng", link: "/vi/about/benchmarks" },
                    { text: "Giúp đỡ & Ủng hộ", link: "/vi/about/helping" },
                ],
            },
            {
                text: "Quản trị",
                collapsed: false,
                items: [
                    { text: "Tổng quan", link: "/vi/admin/introduction" },
                    { text: "Chuyển từ Bukkit", link: "/vi/admin/migrating-from-bukkit" },
                    {
                        text: "Cấu hình",
                        collapsed: true,
                        items: [
                            { text: "Giới thiệu", link: "/vi/config/introduction" },
                            { text: "Cơ bản", link: "/vi/config/basic" },
                            { text: "Thế giới", link: "/vi/config/world" },
                            { text: "Chat & Chống Spam", link: "/vi/config/chat" },
                            { text: "Lệnh (Commands)", link: "/vi/config/commands" },
                            { text: "Bedrock & NetherNet", link: "/vi/config/bedrock" },
                            { text: "Proxy", link: "/vi/config/proxy" },
                            { text: "Xác thực", link: "/vi/config/authentication" },
                            { text: "Giới hạn gói tin (Packet Limiter)", link: "/vi/config/packet-limiter" },
                            { text: "Nén dữ liệu", link: "/vi/config/compression" },
                            { text: "Gói tài nguyên (Resource Pack)", link: "/vi/config/resource-pack" },
                            { text: "Plugins", link: "/vi/config/plugins" },
                            { text: "Liên kết máy chủ", link: "/vi/config/server-links" },
                            { text: "Dữ liệu người chơi", link: "/vi/config/player-data" },
                            { text: "Nhật ký (Logging)", link: "/vi/config/logging" },
                            { text: "Query", link: "/vi/config/query" },
                            { text: "Quản lý (MSMP)", link: "/vi/config/management" },
                            { text: "PVP", link: "/vi/config/pvp" },
                            { text: "Phát sóng mạng LAN", link: "/vi/config/lan-broadcast" },
                            { text: "Thu thập dữ liệu đo từ xa (Telemetry)", link: "/vi/config/telemetry" },
                        ],
                    },
                ],
            },
            {
                text: "Người đóng góp",
                items: [
                    { text: "Giới thiệu", link: "/vi/developer/introduction" },
                    { text: "Hướng dẫn đóng góp", link: "/vi/developer/contributing" },
                    { text: "Kiến trúc", link: "/vi/developer/architecture" },
                    { text: "Trích xuất dữ liệu (Data Extractor)", link: "/vi/developer/extractor" },
                    { text: "Tạo mã nguồn (Code Generation)", link: "/vi/developer/codegen" },
                    { text: "Chuyển giao phiên bản (Porting Versions)", link: "/vi/developer/porting-versions" },
                    {
                        text: "Mạng (Networking)",
                        collapsed: true,
                        items: [
                            {
                                text: "Giới thiệu",
                                link: "/vi/developer/networking/",
                            },
                            {
                                text: "Metadata & Dữ liệu đồng bộ",
                                link: "/vi/developer/networking/metadata",
                            },
                            {
                                text: "Phiên bản Java (Java Edition)",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Tổng quan",
                                        link: "/vi/developer/networking/java/overview",
                                    },
                                    {
                                        text: "Thêm một gói tin (Packet)",
                                        link: "/vi/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "Xác thực",
                                        link: "/vi/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Phiên bản Bedrock (Bedrock Edition)",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Tổng quan",
                                        link: "/vi/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "Thêm một gói tin (Packet)",
                                        link: "/vi/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "Xác thực",
                                        link: "/vi/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/vi/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "Chuyển tiếp Proxy (Proxy Forwarding)",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Tổng quan",
                                        link: "/vi/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/vi/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/vi/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/vi/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/vi/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/vi/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "Khối (Blocks)",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan", link: "/vi/developer/blocks/" },
                            { text: "Thêm một khối", link: "/vi/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "Vật phẩm (Items)",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan", link: "/vi/developer/items/" },
                            { text: "Thêm một vật phẩm", link: "/vi/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "Thực thể (Entities)",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan & Cấu trúc phân cấp", link: "/vi/developer/entities/" },
                            { text: "Sinh ra & Theo dõi (Spawning & Tracking)", link: "/vi/developer/entities/spawning-and-tracking" },
                            { text: "AI & Mục tiêu của quái (Mob AI & Goals)", link: "/vi/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "Lệnh (Commands)",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan & Bộ điều phối (Dispatcher)", link: "/vi/developer/commands/" },
                            { text: "Thêm một lệnh", link: "/vi/developer/commands/adding-commands" },
                            { text: "Đối số & Gợi ý (Arguments & Suggestions)", link: "/vi/developer/commands/arguments-and-suggestions" },
                            { text: "Thực thi & Ngữ cảnh (Execution & Context)", link: "/vi/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "Engine Plugin",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan", link: "/vi/developer/plugins/" },
                            { text: "Thêm một bộ nạp Plugin (Loader)", link: "/vi/developer/plugins/loaders" },
                            { text: "Ký & Xác thực WASM", link: "/vi/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "Engine thế giới", link: "/vi/developer/world" },
                    { text: "Phát triển trên di động", link: "/vi/developer/mobile" },
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
                        text: "Chuyển từ Bukkit",
                        collapsed: true,
                        items: [
                            {
                                text: "Tổng quan",
                                link: "/vi/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "Lệnh (Commands)",
                                link: "/vi/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/vi/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "Kho đồ & Giao diện (GUIs)",
                                link: "/vi/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "Cấu hình & Dữ liệu",
                                link: "/vi/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "Khởi tạo dự án",
                                link: "/vi/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/vi/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/vi/plugin-dev/rust/events",
                            },
                            {
                                text: "Lệnh (Commands)",
                                items: [
                                    {
                                        text: "Lệnh đầu tiên",
                                        link: "/vi/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Trò chơi Kéo-Búa-Bao",
                                        link: "/vi/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "Giấy phép & Cập nhật",
                                link: "/vi/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
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
                                text: "Lệnh đầu tiên",
                                link: "/vi/plugin-dev/python/first-command",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/vi/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/vi/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/c/quick-start",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/vi/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/vi/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/vi/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "Tổng quan API",
                                link: "/vi/plugin-dev/kotlin/api-overview",
                            },
                            {
                                text: "Tài liệu tham khảo Callback",
                                link: "/vi/plugin-dev/kotlin/callbacks",
                            },
                            {
                                text: "Sơ đồ Interface",
                                link: "/vi/plugin-dev/kotlin/interfaces",
                            },
                            {
                                text: "Tác vụ (Tasks)",
                                link: "/vi/plugin-dev/kotlin/tasks",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/vi/plugin-dev/kotlin/events",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/vi/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Zig",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/zig/quick-start",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/vi/plugin-dev/zig/events",
                            },
                            {
                                text: "Lệnh (Commands)",
                                link: "/vi/plugin-dev/zig/commands",
                            },
                            {
                                text: "Văn bản (Text)",
                                link: "/vi/plugin-dev/zig/text",
                            },
                            {
                                text: "Menu giao diện",
                                link: "/vi/plugin-dev/zig/menus",
                            },
                            {
                                text: "Nhắc lệnh Chat (Chat Prompts)",
                                link: "/vi/plugin-dev/zig/prompts",
                            },
                            {
                                text: "Vật phẩm (Items)",
                                link: "/vi/plugin-dev/zig/items",
                            },
                            {
                                text: "Lập lịch (Scheduling)",
                                link: "/vi/plugin-dev/zig/scheduling",
                            },
                            {
                                text: "Tệp tin & Cấu hình",
                                link: "/vi/plugin-dev/zig/files",
                            },
                            {
                                text: "Dữ liệu người chơi",
                                link: "/vi/plugin-dev/zig/player-data",
                            },
                            {
                                text: "Mạng (Networking)",
                                link: "/vi/plugin-dev/zig/networking",
                            },
                            {
                                text: "Handles & Quản lý bộ nhớ",
                                link: "/vi/plugin-dev/zig/memory",
                            },
                            {
                                text: "Nhật ký thay đổi (Changelog)",
                                link: "/vi/plugin-dev/zig/changelog",
                            },
                        ],
                    },
                    {
                        text: "TypeScript",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/vi/plugin-dev/typescript/quick-start",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/vi/plugin-dev/typescript/basic-logic",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/vi/plugin-dev/typescript/first-command",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/vi/plugin-dev/typescript/events",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Khắc phục sự cố",
                items: [
                    {
                        text: "Các vấn đề thường gặp",
                        link: "/vi/troubleshooting/common_issues",
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
            message: "Được phát hành theo Giấy phép MIT.",
            copyright: `Bản quyền © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "Chỉnh sửa trang này trên GitHub",
        },
        lastUpdated: {
            text: "Cập nhật lúc",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
