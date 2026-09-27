---
title: Interface game-rules
outline: [2, 2]
---

# Interface `game-rules`

Host import: `pumpkin:plugin/game-rules@0.1.0`

[Package summary](./)

Source: [game-rules.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/game-rules.wit)

Game rule definitions and values.

## Type Summary

| Kind | Type |
| --- | --- |
| enum | [`game-rule`](#type-game-rule) |
| variant | [`game-rule-value`](#type-game-rule-value) |

## Type Details

### `game-rule` {#type-game-rule}

**Enum cases**

| Name |
| --- |
| `advance-time` |
| `advance-weather` |
| `allow-entering-nether-using-portals` |
| `block-drops` |
| `block-explosion-drop-decay` |
| `command-block-output` |
| `command-blocks-work` |
| `drowning-damage` |
| `elytra-movement-check` |
| `ender-pearls-vanish-on-death` |
| `entity-drops` |
| `fall-damage` |
| `fire-damage` |
| `fire-spread-radius-around-player` |
| `forgive-dead-players` |
| `freeze-damage` |
| `global-sound-events` |
| `immediate-respawn` |
| `keep-inventory` |
| `lava-source-conversion` |
| `limited-crafting` |
| `locator-bar` |
| `log-admin-commands` |
| `max-block-modifications` |
| `max-command-forks` |
| `max-command-sequence-length` |
| `max-entity-cramming` |
| `max-minecart-speed` |
| `max-snow-accumulation-height` |
| `mob-drops` |
| `mob-explosion-drop-decay` |
| `mob-griefing` |
| `natural-health-regeneration` |
| `player-movement-check` |
| `players-nether-portal-creative-delay` |
| `players-nether-portal-default-delay` |
| `players-sleeping-percentage` |
| `projectiles-can-break-blocks` |
| `pvp` |
| `raids` |
| `random-tick-speed` |
| `reduced-debug-info` |
| `respawn-radius` |
| `send-command-feedback` |
| `show-advancement-messages` |
| `show-death-messages` |
| `spawn-mobs` |
| `spawn-monsters` |
| `spawn-patrols` |
| `spawn-phantoms` |
| `spawn-wandering-traders` |
| `spawn-wardens` |
| `spawner-blocks-work` |
| `spectators-generate-chunks` |
| `spread-vines` |
| `tnt-explodes` |
| `tnt-explosion-drop-decay` |
| `universal-anger` |
| `water-source-conversion` |

### `game-rule-value` {#type-game-rule-value}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `int` | `s32` |
| `%bool` | `bool` |
