---
title: Interface world
outline: [2, 2]
---

# Interface `world`

Host import: `pumpkin:plugin/world@0.1.0`

[Package summary](./)

Source: [world.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/world.wit)

Worlds, blocks, entities, and chunk generation.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`common`](./common) | `position`, `entity-pose`, `block-pos`, `nbt-tree` |
| [`block-entity`](./block-entity) | `block-entity`, `command-block-entity`, `block-entity-type` |
| [`text`](./text) | `text-component` |
| [`scoreboard`](./scoreboard) | `scoreboard` |
| [`particles`](./particles) | `particle` |
| [`sounds`](./sounds) | `sound`, `sound-category` |
| [`entity-types`](./entity-types) | `entity-type` |
| [`biomes`](./biomes) | `biome` |
| [`attributes`](./attributes) | `attribute`, `modifier-operation`, `attribute-modifier` |
| [`item-stack`](./item-stack) | `item-stack` |
| [`damage-types`](./damage-types) | `damage-type` |
| [`game-rules`](./game-rules) | `game-rule`, `game-rule-value` |
| [`uuid`](./uuid) | `uuid` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`ageable-data`](#type-ageable-data) | Specialized data for ageable animal mobs. |
| record | [`block`](#type-block) | Static definition of a Minecraft block type. |
| enum | [`block-direction`](#type-block-direction) | Represents a cardinal direction or block face. |
| flags | [`block-flags`](#type-block-flags) | Flags used to control block updates and notifications. |
| record | [`block-state`](#type-block-state) | Detailed information about a block's state. |
| record | [`block-state-id`](#type-block-state-id) | A simple wrapper for a block state ID. |
| record | [`block-state-info`](#type-block-state-info) | A block's registry name and its property key-value pairs for a state ID. |
| record | [`bounding-box`](#type-bounding-box) | Represents an axis-aligned bounding box. |
| variant | [`builtin-ai-goal`](#type-builtin-ai-goal) | Predefined AI goals that can be added to mob entities. |
| record | [`cat-data`](#type-cat-data) | Specialized data for cat entities. |
| resource | [`chunk`](#type-chunk) |  |
| resource | [`chunk-buffer`](#type-chunk-buffer) | Mutable chunk buffer representing a 16x16 column during custom world generation. |
| record | [`creeper-data`](#type-creeper-data) | Specialized data for creeper entities. |
| enum | [`dye-color`](#type-dye-color) | Minecraft 16 dye colors. |
| record | [`enderman-data`](#type-enderman-data) | Specialized data for enderman entities. |
| resource | [`entity`](#type-entity) |  |
| enum | [`equipment-slot`](#type-equipment-slot) | Equipment slots available on living entities (mobs, armor stands, players). |
| enum | [`explosion-interaction`](#type-explosion-interaction) | Defines how an explosion interacts with blocks in the world. |
| record | [`flammable`](#type-flammable) | Flammability properties of a block. |
| record | [`fox-data`](#type-fox-data) | Specialized data for fox entities. |
| enum | [`generation-phase`](#type-generation-phase) | Generation phase for custom chunk generation. |
| record | [`iron-golem-data`](#type-iron-golem-data) | Specialized data for iron golem entities. |
| resource | [`living-entity`](#type-living-entity) | Represents a living entity with health, combat stats, attributes, and equipment (mobs, players, armor stands). |
| resource | [`mob`](#type-mob) | Represents an AI-driven mob entity with goals, targeting, and pathfinding navigation (e.g. zombies, villagers). |
| variant | [`mob-data`](#type-mob-data) | Tagged variant holding specialized data for specific mob types. |
| enum | [`noteblock-instrument`](#type-noteblock-instrument) | Musical instruments used by note blocks. |
| enum | [`path-node-type`](#type-path-node-type) | Node and terrain classification types evaluated during mob pathfinding. |
| enum | [`piston-behavior`](#type-piston-behavior) | Defines how a block reacts when pushed by a piston. |
| record | [`ray-trace-block-result`](#type-ray-trace-block-result) | Detailed result of a block ray-trace operation. |
| record | [`ray-trace-entity-result`](#type-ray-trace-entity-result) | Result of an entity ray-trace operation. |
| record | [`raycast-result`](#type-raycast-result) | Result of a raycast operation. |
| record | [`sheep-data`](#type-sheep-data) | Specialized data for sheep entities. |
| record | [`shulker-data`](#type-shulker-data) | Specialized data for shulker entities. |
| record | [`slime-data`](#type-slime-data) | Specialized data for slime and magma cube entities. |
| record | [`villager-data`](#type-villager-data) | Specialized data for villager entities. |
| enum | [`villager-profession`](#type-villager-profession) | Villager profession identifiers. |
| record | [`wolf-data`](#type-wolf-data) | Specialized data for wolf entities. |
| resource | [`world`](#type-world) | Represents a Minecraft world (dimension). |
| resource | [`world-border`](#type-world-border) | Represents the boundaries of a world. |
| record | [`world-spawn-location`](#type-world-spawn-location) | Represents the configured shared spawn location for a world. |
| record | [`zombie-data`](#type-zombie-data) | Specialized data for zombie entities. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `chunk` | [`get-biome`](#operation-chunk-get-biome) | Gets the biome at the specified position relative to the chunk. |
| `chunk` | [`get-block`](#operation-chunk-get-block) | Gets the block at the specified position relative to the chunk. |
| `chunk` | [`get-block-entity`](#operation-chunk-get-block-entity) | Gets the block entity at the specified position relative to the chunk, if any. |
| `chunk` | [`get-block-light`](#operation-chunk-get-block-light) | Gets the block light level at the specified position relative to the chunk. |
| `chunk` | [`get-block-state`](#operation-chunk-get-block-state) | Gets detailed block state information at the specified position relative to the chunk. |
| `chunk` | [`get-block-state-id`](#operation-chunk-get-block-state-id) | Gets the block state ID at the specified position relative to the chunk. |
| `chunk` | [`get-custom-data`](#operation-chunk-get-custom-data) | Returns a namespaced custom data value from this chunk, if set. |
| `chunk` | [`get-sky-light`](#operation-chunk-get-sky-light) | Gets the sky light level at the specified position relative to the chunk. |
| `chunk` | [`get-top-block-y`](#operation-chunk-get-top-block-y) | Gets the highest non-air block Y coordinate at the specified X and Z relative to the chunk. |
| `chunk` | [`get-x`](#operation-chunk-get-x) | Gets the chunk's X coordinate. |
| `chunk` | [`get-z`](#operation-chunk-get-z) | Gets the chunk's Z coordinate. |
| `chunk` | [`has-custom-data`](#operation-chunk-has-custom-data) | Returns whether this chunk has a namespaced custom data value. |
| `chunk` | [`remove-custom-data`](#operation-chunk-remove-custom-data) | Removes a namespaced custom data value from this chunk. |
| `chunk` | [`set-block`](#operation-chunk-set-block) | Sets the block at the specified position relative to the chunk using its default state. |
| `chunk` | [`set-block-by-id`](#operation-chunk-set-block-by-id) | Sets the block by block ID at the specified position relative to the chunk using its default state. |
| `chunk` | [`set-block-state`](#operation-chunk-set-block-state) | Sets the block state at the specified position relative to the chunk. |
| `chunk` | [`set-custom-data`](#operation-chunk-set-custom-data) | Sets a namespaced custom data value on this chunk. |
| `chunk-buffer` | [`fill-biome`](#operation-chunk-buffer-fill-biome) | Fills the entire chunk with the given biome. |
| `chunk-buffer` | [`fill-cuboid`](#operation-chunk-buffer-fill-cuboid) | Fills a 3D cuboid with a block state ID. |
| `chunk-buffer` | [`fill-layer`](#operation-chunk-buffer-fill-layer) | Fills an entire horizontal 16x16 layer at the given Y level with a block state ID. |
| `chunk-buffer` | [`fill-range`](#operation-chunk-buffer-fill-range) | Fills a vertical column from min-y to max-y at local (x, z) with a block state ID. |
| `chunk-buffer` | [`get-block-state-id`](#operation-chunk-buffer-get-block-state-id) | Gets the block state ID at local coordinates (0..16, y, 0..16). |
| `chunk-buffer` | [`get-height`](#operation-chunk-buffer-get-height) | Returns the height of the chunk in blocks. |
| `chunk-buffer` | [`get-min-y`](#operation-chunk-buffer-get-min-y) | Returns the minimum Y coordinate for this world. |
| `chunk-buffer` | [`get-x`](#operation-chunk-buffer-get-x) | Returns the chunk X coordinate. |
| `chunk-buffer` | [`get-z`](#operation-chunk-buffer-get-z) | Returns the chunk Z coordinate. |
| `chunk-buffer` | [`set-biome`](#operation-chunk-buffer-set-biome) | Sets the biome at local coordinates (0..16, y, 0..16). |
| `chunk-buffer` | [`set-block-state-id`](#operation-chunk-buffer-set-block-state-id) | Sets the block state ID at local coordinates (0..16, y, 0..16). |
| `entity` | [`add-passenger`](#operation-entity-add-passenger) |  |
| `entity` | [`as-living`](#operation-entity-as-living) | Returns this entity as a living-entity if it has health and attributes, or none otherwise. |
| `entity` | [`as-mob`](#operation-entity-as-mob) | Returns this entity as a mob if it is an AI-driven mob entity, or none otherwise. |
| `entity` | [`eject-passengers`](#operation-entity-eject-passengers) |  |
| `entity` | [`get-bounding-box`](#operation-entity-get-bounding-box) |  |
| `entity` | [`get-custom-data`](#operation-entity-get-custom-data) | Returns a namespaced custom data value from this entity, if set. |
| `entity` | [`get-custom-name`](#operation-entity-get-custom-name) |  |
| `entity` | [`get-eye-height`](#operation-entity-get-eye-height) |  |
| `entity` | [`get-eye-position`](#operation-entity-get-eye-position) |  |
| `entity` | [`get-fall-distance`](#operation-entity-get-fall-distance) |  |
| `entity` | [`get-fire-ticks`](#operation-entity-get-fire-ticks) |  |
| `entity` | [`get-head-yaw`](#operation-entity-get-head-yaw) |  |
| `entity` | [`get-height`](#operation-entity-get-height) |  |
| `entity` | [`get-id`](#operation-entity-get-id) |  |
| `entity` | [`get-max-air`](#operation-entity-get-max-air) |  |
| `entity` | [`get-name`](#operation-entity-get-name) |  |
| `entity` | [`get-nearby-entities`](#operation-entity-get-nearby-entities) |  |
| `entity` | [`get-passengers`](#operation-entity-get-passengers) |  |
| `entity` | [`get-pitch`](#operation-entity-get-pitch) |  |
| `entity` | [`get-portal-cooldown`](#operation-entity-get-portal-cooldown) |  |
| `entity` | [`get-pose`](#operation-entity-get-pose) |  |
| `entity` | [`get-position`](#operation-entity-get-position) |  |
| `entity` | [`get-remaining-air`](#operation-entity-get-remaining-air) |  |
| `entity` | [`get-target-entity`](#operation-entity-get-target-entity) | Returns the entity currently targeted in the looking direction within the specified distance. |
| `entity` | [`get-ticks-lived`](#operation-entity-get-ticks-lived) |  |
| `entity` | [`get-type`](#operation-entity-get-type) |  |
| `entity` | [`get-uuid`](#operation-entity-get-uuid) |  |
| `entity` | [`get-vehicle`](#operation-entity-get-vehicle) |  |
| `entity` | [`get-velocity`](#operation-entity-get-velocity) |  |
| `entity` | [`get-width`](#operation-entity-get-width) |  |
| `entity` | [`get-world`](#operation-entity-get-world) |  |
| `entity` | [`get-yaw`](#operation-entity-get-yaw) |  |
| `entity` | [`has-custom-data`](#operation-entity-has-custom-data) | Returns whether this entity has a namespaced custom data value. |
| `entity` | [`has-gravity`](#operation-entity-has-gravity) |  |
| `entity` | [`has-visual-fire`](#operation-entity-has-visual-fire) |  |
| `entity` | [`is-custom-name-visible`](#operation-entity-is-custom-name-visible) |  |
| `entity` | [`is-fall-flying`](#operation-entity-is-fall-flying) |  |
| `entity` | [`is-glowing`](#operation-entity-is-glowing) |  |
| `entity` | [`is-in-lava`](#operation-entity-is-in-lava) |  |
| `entity` | [`is-in-water`](#operation-entity-is-in-water) |  |
| `entity` | [`is-invisible`](#operation-entity-is-invisible) |  |
| `entity` | [`is-invulnerable`](#operation-entity-is-invulnerable) |  |
| `entity` | [`is-living`](#operation-entity-is-living) | Returns whether this entity is a living entity. |
| `entity` | [`is-mob`](#operation-entity-is-mob) | Returns whether this entity is an AI-driven mob. |
| `entity` | [`is-on-fire`](#operation-entity-is-on-fire) |  |
| `entity` | [`is-on-ground`](#operation-entity-is-on-ground) |  |
| `entity` | [`is-silent`](#operation-entity-is-silent) |  |
| `entity` | [`is-sneaking`](#operation-entity-is-sneaking) |  |
| `entity` | [`is-sprinting`](#operation-entity-is-sprinting) |  |
| `entity` | [`is-swimming`](#operation-entity-is-swimming) |  |
| `entity` | [`ray-trace-block`](#operation-entity-ray-trace-block) | Performs a ray-trace from the entity's eye position in its looking direction to find the targeted block. |
| `entity` | [`ray-trace-entity`](#operation-entity-ray-trace-entity) | Performs a ray-trace from the entity's eye position in its looking direction to find the targeted entity. |
| `entity` | [`raycast`](#operation-entity-raycast) | Performs a raycast from the entity's eye position in its looking direction. |
| `entity` | [`remove`](#operation-entity-remove) |  |
| `entity` | [`remove-custom-data`](#operation-entity-remove-custom-data) | Removes a namespaced custom data value from this entity. |
| `entity` | [`remove-passenger`](#operation-entity-remove-passenger) |  |
| `entity` | [`set-custom-data`](#operation-entity-set-custom-data) | Sets a namespaced custom data value on this entity. |
| `entity` | [`set-custom-name`](#operation-entity-set-custom-name) |  |
| `entity` | [`set-custom-name-visible`](#operation-entity-set-custom-name-visible) |  |
| `entity` | [`set-fall-distance`](#operation-entity-set-fall-distance) |  |
| `entity` | [`set-fall-flying`](#operation-entity-set-fall-flying) |  |
| `entity` | [`set-fire-ticks`](#operation-entity-set-fire-ticks) |  |
| `entity` | [`set-glowing`](#operation-entity-set-glowing) |  |
| `entity` | [`set-has-gravity`](#operation-entity-set-has-gravity) |  |
| `entity` | [`set-invisible`](#operation-entity-set-invisible) |  |
| `entity` | [`set-invulnerable`](#operation-entity-set-invulnerable) |  |
| `entity` | [`set-on-fire`](#operation-entity-set-on-fire) |  |
| `entity` | [`set-portal-cooldown`](#operation-entity-set-portal-cooldown) |  |
| `entity` | [`set-remaining-air`](#operation-entity-set-remaining-air) |  |
| `entity` | [`set-rotation`](#operation-entity-set-rotation) |  |
| `entity` | [`set-silent`](#operation-entity-set-silent) |  |
| `entity` | [`set-sneaking`](#operation-entity-set-sneaking) |  |
| `entity` | [`set-sprinting`](#operation-entity-set-sprinting) |  |
| `entity` | [`set-swimming`](#operation-entity-set-swimming) |  |
| `entity` | [`set-ticks-lived`](#operation-entity-set-ticks-lived) |  |
| `entity` | [`set-vehicle`](#operation-entity-set-vehicle) |  |
| `entity` | [`set-velocity`](#operation-entity-set-velocity) |  |
| `entity` | [`set-visual-fire`](#operation-entity-set-visual-fire) |  |
| `entity` | [`teleport`](#operation-entity-teleport) |  |
| `living-entity` | [`add-attribute-modifier`](#operation-living-entity-add-attribute-modifier) |  |
| `living-entity` | [`as-entity`](#operation-living-entity-as-entity) | Converts back to the base entity handle. |
| `living-entity` | [`as-mob`](#operation-living-entity-as-mob) | Returns this living entity as a mob if it has AI/navigation, or none otherwise. |
| `living-entity` | [`clear-equipment`](#operation-living-entity-clear-equipment) |  |
| `living-entity` | [`damage`](#operation-living-entity-damage) |  |
| `living-entity` | [`get-absorption`](#operation-living-entity-get-absorption) |  |
| `living-entity` | [`get-age`](#operation-living-entity-get-age) |  |
| `living-entity` | [`get-attribute-base`](#operation-living-entity-get-attribute-base) |  |
| `living-entity` | [`get-attribute-modifiers`](#operation-living-entity-get-attribute-modifiers) |  |
| `living-entity` | [`get-attribute-value`](#operation-living-entity-get-attribute-value) |  |
| `living-entity` | [`get-equipment`](#operation-living-entity-get-equipment) |  |
| `living-entity` | [`get-health`](#operation-living-entity-get-health) |  |
| `living-entity` | [`get-max-health`](#operation-living-entity-get-max-health) |  |
| `living-entity` | [`is-dead`](#operation-living-entity-is-dead) |  |
| `living-entity` | [`is-mob`](#operation-living-entity-is-mob) | Returns whether this living entity is an AI-driven mob. |
| `living-entity` | [`remove-attribute-modifier`](#operation-living-entity-remove-attribute-modifier) |  |
| `living-entity` | [`reset-all-attributes`](#operation-living-entity-reset-all-attributes) |  |
| `living-entity` | [`reset-attribute`](#operation-living-entity-reset-attribute) |  |
| `living-entity` | [`send-system-message`](#operation-living-entity-send-system-message) |  |
| `living-entity` | [`set-absorption`](#operation-living-entity-set-absorption) |  |
| `living-entity` | [`set-age`](#operation-living-entity-set-age) |  |
| `living-entity` | [`set-attribute-base`](#operation-living-entity-set-attribute-base) |  |
| `living-entity` | [`set-equipment`](#operation-living-entity-set-equipment) |  |
| `living-entity` | [`set-health`](#operation-living-entity-set-health) |  |
| `living-entity` | [`set-max-health`](#operation-living-entity-set-max-health) |  |
| `mob` | [`add-ai-goal`](#operation-mob-add-ai-goal) |  |
| `mob` | [`add-custom-ai-goal`](#operation-mob-add-custom-ai-goal) |  |
| `mob` | [`as-entity`](#operation-mob-as-entity) | Converts back to the base entity handle. |
| `mob` | [`as-living`](#operation-mob-as-living) | Converts to the living-entity handle. |
| `mob` | [`can-reach`](#operation-mob-can-reach) |  |
| `mob` | [`clear-ai-goals`](#operation-mob-clear-ai-goals) |  |
| `mob` | [`get-freeze-ticks`](#operation-mob-get-freeze-ticks) | Returns the number of freeze ticks currently on this entity. |
| `mob` | [`get-mob-data`](#operation-mob-get-mob-data) | Returns the specialized mob-specific data for this mob. |
| `mob` | [`get-pathfinding-malus`](#operation-mob-get-pathfinding-malus) |  |
| `mob` | [`get-target`](#operation-mob-get-target) |  |
| `mob` | [`has-reached-destination`](#operation-mob-has-reached-destination) |  |
| `mob` | [`is-ai-disabled`](#operation-mob-is-ai-disabled) |  |
| `mob` | [`is-navigating`](#operation-mob-is-navigating) |  |
| `mob` | [`look-at`](#operation-mob-look-at) |  |
| `mob` | [`look-at-entity`](#operation-mob-look-at-entity) |  |
| `mob` | [`navigate-to-entity`](#operation-mob-navigate-to-entity) |  |
| `mob` | [`navigate-to-pos`](#operation-mob-navigate-to-pos) |  |
| `mob` | [`set-ai-disabled`](#operation-mob-set-ai-disabled) |  |
| `mob` | [`set-freeze-ticks`](#operation-mob-set-freeze-ticks) | Sets the number of freeze ticks on this entity (0 to 140). |
| `mob` | [`set-mob-data`](#operation-mob-set-mob-data) | Sets the specialized mob-specific data for this mob. |
| `mob` | [`set-navigation-speed`](#operation-mob-set-navigation-speed) |  |
| `mob` | [`set-pathfinding-malus`](#operation-mob-set-pathfinding-malus) |  |
| `mob` | [`set-target`](#operation-mob-set-target) |  |
| `mob` | [`stop-navigation`](#operation-mob-stop-navigation) |  |
| `world` | [`block-state-to-info`](#operation-world-block-state-to-info) | Resolves a block state ID back to its block name and properties. |
| `world` | [`broadcast-system-message`](#operation-world-broadcast-system-message) | Broadcasts a system message to all players in this world. |
| `world` | [`create-explosion`](#operation-world-create-explosion) | Creates an explosion at the specified position. |
| `world` | [`get-all-block-names`](#operation-world-get-all-block-names) | Gets the names of all registered blocks. |
| `world` | [`get-all-blocks`](#operation-world-get-all-blocks) | Gets all registered blocks. |
| `world` | [`get-biome`](#operation-world-get-biome) | Returns the biome at the specified position. |
| `world` | [`get-block`](#operation-world-get-block) | Gets the block type at the specified position. |
| `world` | [`get-block-by-id`](#operation-world-get-block-by-id) | Gets a block type by its numerical block ID. |
| `world` | [`get-block-by-name`](#operation-world-get-block-by-name) | Gets a block type by its namespaced name (e.g., "minecraft:stone" or "stone"). |
| `world` | [`get-block-count`](#operation-world-get-block-count) | Gets the total number of registered block types. |
| `world` | [`get-block-entity`](#operation-world-get-block-entity) | Returns the block entity at the specified position, if any. |
| `world` | [`get-block-entity-nbt`](#operation-world-get-block-entity-nbt) | Returns the raw NBT bytes of the block entity at the given position, if any. |
| `world` | [`get-block-from-state`](#operation-world-get-block-from-state) | Gets the block type associated with a block state. |
| `world` | [`get-block-from-state-id`](#operation-world-get-block-from-state-id) | Gets the block type associated with a block state ID. |
| `world` | [`get-block-id`](#operation-world-get-block-id) | Gets the numerical block ID at the specified position. |
| `world` | [`get-block-light`](#operation-world-get-block-light) | Returns the block light level at the specified position. |
| `world` | [`get-block-properties`](#operation-world-get-block-properties) | Gets property key-value pairs for a numerical block state ID. |
| `world` | [`get-block-state`](#operation-world-get-block-state) | Gets detailed block state information at the specified position. |
| `world` | [`get-block-state-by-id`](#operation-world-get-block-state-by-id) | Gets the detailed block state for a numerical block state ID. |
| `world` | [`get-block-state-count`](#operation-world-get-block-state-count) | Gets the total number of registered block states. |
| `world` | [`get-block-state-id`](#operation-world-get-block-state-id) | Gets the block state ID at the specified position. |
| `world` | [`get-border`](#operation-world-get-border) | Gets the world border associated with this world (alias for get-world-border). |
| `world` | [`get-chunk`](#operation-world-get-chunk) | Gets the chunk at the specified chunk coordinates. |
| `world` | [`get-custom-data`](#operation-world-get-custom-data) | Returns a namespaced custom data value from this world, if set. |
| `world` | [`get-default-state-from-block`](#operation-world-get-default-state-from-block) | Gets the default block state for a block type. |
| `world` | [`get-default-state-from-block-id`](#operation-world-get-default-state-from-block-id) | Gets the default block state for a numerical block ID. |
| `world` | [`get-dimension`](#operation-world-get-dimension) | Returns the dimension type (e.g., \"minecraft:overworld\"). |
| `world` | [`get-entities`](#operation-world-get-entities) | Returns a list of all entities in this world. |
| `world` | [`get-game-rule`](#operation-world-get-game-rule) | Gets the value of a game rule in this world. |
| `world` | [`get-id`](#operation-world-get-id) | Returns the unique identifier of this world. |
| `world` | [`get-min-y`](#operation-world-get-min-y) | Returns the minimum Y coordinate (bottom of the world). |
| `world` | [`get-motion-blocking-height`](#operation-world-get-motion-blocking-height) | Gets the highest motion-blocking block Y coordinate. |
| `world` | [`get-name`](#operation-world-get-name) | Returns the name of this world (e.g. "world", "world_nether", "arena_1"). |
| `world` | [`get-scoreboard`](#operation-world-get-scoreboard) | Returns the scoreboard associated with this world. |
| `world` | [`get-sea-level`](#operation-world-get-sea-level) | Returns the sea level of this world. |
| `world` | [`get-sky-light`](#operation-world-get-sky-light) | Returns the sky light level at the specified position. |
| `world` | [`get-spawn-location`](#operation-world-get-spawn-location) | Returns the configured shared spawn location for this world. |
| `world` | [`get-state-ids-for-block-id`](#operation-world-get-state-ids-for-block-id) | Gets all valid state IDs for a numerical block ID. |
| `world` | [`get-states-for-block`](#operation-world-get-states-for-block) | Gets all valid block states for a block type. |
| `world` | [`get-states-for-block-id`](#operation-world-get-states-for-block-id) | Gets all valid block states for a numerical block ID. |
| `world` | [`get-time-of-day`](#operation-world-get-time-of-day) | Returns the current time of day in ticks. |
| `world` | [`get-top-block-y`](#operation-world-get-top-block-y) | Gets the highest non-air block Y coordinate at the specified X and Z. |
| `world` | [`get-world-age`](#operation-world-get-world-age) | Returns the total age of the world in ticks. |
| `world` | [`get-world-border`](#operation-world-get-world-border) | Gets the world border associated with this world. |
| `world` | [`has-custom-data`](#operation-world-has-custom-data) | Returns whether this world has a namespaced custom data value. |
| `world` | [`is-raining`](#operation-world-is-raining) | Returns whether it is currently raining or snowing. |
| `world` | [`is-thundering`](#operation-world-is-thundering) | Returns whether there is currently a thunderstorm. |
| `world` | [`play-custom-sound`](#operation-world-play-custom-sound) | Plays a custom resource pack sound identifier at the specified position for all players in the world. |
| `world` | [`play-sound`](#operation-world-play-sound) | Plays a sound at the specified position for all players in the world. |
| `world` | [`ray-trace-block`](#operation-world-ray-trace-block) | Performs a raycast from start position to end position to hit blocks, with optional fluid handling. |
| `world` | [`ray-trace-blocks`](#operation-world-ray-trace-blocks) | Performs a raycast from start position to end position to hit blocks. |
| `world` | [`ray-trace-entities`](#operation-world-ray-trace-entities) | Performs a raycast from start position to end position to find all entities hit along the ray. |
| `world` | [`ray-trace-entity`](#operation-world-ray-trace-entity) | Performs a raycast from start position to end position to find the closest entity hit. |
| `world` | [`remove-custom-data`](#operation-world-remove-custom-data) | Removes a namespaced custom data value from this world. |
| `world` | [`resolve-block-state`](#operation-world-resolve-block-state) | Resolves a block name and optional properties to a block state ID. |
| `world` | [`save`](#operation-world-save) | Saves all chunk data, block entities, and entities for this world to disk. |
| `world` | [`set-block`](#operation-world-set-block) | Sets the block at the specified position using its default state. |
| `world` | [`set-block-by-id`](#operation-world-set-block-by-id) | Sets the block at the specified position by numerical block ID using its default state. |
| `world` | [`set-block-by-name`](#operation-world-set-block-by-name) | Sets the block at the specified position by namespaced name using its default state. |
| `world` | [`set-block-entity-nbt`](#operation-world-set-block-entity-nbt) | Restores a block entity from raw NBT bytes at the given position. |
| `world` | [`set-block-light`](#operation-world-set-block-light) | Sets the block light level at the specified position. |
| `world` | [`set-block-state`](#operation-world-set-block-state) | Sets the block state at the specified position. |
| `world` | [`set-chunk-generator`](#operation-world-set-chunk-generator) | Sets a custom chunk generator for this world using a registered generator ID. |
| `world` | [`set-custom-data`](#operation-world-set-custom-data) | Sets a namespaced custom data value on this world. |
| `world` | [`set-game-rule`](#operation-world-set-game-rule) | Sets the value of a game rule in this world. |
| `world` | [`set-raining`](#operation-world-set-raining) | Sets whether it should be raining or snowing. |
| `world` | [`set-sky-light`](#operation-world-set-sky-light) | Sets the sky light level at the specified position. |
| `world` | [`set-thundering`](#operation-world-set-thundering) | Sets whether there should be a thunderstorm. |
| `world` | [`set-time-of-day`](#operation-world-set-time-of-day) | Sets the current time of day in ticks. |
| `world` | [`spawn-entity`](#operation-world-spawn-entity) | Spawns an entity of the specified type at the given position. |
| `world` | [`spawn-particle`](#operation-world-spawn-particle) | Spawns particles at the specified position. |
| `world` | [`strike-lightning`](#operation-world-strike-lightning) | Spawns a lightning bolt at the specified position. |
| `world-border` | [`contains`](#operation-world-border-contains) | Returns whether the specified coordinates are within the border. |
| `world-border` | [`contains-pos`](#operation-world-border-contains-pos) | Returns whether the specified position is within the border. |
| `world-border` | [`get-center`](#operation-world-border-get-center) | Gets the center position of the border. |
| `world-border` | [`get-center-x`](#operation-world-border-get-center-x) | Gets the center X coordinate of the border. |
| `world-border` | [`get-center-z`](#operation-world-border-get-center-z) | Gets the center Z coordinate of the border. |
| `world-border` | [`get-damage-amount`](#operation-world-border-get-damage-amount) | Gets the damage amount inflicted per block per second when outside the buffer. |
| `world-border` | [`get-damage-buffer`](#operation-world-border-get-damage-buffer) | Gets the safe damage buffer distance outside the border (in blocks). |
| `world-border` | [`get-diameter`](#operation-world-border-get-diameter) | Gets the current diameter of the border. |
| `world-border` | [`get-size`](#operation-world-border-get-size) | Gets the current diameter of the border (alias for get-diameter). |
| `world-border` | [`get-target-diameter`](#operation-world-border-get-target-diameter) | Gets the target diameter when lerping/transitioning. |
| `world-border` | [`get-target-speed`](#operation-world-border-get-target-speed) | Gets the target transition duration/speed in ticks. |
| `world-border` | [`get-warning-delay`](#operation-world-border-get-warning-delay) | Gets the time before a player hitting the border is warned (in seconds). |
| `world-border` | [`get-warning-distance`](#operation-world-border-get-warning-distance) | Gets the distance from the border where warning effects start (in blocks). |
| `world-border` | [`get-warning-time`](#operation-world-border-get-warning-time) | Gets the warning time (alias for get-warning-delay). |
| `world-border` | [`reset`](#operation-world-border-reset) | Resets the world border to vanilla default settings. |
| `world-border` | [`set-center`](#operation-world-border-set-center) | Sets the center coordinates of the border. |
| `world-border` | [`set-damage-amount`](#operation-world-border-set-damage-amount) | Sets the damage amount inflicted per block per second when outside the buffer. |
| `world-border` | [`set-damage-buffer`](#operation-world-border-set-damage-buffer) | Sets the safe damage buffer distance outside the border (in blocks). |
| `world-border` | [`set-diameter`](#operation-world-border-set-diameter) | Sets the diameter of the border, optionally with a speed (in ticks) for lerping. |
| `world-border` | [`set-size`](#operation-world-border-set-size) | Sets the size of the border instantly. |
| `world-border` | [`set-size-transition`](#operation-world-border-set-size-transition) | Sets the size of the border with a transition duration in seconds. |
| `world-border` | [`set-warning-delay`](#operation-world-border-set-warning-delay) | Sets the warning delay (in seconds). |
| `world-border` | [`set-warning-distance`](#operation-world-border-set-warning-distance) | Sets the warning distance (in blocks). |
| `world-border` | [`set-warning-time`](#operation-world-border-set-warning-time) | Sets the warning time (alias for set-warning-delay). |

## Type Details

### `equipment-slot` {#type-equipment-slot}

Equipment slots available on living entities (mobs, armor stands, players).

**Enum cases**

| Name |
| --- |
| `main-hand` |
| `off-hand` |
| `feet` |
| `legs` |
| `chest` |
| `head` |
| `body` |
| `saddle` |

### `piston-behavior` {#type-piston-behavior}

Defines how a block reacts when pushed by a piston.

**Enum cases**

| Name | Description |
| --- | --- |
| `normal` | Normal behavior; the block can be pushed and pulled. |
| `destroy` | The block is destroyed when pushed. |
| `block` | The block cannot be pushed or pulled. |
| `ignore` | The block is ignored by pistons. |
| `push-only` | The block can only be pushed, not pulled. |

### `builtin-ai-goal` {#type-builtin-ai-goal}

Predefined AI goals that can be added to mob entities.

**Variant cases**

| Name | WIT type |
| --- | --- |
| `swim` |  |
| `wander-around` | `f32` |
| `melee-attack` | `f32` |
| `look-at-player` | `f32` |
| `look-around` |  |
| `escape-danger` | `f32` |
| `avoid-entity` | `f32` |
| `blaze-attack` |  |
| `creeper-ignite` |  |
| `eat-grass` |  |
| `zombie-attack` | `f32` |

### `path-node-type` {#type-path-node-type}

Node and terrain classification types evaluated during mob pathfinding.

**Enum cases**

| Name |
| --- |
| `blocked` |
| `open` |
| `walkable` |
| `walkable-door` |
| `trapdoor` |
| `powder-snow` |
| `danger-powder-snow` |
| `fence` |
| `lava` |
| `water` |
| `water-border` |
| `rail` |
| `unpassable-rail` |
| `danger-fire` |
| `damage-fire` |
| `danger-other` |
| `damage-other` |
| `door-open` |
| `door-wood-closed` |
| `door-iron-closed` |
| `breach` |
| `leaves` |
| `sticky-honey` |
| `cocoa` |
| `damage-cautious` |
| `danger-trapdoor` |

### `dye-color` {#type-dye-color}

Minecraft 16 dye colors.

**Enum cases**

| Name |
| --- |
| `white` |
| `orange` |
| `magenta` |
| `light-blue` |
| `yellow` |
| `lime` |
| `pink` |
| `gray` |
| `light-gray` |
| `cyan` |
| `purple` |
| `blue` |
| `brown` |
| `green` |
| `red` |
| `black` |

### `villager-profession` {#type-villager-profession}

Villager profession identifiers.

**Enum cases**

| Name |
| --- |
| `none` |
| `armorer` |
| `butcher` |
| `cartographer` |
| `cleric` |
| `farmer` |
| `fisherman` |
| `fletcher` |
| `leatherworker` |
| `librarian` |
| `mason` |
| `nitwit` |
| `shepherd` |
| `toolsmith` |
| `weaponsmith` |

### `sheep-data` {#type-sheep-data}

Specialized data for sheep entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `color` | `dye-color` |
| `is-sheared` | `bool` |

### `wolf-data` {#type-wolf-data}

Specialized data for wolf entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-tamed` | `bool` |
| `owner` | `option<uuid>` |
| `is-sitting` | `bool` |
| `collar-color` | `dye-color` |
| `is-angry` | `bool` |
| `is-begging` | `bool` |

### `cat-data` {#type-cat-data}

Specialized data for cat entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-tamed` | `bool` |
| `owner` | `option<uuid>` |
| `is-sitting` | `bool` |
| `collar-color` | `dye-color` |

### `villager-data` {#type-villager-data}

Specialized data for villager entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `profession` | `villager-profession` |
| `level` | `u8` |
| `experience` | `u32` |

### `creeper-data` {#type-creeper-data}

Specialized data for creeper entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-powered` | `bool` |
| `fuse` | `s32` |
| `is-ignited` | `bool` |
| `explosion-radius` | `u8` |

### `slime-data` {#type-slime-data}

Specialized data for slime and magma cube entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `size` | `s32` |

### `enderman-data` {#type-enderman-data}

Specialized data for enderman entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `carried-block-state` | `option<u16>` |
| `is-screaming` | `bool` |
| `is-staring` | `bool` |

### `iron-golem-data` {#type-iron-golem-data}

Specialized data for iron golem entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-player-created` | `bool` |

### `fox-data` {#type-fox-data}

Specialized data for fox entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-sitting` | `bool` |
| `is-sleeping` | `bool` |
| `is-crouching` | `bool` |

### `ageable-data` {#type-ageable-data}

Specialized data for ageable animal mobs.

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-baby` | `bool` |
| `age` | `s32` |
| `in-love-ticks` | `s32` |

### `zombie-data` {#type-zombie-data}

Specialized data for zombie entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-baby` | `bool` |
| `can-break-doors` | `bool` |

### `shulker-data` {#type-shulker-data}

Specialized data for shulker entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `attached-face` | `block-direction` |
| `peek-amount` | `u8` |
| `color` | `option<dye-color>` |

### `mob-data` {#type-mob-data}

Tagged variant holding specialized data for specific mob types.

**Variant cases**

| Name | WIT type |
| --- | --- |
| `sheep` | `sheep-data` |
| `wolf` | `wolf-data` |
| `cat` | `cat-data` |
| `villager` | `villager-data` |
| `creeper` | `creeper-data` |
| `slime` | `slime-data` |
| `enderman` | `enderman-data` |
| `iron-golem` | `iron-golem-data` |
| `fox` | `fox-data` |
| `ageable` | `ageable-data` |
| `zombie` | `zombie-data` |
| `shulker` | `shulker-data` |
| `generic` |  |

### `explosion-interaction` {#type-explosion-interaction}

Defines how an explosion interacts with blocks in the world.

**Enum cases**

| Name | Description |
| --- | --- |
| `none` | No interaction with blocks. |
| `block` | Blocks are destroyed and may drop loot. |
| `mob` | Interaction typical for mob-caused explosions. |
| `tnt` | Interaction typical for TNT explosions. |
| `trigger` | Triggers specific block behaviors. |

### `block-flags` {#type-block-flags}

Flags used to control block updates and notifications.

**Flags cases**

| Name | Description |
| --- | --- |
| `notify-neighbors` | Notifies neighbor blocks of the change. |
| `notify-listeners` | Notifies client listeners of the change. |
| `force-state` | Forces the block state even if it's the same. |
| `skip-drops` | Skips dropping items when the block is removed. |
| `moved` | Indicates the block was moved (e.g., by a piston). |
| `skip-redstone-wire-state-replacement` | Skips state replacement for redstone wires. |
| `skip-block-entity-replaced-callback` | Skips the callback when a block entity is replaced. |
| `skip-block-added-callback` | Skips the callback when a block is added. |

### `flammable` {#type-flammable}

Flammability properties of a block.

**Record fields**

| Name | WIT type |
| --- | --- |
| `spread-chance` | `u8` |
| `burn-chance` | `u8` |

### `block-state` {#type-block-state}

Detailed information about a block's state.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `id` | `u16` | The internal numerical ID of the block state. |
| `block-id` | `u16` | The numerical ID of the parent block type. |
| `block-name` | `string` | The namespaced identifier of the parent block type. |
| `luminance` | `u8` | The light level emitted by this block (0-15). |
| `opacity` | `u8` | How much light this block blocks. |
| `hardness` | `f32` | The hardness of the block, determining mining speed. |
| `is-air` | `bool` | Whether this block is considered air. |
| `is-liquid` | `bool` | Whether this block is a liquid. |
| `is-solid` | `bool` | Whether this block is a solid. |
| `is-full-cube` | `bool` | Whether this block occupies a full cube. |
| `piston-behavior` | `piston-behavior` | How this block behaves when pushed by a piston. |
| `has-random-ticks` | `bool` | Whether this block receives random ticks. |
| `burnable` | `bool` | Whether this block can catch fire. |
| `tool-required` | `bool` | Whether a specific tool is required to mine this block and get drops. |
| `sided-transparency` | `bool` | Whether this block has transparency on its sides. |
| `replaceable` | `bool` | Whether this block can be replaced by another block (e.g., grass). |
| `is-solid-block` | `bool` | Whether this block is considered a solid block for redstone purposes. |
| `block-entity-type` | `u16` | The numerical ID of the block entity type, if any. |
| `instrument` | `noteblock-instrument` | The instrument used for note blocks when placed on top of this block. |
| `collision-shapes` | `list<bounding-box>` | The collision shapes of this block. |
| `outline-shapes` | `list<bounding-box>` | The outline shapes of this block. |
| `down-side-solid` | `bool` | Whether the bottom side of the block is solid. |
| `up-side-solid` | `bool` | Whether the top side of the block is solid. |
| `north-side-solid` | `bool` | Whether the north side of the block is solid. |
| `south-side-solid` | `bool` | Whether the south side of the block is solid. |
| `west-side-solid` | `bool` | Whether the west side of the block is solid. |
| `east-side-solid` | `bool` | Whether the east side of the block is solid. |
| `down-center-solid` | `bool` | Whether the center of the bottom side is solid. |
| `up-center-solid` | `bool` | Whether the center of the top side is solid. |
| `map-color` | `u8` | The color of this block when displayed on a map. |
| `properties` | `list<tuple<string, string>>` | The block state's property key-value pairs (e.g. facing=north). |

### `noteblock-instrument` {#type-noteblock-instrument}

Musical instruments used by note blocks.

**Enum cases**

| Name |
| --- |
| `harp` |
| `basedrum` |
| `snare` |
| `hat` |
| `bass` |
| `flute` |
| `bell` |
| `guitar` |
| `chime` |
| `xylophone` |
| `iron-xylophone` |
| `cow-bell` |
| `didgeridoo` |
| `bit` |
| `banjo` |
| `pling` |
| `trumpet` |
| `trumpet-exposed` |
| `trumpet-oxidized` |
| `trumpet-weathered` |
| `zombie` |
| `skeleton` |
| `creeper` |
| `dragon` |
| `wither-skeleton` |
| `piglin` |
| `custom-head` |

### `block` {#type-block}

Static definition of a Minecraft block type.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `id` | `u16` | The internal numerical ID of the block type. |
| `name` | `string` | The unique namespaced ID (e.g., "minecraft:stone"). |
| `hardness` | `f32` | How hard the block is to break (-1.0 for unbreakable blocks). |
| `blast-resistance` | `f32` | Resistance to explosions. |
| `map-color` | `u8` | The color of this block when displayed on a map. |
| `slipperiness` | `f32` | The friction coefficient (0.6 default, 0.98 for ice). |
| `velocity-multiplier` | `f32` | How much this block affects entity walk speed. |
| `jump-velocity-multiplier` | `f32` | How much this block affects entity jump height. |
| `item-id` | `u16` | The item ID associated with this block in inventory/drops. |
| `default-state-id` | `u16` | The default block state ID when placed without extra properties. |
| `state-ids` | `list<u16>` | All valid state IDs belonging to this block type. |
| `is-solid` | `bool` | Whether this block is solid by default. |
| `is-air` | `bool` | Whether this block is considered air. |
| `is-flammable` | `bool` | Whether this block is flammable. |
| `flammable` | `option<flammable>` | Flammability details if flammable. |

### `block-state-id` {#type-block-state-id}

A simple wrapper for a block state ID.

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `u16` |

### `entity` {#type-entity}

Methods: [`get-id`](#operation-entity-get-id), [`get-uuid`](#operation-entity-get-uuid), [`get-type`](#operation-entity-get-type), [`get-position`](#operation-entity-get-position), [`get-world`](#operation-entity-get-world), [`get-yaw`](#operation-entity-get-yaw), [`get-pitch`](#operation-entity-get-pitch), [`get-head-yaw`](#operation-entity-get-head-yaw), [`teleport`](#operation-entity-teleport), [`set-velocity`](#operation-entity-set-velocity), [`get-velocity`](#operation-entity-get-velocity), [`get-pose`](#operation-entity-get-pose), [`get-name`](#operation-entity-get-name), [`set-custom-name`](#operation-entity-set-custom-name), [`get-custom-name`](#operation-entity-get-custom-name), [`set-custom-name-visible`](#operation-entity-set-custom-name-visible), [`is-custom-name-visible`](#operation-entity-is-custom-name-visible), [`is-invulnerable`](#operation-entity-is-invulnerable), [`set-invulnerable`](#operation-entity-set-invulnerable), [`get-fire-ticks`](#operation-entity-get-fire-ticks), [`set-fire-ticks`](#operation-entity-set-fire-ticks), [`get-fall-distance`](#operation-entity-get-fall-distance), [`set-fall-distance`](#operation-entity-set-fall-distance), [`get-ticks-lived`](#operation-entity-get-ticks-lived), [`set-ticks-lived`](#operation-entity-set-ticks-lived), [`is-sneaking`](#operation-entity-is-sneaking), [`set-sneaking`](#operation-entity-set-sneaking), [`is-sprinting`](#operation-entity-is-sprinting), [`set-sprinting`](#operation-entity-set-sprinting), [`is-swimming`](#operation-entity-is-swimming), [`set-swimming`](#operation-entity-set-swimming), [`is-invisible`](#operation-entity-is-invisible), [`set-invisible`](#operation-entity-set-invisible), [`is-glowing`](#operation-entity-is-glowing), [`set-glowing`](#operation-entity-set-glowing), [`is-fall-flying`](#operation-entity-is-fall-flying), [`set-fall-flying`](#operation-entity-set-fall-flying), [`is-silent`](#operation-entity-is-silent), [`set-silent`](#operation-entity-set-silent), [`has-gravity`](#operation-entity-has-gravity), [`set-has-gravity`](#operation-entity-set-has-gravity), [`get-width`](#operation-entity-get-width), [`get-height`](#operation-entity-get-height), [`set-rotation`](#operation-entity-set-rotation), [`is-on-ground`](#operation-entity-is-on-ground), [`is-on-fire`](#operation-entity-is-on-fire), [`set-on-fire`](#operation-entity-set-on-fire), [`has-visual-fire`](#operation-entity-has-visual-fire), [`set-visual-fire`](#operation-entity-set-visual-fire), [`get-portal-cooldown`](#operation-entity-get-portal-cooldown), [`set-portal-cooldown`](#operation-entity-set-portal-cooldown), [`get-remaining-air`](#operation-entity-get-remaining-air), [`set-remaining-air`](#operation-entity-set-remaining-air), [`get-max-air`](#operation-entity-get-max-air), [`get-eye-height`](#operation-entity-get-eye-height), [`get-eye-position`](#operation-entity-get-eye-position), [`get-nearby-entities`](#operation-entity-get-nearby-entities), [`get-vehicle`](#operation-entity-get-vehicle), [`set-vehicle`](#operation-entity-set-vehicle), [`get-passengers`](#operation-entity-get-passengers), [`add-passenger`](#operation-entity-add-passenger), [`remove-passenger`](#operation-entity-remove-passenger), [`eject-passengers`](#operation-entity-eject-passengers), [`get-bounding-box`](#operation-entity-get-bounding-box), [`is-in-water`](#operation-entity-is-in-water), [`is-in-lava`](#operation-entity-is-in-lava), [`remove`](#operation-entity-remove), [`raycast`](#operation-entity-raycast), [`ray-trace-block`](#operation-entity-ray-trace-block), [`ray-trace-entity`](#operation-entity-ray-trace-entity), [`get-target-entity`](#operation-entity-get-target-entity), [`set-custom-data`](#operation-entity-set-custom-data), [`get-custom-data`](#operation-entity-get-custom-data), [`remove-custom-data`](#operation-entity-remove-custom-data), [`has-custom-data`](#operation-entity-has-custom-data), [`as-living`](#operation-entity-as-living), [`as-mob`](#operation-entity-as-mob), [`is-living`](#operation-entity-is-living), [`is-mob`](#operation-entity-is-mob).

### `living-entity` {#type-living-entity}

Represents a living entity with health, combat stats, attributes, and equipment (mobs, players, armor stands).

Methods: [`as-entity`](#operation-living-entity-as-entity), [`as-mob`](#operation-living-entity-as-mob), [`is-mob`](#operation-living-entity-is-mob), [`get-health`](#operation-living-entity-get-health), [`set-health`](#operation-living-entity-set-health), [`get-max-health`](#operation-living-entity-get-max-health), [`set-max-health`](#operation-living-entity-set-max-health), [`damage`](#operation-living-entity-damage), [`is-dead`](#operation-living-entity-is-dead), [`get-absorption`](#operation-living-entity-get-absorption), [`set-absorption`](#operation-living-entity-set-absorption), [`get-attribute-value`](#operation-living-entity-get-attribute-value), [`get-attribute-base`](#operation-living-entity-get-attribute-base), [`set-attribute-base`](#operation-living-entity-set-attribute-base), [`add-attribute-modifier`](#operation-living-entity-add-attribute-modifier), [`remove-attribute-modifier`](#operation-living-entity-remove-attribute-modifier), [`get-attribute-modifiers`](#operation-living-entity-get-attribute-modifiers), [`reset-attribute`](#operation-living-entity-reset-attribute), [`reset-all-attributes`](#operation-living-entity-reset-all-attributes), [`get-equipment`](#operation-living-entity-get-equipment), [`set-equipment`](#operation-living-entity-set-equipment), [`clear-equipment`](#operation-living-entity-clear-equipment), [`get-age`](#operation-living-entity-get-age), [`set-age`](#operation-living-entity-set-age), [`send-system-message`](#operation-living-entity-send-system-message).

### `mob` {#type-mob}

Represents an AI-driven mob entity with goals, targeting, and pathfinding navigation (e.g. zombies, villagers).

Methods: [`as-entity`](#operation-mob-as-entity), [`as-living`](#operation-mob-as-living), [`add-ai-goal`](#operation-mob-add-ai-goal), [`add-custom-ai-goal`](#operation-mob-add-custom-ai-goal), [`clear-ai-goals`](#operation-mob-clear-ai-goals), [`set-ai-disabled`](#operation-mob-set-ai-disabled), [`is-ai-disabled`](#operation-mob-is-ai-disabled), [`set-target`](#operation-mob-set-target), [`get-target`](#operation-mob-get-target), [`navigate-to-pos`](#operation-mob-navigate-to-pos), [`navigate-to-entity`](#operation-mob-navigate-to-entity), [`stop-navigation`](#operation-mob-stop-navigation), [`is-navigating`](#operation-mob-is-navigating), [`has-reached-destination`](#operation-mob-has-reached-destination), [`set-navigation-speed`](#operation-mob-set-navigation-speed), [`can-reach`](#operation-mob-can-reach), [`set-pathfinding-malus`](#operation-mob-set-pathfinding-malus), [`get-pathfinding-malus`](#operation-mob-get-pathfinding-malus), [`look-at`](#operation-mob-look-at), [`look-at-entity`](#operation-mob-look-at-entity), [`get-mob-data`](#operation-mob-get-mob-data), [`set-mob-data`](#operation-mob-set-mob-data), [`set-freeze-ticks`](#operation-mob-set-freeze-ticks), [`get-freeze-ticks`](#operation-mob-get-freeze-ticks).

### `raycast-result` {#type-raycast-result}

Result of a raycast operation.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `pos` | `block-pos` | The block position that was hit. |
| `face` | `block-direction` | The face of the block that was hit. |

### `ray-trace-block-result` {#type-ray-trace-block-result}

Detailed result of a block ray-trace operation.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `pos` | `block-pos` | The block position that was hit. |
| `face` | `block-direction` | The face of the block that was hit. |
| `hit-pos` | `position` | The exact hit coordinates in world space. |

### `ray-trace-entity-result` {#type-ray-trace-entity-result}

Result of an entity ray-trace operation.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `entity` | `entity` | The entity that was hit. |
| `hit-pos` | `position` | The exact hit coordinates in world space. |
| `distance` | `f64` | The distance from the ray start to the hit position. |

### `chunk` {#type-chunk}

Methods: [`get-x`](#operation-chunk-get-x), [`get-z`](#operation-chunk-get-z), [`get-block-state-id`](#operation-chunk-get-block-state-id), [`get-block-state`](#operation-chunk-get-block-state), [`set-block-state`](#operation-chunk-set-block-state), [`get-block`](#operation-chunk-get-block), [`set-block`](#operation-chunk-set-block), [`set-block-by-id`](#operation-chunk-set-block-by-id), [`get-biome`](#operation-chunk-get-biome), [`get-block-entity`](#operation-chunk-get-block-entity), [`get-top-block-y`](#operation-chunk-get-top-block-y), [`get-sky-light`](#operation-chunk-get-sky-light), [`get-block-light`](#operation-chunk-get-block-light), [`set-custom-data`](#operation-chunk-set-custom-data), [`get-custom-data`](#operation-chunk-get-custom-data), [`remove-custom-data`](#operation-chunk-remove-custom-data), [`has-custom-data`](#operation-chunk-has-custom-data).

### `world-border` {#type-world-border}

Represents the boundaries of a world.

Methods: [`get-center-x`](#operation-world-border-get-center-x), [`get-center-z`](#operation-world-border-get-center-z), [`get-center`](#operation-world-border-get-center), [`set-center`](#operation-world-border-set-center), [`get-diameter`](#operation-world-border-get-diameter), [`get-size`](#operation-world-border-get-size), [`set-diameter`](#operation-world-border-set-diameter), [`set-size`](#operation-world-border-set-size), [`set-size-transition`](#operation-world-border-set-size-transition), [`get-target-diameter`](#operation-world-border-get-target-diameter), [`get-target-speed`](#operation-world-border-get-target-speed), [`get-warning-distance`](#operation-world-border-get-warning-distance), [`set-warning-distance`](#operation-world-border-set-warning-distance), [`get-warning-delay`](#operation-world-border-get-warning-delay), [`set-warning-delay`](#operation-world-border-set-warning-delay), [`get-warning-time`](#operation-world-border-get-warning-time), [`set-warning-time`](#operation-world-border-set-warning-time), [`get-damage-buffer`](#operation-world-border-get-damage-buffer), [`set-damage-buffer`](#operation-world-border-set-damage-buffer), [`get-damage-amount`](#operation-world-border-get-damage-amount), [`set-damage-amount`](#operation-world-border-set-damage-amount), [`contains`](#operation-world-border-contains), [`contains-pos`](#operation-world-border-contains-pos), [`reset`](#operation-world-border-reset).

### `bounding-box` {#type-bounding-box}

Represents an axis-aligned bounding box.

**Record fields**

| Name | WIT type |
| --- | --- |
| `min` | `position` |
| `max` | `position` |

### `world-spawn-location` {#type-world-spawn-location}

Represents the configured shared spawn location for a world.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `pos` | `block-pos` | The block position of the shared world spawn. |
| `yaw` | `f32` | The yaw players should face when spawning here. |
| `pitch` | `f32` | The pitch players should use when spawning here. |

### `block-direction` {#type-block-direction}

Represents a cardinal direction or block face.

**Enum cases**

| Name |
| --- |
| `down` |
| `up` |
| `north` |
| `south` |
| `west` |
| `east` |

### `world` {#type-world}

Represents a Minecraft world (dimension).

Methods: [`get-id`](#operation-world-get-id), [`get-border`](#operation-world-get-border), [`get-world-border`](#operation-world-get-world-border), [`get-chunk`](#operation-world-get-chunk), [`get-block-state-id`](#operation-world-get-block-state-id), [`get-block-state`](#operation-world-get-block-state), [`set-block-state`](#operation-world-set-block-state), [`get-block`](#operation-world-get-block), [`get-block-id`](#operation-world-get-block-id), [`set-block`](#operation-world-set-block), [`set-block-by-id`](#operation-world-set-block-by-id), [`set-block-by-name`](#operation-world-set-block-by-name), [`get-time-of-day`](#operation-world-get-time-of-day), [`set-time-of-day`](#operation-world-set-time-of-day), [`get-world-age`](#operation-world-get-world-age), [`get-dimension`](#operation-world-get-dimension), [`get-spawn-location`](#operation-world-get-spawn-location), [`get-top-block-y`](#operation-world-get-top-block-y), [`get-motion-blocking-height`](#operation-world-get-motion-blocking-height), [`is-raining`](#operation-world-is-raining), [`set-raining`](#operation-world-set-raining), [`is-thundering`](#operation-world-is-thundering), [`set-thundering`](#operation-world-set-thundering), [`broadcast-system-message`](#operation-world-broadcast-system-message), [`get-scoreboard`](#operation-world-get-scoreboard), [`play-sound`](#operation-world-play-sound), [`play-custom-sound`](#operation-world-play-custom-sound), [`spawn-particle`](#operation-world-spawn-particle), [`create-explosion`](#operation-world-create-explosion), [`get-sea-level`](#operation-world-get-sea-level), [`get-min-y`](#operation-world-get-min-y), [`get-sky-light`](#operation-world-get-sky-light), [`set-sky-light`](#operation-world-set-sky-light), [`get-block-light`](#operation-world-get-block-light), [`set-block-light`](#operation-world-set-block-light), [`get-biome`](#operation-world-get-biome), [`spawn-entity`](#operation-world-spawn-entity), [`get-entities`](#operation-world-get-entities), [`strike-lightning`](#operation-world-strike-lightning), [`ray-trace-blocks`](#operation-world-ray-trace-blocks), [`ray-trace-block`](#operation-world-ray-trace-block), [`ray-trace-entity`](#operation-world-ray-trace-entity), [`ray-trace-entities`](#operation-world-ray-trace-entities), [`get-block-entity`](#operation-world-get-block-entity), [`get-block-entity-nbt`](#operation-world-get-block-entity-nbt), [`set-block-entity-nbt`](#operation-world-set-block-entity-nbt), [`get-name`](#operation-world-get-name), [`save`](#operation-world-save), [`set-chunk-generator`](#operation-world-set-chunk-generator), [`set-custom-data`](#operation-world-set-custom-data), [`get-custom-data`](#operation-world-get-custom-data), [`remove-custom-data`](#operation-world-remove-custom-data), [`has-custom-data`](#operation-world-has-custom-data), [`get-game-rule`](#operation-world-get-game-rule), [`set-game-rule`](#operation-world-set-game-rule), [`resolve-block-state`](#operation-world-resolve-block-state), [`block-state-to-info`](#operation-world-block-state-to-info), [`get-block-by-id`](#operation-world-get-block-by-id), [`get-block-by-name`](#operation-world-get-block-by-name), [`get-all-blocks`](#operation-world-get-all-blocks), [`get-all-block-names`](#operation-world-get-all-block-names), [`get-block-count`](#operation-world-get-block-count), [`get-block-state-count`](#operation-world-get-block-state-count), [`get-states-for-block`](#operation-world-get-states-for-block), [`get-states-for-block-id`](#operation-world-get-states-for-block-id), [`get-state-ids-for-block-id`](#operation-world-get-state-ids-for-block-id), [`get-block-properties`](#operation-world-get-block-properties), [`get-block-from-state-id`](#operation-world-get-block-from-state-id), [`get-block-from-state`](#operation-world-get-block-from-state), [`get-default-state-from-block`](#operation-world-get-default-state-from-block), [`get-default-state-from-block-id`](#operation-world-get-default-state-from-block-id), [`get-block-state-by-id`](#operation-world-get-block-state-by-id).

### `generation-phase` {#type-generation-phase}

Generation phase for custom chunk generation.

**Enum cases**

| Name |
| --- |
| `biomes` |
| `noise` |
| `surface` |
| `features` |

### `chunk-buffer` {#type-chunk-buffer}

Mutable chunk buffer representing a 16x16 column during custom world generation.

Methods: [`get-x`](#operation-chunk-buffer-get-x), [`get-z`](#operation-chunk-buffer-get-z), [`get-min-y`](#operation-chunk-buffer-get-min-y), [`get-height`](#operation-chunk-buffer-get-height), [`set-block-state-id`](#operation-chunk-buffer-set-block-state-id), [`get-block-state-id`](#operation-chunk-buffer-get-block-state-id), [`fill-layer`](#operation-chunk-buffer-fill-layer), [`fill-range`](#operation-chunk-buffer-fill-range), [`fill-cuboid`](#operation-chunk-buffer-fill-cuboid), [`set-biome`](#operation-chunk-buffer-set-biome), [`fill-biome`](#operation-chunk-buffer-fill-biome).

### `block-state-info` {#type-block-state-info}

A block's registry name and its property key-value pairs for a state ID.

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `properties` | `list<tuple<string, string>>` |

## Operation Details

### `entity.get-id` {#operation-entity-get-id}

```text
get-id: func() -> u32;
```

**Returns:** `u32`

### `entity.get-uuid` {#operation-entity-get-uuid}

```text
get-uuid: func() -> uuid;
```

**Returns:** `uuid`

### `entity.get-type` {#operation-entity-get-type}

```text
get-type: func() -> entity-type;
```

**Returns:** `entity-type`

### `entity.get-position` {#operation-entity-get-position}

```text
get-position: func() -> position;
```

**Returns:** `position`

### `entity.get-world` {#operation-entity-get-world}

```text
get-world: func() -> %world;
```

**Returns:** `%world`

### `entity.get-yaw` {#operation-entity-get-yaw}

```text
get-yaw: func() -> f32;
```

**Returns:** `f32`

### `entity.get-pitch` {#operation-entity-get-pitch}

```text
get-pitch: func() -> f32;
```

**Returns:** `f32`

### `entity.get-head-yaw` {#operation-entity-get-head-yaw}

```text
get-head-yaw: func() -> f32;
```

**Returns:** `f32`

### `entity.teleport` {#operation-entity-teleport}

```text
teleport: func(pos: position, world-ref: %world);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |
| `world-ref` | `%world` |

### `entity.set-velocity` {#operation-entity-set-velocity}

```text
set-velocity: func(velocity: position);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `velocity` | `position` |

### `entity.get-velocity` {#operation-entity-get-velocity}

```text
get-velocity: func() -> position;
```

**Returns:** `position`

### `entity.get-pose` {#operation-entity-get-pose}

```text
get-pose: func() -> entity-pose;
```

**Returns:** `entity-pose`

### `entity.get-name` {#operation-entity-get-name}

```text
get-name: func() -> text-component;
```

**Returns:** `text-component`

### `entity.set-custom-name` {#operation-entity-set-custom-name}

```text
set-custom-name: func(name: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `text-component` |

### `entity.get-custom-name` {#operation-entity-get-custom-name}

```text
get-custom-name: func() -> option<text-component>;
```

**Returns:** `option<text-component>`

### `entity.set-custom-name-visible` {#operation-entity-set-custom-name-visible}

```text
set-custom-name-visible: func(visible: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `visible` | `bool` |

### `entity.is-custom-name-visible` {#operation-entity-is-custom-name-visible}

```text
is-custom-name-visible: func() -> bool;
```

**Returns:** `bool`

### `entity.is-invulnerable` {#operation-entity-is-invulnerable}

```text
is-invulnerable: func() -> bool;
```

**Returns:** `bool`

### `entity.set-invulnerable` {#operation-entity-set-invulnerable}

```text
set-invulnerable: func(invulnerable: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `invulnerable` | `bool` |

### `entity.get-fire-ticks` {#operation-entity-get-fire-ticks}

```text
get-fire-ticks: func() -> s32;
```

**Returns:** `s32`

### `entity.set-fire-ticks` {#operation-entity-set-fire-ticks}

```text
set-fire-ticks: func(ticks: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `ticks` | `s32` |

### `entity.get-fall-distance` {#operation-entity-get-fall-distance}

```text
get-fall-distance: func() -> f32;
```

**Returns:** `f32`

### `entity.set-fall-distance` {#operation-entity-set-fall-distance}

```text
set-fall-distance: func(distance: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `distance` | `f32` |

### `entity.get-ticks-lived` {#operation-entity-get-ticks-lived}

```text
get-ticks-lived: func() -> s32;
```

**Returns:** `s32`

### `entity.set-ticks-lived` {#operation-entity-set-ticks-lived}

```text
set-ticks-lived: func(ticks: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `ticks` | `s32` |

### `entity.is-sneaking` {#operation-entity-is-sneaking}

```text
is-sneaking: func() -> bool;
```

**Returns:** `bool`

### `entity.set-sneaking` {#operation-entity-set-sneaking}

```text
set-sneaking: func(sneaking: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `sneaking` | `bool` |

### `entity.is-sprinting` {#operation-entity-is-sprinting}

```text
is-sprinting: func() -> bool;
```

**Returns:** `bool`

### `entity.set-sprinting` {#operation-entity-set-sprinting}

```text
set-sprinting: func(sprinting: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `sprinting` | `bool` |

### `entity.is-swimming` {#operation-entity-is-swimming}

```text
is-swimming: func() -> bool;
```

**Returns:** `bool`

### `entity.set-swimming` {#operation-entity-set-swimming}

```text
set-swimming: func(swimming: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `swimming` | `bool` |

### `entity.is-invisible` {#operation-entity-is-invisible}

```text
is-invisible: func() -> bool;
```

**Returns:** `bool`

### `entity.set-invisible` {#operation-entity-set-invisible}

```text
set-invisible: func(invisible: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `invisible` | `bool` |

### `entity.is-glowing` {#operation-entity-is-glowing}

```text
is-glowing: func() -> bool;
```

**Returns:** `bool`

### `entity.set-glowing` {#operation-entity-set-glowing}

```text
set-glowing: func(glowing: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `glowing` | `bool` |

### `entity.is-fall-flying` {#operation-entity-is-fall-flying}

```text
is-fall-flying: func() -> bool;
```

**Returns:** `bool`

### `entity.set-fall-flying` {#operation-entity-set-fall-flying}

```text
set-fall-flying: func(fall-flying: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `fall-flying` | `bool` |

### `entity.is-silent` {#operation-entity-is-silent}

```text
is-silent: func() -> bool;
```

**Returns:** `bool`

### `entity.set-silent` {#operation-entity-set-silent}

```text
set-silent: func(silent: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `silent` | `bool` |

### `entity.has-gravity` {#operation-entity-has-gravity}

```text
has-gravity: func() -> bool;
```

**Returns:** `bool`

### `entity.set-has-gravity` {#operation-entity-set-has-gravity}

```text
set-has-gravity: func(gravity: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `gravity` | `bool` |

### `entity.get-width` {#operation-entity-get-width}

```text
get-width: func() -> f32;
```

**Returns:** `f32`

### `entity.get-height` {#operation-entity-get-height}

```text
get-height: func() -> f32;
```

**Returns:** `f32`

### `entity.set-rotation` {#operation-entity-set-rotation}

```text
set-rotation: func(yaw: f32, pitch: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `yaw` | `f32` |
| `pitch` | `f32` |

### `entity.is-on-ground` {#operation-entity-is-on-ground}

```text
is-on-ground: func() -> bool;
```

**Returns:** `bool`

### `entity.is-on-fire` {#operation-entity-is-on-fire}

```text
is-on-fire: func() -> bool;
```

**Returns:** `bool`

### `entity.set-on-fire` {#operation-entity-set-on-fire}

```text
set-on-fire: func(on-fire: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `on-fire` | `bool` |

### `entity.has-visual-fire` {#operation-entity-has-visual-fire}

```text
has-visual-fire: func() -> bool;
```

**Returns:** `bool`

### `entity.set-visual-fire` {#operation-entity-set-visual-fire}

```text
set-visual-fire: func(visual-fire: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `visual-fire` | `bool` |

### `entity.get-portal-cooldown` {#operation-entity-get-portal-cooldown}

```text
get-portal-cooldown: func() -> u32;
```

**Returns:** `u32`

### `entity.set-portal-cooldown` {#operation-entity-set-portal-cooldown}

```text
set-portal-cooldown: func(cooldown: u32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `cooldown` | `u32` |

### `entity.get-remaining-air` {#operation-entity-get-remaining-air}

```text
get-remaining-air: func() -> s32;
```

**Returns:** `s32`

### `entity.set-remaining-air` {#operation-entity-set-remaining-air}

```text
set-remaining-air: func(air: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `air` | `s32` |

### `entity.get-max-air` {#operation-entity-get-max-air}

```text
get-max-air: func() -> s32;
```

**Returns:** `s32`

### `entity.get-eye-height` {#operation-entity-get-eye-height}

```text
get-eye-height: func() -> f32;
```

**Returns:** `f32`

### `entity.get-eye-position` {#operation-entity-get-eye-position}

```text
get-eye-position: func() -> position;
```

**Returns:** `position`

### `entity.get-nearby-entities` {#operation-entity-get-nearby-entities}

```text
get-nearby-entities: func(x: f64, y: f64, z: f64) -> list<entity>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `f64` |
| `y` | `f64` |
| `z` | `f64` |

**Returns:** `list<entity>`

### `entity.get-vehicle` {#operation-entity-get-vehicle}

```text
get-vehicle: func() -> option<entity>;
```

**Returns:** `option<entity>`

### `entity.set-vehicle` {#operation-entity-set-vehicle}

```text
set-vehicle: func(vehicle: option<entity>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `vehicle` | `option<entity>` |

### `entity.get-passengers` {#operation-entity-get-passengers}

```text
get-passengers: func() -> list<entity>;
```

**Returns:** `list<entity>`

### `entity.add-passenger` {#operation-entity-add-passenger}

```text
add-passenger: func(passenger: entity);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `passenger` | `entity` |

### `entity.remove-passenger` {#operation-entity-remove-passenger}

```text
remove-passenger: func(passenger: entity);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `passenger` | `entity` |

### `entity.eject-passengers` {#operation-entity-eject-passengers}

```text
eject-passengers: func();
```

### `entity.get-bounding-box` {#operation-entity-get-bounding-box}

```text
get-bounding-box: func() -> bounding-box;
```

**Returns:** `bounding-box`

### `entity.is-in-water` {#operation-entity-is-in-water}

```text
is-in-water: func() -> bool;
```

**Returns:** `bool`

### `entity.is-in-lava` {#operation-entity-is-in-lava}

```text
is-in-lava: func() -> bool;
```

**Returns:** `bool`

### `entity.remove` {#operation-entity-remove}

```text
remove: func();
```

### `entity.raycast` {#operation-entity-raycast}

```text
raycast: func(max-distance: f64, fluid-handling: bool) -> option<raycast-result>;
```

Performs a raycast from the entity's eye position in its looking direction.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `f64` |
| `fluid-handling` | `bool` |

**Returns:** `option<raycast-result>`

### `entity.ray-trace-block` {#operation-entity-ray-trace-block}

```text
ray-trace-block: func(max-distance: f64, include-fluids: bool) -> option<ray-trace-block-result>;
```

Performs a ray-trace from the entity's eye position in its looking direction to find the targeted block.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `f64` |
| `include-fluids` | `bool` |

**Returns:** `option<ray-trace-block-result>`

### `entity.ray-trace-entity` {#operation-entity-ray-trace-entity}

```text
ray-trace-entity: func(max-distance: f64) -> option<ray-trace-entity-result>;
```

Performs a ray-trace from the entity's eye position in its looking direction to find the targeted entity.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `f64` |

**Returns:** `option<ray-trace-entity-result>`

### `entity.get-target-entity` {#operation-entity-get-target-entity}

```text
get-target-entity: func(max-distance: f64) -> option<entity>;
```

Returns the entity currently targeted in the looking direction within the specified distance.

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-distance` | `f64` |

**Returns:** `option<entity>`

### `entity.set-custom-data` {#operation-entity-set-custom-data}

```text
set-custom-data: func(namespace: string, key: string, value: nbt-tree);
```

Sets a namespaced custom data value on this entity.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |
| `value` | `nbt-tree` |

### `entity.get-custom-data` {#operation-entity-get-custom-data}

```text
get-custom-data: func(namespace: string, key: string) -> option<nbt-tree>;
```

Returns a namespaced custom data value from this entity, if set.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `option<nbt-tree>`

### `entity.remove-custom-data` {#operation-entity-remove-custom-data}

```text
remove-custom-data: func(namespace: string, key: string);
```

Removes a namespaced custom data value from this entity.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

### `entity.has-custom-data` {#operation-entity-has-custom-data}

```text
has-custom-data: func(namespace: string, key: string) -> bool;
```

Returns whether this entity has a namespaced custom data value.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `bool`

### `entity.as-living` {#operation-entity-as-living}

```text
as-living: func() -> option<living-entity>;
```

Returns this entity as a living-entity if it has health and attributes, or none otherwise.

**Returns:** `option<living-entity>`

### `entity.as-mob` {#operation-entity-as-mob}

```text
as-mob: func() -> option<mob>;
```

Returns this entity as a mob if it is an AI-driven mob entity, or none otherwise.

**Returns:** `option<mob>`

### `entity.is-living` {#operation-entity-is-living}

```text
is-living: func() -> bool;
```

Returns whether this entity is a living entity.

**Returns:** `bool`

### `entity.is-mob` {#operation-entity-is-mob}

```text
is-mob: func() -> bool;
```

Returns whether this entity is an AI-driven mob.

**Returns:** `bool`

### `living-entity.as-entity` {#operation-living-entity-as-entity}

```text
as-entity: func() -> entity;
```

Converts back to the base entity handle.

**Returns:** `entity`

### `living-entity.as-mob` {#operation-living-entity-as-mob}

```text
as-mob: func() -> option<mob>;
```

Returns this living entity as a mob if it has AI/navigation, or none otherwise.

**Returns:** `option<mob>`

### `living-entity.is-mob` {#operation-living-entity-is-mob}

```text
is-mob: func() -> bool;
```

Returns whether this living entity is an AI-driven mob.

**Returns:** `bool`

### `living-entity.get-health` {#operation-living-entity-get-health}

```text
get-health: func() -> f32;
```

**Returns:** `f32`

### `living-entity.set-health` {#operation-living-entity-set-health}

```text
set-health: func(health: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `health` | `f32` |

### `living-entity.get-max-health` {#operation-living-entity-get-max-health}

```text
get-max-health: func() -> f32;
```

**Returns:** `f32`

### `living-entity.set-max-health` {#operation-living-entity-set-max-health}

```text
set-max-health: func(max-health: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `max-health` | `f32` |

### `living-entity.damage` {#operation-living-entity-damage}

```text
damage: func(amount: f32, damage-type: damage-type);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `amount` | `f32` |
| `damage-type` | `damage-type` |

### `living-entity.is-dead` {#operation-living-entity-is-dead}

```text
is-dead: func() -> bool;
```

**Returns:** `bool`

### `living-entity.get-absorption` {#operation-living-entity-get-absorption}

```text
get-absorption: func() -> f32;
```

**Returns:** `f32`

### `living-entity.set-absorption` {#operation-living-entity-set-absorption}

```text
set-absorption: func(amount: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `amount` | `f32` |

### `living-entity.get-attribute-value` {#operation-living-entity-get-attribute-value}

```text
get-attribute-value: func(attr: attribute) -> f64;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `attr` | `attribute` |

**Returns:** `f64`

### `living-entity.get-attribute-base` {#operation-living-entity-get-attribute-base}

```text
get-attribute-base: func(attr: attribute) -> f64;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `attr` | `attribute` |

**Returns:** `f64`

### `living-entity.set-attribute-base` {#operation-living-entity-set-attribute-base}

```text
set-attribute-base: func(attr: attribute, value: f64);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `attr` | `attribute` |
| `value` | `f64` |

### `living-entity.add-attribute-modifier` {#operation-living-entity-add-attribute-modifier}

```text
add-attribute-modifier: func(attr: attribute, modifier: attribute-modifier);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `attr` | `attribute` |
| `modifier` | `attribute-modifier` |

### `living-entity.remove-attribute-modifier` {#operation-living-entity-remove-attribute-modifier}

```text
remove-attribute-modifier: func(attr: attribute, id: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `attr` | `attribute` |
| `id` | `string` |

### `living-entity.get-attribute-modifiers` {#operation-living-entity-get-attribute-modifiers}

```text
get-attribute-modifiers: func(attr: attribute) -> list<attribute-modifier>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `attr` | `attribute` |

**Returns:** `list<attribute-modifier>`

### `living-entity.reset-attribute` {#operation-living-entity-reset-attribute}

```text
reset-attribute: func(attr: attribute);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `attr` | `attribute` |

### `living-entity.reset-all-attributes` {#operation-living-entity-reset-all-attributes}

```text
reset-all-attributes: func();
```

### `living-entity.get-equipment` {#operation-living-entity-get-equipment}

```text
get-equipment: func(slot: equipment-slot) -> option<item-stack>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `equipment-slot` |

**Returns:** `option<item-stack>`

### `living-entity.set-equipment` {#operation-living-entity-set-equipment}

```text
set-equipment: func(slot: equipment-slot, stack: option<item-stack>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `equipment-slot` |
| `stack` | `option<item-stack>` |

### `living-entity.clear-equipment` {#operation-living-entity-clear-equipment}

```text
clear-equipment: func();
```

### `living-entity.get-age` {#operation-living-entity-get-age}

```text
get-age: func() -> s32;
```

**Returns:** `s32`

### `living-entity.set-age` {#operation-living-entity-set-age}

```text
set-age: func(age: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `age` | `s32` |

### `living-entity.send-system-message` {#operation-living-entity-send-system-message}

```text
send-system-message: func(message: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `message` | `text-component` |

### `mob.as-entity` {#operation-mob-as-entity}

```text
as-entity: func() -> entity;
```

Converts back to the base entity handle.

**Returns:** `entity`

### `mob.as-living` {#operation-mob-as-living}

```text
as-living: func() -> living-entity;
```

Converts to the living-entity handle.

**Returns:** `living-entity`

### `mob.add-ai-goal` {#operation-mob-add-ai-goal}

```text
add-ai-goal: func(priority: u8, goal: builtin-ai-goal);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `priority` | `u8` |
| `goal` | `builtin-ai-goal` |

### `mob.add-custom-ai-goal` {#operation-mob-add-custom-ai-goal}

```text
add-custom-ai-goal: func(priority: u8, goal-id: u32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `priority` | `u8` |
| `goal-id` | `u32` |

### `mob.clear-ai-goals` {#operation-mob-clear-ai-goals}

```text
clear-ai-goals: func();
```

### `mob.set-ai-disabled` {#operation-mob-set-ai-disabled}

```text
set-ai-disabled: func(disabled: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `disabled` | `bool` |

### `mob.is-ai-disabled` {#operation-mob-is-ai-disabled}

```text
is-ai-disabled: func() -> bool;
```

**Returns:** `bool`

### `mob.set-target` {#operation-mob-set-target}

```text
set-target: func(target: option<entity>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `target` | `option<entity>` |

### `mob.get-target` {#operation-mob-get-target}

```text
get-target: func() -> option<entity>;
```

**Returns:** `option<entity>`

### `mob.navigate-to-pos` {#operation-mob-navigate-to-pos}

```text
navigate-to-pos: func(pos: position, speed: f64) -> bool;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |
| `speed` | `f64` |

**Returns:** `bool`

### `mob.navigate-to-entity` {#operation-mob-navigate-to-entity}

```text
navigate-to-entity: func(target: entity, speed: f64) -> bool;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `target` | `entity` |
| `speed` | `f64` |

**Returns:** `bool`

### `mob.stop-navigation` {#operation-mob-stop-navigation}

```text
stop-navigation: func();
```

### `mob.is-navigating` {#operation-mob-is-navigating}

```text
is-navigating: func() -> bool;
```

**Returns:** `bool`

### `mob.has-reached-destination` {#operation-mob-has-reached-destination}

```text
has-reached-destination: func() -> bool;
```

**Returns:** `bool`

### `mob.set-navigation-speed` {#operation-mob-set-navigation-speed}

```text
set-navigation-speed: func(speed: f64);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `speed` | `f64` |

### `mob.can-reach` {#operation-mob-can-reach}

```text
can-reach: func(pos: position, max-distance: f32) -> bool;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |
| `max-distance` | `f32` |

**Returns:** `bool`

### `mob.set-pathfinding-malus` {#operation-mob-set-pathfinding-malus}

```text
set-pathfinding-malus: func(node-type: path-node-type, malus: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `node-type` | `path-node-type` |
| `malus` | `f32` |

### `mob.get-pathfinding-malus` {#operation-mob-get-pathfinding-malus}

```text
get-pathfinding-malus: func(node-type: path-node-type) -> f32;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `node-type` | `path-node-type` |

**Returns:** `f32`

### `mob.look-at` {#operation-mob-look-at}

```text
look-at: func(pos: position);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |

### `mob.look-at-entity` {#operation-mob-look-at-entity}

```text
look-at-entity: func(target: entity);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `target` | `entity` |

### `mob.get-mob-data` {#operation-mob-get-mob-data}

```text
get-mob-data: func() -> mob-data;
```

Returns the specialized mob-specific data for this mob.

**Returns:** `mob-data`

### `mob.set-mob-data` {#operation-mob-set-mob-data}

```text
set-mob-data: func(data: mob-data) -> bool;
```

Sets the specialized mob-specific data for this mob.
Returns false if the provided data variant is incompatible with this mob.

**Parameters**

| Name | WIT type |
| --- | --- |
| `data` | `mob-data` |

**Returns:** `bool`

### `mob.set-freeze-ticks` {#operation-mob-set-freeze-ticks}

```text
set-freeze-ticks: func(ticks: s32);
```

Sets the number of freeze ticks on this entity (0 to 140).

**Parameters**

| Name | WIT type |
| --- | --- |
| `ticks` | `s32` |

### `mob.get-freeze-ticks` {#operation-mob-get-freeze-ticks}

```text
get-freeze-ticks: func() -> s32;
```

Returns the number of freeze ticks currently on this entity.

**Returns:** `s32`

### `chunk.get-x` {#operation-chunk-get-x}

```text
get-x: func() -> s32;
```

Gets the chunk's X coordinate.

**Returns:** `s32`

### `chunk.get-z` {#operation-chunk-get-z}

```text
get-z: func() -> s32;
```

Gets the chunk's Z coordinate.

**Returns:** `s32`

### `chunk.get-block-state-id` {#operation-chunk-get-block-state-id}

```text
get-block-state-id: func(pos: block-pos) -> u16;
```

Gets the block state ID at the specified position relative to the chunk.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `u16`

### `chunk.get-block-state` {#operation-chunk-get-block-state}

```text
get-block-state: func(pos: block-pos) -> block-state;
```

Gets detailed block state information at the specified position relative to the chunk.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `block-state`

### `chunk.set-block-state` {#operation-chunk-set-block-state}

```text
set-block-state: func(pos: block-pos, state: u16);
```

Sets the block state at the specified position relative to the chunk.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `state` | `u16` |

### `chunk.get-block` {#operation-chunk-get-block}

```text
get-block: func(pos: block-pos) -> block;
```

Gets the block at the specified position relative to the chunk.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `block`

### `chunk.set-block` {#operation-chunk-set-block}

```text
set-block: func(pos: block-pos, block: block);
```

Sets the block at the specified position relative to the chunk using its default state.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `block` | `block` |

### `chunk.set-block-by-id` {#operation-chunk-set-block-by-id}

```text
set-block-by-id: func(pos: block-pos, block-id: u16);
```

Sets the block by block ID at the specified position relative to the chunk using its default state.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `block-id` | `u16` |

### `chunk.get-biome` {#operation-chunk-get-biome}

```text
get-biome: func(pos: block-pos) -> biome;
```

Gets the biome at the specified position relative to the chunk.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `biome`

### `chunk.get-block-entity` {#operation-chunk-get-block-entity}

```text
get-block-entity: func(pos: block-pos) -> option<block-entity-type>;
```

Gets the block entity at the specified position relative to the chunk, if any.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `option<block-entity-type>`

### `chunk.get-top-block-y` {#operation-chunk-get-top-block-y}

```text
get-top-block-y: func(x: s32, z: s32) -> s32;
```

Gets the highest non-air block Y coordinate at the specified X and Z relative to the chunk.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `s32` |
| `z` | `s32` |

**Returns:** `s32`

### `chunk.get-sky-light` {#operation-chunk-get-sky-light}

```text
get-sky-light: func(pos: block-pos) -> u8;
```

Gets the sky light level at the specified position relative to the chunk.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `u8`

### `chunk.get-block-light` {#operation-chunk-get-block-light}

```text
get-block-light: func(pos: block-pos) -> u8;
```

Gets the block light level at the specified position relative to the chunk.
X and Z must be in the range [0, 15].

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `u8`

### `chunk.set-custom-data` {#operation-chunk-set-custom-data}

```text
set-custom-data: func(namespace: string, key: string, value: nbt-tree);
```

Sets a namespaced custom data value on this chunk.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |
| `value` | `nbt-tree` |

### `chunk.get-custom-data` {#operation-chunk-get-custom-data}

```text
get-custom-data: func(namespace: string, key: string) -> option<nbt-tree>;
```

Returns a namespaced custom data value from this chunk, if set.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `option<nbt-tree>`

### `chunk.remove-custom-data` {#operation-chunk-remove-custom-data}

```text
remove-custom-data: func(namespace: string, key: string);
```

Removes a namespaced custom data value from this chunk.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

### `chunk.has-custom-data` {#operation-chunk-has-custom-data}

```text
has-custom-data: func(namespace: string, key: string) -> bool;
```

Returns whether this chunk has a namespaced custom data value.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `bool`

### `world-border.get-center-x` {#operation-world-border-get-center-x}

```text
get-center-x: func() -> f64;
```

Gets the center X coordinate of the border.

**Returns:** `f64`

### `world-border.get-center-z` {#operation-world-border-get-center-z}

```text
get-center-z: func() -> f64;
```

Gets the center Z coordinate of the border.

**Returns:** `f64`

### `world-border.get-center` {#operation-world-border-get-center}

```text
get-center: func() -> position;
```

Gets the center position of the border.

**Returns:** `position`

### `world-border.set-center` {#operation-world-border-set-center}

```text
set-center: func(x: f64, z: f64);
```

Sets the center coordinates of the border.

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `f64` |
| `z` | `f64` |

### `world-border.get-diameter` {#operation-world-border-get-diameter}

```text
get-diameter: func() -> f64;
```

Gets the current diameter of the border.

**Returns:** `f64`

### `world-border.get-size` {#operation-world-border-get-size}

```text
get-size: func() -> f64;
```

Gets the current diameter of the border (alias for get-diameter).

**Returns:** `f64`

### `world-border.set-diameter` {#operation-world-border-set-diameter}

```text
set-diameter: func(diameter: f64, speed: option<u64>);
```

Sets the diameter of the border, optionally with a speed (in ticks) for lerping.

**Parameters**

| Name | WIT type |
| --- | --- |
| `diameter` | `f64` |
| `speed` | `option<u64>` |

### `world-border.set-size` {#operation-world-border-set-size}

```text
set-size: func(size: f64);
```

Sets the size of the border instantly.

**Parameters**

| Name | WIT type |
| --- | --- |
| `size` | `f64` |

### `world-border.set-size-transition` {#operation-world-border-set-size-transition}

```text
set-size-transition: func(new-size: f64, time-seconds: u64);
```

Sets the size of the border with a transition duration in seconds.

**Parameters**

| Name | WIT type |
| --- | --- |
| `new-size` | `f64` |
| `time-seconds` | `u64` |

### `world-border.get-target-diameter` {#operation-world-border-get-target-diameter}

```text
get-target-diameter: func() -> f64;
```

Gets the target diameter when lerping/transitioning.

**Returns:** `f64`

### `world-border.get-target-speed` {#operation-world-border-get-target-speed}

```text
get-target-speed: func() -> s64;
```

Gets the target transition duration/speed in ticks.

**Returns:** `s64`

### `world-border.get-warning-distance` {#operation-world-border-get-warning-distance}

```text
get-warning-distance: func() -> s32;
```

Gets the distance from the border where warning effects start (in blocks).

**Returns:** `s32`

### `world-border.set-warning-distance` {#operation-world-border-set-warning-distance}

```text
set-warning-distance: func(distance: s32);
```

Sets the warning distance (in blocks).

**Parameters**

| Name | WIT type |
| --- | --- |
| `distance` | `s32` |

### `world-border.get-warning-delay` {#operation-world-border-get-warning-delay}

```text
get-warning-delay: func() -> s32;
```

Gets the time before a player hitting the border is warned (in seconds).

**Returns:** `s32`

### `world-border.set-warning-delay` {#operation-world-border-set-warning-delay}

```text
set-warning-delay: func(delay: s32);
```

Sets the warning delay (in seconds).

**Parameters**

| Name | WIT type |
| --- | --- |
| `delay` | `s32` |

### `world-border.get-warning-time` {#operation-world-border-get-warning-time}

```text
get-warning-time: func() -> s32;
```

Gets the warning time (alias for get-warning-delay).

**Returns:** `s32`

### `world-border.set-warning-time` {#operation-world-border-set-warning-time}

```text
set-warning-time: func(time: s32);
```

Sets the warning time (alias for set-warning-delay).

**Parameters**

| Name | WIT type |
| --- | --- |
| `time` | `s32` |

### `world-border.get-damage-buffer` {#operation-world-border-get-damage-buffer}

```text
get-damage-buffer: func() -> f64;
```

Gets the safe damage buffer distance outside the border (in blocks).

**Returns:** `f64`

### `world-border.set-damage-buffer` {#operation-world-border-set-damage-buffer}

```text
set-damage-buffer: func(buffer: f64);
```

Sets the safe damage buffer distance outside the border (in blocks).

**Parameters**

| Name | WIT type |
| --- | --- |
| `buffer` | `f64` |

### `world-border.get-damage-amount` {#operation-world-border-get-damage-amount}

```text
get-damage-amount: func() -> f64;
```

Gets the damage amount inflicted per block per second when outside the buffer.

**Returns:** `f64`

### `world-border.set-damage-amount` {#operation-world-border-set-damage-amount}

```text
set-damage-amount: func(damage: f64);
```

Sets the damage amount inflicted per block per second when outside the buffer.

**Parameters**

| Name | WIT type |
| --- | --- |
| `damage` | `f64` |

### `world-border.contains` {#operation-world-border-contains}

```text
contains: func(x: f64, z: f64) -> bool;
```

Returns whether the specified coordinates are within the border.

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `f64` |
| `z` | `f64` |

**Returns:** `bool`

### `world-border.contains-pos` {#operation-world-border-contains-pos}

```text
contains-pos: func(pos: position) -> bool;
```

Returns whether the specified position is within the border.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |

**Returns:** `bool`

### `world-border.reset` {#operation-world-border-reset}

```text
reset: func();
```

Resets the world border to vanilla default settings.

### `world.get-id` {#operation-world-get-id}

```text
get-id: func() -> string;
```

Returns the unique identifier of this world.

**Returns:** `string`

### `world.get-border` {#operation-world-get-border}

```text
get-border: func() -> world-border;
```

Gets the world border associated with this world (alias for get-world-border).

**Returns:** `world-border`

### `world.get-world-border` {#operation-world-get-world-border}

```text
get-world-border: func() -> world-border;
```

Gets the world border associated with this world.

**Returns:** `world-border`

### `world.get-chunk` {#operation-world-get-chunk}

```text
get-chunk: func(x: s32, z: s32) -> option<chunk>;
```

Gets the chunk at the specified chunk coordinates.

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `s32` |
| `z` | `s32` |

**Returns:** `option<chunk>`

### `world.get-block-state-id` {#operation-world-get-block-state-id}

```text
get-block-state-id: func(pos: block-pos) -> u16;
```

Gets the block state ID at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `u16`

### `world.get-block-state` {#operation-world-get-block-state}

```text
get-block-state: func(pos: block-pos) -> block-state;
```

Gets detailed block state information at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `block-state`

### `world.set-block-state` {#operation-world-set-block-state}

```text
set-block-state: func(pos: block-pos, state: u16, update-flags: block-flags);
```

Sets the block state at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `state` | `u16` |
| `update-flags` | `block-flags` |

### `world.get-block` {#operation-world-get-block}

```text
get-block: func(pos: block-pos) -> block;
```

Gets the block type at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `block`

### `world.get-block-id` {#operation-world-get-block-id}

```text
get-block-id: func(pos: block-pos) -> u16;
```

Gets the numerical block ID at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `u16`

### `world.set-block` {#operation-world-set-block}

```text
set-block: func(pos: block-pos, block: block, update-flags: block-flags);
```

Sets the block at the specified position using its default state.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `block` | `block` |
| `update-flags` | `block-flags` |

### `world.set-block-by-id` {#operation-world-set-block-by-id}

```text
set-block-by-id: func(pos: block-pos, block-id: u16, update-flags: block-flags);
```

Sets the block at the specified position by numerical block ID using its default state.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `block-id` | `u16` |
| `update-flags` | `block-flags` |

### `world.set-block-by-name` {#operation-world-set-block-by-name}

```text
set-block-by-name: func(pos: block-pos, name: string, update-flags: block-flags) -> bool;
```

Sets the block at the specified position by namespaced name using its default state.
Returns true if the block was recognized and set.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `name` | `string` |
| `update-flags` | `block-flags` |

**Returns:** `bool`

### `world.get-time-of-day` {#operation-world-get-time-of-day}

```text
get-time-of-day: func() -> u64;
```

Returns the current time of day in ticks.

**Returns:** `u64`

### `world.set-time-of-day` {#operation-world-set-time-of-day}

```text
set-time-of-day: func(time: u64);
```

Sets the current time of day in ticks.

**Parameters**

| Name | WIT type |
| --- | --- |
| `time` | `u64` |

### `world.get-world-age` {#operation-world-get-world-age}

```text
get-world-age: func() -> u64;
```

Returns the total age of the world in ticks.

**Returns:** `u64`

### `world.get-dimension` {#operation-world-get-dimension}

```text
get-dimension: func() -> string;
```

Returns the dimension type (e.g., \"minecraft:overworld\").

**Returns:** `string`

### `world.get-spawn-location` {#operation-world-get-spawn-location}

```text
get-spawn-location: func() -> world-spawn-location;
```

Returns the configured shared spawn location for this world.

**Returns:** `world-spawn-location`

### `world.get-top-block-y` {#operation-world-get-top-block-y}

```text
get-top-block-y: func(x: s32, z: s32) -> s32;
```

Gets the highest non-air block Y coordinate at the specified X and Z.

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `s32` |
| `z` | `s32` |

**Returns:** `s32`

### `world.get-motion-blocking-height` {#operation-world-get-motion-blocking-height}

```text
get-motion-blocking-height: func(x: s32, z: s32) -> s32;
```

Gets the highest motion-blocking block Y coordinate.

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `s32` |
| `z` | `s32` |

**Returns:** `s32`

### `world.is-raining` {#operation-world-is-raining}

```text
is-raining: func() -> bool;
```

Returns whether it is currently raining or snowing.

**Returns:** `bool`

### `world.set-raining` {#operation-world-set-raining}

```text
set-raining: func(raining: bool);
```

Sets whether it should be raining or snowing.

**Parameters**

| Name | WIT type |
| --- | --- |
| `raining` | `bool` |

### `world.is-thundering` {#operation-world-is-thundering}

```text
is-thundering: func() -> bool;
```

Returns whether there is currently a thunderstorm.

**Returns:** `bool`

### `world.set-thundering` {#operation-world-set-thundering}

```text
set-thundering: func(thundering: bool);
```

Sets whether there should be a thunderstorm.

**Parameters**

| Name | WIT type |
| --- | --- |
| `thundering` | `bool` |

### `world.broadcast-system-message` {#operation-world-broadcast-system-message}

```text
broadcast-system-message: func(message: text-component, overlay: bool);
```

Broadcasts a system message to all players in this world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `message` | `text-component` |
| `overlay` | `bool` |

### `world.get-scoreboard` {#operation-world-get-scoreboard}

```text
get-scoreboard: func() -> scoreboard;
```

Returns the scoreboard associated with this world.

**Returns:** `scoreboard`

### `world.play-sound` {#operation-world-play-sound}

```text
play-sound: func(sound: sound, category: sound-category, pos: position, volume: f32, pitch: f32);
```

Plays a sound at the specified position for all players in the world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `sound` | `sound` |
| `category` | `sound-category` |
| `pos` | `position` |
| `volume` | `f32` |
| `pitch` | `f32` |

### `world.play-custom-sound` {#operation-world-play-custom-sound}

```text
play-custom-sound: func(sound-name: string, category: sound-category, pos: position, volume: f32, pitch: f32);
```

Plays a custom resource pack sound identifier at the specified position for all players in the world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `sound-name` | `string` |
| `category` | `sound-category` |
| `pos` | `position` |
| `volume` | `f32` |
| `pitch` | `f32` |

### `world.spawn-particle` {#operation-world-spawn-particle}

```text
spawn-particle: func(particle: particle, pos: position, offset: position, max-speed: f32, count: s32);
```

Spawns particles at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `particle` | `particle` |
| `pos` | `position` |
| `offset` | `position` |
| `max-speed` | `f32` |
| `count` | `s32` |

### `world.create-explosion` {#operation-world-create-explosion}

```text
create-explosion: func(pos: position, power: f32, create-fire: bool, interaction: explosion-interaction);
```

Creates an explosion at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |
| `power` | `f32` |
| `create-fire` | `bool` |
| `interaction` | `explosion-interaction` |

### `world.get-sea-level` {#operation-world-get-sea-level}

```text
get-sea-level: func() -> s32;
```

Returns the sea level of this world.

**Returns:** `s32`

### `world.get-min-y` {#operation-world-get-min-y}

```text
get-min-y: func() -> s32;
```

Returns the minimum Y coordinate (bottom of the world).

**Returns:** `s32`

### `world.get-sky-light` {#operation-world-get-sky-light}

```text
get-sky-light: func(pos: block-pos) -> u8;
```

Returns the sky light level at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `u8`

### `world.set-sky-light` {#operation-world-set-sky-light}

```text
set-sky-light: func(pos: block-pos, level: u8);
```

Sets the sky light level at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `level` | `u8` |

### `world.get-block-light` {#operation-world-get-block-light}

```text
get-block-light: func(pos: block-pos) -> u8;
```

Returns the block light level at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `u8`

### `world.set-block-light` {#operation-world-set-block-light}

```text
set-block-light: func(pos: block-pos, level: u8);
```

Sets the block light level at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `level` | `u8` |

### `world.get-biome` {#operation-world-get-biome}

```text
get-biome: func(pos: block-pos) -> biome;
```

Returns the biome at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `biome`

### `world.spawn-entity` {#operation-world-spawn-entity}

```text
spawn-entity: func(entity-type: entity-type, pos: position) -> entity;
```

Spawns an entity of the specified type at the given position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-type` | `entity-type` |
| `pos` | `position` |

**Returns:** `entity`

### `world.get-entities` {#operation-world-get-entities}

```text
get-entities: func() -> list<entity>;
```

Returns a list of all entities in this world.

**Returns:** `list<entity>`

### `world.strike-lightning` {#operation-world-strike-lightning}

```text
strike-lightning: func(pos: position, effect-only: bool);
```

Spawns a lightning bolt at the specified position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `position` |
| `effect-only` | `bool` |

### `world.ray-trace-blocks` {#operation-world-ray-trace-blocks}

```text
ray-trace-blocks: func(start: position, end: position) -> option<position>;
```

Performs a raycast from start position to end position to hit blocks.

**Parameters**

| Name | WIT type |
| --- | --- |
| `start` | `position` |
| `end` | `position` |

**Returns:** `option<position>`

### `world.ray-trace-block` {#operation-world-ray-trace-block}

```text
ray-trace-block: func(start: position, end: position, include-fluids: bool) -> option<ray-trace-block-result>;
```

Performs a raycast from start position to end position to hit blocks, with optional fluid handling.

**Parameters**

| Name | WIT type |
| --- | --- |
| `start` | `position` |
| `end` | `position` |
| `include-fluids` | `bool` |

**Returns:** `option<ray-trace-block-result>`

### `world.ray-trace-entity` {#operation-world-ray-trace-entity}

```text
ray-trace-entity: func(start: position, end: position) -> option<ray-trace-entity-result>;
```

Performs a raycast from start position to end position to find the closest entity hit.

**Parameters**

| Name | WIT type |
| --- | --- |
| `start` | `position` |
| `end` | `position` |

**Returns:** `option<ray-trace-entity-result>`

### `world.ray-trace-entities` {#operation-world-ray-trace-entities}

```text
ray-trace-entities: func(start: position, end: position) -> list<ray-trace-entity-result>;
```

Performs a raycast from start position to end position to find all entities hit along the ray.

**Parameters**

| Name | WIT type |
| --- | --- |
| `start` | `position` |
| `end` | `position` |

**Returns:** `list<ray-trace-entity-result>`

### `world.get-block-entity` {#operation-world-get-block-entity}

```text
get-block-entity: func(pos: block-pos) -> option<block-entity-type>;
```

Returns the block entity at the specified position, if any.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `option<block-entity-type>`

### `world.get-block-entity-nbt` {#operation-world-get-block-entity-nbt}

```text
get-block-entity-nbt: func(pos: block-pos) -> option<list<u8>>;
```

Returns the raw NBT bytes of the block entity at the given position, if any.

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |

**Returns:** `option<list<u8>>`

### `world.set-block-entity-nbt` {#operation-world-set-block-entity-nbt}

```text
set-block-entity-nbt: func(pos: block-pos, nbt-data: list<u8>) -> result<_, string>;
```

Restores a block entity from raw NBT bytes at the given position.
The NBT must contain a valid "id" field (e.g. "minecraft:chest").

**Parameters**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `nbt-data` | `list<u8>` |

**Returns:** `result<_, string>`

### `world.get-name` {#operation-world-get-name}

```text
get-name: func() -> string;
```

Returns the name of this world (e.g. "world", "world_nether", "arena_1").

**Returns:** `string`

### `world.save` {#operation-world-save}

```text
save: func() -> result<_, string>;
```

Saves all chunk data, block entities, and entities for this world to disk.

**Returns:** `result<_, string>`

### `world.set-chunk-generator` {#operation-world-set-chunk-generator}

```text
set-chunk-generator: func(generator-id: u32);
```

Sets a custom chunk generator for this world using a registered generator ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `generator-id` | `u32` |

### `world.set-custom-data` {#operation-world-set-custom-data}

```text
set-custom-data: func(namespace: string, key: string, value: nbt-tree);
```

Sets a namespaced custom data value on this world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |
| `value` | `nbt-tree` |

### `world.get-custom-data` {#operation-world-get-custom-data}

```text
get-custom-data: func(namespace: string, key: string) -> option<nbt-tree>;
```

Returns a namespaced custom data value from this world, if set.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `option<nbt-tree>`

### `world.remove-custom-data` {#operation-world-remove-custom-data}

```text
remove-custom-data: func(namespace: string, key: string);
```

Removes a namespaced custom data value from this world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

### `world.has-custom-data` {#operation-world-has-custom-data}

```text
has-custom-data: func(namespace: string, key: string) -> bool;
```

Returns whether this world has a namespaced custom data value.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `bool`

### `world.get-game-rule` {#operation-world-get-game-rule}

```text
get-game-rule: func(rule: game-rule) -> game-rule-value;
```

Gets the value of a game rule in this world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `rule` | `game-rule` |

**Returns:** `game-rule-value`

### `world.set-game-rule` {#operation-world-set-game-rule}

```text
set-game-rule: func(rule: game-rule, value: game-rule-value);
```

Sets the value of a game rule in this world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `rule` | `game-rule` |
| `value` | `game-rule-value` |

### `chunk-buffer.get-x` {#operation-chunk-buffer-get-x}

```text
get-x: func() -> s32;
```

Returns the chunk X coordinate.

**Returns:** `s32`

### `chunk-buffer.get-z` {#operation-chunk-buffer-get-z}

```text
get-z: func() -> s32;
```

Returns the chunk Z coordinate.

**Returns:** `s32`

### `chunk-buffer.get-min-y` {#operation-chunk-buffer-get-min-y}

```text
get-min-y: func() -> s32;
```

Returns the minimum Y coordinate for this world.

**Returns:** `s32`

### `chunk-buffer.get-height` {#operation-chunk-buffer-get-height}

```text
get-height: func() -> u32;
```

Returns the height of the chunk in blocks.

**Returns:** `u32`

### `chunk-buffer.set-block-state-id` {#operation-chunk-buffer-set-block-state-id}

```text
set-block-state-id: func(x: u8, y: s32, z: u8, state-id: u16);
```

Sets the block state ID at local coordinates (0..16, y, 0..16).

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `u8` |
| `y` | `s32` |
| `z` | `u8` |
| `state-id` | `u16` |

### `chunk-buffer.get-block-state-id` {#operation-chunk-buffer-get-block-state-id}

```text
get-block-state-id: func(x: u8, y: s32, z: u8) -> u16;
```

Gets the block state ID at local coordinates (0..16, y, 0..16).

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `u8` |
| `y` | `s32` |
| `z` | `u8` |

**Returns:** `u16`

### `chunk-buffer.fill-layer` {#operation-chunk-buffer-fill-layer}

```text
fill-layer: func(y: s32, state-id: u16);
```

Fills an entire horizontal 16x16 layer at the given Y level with a block state ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `y` | `s32` |
| `state-id` | `u16` |

### `chunk-buffer.fill-range` {#operation-chunk-buffer-fill-range}

```text
fill-range: func(x: u8, min-y: s32, max-y: s32, z: u8, state-id: u16);
```

Fills a vertical column from min-y to max-y at local (x, z) with a block state ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `u8` |
| `min-y` | `s32` |
| `max-y` | `s32` |
| `z` | `u8` |
| `state-id` | `u16` |

### `chunk-buffer.fill-cuboid` {#operation-chunk-buffer-fill-cuboid}

```text
fill-cuboid: func(min-x: u8, min-y: s32, min-z: u8, max-x: u8, max-y: s32, max-z: u8, state-id: u16);
```

Fills a 3D cuboid with a block state ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `min-x` | `u8` |
| `min-y` | `s32` |
| `min-z` | `u8` |
| `max-x` | `u8` |
| `max-y` | `s32` |
| `max-z` | `u8` |
| `state-id` | `u16` |

### `chunk-buffer.set-biome` {#operation-chunk-buffer-set-biome}

```text
set-biome: func(x: u8, y: s32, z: u8, biome: biome);
```

Sets the biome at local coordinates (0..16, y, 0..16).

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `u8` |
| `y` | `s32` |
| `z` | `u8` |
| `biome` | `biome` |

### `chunk-buffer.fill-biome` {#operation-chunk-buffer-fill-biome}

```text
fill-biome: func(biome: biome);
```

Fills the entire chunk with the given biome.

**Parameters**

| Name | WIT type |
| --- | --- |
| `biome` | `biome` |

### `world.resolve-block-state` {#operation-world-resolve-block-state}

```text
resolve-block-state: func(name: string, properties: list<tuple<string, string>>) -> option<u16>;
```

Resolves a block name and optional properties to a block state ID.
Returns none if the block name is unknown.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `properties` | `list<tuple<string, string>>` |

**Returns:** `option<u16>`

### `world.block-state-to-info` {#operation-world-block-state-to-info}

```text
block-state-to-info: func(state-id: u16) -> option<block-state-info>;
```

Resolves a block state ID back to its block name and properties.
Returns none if the state ID is unknown.

**Parameters**

| Name | WIT type |
| --- | --- |
| `state-id` | `u16` |

**Returns:** `option<block-state-info>`

### `world.get-block-by-id` {#operation-world-get-block-by-id}

```text
get-block-by-id: func(id: u16) -> option<block>;
```

Gets a block type by its numerical block ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `u16` |

**Returns:** `option<block>`

### `world.get-block-by-name` {#operation-world-get-block-by-name}

```text
get-block-by-name: func(name: string) -> option<block>;
```

Gets a block type by its namespaced name (e.g., "minecraft:stone" or "stone").

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `option<block>`

### `world.get-all-blocks` {#operation-world-get-all-blocks}

```text
get-all-blocks: func() -> list<block>;
```

Gets all registered blocks.

**Returns:** `list<block>`

### `world.get-all-block-names` {#operation-world-get-all-block-names}

```text
get-all-block-names: func() -> list<string>;
```

Gets the names of all registered blocks.

**Returns:** `list<string>`

### `world.get-block-count` {#operation-world-get-block-count}

```text
get-block-count: func() -> u32;
```

Gets the total number of registered block types.

**Returns:** `u32`

### `world.get-block-state-count` {#operation-world-get-block-state-count}

```text
get-block-state-count: func() -> u32;
```

Gets the total number of registered block states.

**Returns:** `u32`

### `world.get-states-for-block` {#operation-world-get-states-for-block}

```text
get-states-for-block: func(block: block) -> list<block-state>;
```

Gets all valid block states for a block type.

**Parameters**

| Name | WIT type |
| --- | --- |
| `block` | `block` |

**Returns:** `list<block-state>`

### `world.get-states-for-block-id` {#operation-world-get-states-for-block-id}

```text
get-states-for-block-id: func(block-id: u16) -> list<block-state>;
```

Gets all valid block states for a numerical block ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `block-id` | `u16` |

**Returns:** `list<block-state>`

### `world.get-state-ids-for-block-id` {#operation-world-get-state-ids-for-block-id}

```text
get-state-ids-for-block-id: func(block-id: u16) -> list<u16>;
```

Gets all valid state IDs for a numerical block ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `block-id` | `u16` |

**Returns:** `list<u16>`

### `world.get-block-properties` {#operation-world-get-block-properties}

```text
get-block-properties: func(state-id: u16) -> list<tuple<string, string>>;
```

Gets property key-value pairs for a numerical block state ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `state-id` | `u16` |

**Returns:** `list<tuple<string, string>>`

### `world.get-block-from-state-id` {#operation-world-get-block-from-state-id}

```text
get-block-from-state-id: func(state-id: u16) -> option<block>;
```

Gets the block type associated with a block state ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `state-id` | `u16` |

**Returns:** `option<block>`

### `world.get-block-from-state` {#operation-world-get-block-from-state}

```text
get-block-from-state: func(state: block-state) -> block;
```

Gets the block type associated with a block state.

**Parameters**

| Name | WIT type |
| --- | --- |
| `state` | `block-state` |

**Returns:** `block`

### `world.get-default-state-from-block` {#operation-world-get-default-state-from-block}

```text
get-default-state-from-block: func(block: block) -> block-state;
```

Gets the default block state for a block type.

**Parameters**

| Name | WIT type |
| --- | --- |
| `block` | `block` |

**Returns:** `block-state`

### `world.get-default-state-from-block-id` {#operation-world-get-default-state-from-block-id}

```text
get-default-state-from-block-id: func(block-id: u16) -> option<block-state>;
```

Gets the default block state for a numerical block ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `block-id` | `u16` |

**Returns:** `option<block-state>`

### `world.get-block-state-by-id` {#operation-world-get-block-state-by-id}

```text
get-block-state-by-id: func(state-id: u16) -> option<block-state>;
```

Gets the detailed block state for a numerical block state ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `state-id` | `u16` |

**Returns:** `option<block-state>`
