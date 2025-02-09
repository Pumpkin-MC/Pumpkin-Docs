# Query

Query protocol is an simple way to query the server about its status. Pumpkin fully supports the query protocol.

## `enabled`

Whether to listen for query protocol requests or not.

:::code-group
```toml [features.toml]
[query]
enabled = true # Boolean
```
:::

## `port`

What port to listen to query protocol requests. If not specified, it uses the same port as the server.

:::code-group
```toml [features.toml]
[query]
port = 25565 # Integer (0-65535) (optional)
```
:::
