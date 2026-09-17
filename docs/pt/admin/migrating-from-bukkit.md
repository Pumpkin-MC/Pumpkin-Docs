# Migrando do Bukkit / Spigot / Paper para o Pumpkin

Este guia aborda as diferenças arquiteturais e de configuração ao transicionar um servidor do Bukkit, Spigot ou Paper para o Pumpkin.

---

## 1. Diferenças Arquiteturais

| Aspecto | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Ambiente de Execução** | Java Virtual Machine (requer Java 17/21+) | Executável nativo (Rust compilado, sem necessidade de Java) |
| **Comando de Inicialização** | `java [flags] -jar server.jar` | `./pumpkin` |
| **Loop de Ticks** | Loop de ticks single-threaded com tarefas assíncronas | Execução de ticks multithread entre núcleos de CPU |
| **Formato de Plugins** | Bytecode Java (`.jar`) direcionado à API Bukkit | WebAssembly (`.wasm`), ou `.jar` via PatchBukkit |
| **Linguagens de Plugins** | Java, Kotlin, Scala | Rust, Python, Kotlin, C#, Go, C |
| **Configuração** | `server.properties`, `paper.yml`, `spigot.yml` | `pumpkin.toml` (formato TOML) |
| **Gerenciamento de Memória** | JVM Garbage Collection | Alocação nativa de memória pelo SO |

---

## 2. Plugins e Extensões

### Plugins em WebAssembly
O formato primário de plugins do Pumpkin é o WebAssembly (`.wasm`):
- **Isolamento**: Os plugins são executados em um runtime WebAssembly em sandbox.
- **Suporte a Linguagens**: Os plugins podem ser compilados para WASM a partir de Rust, Python, Go, C#, C ou Kotlin.
- **Plugins Personalizados**: Para portar plugins Bukkit próprios para o Pumpkin, consulte o [Guia de Migração para Desenvolvedores](../plugin-dev/migrating-from-bukkit/index).

### Compatibilidade com Plugins Bukkit: PatchBukkit
Para servidores que dependem de plugins Bukkit/Spigot `.jar` existentes, o projeto **PatchBukkit** fornece uma camada de compatibilidade:
- **Arquitetura**: O PatchBukkit incorpora uma JVM dentro do Pumpkin e reimplementa partes da API Bukkit, fazendo a ponte com o Pumpkin via JNI e FFI.
- **Localização dos Plugins**: Plugins `.jar` compatíveis são colocados em `patchbukkit/patchbukkit-plugins/`.
- **Status e Limitações**: O PatchBukkit está em desenvolvimento ativo. Chamadas padrão da API Bukkit são suportadas; plugins com forte dependência de classes internas do NMS (`net.minecraft.server`), reflexão do CraftBukkit ou manipulação de bytecode podem não funcionar corretamente.
- **Requisito de Java**: A execução do PatchBukkit requer um runtime Java (JRE/JDK) instalado no sistema host para rodar a JVM incorporada.

---

## 3. Configuração e Propriedades

O Pumpkin utiliza arquivos de configuração TOML em vez de `server.properties` e YAML:

| Paper / Spigot (`server.properties`) | Pumpkin (`pumpkin.toml`) |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. Armazenamento de Mundos e Dados

- **Compatibilidade de Formato**: O Pumpkin lê o formato padrão de chunks Anvil (arquivos `.mca`).
- **Estrutura de Diretórios**: Certifique-se de que os diretórios de dimensões (`world`, `world_nether`, `world_the_end`) correspondam à estrutura esperada do Pumpkin ao copiar mundos de instalações existentes do Paper/Spigot.
- **Formato Mais Recente de Mundo e Datapack Necessário**: Ao menos por enquanto, o Pumpkin suporta apenas o formato de mundo e o formato de datapack mais recentes da versão suportada do Minecraft. Formatos antigos de mundo ou versões legadas de datapack não são convertidos automaticamente em tempo de execução.
  - **Atualizando Mundos no Cliente**: Se estiver migrando um mundo antigo, atualize-o antes de carregá-lo no Pumpkin. Você pode atualizar um mundo existente diretamente no cliente oficial do Minecraft: abra o jogo na versão mais recente compatível, vá em **Um Jogador**, selecione o mundo, clique em **Editar** e escolha **Otimizar Mundo**. Como alternativa, carregue e salve o mundo uma vez em um servidor vanilla na versão mais recente.
  - **Datapacks**: Certifique-se de que todos os datapacks em `world/datapacks` estejam atualizados para o formato esperado pela versão de destino.

---

## 5. Inicialização e Flags da JVM

### Nenhuma Instalação de Java Necessária
O Pumpkin puro é um executável nativo autocontido. Não é necessário ter um runtime Java (JRE/JDK) instalado no sistema ou no contêiner para executar o servidor.

### Comandos de Inicialização
Servidores Paper e Spigot frequentemente utilizam scripts de inicialização JVM com flags de alocação de heap e garbage collection (como as Aikar's Flags):

:::code-group

```bash [Paper (JVM)]
# Comando típico de inicialização do Paper com Aikar's Flags:
java -Xms10G -Xmx10G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -Dusing.aikars.flags=https://mcflags.emc.gs \
  -Daikars.new.flags=true \
  -jar paper.jar --nogui
```

```bash [Pumpkin (Nativo)]
# Linux / macOS:
./pumpkin

# Windows:
./pumpkin.exe

# Docker:
docker run -p 25565:25565 -v ./data:/data pumpkinmc/pumpkin:latest
```

:::

### Diferenças de Memória
- **Sem Coletor de Lixo**: O Pumpkin é escrito em Rust e utiliza gerenciamento determinístico de memória em tempo de compilação (RAII). Não há coletor de lixo em execução nem necessidade de ajustar pausas de GC.
- **Sem Alocação Fixa de Heap**: Flags como `-Xms` e `-Xmx` não existem em binários nativos. A memória é alocada dinamicamente pelo sistema operacional conforme chunks e entidades são carregados, e liberada no descarregamento.
- **Flags da JVM Não Se Aplicam**: Parâmetros de ajuste de estratégias de GC, tamanhos de gerações ou detalhes internos da JVM não são necessários nem suportados.

---

## Checklist do Administrador

1. [ ] Faça backup dos dados e arquivos de mundo existentes, garantindo que o mundo e os datapacks estejam atualizados para o formato mais recente (ex.: via "Otimizar Mundo" no cliente).
2. [ ] Mapeie as configurações do `server.properties` para o `pumpkin.toml`.
3. [ ] Identifique os plugins necessários e busque equivalentes em WebAssembly (`.wasm`) ou teste com o [PatchBukkit](#compatibilidade-com-plugins-bukkit-patchbukkit).
4. [ ] Configure o suporte a proxy (`Velocity` / `BungeeCord`) no `pumpkin.toml` se utilizar uma rede de servidores.
5. [ ] Atualize os scripts de inicialização para executar `./pumpkin` diretamente sem argumentos da JVM.
6. [ ] Inicie o servidor e verifique a conectividade e os logs.
