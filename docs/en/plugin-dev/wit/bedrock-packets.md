---
title: Interface bedrock-packets
outline: [2, 2]
---

# Interface `bedrock-packets`

Shared types: `pumpkin:plugin/bedrock-packets@0.1.0`

[Package summary](./)

Source: [bedrock-packets.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/bedrock-packets.wit)

Bedrock clientbound and serverbound packets.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`uuid`](./uuid) | `uuid` |

## Type Summary

| Kind | Type |
| --- | --- |
| enum | [`ability`](#type-ability) |
| variant | [`ability-value`](#type-ability-value) |
| enum | [`action`](#type-action) |
| enum | [`actor-event-id`](#type-actor-event-id) |
| record | [`actor-link`](#type-actor-link) |
| enum | [`actor-swing-source`](#type-actor-swing-source) |
| enum | [`animate-action`](#type-animate-action) |
| record | [`attribute-data`](#type-attribute-data) |
| record | [`attribute-modifier`](#type-attribute-modifier) |
| variant | [`bedrock-recipe`](#type-bedrock-recipe) |
| record | [`bedrock-shaped-recipe`](#type-bedrock-shaped-recipe) |
| record | [`bedrock-shapeless-recipe`](#type-bedrock-shapeless-recipe) |
| enum | [`build-platform`](#type-build-platform) |
| record | [`c-add-actor`](#type-c-add-actor) |
| record | [`c-add-item-actor`](#type-c-add-item-actor) |
| record | [`c-add-player`](#type-c-add-player) |
| record | [`c-available-commands`](#type-c-available-commands) |
| record | [`c-block-actor-data`](#type-c-block-actor-data) |
| record | [`c-block-event`](#type-c-block-event) |
| record | [`c-boss-event`](#type-c-boss-event) |
| record | [`c-change-dimension`](#type-c-change-dimension) |
| record | [`c-chunk-radius-updated`](#type-c-chunk-radius-updated) |
| record | [`c-client-cache-miss-response`](#type-c-client-cache-miss-response) |
| record | [`c-container-open`](#type-c-container-open) |
| record | [`c-correct-player-move-prediction`](#type-c-correct-player-move-prediction) |
| record | [`c-crafting-data`](#type-c-crafting-data) |
| record | [`c-creative-content`](#type-c-creative-content) |
| record | [`c-disconnect`](#type-c-disconnect) |
| record | [`c-gamerules-changed`](#type-c-gamerules-changed) |
| record | [`c-inventory-content`](#type-c-inventory-content) |
| record | [`c-inventory-slot`](#type-c-inventory-slot) |
| record | [`c-item-registry`](#type-c-item-registry) |
| record | [`c-item-stack-response`](#type-c-item-stack-response) |
| record | [`c-level-event`](#type-c-level-event) |
| record | [`c-level-sound-event`](#type-c-level-sound-event) |
| record | [`c-mob-effect`](#type-c-mob-effect) |
| record | [`c-mob-equipment`](#type-c-mob-equipment) |
| record | [`c-modal-form-request`](#type-c-modal-form-request) |
| record | [`c-move-actor-absolute`](#type-c-move-actor-absolute) |
| record | [`c-move-actor-delta`](#type-c-move-actor-delta) |
| record | [`c-move-player`](#type-c-move-player) |
| record | [`c-network-chunk-publisher-update`](#type-c-network-chunk-publisher-update) |
| record | [`c-network-settings`](#type-c-network-settings) |
| enum | [`c-play-status`](#type-c-play-status) |
| record | [`c-player-hotbar`](#type-c-player-hotbar) |
| record | [`c-player-list`](#type-c-player-list) |
| record | [`c-remove-actor`](#type-c-remove-actor) |
| record | [`c-remove-objective`](#type-c-remove-objective) |
| record | [`c-resource-pack-stack-packet`](#type-c-resource-pack-stack-packet) |
| record | [`c-resource-packs-info`](#type-c-resource-packs-info) |
| record | [`c-set-actor-data`](#type-c-set-actor-data) |
| record | [`c-set-actor-link`](#type-c-set-actor-link) |
| record | [`c-set-actor-motion`](#type-c-set-actor-motion) |
| record | [`c-set-difficulty`](#type-c-set-difficulty) |
| record | [`c-set-display-objective`](#type-c-set-display-objective) |
| record | [`c-set-health`](#type-c-set-health) |
| record | [`c-set-player-game-type`](#type-c-set-player-game-type) |
| record | [`c-set-score`](#type-c-set-score) |
| record | [`c-set-spawn-position`](#type-c-set-spawn-position) |
| record | [`c-set-time`](#type-c-set-time) |
| record | [`c-set-title`](#type-c-set-title) |
| record | [`c-show-credits`](#type-c-show-credits) |
| record | [`c-start-game`](#type-c-start-game) |
| record | [`c-take-item-actor`](#type-c-take-item-actor) |
| record | [`c-transfer`](#type-c-transfer) |
| record | [`c-update-abilities`](#type-c-update-abilities) |
| record | [`c-update-attributes`](#type-c-update-attributes) |
| record | [`c-update-block`](#type-c-update-block) |
| record | [`c-update-trade`](#type-c-update-trade) |
| record | [`chained-subcommand-data`](#type-chained-subcommand-data) |
| record | [`chained-subcommand-relationship`](#type-chained-subcommand-relationship) |
| record | [`client-data`](#type-client-data) |
| variant | [`clientbound-packet`](#type-clientbound-packet) |
| record | [`command-data`](#type-command-data) |
| record | [`command-origin-data`](#type-command-origin-data) |
| enum | [`command-permission-level`](#type-command-permission-level) |
| record | [`constrained-value-data`](#type-constrained-value-data) |
| enum | [`container-name`](#type-container-name) |
| enum | [`creative-category`](#type-creative-category) |
| record | [`creative-group-info-payload`](#type-creative-group-info-payload) |
| record | [`creative-item-entry-payload`](#type-creative-item-entry-payload) |
| record | [`enum-data`](#type-enum-data) |
| record | [`experiment-toggle`](#type-experiment-toggle) |
| record | [`experiments`](#type-experiments) |
| record | [`full-container-name`](#type-full-container-name) |
| enum | [`game-publish-setting`](#type-game-publish-setting) |
| record | [`game-rule`](#type-game-rule) |
| enum | [`game-type`](#type-game-type) |
| record | [`gathering-join-info`](#type-gathering-join-info) |
| record | [`gg`](#type-gg) |
| enum | [`hand-slot`](#type-hand-slot) |
| enum | [`input-data`](#type-input-data) |
| enum | [`input-mode`](#type-input-mode) |
| enum | [`interaction-model`](#type-interaction-model) |
| record | [`inventory-action`](#type-inventory-action) |
| variant | [`inventory-action-source`](#type-inventory-action-source) |
| record | [`item-data`](#type-item-data) |
| record | [`item-descriptor-count`](#type-item-descriptor-count) |
| record | [`item-stack-request`](#type-item-stack-request) |
| variant | [`item-stack-request-action`](#type-item-stack-request-action) |
| record | [`item-stack-request-action-beacon-payment`](#type-item-stack-request-action-beacon-payment) |
| record | [`item-stack-request-action-consume`](#type-item-stack-request-action-consume) |
| record | [`item-stack-request-action-craft-creative`](#type-item-stack-request-action-craft-creative) |
| record | [`item-stack-request-action-craft-recipe`](#type-item-stack-request-action-craft-recipe) |
| record | [`item-stack-request-action-craft-recipe-auto`](#type-item-stack-request-action-craft-recipe-auto) |
| record | [`item-stack-request-action-craft-results-deprecated`](#type-item-stack-request-action-craft-results-deprecated) |
| record | [`item-stack-request-action-create`](#type-item-stack-request-action-create) |
| record | [`item-stack-request-action-destroy`](#type-item-stack-request-action-destroy) |
| record | [`item-stack-request-action-drop`](#type-item-stack-request-action-drop) |
| record | [`item-stack-request-action-grindstone`](#type-item-stack-request-action-grindstone) |
| record | [`item-stack-request-action-loom`](#type-item-stack-request-action-loom) |
| record | [`item-stack-request-action-mine-block`](#type-item-stack-request-action-mine-block) |
| record | [`item-stack-request-action-optional`](#type-item-stack-request-action-optional) |
| record | [`item-stack-request-action-place`](#type-item-stack-request-action-place) |
| record | [`item-stack-request-action-swap`](#type-item-stack-request-action-swap) |
| record | [`item-stack-request-action-take`](#type-item-stack-request-action-take) |
| record | [`item-stack-request-slot-info`](#type-item-stack-request-slot-info) |
| record | [`item-stack-response-container-info`](#type-item-stack-response-container-info) |
| record | [`item-stack-response-info`](#type-item-stack-response-info) |
| record | [`item-stack-response-slot-info`](#type-item-stack-response-slot-info) |
| record | [`item-stack-wrapper`](#type-item-stack-wrapper) |
| record | [`legacy-set-item-slot`](#type-legacy-set-item-slot) |
| enum | [`level-event`](#type-level-event) |
| record | [`level-settings`](#type-level-settings) |
| enum | [`loading-screen-packet-type`](#type-loading-screen-packet-type) |
| variant | [`metadata-value`](#type-metadata-value) |
| record | [`missing-blob-data`](#type-missing-blob-data) |
| record | [`network-item-descriptor`](#type-network-item-descriptor) |
| record | [`network-item-stack`](#type-network-item-stack) |
| record | [`network-item-stack-descriptor`](#type-network-item-stack-descriptor) |
| record | [`overload-data`](#type-overload-data) |
| record | [`pack-id-version`](#type-pack-id-version) |
| record | [`pack-info-data`](#type-pack-info-data) |
| record | [`pack-instance-id`](#type-pack-instance-id) |
| record | [`param-data`](#type-param-data) |
| record | [`persona-piece`](#type-persona-piece) |
| record | [`persona-piece-tint-colour`](#type-persona-piece-tint-colour) |
| record | [`piece-tint-color`](#type-piece-tint-color) |
| enum | [`play-mode`](#type-play-mode) |
| enum | [`player-action-type`](#type-player-action-type) |
| record | [`player-block-action`](#type-player-block-action) |
| record | [`player-inventory-action`](#type-player-inventory-action) |
| record | [`player-list-entry`](#type-player-list-entry) |
| enum | [`player-permission-level`](#type-player-permission-level) |
| record | [`player-use-item-transaction-data`](#type-player-use-item-transaction-data) |
| record | [`presence-info`](#type-presence-info) |
| record | [`property-sync-data`](#type-property-sync-data) |
| variant | [`recipe-item-descriptor`](#type-recipe-item-descriptor) |
| record | [`recipe-item-descriptor-item`](#type-recipe-item-descriptor-item) |
| record | [`recipe-unlock-requirement`](#type-recipe-unlock-requirement) |
| record | [`release-item-transaction-data`](#type-release-item-transaction-data) |
| enum | [`respawn-state`](#type-respawn-state) |
| enum | [`rule-value`](#type-rule-value) |
| record | [`s-actor-event`](#type-s-actor-event) |
| record | [`s-animate`](#type-s-animate) |
| record | [`s-block-pick-request`](#type-s-block-pick-request) |
| record | [`s-client-cache-blob-status`](#type-s-client-cache-blob-status) |
| record | [`s-client-cache-status`](#type-s-client-cache-status) |
| record | [`s-command-request`](#type-s-command-request) |
| record | [`s-container-close`](#type-s-container-close) |
| record | [`s-emote`](#type-s-emote) |
| record | [`s-emote-list`](#type-s-emote-list) |
| record | [`s-interact`](#type-s-interact) |
| record | [`s-inventory-transaction`](#type-s-inventory-transaction) |
| record | [`s-item-stack-request`](#type-s-item-stack-request) |
| record | [`s-loading-screen`](#type-s-loading-screen) |
| record | [`s-login`](#type-s-login) |
| record | [`s-mob-equipment`](#type-s-mob-equipment) |
| record | [`s-modal-form-response`](#type-s-modal-form-response) |
| record | [`s-packet-violation-warning`](#type-s-packet-violation-warning) |
| record | [`s-player-action`](#type-s-player-action) |
| record | [`s-player-auth-input`](#type-s-player-auth-input) |
| record | [`s-player-hotbar`](#type-s-player-hotbar) |
| record | [`s-request-ability`](#type-s-request-ability) |
| record | [`s-request-chunk-radius`](#type-s-request-chunk-radius) |
| record | [`s-request-network-settings`](#type-s-request-network-settings) |
| record | [`s-resource-pack-client-response`](#type-s-resource-pack-client-response) |
| record | [`s-respawn`](#type-s-respawn) |
| record | [`s-set-local-player-as-initialized`](#type-s-set-local-player-as-initialized) |
| record | [`s-set-player-inventory-options`](#type-s-set-player-inventory-options) |
| record | [`s-text`](#type-s-text) |
| record | [`score-entry`](#type-score-entry) |
| record | [`serialized-abilities-data`](#type-serialized-abilities-data) |
| record | [`serialized-abilities-data-serialized-layer`](#type-serialized-abilities-data-serialized-layer) |
| record | [`server-join-information`](#type-server-join-information) |
| record | [`server-telemetry-data`](#type-server-telemetry-data) |
| variant | [`serverbound-packet`](#type-serverbound-packet) |
| record | [`skin`](#type-skin) |
| record | [`skin-animation`](#type-skin-animation) |
| record | [`soft-enum-data`](#type-soft-enum-data) |
| enum | [`spawn-position-type`](#type-spawn-position-type) |
| record | [`stack-request-item`](#type-stack-request-item) |
| record | [`store-entry-point-info`](#type-store-entry-point-info) |
| record | [`synced-attribute`](#type-synced-attribute) |
| enum | [`text-packet-type`](#type-text-packet-type) |
| enum | [`title-type`](#type-title-type) |
| variant | [`transaction-data`](#type-transaction-data) |
| record | [`use-item-on-entity-transaction-data`](#type-use-item-on-entity-transaction-data) |
| record | [`use-item-transaction-data`](#type-use-item-transaction-data) |

## Type Details

### `s-actor-event` {#type-s-actor-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-runtime-id` | `s64` |
| `event-id` | `actor-event-id` |
| `data` | `s32` |
| `fire-at-position` | `option<tuple<f64, f64, f64>>` |

### `actor-event-id` {#type-actor-event-id}

**Enum cases**

| Name |
| --- |
| `none` |
| `jump` |
| `hurt` |
| `death` |
| `start-attacking` |
| `stop-attacking` |
| `taming-failed` |
| `taming-succeeded` |
| `shake-wetness` |
| `eat-grass` |
| `fishhook-bubble` |
| `fishhook-fish-pos` |
| `fishhook-hook-time` |
| `fishhook-tease` |
| `squid-fleeing` |
| `zombie-converting` |
| `play-ambient` |
| `spawn-alive` |
| `start-offer-flower` |
| `stop-offer-flower` |
| `love-hearts` |
| `villager-angry` |
| `villager-happy` |
| `witch-hat-magic` |
| `fireworks-explode` |
| `in-love-hearts` |
| `silverfish-merge-animation` |
| `guardian-attack-sound` |
| `drink-potion` |
| `throw-potion` |
| `prime-tnt-cart` |
| `prime-creeper` |
| `air-supply` |
| `deprecated-add-player-levels` |
| `guardian-mining-fatigue` |
| `agent-swing-arm` |
| `dragon-start-death-anim` |
| `ground-dust` |
| `shake` |
| `feed` |
| `baby-age` |
| `instant-death` |
| `notify-trade` |
| `leash-destroyed` |
| `caravan-updated` |
| `talisman-activate` |
| `deprecated-update-structure-feature` |
| `player-spawned-mob` |
| `puke` |
| `update-stack-size` |
| `start-swimming` |
| `balloon-pop` |
| `treasure-hunt` |
| `summon-agent` |
| `finished-charging-item` |
| `actor-grow-up` |
| `vibration-detected` |
| `drink-milk` |
| `shake-wetness-stop` |
| `kinetic-damage-dealt` |
| `hurt-without-receiving-damage` |

### `animate-action` {#type-animate-action}

**Enum cases**

| Name |
| --- |
| `no-action` |
| `swing-arm` |
| `wake-up` |
| `critical-hit` |
| `magic-critical-hit` |

### `actor-swing-source` {#type-actor-swing-source}

**Enum cases**

| Name |
| --- |
| `none` |
| `build` |
| `mine` |
| `interact` |
| `attack` |
| `use-item` |
| `throw-item` |
| `drop-item` |
| `event` |

### `s-animate` {#type-s-animate}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action` | `animate-action` |
| `target-actor-runtime-id` | `s64` |
| `data` | `f32` |
| `swing-source` | `option<actor-swing-source>` |

### `s-block-pick-request` {#type-s-block-pick-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `position` | `tuple<s32, s32, s32>` |
| `with-data` | `bool` |
| `max-slots` | `u8` |

### `s-client-cache-blob-status` {#type-s-client-cache-blob-status}

**Record fields**

| Name | WIT type |
| --- | --- |
| `miss-hashes` | `list<s64>` |
| `hit-hashes` | `list<s64>` |

### `s-client-cache-status` {#type-s-client-cache-status}

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-cache-supported` | `bool` |

### `s-command-request` {#type-s-command-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `command` | `string` |
| `origin` | `command-origin-data` |
| `is-internal` | `bool` |
| `version` | `string` |

### `command-origin-data` {#type-command-origin-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `r-type` | `string` |
| `uuid` | `uuid` |
| `request-id` | `string` |
| `player-id` | `s64` |

### `s-container-close` {#type-s-container-close}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-id` | `u8` |
| `container-type` | `u8` |
| `server-initiated-close` | `bool` |

### `s-emote` {#type-s-emote}

**Record fields**

| Name | WIT type |
| --- | --- |
| `actor-runtime-id` | `s64` |
| `emote-id` | `string` |
| `emote-length-ticks` | `s32` |
| `xuid` | `string` |
| `platform-id` | `string` |
| `%flags` | `u8` |

### `s-emote-list` {#type-s-emote-list}

**Record fields**

| Name | WIT type |
| --- | --- |
| `runtime-id` | `s64` |
| `emote-piece-ids` | `list<uuid>` |

### `s-interact` {#type-s-interact}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action` | `action` |
| `target-runtime-id` | `s64` |
| `position` | `option<tuple<f64, f64, f64>>` |

### `action` {#type-action}

**Enum cases**

| Name |
| --- |
| `invalid` |
| `stop-riding` |
| `interact-update` |
| `npc-open` |
| `open-inventory` |

### `inventory-action-source` {#type-inventory-action-source}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `container` |  |
| `%world` |  |
| `creative` |  |
| `todo` |  |
| `unknown` | `s32` |

### `transaction-data` {#type-transaction-data}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `normal` | `string` |
| `mismatch` | `string` |
| `use-item` | `use-item-transaction-data` |
| `use-item-on-entity` | `use-item-on-entity-transaction-data` |
| `release-item` | `release-item-transaction-data` |

### `legacy-set-item-slot` {#type-legacy-set-item-slot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-id` | `u8` |
| `slots` | `list<u8>` |

### `inventory-action` {#type-inventory-action}

**Record fields**

| Name | WIT type |
| --- | --- |
| `source-type` | `s32` |
| `window-id` | `option<s32>` |
| `source-flags` | `option<s32>` |
| `inventory-slot` | `s32` |
| `old-item` | `network-item-descriptor` |
| `new-item` | `network-item-descriptor` |

### `hand-slot` {#type-hand-slot}

**Enum cases**

| Name |
| --- |
| `mainhand` |
| `offhand` |

### `use-item-transaction-data` {#type-use-item-transaction-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action-type` | `s32` |
| `trigger-type` | `u8` |
| `block-position` | `tuple<s32, s32, s32>` |
| `block-face` | `u8` |
| `hot-bar-slot` | `s32` |
| `hand` | `hand-slot` |
| `item-in-hand` | `network-item-descriptor` |
| `player-position` | `tuple<f64, f64, f64>` |
| `click-position` | `tuple<f64, f64, f64>` |
| `block-runtime-id` | `s32` |
| `client-prediction` | `u8` |
| `client-cooldown-state` | `u8` |

### `use-item-on-entity-transaction-data` {#type-use-item-on-entity-transaction-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-entity-runtime-id` | `s64` |
| `action-type` | `s32` |
| `hot-bar-slot` | `s32` |
| `item-in-hand` | `network-item-descriptor` |
| `player-position` | `tuple<f64, f64, f64>` |
| `click-position` | `tuple<f64, f64, f64>` |

### `release-item-transaction-data` {#type-release-item-transaction-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action-type` | `s32` |
| `hot-bar-slot` | `s32` |
| `item-in-hand` | `network-item-descriptor` |
| `head-position` | `tuple<f64, f64, f64>` |

### `s-inventory-transaction` {#type-s-inventory-transaction}

**Record fields**

| Name | WIT type |
| --- | --- |
| `legacy-request-id` | `s32` |
| `legacy-set-item-slots` | `list<legacy-set-item-slot>` |
| `has-value` | `bool` |
| `actions` | `list<inventory-action>` |
| `transaction-type` | `s32` |
| `transaction-data` | `transaction-data` |

### `item-stack-request-slot-info` {#type-item-stack-request-slot-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-name` | `full-container-name` |
| `slot-id` | `u8` |
| `stack-id` | `s32` |

### `stack-request-item` {#type-stack-request-item}

**Record fields**

| Name | WIT type |
| --- | --- |
| `identifier` | `option<string>` |
| `metadata-value` | `s32` |
| `count` | `s32` |
| `block-runtime-id` | `s32` |
| `extra-data` | `list<u8>` |

### `item-stack-request-action-take` {#type-item-stack-request-action-take}

**Record fields**

| Name | WIT type |
| --- | --- |
| `count` | `u8` |
| `source` | `item-stack-request-slot-info` |
| `destination` | `item-stack-request-slot-info` |

### `item-stack-request-action-place` {#type-item-stack-request-action-place}

**Record fields**

| Name | WIT type |
| --- | --- |
| `count` | `u8` |
| `source` | `item-stack-request-slot-info` |
| `destination` | `item-stack-request-slot-info` |

### `item-stack-request-action-swap` {#type-item-stack-request-action-swap}

**Record fields**

| Name | WIT type |
| --- | --- |
| `slot1` | `item-stack-request-slot-info` |
| `slot2` | `item-stack-request-slot-info` |

### `item-stack-request-action-drop` {#type-item-stack-request-action-drop}

**Record fields**

| Name | WIT type |
| --- | --- |
| `count` | `u8` |
| `source` | `item-stack-request-slot-info` |
| `randomly` | `bool` |

### `item-stack-request-action-destroy` {#type-item-stack-request-action-destroy}

**Record fields**

| Name | WIT type |
| --- | --- |
| `count` | `u8` |
| `source` | `item-stack-request-slot-info` |

### `item-stack-request-action-consume` {#type-item-stack-request-action-consume}

**Record fields**

| Name | WIT type |
| --- | --- |
| `count` | `u8` |
| `source` | `item-stack-request-slot-info` |

### `item-stack-request-action-create` {#type-item-stack-request-action-create}

**Record fields**

| Name | WIT type |
| --- | --- |
| `result-index` | `u8` |

### `item-stack-request-action-beacon-payment` {#type-item-stack-request-action-beacon-payment}

**Record fields**

| Name | WIT type |
| --- | --- |
| `primary-effect-id` | `s32` |
| `secondary-effect-id` | `s32` |

### `item-stack-request-action-mine-block` {#type-item-stack-request-action-mine-block}

**Record fields**

| Name | WIT type |
| --- | --- |
| `hotbar-slot` | `s32` |
| `predicted-durability` | `s32` |
| `stack-id` | `s32` |

### `item-stack-request-action-craft-recipe` {#type-item-stack-request-action-craft-recipe}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipe-id` | `s32` |
| `repetitions` | `u8` |

### `item-stack-request-action-craft-recipe-auto` {#type-item-stack-request-action-craft-recipe-auto}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipe-id` | `s32` |
| `repetitions` | `u8` |

### `item-stack-request-action-craft-creative` {#type-item-stack-request-action-craft-creative}

**Record fields**

| Name | WIT type |
| --- | --- |
| `creative-item-id` | `s32` |
| `repetitions` | `u8` |

### `item-stack-request-action-optional` {#type-item-stack-request-action-optional}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipe-id` | `s32` |
| `filter-string-index` | `s32` |

### `item-stack-request-action-grindstone` {#type-item-stack-request-action-grindstone}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipe-id` | `s32` |
| `repair-cost` | `s32` |
| `repetitions` | `u8` |

### `item-stack-request-action-loom` {#type-item-stack-request-action-loom}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pattern-id` | `string` |
| `repetitions` | `u8` |

### `item-stack-request-action-craft-results-deprecated` {#type-item-stack-request-action-craft-results-deprecated}

**Record fields**

| Name | WIT type |
| --- | --- |
| `result-items` | `list<stack-request-item>` |
| `times-crafted` | `u8` |

### `item-stack-request-action` {#type-item-stack-request-action}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `take` | `item-stack-request-action-take` |
| `place` | `item-stack-request-action-place` |
| `swap` | `item-stack-request-action-swap` |
| `drop` | `item-stack-request-action-drop` |
| `destroy` | `item-stack-request-action-destroy` |
| `consume` | `item-stack-request-action-consume` |
| `create` | `item-stack-request-action-create` |
| `lab-table-combine` |  |
| `beacon-payment` | `item-stack-request-action-beacon-payment` |
| `mine-block` | `item-stack-request-action-mine-block` |
| `craft-recipe` | `item-stack-request-action-craft-recipe` |
| `craft-recipe-auto` | `item-stack-request-action-craft-recipe-auto` |
| `craft-creative` | `item-stack-request-action-craft-creative` |
| `optional` | `item-stack-request-action-optional` |
| `grindstone` | `item-stack-request-action-grindstone` |
| `loom` | `item-stack-request-action-loom` |
| `craft-non-implemented` |  |
| `craft-results-deprecated` | `item-stack-request-action-craft-results-deprecated` |

### `item-stack-request` {#type-item-stack-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `request-id` | `s32` |
| `actions` | `list<item-stack-request-action>` |
| `filter-strings` | `list<string>` |
| `filter-cause` | `s32` |

### `s-item-stack-request` {#type-s-item-stack-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `requests` | `list<item-stack-request>` |

### `s-loading-screen` {#type-s-loading-screen}

**Record fields**

| Name | WIT type |
| --- | --- |
| `loading-screen-packet-type` | `loading-screen-packet-type` |
| `loading-screen-id` | `option<s32>` |

### `loading-screen-packet-type` {#type-loading-screen-packet-type}

**Enum cases**

| Name |
| --- |
| `start-loading-screen` |
| `end-loading-screen` |

### `s-login` {#type-s-login}

**Record fields**

| Name | WIT type |
| --- | --- |
| `protocol-version` | `s32` |
| `jwt` | `list<u8>` |
| `raw-token` | `list<u8>` |

### `skin-animation` {#type-skin-animation}

**Record fields**

| Name | WIT type |
| --- | --- |
| `frames` | `f64` |
| `image` | `string` |
| `image-height` | `s32` |
| `image-width` | `s32` |
| `animation-type` | `s32` |
| `animation-expression` | `s32` |

### `persona-piece` {#type-persona-piece}

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-default` | `bool` |
| `pack-id` | `string` |
| `piece-id` | `string` |
| `piece-type` | `string` |
| `product-id` | `string` |

### `persona-piece-tint-colour` {#type-persona-piece-tint-colour}

**Record fields**

| Name | WIT type |
| --- | --- |
| `colours` | `list<string>` |
| `piece-type` | `string` |

### `client-data` {#type-client-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `client-random-id` | `s64` |
| `device-os` | `s32` |
| `device-id` | `string` |
| `game-version` | `string` |
| `language-code` | `string` |
| `current-input-mode` | `s32` |
| `default-input-mode` | `s32` |
| `ui-profile` | `s32` |
| `server-address` | `string` |
| `device-model` | `string` |
| `gui-scale` | `s32` |
| `client-is-editor-capable` | `bool` |
| `client-editor-connection-intent` | `s32` |
| `max-view-distance` | `s32` |
| `memory-tier` | `s32` |
| `platform-type` | `s32` |
| `graphics-mode` | `s32` |
| `compatible-with-client-side-chunk-gen` | `bool` |
| `platform-offline-id` | `string` |
| `platform-online-id` | `string` |
| `platform-user-id` | `string` |
| `self-signed-id` | `string` |
| `play-fab-id` | `string` |
| `third-party-name` | `string` |
| `third-party-name-only` | `bool` |
| `skin-id` | `string` |
| `skin-data` | `string` |
| `skin-image-height` | `s32` |
| `skin-image-width` | `s32` |
| `skin-colour` | `string` |
| `arm-size` | `string` |
| `persona-skin` | `bool` |
| `premium-skin` | `bool` |
| `trusted-skin` | `bool` |
| `override-skin` | `bool` |
| `cape-data` | `string` |
| `cape-id` | `string` |
| `cape-image-height` | `s32` |
| `cape-image-width` | `s32` |
| `cape-on-classic-skin` | `bool` |
| `skin-geometry` | `string` |
| `skin-geometry-version` | `string` |
| `skin-resource-patch` | `string` |
| `animated-image-data` | `list<skin-animation>` |
| `skin-animation-data` | `string` |
| `persona-pieces` | `list<persona-piece>` |
| `piece-tint-colours` | `list<persona-piece-tint-colour>` |

### `s-mob-equipment` {#type-s-mob-equipment}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-runtime-id` | `s64` |
| `item` | `network-item-stack-descriptor` |
| `slot` | `u8` |
| `selected-slot` | `u8` |
| `container-id` | `u8` |

### `s-modal-form-response` {#type-s-modal-form-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `form-id` | `s32` |
| `json-response` | `option<string>` |
| `form-cancel-reason` | `option<u8>` |

### `s-packet-violation-warning` {#type-s-packet-violation-warning}

**Record fields**

| Name | WIT type |
| --- | --- |
| `violation-type` | `s32` |
| `violation-severity` | `s32` |
| `violation-packet-id` | `s32` |
| `violation-context` | `string` |

### `s-player-action` {#type-s-player-action}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-runtime-id` | `s64` |
| `action` | `player-action-type` |
| `block-position` | `tuple<s32, s32, s32>` |
| `result-pos` | `tuple<s32, s32, s32>` |
| `face` | `s32` |

### `player-action-type` {#type-player-action-type}

**Enum cases**

| Name |
| --- |
| `unknown` |
| `start-destroy-block` |
| `abort-destroy-block` |
| `stop-destroy-block` |
| `get-updated-block` |
| `drop-item` |
| `start-sleeping` |
| `stop-sleeping` |
| `respawn` |
| `start-jump` |
| `start-sprinting` |
| `stop-sprinting` |
| `start-sneaking` |
| `stop-sneaking` |
| `creative-destroy-block` |
| `change-dimension-ack` |
| `start-gliding` |
| `stop-gliding` |
| `deny-destroy-block` |
| `crack-block` |
| `change-skin` |
| `updated-enchanting-seed` |
| `start-swimming` |
| `stop-swimming` |
| `start-spin-attack` |
| `stop-spin-attack` |
| `interact-with-block` |
| `predict-destroy-block` |
| `continue-destroy-block` |
| `start-item-use-on` |
| `stop-item-use-on` |
| `handled-teleport` |
| `missed-swing` |
| `start-crawling` |
| `stop-crawling` |
| `start-flying` |
| `stop-flying` |
| `client-ack-server-data` |
| `start-using-item` |
| `internal-update` |
| `count` |

### `s-player-auth-input` {#type-s-player-auth-input}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pitch` | `f32` |
| `yaw` | `f32` |
| `position` | `tuple<f64, f64, f64>` |
| `move-vec` | `tuple<f64, f64>` |
| `head-yaw` | `f32` |
| `input-data` | `list<s64>` |
| `input-mode` | `s32` |
| `play-mode` | `s32` |
| `interaction-model` | `s32` |
| `interact-pitch` | `f32` |
| `interact-yaw` | `f32` |
| `tick` | `s64` |
| `delta` | `tuple<f64, f64, f64>` |
| `block-actions` | `option<list<player-block-action>>` |
| `item-interaction` | `option<player-inventory-action>` |
| `item-stack-request` | `option<item-stack-request>` |
| `vehicle-rotation` | `option<tuple<f64, f64>>` |
| `vehicle-unique-id` | `option<s64>` |
| `analog-move` | `tuple<f64, f64>` |
| `camera-orientation` | `tuple<f64, f64, f64>` |
| `raw-move` | `tuple<f64, f64>` |

### `player-inventory-action` {#type-player-inventory-action}

**Record fields**

| Name | WIT type |
| --- | --- |
| `legacy-request-id` | `s32` |
| `legacy-slots` | `list<legacy-set-item-slot>` |
| `actions` | `list<inventory-action>` |
| `transaction` | `player-use-item-transaction-data` |

### `player-use-item-transaction-data` {#type-player-use-item-transaction-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action-type` | `s32` |
| `trigger-type` | `u8` |
| `block-position` | `tuple<s32, s32, s32>` |
| `block-face` | `u8` |
| `hot-bar-slot` | `s32` |
| `item-in-hand` | `network-item-descriptor` |
| `player-position` | `tuple<f64, f64, f64>` |
| `click-position` | `tuple<f64, f64, f64>` |
| `block-runtime-id` | `s32` |
| `client-prediction` | `u8` |
| `client-cooldown-state` | `u8` |

### `player-block-action` {#type-player-block-action}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action` | `s32` |
| `block-pos` | `tuple<s32, s32, s32>` |
| `face` | `s32` |

### `input-mode` {#type-input-mode}

**Enum cases**

| Name |
| --- |
| `mouse` |
| `touch` |
| `game-pad` |
| `motion-controller` |

### `play-mode` {#type-play-mode}

**Enum cases**

| Name |
| --- |
| `normal` |
| `teaser` |
| `screen` |
| `exit-level` |
| `num-modes` |

### `interaction-model` {#type-interaction-model}

**Enum cases**

| Name |
| --- |
| `touch` |
| `crosshair` |
| `classic` |

### `input-data` {#type-input-data}

**Enum cases**

| Name |
| --- |
| `ascend` |
| `descend` |
| `north-jump` |
| `jump-down` |
| `sprint-down` |
| `change-height` |
| `jumping` |
| `auto-jumping-in-water` |
| `sneaking` |
| `sneak-down` |
| `up` |
| `down` |
| `left` |
| `right` |
| `up-left` |
| `up-right` |
| `want-up` |
| `want-down` |
| `want-down-slow` |
| `want-up-slow` |
| `sprinting` |
| `ascend-block` |
| `descend-block` |
| `sneak-toggle-down` |
| `persist-sneak` |
| `start-sprinting` |
| `stop-sprinting` |
| `start-sneaking` |
| `stop-sneaking` |
| `start-swimming` |
| `stop-swimming` |
| `start-jumping` |
| `start-gliding` |
| `stop-gliding` |
| `perform-item-interaction` |
| `perform-block-actions` |
| `perform-item-stack-request` |
| `handled-teleport` |
| `emoting` |
| `missed-swing` |
| `start-crawling` |
| `stop-crawling` |
| `start-flying` |
| `stop-flying` |
| `client-ack-server-data` |
| `client-predicted-vehicle` |
| `paddling-left` |
| `paddling-right` |
| `block-breaking-delay-enabled` |
| `horizontal-collision` |
| `vertical-collision` |
| `down-left` |
| `down-right` |
| `start-using-item` |
| `camera-relative-movement-enabled` |
| `rot-controlled-by-move-direction` |
| `start-spin-attack` |
| `stop-spin-attack` |
| `is-hotbar-touch-only` |
| `jump-released-raw` |
| `jump-pressed-raw` |
| `jump-current-raw` |
| `sneak-released-raw` |
| `sneak-pressed-raw` |
| `sneak-current-raw` |
| `internal-update` |

### `s-player-hotbar` {#type-s-player-hotbar}

**Record fields**

| Name | WIT type |
| --- | --- |
| `selected-slot` | `s32` |
| `container-id` | `u8` |
| `should-select-slot` | `bool` |

### `ability-value` {#type-ability-value}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `%bool` | `bool` |
| `float` | `f32` |

### `s-request-ability` {#type-s-request-ability}

**Record fields**

| Name | WIT type |
| --- | --- |
| `ability` | `s32` |
| `value` | `ability-value` |

### `s-request-chunk-radius` {#type-s-request-chunk-radius}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-radius` | `s32` |
| `max-chunk-radius` | `u8` |

### `s-request-network-settings` {#type-s-request-network-settings}

**Record fields**

| Name | WIT type |
| --- | --- |
| `client-network-version` | `s32` |

### `s-resource-pack-client-response` {#type-s-resource-pack-client-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `response` | `u8` |
| `download-size` | `s32` |
| `pack-ids` | `list<string>` |

### `s-respawn` {#type-s-respawn}

**Record fields**

| Name | WIT type |
| --- | --- |
| `position` | `tuple<f64, f64, f64>` |
| `state` | `respawn-state` |
| `player-runtime-id` | `s64` |

### `respawn-state` {#type-respawn-state}

**Enum cases**

| Name |
| --- |
| `searching-for-spawn` |
| `ready-to-spawn` |
| `client-ready-to-spawn` |

### `s-set-local-player-as-initialized` {#type-s-set-local-player-as-initialized}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-id` | `s64` |

### `s-set-player-inventory-options` {#type-s-set-player-inventory-options}

**Record fields**

| Name | WIT type |
| --- | --- |
| `left-inventory-tab` | `s32` |
| `right-inventory-tab` | `s32` |
| `filtering` | `bool` |
| `layout-inv` | `s32` |
| `layout-craft` | `s32` |

### `s-text` {#type-s-text}

**Record fields**

| Name | WIT type |
| --- | --- |
| `needs-translation` | `bool` |
| `r-type` | `text-packet-type` |
| `source-name` | `string` |
| `message` | `string` |
| `parameters` | `list<string>` |
| `xuid` | `string` |
| `platform-chat-id` | `string` |
| `filtered-message` | `option<string>` |

### `text-packet-type` {#type-text-packet-type}

**Enum cases**

| Name |
| --- |
| `raw` |
| `chat` |
| `translation` |
| `popup` |
| `jukebox-popup` |
| `tip` |
| `system` |
| `whisper` |
| `announcement` |
| `json-whisper` |
| `json` |
| `json-announcement` |

### `c-add-actor` {#type-c-add-actor}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-actor-id` | `s64` |
| `target-runtime-id` | `s64` |
| `actor-type` | `string` |
| `position` | `tuple<f64, f64, f64>` |
| `velocity` | `tuple<f64, f64, f64>` |
| `rotation` | `tuple<f64, f64>` |
| `y-head-rotation` | `f32` |
| `y-body-rotation` | `f32` |
| `attributes-list` | `list<synced-attribute>` |
| `actor-data` | `string` |
| `synced-properties` | `property-sync-data` |
| `actor-links` | `list<actor-link>` |

### `synced-attribute` {#type-synced-attribute}

**Record fields**

| Name | WIT type |
| --- | --- |
| `attribute-name` | `string` |
| `min-value` | `f32` |
| `current-value` | `f32` |
| `max-value` | `f32` |

### `c-add-item-actor` {#type-c-add-item-actor}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-actor-id` | `s64` |
| `target-runtime-id` | `s64` |
| `item` | `item-stack-wrapper` |
| `position` | `tuple<f64, f64, f64>` |
| `velocity` | `tuple<f64, f64, f64>` |
| `entity-data` | `string` |
| `is-from-fishing` | `bool` |

### `c-add-player` {#type-c-add-player}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `player-name` | `string` |
| `target-runtime-id` | `s64` |
| `platform-chat-id` | `string` |
| `position` | `tuple<f64, f64, f64>` |
| `velocity` | `tuple<f64, f64, f64>` |
| `rotation` | `tuple<f64, f64>` |
| `y-head-rotation` | `f32` |
| `carried-item` | `network-item-stack-descriptor` |
| `player-game-type` | `game-type` |
| `entity-data` | `string` |
| `synced-properties` | `property-sync-data` |
| `abilities-data` | `serialized-abilities-data` |
| `actor-links` | `list<actor-link>` |
| `device-id` | `string` |
| `build-platform` | `build-platform` |

### `c-available-commands` {#type-c-available-commands}

**Record fields**

| Name | WIT type |
| --- | --- |
| `enum-values` | `list<string>` |
| `chained-subcommand-values` | `list<string>` |
| `post-fixes` | `list<string>` |
| `enum-data` | `list<enum-data>` |
| `chained-subcommand-data` | `list<chained-subcommand-data>` |
| `commands` | `list<command-data>` |
| `soft-enums` | `list<soft-enum-data>` |
| `constraints` | `list<constrained-value-data>` |

### `enum-data` {#type-enum-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `values` | `list<s32>` |

### `chained-subcommand-data` {#type-chained-subcommand-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `subcommand-values` | `list<chained-subcommand-relationship>` |

### `chained-subcommand-relationship` {#type-chained-subcommand-relationship}

**Record fields**

| Name | WIT type |
| --- | --- |
| `index` | `s32` |
| `value` | `s32` |

### `command-data` {#type-command-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `description` | `string` |
| `%flags` | `s32` |
| `permission-level` | `command-permission-level` |
| `alias-enum` | `s32` |
| `command-data-chained-subcommand-indexes` | `list<s32>` |
| `overloads` | `list<overload-data>` |

### `overload-data` {#type-overload-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `is-chaining` | `bool` |
| `parameter-data` | `list<param-data>` |

### `param-data` {#type-param-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `parse-symbol` | `s32` |
| `is-optional` | `bool` |
| `options` | `u8` |

### `soft-enum-data` {#type-soft-enum-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `enum-name` | `string` |
| `enum-options` | `list<string>` |

### `constrained-value-data` {#type-constrained-value-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `enum-value-symbol` | `s32` |
| `enum-symbol` | `s32` |
| `constraint-indices` | `list<u8>` |

### `c-block-actor-data` {#type-c-block-actor-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-position` | `tuple<s32, s32, s32>` |
| `actor-data-tags` | `string` |

### `c-block-event` {#type-c-block-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-position` | `tuple<s32, s32, s32>` |
| `event-type` | `s32` |
| `event-value` | `s32` |

### `c-boss-event` {#type-c-boss-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `boss-entity-id` | `s64` |
| `event-type` | `u8` |
| `title` | `string` |
| `filtered-title` | `string` |
| `health-percentage` | `f32` |
| `color` | `u8` |
| `overlay` | `u8` |

### `c-change-dimension` {#type-c-change-dimension}

**Record fields**

| Name | WIT type |
| --- | --- |
| `dimension-id` | `s32` |
| `position` | `tuple<f64, f64, f64>` |
| `respawn` | `bool` |
| `loading-screen-id` | `option<s32>` |

### `c-chunk-radius-updated` {#type-c-chunk-radius-updated}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-radius` | `s32` |

### `missing-blob-data` {#type-missing-blob-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `blob-id` | `s64` |
| `blob-data` | `list<u8>` |

### `c-client-cache-miss-response` {#type-c-client-cache-miss-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `missing-blobs` | `list<missing-blob-data>` |

### `build-platform` {#type-build-platform}

**Enum cases**

| Name |
| --- |
| `unknown` |
| `google` |
| `ios` |
| `osx` |
| `amazon` |
| `gear-vr` |
| `uwp` |
| `win32` |
| `dedicated` |
| `tv-os` |
| `sony` |
| `nintendo` |
| `xbox` |
| `windows-phone` |
| `linux` |

### `game-type` {#type-game-type}

**Enum cases**

| Name |
| --- |
| `unknown` |
| `survival` |
| `creative` |
| `adventure` |
| `default` |
| `spectator` |

### `serialized-abilities-data` {#type-serialized-abilities-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-player-raw-id` | `s64` |
| `player-permissions` | `player-permission-level` |
| `command-permissions` | `command-permission-level` |
| `layers` | `list<serialized-abilities-data-serialized-layer>` |

### `player-permission-level` {#type-player-permission-level}

**Enum cases**

| Name |
| --- |
| `visitor` |
| `member` |
| `operator` |
| `custom` |

### `command-permission-level` {#type-command-permission-level}

**Enum cases**

| Name |
| --- |
| `any` |
| `game-directors` |
| `admin` |
| `host` |
| `owner` |
| `internal` |

### `serialized-abilities-data-serialized-layer` {#type-serialized-abilities-data-serialized-layer}

**Record fields**

| Name | WIT type |
| --- | --- |
| `serialized-layer` | `s32` |
| `abilities-set` | `s32` |
| `ability-value` | `s32` |
| `fly-speed` | `f32` |
| `vertical-fly-speed` | `f32` |
| `walk-speed` | `f32` |

### `actor-link` {#type-actor-link}

**Record fields**

| Name | WIT type |
| --- | --- |
| `ridden-unique-id` | `s64` |
| `rider-unique-id` | `s64` |
| `link-type` | `u8` |
| `immediate` | `bool` |
| `rider-initiated` | `bool` |
| `vehicle-angular-velocity` | `f32` |

### `c-container-open` {#type-c-container-open}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-id` | `u8` |
| `container-type` | `u8` |
| `position` | `tuple<s32, s32, s32>` |
| `target-entity-id` | `s64` |

### `c-correct-player-move-prediction` {#type-c-correct-player-move-prediction}

**Record fields**

| Name | WIT type |
| --- | --- |
| `prediction-type` | `u8` |
| `pos` | `tuple<f64, f64, f64>` |
| `pos-delta` | `tuple<f64, f64, f64>` |
| `rotation` | `tuple<f64, f64>` |
| `vehicle-angular-velocity` | `option<f32>` |
| `on-ground` | `bool` |
| `tick` | `s64` |

### `recipe-item-descriptor-item` {#type-recipe-item-descriptor-item}

**Record fields**

| Name | WIT type |
| --- | --- |
| `identifier` | `string` |
| `metadata-value` | `s32` |

### `recipe-item-descriptor` {#type-recipe-item-descriptor}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `empty` |  |
| `item` | `recipe-item-descriptor-item` |
| `tag` | `string` |

### `item-descriptor-count` {#type-item-descriptor-count}

**Record fields**

| Name | WIT type |
| --- | --- |
| `descriptor` | `recipe-item-descriptor` |
| `count` | `s32` |

### `recipe-unlock-requirement` {#type-recipe-unlock-requirement}

**Record fields**

| Name | WIT type |
| --- | --- |
| `context` | `s32` |

### `bedrock-shapeless-recipe` {#type-bedrock-shapeless-recipe}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipe-id` | `string` |
| `input` | `list<item-descriptor-count>` |
| `output` | `list<network-item-descriptor>` |
| `uuid` | `uuid` |
| `block` | `string` |
| `priority` | `s32` |
| `unlock-requirement` | `recipe-unlock-requirement` |
| `recipe-network-id` | `s32` |

### `bedrock-shaped-recipe` {#type-bedrock-shaped-recipe}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipe-id` | `string` |
| `width` | `s32` |
| `height` | `s32` |
| `input` | `list<item-descriptor-count>` |
| `output` | `list<network-item-descriptor>` |
| `uuid` | `uuid` |
| `block` | `string` |
| `priority` | `s32` |
| `assume-symmetry` | `bool` |
| `unlock-requirement` | `recipe-unlock-requirement` |
| `recipe-network-id` | `s32` |

### `bedrock-recipe` {#type-bedrock-recipe}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `shapeless` | `bedrock-shapeless-recipe` |
| `shaped` | `bedrock-shaped-recipe` |

### `c-crafting-data` {#type-c-crafting-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipes` | `list<bedrock-recipe>` |
| `clean-recipes` | `bool` |

### `c-creative-content` {#type-c-creative-content}

**Record fields**

| Name | WIT type |
| --- | --- |
| `groups` | `list<creative-group-info-payload>` |
| `entries` | `list<creative-item-entry-payload>` |

### `creative-category` {#type-creative-category}

**Enum cases**

| Name |
| --- |
| `all` |
| `construction` |
| `nature` |
| `equipment` |
| `items` |
| `item-command-only` |
| `undefined` |

### `creative-group-info-payload` {#type-creative-group-info-payload}

**Record fields**

| Name | WIT type |
| --- | --- |
| `creative-category` | `creative-category` |
| `name` | `string` |
| `group-icon-item` | `network-item-descriptor` |

### `creative-item-entry-payload` {#type-creative-item-entry-payload}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `item` | `network-item-descriptor` |
| `group-index` | `s32` |

### `c-disconnect` {#type-c-disconnect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `reason` | `s32` |
| `skip-message` | `bool` |
| `message` | `string` |
| `filtered-message` | `string` |

### `c-gamerules-changed` {#type-c-gamerules-changed}

**Record fields**

| Name | WIT type |
| --- | --- |
| `rule-data` | `list<game-rule>` |

### `game-rule` {#type-game-rule}

**Record fields**

| Name | WIT type |
| --- | --- |
| `rule-name` | `string` |
| `rule-can-be-modified` | `bool` |
| `rule-value` | `rule-value` |

### `rule-value` {#type-rule-value}

**Enum cases**

| Name |
| --- |
| `null` |

### `c-inventory-content` {#type-c-inventory-content}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-id` | `s32` |
| `slots` | `list<network-item-stack-descriptor>` |
| `full-container-name` | `full-container-name` |
| `storage-item` | `network-item-stack-descriptor` |

### `c-inventory-slot` {#type-c-inventory-slot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-id` | `s32` |
| `slot` | `s32` |
| `full-container-name` | `option<full-container-name>` |
| `storage-item` | `option<network-item-stack-descriptor>` |
| `item` | `network-item-stack-descriptor` |

### `c-item-registry` {#type-c-item-registry}

**Record fields**

| Name | WIT type |
| --- | --- |
| `items` | `list<item-data>` |

### `item-data` {#type-item-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `item-name` | `string` |
| `item-id` | `s32` |
| `is-component-based` | `bool` |
| `item-version` | `s32` |
| `component-data` | `list<u8>` |

### `item-stack-response-slot-info` {#type-item-stack-response-slot-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `requested-slot` | `u8` |
| `slot` | `u8` |
| `amount` | `u8` |
| `item-stack-net-id` | `s32` |
| `custom-name` | `string` |
| `filtered-custom-name` | `string` |
| `durability-correction` | `s32` |

### `item-stack-response-container-info` {#type-item-stack-response-container-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `full-container-name` | `full-container-name` |
| `slots` | `list<item-stack-response-slot-info>` |

### `item-stack-response-info` {#type-item-stack-response-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `%result` | `u8` |
| `client-request-id` | `s32` |
| `containers` | `list<item-stack-response-container-info>` |

### `c-item-stack-response` {#type-c-item-stack-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `responses` | `list<item-stack-response-info>` |

### `c-level-event` {#type-c-level-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `event-id` | `s32` |
| `position` | `tuple<f64, f64, f64>` |
| `data` | `s32` |

### `level-event` {#type-level-event}

**Enum cases**

| Name |
| --- |
| `particles-destroy-block` |
| `block-start-break` |
| `block-stop-break` |
| `block-update-break` |

### `c-level-sound-event` {#type-c-level-sound-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sound-event` | `string` |
| `position` | `tuple<f64, f64, f64>` |
| `data` | `s32` |
| `actor-identifier` | `string` |
| `is-baby` | `bool` |
| `is-global` | `bool` |
| `actor-unique-id` | `s64` |
| `fire-at-position` | `option<tuple<f64, f64, f64>>` |

### `c-mob-effect` {#type-c-mob-effect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-runtime-id` | `s64` |
| `event-id` | `u8` |
| `effect-id` | `s32` |
| `effect-amplifier` | `s32` |
| `show-particles` | `bool` |
| `effect-duration-ticks` | `s32` |
| `tick` | `s64` |
| `ambient` | `bool` |

### `c-mob-equipment` {#type-c-mob-equipment}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-runtime-id` | `s64` |
| `item` | `network-item-stack-descriptor` |
| `slot` | `u8` |
| `selected-slot` | `u8` |
| `container-id` | `u8` |

### `c-modal-form-request` {#type-c-modal-form-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `form-id` | `s32` |
| `form-ui-json` | `string` |

### `c-move-actor-absolute` {#type-c-move-actor-absolute}

**Record fields**

| Name | WIT type |
| --- | --- |
| `actor-runtime-id` | `s64` |
| `header` | `u8` |
| `position` | `tuple<f64, f64, f64>` |
| `rotation-x` | `u8` |
| `rotation-y` | `u8` |
| `rotation-y-head` | `u8` |

### `c-move-actor-delta` {#type-c-move-actor-delta}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-runtime-id` | `s64` |
| `%flags` | `s32` |
| `x` | `f32` |
| `y` | `f32` |
| `z` | `f32` |
| `pitch` | `u8` |
| `yaw` | `u8` |
| `head-yaw` | `u8` |
| `tick` | `s64` |

### `c-move-player` {#type-c-move-player}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-runtime-id` | `s64` |
| `position` | `tuple<f64, f64, f64>` |
| `pitch` | `f32` |
| `yaw` | `f32` |
| `head-yaw` | `f32` |
| `mode` | `u8` |
| `on-ground` | `bool` |
| `riding-runtime-id` | `s64` |
| `teleport-cause` | `s32` |
| `teleport-source-entity-type` | `s32` |
| `tick` | `s64` |

### `c-network-chunk-publisher-update` {#type-c-network-chunk-publisher-update}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos-for-view` | `tuple<s32, s32, s32>` |
| `new-radius` | `s32` |
| `server-build-chunk-list` | `list<tuple<f64, f64>>` |

### `c-network-settings` {#type-c-network-settings}

**Record fields**

| Name | WIT type |
| --- | --- |
| `compression-threshold` | `s32` |
| `compression-algorithm` | `s32` |
| `client-throttle-enabled` | `bool` |
| `client-throttle-threshold` | `u8` |
| `client-throttle-scalar` | `f32` |

### `c-play-status` {#type-c-play-status}

**Enum cases**

| Name |
| --- |
| `login-success` |
| `outdated-client` |
| `outdated-server` |
| `player-spawn` |
| `invalid-tenant` |
| `edition-mismatch-edu-to-vanilla` |
| `edition-mismatch-vanilla-to-edu` |
| `server-full-sub-client` |
| `editor-mismatch-editor-to-vanilla` |
| `editor-mismatch-vanilla-to-editor` |

### `c-player-hotbar` {#type-c-player-hotbar}

**Record fields**

| Name | WIT type |
| --- | --- |
| `selected-slot` | `s32` |
| `container-id` | `u8` |
| `should-select-slot` | `bool` |

### `c-player-list` {#type-c-player-list}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action` | `u8` |
| `entries` | `list<player-list-entry>` |

### `player-list-entry` {#type-player-list-entry}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `entity-unique-id` | `s64` |
| `username` | `string` |
| `xuid` | `string` |
| `platform-chat-id` | `string` |
| `build-platform` | `build-platform` |
| `skin` | `skin` |
| `is-teacher` | `bool` |
| `is-host` | `bool` |
| `is-sub-client` | `bool` |
| `player-color` | `list<u8>` |

### `skin` {#type-skin}

**Record fields**

| Name | WIT type |
| --- | --- |
| `skin-id` | `string` |
| `play-fab-id` | `string` |
| `resource-patch` | `list<u8>` |
| `image-width` | `s32` |
| `image-height` | `s32` |
| `skin-data` | `list<u8>` |
| `animations` | `list<skin-animation>` |
| `cape-width` | `s32` |
| `cape-height` | `s32` |
| `cape-data` | `list<u8>` |
| `geometry-data` | `list<u8>` |
| `animation-data` | `list<u8>` |
| `geometry-data-engine-version` | `list<u8>` |
| `cape-id` | `string` |
| `full-id` | `string` |
| `arm-size` | `string` |
| `skin-color` | `string` |
| `persona-pieces` | `list<persona-piece>` |
| `piece-tint-colors` | `list<piece-tint-color>` |
| `is-premium` | `bool` |
| `is-persona` | `bool` |
| `persona-cape-on-classic` | `bool` |
| `is-primary-user` | `bool` |
| `override-appearance` | `bool` |
| `is-trusted` | `bool` |
| `profile-hash` | `string` |

### `piece-tint-color` {#type-piece-tint-color}

**Record fields**

| Name | WIT type |
| --- | --- |
| `piece-type` | `string` |
| `colors` | `list<s32>` |

### `c-remove-actor` {#type-c-remove-actor}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-actor-id` | `s64` |

### `c-remove-objective` {#type-c-remove-objective}

**Record fields**

| Name | WIT type |
| --- | --- |
| `objective-name` | `string` |

### `pack-instance-id` {#type-pack-instance-id}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pack-id` | `string` |
| `version` | `string` |
| `sub-pack-name` | `string` |

### `c-resource-pack-stack-packet` {#type-c-resource-pack-stack-packet}

**Record fields**

| Name | WIT type |
| --- | --- |
| `texture-pack-required` | `bool` |
| `texture-pack-list` | `list<pack-instance-id>` |
| `base-game-version` | `string` |
| `experiments` | `experiments` |
| `include-editor-packs` | `bool` |

### `pack-info-data` {#type-pack-info-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pack-id-version` | `pack-id-version` |
| `pack-size` | `s64` |
| `content-key` | `string` |
| `subpack-name` | `string` |
| `content-identity` | `string` |
| `has-scripts` | `bool` |
| `is-addon-pack` | `bool` |
| `is-ray-tracing-capable` | `bool` |
| `cdn-url` | `string` |

### `c-resource-packs-info` {#type-c-resource-packs-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `resource-pack-required` | `bool` |
| `has-addon-packs` | `bool` |
| `has-scripts` | `bool` |
| `force-disable-vibrant-visuals` | `bool` |
| `world-template-id-and-version` | `pack-id-version` |
| `resource-packs` | `list<pack-info-data>` |

### `pack-id-version` {#type-pack-id-version}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pack-uuid` | `uuid` |
| `pack-version` | `string` |

### `c-set-actor-data` {#type-c-set-actor-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-runtime-id` | `s64` |
| `actor-data` | `string` |
| `synced-properties` | `property-sync-data` |
| `tick` | `s64` |

### `metadata-value` {#type-metadata-value}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `byte` | `u8` |
| `short` | `s32` |
| `int` | `s32` |
| `float` | `f32` |
| `%string` | `string` |
| `compound-tag` |  |
| `item-pos` | `tuple<s32, s32, s32>` |
| `int64` | `s64` |
| `vec3` | `tuple<f64, f64, f64>` |

### `property-sync-data` {#type-property-sync-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `int-entries-list` | `list<tuple<s32, s32>>` |
| `float-entries-list` | `list<tuple<s32, f32>>` |

### `c-set-actor-link` {#type-c-set-actor-link}

**Record fields**

| Name | WIT type |
| --- | --- |
| `link` | `actor-link` |

### `c-set-actor-motion` {#type-c-set-actor-motion}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-runtime-id` | `s64` |
| `motion` | `tuple<f64, f64, f64>` |
| `tick` | `s64` |

### `c-set-difficulty` {#type-c-set-difficulty}

**Record fields**

| Name | WIT type |
| --- | --- |
| `difficulty` | `s32` |

### `c-set-display-objective` {#type-c-set-display-objective}

**Record fields**

| Name | WIT type |
| --- | --- |
| `display-slot-name` | `string` |
| `objective-name` | `string` |
| `objective-display-name` | `string` |
| `criteria-name` | `string` |
| `sort-order` | `s32` |

### `c-set-health` {#type-c-set-health}

**Record fields**

| Name | WIT type |
| --- | --- |
| `health` | `s32` |

### `c-set-player-game-type` {#type-c-set-player-game-type}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-game-type` | `game-type` |

### `c-set-score` {#type-c-set-score}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action` | `s32` |
| `entries` | `list<score-entry>` |

### `score-entry` {#type-score-entry}

**Record fields**

| Name | WIT type |
| --- | --- |
| `scoreboard-id` | `s64` |
| `objective-name` | `string` |
| `score` | `s32` |
| `entry-type` | `s32` |
| `entity-unique-id` | `s64` |
| `custom-name` | `string` |

### `c-set-spawn-position` {#type-c-set-spawn-position}

**Record fields**

| Name | WIT type |
| --- | --- |
| `spawn-position-type` | `spawn-position-type` |
| `block-position` | `tuple<s32, s32, s32>` |
| `dimension-type` | `s32` |
| `spawn-block-pos` | `tuple<s32, s32, s32>` |

### `spawn-position-type` {#type-spawn-position-type}

**Enum cases**

| Name |
| --- |
| `player-respawn` |
| `world-respawn` |

### `c-set-time` {#type-c-set-time}

**Record fields**

| Name | WIT type |
| --- | --- |
| `time` | `s32` |

### `c-set-title` {#type-c-set-title}

**Record fields**

| Name | WIT type |
| --- | --- |
| `title-type` | `title-type` |
| `title-text` | `string` |
| `fade-in-time` | `s32` |
| `stay-time` | `s32` |
| `fade-out-time` | `s32` |
| `xuid` | `string` |
| `platform-online-id` | `string` |
| `filtered-title-message` | `string` |

### `title-type` {#type-title-type}

**Enum cases**

| Name |
| --- |
| `clear` |
| `reset` |
| `title` |
| `subtitle` |
| `actionbar` |
| `times` |
| `title-text-object` |
| `subtitle-text-object` |
| `actionbar-text-object` |

### `c-show-credits` {#type-c-show-credits}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-runtime-id` | `s64` |
| `credits-state` | `s32` |

### `c-start-game` {#type-c-start-game}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s64` |
| `runtime-entity-id` | `s64` |
| `player-gamemode` | `game-type` |
| `position` | `tuple<f64, f64, f64>` |
| `pitch` | `f32` |
| `yaw` | `f32` |
| `level-settings` | `level-settings` |
| `level-id` | `string` |
| `level-name` | `string` |
| `premium-world-template-id` | `string` |
| `is-trial` | `bool` |
| `rewind-history-size` | `s32` |
| `server-authoritative-block-breaking` | `bool` |
| `current-level-time` | `s64` |
| `enchantment-seed` | `s32` |
| `block-properties-size` | `s32` |
| `multiplayer-correlation-id` | `string` |
| `enable-itemstack-net-manager` | `bool` |
| `server-version` | `string` |
| `compound-id` | `u8` |
| `compound-len` | `s32` |
| `compound-end` | `u8` |
| `block-registry-checksum` | `s64` |
| `world-template-id` | `uuid` |
| `enable-clientside-generation` | `bool` |
| `blocknetwork-ids-are-hashed` | `bool` |
| `server-auth-sounds` | `bool` |
| `server-join-information` | `option<server-join-information>` |
| `telemetry` | `server-telemetry-data` |

### `server-join-information` {#type-server-join-information}

**Record fields**

| Name | WIT type |
| --- | --- |
| `gathering` | `option<gathering-join-info>` |
| `store-entry-point` | `option<store-entry-point-info>` |
| `presence` | `option<presence-info>` |

### `gathering-join-info` {#type-gathering-join-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `experience-id` | `uuid` |
| `experience-name` | `string` |
| `experience-world-id` | `uuid` |
| `experience-world-name` | `string` |
| `creator-id` | `string` |
| `unknown-uuid-1` | `uuid` |
| `unknown-uuid-2` | `uuid` |
| `server-id` | `string` |

### `store-entry-point-info` {#type-store-entry-point-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `store-id` | `string` |
| `store-name` | `string` |

### `presence-info` {#type-presence-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `experience-name` | `string` |
| `world-name` | `string` |

### `server-telemetry-data` {#type-server-telemetry-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `server-id` | `string` |
| `scenario-id` | `string` |
| `world-id` | `string` |
| `owner-id` | `string` |

### `level-settings` {#type-level-settings}

**Record fields**

| Name | WIT type |
| --- | --- |
| `seed` | `s64` |
| `spawn-biome-type` | `s32` |
| `custom-biome-name` | `string` |
| `dimension` | `s32` |
| `generator-type` | `s32` |
| `world-gamemode` | `game-type` |
| `hardcore` | `bool` |
| `difficulty` | `s32` |
| `spawn-position` | `tuple<s32, s32, s32>` |
| `has-achievements-disabled` | `bool` |
| `editor-world-type` | `s32` |
| `is-created-in-editor` | `bool` |
| `is-exported-from-editor` | `bool` |
| `day-cycle-stop-time` | `s32` |
| `education-edition-offer` | `s32` |
| `has-education-features-enabled` | `bool` |
| `education-product-id` | `string` |
| `rain-level` | `f32` |
| `lightning-level` | `f32` |
| `has-confirmed-platform-locked-content` | `bool` |
| `was-multiplayer-intended` | `bool` |
| `was-lan-broadcasting-intended` | `bool` |
| `xbox-live-broadcast-setting` | `game-publish-setting` |
| `platform-broadcast-setting` | `game-publish-setting` |
| `commands-enabled` | `bool` |
| `is-texture-packs-required` | `bool` |
| `rule-data` | `list<game-rule>` |
| `experiments` | `experiments` |
| `bonus-chest` | `bool` |
| `has-start-with-map-enabled` | `bool` |
| `permission-level` | `u8` |
| `server-simulation-distance` | `s32` |
| `has-locked-behavior-pack` | `bool` |
| `has-locked-resource-pack` | `bool` |
| `is-from-locked-world-template` | `bool` |
| `is-using-msa-gamertags-only` | `bool` |
| `is-from-world-template` | `bool` |
| `is-world-template-option-locked` | `bool` |
| `is-only-spawning-v1-villagers` | `bool` |
| `is-disabling-personas` | `bool` |
| `is-disabling-custom-skins` | `bool` |
| `emote-chat-muted` | `bool` |
| `game-version` | `string` |
| `limited-world-width` | `s32` |
| `limited-world-height` | `s32` |
| `new-nether` | `bool` |
| `edu-shared-uri-button-name` | `string` |
| `edu-shared-uri-link-uri` | `string` |
| `override-force-experimental-gameplay-has-value` | `bool` |
| `chat-restriction-level` | `u8` |
| `disable-player-interactions` | `bool` |
| `server-editor-connection-policy` | `s32` |
| `allow-anonymous-block-drops-in-editor-worlds` | `bool` |

### `experiments` {#type-experiments}

**Record fields**

| Name | WIT type |
| --- | --- |
| `toggles` | `list<experiment-toggle>` |
| `experiments-ever-toggled` | `bool` |

### `experiment-toggle` {#type-experiment-toggle}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `enabled` | `bool` |

### `game-publish-setting` {#type-game-publish-setting}

**Enum cases**

| Name |
| --- |
| `no-multi-play` |
| `invite-only` |
| `friends-only` |
| `friends-of-friends` |
| `public` |

### `gg` {#type-gg}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `id` | `u8` |
| `len` | `s32` |
| `end` | `u8` |

### `c-take-item-actor` {#type-c-take-item-actor}

**Record fields**

| Name | WIT type |
| --- | --- |
| `item-runtime-id` | `s64` |
| `actor-runtime-id` | `s64` |

### `c-transfer` {#type-c-transfer}

**Record fields**

| Name | WIT type |
| --- | --- |
| `server-address` | `string` |
| `server-port` | `s32` |
| `reload-world` | `bool` |

### `c-update-abilities` {#type-c-update-abilities}

**Record fields**

| Name | WIT type |
| --- | --- |
| `data` | `serialized-abilities-data` |

### `ability` {#type-ability}

**Enum cases**

| Name |
| --- |
| `build` |
| `mine` |
| `doors-and-switches` |
| `open-containers` |
| `attack-players` |
| `attack-mobs` |
| `operator-commands` |
| `teleport` |
| `invulnerable` |
| `flying` |
| `may-fly` |
| `instabuild` |
| `lightning` |
| `fly-speed` |
| `walk-speed` |
| `muted` |
| `world-builder` |
| `no-clip` |
| `privileged-builder` |
| `vertical-fly-speed` |
| `ability-count` |

### `c-update-attributes` {#type-c-update-attributes}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-runtime-id` | `s64` |
| `attribute-list` | `list<attribute-data>` |
| `tick` | `s64` |

### `attribute-data` {#type-attribute-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `min-value` | `f32` |
| `max-value` | `f32` |
| `current-value` | `f32` |
| `default-min-value` | `f32` |
| `default-max-value` | `f32` |
| `default-value` | `f32` |
| `name` | `string` |
| `modifiers` | `list<attribute-modifier>` |

### `attribute-modifier` {#type-attribute-modifier}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `string` |
| `name` | `string` |
| `amount` | `f32` |
| `operation` | `s32` |
| `operand` | `s32` |
| `is-serializable` | `bool` |

### `c-update-block` {#type-c-update-block}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-position` | `tuple<s32, s32, s32>` |
| `block-runtime-id` | `s32` |
| `%flags` | `s32` |
| `layer` | `s32` |

### `c-update-trade` {#type-c-update-trade}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-id` | `u8` |
| `r-type` | `u8` |
| `size` | `s32` |
| `trader-tier` | `s32` |
| `entity-unique-id` | `s64` |
| `last-trading-player` | `s64` |
| `display-name` | `string` |
| `use-new-trade-screen` | `bool` |
| `using-economy-trade` | `bool` |
| `data` | `string` |

### `network-item-descriptor` {#type-network-item-descriptor}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `stack-size` | `s32` |
| `aux-value` | `s32` |
| `block-runtime-id` | `s32` |
| `nbt-data` | `string` |
| `place-on-blocks` | `list<string>` |
| `destroy-blocks` | `list<string>` |
| `shield-blocking-tick` | `s64` |

### `item-stack-wrapper` {#type-item-stack-wrapper}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `stack-size` | `s32` |
| `aux-value` | `s32` |
| `block-runtime-id` | `s32` |
| `nbt-data` | `string` |
| `place-on-blocks` | `list<string>` |
| `destroy-blocks` | `list<string>` |
| `shield-blocking-tick` | `s64` |
| `net-id` | `option<s32>` |

### `network-item-stack-descriptor` {#type-network-item-stack-descriptor}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `stack-size` | `s32` |
| `aux-value` | `s32` |
| `block-runtime-id` | `s32` |
| `extra-data` | `list<u8>` |
| `net-id` | `option<s32>` |

### `full-container-name` {#type-full-container-name}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-name` | `container-name` |
| `dynamic-id` | `option<s32>` |

### `container-name` {#type-container-name}

**Enum cases**

| Name |
| --- |
| `anvil-input` |
| `anvil-material` |
| `anvil-result-preview` |
| `smithing-table-input` |
| `smithing-table-material` |
| `smithing-table-result-preview` |
| `armor` |
| `level-entity` |
| `beacon-payment` |
| `brewing-stand-input` |
| `brewing-stand-result` |
| `brewing-stand-fuel` |
| `combined-hot-bar-and-inventory` |
| `crafting-input` |
| `crafting-output-preview` |
| `recipe-construction` |
| `recipe-nature` |
| `recipe-items` |
| `recipe-search` |
| `recipe-search-bar` |
| `recipe-equipment` |
| `recipe-book` |
| `enchanting-input` |
| `enchanting-material` |
| `furnace-fuel` |
| `furnace-ingredient` |
| `furnace-result` |
| `horse-equip` |
| `hot-bar` |
| `inventory` |
| `shulker-box` |
| `trade-ingredient1` |
| `trade-ingredient2` |
| `trade-result-preview` |
| `offhand` |
| `compound-creator-input` |
| `compound-creator-output-preview` |
| `element-constructor-output-preview` |
| `material-reducer-input` |
| `material-reducer-output` |
| `lab-table-input` |
| `loom-input` |
| `loom-dye` |
| `loom-material` |
| `loom-result-preview` |
| `blast-furnace-ingredient` |
| `smoker-ingredient` |
| `trade2-ingredient1` |
| `trade2-ingredient2` |
| `trade2-result-preview` |
| `grindstone-input` |
| `grindstone-additional` |
| `grindstone-result-preview` |
| `stonecutter-input` |
| `stonecutter-result-preview` |
| `cartography-input` |
| `cartography-additional` |
| `cartography-result-preview` |
| `barrel` |
| `cursor` |
| `created-output` |
| `smithing-table-template` |
| `crafter-level-entity` |
| `dynamic` |
| `recipe-food` |
| `recipe-blocks` |
| `recipe-furnace-items` |

### `network-item-stack` {#type-network-item-stack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `count` | `s32` |
| `aux-value` | `s32` |
| `block-runtime-id` | `s32` |
| `extra-data` | `list<u8>` |

### `serverbound-packet` {#type-serverbound-packet}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `s-actor-event` | `s-actor-event` |
| `s-animate` | `s-animate` |
| `s-block-pick-request` | `s-block-pick-request` |
| `s-client-cache-blob-status` | `s-client-cache-blob-status` |
| `s-client-cache-status` | `s-client-cache-status` |
| `s-command-request` | `s-command-request` |
| `s-container-close` | `s-container-close` |
| `s-emote` | `s-emote` |
| `s-emote-list` | `s-emote-list` |
| `s-interact` | `s-interact` |
| `s-inventory-transaction` | `s-inventory-transaction` |
| `s-item-stack-request` | `s-item-stack-request` |
| `s-loading-screen` | `s-loading-screen` |
| `s-login` | `s-login` |
| `s-mob-equipment` | `s-mob-equipment` |
| `s-modal-form-response` | `s-modal-form-response` |
| `s-packet-violation-warning` | `s-packet-violation-warning` |
| `s-player-action` | `s-player-action` |
| `s-player-auth-input` | `s-player-auth-input` |
| `s-player-hotbar` | `s-player-hotbar` |
| `s-request-ability` | `s-request-ability` |
| `s-request-chunk-radius` | `s-request-chunk-radius` |
| `s-request-network-settings` | `s-request-network-settings` |
| `s-resource-pack-client-response` | `s-resource-pack-client-response` |
| `s-respawn` | `s-respawn` |
| `s-set-local-player-as-initialized` | `s-set-local-player-as-initialized` |
| `s-set-player-inventory-options` | `s-set-player-inventory-options` |
| `s-text` | `s-text` |
| `unknown` |  |

### `clientbound-packet` {#type-clientbound-packet}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `c-add-actor` | `c-add-actor` |
| `c-add-item-actor` | `c-add-item-actor` |
| `c-add-player` | `c-add-player` |
| `c-available-commands` | `c-available-commands` |
| `c-biome-definition-list` |  |
| `c-block-actor-data` | `c-block-actor-data` |
| `c-block-event` | `c-block-event` |
| `c-boss-event` | `c-boss-event` |
| `c-change-dimension` | `c-change-dimension` |
| `c-chunk-radius-updated` | `c-chunk-radius-updated` |
| `c-client-cache-miss-response` | `c-client-cache-miss-response` |
| `c-container-open` | `c-container-open` |
| `c-correct-player-move-prediction` | `c-correct-player-move-prediction` |
| `c-crafting-data` | `c-crafting-data` |
| `c-creative-content` | `c-creative-content` |
| `c-disconnect` | `c-disconnect` |
| `c-gamerules-changed` | `c-gamerules-changed` |
| `c-inventory-content` | `c-inventory-content` |
| `c-inventory-slot` | `c-inventory-slot` |
| `c-item-registry` | `c-item-registry` |
| `c-item-stack-response` | `c-item-stack-response` |
| `c-jigsaw-structure-data` |  |
| `c-level-event` | `c-level-event` |
| `c-level-sound-event` | `c-level-sound-event` |
| `c-mob-effect` | `c-mob-effect` |
| `c-mob-equipment` | `c-mob-equipment` |
| `c-modal-form-request` | `c-modal-form-request` |
| `c-move-actor-absolute` | `c-move-actor-absolute` |
| `c-move-actor-delta` | `c-move-actor-delta` |
| `c-move-player` | `c-move-player` |
| `c-network-chunk-publisher-update` | `c-network-chunk-publisher-update` |
| `c-network-settings` | `c-network-settings` |
| `c-play-status` | `c-play-status` |
| `c-player-hotbar` | `c-player-hotbar` |
| `c-player-list` | `c-player-list` |
| `c-remove-actor` | `c-remove-actor` |
| `c-remove-objective` | `c-remove-objective` |
| `c-resource-pack-stack-packet` | `c-resource-pack-stack-packet` |
| `c-resource-packs-info` | `c-resource-packs-info` |
| `c-set-actor-data` | `c-set-actor-data` |
| `c-set-actor-link` | `c-set-actor-link` |
| `c-set-actor-motion` | `c-set-actor-motion` |
| `c-set-difficulty` | `c-set-difficulty` |
| `c-set-display-objective` | `c-set-display-objective` |
| `c-set-health` | `c-set-health` |
| `c-set-player-game-type` | `c-set-player-game-type` |
| `c-set-score` | `c-set-score` |
| `c-set-spawn-position` | `c-set-spawn-position` |
| `c-set-time` | `c-set-time` |
| `c-set-title` | `c-set-title` |
| `c-show-credits` | `c-show-credits` |
| `c-start-game` | `c-start-game` |
| `c-take-item-actor` | `c-take-item-actor` |
| `c-transfer` | `c-transfer` |
| `c-update-abilities` | `c-update-abilities` |
| `c-update-attributes` | `c-update-attributes` |
| `c-update-block` | `c-update-block` |
| `c-update-trade` | `c-update-trade` |
| `c-voxel-shapes` |  |
| `unknown` |  |
