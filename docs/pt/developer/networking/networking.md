### Rede (Networking)

A maior parte do código de rede do Pumpkin pode ser encontrada na crate [pumpkin-protocol](https://github.com/Pumpkin-MC/Pumpkin/tree/master/pumpkin-protocol).

Serverbound: Cliente→Servidor

Clientbound: Servidor→Cliente

### Estrutura

Os pacotes no protocolo Pumpkin são organizados por funcionalidade e estado.

`server`: Contém definições para pacotes serverbound.

`client`: Contém definições para pacotes clientbound.

### Estados

**Handshake**: Sempre o primeiro pacote enviado pelo cliente. Isso também determina o próximo estado, geralmente indicando se o jogador deseja realizar uma solicitação de status, entrar no servidor ou ser transferido.

**Status**: Indica que o cliente deseja ver uma resposta de status (MOTD).

**Login**: A sequência de login. Indica que o cliente deseja entrar no servidor.

**Config**: Uma sequência de pacotes de configuração que são principalmente enviados do servidor para o cliente (recursos, pacotes de recursos, links do servidor, etc.).

**Play**: O estado final, que indica que o jogador está pronto para entrar, também é usado para lidar com todos os outros pacotes de gameplay.

### Protocolo Minecraft

Você pode encontrar todos os pacotes do Minecraft Java em [Minecraft Wiki](https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol). Lá você também pode ver em qual [estado](#estados) eles estão. Você também pode ver todas as informações que os pacotes possuem, as quais podemos ler ou escrever, dependendo se são serverbound ou clientbound.

### Adicionando um Pacote

1. Adicionar um pacote é fácil. Primeiro, derive:

```rust
// Para pacotes clientbound:
#[derive(Serialize)]

// Para pacotes serverbound:
#[derive(Deserialize)]
```

2. Em seguida, você deve deixar claro que sua struct representa um pacote. Isso automaticamente obterá o ID do pacote do arquivo JSON de pacotes.

```rust
// Para pacotes clientbound:
#[client_packet("play:disconnect")]

// Para pacotes serverbound:
#[server_packet("login:move_player_pos")]
```

3. Agora você pode criar a `struct`.

> [!IMPORTANT] IMPORTANTE
> Por favor, comece o nome do pacote com "C" ou "S" para "Clientbound" ou "Serverbound".
> Além disso, se for um pacote que pode ser enviado em múltiplos [estados](#estados), adicione o estado ao nome. Por exemplo, existem 3 pacotes de desconexão diferentes.
>
> -   `CLoginDisconnect`
> -   `CConfigDisconnect`
> -   `CPlayDisconnect`

Crie campos dentro da sua estrutura de pacote para representar os dados que serão enviados.

> [!IMPORTANT] IMPORTANTE
> Use nomes de campos descritivos e tipos de dados apropriados.

Exemplos:

```rust
pub struct CPlayDisconnect {
    reason: TextComponent,
    // mais campos...
}

pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

4. (Apenas pacotes clientbound) Implemente uma função `new` para que possamos realmente criá-los inserindo os valores.

```rust
impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}
```

5. No final, tudo deve se juntar.

```rust
#[derive(Serialize)]
#[client_packet("play:disconnect")]
pub struct CPlayDisconnect {
    reason: TextComponent,
}

impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}

#[derive(Deserialize)]
#[server_packet("login:move_player_pos")]
pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

6. Você também pode serializar/deserializar o pacote manualmente, o que pode ser útil se o pacote for mais complexo.

```diff
-#[derive(Serialize)]

+ impl ClientPacket for CPlayDisconnect {
+    fn write(&self, bytebuf: &mut BytesMut) {
+       bytebuf.put_slice(&self.reason.encode());
+    }

-#[derive(Deserialize)]

+ impl ServerPacket for SPlayerPosition {
+    fn read(bytebuf: &mut Bytes) -> Result<Self, ReadingError> {
+       Ok(Self {
+           x: bytebuf.try_get_f64()?,
+           feet_y: bytebuf.try_get_f64()?,
+           z: bytebuf.try_get_f64()?,
+           ground: bytebuf.try_get_bool()?,
+       })
+    }
```

7. Agora você pode enviar o pacote clientbound (veja [Enviando Pacotes](#enviando-pacotes)) ou ouvir o pacote serverbound (veja [Recebendo Pacotes](#recebendo-pacotes)).

### Cliente

Pumpkin categoriza `Client`s e `Player`s separadamente. Tudo o que não está no estado de jogo é um simples `Client`. Aqui estão as diferenças:

**Client**

-   Só pode estar nos estados: Status, Login, Transfer, Config
-   Não é uma entidade viva
-   Consome poucos recursos

**Player**

-   Só pode estar no estado Play
-   É uma entidade viva no mundo
-   Possui mais dados e consome mais recursos

#### Enviando Pacotes

Exemplo:

```rust
// Funciona apenas no estado Status
client.send_packet(&CStatusResponse::new("{ description: "A Description"}"));
```

#### Recebendo Pacotes

Para `Client`s:
`src/client/mod.rs`

```diff
// Coloque o pacote no estado correto
 fn handle_mystate_packet(
  &self,
    server: &Arc<Server>,
    packet: &mut RawPacket,
) -> Result<(), ReadingError> {
    let bytebuf = &mut packet.bytebuf;
    match packet.id.0 {
        SStatusRequest::PACKET_ID => {
                self.handle_status_request(server, SStatusRequest::read(bytebuf)?)
                    .await;
            }
+            MyPacket::PACKET_ID => {
+                self.handle_my_packet(MyPacket::read(bytebuf)?)
+                    .await;
            }
            _ => {
            log::error!(
                "Falha ao lidar com o pacote id {} enquanto no estado ...",
                packet.id.0
            );
            }
    };
    Ok(())
}
```

Para `Player`s:
`src/entity/player.rs`

```diff
// Players só têm o estado Play
 fn handle_play_packet(
  &self,
    server: &Arc<Server>,
    packet: &mut RawPacket,
) -> Result<(), ReadingError> {
    let bytebuf = &mut packet.bytebuf;
    match packet.id.0 {
        SChatMessage::PACKET_ID => {
            self.handle_chat_message(SChatMessage::read(bytebuf)?).await;
        }
       MyPacket::PACKET_ID => {
+           self.handle_mypacket(server, MyPacket::read(bytebuf)?).await;
        }
        _ => {
            log::error!(
                "Falha ao lidar com o pacote id {} enquanto no estado ...",
                packet.id.0
            );
        }
    };
    Ok(())
}
```

### Compressão

Os pacotes do Minecraft **podem** usar compressão ZLib para decodificação/encodificação. Normalmente, existe um limite quando a compressão é aplicada; isso afeta principalmente pacotes de chunks.

### Portabilidade

Para portar para uma nova versão do Minecraft, você pode comparar as diferenças no protocolo na [referência de protocolo minecraft.wiki](https://minecraft.wiki/w/Java_Edition_protocol).

Além disso, altere o `CURRENT_MC_PROTOCOL` em `src/lib.rs`.
