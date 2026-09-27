---
title: Plugin API Reference
outline: [2, 2]
---

# Package `pumpkin:plugin@0.1.0`

WIT definitions for Pumpkin plugins. Each interface lists its types, operations, and signatures.

Source: [Pumpkin plugin WIT](https://github.com/Pumpkin-MC/Pumpkin/tree/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1)

## World

| World | Description |
| --- | --- |
| [`plugin`](./plugin) | Host imports and plugin exports. |

## Host Interfaces

| Interface | Description |
| --- | --- |
| [`advancement`](./advancement) | Advancement definitions and progress. |
| [`attributes`](./attributes) | Entity attributes and modifiers. |
| [`block-entity`](./block-entity) | Block entity types and operations. |
| [`boss-bar`](./boss-bar) | Boss bar creation and updates. |
| [`command`](./command) | Command trees, arguments, execution, and suggestions. |
| [`context`](./context) | Plugin registration, data folder, and server access. |
| [`damage-types`](./damage-types) | Damage type identifiers. |
| [`datapack`](./datapack) | Datapack inspection and management. |
| [`display`](./display) | Display and Interaction entities. |
| [`enchantments`](./enchantments) | Enchantment definitions and registration. |
| [`entity`](./entity) | Entity types re-exported from the world interface. |
| [`entity-statuses`](./entity-statuses) | Entity status and animation identifiers. |
| [`forms`](./forms) | Bedrock form definitions. |
| [`game-events`](./game-events) | Game event types. |
| [`game-rules`](./game-rules) | Game rule definitions and values. |
| [`gui`](./gui) | GUI creation and updates. |
| [`i18n`](./i18n) | Translate keys and load custom translations. |
| [`inventory`](./inventory) | Inventory slots and player inventory operations. |
| [`ipc`](./ipc) | Plugin messages and plugin identifiers. |
| [`java-dialogs`](./java-dialogs) | Java Edition dialog definitions. |
| [`logging`](./logging) | Log levels and logging functions. |
| [`player`](./player) | Players and player operations. |
| [`potions`](./potions) | Potion types. |
| [`recipe`](./recipe) | Recipe definitions and registration. |
| [`scheduler`](./scheduler) | Delayed and repeating tasks; cancellation. |
| [`scoreboard`](./scoreboard) | Scoreboards, objectives, and scores. |
| [`screens`](./screens) | Screen and container types. |
| [`server`](./server) | Server state and player lookup. |
| [`statistics`](./statistics) | Statistic categories and types. |
| [`status-effect`](./status-effect) | Status effect types. |
| [`text`](./text) | Text components and formatting. |
| [`world`](./world) | Worlds, blocks, entities, and chunk generation. |

## Shared and Exported Types

| Interface | Description |
| --- | --- |
| [`bedrock-packets`](./bedrock-packets) | Bedrock clientbound and serverbound packets. |
| [`biomes`](./biomes) | Biome identifiers. |
| [`common`](./common) | Coordinates, colors, NBT, and other shared types. |
| [`data-components`](./data-components) | Item data component identifiers. |
| [`entity-types`](./entity-types) | Entity type identifiers. |
| [`event`](./event) | Event types, priorities, and event data. |
| [`item-stack`](./item-stack) | Item stacks and their components. |
| [`java-packets`](./java-packets) | Java clientbound and serverbound packets. |
| [`metadata`](./metadata) | Plugin identity, version, and dependencies. |
| [`particles`](./particles) | Particle types. |
| [`permission`](./permission) | Permission definitions and defaults. |
| [`sounds`](./sounds) | Sound types. |
| [`uuid`](./uuid) | UUID type and parsing. |
