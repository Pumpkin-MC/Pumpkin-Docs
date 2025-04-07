# Desenvolvimento do Pumpkin no Mobile

Se você é um usuário móvel e deseja editar o código-fonte, você consegue fazer isso!  
(Esta página foi escrita no Android usando o Helix.)

Primeiro de tudo, precisamos de um aplicativo de terminal.  
Recomendamos o [Termux](https://github.com/termux/termux-app/releases) porque é estável e open source.  
Baixe o arquivo apk necessário para a arquitetura do seu dispositivo e instale o Termux.

Após isso, você precisará rodar alguns comandos. Usamos o Helix pela sua simplicidade.

```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

Se você quiser contribuir, precisará instalar o software do GitHub.

```bash
  pkg install gh
```

Também recomendamos instalar o fish shell porque ele é mais amigável do que o bash.

```bash
  pkg install fish
  chsh -s fish
```

Agora que você instalou as ferramentas básicas, precisamos fazer algumas configurações.  
Se você quiser contribuir, precisará fazer login no GitHub.

```bash
  gh auth login
```

Também configure o git: altere o editor para o vim, edite suas credenciais, etc.

Após isso, você precisa clonar o repositório do Pumpkin. (Antes disso, você pode criar um diretório de projeto com `mkdir proj`; é útil)

```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

Se você quiser contribuir, precisa fazer um fork do nosso repositório e trocar `Pumpkin-MC` pelo seu nome de usuário no GitHub.

A configuração está toda feita agora! Aproveite :)

# FAQ

## Como usar o editor de texto?

Digite `hx <caminho>`.

## Como navegar pelo projeto?

Você pode usar `ls`, `cd` e outros programas.  
Também pode usar `hx <diretório>` para navegar pelo seu diretório ao iniciar.

## Como posso digitar no editor?

Pressione `i` se você estiver no modo normal.

## COMO SAIR DO EDITOR????

Pressione `esc` e depois digite `:q!` se não quiser salvar, ou `:wq` se quiser salvar.

## Onde posso aprender a usar esse editor?

Execute `hx --tutor` ou acesse o site oficial deles.

## Por que não usar o VS Code?

1. O VS Code é difícil de configurar e funciona com funcionalidades limitadas na versão web.
2. O rust-analyzer não funciona nele. Talvez um emulador ajude com isso, mas isso pode retardar a compilação do código.
3. Com o VS Code, é altamente desejável ter um mouse, enquanto no Helix você só precisa de um teclado.
4. O VS Code é lento em alguns dispositivos.

## Por que é tão difícil digitar?

Compre um teclado bluetooth barato e veja como fica mais fácil.
