## Authentication
### Why authentication
Offline accounts, that is, accounts generated from a player's username without contacting an authorization or authentication server, can have any nickname chosen. This, without additional plugins, means that players can impersonate other players, including those with operator permissions.

### Offline server
By default, `online_mode` is enabled in the configuration. This enables authentication, disabling offline accounts. If you want to allow offline accounts, you can disable `online_mode` in `configuration.toml`.

### How Yggdrasil Auth works
1. The client gets an authentication token and UUID from the launcher.
2. The client, during loading, fetches data from the authorization/authentication server using the authentication token, such as various signing keys and the list of blocked servers.
3. The client, when joining the server, sends a join request to the authorization/authentication servers. Mojang servers can deny this request if the account is banned.
4. The client sends its identification to the server in a packet.
5. The server, based on this identification, sends a `hasJoined` request to the authorization/authentication servers. If it succeeds, it obtains the player information, such as the skin.

### Custom Authentication Server

Pumpkin supports custom authentication servers. You can replace the authentication URL in `features.toml`.

#### How Pumpkin Authentication Works

1. **GET Request:** Pumpkin sends a GET request to the specified authentication URL.
2. **Status Code 200:** If the authentication is successful, the server responds with a status code of 200.
3. **Parse JSON Game Profile:** Pumpkin parses the JSON game profile returned in the response.

#### Game Profile

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // Optional, only present when actions are applied
}
```

##### Property

```rust
struct Property {
    name: String,
    value: String, // Base64 encoded
    signature: Option<String>, // Optional, Base64 encoded
}
```

##### Profile Action

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```
