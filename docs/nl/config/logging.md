# Logging
Pumpkin stelt je in staat om aan te passen wat je in je logs wilt hebben.

## Logging configureren

#### `enabled`: Boolean
Of logging is ingeschakeld of niet.

:::code-group
```toml [features.toml] {2}
[logging]
enabled = true
```
:::

#### `level`: Enum
Wat er moet worden gelogd. Mogelijke waarden zijn:
- Off
- Error
- Warn
- Info
- Debug
- Trace

:::code-group
```toml [features.toml] {3}
[logging]
enabled = true
level = "Debug"
```
:::

#### `env`: Boolean
Of het mogelijk is om het logniveau te kiezen door de `RUST_LOG`-omgevingsvariabele in te stellen of niet.

:::code-group
```toml [features.toml] {3}
[logging]
enabled = true
env = true
```
:::

#### `threads`: Boolean
Of threads in het logbericht moeten worden weergegeven of niet.

:::code-group
```toml [features.toml] {3}
[logging]
enabled = true
threads = false
```
:::

#### `color`: Boolean
Of er met kleur naar de console moet worden geprint of niet.

:::code-group
```toml [features.toml] {3}
[logging]
enabled = true
color = false
```
:::

#### `timestamp`: Boolean
Of de tijdstempel in het bericht moet worden weergegeven of niet.

:::code-group
```toml [features.toml] {3}
[logging]
enabled = true
timestamp = false
```
:::

## Standaardconfiguratie
Standaard is logging ingeschakeld en wordt er met kleur, threads en tijdstempel op het `Info`-niveau geprint. 

:::code-group
```toml [features.toml]
[logging]
enabled = true
level = "Info"
env = false
threads = true
color = true
timestamp = true
```
:::
