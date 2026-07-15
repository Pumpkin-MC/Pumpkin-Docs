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

The address and port to listen for Query protocol requests on.

:::code-group

```toml [pumpkin.toml] {3}
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::

## Default Config

By default, Query is disabled. It will run on the server port if enabled unless specified explicitly.

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::
