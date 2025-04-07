# Benchmarks

Aqui, softwares de servidores Minecraft comuns são comparados com o Pumpkin.

> [!CAUTION] CUIDADO
> **Esta comparação é injusta.** Pumpkin atualmente tem muito menos recursos que outros servidores, o que pode sugerir que ele usa menos recursos.
> Também é importante considerar que outros servidores tiveram anos para otimizar.
> Forks do Vanilla, que não precisam reescrever toda a lógica do Vanilla, podem se concentrar exclusivamente em otimizações.

![Screenshot From 2024-10-15 16-42-53](https://github.com/user-attachments/assets/e08fbb00-42fe-4479-a03b-11bb6886c91a)

## Especificações

#### Técnicas

**Software**

-   Distribuição: Manjaro Linux
-   Arquitetura: x86_64 (64-bit)
-   Versão do Kernel: 6.11.3-arch1-1

**Hardware**

-   Placa-mãe: MAG B650 TOMAHAWK WIFI
-   CPU: AMD Ryzen 7600X 6-Core
-   RAM: Corsair 2x16GB DDR5 6000Mhz
-   Armazenamento: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
-   Refrigeração: be quiet Dark Rock Elite

**Rust**

-   Toolchain: stable-x86_64-unknown-linux-gnu (1.81.0)
-   Compilador Rust: rustc 1.81.0 (eeb90cda1 2024-09-04)

**Java**

-   Versão do JDK: OpenJDK 23 64-Bit 2024-09-17
-   Versão do JRE: OpenJDK Runtime Environment (build 23+37)
-   Fornecedor: Oracle

#### Jogo

-   Versão do Minecraft: 1.21.1
-   Distância de visão: 10
-   Distância simulada: 10
-   Modo online: falso
-   Rcon: falso

<sub><sup>O modo online foi desativado para facilitar os testes com contas não premium.</sup></sub>

> [!NOTE] NOTA
> Todos os testes foram realizados várias vezes para obter resultados mais precisos.
> Todos os jogadores não se moveram ao nascer. Apenas os 8 primeiros chunks foram carregados.
> Todos os servidores usaram sua própria geração de terreno. Nenhum mundo foi pré-carregado.

> [!IMPORTANT] IMPORTANTE
> `CPU Max` geralmente é maior com um jogador, pois os chunks iniciais estão sendo carregados.

## Pumpkin

Build: [8febc50](https://github.com/Snowiiii/Pumpkin/commit/8febc5035d5611558c13505b7724e6ca284e0ada)

Argumentos de compilação: `--release`

Argumentos de execução:

**Tamanho do arquivo:** <FmtNum :n=12.3 />MB

**Tempo de inicialização:** <FmtNum :n=8 />ms

**Tempo de desligamento:** <FmtNum :n=0 />ms

| Jogadores | RAM                   | CPU Ocioso       | CPU Máx            |
| --------- | --------------------- | ---------------- | ------------------ |
| 0         | <FmtNum :n=392.2 />KB | <FmtNum :n=0 />% | <FmtNum :n=0 />%   |
| 1         | <FmtNum :n=24.9 />MB  | <FmtNum :n=0 />% | <FmtNum :n=4 />%   |
| 2         | <FmtNum :n=25.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=0.6 />% |
| 5         | <FmtNum :n=26 />MB    | <FmtNum :n=0 />% | <FmtNum :n=1 />%   |
| 10        | <FmtNum :n=27.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=1.5 />% |

<sub><sup>Pumpkin faz cache dos chunks já carregados, resultando em nenhum uso extra de RAM além dos dados do jogador e uso mínimo de CPU.</sup></sub>

#### Tempo de compilação

Compilando do zero:

**Debug:** <FmtNum :n=10.35 />sec  
**Release:** <FmtNum :n=38.40 />sec

Recompilação (pumpkin crate):

**Debug:** <FmtNum :n=1.82 />sec  
**Release:** <FmtNum :n=28.68 />sec

## Vanilla

Release: [1.21.1](https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar)

Argumentos de compilação:

Argumentos de execução: `nogui`

**Tamanho do arquivo:** <FmtNum :n=51.6 />MB

**Tempo de inicialização:** <FmtNum :n=7 />sec

**Tempo de desligamento:** <FmtNum :n=4 />sec

| Jogadores | RAM                  | CPU ocioso                               | CPU Máx            |
| --------- | -------------------- | ---------------------------------------- | ------------------ |
| 0         | <FmtNum n="860" />MB | <FmtNum n="0.1" /> - <FmtNum n="0.3" />% | <FmtNum n="51" />% |
| 1         | <FmtNum n="1.5" />GB | <FmtNum n="0.9" /> - <FmtNum n="1" />%   | <FmtNum n="41" />% |
| 2         | <FmtNum n="1.6" />GB | <FmtNum n="1" /> - <FmtNum n="1.1" />%   | <FmtNum n="10" />% |
| 5         | <FmtNum n="1.8" />GB | <FmtNum n="2" />%                        | <FmtNum n="20" />% |
| 10        | <FmtNum n="2.2" />GB | <FmtNum n="4" />%                        | <FmtNum n="24" />% |

## Paper

Build: [122](https://api.papermc.io/v2/projects/paper/versions/1.21.1/builds/122/downloads/paper-1.21.1-122.jar)

Argumentos de compilação:

Argumentos de execução: `nogui`

**Tamanho do arquivo:** <FmtNum :n=49.4 />MB

**Tempo de inicialização:** <FmtNum :n=7 />sec

**Tempo de desligamento:** <FmtNum :n=3 />sec

| Jogadores | RAM                 | CPU ocioso                             | CPU Máx           |
| --------- | ------------------- | -------------------------------------- | ----------------- |
| 0         | <FmtNum :n=1.1 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=36 />% |
| 1         | <FmtNum :n=1.7 />GB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=47 />% |
| 2         | <FmtNum :n=1.8 />GB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=10 />% |
| 5         | <FmtNum :n=1.9 />GB | <FmtNum :n=1.5 />%                     | <FmtNum :n=15 />% |
| 10        | <FmtNum :n=2 />GB   | <FmtNum :n=3 />%                       | <FmtNum :n=20 />% |

## Purpur

Build: [2324](https://api.purpurmc.org/v2/purpur/1.21.1/2324/download)

Argumentos de compilação:

Argumentos de execução: `nogui`

**Tamanho do arquivo:** <FmtNum :n=53.1 />MB

**Tempo de inicialização:** <FmtNum :n=8 />sec

**Tempo de desligamento:** <FmtNum :n=4 />sec

| Jogadores | RAM                 | CPU ocioso                             | CPU Máx           |
| --------- | ------------------- | -------------------------------------- | ----------------- |
| 0         | <FmtNum :n=1.4 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=25 />% |
| 1         | <FmtNum :n=1.6 />GB | <FmtNum :n=0.7 /> - <FmtNum :n=1.0 />% | <FmtNum :n=35 />% |
| 2         | <FmtNum :n=1.7 />GB | <FmtNum :n=1.1 /> - <FmtNum :n=1.3 />% | <FmtNum :n=9 />%  |
| 5         | <FmtNum :n=1.9 />GB | <FmtNum :n=1.6 />%                     | <FmtNum :n=20 />% |
| 10        | <FmtNum :n=2.2 />GB | <FmtNum :n=2 /> - <FmtNum :n=2.5 />%   | <FmtNum :n=26 />% |

## Minestom

Commit: [0ca1dda2fe](https://github.com/Minestom/Minestom/commit/0ca1dda2fe11390a1b89a228bbe7bf78fefc73e1)

Argumentos de compilação:

Argumentos de execução:

**Idioma:** Benchmarks executados com Kotlin 2.0.0 (Minestom é feito com Java)

**Tamanho do arquivo:** <FmtNum :n=2.8 />MB (Biblioteca)

**Tempo de inicialização:** <FmtNum :n=310 />ms

**Tempo de desligamento:** <FmtNum :n=0 />ms

<sub>[Usado o código do exemplo de](https://minestom.net/docs/setup/your-first-server)</sub>

| Jogadores | RAM                 | CPU ocioso                             | CPU Máx          |
| --------- | ------------------- | -------------------------------------- | ---------------- |
| 0         | <FmtNum :n=228 />MB | <FmtNum :n=0.1 /> - <FmtNum :n=0.3 />% | <FmtNum :n=1 />% |
| 1         | <FmtNum :n=365 />MB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=5 />% |
| 2         | <FmtNum :n=371 />MB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=4 />% |
| 5         | <FmtNum :n=390 />MB | <FmtNum :n=1.0 />%                     | <FmtNum :n=6 />% |
| 10        | <FmtNum :n=421 />MB | <FmtNum :n=3 />%                       | <FmtNum :n=9 />% |

Benchmarks realizados em <FmtDateTime :d="new Date('2024-10-15T16:34Z')" />
