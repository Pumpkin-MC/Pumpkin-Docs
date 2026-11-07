# Telemetry

Pumpkin includes optional anonymous telemetry and an opt-in public server directory. Telemetry settings are configured under `[telemetry]` in `pumpkin.toml`.

## Configuration

:::code-group

```toml [pumpkin.toml]
[telemetry]
enabled = true
endpoint = "https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"
interval_secs = 300
public = false
# server_name = "My Pumpkin Server"
```

:::

### Configuration Options

- **`enabled`**: Whether anonymous telemetry is enabled (default: `true`).
- **`endpoint`**: Telemetry backend ingestion endpoint URL (default: `"https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"`).
- **`interval_secs`**: Heartbeat interval in seconds (default: `300` seconds / 5 minutes, minimum `60` seconds).
- **`public`**: Whether to opt in to displaying this server in the public community directory (default: `false`).
- **`server_name`**: (Optional) Public server name displayed on the analytics dashboard when `public` is `true`.
