# Query

The Query protocol allows external applications (such as server lists or monitoring systems) to request status details from Pumpkin.

## Configuration

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::

### Configuration Options

- **`enabled`**: Enables or disables the Query listener.
- **`address`**: Network address and port to bind the Query listener to.
