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
                    { text: "Introdução", link: "/pt/about/introduction" },
                    { text: "Primeiros Passos", link: "/pt/about/quick-start" },
                    { text: "Benchmark", link: "/pt/about/benchmarks" },
                ],
            },
            {
                text: "Configuração",
                items: [
                    { text: "Introdução", link: "/pt/config/introduction" },
                    { text: "Básico", link: "/pt/config/basic" },
                    { text: "Proxy", link: "/pt/config/proxy" },
                    { text: "Autenticação", link: "/pt/config/authentication" },
                    { text: "Compressão", link: "/pt/config/compression" },
                    { text: "Pacote de Recursos", link: "/pt/config/resource-pack" },
                    { text: "Comandos", link: "/pt/config/commands" },
                    { text: "RCON", link: "/pt/config/rcon" },
                    { text: "PVP", link: "/pt/config/pvp" },
                    { text: "Log", link: "/pt/config/logging" },
                    { text: "Query", link: "/pt/config/query" },
                    { text: "Transmissão LAN", link: "/pt/config/lan-broadcast" },
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
                        text: "Exemplos de Plugin",
                        link: "/pt/plugin-dev/plugin-template/introduction",
                        items: [
                            {
                                text: "Criando um projeto",
                                link: "/pt/plugin-dev/plugin-template/creating-project",
                            },
                            {
                                text: "Lógica básica",
                                link: "/pt/plugin-dev/plugin-template/basic-logic",
                            },
                            {
                                text: "Gerenciador de eventos",
                                link: "/pt/plugin-dev/plugin-template/join-event",
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
                "https://github.com/Pumpkin-MC/Pumpkin-Website/blob/master/docs/:path",
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