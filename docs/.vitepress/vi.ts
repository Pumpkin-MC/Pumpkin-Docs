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
                link: "/about/benchmarks",
            },
            {
                text: "Quản trị",
                link: "/admin/introduction",
            },
            {
                text: "Người đóng góp",
                link: "/developer/introduction",
            },
            {
                text: "Plugins",
                link: "/plugin-dev/introduction",
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
                    { text: "Đánh giá hiệu năng", link: "/about/benchmarks" },
                    { text: "Giúp đỡ & Ủng hộ", link: "/about/helping" },
                ],
            },
            {
                text: "Quản trị",
                collapsed: false,
                items: [
                    { text: "Tổng quan", link: "/admin/introduction" },
                    { text: "Chuyển từ Bukkit", link: "/admin/migrating-from-bukkit" },
                    {
                        text: "Cấu hình",
                        collapsed: true,
                        items: [
                            { text: "Giới thiệu", link: "/config/introduction" },
                            { text: "Cơ bản", link: "/config/basic" },
                            { text: "Thế giới", link: "/config/world" },
                            { text: "Chat & Chống Spam", link: "/config/chat" },
                            { text: "Lệnh (Commands)", link: "/config/commands" },
                            { text: "Bedrock & NetherNet", link: "/config/bedrock" },
                            { text: "Proxy", link: "/config/proxy" },
                            { text: "Xác thực", link: "/config/authentication" },
                            { text: "Giới hạn gói tin (Packet Limiter)", link: "/config/packet-limiter" },
                            { text: "Nén dữ liệu", link: "/config/compression" },
                            { text: "Gói tài nguyên (Resource Pack)", link: "/config/resource-pack" },
                            { text: "Plugins", link: "/config/plugins" },
                            { text: "Liên kết máy chủ", link: "/config/server-links" },
                            { text: "Dữ liệu người chơi", link: "/config/player-data" },
                            { text: "Nhật ký (Logging)", link: "/config/logging" },
                            { text: "Query", link: "/config/query" },
                            { text: "Quản lý (MSMP)", link: "/config/management" },
                            { text: "PVP", link: "/config/pvp" },
                            { text: "Phát sóng mạng LAN", link: "/config/lan-broadcast" },
                            { text: "Thu thập dữ liệu đo từ xa (Telemetry)", link: "/config/telemetry" },
                        ],
                    },
                ],
            },
            {
                text: "Người đóng góp",
                items: [
                    { text: "Giới thiệu", link: "/developer/introduction" },
                    { text: "Hướng dẫn đóng góp", link: "/developer/contributing" },
                    { text: "Kiến trúc", link: "/developer/architecture" },
                    { text: "Trích xuất dữ liệu (Data Extractor)", link: "/developer/extractor" },
                    { text: "Tạo mã nguồn (Code Generation)", link: "/developer/codegen" },
                    { text: "Chuyển giao phiên bản (Porting Versions)", link: "/developer/porting-versions" },
                    {
                        text: "Mạng (Networking)",
                        collapsed: true,
                        items: [
                            {
                                text: "Giới thiệu",
                                link: "/developer/networking/",
                            },
                            {
                                text: "Metadata & Dữ liệu đồng bộ",
                                link: "/developer/networking/metadata",
                            },
                            {
                                text: "Phiên bản Java (Java Edition)",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Tổng quan",
                                        link: "/developer/networking/java/overview",
                                    },
                                    {
                                        text: "Thêm một gói tin (Packet)",
                                        link: "/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "Xác thực",
                                        link: "/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Phiên bản Bedrock (Bedrock Edition)",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Tổng quan",
                                        link: "/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "Thêm một gói tin (Packet)",
                                        link: "/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "Xác thực",
                                        link: "/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "Chuyển tiếp Proxy (Proxy Forwarding)",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Tổng quan",
                                        link: "/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "Khối (Blocks)",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan", link: "/developer/blocks/" },
                            { text: "Thêm một khối", link: "/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "Vật phẩm (Items)",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan", link: "/developer/items/" },
                            { text: "Thêm một vật phẩm", link: "/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "Thực thể (Entities)",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan & Cấu trúc phân cấp", link: "/developer/entities/" },
                            { text: "Sinh ra & Theo dõi (Spawning & Tracking)", link: "/developer/entities/spawning-and-tracking" },
                            { text: "AI & Mục tiêu của quái (Mob AI & Goals)", link: "/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "Lệnh (Commands)",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan & Bộ điều phối (Dispatcher)", link: "/developer/commands/" },
                            { text: "Thêm một lệnh", link: "/developer/commands/adding-commands" },
                            { text: "Đối số & Gợi ý (Arguments & Suggestions)", link: "/developer/commands/arguments-and-suggestions" },
                            { text: "Thực thi & Ngữ cảnh (Execution & Context)", link: "/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "Engine Plugin",
                        collapsed: true,
                        items: [
                            { text: "Tổng quan", link: "/developer/plugins/" },
                            { text: "Thêm một bộ nạp Plugin (Loader)", link: "/developer/plugins/loaders" },
                            { text: "Ký & Xác thực WASM", link: "/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "Engine thế giới", link: "/developer/world" },
                    { text: "Phát triển trên di động", link: "/developer/mobile" },
                ],
            },
            {
                text: "Phát triển Plugin",
                items: [
                    {
                        text: "Giới thiệu",
                        link: "/plugin-dev/introduction",
                    },
                    {
                        text: "Chuyển từ Bukkit",
                        collapsed: true,
                        items: [
                            {
                                text: "Tổng quan",
                                link: "/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "Lệnh (Commands)",
                                link: "/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "Kho đồ & Giao diện (GUIs)",
                                link: "/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "Cấu hình & Dữ liệu",
                                link: "/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "Khởi tạo dự án",
                                link: "/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/plugin-dev/rust/events",
                            },
                            {
                                text: "Lệnh (Commands)",
                                items: [
                                    {
                                        text: "Lệnh đầu tiên",
                                        link: "/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Trò chơi Kéo-Búa-Bao",
                                        link: "/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "Giấy phép & Cập nhật",
                                link: "/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/plugin-dev/python/first-command",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/plugin-dev/c/quick-start",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "Tổng quan API",
                                link: "/plugin-dev/kotlin/api-overview",
                            },
                            {
                                text: "Tài liệu tham khảo Callback",
                                link: "/plugin-dev/kotlin/callbacks",
                            },
                            {
                                text: "Sơ đồ Interface",
                                link: "/plugin-dev/kotlin/interfaces",
                            },
                            {
                                text: "Tác vụ (Tasks)",
                                link: "/plugin-dev/kotlin/tasks",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/plugin-dev/kotlin/events",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Zig",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/plugin-dev/zig/quick-start",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/plugin-dev/zig/events",
                            },
                            {
                                text: "Lệnh (Commands)",
                                link: "/plugin-dev/zig/commands",
                            },
                            {
                                text: "Văn bản (Text)",
                                link: "/plugin-dev/zig/text",
                            },
                            {
                                text: "Menu giao diện",
                                link: "/plugin-dev/zig/menus",
                            },
                            {
                                text: "Nhắc lệnh Chat (Chat Prompts)",
                                link: "/plugin-dev/zig/prompts",
                            },
                            {
                                text: "Vật phẩm (Items)",
                                link: "/plugin-dev/zig/items",
                            },
                            {
                                text: "Lập lịch (Scheduling)",
                                link: "/plugin-dev/zig/scheduling",
                            },
                            {
                                text: "Tệp tin & Cấu hình",
                                link: "/plugin-dev/zig/files",
                            },
                            {
                                text: "Dữ liệu người chơi",
                                link: "/plugin-dev/zig/player-data",
                            },
                            {
                                text: "Mạng (Networking)",
                                link: "/plugin-dev/zig/networking",
                            },
                            {
                                text: "Handles & Quản lý bộ nhớ",
                                link: "/plugin-dev/zig/memory",
                            },
                            {
                                text: "Nhật ký thay đổi (Changelog)",
                                link: "/plugin-dev/zig/changelog",
                            },
                        ],
                    },
                    {
                        text: "TypeScript",
                        collapsed: true,
                        items: [
                            {
                                text: "Bắt đầu nhanh",
                                link: "/plugin-dev/typescript/quick-start",
                            },
                            {
                                text: "Logic cơ bản",
                                link: "/plugin-dev/typescript/basic-logic",
                            },
                            {
                                text: "Lệnh đầu tiên",
                                link: "/plugin-dev/typescript/first-command",
                            },
                            {
                                text: "Sự kiện (Events)",
                                link: "/plugin-dev/typescript/events",
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
                        link: "/troubleshooting/common_issues",
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
