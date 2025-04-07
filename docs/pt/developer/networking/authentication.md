## Autenticação

### Por que a autenticação é necessária

Contas offline, ou seja, contas geradas a partir do nome de usuário de um jogador sem entrar em contato com um servidor de autorização ou autenticação, podem ter qualquer nickname escolhido. Isso, sem plugins adicionais, significa que jogadores podem se passar por outros jogadores, incluindo aqueles com permissões de operador.

### Servidor Offline

Por padrão, `online_mode` está ativado na configuração. Isso habilita a autenticação, desabilitando contas offline. Se você deseja permitir contas offline, pode desabilitar `online_mode` no arquivo `configuration.toml`.

### Como funciona a autenticação Yggdrasil

1. O cliente obtém um token de autenticação e UUID do launcher.
2. O cliente, durante o carregamento, obtém dados do servidor de autorização/autenticação usando o token de autenticação, como várias chaves de assinatura e a lista de servidores bloqueados.
3. O cliente, ao entrar no servidor, envia uma solicitação de entrada para os servidores de autorização/autenticação. Os servidores Mojang podem negar essa solicitação se a conta estiver banida.
4. O cliente envia sua identificação para o servidor em um pacote.
5. O servidor, com base nessa identificação, envia uma solicitação `hasJoined` para os servidores de autorização/autenticação. Se for bem-sucedido, ele obtém as informações do jogador, como a skin.

### Servidor de Autenticação Personalizado

Pumpkin suporta servidores de autenticação personalizados. Você pode substituir a URL de autenticação no arquivo `features.toml`.

#### Como funciona a autenticação no Pumpkin

1. **Requisição GET:** Pumpkin envia uma requisição GET para a URL de autenticação especificada.
2. **Código de status 200:** Se a autenticação for bem-sucedida, o servidor responde com o código de status 200.
3. **Parse do Perfil de Jogo em JSON:** O Pumpkin analisa o perfil de jogo em JSON retornado na resposta.

#### Perfil de Jogo

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // Opcional, presente apenas quando ações são aplicadas
}
```

##### Propriedade

```rust
struct Property {
    name: String,
    value: String, // Codificado em Base64
    signature: Option<String>, // Opcional, codificado em Base64
}
```

##### Ação de Perfil

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```
