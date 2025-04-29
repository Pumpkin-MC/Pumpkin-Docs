### RCON

### O que é RCON

RCON (Console Remoto) é um protocolo criado pela Valve para permitir que administradores controlem e gerenciem servidores de jogos remotamente. Ele oferece uma maneira de executar comandos em um servidor de um local diferente, como um celular ou um computador separado.

### Por que usar RCON

-   **Conveniência:** Gerencie seu servidor de qualquer lugar com uma conexão à internet.
-   **Flexibilidade:** Execute comandos sem precisar estar fisicamente presente no local do servidor.
-   **Eficiência:** Automatize tarefas e torne o gerenciamento do servidor mais ágil.

### SSH vs RCON

**SSH**

-   Oferece forte criptografia para proteger os dados transmitidos entre o cliente e o servidor.
-   Principalmente projetado para login remoto seguro e execução de comandos em uma máquina remota.
-   Comumente usado para gerenciar sistemas Linux/Unix, configurar redes e executar scripts.
-   Fornece um ambiente de shell, permitindo que você execute diversos comandos e interaja com o sistema remoto.

**RCON**

-   Especificamente projetado para administração remota de servidores de jogos, permitindo que você controle e gerencie as configurações e operações do servidor.
-   Geralmente menos seguro que o SSH, pois muitas vezes depende de senhas em texto simples.
-   Principalmente utilizado por administradores de servidores de jogos para gerenciar servidores de jogos.
-   Tem um conjunto limitado de comandos, específicos do jogo.

### Pacotes

RCON é um protocolo muito simples com poucos pacotes. Veja como um pacote RCON se parece:

| Campo | Descrição                                                   |
| ----- | ----------------------------------------------------------- |
| ID    | Usado para indicar se a autenticação falhou ou teve sucesso |
| Tipo  | Identifica o tipo de pacote                                 |
| Corpo | Uma mensagem (String), por exemplo, um comando ou uma senha |

#### Pacotes Serverbound <sub><sub>(Cliente→Servidor)</sub></sub>

| Tipo | Pacote      |
| ---- | ----------- |
| 2    | Auth        |
| 3    | ExecCommand |

#### Pacotes Clientbound <sub><sub>(Servidor→Cliente)</sub></sub>

| Tipo | Pacote       |
| ---- | ------------ |
| 2    | AuthResponse |
| 0    | Output       |

### Como o RCON Funciona

1. **Autenticação:**

    - O cliente RCON envia um pacote de autenticação com a senha desejada.
    - O servidor verifica a senha e responde com um pacote de resposta de autenticação.
    - Se bem-sucedido, o pacote de resposta inclui o mesmo ID enviado pelo cliente. Se não for bem-sucedido, o ID é -1.

2. **Execução de Comandos:**

    - O cliente autenticado pode agora enviar pacotes de execução de comandos, com cada pacote contendo o comando a ser executado.
    - O servidor processa o comando e envia de volta um pacote de saída contendo o resultado ou qualquer mensagem de erro.
