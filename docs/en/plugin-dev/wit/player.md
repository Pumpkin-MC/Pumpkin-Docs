---
title: Interface player
outline: [2, 2]
---

# Interface `player`

Host import: `pumpkin:plugin/player@0.1.0`

[Package summary](./)

Source: [player.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/player.wit)

Players and player operations.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`common`](./common) | `hand`, `position`, `game-mode`, `block-pos` |
| [`item-stack`](./item-stack) | `item-stack` |
| [`world`](./world) | `%world`, `entity`, `ray-trace-block-result`, `ray-trace-entity-result` |
| [`permission`](./permission) | `permission-level` |
| [`text`](./text) | `text-component` |
| [`gui`](./gui) | `gui` |
| [`forms`](./forms) | `form` |
| [`java-dialogs`](./java-dialogs) | `dialog` |
| [`java-packets`](./java-packets) | `clientbound-packet as java-packet` |
| [`bedrock-packets`](./bedrock-packets) | `clientbound-packet as bedrock-packet` |
| [`uuid`](./uuid) | `uuid` |
| [`status-effect`](./status-effect) | `status-effect-type`, `status-effect-instance` |
| [`scoreboard`](./scoreboard) | `scoreboard`, `bedrock-scoreboard` |
| [`advancement`](./advancement) | `advancement-progress` |
| [`damage-types`](./damage-types) | `damage-type` |
| [`statistics`](./statistics) | `statistic-category`, `custom-statistic` |
| [`inventory`](./inventory) | `inventory`, `player-inventory` |
| [`sounds`](./sounds) | `sound`, `sound-category` |
| [`particles`](./particles) | `particle` |
| [`entity-statuses`](./entity-statuses) | `entity-status` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`ban-ip-options`](#type-ban-ip-options) | Options for banning an IP address. |
| record | [`ban-player-options`](#type-ban-player-options) | Options for banning a player. |
| enum | [`bedrock-ability`](#type-bedrock-ability) | Represents the various abilities a Bedrock Edition player can have. |
| enum | [`bedrock-device-os`](#type-bedrock-device-os) | Represents the operating system of a Bedrock Edition client. |
| enum | [`bedrock-disconnect-reason`](#type-bedrock-disconnect-reason) | Protocol-level disconnect reasons for Minecraft Bedrock Edition. |
| enum | [`bedrock-graphics-mode`](#type-bedrock-graphics-mode) | Represents the graphics mode used by a Bedrock Edition client. |
| enum | [`bedrock-input-mode`](#type-bedrock-input-mode) | Represents the input mode used by a Bedrock Edition client. |
| record | [`bedrock-kick-options`](#type-bedrock-kick-options) | Options for disconnecting a Bedrock Edition player. |
| enum | [`bedrock-minecraft-version`](#type-bedrock-minecraft-version) | Represents a specific version of the Minecraft Bedrock Edition protocol. |
| resource | [`bedrock-player`](#type-bedrock-player) | A handle to a player connected via the Bedrock Edition. |
| record | [`bedrock-player-settings`](#type-bedrock-player-settings) | Represents settings and client data for a Bedrock Edition player. |
| record | [`bedrock-resource-pack-entry`](#type-bedrock-resource-pack-entry) | Represents an individual Bedrock Edition resource pack entry. |
| record | [`bedrock-resource-packs-info`](#type-bedrock-resource-packs-info) | Represents the resource packs information payload sent to Bedrock clients. |
| enum | [`bedrock-status-flag`](#type-bedrock-status-flag) | Represents the various status flags a Bedrock Edition entity can have. |
| enum | [`bedrock-ui-profile`](#type-bedrock-ui-profile) | Represents the UI profile used by a Bedrock Edition client. |
| enum | [`chat-mode`](#type-chat-mode) | The chat visibility settings for a player. |
| enum | [`client-game-event`](#type-client-game-event) | Types of clientbound game events. |
| record | [`java-kick-options`](#type-java-kick-options) | Options for disconnecting a Java Edition player. |
| enum | [`java-minecraft-version`](#type-java-minecraft-version) | Represents a specific version of the Minecraft Java Edition protocol. |
| resource | [`java-player`](#type-java-player) | A handle to a player connected via the Java Edition. |
| record | [`java-player-settings`](#type-java-player-settings) | Represents settings for a Java Edition player. |
| record | [`java-resource-pack`](#type-java-resource-pack) | Represents a resource pack sent to a Java Edition player. |
| enum | [`known-server-link`](#type-known-server-link) | Built-in known server link types displayed in the client Escape pause menu. |
| resource | [`player`](#type-player) | A handle to a player on the server. |
| record | [`player-abilities`](#type-player-abilities) | Various abilities a player can have. |
| record | [`player-skin`](#type-player-skin) | Represents a player's skin textures and metadata. |
| enum | [`player-weather`](#type-player-weather) | Represents per-player weather condition overrides. |
| enum | [`projectile-type`](#type-projectile-type) | Types of projectiles that can be launched by a player. |
| record | [`server-link`](#type-server-link) | Represents a server link entry with a label and destination URL. |
| variant | [`server-link-label`](#type-server-link-label) | Label for a server link: either a built-in standard link type or a custom text component. |
| flags | [`skin-parts`](#type-skin-parts) | Represents which skin parts are visible. |
| enum | [`socket-teardown-policy`](#type-socket-teardown-policy) | Policy for tearing down the player's network connection. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `bedrock-player` | [`get-ability`](#operation-bedrock-player-get-ability) | Returns whether a specific Bedrock-only ability is enabled for the player. |
| `bedrock-player` | [`get-scoreboard`](#operation-bedrock-player-get-scoreboard) | Returns the Bedrock scoreboard handle for this player. |
| `bedrock-player` | [`get-settings`](#operation-bedrock-player-get-settings) | Returns the player's configuration settings. |
| `bedrock-player` | [`get-status-flag`](#operation-bedrock-player-get-status-flag) | Returns whether a specific Bedrock-only status flag is enabled for the player. |
| `bedrock-player` | [`get-version`](#operation-bedrock-player-get-version) | Returns the Minecraft Bedrock Edition version of the player. |
| `bedrock-player` | [`kick`](#operation-bedrock-player-kick) | Kicks the Bedrock player with the specified options. |
| `bedrock-player` | [`open-form`](#operation-bedrock-player-open-form) | Opens a Bedrock custom form for the player. |
| `bedrock-player` | [`reset-scoreboard`](#operation-bedrock-player-reset-scoreboard) | Resets the player's custom Bedrock scoreboard back to the world scoreboard. |
| `bedrock-player` | [`send-packet`](#operation-bedrock-player-send-packet) | Sends a Bedrock-specific clientbound packet to the player. |
| `bedrock-player` | [`send-resource-packs-info`](#operation-bedrock-player-send-resource-packs-info) | Sends resource packs information to the Bedrock player. |
| `bedrock-player` | [`set-ability`](#operation-bedrock-player-set-ability) | Sets whether a specific Bedrock-only ability is enabled for the player. |
| `bedrock-player` | [`set-status-flag`](#operation-bedrock-player-set-status-flag) | Sets whether a specific Bedrock-only status flag is enabled for the player. |
| `java-player` | [`clear-dialog`](#operation-java-player-clear-dialog) | Clears any currently shown dialog for the player. |
| `java-player` | [`clear-resource-packs`](#operation-java-player-clear-resource-packs) | Clears all custom resource packs for the Java player. |
| `java-player` | [`get-brand`](#operation-java-player-get-brand) | Returns the brand of the player's client (e.g., \"vanilla\", \"fabric\"). |
| `java-player` | [`get-scoreboard`](#operation-java-player-get-scoreboard) | Returns the Java scoreboard handle for this player. |
| `java-player` | [`get-server-address`](#operation-java-player-get-server-address) | Returns the server address the player used to connect. |
| `java-player` | [`get-settings`](#operation-java-player-get-settings) | Returns the player's configuration settings. |
| `java-player` | [`get-version`](#operation-java-player-get-version) | Returns the Minecraft Java Edition version of the player. |
| `java-player` | [`kick`](#operation-java-player-kick) | Kicks the Java player with the specified options. |
| `java-player` | [`remove-resource-pack`](#operation-java-player-remove-resource-pack) | Removes a specific resource pack by UUID for the Java player. |
| `java-player` | [`reset-scoreboard`](#operation-java-player-reset-scoreboard) | Resets the player's custom Java scoreboard back to the world scoreboard. |
| `java-player` | [`send-custom-payload`](#operation-java-player-send-custom-payload) | Sends a custom payload packet (plugin message) to the player. |
| `java-player` | [`send-entity-status`](#operation-java-player-send-entity-status) | Sends an entity status / animation event packet to the Java player for a specific entity ID. |
| `java-player` | [`send-game-event`](#operation-java-player-send-game-event) | Sends a clientbound GameEvent packet to the Java player. |
| `java-player` | [`send-packet`](#operation-java-player-send-packet) | Sends a Java-specific clientbound packet to the player. |
| `java-player` | [`send-resource-pack`](#operation-java-player-send-resource-pack) | Sends a resource pack to the Java player. |
| `java-player` | [`show-dialog`](#operation-java-player-show-dialog) | Shows a dialog to the player. |
| `player` | [`add-effect`](#operation-player-add-effect) | Gives a status effect to the player. |
| `player` | [`add-experience-levels`](#operation-player-add-experience-levels) | Adds experience levels to the player. |
| `player` | [`add-experience-points`](#operation-player-add-experience-points) | Adds experience points to the player. |
| `player` | [`apply-knockback`](#operation-player-apply-knockback) | Applies directional knockback impulse to the player. |
| `player` | [`as-bedrock`](#operation-player-as-bedrock) | Returns a Bedrock-specific player handle, if the player is connected via Bedrock Edition. |
| `player` | [`as-java`](#operation-player-as-java) | Returns a Java-specific player handle, if the player is connected via Java Edition. |
| `player` | [`award-advancement`](#operation-player-award-advancement) | Awards all criteria of the specified advancement to the player. |
| `player` | [`award-advancement-criterion`](#operation-player-award-advancement-criterion) | Awards a specific criterion of an advancement to the player. |
| `player` | [`can-see`](#operation-player-can-see) | Checks if this player can see another specified player. |
| `player` | [`can-see-player`](#operation-player-can-see-player) | Checks if this player can see another specified player. |
| `player` | [`clear-effects`](#operation-player-clear-effects) | Clears all active status effects from the player. |
| `player` | [`damage`](#operation-player-damage) | Deals damage to the player by a specified amount with a damage type. |
| `player` | [`get-abilities`](#operation-player-get-abilities) | Returns the player's current abilities. |
| `player` | [`get-active-effects`](#operation-player-get-active-effects) | Returns all status effects currently applied to the player. |
| `player` | [`get-advancement-progress`](#operation-player-get-advancement-progress) | Returns the progress of the specified advancement for this player, if the advancement exists. |
| `player` | [`get-compass-target`](#operation-player-get-compass-target) | Returns the position where the player's compass currently points. |
| `player` | [`get-completed-advancements`](#operation-player-get-completed-advancements) | Returns a list of all advancement IDs completed by this player. |
| `player` | [`get-cooldown`](#operation-player-get-cooldown) | Returns the cooldown progress (0.0 to 1.0) for a specific item group. |
| `player` | [`get-custom-statistic`](#operation-player-get-custom-statistic) | Gets the value of a custom statistic for this player. |
| `player` | [`get-effect`](#operation-player-get-effect) | Returns the status effect instance applied to the player, if any. |
| `player` | [`get-experience-level`](#operation-player-get-experience-level) | Returns the player's total experience level. |
| `player` | [`get-experience-points`](#operation-player-get-experience-points) | Returns the total experience points the player has. |
| `player` | [`get-experience-progress`](#operation-player-get-experience-progress) | Returns the player's progress toward the next level (0.0 to 1.0). |
| `player` | [`get-freeze-ticks`](#operation-player-get-freeze-ticks) | Returns the current number of freeze ticks on the player. |
| `player` | [`get-ip`](#operation-player-get-ip) | Returns the player's IP address. |
| `player` | [`get-item-cooldown`](#operation-player-get-item-cooldown) | Returns the remaining cooldown ticks for an item, if active. |
| `player` | [`get-player-time`](#operation-player-get-player-time) | Returns the custom time set for this player, if any. |
| `player` | [`get-player-weather`](#operation-player-get-player-weather) | Returns the custom weather set for this player, if any. |
| `player` | [`get-respawn-location`](#operation-player-get-respawn-location) | Returns the player's custom respawn / bed location, if set. |
| `player` | [`get-selected-advancement-tab`](#operation-player-get-selected-advancement-tab) | Returns the ID of the currently selected advancement tab for this player, if any. |
| `player` | [`get-skin`](#operation-player-get-skin) | Returns the player's current skin textures. |
| `player` | [`get-skin-parts`](#operation-player-get-skin-parts) | Returns which skin parts are visible. |
| `player` | [`get-statistic`](#operation-player-get-statistic) | Gets the value of a statistic for this player in the given category and ID. |
| `player` | [`get-target-block`](#operation-player-get-target-block) | Raycasts from the player's eyes to find the block being targeted. |
| `player` | [`get-target-block-exact`](#operation-player-get-target-block-exact) | Performs a raycast from the player's eyes to find the exact block and face being targeted. |
| `player` | [`get-target-entity`](#operation-player-get-target-entity) | Returns the entity currently targeted in the looking direction within the specified distance. |
| `player` | [`get-team`](#operation-player-get-team) | Gets the team name that this player belongs to on their active scoreboard, if any. |
| `player` | [`get-world-players`](#operation-player-get-world-players) | Returns a list of all players in a specific world. |
| `player` | [`has-advancement`](#operation-player-has-advancement) | Checks whether the player has completed the specified advancement. |
| `player` | [`has-effect`](#operation-player-has-effect) | Checks if a status effect is currently applied to the player. |
| `player` | [`has-item-cooldown`](#operation-player-has-item-cooldown) | Checks if an item is currently on cooldown. |
| `player` | [`heal`](#operation-player-heal) | Heals the player by a specified amount. |
| `player` | [`hide-player`](#operation-player-hide-player) | Hides another player from this player's view (vanish). |
| `player` | [`increment-custom-statistic`](#operation-player-increment-custom-statistic) | Increments the value of a custom statistic for this player. |
| `player` | [`increment-statistic`](#operation-player-increment-statistic) | Increments the value of a statistic for this player in the given category and ID. |
| `player` | [`is-flying`](#operation-player-is-flying) | Returns whether the player is currently flying. |
| `player` | [`is-movement-locked`](#operation-player-is-movement-locked) | Returns whether the player's movement is currently locked. |
| `player` | [`is-on-cooldown`](#operation-player-is-on-cooldown) | Checks if a specific item group is currently on cooldown. |
| `player` | [`is-player-time-relative`](#operation-player-is-player-time-relative) | Checks if the custom player time is relative to the world time. |
| `player` | [`kill`](#operation-player-kill) | Kills the player instantly. |
| `player` | [`launch-projectile`](#operation-player-launch-projectile) | Launches a projectile from the player's eyes in their line of sight. |
| `player` | [`open-book`](#operation-player-open-book) | Opens a written book interface for the player from the specified hand. |
| `player` | [`open-sign-editor`](#operation-player-open-sign-editor) | Forces the sign text editor to open for the player at the specified sign block position. |
| `player` | [`play-custom-sound`](#operation-player-play-custom-sound) | Plays a custom resource pack sound identifier for this player at their current location. |
| `player` | [`play-custom-sound-at`](#operation-player-play-custom-sound-at) | Plays a custom resource pack sound identifier for this player at a specific location. |
| `player` | [`play-sound`](#operation-player-play-sound) | Plays a sound effect for this player at their current location. |
| `player` | [`play-sound-at`](#operation-player-play-sound-at) | Plays a sound effect for this player at a specific location. |
| `player` | [`ray-trace-block`](#operation-player-ray-trace-block) | Performs a ray-trace from the player's eye position in looking direction to find the targeted block. |
| `player` | [`ray-trace-entity`](#operation-player-ray-trace-entity) | Performs a ray-trace from the player's eye position in looking direction to find the targeted entity. |
| `player` | [`remove-effect`](#operation-player-remove-effect) | Removes a status effect from the player. |
| `player` | [`reset-block-change`](#operation-player-reset-block-change) | Resets a temporary fake block change by resending the actual world block at that position. |
| `player` | [`reset-player-time`](#operation-player-reset-player-time) | Resets the player's time to sync with the server world time. |
| `player` | [`reset-player-weather`](#operation-player-reset-player-weather) | Resets the player's weather to match the server world weather. |
| `player` | [`revoke-advancement`](#operation-player-revoke-advancement) | Revokes all criteria of the specified advancement from the player. |
| `player` | [`revoke-advancement-criterion`](#operation-player-revoke-advancement-criterion) | Revokes a specific criterion of an advancement from the player. |
| `player` | [`send-block-change`](#operation-player-send-block-change) | Sends a temporary fake block change to the player's client without modifying the server world. |
| `player` | [`send-hurt-animation`](#operation-player-send-hurt-animation) | Sends a hurt / damage-tilt animation to the player's client (causes screen shake in the given yaw direction). |
| `player` | [`send-stats`](#operation-player-send-stats) | Sends the player's updated statistics packet to the client. |
| `player` | [`set-abilities`](#operation-player-set-abilities) | Updates the player's abilities. |
| `player` | [`set-allow-flight`](#operation-player-set-allow-flight) | Sets whether the player is allowed to fly. |
| `player` | [`set-compass-target`](#operation-player-set-compass-target) | Sets the position where the player's compass points. |
| `player` | [`set-custom-statistic`](#operation-player-set-custom-statistic) | Sets the value of a custom statistic for this player. |
| `player` | [`set-experience-level`](#operation-player-set-experience-level) | Sets the player's total experience level. |
| `player` | [`set-experience-points`](#operation-player-set-experience-points) | Sets the player's total experience points. |
| `player` | [`set-experience-progress`](#operation-player-set-experience-progress) | Sets the player's progress toward the next level. |
| `player` | [`set-fly-speed`](#operation-player-set-fly-speed) | Sets the player's flying speed. |
| `player` | [`set-flying`](#operation-player-set-flying) | Sets whether the player should be flying. |
| `player` | [`set-freeze-ticks`](#operation-player-set-freeze-ticks) | Sets the number of freeze ticks on the player (controlling the powdered snow / frostbite screen vignette). |
| `player` | [`set-invulnerable`](#operation-player-set-invulnerable) | Sets whether the player is invulnerable to damage. |
| `player` | [`set-item-cooldown`](#operation-player-set-item-cooldown) | Sets a client-side item cooldown overlay. |
| `player` | [`set-movement-locked`](#operation-player-set-movement-locked) | Sets whether the player's movement is locked (frozen in place) for cutscenes and NPC dialogues. |
| `player` | [`set-permission`](#operation-player-set-permission) | Grants or denies a specific permission node for the player. |
| `player` | [`set-player-time`](#operation-player-set-player-time) | Overrides the time of day shown to this player. |
| `player` | [`set-player-weather`](#operation-player-set-player-weather) | Overrides the weather condition shown to this player. |
| `player` | [`set-respawn-location`](#operation-player-set-respawn-location) | Sets the player's custom respawn / bed location. |
| `player` | [`set-selected-advancement-tab`](#operation-player-set-selected-advancement-tab) | Sets the selected advancement tab for this player (must be a root advancement ID). |
| `player` | [`set-server-links`](#operation-player-set-server-links) | Sends custom server links to the player (displayed in the client Esc pause menu in 1.21+). |
| `player` | [`set-skin`](#operation-player-set-skin) | Updates the player's skin textures. |
| `player` | [`set-skin-parts`](#operation-player-set-skin-parts) | Sets which skin parts are visible. |
| `player` | [`set-statistic`](#operation-player-set-statistic) | Sets the value of a statistic for this player in the given category and ID. |
| `player` | [`set-tab-list-ping`](#operation-player-set-tab-list-ping) | Sets the tab list ping / latency indicator in milliseconds. |
| `player` | [`set-velocity`](#operation-player-set-velocity) | Sets the player's velocity / motion vector. |
| `player` | [`set-walk-speed`](#operation-player-set-walk-speed) | Sets the player's walking speed. |
| `player` | [`show-player`](#operation-player-show-player) | Shows a previously hidden player to this player. |
| `player` | [`spawn-particles`](#operation-player-spawn-particles) | Spawns particles visible only to this player. |
| `player` | [`start-cooldown`](#operation-player-start-cooldown) | Starts an item cooldown for a specific item group name. |
| `player` | [`stop-custom-sound`](#operation-player-stop-custom-sound) | Stops a custom sound identifier from playing for this player. |
| `player` | [`stop-sound`](#operation-player-stop-sound) | Stops a sound effect from playing for this player. |
| `player` | [`unset-permission`](#operation-player-unset-permission) | Removes an explicitly set permission node from the player. |

## Type Details

### `player-weather` {#type-player-weather}

Represents per-player weather condition overrides.

**Enum cases**

| Name |
| --- |
| `clear` |
| `downfall` |

### `projectile-type` {#type-projectile-type}

Types of projectiles that can be launched by a player.

**Enum cases**

| Name |
| --- |
| `arrow` |
| `snowball` |
| `egg` |
| `ender-pearl` |
| `splash-potion` |
| `fireball` |
| `small-fireball` |
| `trident` |
| `wind-charge` |

### `client-game-event` {#type-client-game-event}

Types of clientbound game events.

**Enum cases**

| Name |
| --- |
| `no-respawn-block-available` |
| `begin-raining` |
| `end-raining` |
| `change-game-mode` |
| `win-game` |
| `demo-event` |
| `arrow-hit-player` |
| `rain-level-change` |
| `thunder-level-change` |
| `play-pufferfish-string-sound` |
| `play-elder-guardian-mob-appearance` |
| `enabled-respawn-screen` |
| `limited-crafting` |
| `start-waiting-chunks` |

### `known-server-link` {#type-known-server-link}

Built-in known server link types displayed in the client Escape pause menu.

**Enum cases**

| Name |
| --- |
| `bug-report` |
| `community-guidelines` |
| `support` |
| `status` |
| `feedback` |
| `community` |
| `website` |
| `forums` |
| `news` |
| `announcements` |

### `server-link-label` {#type-server-link-label}

Label for a server link: either a built-in standard link type or a custom text component.

**Variant cases**

| Name | WIT type |
| --- | --- |
| `known` | `known-server-link` |
| `custom` | `text-component` |

### `server-link` {#type-server-link}

Represents a server link entry with a label and destination URL.

**Record fields**

| Name | WIT type |
| --- | --- |
| `label` | `server-link-label` |
| `url` | `string` |

### `player-abilities` {#type-player-abilities}

Various abilities a player can have.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `invulnerable` | `bool` | Whether the player is invulnerable to damage. |
| `flying` | `bool` | Whether the player is currently flying. |
| `allow-flying` | `bool` | Whether the player is allowed to fly. |
| `creative` | `bool` | Whether the player is in creative mode. |
| `allow-modify-world` | `bool` | Whether the player can modify the world. |
| `fly-speed` | `f32` | The speed at which the player flies. |
| `walk-speed` | `f32` | The speed at which the player walks. |

### `player-skin` {#type-player-skin}

Represents a player's skin textures and metadata.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `value` | `string` | The base64-encoded texture data (usually JSON containing skin/cape URLs). |
| `signature` | `option<string>` | The optional signature for the texture data. |

### `skin-parts` {#type-skin-parts}

Represents which skin parts are visible.

**Flags cases**

| Name |
| --- |
| `cape` |
| `jacket` |
| `left-sleeve` |
| `right-sleeve` |
| `left-pants-leg` |
| `right-pants-leg` |
| `hat` |

### `bedrock-ability` {#type-bedrock-ability}

Represents the various abilities a Bedrock Edition player can have.

**Enum cases**

| Name | Description |
| --- | --- |
| `build` | Whether the player can build. |
| `mine` | Whether the player can mine blocks. |
| `doors-and-switches` | Whether the player can use doors and switches. |
| `open-containers` | Whether the player can open containers. |
| `attack-players` | Whether the player can attack other players. |
| `attack-mobs` | Whether the player can attack mobs. |
| `operator-commands` | Whether the player can use operator commands. |
| `teleport` | Whether the player can teleport. |
| `invulnerable` | Whether the player is invulnerable. |
| `flying` | Whether the player is currently flying. |
| `may-fly` | Whether the player is allowed to fly. |
| `instabuild` | Whether the player has instant build (creative). |
| `lightning` | Whether the player can use lightning-related abilities. |
| `fly-speed` | The speed at which the player flies. |
| `walk-speed` | The speed at which the player walks. |
| `muted` | Whether the player is muted. |
| `world-builder` | Whether the player is a world builder. |
| `no-clip` | Whether the player has no-clip enabled. |
| `privileged-builder` | Whether the player is a privileged builder. |
| `vertical-fly-speed` | The speed at which the player flies vertically. |

### `bedrock-status-flag` {#type-bedrock-status-flag}

Represents the various status flags a Bedrock Edition entity can have.
These flags control client-side rendering and behavior.

**Enum cases**

| Name | Description |
| --- | --- |
| `on-fire` | Whether the entity is currently on fire. |
| `sneaking` | Whether the entity is sneaking. |
| `riding` | Whether the entity is riding another entity. |
| `sprinting` | Whether the entity is sprinting. |
| `using-item` | Whether the entity is using an item (e.g., eating, blocking). |
| `invisible` | Whether the entity is invisible. |
| `tempted` | Whether the entity is tempted by an item. |
| `in-love` | Whether the entity is in love (breeding). |
| `saddled` | Whether the entity is saddled. |
| `powered` | Whether the entity is powered (e.g., charged creeper). |
| `ignited` | Whether the entity is ignited. |
| `baby` | Whether the entity is a baby. |
| `converting` | Whether the entity is currently converting to another type. |
| `critical` | Whether the entity is in a critical state. |
| `show-name` | Whether to show the entity's name tag. |
| `always-show-name` | Whether to always show the entity's name tag. |
| `no-ai` | Whether the entity has no AI. |
| `silent` | Whether the entity is silent. |
| `wall-climbing` | Whether the entity is climbing a wall. |
| `climb` | Whether the entity is climbing. |
| `swim` | Whether the entity is swimming. |
| `fly` | Whether the entity is flying. |
| `walk` | Whether the entity is walking. |
| `resting` | Whether the entity is resting. |
| `sitting` | Whether the entity is sitting. |
| `angry` | Whether the entity is angry. |
| `interested` | Whether the entity is interested. |
| `charged` | Whether the entity is charged. |
| `tamed` | Whether the entity is tamed. |
| `orphaned` | Whether the entity is orphaned. |
| `leashed` | Whether the entity is leashed. |
| `sheared` | Whether the entity is sheared. |
| `gliding` | Whether the entity is gliding (elytra). |
| `elder` | Whether the entity is an elder (e.g., elder guardian). |
| `moving` | Whether the entity is moving. |
| `breathing` | Whether the entity is breathing. |
| `chested` | Whether the entity has a chest (e.g., donkey). |
| `stackable` | Whether the entity is stackable. |
| `show-bottom` | Whether to show the bottom of the entity. |
| `standing` | Whether the entity is standing. |
| `shaking` | Whether the entity is shaking. |
| `idling` | Whether the entity is idling. |
| `casting` | Whether the entity is casting (e.g., evoker). |
| `charging` | Whether the entity is charging an attack. |
| `keyboard-controlled` | Whether the entity is controlled by a keyboard. |
| `power-jump` | Whether the entity is performing a power jump. |
| `dash` | Whether the entity is dashing. |
| `lingering` | Whether the entity is lingering. |
| `has-collision` | Whether the entity has collision. |
| `has-gravity` | Whether the entity has gravity. |
| `fire-immune` | Whether the entity is immune to fire. |
| `dancing` | Whether the entity is dancing. |
| `enchanted` | Whether the entity is enchanted. |
| `return-trident` | Whether a trident will return to the entity. |
| `container-private` | Whether the container is private. |
| `transforming` | Whether the entity is transforming. |
| `damage-nearby-mobs` | Whether the entity damages nearby mobs. |
| `swimming` | Whether the entity is swimming. |
| `bribed` | Whether the entity has been bribed. |
| `pregnant` | Whether the entity is pregnant. |
| `laying-egg` | Whether the entity is laying an egg. |
| `passenger-can-pick` | Whether a passenger can pick up the entity. |
| `transition-sitting` | Whether the entity is transitioning to sitting. |
| `eating` | Whether the entity is eating. |
| `laying-down` | Whether the entity is laying down. |
| `sneezing` | Whether the entity is sneezing. |
| `trusting` | Whether the entity is trusting. |
| `rolling` | Whether the entity is rolling. |
| `scared` | Whether the entity is scared. |
| `in-scaffolding` | Whether the entity is in scaffolding. |
| `over-scaffolding` | Whether the entity is over scaffolding. |
| `descend-through-block` | Whether the entity is descending through a block. |
| `blocking` | Whether the entity is blocking. |
| `transition-blocking` | Whether the entity is transitioning to blocking. |
| `blocked-using-shield` | Whether the entity is blocked using a shield. |
| `blocked-using-damaged-shield` | Whether the entity is blocked using a damaged shield. |
| `sleeping` | Whether the entity is sleeping. |
| `wants-to-wake` | Whether the entity wants to wake up. |
| `trade-interest` | Whether the entity shows interest in trading. |
| `door-breaker` | Whether the entity can break doors. |
| `breaking-obstruction` | Whether the entity is breaking an obstruction. |
| `door-opener` | Whether the entity can open doors. |
| `captain` | Whether the entity is a captain (raid). |
| `stunned` | Whether the entity is stunned. |
| `roaring` | Whether the entity is roaring. |
| `delayed-attack` | Whether the entity has a delayed attack. |
| `avoiding-mobs` | Whether the entity is avoiding mobs. |
| `avoiding-block` | Whether the entity is avoiding a block. |
| `facing-target-to-range-attack` | Whether the entity is facing a target for a ranged attack. |
| `hidden-when-invisible` | Whether the entity is hidden when invisible. |
| `in-ui` | Whether the entity is in a UI. |
| `stalking` | Whether the entity is stalking. |
| `emoting` | Whether the entity is emoting. |
| `celebrating` | Whether the entity is celebrating. |
| `admiring` | Whether the entity is admiring (piglin). |
| `celebrating-special` | Whether the entity is celebrating a special event. |
| `out-of-control` | Whether the entity is out of control. |
| `ram-attack` | Whether the entity is performing a ram attack. |
| `playing-dead` | Whether the entity is playing dead. |
| `in-ascending-block` | Whether the entity is in an ascending block. |
| `over-descending-block` | Whether the entity is over a descending block. |
| `croaking` | Whether the entity is croaking (frog). |
| `digest-mob` | Whether the entity is digesting a mob. |
| `jump-goal` | Whether the entity has a jump goal. |
| `emerging` | Whether the entity is emerging. |
| `sniffing` | Whether the entity is sniffing. |
| `digging` | Whether the entity is digging. |
| `sonic-boom` | Whether the entity is performing a sonic boom. |
| `has-dash-timeout` | Whether the entity has a dash timeout. |
| `push-towards-closest-space` | Whether the entity is pushed towards the closest space. |
| `scenting` | Whether the entity is scenting. |
| `rising` | Whether the entity is rising. |
| `feeling-happy` | Whether the entity is feeling happy. |
| `searching` | Whether the entity is searching. |
| `crawling` | Whether the entity is crawling. |
| `body-rotation-blocked` | Whether the entity's body rotation is blocked. |
| `render-when-invisible` | Whether the entity is rendered when invisible. |
| `body-rotation-axis-aligned` | Whether the entity's body rotation is axis-aligned. |
| `collidable` | Whether the entity is collidable. |
| `wasd-air-controlled` | Whether the entity is air-controlled via WASD. |
| `does-server-auth-only-dismount` | Whether only the server can authorize a dismount. |
| `body-rotation-always-follows-head` | Whether the body rotation always follows the head. |
| `can-use-vertical-movement-action` | Whether the entity can use vertical movement actions. |
| `rotation-locked-to-vehicle` | Whether rotation is locked to the vehicle. |

### `java-minecraft-version` {#type-java-minecraft-version}

Represents a specific version of the Minecraft Java Edition protocol.

**Enum cases**

| Name |
| --- |
| `v-1-7-2` |
| `v-1-7-6` |
| `v-1-8` |
| `v-1-9` |
| `v-1-9-1` |
| `v-1-9-2` |
| `v-1-9-3` |
| `v-1-10` |
| `v-1-11` |
| `v-1-11-1` |
| `v-1-12` |
| `v-1-12-1` |
| `v-1-12-2` |
| `v-1-13` |
| `v-1-13-1` |
| `v-1-13-2` |
| `v-1-14` |
| `v-1-14-1` |
| `v-1-14-2` |
| `v-1-14-3` |
| `v-1-14-4` |
| `v-1-15` |
| `v-1-15-1` |
| `v-1-15-2` |
| `v-1-16` |
| `v-1-16-1` |
| `v-1-16-2` |
| `v-1-16-3` |
| `v-1-16-4` |
| `v-1-17` |
| `v-1-17-1` |
| `v-1-18` |
| `v-1-18-2` |
| `v-1-19` |
| `v-1-19-1` |
| `v-1-19-3` |
| `v-1-19-4` |
| `v-1-20` |
| `v-1-20-2` |
| `v-1-20-3` |
| `v-1-20-5` |
| `v-1-21` |
| `v-1-21-2` |
| `v-1-21-4` |
| `v-1-21-5` |
| `v-1-21-6` |
| `v-1-21-7` |
| `v-1-21-9` |
| `v-1-21-11` |
| `v-26-1` |
| `v-26-2` |
| `v-26-3` |
| `unknown` |

### `bedrock-minecraft-version` {#type-bedrock-minecraft-version}

Represents a specific version of the Minecraft Bedrock Edition protocol.

**Enum cases**

| Name |
| --- |
| `v-1-21` |
| `v-1-26-30` |
| `unknown` |

### `java-player-settings` {#type-java-player-settings}

Represents settings for a Java Edition player.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `locale` | `string` | The player's preferred language (e.g., \"en_us\"). |
| `view-distance` | `u8` | The maximum distance at which chunks are rendered. |
| `chat-mode` | `chat-mode` | The player's chat visibility settings. |
| `chat-colors` | `bool` | Whether chat colors are enabled. |
| `skin-parts` | `skin-parts` | The player's skin configuration options. |
| `main-hand` | `hand` | The player's dominant hand (left or right). |
| `text-filtering` | `bool` | Whether text filtering is enabled. |
| `server-listing` | `bool` | Whether the player wants to appear in the server list. |

### `chat-mode` {#type-chat-mode}

The chat visibility settings for a player.

**Enum cases**

| Name | Description |
| --- | --- |
| `enabled` | Chat is fully enabled. |
| `commands-only` | Only system messages and commands are shown. |
| `hidden` | Chat is completely hidden. |

### `bedrock-device-os` {#type-bedrock-device-os}

Represents the operating system of a Bedrock Edition client.

**Enum cases**

| Name | Description |
| --- | --- |
| `android` |  |
| `ios` |  |
| `osx` |  |
| `amazon` |  |
| `gear-vr` |  |
| `holo-lens` |  |
| `windows-10` |  |
| `win-32` |  |
| `dedicated` |  |
| `tv-os` |  |
| `playstation` |  |
| `nintendo` |  |
| `xbox` |  |
| `windows-phone` |  |
| `linux` |  |
| `unknown` | Fallback for unrecognized operating systems. |

### `bedrock-input-mode` {#type-bedrock-input-mode}

Represents the input mode used by a Bedrock Edition client.

**Enum cases**

| Name | Description |
| --- | --- |
| `unknown` | Unknown input mode. |
| `mouse` | Mouse and keyboard. |
| `touch` | Touch screen. |
| `game-pad` | Game controller. |
| `motion-controller` | Motion-based controller. |

### `bedrock-ui-profile` {#type-bedrock-ui-profile}

Represents the UI profile used by a Bedrock Edition client.

**Enum cases**

| Name | Description |
| --- | --- |
| `classic` | Classic desktop UI. |
| `pocket` | Pocket/Mobile optimized UI. |
| `unknown` | Unknown UI profile. |

### `bedrock-graphics-mode` {#type-bedrock-graphics-mode}

Represents the graphics mode used by a Bedrock Edition client.

**Enum cases**

| Name |
| --- |
| `simple` |
| `fancy` |
| `ray-traced` |
| `unknown` |

### `bedrock-player-settings` {#type-bedrock-player-settings}

Represents settings and client data for a Bedrock Edition player.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `game-version` | `string` | The client's specific game version string. |
| `device-os` | `bedrock-device-os` | The operating system of the client device. |
| `device-id` | `string` | A unique identifier for the client device. |
| `device-model` | `string` | The model name of the client device. |
| `language-code` | `string` | The player's preferred language code (e.g., \"en_US\"). |
| `current-input-mode` | `bedrock-input-mode` | The input mode currently used by the player. |
| `default-input-mode` | `bedrock-input-mode` | The default input mode for the client device. |
| `ui-profile` | `bedrock-ui-profile` | The UI layout profile used by the client. |
| `gui-scale` | `s32` | The current GUI scale setting. |
| `is-editor-mode` | `bool` | Whether the player is in Editor mode. |
| `max-view-distance` | `s32` | The maximum view distance the client supports. |
| `memory-tier` | `s32` | The memory tier of the client device (indicates performance level). |
| `graphics-mode` | `bedrock-graphics-mode` | The graphics mode used by the client. |
| `playfab-id` | `string` | The player's unique PlayFab identifier. |
| `client-random-id` | `s64` | A random 64-bit ID generated by the client. |
| `platform-offline-id` | `string` | Platform-specific offline identifier. |
| `platform-online-id` | `string` | Platform-specific online identifier. |
| `skin-id` | `string` | The unique ID of the player's current skin. |
| `arm-size` | `string` | The model arm size (e.g., \"wide\" or \"slim\"). |
| `is-persona-skin` | `bool` | Whether the player is using a Character Creator (Persona) skin. |
| `is-premium-skin` | `bool` | Whether the skin is a premium (paid) skin. |
| `is-trusted-skin` | `bool` | Whether the skin is from a trusted source. |

### `bedrock-disconnect-reason` {#type-bedrock-disconnect-reason}

Protocol-level disconnect reasons for Minecraft Bedrock Edition.

**Enum cases**

| Name |
| --- |
| `unknown` |
| `cant-connect-no-internet` |
| `no-permissions` |
| `unrecoverable-error` |
| `third-party-blocked` |
| `third-party-no-internet` |
| `third-party-bad-ip` |
| `third-party-no-server-or-server-locked` |
| `version-mismatch` |
| `skin-issue` |
| `invite-session-not-found` |
| `edu-level-settings-missing` |
| `local-server-not-found` |
| `legacy-disconnect` |
| `user-leave-game-attempted` |
| `platform-locked-skins-error` |
| `realms-world-unassigned` |
| `realms-server-cant-connect` |
| `realms-server-hidden` |
| `realms-server-disabled-beta` |
| `realms-server-disabled` |
| `cross-platform-disabled` |
| `cant-connect` |
| `session-not-found` |
| `client-settings-incompatible-with-server` |
| `server-full` |
| `invalid-platform-skin` |
| `edition-version-mismatch` |
| `edition-mismatch` |
| `level-newer-than-exe-version` |
| `no-fail-occurred` |
| `banned-skin` |
| `timeout` |
| `server-not-found` |
| `outdated-server` |
| `outdated-client` |
| `no-premium-platform` |
| `multiplayer-disabled` |
| `no-wifi` |
| `world-corruption` |
| `no-reason` |
| `disconnected` |
| `invalid-player` |
| `logged-in-other-location` |
| `server-id-conflict` |
| `not-allowed` |
| `not-authenticated` |
| `invalid-tenant` |
| `unknown-packet` |
| `unexpected-packet` |
| `invalid-command-request-packet` |
| `host-suspended` |
| `login-packet-no-request` |
| `login-packet-no-cert` |
| `missing-client` |
| `kicked` |
| `kicked-for-exploit` |
| `kicked-for-idle` |
| `resource-pack-problem` |
| `incompatible-pack` |
| `out-of-storage` |
| `invalid-level` |
| `disconnect-packet` |
| `block-mismatch` |
| `invalid-heights` |
| `invalid-widths` |
| `connection-lost` |
| `zombie-connection` |
| `shutdown` |
| `reason-not-set` |
| `loading-state-timeout` |
| `resource-pack-loading-failed` |
| `searching-for-session-loading-screen-failed` |
| `nether-net-protocol-version` |
| `subsystem-status-error` |
| `empty-auth-from-discovery` |
| `empty-url-from-discovery` |
| `expired-auth-from-discovery` |
| `unknown-signal-service-sign-in-failure` |
| `xbl-join-lobby-failure` |
| `unspecified-client-instance-disconnection` |
| `nether-net-session-not-found` |
| `nether-net-create-peer-connection` |
| `nether-net-ice` |
| `nether-net-connect-request` |
| `nether-net-connect-response` |
| `nether-net-negotiation-timeout` |
| `nether-net-inactivity-timeout` |
| `stale-connection-being-replaced` |
| `realms-session-not-found` |
| `bad-packet` |
| `nether-net-failed-to-create-offer` |
| `nether-net-failed-to-create-answer` |
| `nether-net-failed-to-set-local-description` |
| `nether-net-failed-to-set-remote-description` |
| `nether-net-negotiation-timeout-waiting-for-response` |
| `nether-net-negotiation-timeout-waiting-for-accept` |
| `nether-net-incoming-connection-ignored` |
| `nether-net-signaling-parsing-failure` |
| `nether-net-signaling-unknown-error` |
| `nether-net-signaling-unicast-delivery-failed` |
| `nether-net-signaling-broadcast-delivery-failed` |
| `nether-net-signaling-generic-delivery-failed` |
| `editor-mismatch-editor-world` |
| `editor-mismatch-vanilla-world` |
| `world-transfer-not-primary-client` |
| `request-server-shutdown` |
| `client-game-setup-cancelled` |
| `client-game-setup-failed` |
| `no-venue` |
| `nether-net-signaling-signin-failed` |
| `session-access-denied` |
| `service-signin-issue` |
| `nether-net-no-signaling-channel` |
| `nether-net-not-logged-in` |
| `nether-net-client-signaling-error` |
| `sub-client-login-disabled` |
| `deep-link-trying-to-open-demo-world-while-signed-in` |
| `async-join-task-denied` |
| `realms-timeline-required` |
| `guest-without-host` |
| `failed-to-join-experience` |
| `nether-net-data-channel-closed` |
| `discovery-environment-mismatch` |
| `host-without-keys` |
| `host-signed-out` |
| `script-watchdog-exception` |
| `script-memory-limit-exceeded` |
| `storage-low-during-gameplay` |
| `storage-full-during-gameplay` |
| `level-storage-corruption` |
| `edition-mismatch-vanilla-to-edu` |
| `edition-mismatch-edu-to-vanilla` |
| `editor-mismatch-editor-to-vanilla` |
| `editor-mismatch-vanilla-to-editor` |
| `deny-listed` |
| `nonce-missing` |
| `nonce-not-found` |
| `nonce-expired` |
| `nonce-not-valid` |
| `host-disconnected` |
| `editor-join-intent-policy-failure` |
| `nether-net-identity-not-allowed` |
| `invalid-name` |
| `expired-token` |
| `host-accepts-no-type-of-auth` |
| `not-authenticated-fast-fail` |
| `editor-not-allowed` |

### `socket-teardown-policy` {#type-socket-teardown-policy}

Policy for tearing down the player's network connection.

**Enum cases**

| Name | Description |
| --- | --- |
| `graceful` | Send the disconnect packet and gracefully close the connection. |
| `immediate-close` | Send the disconnect packet and close the socket immediately. |
| `drop-connection` | Terminate the connection immediately without sending any disconnect packet. |

### `java-kick-options` {#type-java-kick-options}

Options for disconnecting a Java Edition player.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `reason` | `text-component` | The formatted text component displayed on the Java disconnect screen. |
| `log-to-console` | `bool` | Whether to log the kick in the server console (default: true). |
| `teardown-policy` | `socket-teardown-policy` | How the connection is closed (default: graceful). |

### `bedrock-kick-options` {#type-bedrock-kick-options}

Options for disconnecting a Bedrock Edition player.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `reason` | `bedrock-disconnect-reason` | Protocol level disconnect code (default: kicked). |
| `message` | `string` | Message displayed on the Bedrock disconnect screen (default: ""). |
| `skip-message` | `bool` | Whether to suppress the disconnect message on the client screen (default: false). |
| `filtered-message` | `string` | Filtered message string for safety/parental filters (default: ""). |
| `log-to-console` | `bool` | Whether to log the kick in the server console (default: true). |
| `teardown-policy` | `socket-teardown-policy` | How the connection is closed (default: graceful). |

### `ban-player-options` {#type-ban-player-options}

Options for banning a player.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `reason` | `option<text-component>` | Ban reason displayed to the player and stored in the ban list. |
| `source` | `option<string>` | Source or authority responsible for the ban (default: "Plugin"). |
| `expires-at-utc` | `option<string>` | Ban expiration in RFC-3339 format, if temporary. |
| `duration-seconds` | `option<u64>` | Ban duration in seconds from now, if temporary. |
| `kick-if-online` | `bool` | Whether to immediately kick the player if currently online (default: true). |
| `log-to-console` | `bool` | Whether to log the ban action to the server console (default: true). |

### `ban-ip-options` {#type-ban-ip-options}

Options for banning an IP address.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `reason` | `option<text-component>` | Ban reason stored in the IP ban list. |
| `source` | `option<string>` | Source or authority responsible for the ban (default: "Plugin"). |
| `expires-at-utc` | `option<string>` | Ban expiration in RFC-3339 format, if temporary. |
| `duration-seconds` | `option<u64>` | Ban duration in seconds from now, if temporary. |
| `kick-matching-players` | `bool` | Whether to immediately kick all online players with this IP (default: true). |
| `log-to-console` | `bool` | Whether to log the IP ban action to the server console (default: true). |

### `player` {#type-player}

A handle to a player on the server.

Methods: [`set-permission`](#operation-player-set-permission), [`unset-permission`](#operation-player-unset-permission), [`play-sound`](#operation-player-play-sound), [`play-sound-at`](#operation-player-play-sound-at), [`stop-sound`](#operation-player-stop-sound), [`play-custom-sound`](#operation-player-play-custom-sound), [`play-custom-sound-at`](#operation-player-play-custom-sound-at), [`stop-custom-sound`](#operation-player-stop-custom-sound), [`spawn-particles`](#operation-player-spawn-particles), [`send-block-change`](#operation-player-send-block-change), [`reset-block-change`](#operation-player-reset-block-change), [`send-hurt-animation`](#operation-player-send-hurt-animation), [`open-book`](#operation-player-open-book), [`open-sign-editor`](#operation-player-open-sign-editor), [`set-velocity`](#operation-player-set-velocity), [`apply-knockback`](#operation-player-apply-knockback), [`set-movement-locked`](#operation-player-set-movement-locked), [`is-movement-locked`](#operation-player-is-movement-locked), [`set-freeze-ticks`](#operation-player-set-freeze-ticks), [`get-freeze-ticks`](#operation-player-get-freeze-ticks), [`set-server-links`](#operation-player-set-server-links), [`add-effect`](#operation-player-add-effect), [`remove-effect`](#operation-player-remove-effect), [`clear-effects`](#operation-player-clear-effects), [`has-effect`](#operation-player-has-effect), [`get-effect`](#operation-player-get-effect), [`get-active-effects`](#operation-player-get-active-effects), [`heal`](#operation-player-heal), [`damage`](#operation-player-damage), [`kill`](#operation-player-kill), [`get-statistic`](#operation-player-get-statistic), [`set-statistic`](#operation-player-set-statistic), [`increment-statistic`](#operation-player-increment-statistic), [`get-custom-statistic`](#operation-player-get-custom-statistic), [`set-custom-statistic`](#operation-player-set-custom-statistic), [`increment-custom-statistic`](#operation-player-increment-custom-statistic), [`send-stats`](#operation-player-send-stats), [`get-team`](#operation-player-get-team), [`start-cooldown`](#operation-player-start-cooldown), [`get-cooldown`](#operation-player-get-cooldown), [`is-on-cooldown`](#operation-player-is-on-cooldown), [`set-allow-flight`](#operation-player-set-allow-flight), [`set-fly-speed`](#operation-player-set-fly-speed), [`set-walk-speed`](#operation-player-set-walk-speed), [`set-invulnerable`](#operation-player-set-invulnerable), [`get-experience-level`](#operation-player-get-experience-level), [`get-experience-progress`](#operation-player-get-experience-progress), [`get-experience-points`](#operation-player-get-experience-points), [`set-experience-level`](#operation-player-set-experience-level), [`set-experience-progress`](#operation-player-set-experience-progress), [`set-experience-points`](#operation-player-set-experience-points), [`add-experience-levels`](#operation-player-add-experience-levels), [`add-experience-points`](#operation-player-add-experience-points), [`is-flying`](#operation-player-is-flying), [`set-flying`](#operation-player-set-flying), [`get-abilities`](#operation-player-get-abilities), [`set-abilities`](#operation-player-set-abilities), [`get-ip`](#operation-player-get-ip), [`get-skin`](#operation-player-get-skin), [`set-skin`](#operation-player-set-skin), [`get-skin-parts`](#operation-player-get-skin-parts), [`set-skin-parts`](#operation-player-set-skin-parts), [`set-player-time`](#operation-player-set-player-time), [`reset-player-time`](#operation-player-reset-player-time), [`get-player-time`](#operation-player-get-player-time), [`is-player-time-relative`](#operation-player-is-player-time-relative), [`set-player-weather`](#operation-player-set-player-weather), [`reset-player-weather`](#operation-player-reset-player-weather), [`get-player-weather`](#operation-player-get-player-weather), [`set-compass-target`](#operation-player-set-compass-target), [`get-compass-target`](#operation-player-get-compass-target), [`set-respawn-location`](#operation-player-set-respawn-location), [`get-respawn-location`](#operation-player-get-respawn-location), [`hide-player`](#operation-player-hide-player), [`show-player`](#operation-player-show-player), [`can-see`](#operation-player-can-see), [`can-see-player`](#operation-player-can-see-player), [`set-tab-list-ping`](#operation-player-set-tab-list-ping), [`set-item-cooldown`](#operation-player-set-item-cooldown), [`get-item-cooldown`](#operation-player-get-item-cooldown), [`has-item-cooldown`](#operation-player-has-item-cooldown), [`ray-trace-block`](#operation-player-ray-trace-block), [`ray-trace-entity`](#operation-player-ray-trace-entity), [`get-target-entity`](#operation-player-get-target-entity), [`get-target-block`](#operation-player-get-target-block), [`get-target-block-exact`](#operation-player-get-target-block-exact), [`launch-projectile`](#operation-player-launch-projectile), [`get-advancement-progress`](#operation-player-get-advancement-progress), [`award-advancement-criterion`](#operation-player-award-advancement-criterion), [`revoke-advancement-criterion`](#operation-player-revoke-advancement-criterion), [`award-advancement`](#operation-player-award-advancement), [`revoke-advancement`](#operation-player-revoke-advancement), [`has-advancement`](#operation-player-has-advancement), [`get-completed-advancements`](#operation-player-get-completed-advancements), [`get-selected-advancement-tab`](#operation-player-get-selected-advancement-tab), [`set-selected-advancement-tab`](#operation-player-set-selected-advancement-tab), [`as-java`](#operation-player-as-java), [`as-bedrock`](#operation-player-as-bedrock), [`get-world-players`](#operation-player-get-world-players).

### `java-resource-pack` {#type-java-resource-pack}

Represents a resource pack sent to a Java Edition player.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `id` | `uuid` | Unique identifier for the resource pack. |
| `url` | `string` | The URL to the resource pack file. |
| `hash` | `string` | The SHA1 hash (40-character hex string) of the pack. |
| `forced` | `bool` | Whether the player is forced to accept the pack. |
| `prompt-message` | `option<text-component>` | Optional prompt message displayed in the pack acceptance screen. |

### `bedrock-resource-pack-entry` {#type-bedrock-resource-pack-entry}

Represents an individual Bedrock Edition resource pack entry.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `id` | `uuid` | Unique identifier for the Bedrock pack. |
| `version` | `string` | Version string of the Bedrock pack (e.g., "1.0.0"). |
| `size` | `u64` | Size of the pack in bytes. |
| `download-url` | `string` | Download URL for remote Bedrock packs. |
| `content-key` | `option<string>` | Optional encryption content key for encrypted packs. |
| `sub-pack-name` | `option<string>` | Optional sub-pack name inside the archive. |
| `content-id` | `option<string>` | Optional content identifier. |
| `has-scripts` | `bool` | Whether the pack contains client scripts. |
| `addon-pack` | `bool` | Whether the pack is marked as an addon pack. |
| `rtx-enabled` | `bool` | Whether Ray Tracing / RTX features are enabled for the pack. |

### `bedrock-resource-packs-info` {#type-bedrock-resource-packs-info}

Represents the resource packs information payload sent to Bedrock clients.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `required` | `bool` | If true, players cannot join without accepting packs. |
| `has-addon-packs` | `bool` | Whether the server offers addon packs. |
| `has-scripts` | `bool` | Whether any of the packs contain client scripts. |
| `is-vibrant-visuals-force-disabled` | `bool` | Whether vibrant visuals should be forced disabled. |
| `world-template-id` | `option<uuid>` | World template ID, if any. |
| `world-template-version` | `option<string>` | World template version, if any. |
| `packs` | `list<bedrock-resource-pack-entry>` | List of resource packs to send to the player. |

### `java-player` {#type-java-player}

A handle to a player connected via the Java Edition.

Methods: [`get-version`](#operation-java-player-get-version), [`get-brand`](#operation-java-player-get-brand), [`get-server-address`](#operation-java-player-get-server-address), [`get-settings`](#operation-java-player-get-settings), [`send-packet`](#operation-java-player-send-packet), [`send-custom-payload`](#operation-java-player-send-custom-payload), [`show-dialog`](#operation-java-player-show-dialog), [`clear-dialog`](#operation-java-player-clear-dialog), [`get-scoreboard`](#operation-java-player-get-scoreboard), [`reset-scoreboard`](#operation-java-player-reset-scoreboard), [`send-resource-pack`](#operation-java-player-send-resource-pack), [`remove-resource-pack`](#operation-java-player-remove-resource-pack), [`clear-resource-packs`](#operation-java-player-clear-resource-packs), [`kick`](#operation-java-player-kick), [`send-game-event`](#operation-java-player-send-game-event), [`send-entity-status`](#operation-java-player-send-entity-status).

### `bedrock-player` {#type-bedrock-player}

A handle to a player connected via the Bedrock Edition.

Methods: [`get-version`](#operation-bedrock-player-get-version), [`get-settings`](#operation-bedrock-player-get-settings), [`get-ability`](#operation-bedrock-player-get-ability), [`set-ability`](#operation-bedrock-player-set-ability), [`get-status-flag`](#operation-bedrock-player-get-status-flag), [`set-status-flag`](#operation-bedrock-player-set-status-flag), [`send-packet`](#operation-bedrock-player-send-packet), [`open-form`](#operation-bedrock-player-open-form), [`get-scoreboard`](#operation-bedrock-player-get-scoreboard), [`reset-scoreboard`](#operation-bedrock-player-reset-scoreboard), [`send-resource-packs-info`](#operation-bedrock-player-send-resource-packs-info), [`kick`](#operation-bedrock-player-kick).

## Operation Details

### `player.set-permission` {#operation-player-set-permission}

```text
set-permission: func(node: string, value: bool);
```

Grants or denies a specific permission node for the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `node` | `string` |
| `value` | `bool` |

### `player.unset-permission` {#operation-player-unset-permission}

```text
unset-permission: func(node: string);
```

Removes an explicitly set permission node from the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `node` | `string` |

### `player.play-sound` {#operation-player-play-sound}

```text
play-sound: func(sound: sound, category: sound-category, volume: f32, pitch: f32);
```

Plays a sound effect for this player at their current location.

**Parameters**

| Name | WIT type |
| --- | --- |
| `sound` | `sound` |
| `category` | `sound-category` |
| `volume` | `f32` |
| `pitch` | `f32` |

### `player.play-sound-at` {#operation-player-play-sound-at}

```text
play-sound-at: func(pos: position, sound: sound, category: sound-category, volume: f32, pitch: f32);
```

Plays a sound effect for this player at a specific location.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |
| `sound` | `sound` |
| `category` | `sound-category` |
| `volume` | `f32` |
| `pitch` | `f32` |

### `player.stop-sound` {#operation-player-stop-sound}

```text
stop-sound: func(sound: option<sound>, category: option<sound-category>);
```

Stops a sound effect from playing for this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `sound` | `option<sound>` |
| `category` | `option<sound-category>` |

### `player.play-custom-sound` {#operation-player-play-custom-sound}

```text
play-custom-sound: func(sound-name: string, category: sound-category, volume: f32, pitch: f32);
```

Plays a custom resource pack sound identifier for this player at their current location.

**Parameters**

| Name | WIT type |
| --- | --- |
| `sound-name` | `string` |
| `category` | `sound-category` |
| `volume` | `f32` |
| `pitch` | `f32` |

### `player.play-custom-sound-at` {#operation-player-play-custom-sound-at}

```text
play-custom-sound-at: func(pos: position, sound-name: string, category: sound-category, volume: f32, pitch: f32);
```

Plays a custom resource pack sound identifier for this player at a specific location.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |
| `sound-name` | `string` |
| `category` | `sound-category` |
| `volume` | `f32` |
| `pitch` | `f32` |

### `player.stop-custom-sound` {#operation-player-stop-custom-sound}

```text
stop-custom-sound: func(sound-name: option<string>, category: option<sound-category>);
```

Stops a custom sound identifier from playing for this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `sound-name` | `option<string>` |
| `category` | `option<sound-category>` |

### `player.spawn-particles` {#operation-player-spawn-particles}

```text
spawn-particles: func(particle: particle, pos: position, count: u32, offset: position, max-speed: f32);
```

Spawns particles visible only to this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `particle` | `particle` |
| `pos` | `position` |
| `count` | `u32` |
| `offset` | `position` |
| `max-speed` | `f32` |

### `player.send-block-change` {#operation-player-send-block-change}

```text
send-block-change: func(pos: block-pos, block-id: u16);
```

Sends a temporary fake block change to the player's client without modifying the server world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `block-id` | `u16` |

### `player.reset-block-change` {#operation-player-reset-block-change}

```text
reset-block-change: func(pos: block-pos);
```

Resets a temporary fake block change by resending the actual world block at that position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

### `player.send-hurt-animation` {#operation-player-send-hurt-animation}

```text
send-hurt-animation: func(yaw: f32);
```

Sends a hurt / damage-tilt animation to the player's client (causes screen shake in the given yaw direction).

**Parameters**

| Name | WIT type |
| --- | --- |
| `yaw` | `f32` |

### `player.open-book` {#operation-player-open-book}

```text
open-book: func(hand: hand);
```

Opens a written book interface for the player from the specified hand.

**Parameters**

| Name | WIT type |
| --- | --- |
| `hand` | `hand` |

### `player.open-sign-editor` {#operation-player-open-sign-editor}

```text
open-sign-editor: func(pos: block-pos, is-front-text: bool);
```

Forces the sign text editor to open for the player at the specified sign block position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `is-front-text` | `bool` |

### `player.set-velocity` {#operation-player-set-velocity}

```text
set-velocity: func(velocity: position);
```

Sets the player's velocity / motion vector.

**Parameters**

| Name | WIT type |
| --- | --- |
| `velocity` | `position` |

### `player.apply-knockback` {#operation-player-apply-knockback}

```text
apply-knockback: func(strength: f64, x: f64, z: f64);
```

Applies directional knockback impulse to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `strength` | `f64` |
| `x` | `f64` |
| `z` | `f64` |

### `player.set-movement-locked` {#operation-player-set-movement-locked}

```text
set-movement-locked: func(locked: bool);
```

Sets whether the player's movement is locked (frozen in place) for cutscenes and NPC dialogues.

**Parameters**

| Name | WIT type |
| --- | --- |
| `locked` | `bool` |

### `player.is-movement-locked` {#operation-player-is-movement-locked}

```text
is-movement-locked: func() -> bool;
```

Returns whether the player's movement is currently locked.

**Returns:** `bool`

### `player.set-freeze-ticks` {#operation-player-set-freeze-ticks}

```text
set-freeze-ticks: func(ticks: s32);
```

Sets the number of freeze ticks on the player (controlling the powdered snow / frostbite screen vignette).

**Parameters**

| Name | WIT type |
| --- | --- |
| `ticks` | `s32` |

### `player.get-freeze-ticks` {#operation-player-get-freeze-ticks}

```text
get-freeze-ticks: func() -> s32;
```

Returns the current number of freeze ticks on the player.

**Returns:** `s32`

### `player.set-server-links` {#operation-player-set-server-links}

```text
set-server-links: func(links: list<server-link>);
```

Sends custom server links to the player (displayed in the client Esc pause menu in 1.21+).

**Parameters**

| Name | WIT type |
| --- | --- |
| `links` | `list<server-link>` |

### `player.add-effect` {#operation-player-add-effect}

```text
add-effect: func(effect: status-effect-instance);
```

Gives a status effect to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `effect` | `status-effect-instance` |

### `player.remove-effect` {#operation-player-remove-effect}

```text
remove-effect: func(effect: status-effect-type);
```

Removes a status effect from the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `effect` | `status-effect-type` |

### `player.clear-effects` {#operation-player-clear-effects}

```text
clear-effects: func();
```

Clears all active status effects from the player.

### `player.has-effect` {#operation-player-has-effect}

```text
has-effect: func(effect: status-effect-type) -> bool;
```

Checks if a status effect is currently applied to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `effect` | `status-effect-type` |

**Returns:** `bool`

### `player.get-effect` {#operation-player-get-effect}

```text
get-effect: func(effect: status-effect-type) -> option<status-effect-instance>;
```

Returns the status effect instance applied to the player, if any.

**Parameters**

| Name | WIT type |
| --- | --- |
| `effect` | `status-effect-type` |

**Returns:** `option<status-effect-instance>`

### `player.get-active-effects` {#operation-player-get-active-effects}

```text
get-active-effects: func() -> list<status-effect-instance>;
```

Returns all status effects currently applied to the player.

**Returns:** `list<status-effect-instance>`

### `player.heal` {#operation-player-heal}

```text
heal: func(amount: f32);
```

Heals the player by a specified amount.

**Parameters**

| Name | WIT type |
| --- | --- |
| `amount` | `f32` |

### `player.damage` {#operation-player-damage}

```text
damage: func(amount: f32, damage-type: damage-type);
```

Deals damage to the player by a specified amount with a damage type.

**Parameters**

| Name | WIT type |
| --- | --- |
| `amount` | `f32` |
| `damage-type` | `damage-type` |

### `player.kill` {#operation-player-kill}

```text
kill: func();
```

Kills the player instantly.

### `player.get-statistic` {#operation-player-get-statistic}

```text
get-statistic: func(category: statistic-category, stat-id: s32) -> s32;
```

Gets the value of a statistic for this player in the given category and ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `category` | `statistic-category` |
| `stat-id` | `s32` |

**Returns:** `s32`

### `player.set-statistic` {#operation-player-set-statistic}

```text
set-statistic: func(category: statistic-category, stat-id: s32, value: s32);
```

Sets the value of a statistic for this player in the given category and ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `category` | `statistic-category` |
| `stat-id` | `s32` |
| `value` | `s32` |

### `player.increment-statistic` {#operation-player-increment-statistic}

```text
increment-statistic: func(category: statistic-category, stat-id: s32, amount: s32);
```

Increments the value of a statistic for this player in the given category and ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `category` | `statistic-category` |
| `stat-id` | `s32` |
| `amount` | `s32` |

### `player.get-custom-statistic` {#operation-player-get-custom-statistic}

```text
get-custom-statistic: func(stat: custom-statistic) -> s32;
```

Gets the value of a custom statistic for this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `stat` | `custom-statistic` |

**Returns:** `s32`

### `player.set-custom-statistic` {#operation-player-set-custom-statistic}

```text
set-custom-statistic: func(stat: custom-statistic, value: s32);
```

Sets the value of a custom statistic for this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `stat` | `custom-statistic` |
| `value` | `s32` |

### `player.increment-custom-statistic` {#operation-player-increment-custom-statistic}

```text
increment-custom-statistic: func(stat: custom-statistic, amount: s32);
```

Increments the value of a custom statistic for this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `stat` | `custom-statistic` |
| `amount` | `s32` |

### `player.send-stats` {#operation-player-send-stats}

```text
send-stats: func();
```

Sends the player's updated statistics packet to the client.

### `player.get-team` {#operation-player-get-team}

```text
get-team: func() -> option<string>;
```

Gets the team name that this player belongs to on their active scoreboard, if any.

**Returns:** `option<string>`

### `player.start-cooldown` {#operation-player-start-cooldown}

```text
start-cooldown: func(group: string, duration-ticks: s32);
```

Starts an item cooldown for a specific item group name.

**Parameters**

| Name | WIT type |
| --- | --- |
| `group` | `string` |
| `duration-ticks` | `s32` |

### `player.get-cooldown` {#operation-player-get-cooldown}

```text
get-cooldown: func(group: string) -> f32;
```

Returns the cooldown progress (0.0 to 1.0) for a specific item group.

**Parameters**

| Name | WIT type |
| --- | --- |
| `group` | `string` |

**Returns:** `f32`

### `player.is-on-cooldown` {#operation-player-is-on-cooldown}

```text
is-on-cooldown: func(group: string) -> bool;
```

Checks if a specific item group is currently on cooldown.

**Parameters**

| Name | WIT type |
| --- | --- |
| `group` | `string` |

**Returns:** `bool`

### `player.set-allow-flight` {#operation-player-set-allow-flight}

```text
set-allow-flight: func(allowed: bool);
```

Sets whether the player is allowed to fly.

**Parameters**

| Name | WIT type |
| --- | --- |
| `allowed` | `bool` |

### `player.set-fly-speed` {#operation-player-set-fly-speed}

```text
set-fly-speed: func(speed: f32);
```

Sets the player's flying speed.

**Parameters**

| Name | WIT type |
| --- | --- |
| `speed` | `f32` |

### `player.set-walk-speed` {#operation-player-set-walk-speed}

```text
set-walk-speed: func(speed: f32);
```

Sets the player's walking speed.

**Parameters**

| Name | WIT type |
| --- | --- |
| `speed` | `f32` |

### `player.set-invulnerable` {#operation-player-set-invulnerable}

```text
set-invulnerable: func(invulnerable: bool);
```

Sets whether the player is invulnerable to damage.

**Parameters**

| Name | WIT type |
| --- | --- |
| `invulnerable` | `bool` |

### `player.get-experience-level` {#operation-player-get-experience-level}

```text
get-experience-level:    func() -> s32;
```

Returns the player's total experience level.

**Returns:** `s32`

### `player.get-experience-progress` {#operation-player-get-experience-progress}

```text
get-experience-progress: func() -> f32;
```

Returns the player's progress toward the next level (0.0 to 1.0).

**Returns:** `f32`

### `player.get-experience-points` {#operation-player-get-experience-points}

```text
get-experience-points:   func() -> s32;
```

Returns the total experience points the player has.

**Returns:** `s32`

### `player.set-experience-level` {#operation-player-set-experience-level}

```text
set-experience-level:    func(level: s32);
```

Sets the player's total experience level.

**Parameters**

| Name | WIT type |
| --- | --- |
| `level` | `s32` |

### `player.set-experience-progress` {#operation-player-set-experience-progress}

```text
set-experience-progress: func(progress: f32);
```

Sets the player's progress toward the next level.

**Parameters**

| Name | WIT type |
| --- | --- |
| `progress` | `f32` |

### `player.set-experience-points` {#operation-player-set-experience-points}

```text
set-experience-points:   func(points: s32);
```

Sets the player's total experience points.

**Parameters**

| Name | WIT type |
| --- | --- |
| `points` | `s32` |

### `player.add-experience-levels` {#operation-player-add-experience-levels}

```text
add-experience-levels:   func(levels: s32);
```

Adds experience levels to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `levels` | `s32` |

### `player.add-experience-points` {#operation-player-add-experience-points}

```text
add-experience-points:   func(points: s32);
```

Adds experience points to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `points` | `s32` |

### `player.is-flying` {#operation-player-is-flying}

```text
is-flying:    func() -> bool;
```

Returns whether the player is currently flying.

**Returns:** `bool`

### `player.set-flying` {#operation-player-set-flying}

```text
set-flying:   func(flying: bool);
```

Sets whether the player should be flying.

**Parameters**

| Name | WIT type |
| --- | --- |
| `flying` | `bool` |

### `player.get-abilities` {#operation-player-get-abilities}

```text
get-abilities: func() -> player-abilities;
```

Returns the player's current abilities.

**Returns:** `player-abilities`

### `player.set-abilities` {#operation-player-set-abilities}

```text
set-abilities: func(abilities: player-abilities);
```

Updates the player's abilities.

**Parameters**

| Name | WIT type |
| --- | --- |
| `abilities` | `player-abilities` |

### `player.get-ip` {#operation-player-get-ip}

```text
get-ip: func() -> string;
```

Returns the player's IP address.

**Returns:** `string`

### `player.get-skin` {#operation-player-get-skin}

```text
get-skin: func() -> option<player-skin>;
```

Returns the player's current skin textures.

**Returns:** `option<player-skin>`

### `player.set-skin` {#operation-player-set-skin}

```text
set-skin: func(skin: player-skin);
```

Updates the player's skin textures.
Note: this only updates the fields, it doesn't reload the skin.

**Parameters**

| Name | WIT type |
| --- | --- |
| `skin` | `player-skin` |

### `player.get-skin-parts` {#operation-player-get-skin-parts}

```text
get-skin-parts: func() -> skin-parts;
```

Returns which skin parts are visible.

**Returns:** `skin-parts`

### `player.set-skin-parts` {#operation-player-set-skin-parts}

```text
set-skin-parts: func(parts: skin-parts);
```

Sets which skin parts are visible.

**Parameters**

| Name | WIT type |
| --- | --- |
| `parts` | `skin-parts` |

### `player.set-player-time` {#operation-player-set-player-time}

```text
set-player-time: func(time: u64, relative: bool);
```

Overrides the time of day shown to this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `time` | `u64` |
| `relative` | `bool` |

### `player.reset-player-time` {#operation-player-reset-player-time}

```text
reset-player-time: func();
```

Resets the player's time to sync with the server world time.

### `player.get-player-time` {#operation-player-get-player-time}

```text
get-player-time: func() -> option<u64>;
```

Returns the custom time set for this player, if any.

**Returns:** `option<u64>`

### `player.is-player-time-relative` {#operation-player-is-player-time-relative}

```text
is-player-time-relative: func() -> bool;
```

Checks if the custom player time is relative to the world time.

**Returns:** `bool`

### `player.set-player-weather` {#operation-player-set-player-weather}

```text
set-player-weather: func(weather: player-weather);
```

Overrides the weather condition shown to this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `weather` | `player-weather` |

### `player.reset-player-weather` {#operation-player-reset-player-weather}

```text
reset-player-weather: func();
```

Resets the player's weather to match the server world weather.

### `player.get-player-weather` {#operation-player-get-player-weather}

```text
get-player-weather: func() -> option<player-weather>;
```

Returns the custom weather set for this player, if any.

**Returns:** `option<player-weather>`

### `player.set-compass-target` {#operation-player-set-compass-target}

```text
set-compass-target: func(pos: position);
```

Sets the position where the player's compass points.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |

### `player.get-compass-target` {#operation-player-get-compass-target}

```text
get-compass-target: func() -> position;
```

Returns the position where the player's compass currently points.

**Returns:** `position`

### `player.set-respawn-location` {#operation-player-set-respawn-location}

```text
set-respawn-location: func(pos: position);
```

Sets the player's custom respawn / bed location.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |

### `player.get-respawn-location` {#operation-player-get-respawn-location}

```text
get-respawn-location: func() -> option<position>;
```

Returns the player's custom respawn / bed location, if set.

**Returns:** `option<position>`

### `player.hide-player` {#operation-player-hide-player}

```text
hide-player: func(other: player);
```

Hides another player from this player's view (vanish).

**Parameters**

| Name | WIT type |
| --- | --- |
| `other` | `player` |

### `player.show-player` {#operation-player-show-player}

```text
show-player: func(other: player);
```

Shows a previously hidden player to this player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `other` | `player` |

### `player.can-see` {#operation-player-can-see}

```text
can-see: func(other: player) -> bool;
```

Checks if this player can see another specified player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `other` | `player` |

**Returns:** `bool`

### `player.can-see-player` {#operation-player-can-see-player}

```text
can-see-player: func(other: player) -> bool;
```

Checks if this player can see another specified player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `other` | `player` |

**Returns:** `bool`

### `player.set-tab-list-ping` {#operation-player-set-tab-list-ping}

```text
set-tab-list-ping: func(latency-ms: s32);
```

Sets the tab list ping / latency indicator in milliseconds.

**Parameters**

| Name | WIT type |
| --- | --- |
| `latency-ms` | `s32` |

### `player.set-item-cooldown` {#operation-player-set-item-cooldown}

```text
set-item-cooldown: func(item-id: string, ticks: s32);
```

Sets a client-side item cooldown overlay.

**Parameters**

| Name | WIT type |
| --- | --- |
| `item-id` | `string` |
| `ticks` | `s32` |

### `player.get-item-cooldown` {#operation-player-get-item-cooldown}

```text
get-item-cooldown: func(item-id: string) -> option<s32>;
```

Returns the remaining cooldown ticks for an item, if active.

**Parameters**

| Name | WIT type |
| --- | --- |
| `item-id` | `string` |

**Returns:** `option<s32>`

### `player.has-item-cooldown` {#operation-player-has-item-cooldown}

```text
has-item-cooldown: func(item-id: string) -> bool;
```

Checks if an item is currently on cooldown.

**Parameters**

| Name | WIT type |
| --- | --- |
| `item-id` | `string` |

**Returns:** `bool`

### `player.ray-trace-block` {#operation-player-ray-trace-block}

```text
ray-trace-block: func(max-distance: f64, include-fluids: bool) -> option<ray-trace-block-result>;
```

Performs a ray-trace from the player's eye position in looking direction to find the targeted block.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `f64` |
| `include-fluids` | `bool` |

**Returns:** `option<ray-trace-block-result>`

### `player.ray-trace-entity` {#operation-player-ray-trace-entity}

```text
ray-trace-entity: func(max-distance: f64) -> option<ray-trace-entity-result>;
```

Performs a ray-trace from the player's eye position in looking direction to find the targeted entity.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `f64` |

**Returns:** `option<ray-trace-entity-result>`

### `player.get-target-entity` {#operation-player-get-target-entity}

```text
get-target-entity: func(max-distance: f64) -> option<entity>;
```

Returns the entity currently targeted in the looking direction within the specified distance.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `f64` |

**Returns:** `option<entity>`

### `player.get-target-block` {#operation-player-get-target-block}

```text
get-target-block: func(max-distance: u32) -> option<position>;
```

Raycasts from the player's eyes to find the block being targeted.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `u32` |

**Returns:** `option<position>`

### `player.get-target-block-exact` {#operation-player-get-target-block-exact}

```text
get-target-block-exact: func(max-distance: f64, include-fluids: bool) -> option<ray-trace-block-result>;
```

Performs a raycast from the player's eyes to find the exact block and face being targeted.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `f64` |
| `include-fluids` | `bool` |

**Returns:** `option<ray-trace-block-result>`

### `player.launch-projectile` {#operation-player-launch-projectile}

```text
launch-projectile: func(%type: projectile-type) -> option<entity>;
```

Launches a projectile from the player's eyes in their line of sight.

**Parameters**

| Name | WIT type |
| --- | --- |
| `%type` | `projectile-type` |

**Returns:** `option<entity>`

### `player.get-advancement-progress` {#operation-player-get-advancement-progress}

```text
get-advancement-progress: func(advancement-id: string) -> option<advancement-progress>;
```

Returns the progress of the specified advancement for this player, if the advancement exists.

**Parameters**

| Name | WIT type |
| --- | --- |
| `advancement-id` | `string` |

**Returns:** `option<advancement-progress>`

### `player.award-advancement-criterion` {#operation-player-award-advancement-criterion}

```text
award-advancement-criterion: func(advancement-id: string, criterion: string) -> bool;
```

Awards a specific criterion of an advancement to the player.
Returns true if the criterion was successfully awarded (was not already completed).

**Parameters**

| Name | WIT type |
| --- | --- |
| `advancement-id` | `string` |
| `criterion` | `string` |

**Returns:** `bool`

### `player.revoke-advancement-criterion` {#operation-player-revoke-advancement-criterion}

```text
revoke-advancement-criterion: func(advancement-id: string, criterion: string) -> bool;
```

Revokes a specific criterion of an advancement from the player.
Returns true if the criterion was successfully revoked (was previously completed).

**Parameters**

| Name | WIT type |
| --- | --- |
| `advancement-id` | `string` |
| `criterion` | `string` |

**Returns:** `bool`

### `player.award-advancement` {#operation-player-award-advancement}

```text
award-advancement: func(advancement-id: string) -> bool;
```

Awards all criteria of the specified advancement to the player.
Returns true if any criterion was newly awarded.

**Parameters**

| Name | WIT type |
| --- | --- |
| `advancement-id` | `string` |

**Returns:** `bool`

### `player.revoke-advancement` {#operation-player-revoke-advancement}

```text
revoke-advancement: func(advancement-id: string) -> bool;
```

Revokes all criteria of the specified advancement from the player.
Returns true if any criterion was newly revoked.

**Parameters**

| Name | WIT type |
| --- | --- |
| `advancement-id` | `string` |

**Returns:** `bool`

### `player.has-advancement` {#operation-player-has-advancement}

```text
has-advancement: func(advancement-id: string) -> bool;
```

Checks whether the player has completed the specified advancement.

**Parameters**

| Name | WIT type |
| --- | --- |
| `advancement-id` | `string` |

**Returns:** `bool`

### `player.get-completed-advancements` {#operation-player-get-completed-advancements}

```text
get-completed-advancements: func() -> list<string>;
```

Returns a list of all advancement IDs completed by this player.

**Returns:** `list<string>`

### `player.get-selected-advancement-tab` {#operation-player-get-selected-advancement-tab}

```text
get-selected-advancement-tab: func() -> option<string>;
```

Returns the ID of the currently selected advancement tab for this player, if any.

**Returns:** `option<string>`

### `player.set-selected-advancement-tab` {#operation-player-set-selected-advancement-tab}

```text
set-selected-advancement-tab: func(tab-id: option<string>);
```

Sets the selected advancement tab for this player (must be a root advancement ID).

**Parameters**

| Name | WIT type |
| --- | --- |
| `tab-id` | `option<string>` |

### `player.as-java` {#operation-player-as-java}

```text
as-java: func() -> option<java-player>;
```

Returns a Java-specific player handle, if the player is connected via Java Edition.

This allows access to Java-exclusive features like sending specific packets
or retrieving the client brand.

**Returns:** `option<java-player>`

### `player.as-bedrock` {#operation-player-as-bedrock}

```text
as-bedrock: func() -> option<bedrock-player>;
```

Returns a Bedrock-specific player handle, if the player is connected via Bedrock Edition.

This allows access to Bedrock-exclusive features like custom forms
or detailed device information.

**Returns:** `option<bedrock-player>`

### `java-player.get-version` {#operation-java-player-get-version}

```text
get-version: func() -> java-minecraft-version;
```

Returns the Minecraft Java Edition version of the player.

**Returns:** `java-minecraft-version`

### `java-player.get-brand` {#operation-java-player-get-brand}

```text
get-brand: func() -> string;
```

Returns the brand of the player's client (e.g., \"vanilla\", \"fabric\").

**Returns:** `string`

### `java-player.get-server-address` {#operation-java-player-get-server-address}

```text
get-server-address: func() -> string;
```

Returns the server address the player used to connect.

**Returns:** `string`

### `java-player.get-settings` {#operation-java-player-get-settings}

```text
get-settings: func() -> java-player-settings;
```

Returns the player's configuration settings.

**Returns:** `java-player-settings`

### `java-player.send-packet` {#operation-java-player-send-packet}

```text
send-packet: func(packet: java-packet);
```

Sends a Java-specific clientbound packet to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `packet` | `java-packet` |

### `java-player.send-custom-payload` {#operation-java-player-send-custom-payload}

```text
send-custom-payload: func(channel: string, data: list<u8>);
```

Sends a custom payload packet (plugin message) to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `channel` | `string` |
| `data` | `list<u8>` |

### `java-player.show-dialog` {#operation-java-player-show-dialog}

```text
show-dialog: func(dialog: dialog);
```

Shows a dialog to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `dialog` | `dialog` |

### `java-player.clear-dialog` {#operation-java-player-clear-dialog}

```text
clear-dialog: func();
```

Clears any currently shown dialog for the player.

### `java-player.get-scoreboard` {#operation-java-player-get-scoreboard}

```text
get-scoreboard: func() -> scoreboard;
```

Returns the Java scoreboard handle for this player.

**Returns:** `scoreboard`

### `java-player.reset-scoreboard` {#operation-java-player-reset-scoreboard}

```text
reset-scoreboard: func();
```

Resets the player's custom Java scoreboard back to the world scoreboard.

### `java-player.send-resource-pack` {#operation-java-player-send-resource-pack}

```text
send-resource-pack: func(pack: java-resource-pack);
```

Sends a resource pack to the Java player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pack` | `java-resource-pack` |

### `java-player.remove-resource-pack` {#operation-java-player-remove-resource-pack}

```text
remove-resource-pack: func(id: uuid);
```

Removes a specific resource pack by UUID for the Java player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

### `java-player.clear-resource-packs` {#operation-java-player-clear-resource-packs}

```text
clear-resource-packs: func();
```

Clears all custom resource packs for the Java player.

### `java-player.kick` {#operation-java-player-kick}

```text
kick: func(options: java-kick-options);
```

Kicks the Java player with the specified options.

**Parameters**

| Name | WIT type |
| --- | --- |
| `options` | `java-kick-options` |

### `java-player.send-game-event` {#operation-java-player-send-game-event}

```text
send-game-event: func(event: client-game-event, value: f32);
```

Sends a clientbound GameEvent packet to the Java player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `event` | `client-game-event` |
| `value` | `f32` |

### `java-player.send-entity-status` {#operation-java-player-send-entity-status}

```text
send-entity-status: func(entity-id: s32, status: entity-status);
```

Sends an entity status / animation event packet to the Java player for a specific entity ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `status` | `entity-status` |

### `bedrock-player.get-version` {#operation-bedrock-player-get-version}

```text
get-version: func() -> bedrock-minecraft-version;
```

Returns the Minecraft Bedrock Edition version of the player.

**Returns:** `bedrock-minecraft-version`

### `bedrock-player.get-settings` {#operation-bedrock-player-get-settings}

```text
get-settings: func() -> bedrock-player-settings;
```

Returns the player's configuration settings.

**Returns:** `bedrock-player-settings`

### `bedrock-player.get-ability` {#operation-bedrock-player-get-ability}

```text
get-ability: func(ability: bedrock-ability) -> bool;
```

Returns whether a specific Bedrock-only ability is enabled for the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `ability` | `bedrock-ability` |

**Returns:** `bool`

### `bedrock-player.set-ability` {#operation-bedrock-player-set-ability}

```text
set-ability: func(ability: bedrock-ability, value: bool);
```

Sets whether a specific Bedrock-only ability is enabled for the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `ability` | `bedrock-ability` |
| `value` | `bool` |

### `bedrock-player.get-status-flag` {#operation-bedrock-player-get-status-flag}

```text
get-status-flag: func(flag: bedrock-status-flag) -> bool;
```

Returns whether a specific Bedrock-only status flag is enabled for the player.

Status flags control things like whether the player is on fire, sneaking,
sprinting, or has specific visual effects.

**Parameters**

| Name | WIT type |
| --- | --- |
| `flag` | `bedrock-status-flag` |

**Returns:** `bool`

### `bedrock-player.set-status-flag` {#operation-bedrock-player-set-status-flag}

```text
set-status-flag: func(flag: bedrock-status-flag, value: bool);
```

Sets whether a specific Bedrock-only status flag is enabled for the player.

This can be used to manually trigger client-side visual states.

**Parameters**

| Name | WIT type |
| --- | --- |
| `flag` | `bedrock-status-flag` |
| `value` | `bool` |

### `bedrock-player.send-packet` {#operation-bedrock-player-send-packet}

```text
send-packet: func(packet: bedrock-packet);
```

Sends a Bedrock-specific clientbound packet to the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `packet` | `bedrock-packet` |

### `bedrock-player.open-form` {#operation-bedrock-player-open-form}

```text
open-form: func(form: form) -> u32;
```

Opens a Bedrock custom form for the player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `form` | `form` |

**Returns:** `u32`

### `bedrock-player.get-scoreboard` {#operation-bedrock-player-get-scoreboard}

```text
get-scoreboard: func() -> bedrock-scoreboard;
```

Returns the Bedrock scoreboard handle for this player.

**Returns:** `bedrock-scoreboard`

### `bedrock-player.reset-scoreboard` {#operation-bedrock-player-reset-scoreboard}

```text
reset-scoreboard: func();
```

Resets the player's custom Bedrock scoreboard back to the world scoreboard.

### `bedrock-player.send-resource-packs-info` {#operation-bedrock-player-send-resource-packs-info}

```text
send-resource-packs-info: func(info: bedrock-resource-packs-info);
```

Sends resource packs information to the Bedrock player.

**Parameters**

| Name | WIT type |
| --- | --- |
| `info` | `bedrock-resource-packs-info` |

### `bedrock-player.kick` {#operation-bedrock-player-kick}

```text
kick: func(options: bedrock-kick-options);
```

Kicks the Bedrock player with the specified options.

**Parameters**

| Name | WIT type |
| --- | --- |
| `options` | `bedrock-kick-options` |

### `player.get-world-players` {#operation-player-get-world-players}

```text
get-world-players: func(world-ref: %world) -> list<player>;
```

Returns a list of all players in a specific world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `world-ref` | `%world` |

**Returns:** `list<player>`
