# Visão Geral da Administração

Bem-vindo à **Seção de Administração** para administradores do servidor Pumpkin. O Pumpkin é um servidor de Minecraft multithread de alto desempenho escrito em Rust, projetado para suportar grandes quantidades de jogadores com consumo mínimo de recursos.

---

## Principais Recursos para Administradores de Servidores

- **Multithreading Extremo**: Projetado do zero para processadores modernos multi-core.
- **Arquitetura de Plugins WASM**: Execução de plugins segura e em sandbox em Rust, Python, Kotlin, C#, Go ou C sem o overhead da JVM.
- **Suporte Nativo a Cross-Proxy**: Suporte integrado para Velocity, BungeeCord e encaminhamento moderno de proxies.
- **Configuração Baseada em TOML**: Arquivos de configuração limpos e legíveis para humanos localizados em `pumpkin.toml` e configurações TOML específicas de recursos.

---

## Guias e Tópicos de Administração

Explore os seguintes guias de administração:

- [Migrando de um Servidor Bukkit / Paper / Spigot](./migrating-from-bukkit) — Principais diferenças na administração do servidor, plugins, armazenamento de mundos e desempenho.
- [Configuração do Servidor](../config/introduction) — Detalhamento minucioso das configurações do `pumpkin.toml`.
- [Configuração de Proxy](../config/proxy) — Configurando o encaminhamento de jogadores do BungeeCord e Velocity.
- [Comandos e Permissões](../config/commands) — Gerenciamento de comandos de operador e permissões no jogo.
- [Autenticação](../config/authentication) — Modo online vs. offline e configurações do Yggdrasil.
- [Solução de Problemas e Questões Comuns](../troubleshooting/common_issues) — Resolvendo problemas de vinculação de portas, memória e carregamento de plugins.
