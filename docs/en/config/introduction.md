# Configuration

Pumpkin offers a robust configuration system that allows you to customize various aspects of the server's behavior without relying on external plugins.

## Config File

Pumpkin uses a single configuration file:

- `pumpkin.toml`: the main configuration file containing all server settings, from basic networking to advanced features

When Pumpkin starts for the first time, it generates `pumpkin.toml` with default values in the working directory. You can edit it before or after the initial run. Missing fields are automatically filled with defaults on startup.

## Structure

The configuration is organized into sections:

- **Top-level fields**: core settings like edition support, addresses, seed, player limits, difficulty, and gameplay rules
- **`[logging]`**: log output and formatting
- **`[resource_pack]`**: Java and Bedrock resource pack configuration
- **`[world]`**: world generation, chunk storage, lighting, and autosave
- **`[networking]`**: authentication, compression, proxy, query, RCON, and LAN broadcast
- **`[commands]`**: command system settings
- **`[chat]`**: chat message formatting
- **`[pvp]`**: PVP rules and mechanics
- **`[server_links]`**: links shown to clients
- **`[player_data]`**: player data persistence
- **`[fun]`**: experimental features
- **`[recipe]`**: recipe book configuration
- **`[plugins]`**: plugin permission settings

## Server Version

Pumpkin aims to support the latest Minecraft Version. If you want to host a Pumpkin server for any other version, there is a project called [ViaProxy](https://github.com/ViaVersion/ViaProxy).

- Make sure to allow proxy connections.
- Pumpkin and ViaProxy have no connection; don't submit issues regarding their code. Furthermore, this is a 3rd party proxy and Pumpkin does not take any responsibility for the good or the bad.

### Key Features

- Extensive Customization: Configure server settings, player behavior, world generation, and more.
- Performance Optimization: Optimize server performance through configuration tweaks.
- Plugin-Free Customization: Achieve desired changes without the need for additional plugins.
