# Visão Geral e Arquitetura de Migração

Migrar do desenvolvimento de plugins para **Bukkit / Spigot / Paper** para o Pumpkin envolve uma mudança de um modelo orientado a objetos centrado em Java para um modelo de componentes compilado e multilíngue em **WebAssembly (WASM)**.

---

A tabela abaixo compara o paradigma legado do Bukkit/Paper com a arquitetura moderna em WebAssembly do Pumpkin:

| Conceito | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Suporte a Linguagens** | Java / Kotlin / Scala (JVM) | Rust, Python, Kotlin, C#, Go, C |
| **Saída Binária** | Arquivo Java `.jar` | Componente WebAssembly `.wasm` |
| **Descritor do Plugin** | Arquivo `plugin.yml` | Struct programática `PluginMetadata` |
| **Ganchos de Ciclo de Vida (Hooks)** | `onEnable()` / `onDisable()` | `on_load(context)` / `on_unload(context)` |
| **Segurança e Isolamento** | Reflexão (Reflection) irrestrita da JVM | Modelo de recursos (capabilities) WASM em sandbox |
| **Concorrência** | Loop de tick single-threaded (`BukkitScheduler`) | Execução nativa multithread com runtime assíncrono (Async) |

---

## Tópicos Detalhados de Migração

Explore guias dedicados sobre a migração de cada subsistema principal de plugins:

- [Migrando Comandos](./commands) — Fazendo a transição de `getCommand().setExecutor()` e `plugin.yml` para árvores de comandos Brigadier.
- [Migrando Eventos](./events) — Substituindo as interfaces `@EventHandler` e `Listener` pelo sistema de eventos bloqueantes vs. não bloqueantes do Pumpkin.
- [Migrando Inventários e GUIs](./inventories) — Mudando de `Bukkit.createInventory()` para manipuladores de contêineres e janelas do Pumpkin.
- [Migrando Configuração e Dados](./configuration) — Substituindo `getConfig()` / `config.yml` por armazenamento nativo em TOML, JSON ou personalizado.
