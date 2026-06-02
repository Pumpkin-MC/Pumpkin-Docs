import { defineConfig } from "vitepress";

export const pt = defineConfig({
    lang: "pt-BR",
    description: "Um servidor Minecraft de alto desempenho escrito em Rust",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Documentação",
                link: "/pt/about/introduction",
            },
        ],
        sidebar: [
            {
                text: "Sobre",
                items: [
                    { text: "Benchmark", link: "/pt/about/benchmarks" },
                ],
            },
            {
                text: "Configuração",
                items: [
                    { text: "Introdução", link: "/pt/config/introduction" },
                    { text: "Básico", link: "/pt/config/basic" },
                    { text: "Log", link: "/pt/config/logging" },
                    { text: "Pacote de Recursos", link: "/pt/config/resource-pack" },
                    { text: "Mundo", link: "/pt/config/world" },
                    { text: "Autenticação", link: "/pt/config/authentication" },
                    { text: "Query", link: "/pt/config/query" },
                    { text: "RCON", link: "/pt/config/rcon" },
                    { text: "Proxy", link: "/pt/config/proxy" },
                    { text: "Compressão", link: "/pt/config/compression" },
                    { text: "Transmissão LAN", link: "/pt/config/lan-broadcast" },
                    { text: "Comandos", link: "/pt/config/commands" },
                    { text: "Chat", link: "/pt/config/chat" },
                    { text: "PVP", link: "/pt/config/pvp" },
                    { text: "Links do Servidor", link: "/pt/config/server-links" },
                    { text: "Dados do Jogador", link: "/pt/config/player-data" },
                    { text: "Diversão", link: "/pt/config/fun" },
                    { text: "Receitas", link: "/pt/config/recipe" },
                    { text: "Plugins", link: "/pt/config/plugins" },
                ],
            },
            {
                text: "Desenvolvedores",
                items: [
                    { text: "Contribuindo", link: "/pt/developer/contributing" },
                    { text: "Introdução", link: "/pt/developer/introduction" },
                    {
                        text: "Rede",
                        link: "/pt/developer/networking/networking",
                        items: [
                            { text: "Autenticação", link: "/pt/developer/networking/authentication" },
                            { text: "RCON", link: "/pt/developer/networking/rcon" },
                        ]
                    },
                    { text: "Mundo", link: "/pt/developer/world" },
                    { text: "Desenvolvimento Mobile", link: "/pt/developer/mobile" },
                ],
            },
            {
                text: "Desenvolvimento de Plugins",
                items: [
                    {
                        text: "Introdução",
                        link: "/pt/plugin-dev/introduction",
                    },
                    {
                        text: "Rust",
                        link: "/pt/plugin-dev/rust/introduction",
                        items: [
                            {
                                text: "Criando um projeto",
                                link: "/pt/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Lógica básica",
                                link: "/pt/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Gerenciador de eventos",
                                link: "/pt/plugin-dev/rust/join-event",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: false,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/pt/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Basic Logic",
                                link: "/pt/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "Events",
                                link: "/pt/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: false,
                        items: [
                            {
                                text: "Quick Start",
                                link: "/pt/plugin-dev/csharp/quick-start",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: false,
                        items: [
                            {
                                text: "Início Rápido",
                                link: "/pt/plugin-dev/c/quick-start",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Solução de Problemas",
                items: [
                    {
                        text: "Problemas Comuns",
                        link: "/pt/troubleshooting/common_issues.md",
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
            message: "Distribuído sob a Licença MIT.",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "Edite esta página no GitHub",
        },
        lastUpdated: {
            text: "Atualizado em",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    }
});