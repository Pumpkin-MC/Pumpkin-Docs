# Query
The Query protocol is a simple way to query the server about its status. Pumpkin fully supports the Query protocol.

## Configuring Query

#### `enabled`: Boolean
Whether to listen for Query protocol requests or not.

:::code-group
```toml [features.toml] {2}
[query]
enabled = true
```
:::

#### `port`: Integer (0-65535) (optional)
Which port to listen to Query protocol requests on. If not specified, it uses the same port as the server.

:::code-group
```toml [features.toml] {3}
[query]
enabled = true
port = 12345
```
:::

## Default Config
By default, Query is disabled. It will run on the server port if enabled unless specified explicitly.

:::code-group
```toml [features.toml]
[query]
enabled = true
port = 25565
```
:::
