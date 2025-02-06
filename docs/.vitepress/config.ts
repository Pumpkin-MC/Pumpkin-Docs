import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Pumpkin',
    description: 'A High-performance Minecraft server software written in Rust',
    lang: 'en-US',
    cleanUrls: true,
    themeConfig: {
        search: {
            provider: 'local',
        },
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
                activeMatch: '/guide/',
            },
            {
                text: 'Development',
                link: '/development/contributing/',
                activeMatch: '/development/',
            },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'About',
                    items: [
                        { text: 'Introduction', link: '/guide/' },
                        { text: 'Quick Start', link: '/guide/quick-start' },
                        { text: 'Benchmarks', link: '/guide/benchmarks' },
                    ],
                },
                {
                    text: 'Configuration',
                    items: [
                        { text: 'Introduction', link: '/guide/config/' },
                        { text: 'Basic', link: '/guide/config/basic' },
                        { text: 'Proxy', link: '/guide/config/proxy' },
                        { text: 'Authentication', link: '/guide/config/authentication' },
                        { text: 'Compression', link: '/guide/config/compression' },
                        { text: 'Resource Pack', link: '/guide/config/resource-pack' },
                        { text: 'Commands', link: '/guide/config/commands' },
                        { text: 'RCON', link: '/guide/config/rcon' },
                        { text: 'PVP', link: '/guide/config/pvp' },
                        { text: 'Logging', link: '/guide/config/logging' },
                        { text: 'Query', link: '/guide/config/query' },
                        { text: 'LAN Broadcast', link: '/guide/config/lan-broadcast' },
                    ],
                },
                {
                    text: 'Troubleshooting',
                    items: [
                        {
                            text: 'Common Issues',
                            link: '/guide/troubleshooting/',
                        },
                    ],
                },
            ],
            '/development/': [
                {
                    text: 'Contributing',
                    items: [
                        { text: 'Getting Started', link: '/development/contributing/' },
                        {
                            text: 'Networking',
                            link: '/development/contributing/networking/',
                            items: [
                                { text: 'Authentication', link: '/development/contributing/networking/authentication' },
                                { text: 'RCON', link: '/development/contributing/networking/rcon' },
                            ],
                        },
                        { text: 'World', link: '/development/contributing/world' },
                        { text: 'Mobile dev', link: '/development/contributing/mobile' },
                    ],
                },
                {
                    text: 'Plugin Development',
                    items: [
                        {
                            text: 'Introduction',
                            link: '/development/plugin-development/',
                        },
                        {
                            text: 'Creating Project',
                            link: '/development/plugin-development/creating-project',
                        },
                        {
                            text: 'Basic Logic',
                            link: '/development/plugin-development/basic-logic',
                        },
                        {
                            text: 'Join Event',
                            link: '/development/plugin-development/join-event',
                        },
                    ],
                },
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Pumpkin-MC/Pumpkin' },
            { icon: 'discord', link: 'https://discord.gg/RNm224ZsDq' },
        ],

        logo: '/assets/favicon.ico',
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern: 'https://github.com/Pumpkin-MC/Pumpkin-Website/blob/master/docs/:path',
            text: 'Edit this page on GitHub',
        },
        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'medium',
                timeStyle: 'medium',
            },
        },
        outline: 'deep',
    },
    head: [
        ['link', { rel: 'shortcut icon', href: '/assets/favicon.ico' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/assets/favicon-96x96.png', sizes: '96x96' }],
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/assets/favicon.svg' }],
        ['link', { rel: 'apple-touch-icon', href: '/assets/apple-touch-icon.png', sizes: '180x180' }],
        ['link', { rel: 'manifest', href: '/assets/site.webmanifest' }],

        ['link', { rel: 'canonical', href: 'https://pumpkinmc.org/' }],

        ['meta', { name: 'apple-mobile-web-app-title', content: 'Pumpkin' }],

        ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }],
        [
            'script',
            {},
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QK7NXQQ2ZP');`,
        ],
    ],
});
