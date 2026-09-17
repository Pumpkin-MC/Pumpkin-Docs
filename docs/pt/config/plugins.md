# Plugins

O Pumpkin fornece um runtime de plugins em WebAssembly (WASM) com segurança baseada em recursos (capabilities). O comportamento dos plugins, verificação de assinaturas e permissões são configurados em `[plugins]` no `pumpkin.toml`.

## Configuração

:::code-group

```toml [pumpkin.toml]
[plugins]
enabled = true
hot_reload = false
ask_permission_confirmation = true
allow_unsigned = true
allowed_permissions = []
blocked_permissions = []
inherit_env = false
loopback_only = false
verify_signatures = true

# Sobrescritas opcionais por plugin
[plugins.overrides.my_plugin]
enabled = true
allow_unsigned = true
max_memory_mb = 128
allowed_permissions = ["fs:read:data"]
blocked_permissions = ["network:outbound"]
loopback_only = true

[plugins.overrides.my_plugin.environment]
API_KEY = "example_secret"
```

:::

### Configurações Globais de Plugins

- **`enabled`**: Chave mestre para habilitar ou desabilitar o runtime de plugins (padrão: `true`).
- **`hot_reload`**: Monitora o diretório `plugins/` e recarrega automaticamente plugins modificados em tempo de execução (padrão: `false`).
- **`ask_permission_confirmation`**: Pergunta no console do servidor quando um plugin solicitar recursos/permissões não aprovadas (padrão: `true`).
- **`allow_unsigned`**: Permite carregar plugins WASM não assinados (padrão: `true`).
- **`allowed_permissions`**: Lista de permissões pré-aprovadas globalmente para todos os plugins, ignorando solicitações interativas no console (padrão: `[]`).
- **`blocked_permissions`**: Lista de permissões negadas globalmente para todos os plugins (padrão: `[]`).
- **`inherit_env`**: Se as variáveis de ambiente do host são herdadas nas sandboxes WASI dos plugins por padrão (padrão: `false`).
- **`loopback_only`**: Se as conexões de rede de saída dos plugins são restritas a `127.0.0.1` / localhost (padrão: `false`).
- **`max_memory_mb`**: (Opcional) Limite global máximo de memória em megabytes (MB) por instância de plugin.
- **`verify_signatures`**: Se o Pumpkin verifica assinaturas criptográficas em plugins WASM antes de carregá-los (padrão: `true`).

### Sobrescritas por Plugin

Ajuste permissões e variáveis de ambiente para plugins específicos sob `[plugins.overrides.<plugin_name>]`:

- **`enabled`**: Habilita ou desabilita este plugin específico (padrão: `true`).
- **`allow_unsigned`**: Sobrescreve se este plugin específico pode executar sem assinatura (`true`/`false`).
- **`max_memory_mb`**: Limite máximo de memória em MB alocado especificamente para este plugin.
- **`allowed_permissions`**: Permissões pré-aprovadas para este plugin.
- **`blocked_permissions`**: Permissões explicitamente bloqueadas para este plugin.
- **`loopback_only`**: Sobrescreve a restrição de rede de loopback para este plugin.
- **`environment`**: Tabela de variáveis de ambiente personalizadas repassadas diretamente para o ambiente WASI do plugin.
