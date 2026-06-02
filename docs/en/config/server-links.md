# Server Links

Pumpkin allows you to configure links shown to clients in the server status screen.

## Configuring Server Links

#### `enabled`: Boolean

Whether server links are enabled.

:::code-group

```toml [pumpkin.toml] {2}
[server_links]
enabled = true
```

:::

### Default Links

The following link fields are available:

| Field           | Description                     | Default |
| --------------- | ------------------------------- | ------- |
| `bug_report`    | URL for reporting bugs          | Pumpkin GitHub issues |
| `support`       | URL for support resources       | (empty) |
| `status`        | URL for server status           | (empty) |
| `feedback`      | URL for player feedback         | (empty) |
| `community`     | URL for the community page      | (empty) |
| `website`       | URL for the official website    | (empty) |
| `forums`        | URL for forums                  | (empty) |
| `news`          | URL for news updates            | (empty) |
| `announcements` | URL for announcements           | (empty) |

:::code-group

```toml [pumpkin.toml]
[server_links]
enabled = true
bug_report = "https://github.com/Pumpkin-MC/Pumpkin/issues"
support = ""
status = ""
feedback = ""
community = ""
website = ""
forums = ""
news = ""
announcements = ""
```

:::

### Custom Links

You can add custom links using the `[server_links.custom]` table:

:::code-group

```toml [pumpkin.toml]
[server_links.custom]
discord = "https://discord.gg/example"
store = "https://store.example.com"
```

:::

## Default Config

:::code-group

```toml [pumpkin.toml]
[server_links]
enabled = true
bug_report = "https://github.com/Pumpkin-MC/Pumpkin/issues"
support = ""
status = ""
feedback = ""
community = ""
website = ""
forums = ""
news = ""
announcements = ""

[server_links.custom]
```

:::
