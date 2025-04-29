### Problemas Comuns

1.  ### Falha ao verificar nome de usuário

    **Problema:** Alguns jogadores relataram dificuldades ao logar no servidor, incluindo o erro "Falha ao verificar nome de usuário".

    **Causa:** Isso está relacionado à autenticação, geralmente com a configuração `prevent_proxy_connections`.

    **Solução:** Desative a opção `prevent_proxy_connections` em `features.toml`.
