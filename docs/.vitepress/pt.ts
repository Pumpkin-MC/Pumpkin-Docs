import { defineConfig } from "vitepress";

export const pt = defineConfig({
    lang: "pt",
    description: "Um software de servidor Minecraft de alta performance escrito em Rust",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
        search: {
            provider: "local",
        },
        nav: [
            {
                text: "Administração",
                link: "/pt/admin/introduction",
            },
            {
                text: "Contribuidores",
                link: "/pt/developer/introduction",
            },
            {
                text: "Plugins",
                link: "/pt/plugin-dev/introduction",
            },
            {
                text: "Site",
                link: "https://pumpkinmc.org/",
            },
        ],
        sidebar: [
            {
                text: "Sobre",
                items: [
                    { text: "Ajudar e Doar", link: "/pt/about/helping" },
                ],
            },
            {
                text: "Administração",
                collapsed: false,
                items: [
                    { text: "Visão Geral", link: "/pt/admin/introduction" },
                    { text: "Migrando do Bukkit", link: "/pt/admin/migrating-from-bukkit" },
                    {
                        text: "Configuração",
                        collapsed: true,
                        items: [
                            { text: "Introdução", link: "/pt/config/introduction" },
                            { text: "Básico", link: "/pt/config/basic" },
                            { text: "Mundo", link: "/pt/config/world" },
                            { text: "Chat e Anti-Spam", link: "/pt/config/chat" },
                            { text: "Comandos", link: "/pt/config/commands" },
                            { text: "Bedrock e NetherNet", link: "/pt/config/bedrock" },
                            { text: "Proxy", link: "/pt/config/proxy" },
                            { text: "Autenticação", link: "/pt/config/authentication" },
                            { text: "Limitador de Pacotes", link: "/pt/config/packet-limiter" },
                            { text: "Compressão", link: "/pt/config/compression" },
                            { text: "Pacote de Recursos", link: "/pt/config/resource-pack" },
                            { text: "Plugins", link: "/pt/config/plugins" },
                            { text: "Links do Servidor", link: "/pt/config/server-links" },
                            { text: "Dados do Jogador", link: "/pt/config/player-data" },
                            { text: "Registros (Logging)", link: "/pt/config/logging" },
                            { text: "Query", link: "/pt/config/query" },
                            { text: "RCON", link: "/pt/config/rcon" },
                            { text: "PVP", link: "/pt/config/pvp" },
                            { text: "Transmissão LAN", link: "/pt/config/lan-broadcast" },
                        ],
                    },
                ],
            },
            {
                text: "Contribuidores",
                items: [
                    { text: "Introdução", link: "/pt/developer/introduction" },
                    { text: "Guia de Contribuição", link: "/pt/developer/contributing" },
                    { text: "Arquitetura", link: "/pt/developer/architecture" },
                    { text: "Extrator de Dados", link: "/pt/developer/extractor" },
                    { text: "Geração de Código", link: "/pt/developer/codegen" },
                    { text: "Portando Versões", link: "/pt/developer/porting-versions" },
                    {
                        text: "Rede",
                        collapsed: true,
                        items: [
                            {
                                text: "Introdução",
                                link: "/pt/developer/networking/",
                            },
                            {
                                text: "Metadados e Dados Sincronizados",
                                link: "/pt/developer/networking/metadata",
                            },
                            {
                                text: "Java Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Visão Geral",
                                        link: "/pt/developer/networking/java/overview",
                                    },
                                    {
                                        text: "Adicionando um Pacote",
                                        link: "/pt/developer/networking/java/adding-packets",
                                    },
                                    {
                                        text: "Autenticação",
                                        link: "/pt/developer/networking/java/authentication",
                                    },
                                ],
                            },
                            {
                                text: "Bedrock Edition",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Visão Geral",
                                        link: "/pt/developer/networking/bedrock/overview",
                                    },
                                    {
                                        text: "Adicionando um Pacote",
                                        link: "/pt/developer/networking/bedrock/adding-packets",
                                    },
                                    {
                                        text: "Autenticação",
                                        link: "/pt/developer/networking/bedrock/authentication",
                                    },
                                    {
                                        text: "NetherNet",
                                        link: "/pt/developer/networking/bedrock/nethernet",
                                    },
                                ],
                            },
                            {
                                text: "Encaminhamento de Proxy",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Visão Geral",
                                        link: "/pt/developer/networking/proxy/",
                                    },
                                    {
                                        text: "BungeeCord",
                                        link: "/pt/developer/networking/proxy/bungeecord",
                                    },
                                    {
                                        text: "Velocity",
                                        link: "/pt/developer/networking/proxy/velocity",
                                    },
                                    {
                                        text: "Vine",
                                        link: "/pt/developer/networking/proxy/vine",
                                    },
                                ],
                            },
                            {
                                text: "Query (GameSpy4)",
                                link: "/pt/developer/networking/query",
                            },
                            {
                                text: "RCON",
                                link: "/pt/developer/networking/rcon",
                            },
                        ],
                    },
                    {
                        text: "Blocos",
                        collapsed: true,
                        items: [
                            { text: "Visão Geral", link: "/pt/developer/blocks/" },
                            { text: "Adicionando um Bloco", link: "/pt/developer/blocks/adding-blocks" },
                        ],
                    },
                    {
                        text: "Itens",
                        collapsed: true,
                        items: [
                            { text: "Visão Geral", link: "/pt/developer/items/" },
                            { text: "Adicionando um Item", link: "/pt/developer/items/adding-items" },
                        ],
                    },
                    {
                        text: "Entidades",
                        collapsed: true,
                        items: [
                            { text: "Visão Geral e Hierarquia", link: "/pt/developer/entities/" },
                            { text: "Spawning e Rastreamento", link: "/pt/developer/entities/spawning-and-tracking" },
                            { text: "IA e Objetivos de Mobs", link: "/pt/developer/entities/ai-and-mobs" },
                        ],
                    },
                    {
                        text: "Comandos",
                        collapsed: true,
                        items: [
                            { text: "Visão Geral e Despachante", link: "/pt/developer/commands/" },
                            { text: "Adicionando um Comando", link: "/pt/developer/commands/adding-commands" },
                            { text: "Argumentos e Sugestões", link: "/pt/developer/commands/arguments-and-suggestions" },
                            { text: "Execução e Contexto", link: "/pt/developer/commands/execution-and-context" },
                        ],
                    },
                    {
                        text: "Motor de Plugins",
                        collapsed: true,
                        items: [
                            { text: "Visão Geral", link: "/pt/developer/plugins/" },
                            { text: "Adicionando um Carregador de Plugins", link: "/pt/developer/plugins/loaders" },
                            { text: "Assinatura e Verificação WASM", link: "/pt/developer/plugins/wasm-signing" },
                        ],
                    },
                    { text: "Motor do Mundo", link: "/pt/developer/world" },
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
                        text: "Migrando do Bukkit",
                        collapsed: true,
                        items: [
                            {
                                text: "Visão Geral",
                                link: "/pt/plugin-dev/migrating-from-bukkit/",
                            },
                            {
                                text: "Comandos",
                                link: "/pt/plugin-dev/migrating-from-bukkit/commands",
                            },
                            {
                                text: "Eventos",
                                link: "/pt/plugin-dev/migrating-from-bukkit/events",
                            },
                            {
                                text: "Inventários e GUIs",
                                link: "/pt/plugin-dev/migrating-from-bukkit/inventories",
                            },
                            {
                                text: "Configuração e Dados",
                                link: "/pt/plugin-dev/migrating-from-bukkit/configuration",
                            },
                        ],
                    },
                    {
                        text: "Rust",
                        collapsed: true,
                        items: [
                            {
                                text: "Criando o Projeto",
                                link: "/pt/plugin-dev/rust/creating-project",
                            },
                            {
                                text: "Lógica Básica",
                                link: "/pt/plugin-dev/rust/basic-logic",
                            },
                            {
                                text: "Eventos",
                                link: "/pt/plugin-dev/rust/events",
                            },
                            {
                                text: "Comandos",
                                items: [
                                    {
                                        text: "Primeiro Comando",
                                        link: "/pt/plugin-dev/rust/command/first-command",
                                    },
                                    {
                                        text: "Pedra, Papel e Tesoura",
                                        link: "/pt/plugin-dev/rust/command/rock-paper-scissors",
                                    },
                                ],
                            },
                            {
                                text: "Licenciamento e Atualizações",
                                link: "/pt/plugin-dev/rust/plugin-utils",
                            },
                        ],
                    },
                    {
                        text: "Python",
                        collapsed: true,
                        items: [
                            {
                                text: "Início Rápido",
                                link: "/pt/plugin-dev/python/quick-start",
                            },
                            {
                                text: "Lógica Básica",
                                link: "/pt/plugin-dev/python/basic-logic",
                            },
                            {
                                text: "Primeiro Comando",
                                link: "/pt/plugin-dev/python/first-command",
                            },
                            {
                                text: "Eventos",
                                link: "/pt/plugin-dev/python/events",
                            },
                        ],
                    },
                    {
                        text: "C#",
                        collapsed: true,
                        items: [
                            {
                                text: "Início Rápido",
                                link: "/pt/plugin-dev/csharp/quick-start",
                            },
                            {
                                text: "Primeiro Comando",
                                link: "/pt/plugin-dev/csharp/first-command",
                            },
                        ],
                    },
                    {
                        text: "C",
                        collapsed: true,
                        items: [
                            {
                                text: "Início Rápido",
                                link: "/pt/plugin-dev/c/quick-start",
                            },
                            {
                                text: "Primeiro Comando",
                                link: "/pt/plugin-dev/c/first-command",
                            },
                        ],
                    },
                    {
                        text: "Go",
                        collapsed: true,
                        items: [
                            {
                                text: "Início Rápido",
                                link: "/pt/plugin-dev/go/quick-start",
                            },
                            {
                                text: "Lógica Básica",
                                link: "/pt/plugin-dev/go/basic-logic",
                            },
                            {
                                text: "Primeiro Comando",
                                link: "/pt/plugin-dev/go/first-command",
                            },
                        ],
                    },
                    {
                        text: "Kotlin",
                        collapsed: true,
                        items: [
                            {
                                text: "Início Rápido",
                                link: "/pt/plugin-dev/kotlin/quick-start",
                            },
                            {
                                text: "Primeiro Comando",
                                link: "/pt/plugin-dev/kotlin/first-command",
                            },
                        ],
                    },
                    {
                        text: "D",
                        collapsed: true,
                        items: [
                            {
                                text: "Início Rápido",
                                link: "/pt/plugin-dev/d/quick-start",
                            },
                        ],
                    },
                    {
                        text: "Zig",
                        collapsed: true,
                        items: [
                            {
                                text: "Início Rápido",
                                link: "/pt/plugin-dev/zig/quick-start",
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
                        link: "/pt/troubleshooting/common_issues",
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
            message: "Lançado sob a licença MIT.",
            copyright: `Copyright © 2024-${new Date().getFullYear()} Aleksandr Medvedev`,
        },
        editLink: {
            pattern:
                "https://github.com/Pumpkin-MC/Pumpkin-Docs/blob/master/docs/:path",
            text: "Editar esta página no GitHub",
        },
        lastUpdated: {
            text: "Atualizado em",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "medium",
            },
        },
        outline: "deep",
    },
});
