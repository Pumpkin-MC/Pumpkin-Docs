# Primeiros Passos

**Status Atual:**
Pré-lançamento: Atualmente em desenvolvimento e ainda não pronto para lançamento oficial.

## Rust

Para rodar o Pumpkin com Rust, certifique-se de ter o [Rust](https://www.rust-lang.org/tools/install) instalado.

1. Clone o repositório:

```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **Opcional:** Se desejar, você pode colocar um mundo Vanilla no diretório `Pumpkin/`. Apenas nomeie a pasta do mundo como `world`.

3. Execute:

> [!NOTE] NOTA
> O processo de construção pode demorar um pouco, devido a otimizações pesadas para builds de lançamento.

```shell
cargo run --release
```

4. **Opcional:** Se quiser usar os recursos do seu processador, você pode configurar a flag do compilador Rust `target-cpu=native`.

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

## Docker

> [!IMPORTANT] IMPORTANTE
> O suporte ao Docker está atualmente em fase experimental.

Se ainda não tiver, você precisa [instalar o Docker](https://docs.docker.com/engine/install/). Após instalar o Docker, você pode rodar o seguinte comando para iniciar o servidor:

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

-   `<exposed_port>`: A porta que você deseja usar para conectar ao Pumpkin, por exemplo `25565`.
-   `<server_data_location>`: O local onde você deseja que as configurações e dados do servidor sejam armazenados, por exemplo `./data`.

### Exemplo

Para rodar o Pumpkin na porta `25565` e armazenar os dados em um diretório chamado `./data`, você executaria o seguinte comando:

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Servidor de Teste

Pumpkin tem um servidor de teste mantido por @kralverde. Ele roda no commit mais recente da branch master do Pumpkin.

-   **IP:** pumpkin.kralverde.dev

**Especificações:**

-   SO: Debian GNU/Linux bookworm 12.7 x86_64
-   Kernel: Linux 6.1.0-21-cloud-amd64
-   CPU: Intel Core (Haswell, sem TSX) (2) @ 2.40 GHz
-   RAM: 4GB DIMM
