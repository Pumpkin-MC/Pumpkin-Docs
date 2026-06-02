# Query

The Query protocol is a simple way to query the server about its status. Pumpkin fully supports the Query protocol.

## Configuring Query

#### `enabled`: Boolean

Whether to listen for Query protocol requests or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.query]
enabled = true
```

:::

#### `address`: String

The address and port the query service binds to.

:::code-group

```toml [pumpkin.toml] {3}
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::

## Default Config

By default, Query is enabled and binds to the same address as the server.

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::
