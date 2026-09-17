### Problemas Comuns

1.  ### Falha ao verificar nome de usuário

    **Problema:** Alguns jogadores relataram dificuldades ao logar no servidor, incluindo o erro "Falha ao verificar nome de usuário".

    **Causa:** Isso está relacionado à autenticação, geralmente com a configuração `prevent_proxy_connections`.

    **Solução:** Desative a opção `prevent_proxy_connections` em `pumpkin.toml`.

2.  ### Não é possível conectar usando 0.0.0.0

    **Problema:** Jogadores tentando se conectar ao servidor na mesma máquina não conseguem se conectar (ex.: erro "Connection refused") ao inserir `0.0.0.0` ou `0.0.0.0:25565`.

    **Causa:** No `pumpkin.toml`, `0.0.0.0` instrui o Pumpkin a escutar em todas as interfaces de rede locais. É um endereço de vinculação (bind) para o servidor, não um endereço de destino válido para o cliente do Minecraft se conectar.

    **Solução:**
    - Se estiver se conectando do **mesmo computador**, use `localhost` ou `127.0.0.1`.
    - Se estiver se conectando de **outro dispositivo na mesma rede local (LAN)**, use o endereço IP local do host (ex.: `192.168.x.x`).
    - Se estiver se conectando pela **internet**, outros jogadores devem usar seu endereço IP público ou domínio (com o encaminhamento de portas configurado no roteador).
