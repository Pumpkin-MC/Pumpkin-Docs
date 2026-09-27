---
title: Interface block-entity
outline: [2, 2]
---

# Interface `block-entity`

Host import: `pumpkin:plugin/block-entity@0.1.0`

[Package summary](./)

Source: [block-entity.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/block-entity.wit)

Block entity types and operations.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`common`](./common) | `block-pos`, `nbt-tree` |
| [`item-stack`](./item-stack) | `item-stack` |
| [`inventory`](./inventory) | `inventory` |

## Type Summary

| Kind | Type |
| --- | --- |
| resource | [`banner-block-entity`](#type-banner-block-entity) |
| resource | [`barrel-block-entity`](#type-barrel-block-entity) |
| resource | [`beacon-block-entity`](#type-beacon-block-entity) |
| resource | [`bed-block-entity`](#type-bed-block-entity) |
| resource | [`beehive-block-entity`](#type-beehive-block-entity) |
| resource | [`bell-block-entity`](#type-bell-block-entity) |
| resource | [`blasting-furnace-block-entity`](#type-blasting-furnace-block-entity) |
| resource | [`block-entity`](#type-block-entity) |
| variant | [`block-entity-type`](#type-block-entity-type) |
| resource | [`brewing-stand-block-entity`](#type-brewing-stand-block-entity) |
| resource | [`brushable-block-block-entity`](#type-brushable-block-block-entity) |
| resource | [`calibrated-sculk-sensor-block-entity`](#type-calibrated-sculk-sensor-block-entity) |
| resource | [`campfire-block-entity`](#type-campfire-block-entity) |
| resource | [`chest-block-entity`](#type-chest-block-entity) |
| resource | [`chiseled-bookshelf-block-entity`](#type-chiseled-bookshelf-block-entity) |
| resource | [`command-block-entity`](#type-command-block-entity) |
| resource | [`comparator-block-entity`](#type-comparator-block-entity) |
| resource | [`conduit-block-entity`](#type-conduit-block-entity) |
| resource | [`container-block-entity`](#type-container-block-entity) |
| resource | [`copper-golem-statue-block-entity`](#type-copper-golem-statue-block-entity) |
| resource | [`crafter-block-entity`](#type-crafter-block-entity) |
| resource | [`creaking-heart-block-entity`](#type-creaking-heart-block-entity) |
| resource | [`daylight-detector-block-entity`](#type-daylight-detector-block-entity) |
| resource | [`decorated-pot-block-entity`](#type-decorated-pot-block-entity) |
| resource | [`dispenser-block-entity`](#type-dispenser-block-entity) |
| resource | [`dropper-block-entity`](#type-dropper-block-entity) |
| enum | [`dye-color`](#type-dye-color) |
| resource | [`enchanting-table-block-entity`](#type-enchanting-table-block-entity) |
| resource | [`end-gateway-block-entity`](#type-end-gateway-block-entity) |
| resource | [`end-portal-block-entity`](#type-end-portal-block-entity) |
| resource | [`ender-chest-block-entity`](#type-ender-chest-block-entity) |
| resource | [`furnace-block-entity`](#type-furnace-block-entity) |
| resource | [`hanging-sign-block-entity`](#type-hanging-sign-block-entity) |
| resource | [`hopper-block-entity`](#type-hopper-block-entity) |
| resource | [`jigsaw-block-entity`](#type-jigsaw-block-entity) |
| resource | [`jukebox-block-entity`](#type-jukebox-block-entity) |
| resource | [`lectern-block-entity`](#type-lectern-block-entity) |
| resource | [`map-block-entity`](#type-map-block-entity) |
| resource | [`mob-spawner-block-entity`](#type-mob-spawner-block-entity) |
| resource | [`piston-block-entity`](#type-piston-block-entity) |
| resource | [`potent-sulfur-block-entity`](#type-potent-sulfur-block-entity) |
| resource | [`sculk-catalyst-block-entity`](#type-sculk-catalyst-block-entity) |
| resource | [`sculk-sensor-block-entity`](#type-sculk-sensor-block-entity) |
| resource | [`sculk-shrieker-block-entity`](#type-sculk-shrieker-block-entity) |
| resource | [`shelf-block-entity`](#type-shelf-block-entity) |
| resource | [`shulker-box-block-entity`](#type-shulker-box-block-entity) |
| resource | [`sign-block-entity`](#type-sign-block-entity) |
| record | [`sign-text`](#type-sign-text) |
| resource | [`skull-block-entity`](#type-skull-block-entity) |
| resource | [`smoker-block-entity`](#type-smoker-block-entity) |
| resource | [`structure-block-block-entity`](#type-structure-block-block-entity) |
| resource | [`test-block-block-entity`](#type-test-block-block-entity) |
| resource | [`test-instance-block-block-entity`](#type-test-instance-block-block-entity) |
| resource | [`trapped-chest-block-entity`](#type-trapped-chest-block-entity) |
| resource | [`trial-spawner-block-entity`](#type-trial-spawner-block-entity) |
| resource | [`vault-block-entity`](#type-vault-block-entity) |

## Operation Summary

| Scope | Operation |
| --- | --- |
| `banner-block-entity` | [`get-block-entity`](#operation-banner-block-entity-get-block-entity) |
| `banner-block-entity` | [`get-custom-name`](#operation-banner-block-entity-get-custom-name) |
| `barrel-block-entity` | [`get-block-entity`](#operation-barrel-block-entity-get-block-entity) |
| `barrel-block-entity` | [`get-container`](#operation-barrel-block-entity-get-container) |
| `barrel-block-entity` | [`viewer-count`](#operation-barrel-block-entity-viewer-count) |
| `beacon-block-entity` | [`get-block-entity`](#operation-beacon-block-entity-get-block-entity) |
| `beacon-block-entity` | [`get-container`](#operation-beacon-block-entity-get-container) |
| `beacon-block-entity` | [`get-levels`](#operation-beacon-block-entity-get-levels) |
| `beacon-block-entity` | [`get-primary-effect`](#operation-beacon-block-entity-get-primary-effect) |
| `beacon-block-entity` | [`get-secondary-effect`](#operation-beacon-block-entity-get-secondary-effect) |
| `bed-block-entity` | [`get-block-entity`](#operation-bed-block-entity-get-block-entity) |
| `beehive-block-entity` | [`get-bee-count`](#operation-beehive-block-entity-get-bee-count) |
| `beehive-block-entity` | [`get-block-entity`](#operation-beehive-block-entity-get-block-entity) |
| `bell-block-entity` | [`get-block-entity`](#operation-bell-block-entity-get-block-entity) |
| `bell-block-entity` | [`get-ring-ticks`](#operation-bell-block-entity-get-ring-ticks) |
| `bell-block-entity` | [`is-ringing`](#operation-bell-block-entity-is-ringing) |
| `blasting-furnace-block-entity` | [`get-block-entity`](#operation-blasting-furnace-block-entity-get-block-entity) |
| `blasting-furnace-block-entity` | [`get-container`](#operation-blasting-furnace-block-entity-get-container) |
| `blasting-furnace-block-entity` | [`get-cooking-time-spent`](#operation-blasting-furnace-block-entity-get-cooking-time-spent) |
| `blasting-furnace-block-entity` | [`get-cooking-total-time`](#operation-blasting-furnace-block-entity-get-cooking-total-time) |
| `blasting-furnace-block-entity` | [`get-lit-time-remaining`](#operation-blasting-furnace-block-entity-get-lit-time-remaining) |
| `blasting-furnace-block-entity` | [`get-lit-total-time`](#operation-blasting-furnace-block-entity-get-lit-total-time) |
| `blasting-furnace-block-entity` | [`is-burning`](#operation-blasting-furnace-block-entity-is-burning) |
| `block-entity` | [`clear-dirty`](#operation-block-entity-clear-dirty) |
| `block-entity` | [`get-custom-data`](#operation-block-entity-get-custom-data) |
| `block-entity` | [`get-id`](#operation-block-entity-get-id) |
| `block-entity` | [`get-position`](#operation-block-entity-get-position) |
| `block-entity` | [`has-custom-data`](#operation-block-entity-has-custom-data) |
| `block-entity` | [`is-dirty`](#operation-block-entity-is-dirty) |
| `block-entity` | [`remove-custom-data`](#operation-block-entity-remove-custom-data) |
| `block-entity` | [`resource-location`](#operation-block-entity-resource-location) |
| `block-entity` | [`set-custom-data`](#operation-block-entity-set-custom-data) |
| `brewing-stand-block-entity` | [`get-block-entity`](#operation-brewing-stand-block-entity-get-block-entity) |
| `brewing-stand-block-entity` | [`get-brew-time`](#operation-brewing-stand-block-entity-get-brew-time) |
| `brewing-stand-block-entity` | [`get-container`](#operation-brewing-stand-block-entity-get-container) |
| `brewing-stand-block-entity` | [`get-fuel`](#operation-brewing-stand-block-entity-get-fuel) |
| `brushable-block-block-entity` | [`get-block-entity`](#operation-brushable-block-block-entity-get-block-entity) |
| `calibrated-sculk-sensor-block-entity` | [`get-block-entity`](#operation-calibrated-sculk-sensor-block-entity-get-block-entity) |
| `campfire-block-entity` | [`get-block-entity`](#operation-campfire-block-entity-get-block-entity) |
| `campfire-block-entity` | [`get-container`](#operation-campfire-block-entity-get-container) |
| `chest-block-entity` | [`get-block-entity`](#operation-chest-block-entity-get-block-entity) |
| `chest-block-entity` | [`get-container`](#operation-chest-block-entity-get-container) |
| `chest-block-entity` | [`viewer-count`](#operation-chest-block-entity-viewer-count) |
| `chiseled-bookshelf-block-entity` | [`get-block-entity`](#operation-chiseled-bookshelf-block-entity-get-block-entity) |
| `chiseled-bookshelf-block-entity` | [`get-container`](#operation-chiseled-bookshelf-block-entity-get-container) |
| `chiseled-bookshelf-block-entity` | [`get-last-interacted-slot`](#operation-chiseled-bookshelf-block-entity-get-last-interacted-slot) |
| `command-block-entity` | [`auto`](#operation-command-block-entity-auto) |
| `command-block-entity` | [`command`](#operation-command-block-entity-command) |
| `command-block-entity` | [`condition-met`](#operation-command-block-entity-condition-met) |
| `command-block-entity` | [`last-output`](#operation-command-block-entity-last-output) |
| `command-block-entity` | [`powered`](#operation-command-block-entity-powered) |
| `command-block-entity` | [`success-count`](#operation-command-block-entity-success-count) |
| `command-block-entity` | [`track-output`](#operation-command-block-entity-track-output) |
| `comparator-block-entity` | [`get-block-entity`](#operation-comparator-block-entity-get-block-entity) |
| `comparator-block-entity` | [`get-output-signal`](#operation-comparator-block-entity-get-output-signal) |
| `conduit-block-entity` | [`get-block-entity`](#operation-conduit-block-entity-get-block-entity) |
| `container-block-entity` | [`clear`](#operation-container-block-entity-clear) |
| `container-block-entity` | [`get-block-entity`](#operation-container-block-entity-get-block-entity) |
| `container-block-entity` | [`get-inventory`](#operation-container-block-entity-get-inventory) |
| `container-block-entity` | [`get-size`](#operation-container-block-entity-get-size) |
| `container-block-entity` | [`get-stack`](#operation-container-block-entity-get-stack) |
| `container-block-entity` | [`is-empty`](#operation-container-block-entity-is-empty) |
| `container-block-entity` | [`remove-stack`](#operation-container-block-entity-remove-stack) |
| `container-block-entity` | [`set-stack`](#operation-container-block-entity-set-stack) |
| `copper-golem-statue-block-entity` | [`get-block-entity`](#operation-copper-golem-statue-block-entity-get-block-entity) |
| `crafter-block-entity` | [`get-block-entity`](#operation-crafter-block-entity-get-block-entity) |
| `crafter-block-entity` | [`get-container`](#operation-crafter-block-entity-get-container) |
| `crafter-block-entity` | [`get-crafting-ticks-remaining`](#operation-crafter-block-entity-get-crafting-ticks-remaining) |
| `crafter-block-entity` | [`is-triggered`](#operation-crafter-block-entity-is-triggered) |
| `creaking-heart-block-entity` | [`get-block-entity`](#operation-creaking-heart-block-entity-get-block-entity) |
| `creaking-heart-block-entity` | [`get-creaking-uuid`](#operation-creaking-heart-block-entity-get-creaking-uuid) |
| `daylight-detector-block-entity` | [`get-block-entity`](#operation-daylight-detector-block-entity-get-block-entity) |
| `decorated-pot-block-entity` | [`get-block-entity`](#operation-decorated-pot-block-entity-get-block-entity) |
| `dispenser-block-entity` | [`get-block-entity`](#operation-dispenser-block-entity-get-block-entity) |
| `dispenser-block-entity` | [`get-container`](#operation-dispenser-block-entity-get-container) |
| `dropper-block-entity` | [`get-block-entity`](#operation-dropper-block-entity-get-block-entity) |
| `dropper-block-entity` | [`get-container`](#operation-dropper-block-entity-get-container) |
| `enchanting-table-block-entity` | [`get-block-entity`](#operation-enchanting-table-block-entity-get-block-entity) |
| `end-gateway-block-entity` | [`get-age`](#operation-end-gateway-block-entity-get-age) |
| `end-gateway-block-entity` | [`get-block-entity`](#operation-end-gateway-block-entity-get-block-entity) |
| `end-gateway-block-entity` | [`is-exact-teleport`](#operation-end-gateway-block-entity-is-exact-teleport) |
| `end-portal-block-entity` | [`get-block-entity`](#operation-end-portal-block-entity-get-block-entity) |
| `ender-chest-block-entity` | [`get-block-entity`](#operation-ender-chest-block-entity-get-block-entity) |
| `ender-chest-block-entity` | [`viewer-count`](#operation-ender-chest-block-entity-viewer-count) |
| `furnace-block-entity` | [`get-block-entity`](#operation-furnace-block-entity-get-block-entity) |
| `furnace-block-entity` | [`get-container`](#operation-furnace-block-entity-get-container) |
| `furnace-block-entity` | [`get-cooking-time-spent`](#operation-furnace-block-entity-get-cooking-time-spent) |
| `furnace-block-entity` | [`get-cooking-total-time`](#operation-furnace-block-entity-get-cooking-total-time) |
| `furnace-block-entity` | [`get-lit-time-remaining`](#operation-furnace-block-entity-get-lit-time-remaining) |
| `furnace-block-entity` | [`get-lit-total-time`](#operation-furnace-block-entity-get-lit-total-time) |
| `furnace-block-entity` | [`is-burning`](#operation-furnace-block-entity-is-burning) |
| `hanging-sign-block-entity` | [`get-back-text`](#operation-hanging-sign-block-entity-get-back-text) |
| `hanging-sign-block-entity` | [`get-block-entity`](#operation-hanging-sign-block-entity-get-block-entity) |
| `hanging-sign-block-entity` | [`get-front-text`](#operation-hanging-sign-block-entity-get-front-text) |
| `hanging-sign-block-entity` | [`is-waxed`](#operation-hanging-sign-block-entity-is-waxed) |
| `hanging-sign-block-entity` | [`set-back-text`](#operation-hanging-sign-block-entity-set-back-text) |
| `hanging-sign-block-entity` | [`set-front-text`](#operation-hanging-sign-block-entity-set-front-text) |
| `hanging-sign-block-entity` | [`set-waxed`](#operation-hanging-sign-block-entity-set-waxed) |
| `hopper-block-entity` | [`get-block-entity`](#operation-hopper-block-entity-get-block-entity) |
| `hopper-block-entity` | [`get-container`](#operation-hopper-block-entity-get-container) |
| `hopper-block-entity` | [`get-cooldown`](#operation-hopper-block-entity-get-cooldown) |
| `jigsaw-block-entity` | [`get-block-entity`](#operation-jigsaw-block-entity-get-block-entity) |
| `jigsaw-block-entity` | [`get-final-state`](#operation-jigsaw-block-entity-get-final-state) |
| `jigsaw-block-entity` | [`get-name`](#operation-jigsaw-block-entity-get-name) |
| `jigsaw-block-entity` | [`get-placement-priority`](#operation-jigsaw-block-entity-get-placement-priority) |
| `jigsaw-block-entity` | [`get-pool`](#operation-jigsaw-block-entity-get-pool) |
| `jigsaw-block-entity` | [`get-selection-priority`](#operation-jigsaw-block-entity-get-selection-priority) |
| `jigsaw-block-entity` | [`get-target`](#operation-jigsaw-block-entity-get-target) |
| `jukebox-block-entity` | [`get-block-entity`](#operation-jukebox-block-entity-get-block-entity) |
| `jukebox-block-entity` | [`get-container`](#operation-jukebox-block-entity-get-container) |
| `jukebox-block-entity` | [`is-playing`](#operation-jukebox-block-entity-is-playing) |
| `jukebox-block-entity` | [`start-playing`](#operation-jukebox-block-entity-start-playing) |
| `jukebox-block-entity` | [`stop-playing`](#operation-jukebox-block-entity-stop-playing) |
| `lectern-block-entity` | [`get-block-entity`](#operation-lectern-block-entity-get-block-entity) |
| `lectern-block-entity` | [`get-container`](#operation-lectern-block-entity-get-container) |
| `lectern-block-entity` | [`get-page`](#operation-lectern-block-entity-get-page) |
| `map-block-entity` | [`get-block-entity`](#operation-map-block-entity-get-block-entity) |
| `map-block-entity` | [`get-colors`](#operation-map-block-entity-get-colors) |
| `map-block-entity` | [`get-map-id`](#operation-map-block-entity-get-map-id) |
| `map-block-entity` | [`get-pixel`](#operation-map-block-entity-get-pixel) |
| `map-block-entity` | [`set-colors`](#operation-map-block-entity-set-colors) |
| `map-block-entity` | [`set-map-id`](#operation-map-block-entity-set-map-id) |
| `map-block-entity` | [`set-pixel`](#operation-map-block-entity-set-pixel) |
| `map-block-entity` | [`stream-frame`](#operation-map-block-entity-stream-frame) |
| `map-block-entity` | [`update`](#operation-map-block-entity-update) |
| `mob-spawner-block-entity` | [`get-block-entity`](#operation-mob-spawner-block-entity-get-block-entity) |
| `mob-spawner-block-entity` | [`get-delay`](#operation-mob-spawner-block-entity-get-delay) |
| `mob-spawner-block-entity` | [`get-spawn-count`](#operation-mob-spawner-block-entity-get-spawn-count) |
| `mob-spawner-block-entity` | [`get-spawn-range`](#operation-mob-spawner-block-entity-get-spawn-range) |
| `piston-block-entity` | [`get-block-entity`](#operation-piston-block-entity-get-block-entity) |
| `piston-block-entity` | [`get-progress`](#operation-piston-block-entity-get-progress) |
| `piston-block-entity` | [`is-extending`](#operation-piston-block-entity-is-extending) |
| `piston-block-entity` | [`is-source`](#operation-piston-block-entity-is-source) |
| `potent-sulfur-block-entity` | [`get-block-entity`](#operation-potent-sulfur-block-entity-get-block-entity) |
| `sculk-catalyst-block-entity` | [`get-block-entity`](#operation-sculk-catalyst-block-entity-get-block-entity) |
| `sculk-sensor-block-entity` | [`get-block-entity`](#operation-sculk-sensor-block-entity-get-block-entity) |
| `sculk-shrieker-block-entity` | [`get-block-entity`](#operation-sculk-shrieker-block-entity-get-block-entity) |
| `sculk-shrieker-block-entity` | [`get-warning-level`](#operation-sculk-shrieker-block-entity-get-warning-level) |
| `shelf-block-entity` | [`get-block-entity`](#operation-shelf-block-entity-get-block-entity) |
| `shelf-block-entity` | [`get-container`](#operation-shelf-block-entity-get-container) |
| `shulker-box-block-entity` | [`get-block-entity`](#operation-shulker-box-block-entity-get-block-entity) |
| `shulker-box-block-entity` | [`get-container`](#operation-shulker-box-block-entity-get-container) |
| `shulker-box-block-entity` | [`viewer-count`](#operation-shulker-box-block-entity-viewer-count) |
| `sign-block-entity` | [`get-back-text`](#operation-sign-block-entity-get-back-text) |
| `sign-block-entity` | [`get-block-entity`](#operation-sign-block-entity-get-block-entity) |
| `sign-block-entity` | [`get-front-text`](#operation-sign-block-entity-get-front-text) |
| `sign-block-entity` | [`is-waxed`](#operation-sign-block-entity-is-waxed) |
| `sign-block-entity` | [`set-back-text`](#operation-sign-block-entity-set-back-text) |
| `sign-block-entity` | [`set-front-text`](#operation-sign-block-entity-set-front-text) |
| `sign-block-entity` | [`set-waxed`](#operation-sign-block-entity-set-waxed) |
| `skull-block-entity` | [`get-block-entity`](#operation-skull-block-entity-get-block-entity) |
| `skull-block-entity` | [`get-note-block-sound`](#operation-skull-block-entity-get-note-block-sound) |
| `smoker-block-entity` | [`get-block-entity`](#operation-smoker-block-entity-get-block-entity) |
| `smoker-block-entity` | [`get-container`](#operation-smoker-block-entity-get-container) |
| `smoker-block-entity` | [`get-cooking-time-spent`](#operation-smoker-block-entity-get-cooking-time-spent) |
| `smoker-block-entity` | [`get-cooking-total-time`](#operation-smoker-block-entity-get-cooking-total-time) |
| `smoker-block-entity` | [`get-lit-time-remaining`](#operation-smoker-block-entity-get-lit-time-remaining) |
| `smoker-block-entity` | [`get-lit-total-time`](#operation-smoker-block-entity-get-lit-total-time) |
| `smoker-block-entity` | [`is-burning`](#operation-smoker-block-entity-is-burning) |
| `structure-block-block-entity` | [`get-author`](#operation-structure-block-block-entity-get-author) |
| `structure-block-block-entity` | [`get-block-entity`](#operation-structure-block-block-entity-get-block-entity) |
| `structure-block-block-entity` | [`get-integrity`](#operation-structure-block-block-entity-get-integrity) |
| `structure-block-block-entity` | [`get-mode`](#operation-structure-block-block-entity-get-mode) |
| `structure-block-block-entity` | [`get-name`](#operation-structure-block-block-entity-get-name) |
| `structure-block-block-entity` | [`get-seed`](#operation-structure-block-block-entity-get-seed) |
| `test-block-block-entity` | [`get-block-entity`](#operation-test-block-block-entity-get-block-entity) |
| `test-instance-block-block-entity` | [`get-block-entity`](#operation-test-instance-block-block-entity-get-block-entity) |
| `trapped-chest-block-entity` | [`get-block-entity`](#operation-trapped-chest-block-entity-get-block-entity) |
| `trapped-chest-block-entity` | [`get-container`](#operation-trapped-chest-block-entity-get-container) |
| `trapped-chest-block-entity` | [`viewer-count`](#operation-trapped-chest-block-entity-viewer-count) |
| `trial-spawner-block-entity` | [`get-block-entity`](#operation-trial-spawner-block-entity-get-block-entity) |
| `vault-block-entity` | [`get-block-entity`](#operation-vault-block-entity-get-block-entity) |

## Type Details

### `block-entity` {#type-block-entity}

Methods: [`resource-location`](#operation-block-entity-resource-location), [`get-position`](#operation-block-entity-get-position), [`get-id`](#operation-block-entity-get-id), [`is-dirty`](#operation-block-entity-is-dirty), [`clear-dirty`](#operation-block-entity-clear-dirty), [`set-custom-data`](#operation-block-entity-set-custom-data), [`get-custom-data`](#operation-block-entity-get-custom-data), [`remove-custom-data`](#operation-block-entity-remove-custom-data), [`has-custom-data`](#operation-block-entity-has-custom-data).

### `container-block-entity` {#type-container-block-entity}

Methods: [`get-block-entity`](#operation-container-block-entity-get-block-entity), [`get-inventory`](#operation-container-block-entity-get-inventory), [`get-size`](#operation-container-block-entity-get-size), [`is-empty`](#operation-container-block-entity-is-empty), [`get-stack`](#operation-container-block-entity-get-stack), [`set-stack`](#operation-container-block-entity-set-stack), [`remove-stack`](#operation-container-block-entity-remove-stack), [`clear`](#operation-container-block-entity-clear).

### `command-block-entity` {#type-command-block-entity}

Methods: [`last-output`](#operation-command-block-entity-last-output), [`track-output`](#operation-command-block-entity-track-output), [`success-count`](#operation-command-block-entity-success-count), [`command`](#operation-command-block-entity-command), [`auto`](#operation-command-block-entity-auto), [`condition-met`](#operation-command-block-entity-condition-met), [`powered`](#operation-command-block-entity-powered).

### `dye-color` {#type-dye-color}

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

### `sign-text` {#type-sign-text}

**Record fields**

| Name | WIT type |
| --- | --- |
| `messages` | `list<string>` |
| `color` | `dye-color` |
| `has-glowing-text` | `bool` |

### `sign-block-entity` {#type-sign-block-entity}

Methods: [`get-block-entity`](#operation-sign-block-entity-get-block-entity), [`get-front-text`](#operation-sign-block-entity-get-front-text), [`set-front-text`](#operation-sign-block-entity-set-front-text), [`get-back-text`](#operation-sign-block-entity-get-back-text), [`set-back-text`](#operation-sign-block-entity-set-back-text), [`is-waxed`](#operation-sign-block-entity-is-waxed), [`set-waxed`](#operation-sign-block-entity-set-waxed).

### `jukebox-block-entity` {#type-jukebox-block-entity}

Methods: [`get-block-entity`](#operation-jukebox-block-entity-get-block-entity), [`get-container`](#operation-jukebox-block-entity-get-container), [`is-playing`](#operation-jukebox-block-entity-is-playing), [`stop-playing`](#operation-jukebox-block-entity-stop-playing), [`start-playing`](#operation-jukebox-block-entity-start-playing).

### `chest-block-entity` {#type-chest-block-entity}

Methods: [`get-block-entity`](#operation-chest-block-entity-get-block-entity), [`get-container`](#operation-chest-block-entity-get-container), [`viewer-count`](#operation-chest-block-entity-viewer-count).

### `mob-spawner-block-entity` {#type-mob-spawner-block-entity}

Methods: [`get-block-entity`](#operation-mob-spawner-block-entity-get-block-entity), [`get-spawn-count`](#operation-mob-spawner-block-entity-get-spawn-count), [`get-spawn-range`](#operation-mob-spawner-block-entity-get-spawn-range), [`get-delay`](#operation-mob-spawner-block-entity-get-delay).

### `map-block-entity` {#type-map-block-entity}

Methods: [`get-block-entity`](#operation-map-block-entity-get-block-entity), [`get-map-id`](#operation-map-block-entity-get-map-id), [`set-map-id`](#operation-map-block-entity-set-map-id), [`get-colors`](#operation-map-block-entity-get-colors), [`set-colors`](#operation-map-block-entity-set-colors), [`set-pixel`](#operation-map-block-entity-set-pixel), [`get-pixel`](#operation-map-block-entity-get-pixel), [`update`](#operation-map-block-entity-update), [`stream-frame`](#operation-map-block-entity-stream-frame).

### `hanging-sign-block-entity` {#type-hanging-sign-block-entity}

Methods: [`get-block-entity`](#operation-hanging-sign-block-entity-get-block-entity), [`get-front-text`](#operation-hanging-sign-block-entity-get-front-text), [`set-front-text`](#operation-hanging-sign-block-entity-set-front-text), [`get-back-text`](#operation-hanging-sign-block-entity-get-back-text), [`set-back-text`](#operation-hanging-sign-block-entity-set-back-text), [`is-waxed`](#operation-hanging-sign-block-entity-is-waxed), [`set-waxed`](#operation-hanging-sign-block-entity-set-waxed).

### `trapped-chest-block-entity` {#type-trapped-chest-block-entity}

Methods: [`get-block-entity`](#operation-trapped-chest-block-entity-get-block-entity), [`get-container`](#operation-trapped-chest-block-entity-get-container), [`viewer-count`](#operation-trapped-chest-block-entity-viewer-count).

### `banner-block-entity` {#type-banner-block-entity}

Methods: [`get-block-entity`](#operation-banner-block-entity-get-block-entity), [`get-custom-name`](#operation-banner-block-entity-get-custom-name).

### `barrel-block-entity` {#type-barrel-block-entity}

Methods: [`get-block-entity`](#operation-barrel-block-entity-get-block-entity), [`get-container`](#operation-barrel-block-entity-get-container), [`viewer-count`](#operation-barrel-block-entity-viewer-count).

### `beacon-block-entity` {#type-beacon-block-entity}

Methods: [`get-block-entity`](#operation-beacon-block-entity-get-block-entity), [`get-container`](#operation-beacon-block-entity-get-container), [`get-primary-effect`](#operation-beacon-block-entity-get-primary-effect), [`get-secondary-effect`](#operation-beacon-block-entity-get-secondary-effect), [`get-levels`](#operation-beacon-block-entity-get-levels).

### `bed-block-entity` {#type-bed-block-entity}

Methods: [`get-block-entity`](#operation-bed-block-entity-get-block-entity).

### `beehive-block-entity` {#type-beehive-block-entity}

Methods: [`get-block-entity`](#operation-beehive-block-entity-get-block-entity), [`get-bee-count`](#operation-beehive-block-entity-get-bee-count).

### `bell-block-entity` {#type-bell-block-entity}

Methods: [`get-block-entity`](#operation-bell-block-entity-get-block-entity), [`is-ringing`](#operation-bell-block-entity-is-ringing), [`get-ring-ticks`](#operation-bell-block-entity-get-ring-ticks).

### `blasting-furnace-block-entity` {#type-blasting-furnace-block-entity}

Methods: [`get-block-entity`](#operation-blasting-furnace-block-entity-get-block-entity), [`get-container`](#operation-blasting-furnace-block-entity-get-container), [`get-cooking-time-spent`](#operation-blasting-furnace-block-entity-get-cooking-time-spent), [`get-cooking-total-time`](#operation-blasting-furnace-block-entity-get-cooking-total-time), [`get-lit-time-remaining`](#operation-blasting-furnace-block-entity-get-lit-time-remaining), [`get-lit-total-time`](#operation-blasting-furnace-block-entity-get-lit-total-time), [`is-burning`](#operation-blasting-furnace-block-entity-is-burning).

### `brewing-stand-block-entity` {#type-brewing-stand-block-entity}

Methods: [`get-block-entity`](#operation-brewing-stand-block-entity-get-block-entity), [`get-container`](#operation-brewing-stand-block-entity-get-container), [`get-brew-time`](#operation-brewing-stand-block-entity-get-brew-time), [`get-fuel`](#operation-brewing-stand-block-entity-get-fuel).

### `brushable-block-block-entity` {#type-brushable-block-block-entity}

Methods: [`get-block-entity`](#operation-brushable-block-block-entity-get-block-entity).

### `calibrated-sculk-sensor-block-entity` {#type-calibrated-sculk-sensor-block-entity}

Methods: [`get-block-entity`](#operation-calibrated-sculk-sensor-block-entity-get-block-entity).

### `campfire-block-entity` {#type-campfire-block-entity}

Methods: [`get-block-entity`](#operation-campfire-block-entity-get-block-entity), [`get-container`](#operation-campfire-block-entity-get-container).

### `chiseled-bookshelf-block-entity` {#type-chiseled-bookshelf-block-entity}

Methods: [`get-block-entity`](#operation-chiseled-bookshelf-block-entity-get-block-entity), [`get-container`](#operation-chiseled-bookshelf-block-entity-get-container), [`get-last-interacted-slot`](#operation-chiseled-bookshelf-block-entity-get-last-interacted-slot).

### `comparator-block-entity` {#type-comparator-block-entity}

Methods: [`get-block-entity`](#operation-comparator-block-entity-get-block-entity), [`get-output-signal`](#operation-comparator-block-entity-get-output-signal).

### `conduit-block-entity` {#type-conduit-block-entity}

Methods: [`get-block-entity`](#operation-conduit-block-entity-get-block-entity).

### `copper-golem-statue-block-entity` {#type-copper-golem-statue-block-entity}

Methods: [`get-block-entity`](#operation-copper-golem-statue-block-entity-get-block-entity).

### `crafter-block-entity` {#type-crafter-block-entity}

Methods: [`get-block-entity`](#operation-crafter-block-entity-get-block-entity), [`get-container`](#operation-crafter-block-entity-get-container), [`get-crafting-ticks-remaining`](#operation-crafter-block-entity-get-crafting-ticks-remaining), [`is-triggered`](#operation-crafter-block-entity-is-triggered).

### `creaking-heart-block-entity` {#type-creaking-heart-block-entity}

Methods: [`get-block-entity`](#operation-creaking-heart-block-entity-get-block-entity), [`get-creaking-uuid`](#operation-creaking-heart-block-entity-get-creaking-uuid).

### `daylight-detector-block-entity` {#type-daylight-detector-block-entity}

Methods: [`get-block-entity`](#operation-daylight-detector-block-entity-get-block-entity).

### `decorated-pot-block-entity` {#type-decorated-pot-block-entity}

Methods: [`get-block-entity`](#operation-decorated-pot-block-entity-get-block-entity).

### `dispenser-block-entity` {#type-dispenser-block-entity}

Methods: [`get-block-entity`](#operation-dispenser-block-entity-get-block-entity), [`get-container`](#operation-dispenser-block-entity-get-container).

### `dropper-block-entity` {#type-dropper-block-entity}

Methods: [`get-block-entity`](#operation-dropper-block-entity-get-block-entity), [`get-container`](#operation-dropper-block-entity-get-container).

### `enchanting-table-block-entity` {#type-enchanting-table-block-entity}

Methods: [`get-block-entity`](#operation-enchanting-table-block-entity-get-block-entity).

### `end-gateway-block-entity` {#type-end-gateway-block-entity}

Methods: [`get-block-entity`](#operation-end-gateway-block-entity-get-block-entity), [`get-age`](#operation-end-gateway-block-entity-get-age), [`is-exact-teleport`](#operation-end-gateway-block-entity-is-exact-teleport).

### `end-portal-block-entity` {#type-end-portal-block-entity}

Methods: [`get-block-entity`](#operation-end-portal-block-entity-get-block-entity).

### `ender-chest-block-entity` {#type-ender-chest-block-entity}

Methods: [`get-block-entity`](#operation-ender-chest-block-entity-get-block-entity), [`viewer-count`](#operation-ender-chest-block-entity-viewer-count).

### `furnace-block-entity` {#type-furnace-block-entity}

Methods: [`get-block-entity`](#operation-furnace-block-entity-get-block-entity), [`get-container`](#operation-furnace-block-entity-get-container), [`get-cooking-time-spent`](#operation-furnace-block-entity-get-cooking-time-spent), [`get-cooking-total-time`](#operation-furnace-block-entity-get-cooking-total-time), [`get-lit-time-remaining`](#operation-furnace-block-entity-get-lit-time-remaining), [`get-lit-total-time`](#operation-furnace-block-entity-get-lit-total-time), [`is-burning`](#operation-furnace-block-entity-is-burning).

### `hopper-block-entity` {#type-hopper-block-entity}

Methods: [`get-block-entity`](#operation-hopper-block-entity-get-block-entity), [`get-container`](#operation-hopper-block-entity-get-container), [`get-cooldown`](#operation-hopper-block-entity-get-cooldown).

### `jigsaw-block-entity` {#type-jigsaw-block-entity}

Methods: [`get-block-entity`](#operation-jigsaw-block-entity-get-block-entity), [`get-name`](#operation-jigsaw-block-entity-get-name), [`get-target`](#operation-jigsaw-block-entity-get-target), [`get-pool`](#operation-jigsaw-block-entity-get-pool), [`get-final-state`](#operation-jigsaw-block-entity-get-final-state), [`get-selection-priority`](#operation-jigsaw-block-entity-get-selection-priority), [`get-placement-priority`](#operation-jigsaw-block-entity-get-placement-priority).

### `lectern-block-entity` {#type-lectern-block-entity}

Methods: [`get-block-entity`](#operation-lectern-block-entity-get-block-entity), [`get-container`](#operation-lectern-block-entity-get-container), [`get-page`](#operation-lectern-block-entity-get-page).

### `piston-block-entity` {#type-piston-block-entity}

Methods: [`get-block-entity`](#operation-piston-block-entity-get-block-entity), [`get-progress`](#operation-piston-block-entity-get-progress), [`is-extending`](#operation-piston-block-entity-is-extending), [`is-source`](#operation-piston-block-entity-is-source).

### `potent-sulfur-block-entity` {#type-potent-sulfur-block-entity}

Methods: [`get-block-entity`](#operation-potent-sulfur-block-entity-get-block-entity).

### `sculk-catalyst-block-entity` {#type-sculk-catalyst-block-entity}

Methods: [`get-block-entity`](#operation-sculk-catalyst-block-entity-get-block-entity).

### `sculk-sensor-block-entity` {#type-sculk-sensor-block-entity}

Methods: [`get-block-entity`](#operation-sculk-sensor-block-entity-get-block-entity).

### `sculk-shrieker-block-entity` {#type-sculk-shrieker-block-entity}

Methods: [`get-block-entity`](#operation-sculk-shrieker-block-entity-get-block-entity), [`get-warning-level`](#operation-sculk-shrieker-block-entity-get-warning-level).

### `shelf-block-entity` {#type-shelf-block-entity}

Methods: [`get-block-entity`](#operation-shelf-block-entity-get-block-entity), [`get-container`](#operation-shelf-block-entity-get-container).

### `shulker-box-block-entity` {#type-shulker-box-block-entity}

Methods: [`get-block-entity`](#operation-shulker-box-block-entity-get-block-entity), [`get-container`](#operation-shulker-box-block-entity-get-container), [`viewer-count`](#operation-shulker-box-block-entity-viewer-count).

### `skull-block-entity` {#type-skull-block-entity}

Methods: [`get-block-entity`](#operation-skull-block-entity-get-block-entity), [`get-note-block-sound`](#operation-skull-block-entity-get-note-block-sound).

### `smoker-block-entity` {#type-smoker-block-entity}

Methods: [`get-block-entity`](#operation-smoker-block-entity-get-block-entity), [`get-container`](#operation-smoker-block-entity-get-container), [`get-cooking-time-spent`](#operation-smoker-block-entity-get-cooking-time-spent), [`get-cooking-total-time`](#operation-smoker-block-entity-get-cooking-total-time), [`get-lit-time-remaining`](#operation-smoker-block-entity-get-lit-time-remaining), [`get-lit-total-time`](#operation-smoker-block-entity-get-lit-total-time), [`is-burning`](#operation-smoker-block-entity-is-burning).

### `structure-block-block-entity` {#type-structure-block-block-entity}

Methods: [`get-block-entity`](#operation-structure-block-block-entity-get-block-entity), [`get-name`](#operation-structure-block-block-entity-get-name), [`get-author`](#operation-structure-block-block-entity-get-author), [`get-mode`](#operation-structure-block-block-entity-get-mode), [`get-integrity`](#operation-structure-block-block-entity-get-integrity), [`get-seed`](#operation-structure-block-block-entity-get-seed).

### `test-block-block-entity` {#type-test-block-block-entity}

Methods: [`get-block-entity`](#operation-test-block-block-entity-get-block-entity).

### `test-instance-block-block-entity` {#type-test-instance-block-block-entity}

Methods: [`get-block-entity`](#operation-test-instance-block-block-entity-get-block-entity).

### `trial-spawner-block-entity` {#type-trial-spawner-block-entity}

Methods: [`get-block-entity`](#operation-trial-spawner-block-entity-get-block-entity).

### `vault-block-entity` {#type-vault-block-entity}

Methods: [`get-block-entity`](#operation-vault-block-entity-get-block-entity).

### `block-entity-type` {#type-block-entity-type}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `command-block-entity` | `command-block-entity` |
| `sign-block-entity` | `sign-block-entity` |
| `hanging-sign-block-entity` | `hanging-sign-block-entity` |
| `jukebox-block-entity` | `jukebox-block-entity` |
| `chest-block-entity` | `chest-block-entity` |
| `trapped-chest-block-entity` | `trapped-chest-block-entity` |
| `mob-spawner-block-entity` | `mob-spawner-block-entity` |
| `map-block-entity` | `map-block-entity` |
| `banner-block-entity` | `banner-block-entity` |
| `barrel-block-entity` | `barrel-block-entity` |
| `beacon-block-entity` | `beacon-block-entity` |
| `bed-block-entity` | `bed-block-entity` |
| `beehive-block-entity` | `beehive-block-entity` |
| `bell-block-entity` | `bell-block-entity` |
| `blasting-furnace-block-entity` | `blasting-furnace-block-entity` |
| `brewing-stand-block-entity` | `brewing-stand-block-entity` |
| `brushable-block-block-entity` | `brushable-block-block-entity` |
| `calibrated-sculk-sensor-block-entity` | `calibrated-sculk-sensor-block-entity` |
| `campfire-block-entity` | `campfire-block-entity` |
| `chiseled-bookshelf-block-entity` | `chiseled-bookshelf-block-entity` |
| `comparator-block-entity` | `comparator-block-entity` |
| `conduit-block-entity` | `conduit-block-entity` |
| `copper-golem-statue-block-entity` | `copper-golem-statue-block-entity` |
| `crafter-block-entity` | `crafter-block-entity` |
| `creaking-heart-block-entity` | `creaking-heart-block-entity` |
| `daylight-detector-block-entity` | `daylight-detector-block-entity` |
| `decorated-pot-block-entity` | `decorated-pot-block-entity` |
| `dispenser-block-entity` | `dispenser-block-entity` |
| `dropper-block-entity` | `dropper-block-entity` |
| `enchanting-table-block-entity` | `enchanting-table-block-entity` |
| `end-gateway-block-entity` | `end-gateway-block-entity` |
| `end-portal-block-entity` | `end-portal-block-entity` |
| `ender-chest-block-entity` | `ender-chest-block-entity` |
| `furnace-block-entity` | `furnace-block-entity` |
| `hopper-block-entity` | `hopper-block-entity` |
| `jigsaw-block-entity` | `jigsaw-block-entity` |
| `lectern-block-entity` | `lectern-block-entity` |
| `piston-block-entity` | `piston-block-entity` |
| `potent-sulfur-block-entity` | `potent-sulfur-block-entity` |
| `sculk-catalyst-block-entity` | `sculk-catalyst-block-entity` |
| `sculk-sensor-block-entity` | `sculk-sensor-block-entity` |
| `sculk-shrieker-block-entity` | `sculk-shrieker-block-entity` |
| `shelf-block-entity` | `shelf-block-entity` |
| `shulker-box-block-entity` | `shulker-box-block-entity` |
| `skull-block-entity` | `skull-block-entity` |
| `smoker-block-entity` | `smoker-block-entity` |
| `structure-block-block-entity` | `structure-block-block-entity` |
| `test-block-block-entity` | `test-block-block-entity` |
| `test-instance-block-block-entity` | `test-instance-block-block-entity` |
| `trial-spawner-block-entity` | `trial-spawner-block-entity` |
| `vault-block-entity` | `vault-block-entity` |
| `container-block-entity` | `container-block-entity` |

## Operation Details

### `block-entity.resource-location` {#operation-block-entity-resource-location}

```text
resource-location: func() -> string;
```

**Returns:** `string`

### `block-entity.get-position` {#operation-block-entity-get-position}

```text
get-position: func() -> block-pos;
```

**Returns:** `block-pos`

### `block-entity.get-id` {#operation-block-entity-get-id}

```text
get-id: func() -> u32;
```

**Returns:** `u32`

### `block-entity.is-dirty` {#operation-block-entity-is-dirty}

```text
is-dirty: func() -> bool;
```

**Returns:** `bool`

### `block-entity.clear-dirty` {#operation-block-entity-clear-dirty}

```text
clear-dirty: func();
```

### `block-entity.set-custom-data` {#operation-block-entity-set-custom-data}

```text
set-custom-data: func(namespace: string, key: string, value: nbt-tree);
```

Sets a namespaced custom data value on this block entity.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |
| `value` | `nbt-tree` |

### `block-entity.get-custom-data` {#operation-block-entity-get-custom-data}

```text
get-custom-data: func(namespace: string, key: string) -> option<nbt-tree>;
```

Returns a namespaced custom data value from this block entity, if set.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `option<nbt-tree>`

### `block-entity.remove-custom-data` {#operation-block-entity-remove-custom-data}

```text
remove-custom-data: func(namespace: string, key: string);
```

Removes a namespaced custom data value from this block entity.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

### `block-entity.has-custom-data` {#operation-block-entity-has-custom-data}

```text
has-custom-data: func(namespace: string, key: string) -> bool;
```

Returns whether this block entity has a namespaced custom data value.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `bool`

### `container-block-entity.get-block-entity` {#operation-container-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `container-block-entity.get-inventory` {#operation-container-block-entity-get-inventory}

```text
get-inventory: func() -> inventory;
```

Returns the generic inventory handle for this container.

**Returns:** `inventory`

### `container-block-entity.get-size` {#operation-container-block-entity-get-size}

```text
get-size: func() -> u32;
```

**Returns:** `u32`

### `container-block-entity.is-empty` {#operation-container-block-entity-is-empty}

```text
is-empty: func() -> bool;
```

**Returns:** `bool`

### `container-block-entity.get-stack` {#operation-container-block-entity-get-stack}

```text
get-stack: func(slot: u32) -> option<item-stack>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u32` |

**Returns:** `option<item-stack>`

### `container-block-entity.set-stack` {#operation-container-block-entity-set-stack}

```text
set-stack: func(slot: u32, stack: option<item-stack>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u32` |
| `stack` | `option<item-stack>` |

### `container-block-entity.remove-stack` {#operation-container-block-entity-remove-stack}

```text
remove-stack: func(slot: u32) -> option<item-stack>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u32` |

**Returns:** `option<item-stack>`

### `container-block-entity.clear` {#operation-container-block-entity-clear}

```text
clear: func();
```

### `command-block-entity.last-output` {#operation-command-block-entity-last-output}

```text
last-output: func() -> string;
```

**Returns:** `string`

### `command-block-entity.track-output` {#operation-command-block-entity-track-output}

```text
track-output: func() -> bool;
```

**Returns:** `bool`

### `command-block-entity.success-count` {#operation-command-block-entity-success-count}

```text
success-count: func() -> u32;
```

**Returns:** `u32`

### `command-block-entity.command` {#operation-command-block-entity-command}

```text
command: func() -> string;
```

**Returns:** `string`

### `command-block-entity.auto` {#operation-command-block-entity-auto}

```text
auto: func() -> bool;
```

**Returns:** `bool`

### `command-block-entity.condition-met` {#operation-command-block-entity-condition-met}

```text
condition-met: func() -> bool;
```

**Returns:** `bool`

### `command-block-entity.powered` {#operation-command-block-entity-powered}

```text
powered: func() -> bool;
```

**Returns:** `bool`

### `sign-block-entity.get-block-entity` {#operation-sign-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `sign-block-entity.get-front-text` {#operation-sign-block-entity-get-front-text}

```text
get-front-text: func() -> sign-text;
```

**Returns:** `sign-text`

### `sign-block-entity.set-front-text` {#operation-sign-block-entity-set-front-text}

```text
set-front-text: func(text: sign-text);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `sign-text` |

### `sign-block-entity.get-back-text` {#operation-sign-block-entity-get-back-text}

```text
get-back-text: func() -> sign-text;
```

**Returns:** `sign-text`

### `sign-block-entity.set-back-text` {#operation-sign-block-entity-set-back-text}

```text
set-back-text: func(text: sign-text);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `sign-text` |

### `sign-block-entity.is-waxed` {#operation-sign-block-entity-is-waxed}

```text
is-waxed: func() -> bool;
```

**Returns:** `bool`

### `sign-block-entity.set-waxed` {#operation-sign-block-entity-set-waxed}

```text
set-waxed: func(waxed: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `waxed` | `bool` |

### `jukebox-block-entity.get-block-entity` {#operation-jukebox-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `jukebox-block-entity.get-container` {#operation-jukebox-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `jukebox-block-entity.is-playing` {#operation-jukebox-block-entity-is-playing}

```text
is-playing: func() -> bool;
```

**Returns:** `bool`

### `jukebox-block-entity.stop-playing` {#operation-jukebox-block-entity-stop-playing}

```text
stop-playing: func();
```

### `jukebox-block-entity.start-playing` {#operation-jukebox-block-entity-start-playing}

```text
start-playing: func(length-in-ticks: u64);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `length-in-ticks` | `u64` |

### `chest-block-entity.get-block-entity` {#operation-chest-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `chest-block-entity.get-container` {#operation-chest-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `chest-block-entity.viewer-count` {#operation-chest-block-entity-viewer-count}

```text
viewer-count: func() -> u32;
```

**Returns:** `u32`

### `mob-spawner-block-entity.get-block-entity` {#operation-mob-spawner-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `mob-spawner-block-entity.get-spawn-count` {#operation-mob-spawner-block-entity-get-spawn-count}

```text
get-spawn-count: func() -> s32;
```

**Returns:** `s32`

### `mob-spawner-block-entity.get-spawn-range` {#operation-mob-spawner-block-entity-get-spawn-range}

```text
get-spawn-range: func() -> s32;
```

**Returns:** `s32`

### `mob-spawner-block-entity.get-delay` {#operation-mob-spawner-block-entity-get-delay}

```text
get-delay: func() -> s32;
```

**Returns:** `s32`

### `map-block-entity.get-block-entity` {#operation-map-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `map-block-entity.get-map-id` {#operation-map-block-entity-get-map-id}

```text
get-map-id: func() -> s32;
```

**Returns:** `s32`

### `map-block-entity.set-map-id` {#operation-map-block-entity-set-map-id}

```text
set-map-id: func(map-id: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `map-id` | `s32` |

### `map-block-entity.get-colors` {#operation-map-block-entity-get-colors}

```text
get-colors: func() -> list<u8>;
```

**Returns:** `list<u8>`

### `map-block-entity.set-colors` {#operation-map-block-entity-set-colors}

```text
set-colors: func(colors: list<u8>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `colors` | `list<u8>` |

### `map-block-entity.set-pixel` {#operation-map-block-entity-set-pixel}

```text
set-pixel: func(x: u32, y: u32, color: u8);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `u32` |
| `y` | `u32` |
| `color` | `u8` |

### `map-block-entity.get-pixel` {#operation-map-block-entity-get-pixel}

```text
get-pixel: func(x: u32, y: u32) -> u8;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `x` | `u32` |
| `y` | `u32` |

**Returns:** `u8`

### `map-block-entity.update` {#operation-map-block-entity-update}

```text
update: func();
```

### `map-block-entity.stream-frame` {#operation-map-block-entity-stream-frame}

```text
stream-frame: func(frame-data: list<u8>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `frame-data` | `list<u8>` |

### `hanging-sign-block-entity.get-block-entity` {#operation-hanging-sign-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `hanging-sign-block-entity.get-front-text` {#operation-hanging-sign-block-entity-get-front-text}

```text
get-front-text: func() -> sign-text;
```

**Returns:** `sign-text`

### `hanging-sign-block-entity.set-front-text` {#operation-hanging-sign-block-entity-set-front-text}

```text
set-front-text: func(text: sign-text);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `sign-text` |

### `hanging-sign-block-entity.get-back-text` {#operation-hanging-sign-block-entity-get-back-text}

```text
get-back-text: func() -> sign-text;
```

**Returns:** `sign-text`

### `hanging-sign-block-entity.set-back-text` {#operation-hanging-sign-block-entity-set-back-text}

```text
set-back-text: func(text: sign-text);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `sign-text` |

### `hanging-sign-block-entity.is-waxed` {#operation-hanging-sign-block-entity-is-waxed}

```text
is-waxed: func() -> bool;
```

**Returns:** `bool`

### `hanging-sign-block-entity.set-waxed` {#operation-hanging-sign-block-entity-set-waxed}

```text
set-waxed: func(waxed: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `waxed` | `bool` |

### `trapped-chest-block-entity.get-block-entity` {#operation-trapped-chest-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `trapped-chest-block-entity.get-container` {#operation-trapped-chest-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `trapped-chest-block-entity.viewer-count` {#operation-trapped-chest-block-entity-viewer-count}

```text
viewer-count: func() -> u32;
```

**Returns:** `u32`

### `banner-block-entity.get-block-entity` {#operation-banner-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `banner-block-entity.get-custom-name` {#operation-banner-block-entity-get-custom-name}

```text
get-custom-name: func() -> option<string>;
```

**Returns:** `option<string>`

### `barrel-block-entity.get-block-entity` {#operation-barrel-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `barrel-block-entity.get-container` {#operation-barrel-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `barrel-block-entity.viewer-count` {#operation-barrel-block-entity-viewer-count}

```text
viewer-count: func() -> u32;
```

**Returns:** `u32`

### `beacon-block-entity.get-block-entity` {#operation-beacon-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `beacon-block-entity.get-container` {#operation-beacon-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `beacon-block-entity.get-primary-effect` {#operation-beacon-block-entity-get-primary-effect}

```text
get-primary-effect: func() -> s32;
```

**Returns:** `s32`

### `beacon-block-entity.get-secondary-effect` {#operation-beacon-block-entity-get-secondary-effect}

```text
get-secondary-effect: func() -> s32;
```

**Returns:** `s32`

### `beacon-block-entity.get-levels` {#operation-beacon-block-entity-get-levels}

```text
get-levels: func() -> s32;
```

**Returns:** `s32`

### `bed-block-entity.get-block-entity` {#operation-bed-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `beehive-block-entity.get-block-entity` {#operation-beehive-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `beehive-block-entity.get-bee-count` {#operation-beehive-block-entity-get-bee-count}

```text
get-bee-count: func() -> u32;
```

**Returns:** `u32`

### `bell-block-entity.get-block-entity` {#operation-bell-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `bell-block-entity.is-ringing` {#operation-bell-block-entity-is-ringing}

```text
is-ringing: func() -> bool;
```

**Returns:** `bool`

### `bell-block-entity.get-ring-ticks` {#operation-bell-block-entity-get-ring-ticks}

```text
get-ring-ticks: func() -> s32;
```

**Returns:** `s32`

### `blasting-furnace-block-entity.get-block-entity` {#operation-blasting-furnace-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `blasting-furnace-block-entity.get-container` {#operation-blasting-furnace-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `blasting-furnace-block-entity.get-cooking-time-spent` {#operation-blasting-furnace-block-entity-get-cooking-time-spent}

```text
get-cooking-time-spent: func() -> u16;
```

**Returns:** `u16`

### `blasting-furnace-block-entity.get-cooking-total-time` {#operation-blasting-furnace-block-entity-get-cooking-total-time}

```text
get-cooking-total-time: func() -> u16;
```

**Returns:** `u16`

### `blasting-furnace-block-entity.get-lit-time-remaining` {#operation-blasting-furnace-block-entity-get-lit-time-remaining}

```text
get-lit-time-remaining: func() -> u16;
```

**Returns:** `u16`

### `blasting-furnace-block-entity.get-lit-total-time` {#operation-blasting-furnace-block-entity-get-lit-total-time}

```text
get-lit-total-time: func() -> u16;
```

**Returns:** `u16`

### `blasting-furnace-block-entity.is-burning` {#operation-blasting-furnace-block-entity-is-burning}

```text
is-burning: func() -> bool;
```

**Returns:** `bool`

### `brewing-stand-block-entity.get-block-entity` {#operation-brewing-stand-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `brewing-stand-block-entity.get-container` {#operation-brewing-stand-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `brewing-stand-block-entity.get-brew-time` {#operation-brewing-stand-block-entity-get-brew-time}

```text
get-brew-time: func() -> s32;
```

**Returns:** `s32`

### `brewing-stand-block-entity.get-fuel` {#operation-brewing-stand-block-entity-get-fuel}

```text
get-fuel: func() -> s32;
```

**Returns:** `s32`

### `brushable-block-block-entity.get-block-entity` {#operation-brushable-block-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `calibrated-sculk-sensor-block-entity.get-block-entity` {#operation-calibrated-sculk-sensor-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `campfire-block-entity.get-block-entity` {#operation-campfire-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `campfire-block-entity.get-container` {#operation-campfire-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `chiseled-bookshelf-block-entity.get-block-entity` {#operation-chiseled-bookshelf-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `chiseled-bookshelf-block-entity.get-container` {#operation-chiseled-bookshelf-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `chiseled-bookshelf-block-entity.get-last-interacted-slot` {#operation-chiseled-bookshelf-block-entity-get-last-interacted-slot}

```text
get-last-interacted-slot: func() -> s8;
```

**Returns:** `s8`

### `comparator-block-entity.get-block-entity` {#operation-comparator-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `comparator-block-entity.get-output-signal` {#operation-comparator-block-entity-get-output-signal}

```text
get-output-signal: func() -> u8;
```

**Returns:** `u8`

### `conduit-block-entity.get-block-entity` {#operation-conduit-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `copper-golem-statue-block-entity.get-block-entity` {#operation-copper-golem-statue-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `crafter-block-entity.get-block-entity` {#operation-crafter-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `crafter-block-entity.get-container` {#operation-crafter-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `crafter-block-entity.get-crafting-ticks-remaining` {#operation-crafter-block-entity-get-crafting-ticks-remaining}

```text
get-crafting-ticks-remaining: func() -> s32;
```

**Returns:** `s32`

### `crafter-block-entity.is-triggered` {#operation-crafter-block-entity-is-triggered}

```text
is-triggered: func() -> bool;
```

**Returns:** `bool`

### `creaking-heart-block-entity.get-block-entity` {#operation-creaking-heart-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `creaking-heart-block-entity.get-creaking-uuid` {#operation-creaking-heart-block-entity-get-creaking-uuid}

```text
get-creaking-uuid: func() -> option<string>;
```

**Returns:** `option<string>`

### `daylight-detector-block-entity.get-block-entity` {#operation-daylight-detector-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `decorated-pot-block-entity.get-block-entity` {#operation-decorated-pot-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `dispenser-block-entity.get-block-entity` {#operation-dispenser-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `dispenser-block-entity.get-container` {#operation-dispenser-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `dropper-block-entity.get-block-entity` {#operation-dropper-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `dropper-block-entity.get-container` {#operation-dropper-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `enchanting-table-block-entity.get-block-entity` {#operation-enchanting-table-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `end-gateway-block-entity.get-block-entity` {#operation-end-gateway-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `end-gateway-block-entity.get-age` {#operation-end-gateway-block-entity-get-age}

```text
get-age: func() -> s64;
```

**Returns:** `s64`

### `end-gateway-block-entity.is-exact-teleport` {#operation-end-gateway-block-entity-is-exact-teleport}

```text
is-exact-teleport: func() -> bool;
```

**Returns:** `bool`

### `end-portal-block-entity.get-block-entity` {#operation-end-portal-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `ender-chest-block-entity.get-block-entity` {#operation-ender-chest-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `ender-chest-block-entity.viewer-count` {#operation-ender-chest-block-entity-viewer-count}

```text
viewer-count: func() -> u32;
```

**Returns:** `u32`

### `furnace-block-entity.get-block-entity` {#operation-furnace-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `furnace-block-entity.get-container` {#operation-furnace-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `furnace-block-entity.get-cooking-time-spent` {#operation-furnace-block-entity-get-cooking-time-spent}

```text
get-cooking-time-spent: func() -> u16;
```

**Returns:** `u16`

### `furnace-block-entity.get-cooking-total-time` {#operation-furnace-block-entity-get-cooking-total-time}

```text
get-cooking-total-time: func() -> u16;
```

**Returns:** `u16`

### `furnace-block-entity.get-lit-time-remaining` {#operation-furnace-block-entity-get-lit-time-remaining}

```text
get-lit-time-remaining: func() -> u16;
```

**Returns:** `u16`

### `furnace-block-entity.get-lit-total-time` {#operation-furnace-block-entity-get-lit-total-time}

```text
get-lit-total-time: func() -> u16;
```

**Returns:** `u16`

### `furnace-block-entity.is-burning` {#operation-furnace-block-entity-is-burning}

```text
is-burning: func() -> bool;
```

**Returns:** `bool`

### `hopper-block-entity.get-block-entity` {#operation-hopper-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `hopper-block-entity.get-container` {#operation-hopper-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `hopper-block-entity.get-cooldown` {#operation-hopper-block-entity-get-cooldown}

```text
get-cooldown: func() -> s32;
```

**Returns:** `s32`

### `jigsaw-block-entity.get-block-entity` {#operation-jigsaw-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `jigsaw-block-entity.get-name` {#operation-jigsaw-block-entity-get-name}

```text
get-name: func() -> string;
```

**Returns:** `string`

### `jigsaw-block-entity.get-target` {#operation-jigsaw-block-entity-get-target}

```text
get-target: func() -> string;
```

**Returns:** `string`

### `jigsaw-block-entity.get-pool` {#operation-jigsaw-block-entity-get-pool}

```text
get-pool: func() -> string;
```

**Returns:** `string`

### `jigsaw-block-entity.get-final-state` {#operation-jigsaw-block-entity-get-final-state}

```text
get-final-state: func() -> string;
```

**Returns:** `string`

### `jigsaw-block-entity.get-selection-priority` {#operation-jigsaw-block-entity-get-selection-priority}

```text
get-selection-priority: func() -> s32;
```

**Returns:** `s32`

### `jigsaw-block-entity.get-placement-priority` {#operation-jigsaw-block-entity-get-placement-priority}

```text
get-placement-priority: func() -> s32;
```

**Returns:** `s32`

### `lectern-block-entity.get-block-entity` {#operation-lectern-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `lectern-block-entity.get-container` {#operation-lectern-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `lectern-block-entity.get-page` {#operation-lectern-block-entity-get-page}

```text
get-page: func() -> u32;
```

**Returns:** `u32`

### `piston-block-entity.get-block-entity` {#operation-piston-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `piston-block-entity.get-progress` {#operation-piston-block-entity-get-progress}

```text
get-progress: func() -> f32;
```

**Returns:** `f32`

### `piston-block-entity.is-extending` {#operation-piston-block-entity-is-extending}

```text
is-extending: func() -> bool;
```

**Returns:** `bool`

### `piston-block-entity.is-source` {#operation-piston-block-entity-is-source}

```text
is-source: func() -> bool;
```

**Returns:** `bool`

### `potent-sulfur-block-entity.get-block-entity` {#operation-potent-sulfur-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `sculk-catalyst-block-entity.get-block-entity` {#operation-sculk-catalyst-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `sculk-sensor-block-entity.get-block-entity` {#operation-sculk-sensor-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `sculk-shrieker-block-entity.get-block-entity` {#operation-sculk-shrieker-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `sculk-shrieker-block-entity.get-warning-level` {#operation-sculk-shrieker-block-entity-get-warning-level}

```text
get-warning-level: func() -> s32;
```

**Returns:** `s32`

### `shelf-block-entity.get-block-entity` {#operation-shelf-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `shelf-block-entity.get-container` {#operation-shelf-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `shulker-box-block-entity.get-block-entity` {#operation-shulker-box-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `shulker-box-block-entity.get-container` {#operation-shulker-box-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `shulker-box-block-entity.viewer-count` {#operation-shulker-box-block-entity-viewer-count}

```text
viewer-count: func() -> u32;
```

**Returns:** `u32`

### `skull-block-entity.get-block-entity` {#operation-skull-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `skull-block-entity.get-note-block-sound` {#operation-skull-block-entity-get-note-block-sound}

```text
get-note-block-sound: func() -> option<string>;
```

**Returns:** `option<string>`

### `smoker-block-entity.get-block-entity` {#operation-smoker-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `smoker-block-entity.get-container` {#operation-smoker-block-entity-get-container}

```text
get-container: func() -> container-block-entity;
```

**Returns:** `container-block-entity`

### `smoker-block-entity.get-cooking-time-spent` {#operation-smoker-block-entity-get-cooking-time-spent}

```text
get-cooking-time-spent: func() -> u16;
```

**Returns:** `u16`

### `smoker-block-entity.get-cooking-total-time` {#operation-smoker-block-entity-get-cooking-total-time}

```text
get-cooking-total-time: func() -> u16;
```

**Returns:** `u16`

### `smoker-block-entity.get-lit-time-remaining` {#operation-smoker-block-entity-get-lit-time-remaining}

```text
get-lit-time-remaining: func() -> u16;
```

**Returns:** `u16`

### `smoker-block-entity.get-lit-total-time` {#operation-smoker-block-entity-get-lit-total-time}

```text
get-lit-total-time: func() -> u16;
```

**Returns:** `u16`

### `smoker-block-entity.is-burning` {#operation-smoker-block-entity-is-burning}

```text
is-burning: func() -> bool;
```

**Returns:** `bool`

### `structure-block-block-entity.get-block-entity` {#operation-structure-block-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `structure-block-block-entity.get-name` {#operation-structure-block-block-entity-get-name}

```text
get-name: func() -> string;
```

**Returns:** `string`

### `structure-block-block-entity.get-author` {#operation-structure-block-block-entity-get-author}

```text
get-author: func() -> string;
```

**Returns:** `string`

### `structure-block-block-entity.get-mode` {#operation-structure-block-block-entity-get-mode}

```text
get-mode: func() -> string;
```

**Returns:** `string`

### `structure-block-block-entity.get-integrity` {#operation-structure-block-block-entity-get-integrity}

```text
get-integrity: func() -> f32;
```

**Returns:** `f32`

### `structure-block-block-entity.get-seed` {#operation-structure-block-block-entity-get-seed}

```text
get-seed: func() -> s64;
```

**Returns:** `s64`

### `test-block-block-entity.get-block-entity` {#operation-test-block-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `test-instance-block-block-entity.get-block-entity` {#operation-test-instance-block-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `trial-spawner-block-entity.get-block-entity` {#operation-trial-spawner-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`

### `vault-block-entity.get-block-entity` {#operation-vault-block-entity-get-block-entity}

```text
get-block-entity: func() -> block-entity;
```

**Returns:** `block-entity`
