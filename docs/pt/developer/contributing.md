### Contribuindo para o Pumpkin

Agradecemos o seu interesse em contribuir para o Pumpkin! Este documento descreve as diretrizes para o envio de relatórios de bugs, sugestões de funcionalidades e alterações de código.

### Começando

A maneira mais fácil de começar é pedindo ajuda em [nosso servidor do Discord](https://discord.gg/wT8XjrjKkf).

### Como Contribuir

Existem várias maneiras de você contribuir para o Pumpkin:

#### Reportando Bugs

Se você encontrar um bug, por favor, procure por problemas existentes no rastreador de problemas primeiro.

Se não encontrar um problema duplicado, abra um novo.

Siga o modelo e forneça uma descrição clara do bug, incluindo os passos para reproduzi-lo, se possível.
Capturas de tela, logs ou trechos de código também podem ser úteis.

#### Sugerindo Funcionalidades

Tem uma ideia de como o Pumpkin pode ser melhorado? Compartilhe seus pensamentos abrindo um problema no rastreador de problemas.

Descreva a funcionalidade proposta em detalhes, incluindo seus benefícios e considerações sobre a implementação.

#### Contribuindo com Código

Para começar a contribuir com código para o Pumpkin, faça um fork do repositório no GitHub

1. Primeiro, crie uma conta no GitHub, caso ainda não tenha uma.

2. Vá até a [Organização oficial do Pumpkin no GitHub](https://github.com/Pumpkin-MC) e clique em "fork".

> Criar um fork significa que você agora tem uma cópia do código-fonte do Pumpkin (isso não significa que você detém os direitos autorais).

Agora que você tem uma cópia que pode editar, você precisará de algumas ferramentas.

3. Instale o [git](https://git-scm.com/downloads) para o seu sistema operacional.

-   Para começar com o git, visite [Começando com Git](https://docs.github.com/en/get-started/getting-started-with-git).

-   Opcional: Se você quiser uma ferramenta gráfica para interagir com o GitHub, instale o [GitHub-Desktop](https://desktop.github.com/download/).

> O GitHub Desktop pode ser mais fácil se você não estiver acostumado com a linha de comando, mas não é para todo mundo.

-   Para começar com o GitHub Desktop, visite [Começando com o GitHub Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop).

-   Se você quiser contribuir com código, instale o Rust em [rust-lang.org](https://www.rust-lang.org/).

-   Se você deseja contribuir para a documentação, instale o [NodeJS](https://nodejs.org/en).

### Decompilando o código do Minecraft

Ao trabalhar no Pumpkin, nós dependemos muito do cliente oficial do Minecraft e utilizamos a lógica existente do servidor. Frequentemente, nos referimos ao código oficial do Minecraft.
A maneira mais fácil de decompilar o Minecraft é utilizando o Fabric Yarn. Certifique-se de ter o Gradle instalado antes de executar os seguintes comandos:

```
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

Após a decompilação, você pode encontrar o código-fonte localizado em `build/namedSrc`.

### Informações Adicionais

Incentivamos você a comentar sobre problemas e pull requests existentes para compartilhar suas ideias e fornecer feedback.

Fique à vontade para fazer perguntas no rastreador de problemas ou entrar em contato com os mantenedores do projeto caso precise de ajuda.

Antes de enviar uma grande contribuição, considere abrir um problema ou discussão, ou conversar conosco no nosso Discord para discutir sua abordagem.
