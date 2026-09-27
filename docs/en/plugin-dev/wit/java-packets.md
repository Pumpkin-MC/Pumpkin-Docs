---
title: Interface java-packets
outline: [2, 2]
---

# Interface `java-packets`

Shared types: `pumpkin:plugin/java-packets@0.1.0`

[Package summary](./)

Source: [java-packets.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-packets.wit)

Java clientbound and serverbound packets.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`uuid`](./uuid) | `uuid` |

## Type Summary

| Kind | Type |
| --- | --- |
| enum | [`action`](#type-action) |
| enum | [`action-type`](#type-action-type) |
| enum | [`animation`](#type-animation) |
| record | [`argument-signature`](#type-argument-signature) |
| variant | [`argument-type`](#type-argument-type) |
| record | [`argument-type-double`](#type-argument-type-double) |
| record | [`argument-type-entity`](#type-argument-type-entity) |
| record | [`argument-type-float`](#type-argument-type-float) |
| record | [`argument-type-integer`](#type-argument-type-integer) |
| record | [`argument-type-long`](#type-argument-type-long) |
| record | [`argument-type-resource`](#type-argument-type-resource) |
| record | [`argument-type-resource-key`](#type-argument-type-resource-key) |
| record | [`argument-type-resource-or-tag`](#type-argument-type-resource-or-tag) |
| record | [`argument-type-resource-or-tag-key`](#type-argument-type-resource-or-tag-key) |
| record | [`argument-type-score-holder`](#type-argument-type-score-holder) |
| record | [`argument-type-time`](#type-argument-type-time) |
| record | [`attribute-modifier`](#type-attribute-modifier) |
| variant | [`bossevent-action`](#type-bossevent-action) |
| record | [`bossevent-action-add`](#type-bossevent-action-add) |
| record | [`bossevent-action-update-style`](#type-bossevent-action-update-style) |
| record | [`c-acknowledge-block-change`](#type-c-acknowledge-block-change) |
| record | [`c-action-bar`](#type-c-action-bar) |
| record | [`c-add-resource-pack`](#type-c-add-resource-pack) |
| record | [`c-award-stats`](#type-c-award-stats) |
| record | [`c-block-entity-data`](#type-c-block-entity-data) |
| record | [`c-block-event`](#type-c-block-event) |
| record | [`c-block-update`](#type-c-block-update) |
| record | [`c-boss-event`](#type-c-boss-event) |
| record | [`c-center-chunk`](#type-c-center-chunk) |
| record | [`c-change-difficulty`](#type-c-change-difficulty) |
| record | [`c-chunk-batch-end`](#type-c-chunk-batch-end) |
| record | [`c-chunk-data`](#type-c-chunk-data) |
| record | [`c-chunks-biomes`](#type-c-chunks-biomes) |
| record | [`c-clear-title`](#type-c-clear-title) |
| record | [`c-close-container`](#type-c-close-container) |
| record | [`c-combat-death`](#type-c-combat-death) |
| record | [`c-combat-end`](#type-c-combat-end) |
| record | [`c-command-suggestions`](#type-c-command-suggestions) |
| record | [`c-commands`](#type-c-commands) |
| record | [`c-custom-chat-completions`](#type-c-custom-chat-completions) |
| record | [`c-custom-payload`](#type-c-custom-payload) |
| record | [`c-damage-event`](#type-c-damage-event) |
| record | [`c-debug-block-value`](#type-c-debug-block-value) |
| record | [`c-debug-chunk-value`](#type-c-debug-chunk-value) |
| record | [`c-debug-entity-value`](#type-c-debug-entity-value) |
| record | [`c-debug-event`](#type-c-debug-event) |
| record | [`c-debug-sample`](#type-c-debug-sample) |
| record | [`c-delete-chat`](#type-c-delete-chat) |
| record | [`c-disguised-chat-message`](#type-c-disguised-chat-message) |
| record | [`c-display-objective`](#type-c-display-objective) |
| record | [`c-encryption-request`](#type-c-encryption-request) |
| record | [`c-entity-animation`](#type-c-entity-animation) |
| record | [`c-entity-position-sync`](#type-c-entity-position-sync) |
| record | [`c-entity-sound-effect`](#type-c-entity-sound-effect) |
| record | [`c-entity-status`](#type-c-entity-status) |
| record | [`c-entity-velocity`](#type-c-entity-velocity) |
| record | [`c-explosion`](#type-c-explosion) |
| record | [`c-game-event`](#type-c-game-event) |
| record | [`c-game-rule-values`](#type-c-game-rule-values) |
| record | [`c-game-test-highlight-pos`](#type-c-game-test-highlight-pos) |
| record | [`c-head-rot`](#type-c-head-rot) |
| record | [`c-hurt-animation`](#type-c-hurt-animation) |
| record | [`c-initialize-world-border`](#type-c-initialize-world-border) |
| record | [`c-item-cooldown`](#type-c-item-cooldown) |
| record | [`c-keep-alive`](#type-c-keep-alive) |
| record | [`c-level-event`](#type-c-level-event) |
| record | [`c-light-update`](#type-c-light-update) |
| record | [`c-login`](#type-c-login) |
| record | [`c-login-success`](#type-c-login-success) |
| record | [`c-map-item-data`](#type-c-map-item-data) |
| record | [`c-merchant-offers`](#type-c-merchant-offers) |
| record | [`c-move-minecart-along-track`](#type-c-move-minecart-along-track) |
| record | [`c-move-vehicle`](#type-c-move-vehicle) |
| record | [`c-multi-block-update`](#type-c-multi-block-update) |
| record | [`c-open-book`](#type-c-open-book) |
| record | [`c-open-mount-screen`](#type-c-open-mount-screen) |
| record | [`c-open-screen`](#type-c-open-screen) |
| record | [`c-open-sign-editor`](#type-c-open-sign-editor) |
| record | [`c-particle`](#type-c-particle) |
| record | [`c-ping-response`](#type-c-ping-response) |
| record | [`c-place-ghost-recipe`](#type-c-place-ghost-recipe) |
| record | [`c-play-cookie-request`](#type-c-play-cookie-request) |
| record | [`c-play-custom-report-details`](#type-c-play-custom-report-details) |
| record | [`c-play-disconnect`](#type-c-play-disconnect) |
| record | [`c-play-ping`](#type-c-play-ping) |
| record | [`c-play-server-links`](#type-c-play-server-links) |
| record | [`c-play-show-dialog`](#type-c-play-show-dialog) |
| record | [`c-player-abilities`](#type-c-player-abilities) |
| record | [`c-player-chat-message`](#type-c-player-chat-message) |
| record | [`c-player-info-update`](#type-c-player-info-update) |
| record | [`c-player-look-at`](#type-c-player-look-at) |
| record | [`c-player-position`](#type-c-player-position) |
| record | [`c-player-rotation`](#type-c-player-rotation) |
| record | [`c-player-spawn-position`](#type-c-player-spawn-position) |
| record | [`c-post-effects`](#type-c-post-effects) |
| record | [`c-projectile-power`](#type-c-projectile-power) |
| record | [`c-recipe-book-add`](#type-c-recipe-book-add) |
| record | [`c-recipe-book-remove`](#type-c-recipe-book-remove) |
| record | [`c-recipe-book-settings`](#type-c-recipe-book-settings) |
| record | [`c-remove-entities`](#type-c-remove-entities) |
| record | [`c-remove-mob-effect`](#type-c-remove-mob-effect) |
| record | [`c-remove-player-info`](#type-c-remove-player-info) |
| record | [`c-remove-resource-pack`](#type-c-remove-resource-pack) |
| record | [`c-reset-score`](#type-c-reset-score) |
| record | [`c-respawn`](#type-c-respawn) |
| record | [`c-select-advancements-tab`](#type-c-select-advancements-tab) |
| record | [`c-server-data`](#type-c-server-data) |
| record | [`c-set-block-destroy-stage`](#type-c-set-block-destroy-stage) |
| record | [`c-set-border-center`](#type-c-set-border-center) |
| record | [`c-set-border-lerp-size`](#type-c-set-border-lerp-size) |
| record | [`c-set-border-size`](#type-c-set-border-size) |
| record | [`c-set-border-warning-delay`](#type-c-set-border-warning-delay) |
| record | [`c-set-border-warning-distance`](#type-c-set-border-warning-distance) |
| record | [`c-set-camera`](#type-c-set-camera) |
| record | [`c-set-chunk-cache-radius`](#type-c-set-chunk-cache-radius) |
| record | [`c-set-container-content`](#type-c-set-container-content) |
| record | [`c-set-container-property`](#type-c-set-container-property) |
| record | [`c-set-container-slot`](#type-c-set-container-slot) |
| record | [`c-set-cursor-item`](#type-c-set-cursor-item) |
| record | [`c-set-entity-link`](#type-c-set-entity-link) |
| record | [`c-set-entity-metadata`](#type-c-set-entity-metadata) |
| record | [`c-set-equipment`](#type-c-set-equipment) |
| record | [`c-set-experience`](#type-c-set-experience) |
| record | [`c-set-health`](#type-c-set-health) |
| record | [`c-set-passengers`](#type-c-set-passengers) |
| record | [`c-set-player-inventory`](#type-c-set-player-inventory) |
| record | [`c-set-player-team`](#type-c-set-player-team) |
| record | [`c-set-selected-slot`](#type-c-set-selected-slot) |
| record | [`c-set-simulation-distance`](#type-c-set-simulation-distance) |
| record | [`c-sound-effect`](#type-c-sound-effect) |
| record | [`c-spawn-entity`](#type-c-spawn-entity) |
| record | [`c-stop-sound`](#type-c-stop-sound) |
| record | [`c-store-cookie`](#type-c-store-cookie) |
| record | [`c-subtitle`](#type-c-subtitle) |
| record | [`c-swing-arm`](#type-c-swing-arm) |
| record | [`c-system-chat-message`](#type-c-system-chat-message) |
| record | [`c-tab-list`](#type-c-tab-list) |
| record | [`c-tag-query-response`](#type-c-tag-query-response) |
| record | [`c-take-item-entity`](#type-c-take-item-entity) |
| record | [`c-teleport-entity`](#type-c-teleport-entity) |
| record | [`c-test-instance-block-status`](#type-c-test-instance-block-status) |
| record | [`c-ticking-state`](#type-c-ticking-state) |
| record | [`c-ticking-step`](#type-c-ticking-step) |
| record | [`c-title-animation`](#type-c-title-animation) |
| record | [`c-title-text`](#type-c-title-text) |
| record | [`c-transfer`](#type-c-transfer) |
| record | [`c-unload-chunk`](#type-c-unload-chunk) |
| record | [`c-update-advancements`](#type-c-update-advancements) |
| record | [`c-update-attributes`](#type-c-update-attributes) |
| record | [`c-update-entity-pos`](#type-c-update-entity-pos) |
| record | [`c-update-entity-pos-rot`](#type-c-update-entity-pos-rot) |
| record | [`c-update-entity-rot`](#type-c-update-entity-rot) |
| record | [`c-update-mob-effect`](#type-c-update-mob-effect) |
| record | [`c-update-objectives`](#type-c-update-objectives) |
| record | [`c-update-recipes`](#type-c-update-recipes) |
| record | [`c-update-score`](#type-c-update-score) |
| record | [`c-update-tags-play`](#type-c-update-tags-play) |
| record | [`c-update-time`](#type-c-update-time) |
| record | [`c-waypoint`](#type-c-waypoint) |
| record | [`c-world-event`](#type-c-world-event) |
| record | [`chunk-biome-entry`](#type-chunk-biome-entry) |
| record | [`chunk-block-entity`](#type-chunk-block-entity) |
| record | [`chunk-heightmaps`](#type-chunk-heightmaps) |
| variant | [`clientbound-packet`](#type-clientbound-packet) |
| enum | [`command-block-mode`](#type-command-block-mode) |
| record | [`command-suggestion`](#type-command-suggestion) |
| record | [`config-c-code-of-conduct`](#type-config-c-code-of-conduct) |
| record | [`config-c-config-add-resource-pack`](#type-config-c-config-add-resource-pack) |
| record | [`config-c-config-custom-report-details`](#type-config-c-config-custom-report-details) |
| record | [`config-c-config-disconnect`](#type-config-c-config-disconnect) |
| record | [`config-c-config-ping`](#type-config-c-config-ping) |
| record | [`config-c-config-post-effects`](#type-config-c-config-post-effects) |
| record | [`config-c-config-remove-resource-pack`](#type-config-c-config-remove-resource-pack) |
| record | [`config-c-config-server-links`](#type-config-c-config-server-links) |
| record | [`config-c-config-show-dialog`](#type-config-c-config-show-dialog) |
| record | [`config-c-cookie-request`](#type-config-c-cookie-request) |
| record | [`config-c-feature-flags`](#type-config-c-feature-flags) |
| record | [`config-c-known-packs`](#type-config-c-known-packs) |
| record | [`config-c-plugin-message`](#type-config-c-plugin-message) |
| record | [`config-c-registry-data`](#type-config-c-registry-data) |
| record | [`config-c-store-cookie`](#type-config-c-store-cookie) |
| record | [`config-c-transfer`](#type-config-c-transfer) |
| record | [`config-c-update-tags`](#type-config-c-update-tags) |
| record | [`config-s-client-information-config`](#type-config-s-client-information-config) |
| record | [`config-s-config-cookie-response`](#type-config-s-config-cookie-response) |
| record | [`config-s-config-pong`](#type-config-s-config-pong) |
| record | [`config-s-config-resource-pack`](#type-config-s-config-resource-pack) |
| record | [`config-s-custom-click-action`](#type-config-s-custom-click-action) |
| record | [`config-s-keep-alive`](#type-config-s-keep-alive) |
| record | [`config-s-known-packs`](#type-config-s-known-packs) |
| record | [`config-s-plugin-message`](#type-config-s-plugin-message) |
| variant | [`filter-type`](#type-filter-type) |
| enum | [`game-event`](#type-game-event) |
| record | [`game-rule-entry`](#type-game-rule-entry) |
| record | [`init-chat`](#type-init-chat) |
| record | [`light-data`](#type-light-data) |
| record | [`login-c-login-cookie-request`](#type-login-c-login-cookie-request) |
| record | [`login-c-login-disconnect`](#type-login-c-login-disconnect) |
| record | [`login-c-login-plugin-request`](#type-login-c-login-plugin-request) |
| record | [`login-c-set-compression`](#type-login-c-set-compression) |
| record | [`login-s-login-cookie-response`](#type-login-s-login-cookie-response) |
| record | [`login-s-login-plugin-response`](#type-login-s-login-plugin-response) |
| record | [`login-s-login-start`](#type-login-s-login-start) |
| record | [`map-icon`](#type-map-icon) |
| record | [`map-patch`](#type-map-patch) |
| record | [`merchant-offer`](#type-merchant-offer) |
| record | [`minecart-step`](#type-minecart-step) |
| enum | [`mode`](#type-mode) |
| variant | [`play-resource-pack-result`](#type-play-resource-pack-result) |
| record | [`player`](#type-player) |
| variant | [`player-action`](#type-player-action) |
| record | [`player-action-add-player`](#type-player-action-add-player) |
| record | [`player-spawn-data`](#type-player-spawn-data) |
| record | [`previous-message`](#type-previous-message) |
| record | [`property`](#type-property) |
| record | [`proto-node`](#type-proto-node) |
| variant | [`proto-node-type`](#type-proto-node-type) |
| record | [`proto-node-type-argument`](#type-proto-node-type-argument) |
| record | [`proto-node-type-literal`](#type-proto-node-type-literal) |
| enum | [`render-type`](#type-render-type) |
| variant | [`resource-pack-response-result`](#type-resource-pack-response-result) |
| record | [`s-attack`](#type-s-attack) |
| record | [`s-block-entity-tag-query`](#type-s-block-entity-tag-query) |
| record | [`s-bundle-item-selected`](#type-s-bundle-item-selected) |
| record | [`s-change-difficulty`](#type-s-change-difficulty) |
| record | [`s-change-game-mode`](#type-s-change-game-mode) |
| record | [`s-chat-ack`](#type-s-chat-ack) |
| record | [`s-chat-command`](#type-s-chat-command) |
| record | [`s-chat-command-signed`](#type-s-chat-command-signed) |
| record | [`s-chat-message`](#type-s-chat-message) |
| record | [`s-chunk-batch`](#type-s-chunk-batch) |
| record | [`s-click-slot`](#type-s-click-slot) |
| record | [`s-client-command`](#type-s-client-command) |
| record | [`s-client-information-play`](#type-s-client-information-play) |
| record | [`s-close-container`](#type-s-close-container) |
| record | [`s-command-suggestion`](#type-s-command-suggestion) |
| record | [`s-confirm-teleport`](#type-s-confirm-teleport) |
| record | [`s-container-button-click`](#type-s-container-button-click) |
| record | [`s-container-slot-state-changed`](#type-s-container-slot-state-changed) |
| record | [`s-cookie-response`](#type-s-cookie-response) |
| record | [`s-custom-click-action`](#type-s-custom-click-action) |
| record | [`s-custom-payload`](#type-s-custom-payload) |
| record | [`s-debug-sample-subscription`](#type-s-debug-sample-subscription) |
| record | [`s-debug-subscription-request`](#type-s-debug-subscription-request) |
| record | [`s-edit-book`](#type-s-edit-book) |
| record | [`s-encryption-response`](#type-s-encryption-response) |
| record | [`s-entity-tag-query`](#type-s-entity-tag-query) |
| record | [`s-interact`](#type-s-interact) |
| record | [`s-jigsaw-generate`](#type-s-jigsaw-generate) |
| record | [`s-keep-alive`](#type-s-keep-alive) |
| record | [`s-lock-difficulty`](#type-s-lock-difficulty) |
| record | [`s-move-vehicle`](#type-s-move-vehicle) |
| record | [`s-paddle-boat`](#type-s-paddle-boat) |
| record | [`s-pick-item-from-block`](#type-s-pick-item-from-block) |
| record | [`s-pick-item-from-entity`](#type-s-pick-item-from-entity) |
| record | [`s-place-recipe`](#type-s-place-recipe) |
| record | [`s-play-ping-request`](#type-s-play-ping-request) |
| record | [`s-play-pong`](#type-s-play-pong) |
| record | [`s-play-resource-pack`](#type-s-play-resource-pack) |
| record | [`s-player-abilities`](#type-s-player-abilities) |
| record | [`s-player-action`](#type-s-player-action) |
| record | [`s-player-command`](#type-s-player-command) |
| record | [`s-player-input`](#type-s-player-input) |
| record | [`s-player-position`](#type-s-player-position) |
| record | [`s-player-position-rotation`](#type-s-player-position-rotation) |
| record | [`s-player-rotation`](#type-s-player-rotation) |
| record | [`s-player-session`](#type-s-player-session) |
| record | [`s-recipe-book-change-settings`](#type-s-recipe-book-change-settings) |
| record | [`s-recipe-book-seen-recipe`](#type-s-recipe-book-seen-recipe) |
| record | [`s-rename-item`](#type-s-rename-item) |
| variant | [`s-seen-advancement`](#type-s-seen-advancement) |
| record | [`s-select-trade`](#type-s-select-trade) |
| record | [`s-set-beacon`](#type-s-set-beacon) |
| record | [`s-set-command-block`](#type-s-set-command-block) |
| record | [`s-set-command-minecart`](#type-s-set-command-minecart) |
| record | [`s-set-creative-slot`](#type-s-set-creative-slot) |
| record | [`s-set-game-rule`](#type-s-set-game-rule) |
| record | [`s-set-held-item`](#type-s-set-held-item) |
| record | [`s-set-jigsaw-block`](#type-s-set-jigsaw-block) |
| record | [`s-set-player-ground`](#type-s-set-player-ground) |
| record | [`s-set-structure-block`](#type-s-set-structure-block) |
| record | [`s-set-test-block`](#type-s-set-test-block) |
| record | [`s-spectate-entity`](#type-s-spectate-entity) |
| record | [`s-swing-arm`](#type-s-swing-arm) |
| record | [`s-teleport-to-entity`](#type-s-teleport-to-entity) |
| record | [`s-test-instance-block-action`](#type-s-test-instance-block-action) |
| record | [`s-update-sign`](#type-s-update-sign) |
| record | [`s-use-item`](#type-s-use-item) |
| record | [`s-use-item-on`](#type-s-use-item-on) |
| variant | [`serverbound-packet`](#type-serverbound-packet) |
| enum | [`slot-action-type`](#type-slot-action-type) |
| record | [`statistic`](#type-statistic) |
| enum | [`status`](#type-status) |
| record | [`status-c-ping-response`](#type-status-c-ping-response) |
| record | [`status-c-status-response`](#type-status-c-status-response) |
| record | [`status-s-status-ping-request`](#type-status-s-status-ping-request) |
| enum | [`string-proto-arg-behavior`](#type-string-proto-arg-behavior) |
| enum | [`suggestion-providers`](#type-suggestion-providers) |
| enum | [`team-method`](#type-team-method) |
| record | [`team-parameters`](#type-team-parameters) |
| enum | [`test-block-mode`](#type-test-block-mode) |
| enum | [`test-instance-block-action`](#type-test-instance-block-action) |
| record | [`test-instance-block-data`](#type-test-instance-block-data) |
| enum | [`test-instance-block-status`](#type-test-instance-block-status) |
| record | [`tracked-waypoint`](#type-tracked-waypoint) |
| record | [`var-int-vector3`](#type-var-int-vector3) |
| record | [`waypoint-icon`](#type-waypoint-icon) |
| enum | [`waypoint-operation`](#type-waypoint-operation) |
| variant | [`waypoint-target`](#type-waypoint-target) |
| record | [`waypoint-target-chunk`](#type-waypoint-target-chunk) |

## Type Details

### `config-s-client-information-config` {#type-config-s-client-information-config}

**Record fields**

| Name | WIT type |
| --- | --- |
| `locale` | `string` |
| `view-distance` | `u8` |
| `chat-mode` | `s32` |
| `chat-colors` | `bool` |
| `skin-parts` | `u8` |
| `main-hand` | `s32` |
| `text-filtering` | `bool` |
| `server-listing` | `bool` |

### `config-s-config-cookie-response` {#type-config-s-config-cookie-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |
| `has-payload` | `bool` |
| `payload` | `option<list<u8>>` |

### `config-s-custom-click-action` {#type-config-s-custom-click-action}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action-id` | `string` |
| `payload` | `option<list<u8>>` |

### `config-s-keep-alive` {#type-config-s-keep-alive}

**Record fields**

| Name | WIT type |
| --- | --- |
| `keep-alive-id` | `s64` |

### `config-s-known-packs` {#type-config-s-known-packs}

**Record fields**

| Name | WIT type |
| --- | --- |
| `known-packs` | `list<string>` |

### `config-s-plugin-message` {#type-config-s-plugin-message}

**Record fields**

| Name | WIT type |
| --- | --- |
| `channel` | `string` |
| `data` | `list<u8>` |

### `config-s-config-pong` {#type-config-s-config-pong}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |

### `resource-pack-response-result` {#type-resource-pack-response-result}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `download-success` |  |
| `download-fail` |  |
| `downloaded` |  |
| `accepted` |  |
| `declined` |  |
| `invalid-url` |  |
| `reload-failed` |  |
| `discarded` |  |
| `unknown` | `s32` |

### `config-s-config-resource-pack` {#type-config-s-config-resource-pack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `%result` | `s32` |

### `login-s-login-cookie-response` {#type-login-s-login-cookie-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |
| `payload` | `option<list<u8>>` |

### `s-encryption-response` {#type-s-encryption-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `shared-secret` | `list<u8>` |
| `verify-token` | `list<u8>` |

### `login-s-login-start` {#type-login-s-login-start}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `uuid` | `uuid` |

### `login-s-login-plugin-response` {#type-login-s-login-plugin-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `message-id` | `s32` |
| `data` | `option<list<u8>>` |

### `s-attack` {#type-s-attack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |

### `s-block-entity-tag-query` {#type-s-block-entity-tag-query}

**Record fields**

| Name | WIT type |
| --- | --- |
| `transaction-id` | `s32` |
| `location` | `tuple<s32, s32, s32>` |

### `s-bundle-item-selected` {#type-s-bundle-item-selected}

**Record fields**

| Name | WIT type |
| --- | --- |
| `slot-id` | `s32` |
| `selected-item-index` | `s32` |

### `s-change-difficulty` {#type-s-change-difficulty}

**Record fields**

| Name | WIT type |
| --- | --- |
| `difficulty` | `string` |

### `s-change-game-mode` {#type-s-change-game-mode}

**Record fields**

| Name | WIT type |
| --- | --- |
| `game-mode` | `string` |

### `s-chat-ack` {#type-s-chat-ack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `offset` | `s32` |

### `s-chat-command` {#type-s-chat-command}

**Record fields**

| Name | WIT type |
| --- | --- |
| `command` | `string` |

### `argument-signature` {#type-argument-signature}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `signature` | `list<u8>` |

### `s-chat-command-signed` {#type-s-chat-command-signed}

**Record fields**

| Name | WIT type |
| --- | --- |
| `command` | `string` |
| `timestamp` | `s64` |
| `salt` | `s64` |
| `argument-signatures` | `list<argument-signature>` |
| `message-count` | `s32` |
| `acknowledged` | `list<u8>` |
| `checksum` | `u8` |

### `s-chat-message` {#type-s-chat-message}

**Record fields**

| Name | WIT type |
| --- | --- |
| `message` | `string` |
| `timestamp` | `s64` |
| `salt` | `s64` |
| `signature` | `option<list<u8>>` |
| `message-count` | `s32` |
| `acknowledged` | `list<u8>` |
| `checksum` | `u8` |

### `s-chunk-batch` {#type-s-chunk-batch}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunks-per-tick` | `f32` |

### `s-click-slot` {#type-s-click-slot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sync-id` | `s32` |
| `revision` | `s32` |
| `slot` | `s32` |
| `button` | `u8` |
| `mode` | `slot-action-type` |
| `length-of-array` | `s32` |
| `array-of-changed-slots` | `list<tuple<s32, string>>` |
| `carried-item` | `string` |

### `slot-action-type` {#type-slot-action-type}

**Enum cases**

| Name |
| --- |
| `pickup` |
| `quick-move` |
| `swap` |
| `clone` |
| `throw` |
| `quick-craft` |
| `pickup-all` |

### `s-client-command` {#type-s-client-command}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action-id` | `s32` |

### `s-client-information-play` {#type-s-client-information-play}

**Record fields**

| Name | WIT type |
| --- | --- |
| `locale` | `string` |
| `view-distance` | `u8` |
| `chat-mode` | `s32` |
| `chat-colors` | `bool` |
| `skin-parts` | `u8` |
| `main-hand` | `s32` |
| `text-filtering` | `bool` |
| `server-listing` | `bool` |

### `s-close-container` {#type-s-close-container}

**Record fields**

| Name | WIT type |
| --- | --- |
| `window-id` | `s32` |

### `s-command-suggestion` {#type-s-command-suggestion}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `command` | `string` |

### `s-confirm-teleport` {#type-s-confirm-teleport}

**Record fields**

| Name | WIT type |
| --- | --- |
| `teleport-id` | `s32` |
| `position` | `tuple<f64, f64, f64>` |
| `yaw` | `f32` |
| `pitch` | `f32` |

### `s-container-button-click` {#type-s-container-button-click}

**Record fields**

| Name | WIT type |
| --- | --- |
| `window-id` | `s32` |
| `button-id` | `s32` |

### `s-container-slot-state-changed` {#type-s-container-slot-state-changed}

**Record fields**

| Name | WIT type |
| --- | --- |
| `slot-id` | `s32` |
| `container-id` | `s32` |
| `new-state` | `bool` |

### `s-cookie-response` {#type-s-cookie-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |
| `payload` | `option<list<u8>>` |

### `s-custom-click-action` {#type-s-custom-click-action}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action-id` | `string` |
| `payload` | `option<list<u8>>` |

### `s-custom-payload` {#type-s-custom-payload}

**Record fields**

| Name | WIT type |
| --- | --- |
| `channel` | `string` |
| `data` | `list<u8>` |

### `s-debug-sample-subscription` {#type-s-debug-sample-subscription}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sample-type` | `s32` |

### `s-debug-subscription-request` {#type-s-debug-subscription-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sample-type` | `s32` |

### `s-edit-book` {#type-s-edit-book}

**Record fields**

| Name | WIT type |
| --- | --- |
| `slot` | `s32` |
| `pages` | `list<string>` |
| `title` | `option<string>` |

### `s-entity-tag-query` {#type-s-entity-tag-query}

**Record fields**

| Name | WIT type |
| --- | --- |
| `transaction-id` | `s32` |
| `entity-id` | `s32` |

### `s-interact` {#type-s-interact}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `r-type` | `s32` |
| `target-position` | `option<tuple<f64, f64, f64>>` |
| `hand` | `option<s32>` |
| `sneaking` | `bool` |

### `action-type` {#type-action-type}

**Enum cases**

| Name |
| --- |
| `interact` |
| `attack` |
| `interact-at` |

### `s-jigsaw-generate` {#type-s-jigsaw-generate}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `tuple<s32, s32, s32>` |
| `levels` | `s32` |
| `keep-jigsaws` | `bool` |

### `s-keep-alive` {#type-s-keep-alive}

**Record fields**

| Name | WIT type |
| --- | --- |
| `keep-alive-id` | `s64` |

### `s-lock-difficulty` {#type-s-lock-difficulty}

**Record fields**

| Name | WIT type |
| --- | --- |
| `locked` | `bool` |

### `s-move-vehicle` {#type-s-move-vehicle}

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `f64` |
| `y` | `f64` |
| `z` | `f64` |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `on-ground` | `bool` |

### `s-paddle-boat` {#type-s-paddle-boat}

**Record fields**

| Name | WIT type |
| --- | --- |
| `left-paddle` | `bool` |
| `right-paddle` | `bool` |

### `s-pick-item-from-block` {#type-s-pick-item-from-block}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `tuple<s32, s32, s32>` |
| `include-data` | `bool` |

### `s-pick-item-from-entity` {#type-s-pick-item-from-entity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `include-data` | `bool` |

### `s-play-ping-request` {#type-s-play-ping-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `payload` | `s64` |

### `s-place-recipe` {#type-s-place-recipe}

**Record fields**

| Name | WIT type |
| --- | --- |
| `container-id` | `u8` |
| `recipe-display-id` | `s32` |
| `use-max-items` | `bool` |

### `s-player-abilities` {#type-s-player-abilities}

**Record fields**

| Name | WIT type |
| --- | --- |
| `%flags` | `u8` |
| `fly-speed` | `option<f32>` |
| `walk-speed` | `option<f32>` |

### `s-player-action` {#type-s-player-action}

**Record fields**

| Name | WIT type |
| --- | --- |
| `status` | `s32` |
| `position` | `tuple<s32, s32, s32>` |
| `face` | `u8` |
| `sequence` | `s32` |

### `status` {#type-status}

**Enum cases**

| Name |
| --- |
| `started-digging` |
| `cancelled-digging` |
| `finished-digging` |
| `drop-item-stack` |
| `drop-item` |
| `release-item-in-use` |
| `swap-item` |
| `spear-jab` |
| `change-destroy-direction` |

### `s-player-command` {#type-s-player-command}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `action` | `action` |
| `jump-boost` | `s32` |

### `action` {#type-action}

**Enum cases**

| Name |
| --- |
| `start-sneaking` |
| `stop-sneaking` |
| `leave-bed` |
| `start-sprinting` |
| `stop-sprinting` |
| `start-horse-jump` |
| `stop-horse-jump` |
| `open-vehicle-inventory` |
| `start-flying-elytra` |

### `s-set-player-ground` {#type-s-set-player-ground}

**Record fields**

| Name | WIT type |
| --- | --- |
| `on-ground` | `bool` |

### `s-player-input` {#type-s-player-input}

**Record fields**

| Name | WIT type |
| --- | --- |
| `input` | `u8` |

### `s-player-position` {#type-s-player-position}

**Record fields**

| Name | WIT type |
| --- | --- |
| `position` | `tuple<f64, f64, f64>` |
| `collision` | `u8` |

### `s-player-position-rotation` {#type-s-player-position-rotation}

**Record fields**

| Name | WIT type |
| --- | --- |
| `position` | `tuple<f64, f64, f64>` |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `collision` | `u8` |

### `s-player-rotation` {#type-s-player-rotation}

**Record fields**

| Name | WIT type |
| --- | --- |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `ground` | `bool` |

### `s-player-session` {#type-s-player-session}

**Record fields**

| Name | WIT type |
| --- | --- |
| `session-id` | `uuid` |
| `expires-at` | `s64` |
| `public-key` | `list<u8>` |
| `key-signature` | `list<u8>` |

### `s-play-pong` {#type-s-play-pong}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |

### `s-recipe-book-change-settings` {#type-s-recipe-book-change-settings}

**Record fields**

| Name | WIT type |
| --- | --- |
| `book-type` | `s32` |
| `is-open` | `bool` |
| `is-filtering` | `bool` |

### `s-recipe-book-seen-recipe` {#type-s-recipe-book-seen-recipe}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipe-display-id` | `s32` |

### `s-rename-item` {#type-s-rename-item}

**Record fields**

| Name | WIT type |
| --- | --- |
| `item-name` | `string` |

### `play-resource-pack-result` {#type-play-resource-pack-result}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `download-success` |  |
| `declined` |  |
| `download-fail` |  |
| `accepted` |  |
| `downloaded` |  |
| `invalid-url` |  |
| `reload-failed` |  |
| `discarded` |  |
| `unknown` | `s32` |

### `s-play-resource-pack` {#type-s-play-resource-pack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `%result` | `s32` |

### `s-seen-advancement` {#type-s-seen-advancement}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `open-tab` | `string` |
| `close-tab` |  |

### `s-select-trade` {#type-s-select-trade}

**Record fields**

| Name | WIT type |
| --- | --- |
| `selected-slot` | `s32` |

### `s-set-beacon` {#type-s-set-beacon}

**Record fields**

| Name | WIT type |
| --- | --- |
| `primary-effect` | `option<s32>` |
| `secondary-effect` | `option<s32>` |

### `s-set-command-block` {#type-s-set-command-block}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `tuple<s32, s32, s32>` |
| `command` | `string` |
| `mode` | `s32` |
| `%flags` | `u8` |

### `command-block-mode` {#type-command-block-mode}

**Enum cases**

| Name |
| --- |
| `chain` |
| `repeating` |
| `impulse` |

### `s-set-command-minecart` {#type-s-set-command-minecart}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `command` | `string` |
| `track-output` | `bool` |

### `s-set-creative-slot` {#type-s-set-creative-slot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `slot` | `s32` |
| `clicked-item` | `string` |

### `game-rule-entry` {#type-game-rule-entry}

**Record fields**

| Name | WIT type |
| --- | --- |
| `game-rule-key` | `string` |
| `value` | `string` |

### `s-set-game-rule` {#type-s-set-game-rule}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entries` | `list<game-rule-entry>` |

### `s-set-held-item` {#type-s-set-held-item}

**Record fields**

| Name | WIT type |
| --- | --- |
| `slot` | `s32` |

### `s-set-jigsaw-block` {#type-s-set-jigsaw-block}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `tuple<s32, s32, s32>` |
| `name` | `string` |
| `target` | `string` |
| `pool` | `string` |
| `final-state` | `string` |
| `joint` | `string` |
| `selection-priority` | `s32` |
| `placement-priority` | `s32` |

### `s-set-structure-block` {#type-s-set-structure-block}

**Record fields**

| Name | WIT type |
| --- | --- |
| `location` | `tuple<s32, s32, s32>` |
| `action` | `s32` |
| `mode` | `s32` |
| `name` | `string` |
| `offset-x` | `u8` |
| `offset-y` | `u8` |
| `offset-z` | `u8` |
| `size-x` | `u8` |
| `size-y` | `u8` |
| `size-z` | `u8` |
| `mirror` | `s32` |
| `rotation` | `s32` |
| `metadata` | `string` |
| `integrity` | `f32` |
| `seed` | `s64` |
| `%flags` | `u8` |

### `s-set-test-block` {#type-s-set-test-block}

**Record fields**

| Name | WIT type |
| --- | --- |
| `position` | `tuple<s32, s32, s32>` |
| `mode` | `test-block-mode` |
| `message` | `string` |

### `test-block-mode` {#type-test-block-mode}

**Enum cases**

| Name |
| --- |
| `start` |
| `log` |
| `fail` |
| `accept` |

### `s-spectate-entity` {#type-s-spectate-entity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target` | `uuid` |

### `s-swing-arm` {#type-s-swing-arm}

**Record fields**

| Name | WIT type |
| --- | --- |
| `hand` | `s32` |

### `s-teleport-to-entity` {#type-s-teleport-to-entity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target` | `uuid` |

### `s-test-instance-block-action` {#type-s-test-instance-block-action}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `tuple<s32, s32, s32>` |
| `action` | `test-instance-block-action` |
| `data` | `test-instance-block-data` |

### `test-instance-block-action` {#type-test-instance-block-action}

**Enum cases**

| Name |
| --- |
| `init` |
| `query` |
| `set` |
| `reset` |
| `save` |
| `%export` |
| `run` |

### `var-int-vector3` {#type-var-int-vector3}

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `s32` |
| `y` | `s32` |
| `z` | `s32` |

### `test-instance-block-data` {#type-test-instance-block-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `test` | `option<string>` |
| `size` | `var-int-vector3` |
| `rotation` | `string` |
| `ignore-entities` | `bool` |
| `status` | `test-instance-block-status` |
| `error-message` | `option<string>` |

### `test-instance-block-status` {#type-test-instance-block-status}

**Enum cases**

| Name |
| --- |
| `cleared` |
| `running` |
| `success` |
| `failed` |

### `s-update-sign` {#type-s-update-sign}

**Record fields**

| Name | WIT type |
| --- | --- |
| `location` | `tuple<s32, s32, s32>` |
| `is-front-text` | `bool` |
| `line-1` | `string` |
| `line-2` | `string` |
| `line-3` | `string` |
| `line-4` | `string` |

### `s-use-item` {#type-s-use-item}

**Record fields**

| Name | WIT type |
| --- | --- |
| `hand` | `s32` |
| `sequence` | `s32` |
| `yaw` | `f32` |
| `pitch` | `f32` |

### `s-use-item-on` {#type-s-use-item-on}

**Record fields**

| Name | WIT type |
| --- | --- |
| `hand` | `s32` |
| `position` | `tuple<s32, s32, s32>` |
| `face` | `s32` |
| `cursor-pos` | `tuple<f64, f64, f64>` |
| `inside-block` | `bool` |
| `is-against-world-border` | `bool` |
| `sequence` | `s32` |

### `status-s-status-ping-request` {#type-status-s-status-ping-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `payload` | `s64` |

### `config-c-config-add-resource-pack` {#type-config-c-config-add-resource-pack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `url` | `string` |
| `hash` | `string` |
| `forced` | `bool` |
| `prompt-message` | `option<string>` |

### `config-c-code-of-conduct` {#type-config-c-code-of-conduct}

**Record fields**

| Name | WIT type |
| --- | --- |
| `code-of-conduct` | `string` |

### `config-c-config-disconnect` {#type-config-c-config-disconnect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `reason` | `string` |

### `config-c-cookie-request` {#type-config-c-cookie-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |

### `config-c-config-custom-report-details` {#type-config-c-config-custom-report-details}

**Record fields**

| Name | WIT type |
| --- | --- |
| `details` | `list<tuple<string, string>>` |

### `config-c-feature-flags` {#type-config-c-feature-flags}

**Record fields**

| Name | WIT type |
| --- | --- |
| `features` | `list<string>` |

### `config-c-known-packs` {#type-config-c-known-packs}

**Record fields**

| Name | WIT type |
| --- | --- |
| `known-packs` | `list<string>` |

### `config-c-config-ping` {#type-config-c-config-ping}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |

### `config-c-plugin-message` {#type-config-c-plugin-message}

**Record fields**

| Name | WIT type |
| --- | --- |
| `channel` | `string` |
| `data` | `list<u8>` |

### `config-c-config-post-effects` {#type-config-c-config-post-effects}

**Record fields**

| Name | WIT type |
| --- | --- |
| `effects` | `list<string>` |

### `config-c-registry-data` {#type-config-c-registry-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `registry-id` | `string` |
| `entries` | `list<string>` |

### `config-c-config-remove-resource-pack` {#type-config-c-config-remove-resource-pack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `option<uuid>` |

### `config-c-config-server-links` {#type-config-c-config-server-links}

**Record fields**

| Name | WIT type |
| --- | --- |
| `links` | `list<string>` |

### `config-c-config-show-dialog` {#type-config-c-config-show-dialog}

**Record fields**

| Name | WIT type |
| --- | --- |
| `dialog` | `string` |

### `config-c-store-cookie` {#type-config-c-store-cookie}

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |
| `payload` | `list<u8>` |

### `config-c-transfer` {#type-config-c-transfer}

**Record fields**

| Name | WIT type |
| --- | --- |
| `host` | `string` |
| `port` | `s32` |

### `config-c-update-tags` {#type-config-c-update-tags}

**Record fields**

| Name | WIT type |
| --- | --- |
| `tags` | `list<string>` |

### `login-c-login-cookie-request` {#type-login-c-login-cookie-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |

### `c-encryption-request` {#type-c-encryption-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `server-id` | `string` |
| `public-key` | `list<u8>` |
| `verify-token` | `list<u8>` |
| `should-authenticate` | `bool` |

### `login-c-login-disconnect` {#type-login-c-login-disconnect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `json-reason` | `string` |

### `c-login-success` {#type-c-login-success}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `username` | `string` |
| `properties` | `list<property>` |
| `strict-error-handling` | `bool` |
| `session-id` | `uuid` |

### `login-c-login-plugin-request` {#type-login-c-login-plugin-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `message-id` | `s32` |
| `channel` | `string` |
| `data` | `list<u8>` |

### `login-c-set-compression` {#type-login-c-set-compression}

**Record fields**

| Name | WIT type |
| --- | --- |
| `threshold` | `s32` |

### `c-acknowledge-block-change` {#type-c-acknowledge-block-change}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sequence-id` | `s32` |

### `c-action-bar` {#type-c-action-bar}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action-bar` | `string` |

### `c-add-resource-pack` {#type-c-add-resource-pack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `url` | `string` |
| `hash` | `string` |
| `forced` | `bool` |
| `prompt-message` | `option<string>` |

### `c-award-stats` {#type-c-award-stats}

**Record fields**

| Name | WIT type |
| --- | --- |
| `stats` | `list<statistic>` |

### `statistic` {#type-statistic}

**Record fields**

| Name | WIT type |
| --- | --- |
| `category-id` | `s32` |
| `statistic-id` | `s32` |
| `value` | `s32` |

### `c-set-block-destroy-stage` {#type-c-set-block-destroy-stage}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `location` | `tuple<s32, s32, s32>` |
| `destroy-stage` | `u8` |

### `c-block-entity-data` {#type-c-block-entity-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `location` | `tuple<s32, s32, s32>` |
| `r-type` | `s32` |
| `nbt-data` | `list<u8>` |

### `c-block-event` {#type-c-block-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `location` | `tuple<s32, s32, s32>` |
| `action-id` | `u8` |
| `action-parameter` | `u8` |
| `block-type` | `s32` |

### `c-block-update` {#type-c-block-update}

**Record fields**

| Name | WIT type |
| --- | --- |
| `location` | `tuple<s32, s32, s32>` |
| `state-id` | `s32` |

### `c-boss-event` {#type-c-boss-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `action` | `bossevent-action` |

### `bossevent-action-add` {#type-bossevent-action-add}

**Record fields**

| Name | WIT type |
| --- | --- |
| `title` | `string` |
| `health` | `f32` |
| `color` | `s32` |
| `division` | `s32` |
| `%flags` | `u8` |

### `bossevent-action-update-style` {#type-bossevent-action-update-style}

**Record fields**

| Name | WIT type |
| --- | --- |
| `color` | `s32` |
| `dividers` | `s32` |

### `bossevent-action` {#type-bossevent-action}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `add` | `bossevent-action-add` |
| `remove` |  |
| `update-health` | `f32` |
| `update-tile` | `string` |
| `update-style` | `bossevent-action-update-style` |
| `update-flags` | `u8` |

### `c-center-chunk` {#type-c-center-chunk}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |

### `c-change-difficulty` {#type-c-change-difficulty}

**Record fields**

| Name | WIT type |
| --- | --- |
| `difficulty` | `u8` |
| `locked` | `bool` |

### `c-chunk-batch-end` {#type-c-chunk-batch-end}

**Record fields**

| Name | WIT type |
| --- | --- |
| `batch-size` | `s32` |

### `chunk-heightmaps` {#type-chunk-heightmaps}

**Record fields**

| Name | WIT type |
| --- | --- |
| `world-surface` | `option<list<s64>>` |
| `motion-blocking` | `option<list<s64>>` |
| `motion-blocking-no-leaves` | `option<list<s64>>` |

### `chunk-block-entity` {#type-chunk-block-entity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `packed-xz` | `u8` |
| `y` | `s32` |
| `type-id` | `s32` |
| `data` | `string` |

### `c-chunk-data` {#type-c-chunk-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `heightmaps` | `chunk-heightmaps` |
| `data` | `list<u8>` |
| `block-entities` | `list<chunk-block-entity>` |
| `light-data` | `light-data` |

### `chunk-biome-entry` {#type-chunk-biome-entry}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `data` | `list<u8>` |

### `c-chunks-biomes` {#type-c-chunks-biomes}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunks` | `list<chunk-biome-entry>` |

### `c-clear-title` {#type-c-clear-title}

**Record fields**

| Name | WIT type |
| --- | --- |
| `reset` | `bool` |

### `c-close-container` {#type-c-close-container}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sync-id` | `s32` |

### `c-combat-death` {#type-c-combat-death}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-id` | `s32` |
| `message` | `string` |

### `c-combat-end` {#type-c-combat-end}

**Record fields**

| Name | WIT type |
| --- | --- |
| `duration-ticks` | `s32` |

### `c-command-suggestions` {#type-c-command-suggestions}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `start` | `s32` |
| `length` | `s32` |
| `matches` | `list<command-suggestion>` |

### `command-suggestion` {#type-command-suggestion}

**Record fields**

| Name | WIT type |
| --- | --- |
| `suggestion` | `string` |
| `tooltip` | `option<string>` |

### `c-commands` {#type-c-commands}

**Record fields**

| Name | WIT type |
| --- | --- |
| `nodes` | `list<proto-node>` |
| `root-node-index` | `s32` |

### `proto-node` {#type-proto-node}

**Record fields**

| Name | WIT type |
| --- | --- |
| `children` | `list<s32>` |
| `node-type` | `proto-node-type` |

### `proto-node-type-literal` {#type-proto-node-type-literal}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `is-executable` | `bool` |
| `redirect-target` | `option<s32>` |
| `restricted` | `bool` |

### `proto-node-type-argument` {#type-proto-node-type-argument}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `is-executable` | `bool` |
| `redirect-target` | `option<s32>` |
| `parser` | `argument-type` |
| `override-suggestion-type` | `option<suggestion-providers>` |
| `restricted` | `bool` |

### `proto-node-type` {#type-proto-node-type}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `root` |  |
| `literal` | `proto-node-type-literal` |
| `argument` | `proto-node-type-argument` |

### `argument-type-float` {#type-argument-type-float}

**Record fields**

| Name | WIT type |
| --- | --- |
| `min` | `option<f32>` |
| `max` | `option<f32>` |

### `argument-type-double` {#type-argument-type-double}

**Record fields**

| Name | WIT type |
| --- | --- |
| `min` | `option<f64>` |
| `max` | `option<f64>` |

### `argument-type-integer` {#type-argument-type-integer}

**Record fields**

| Name | WIT type |
| --- | --- |
| `min` | `option<s32>` |
| `max` | `option<s32>` |

### `argument-type-long` {#type-argument-type-long}

**Record fields**

| Name | WIT type |
| --- | --- |
| `min` | `option<s64>` |
| `max` | `option<s64>` |

### `argument-type-entity` {#type-argument-type-entity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `%flags` | `u8` |

### `argument-type-score-holder` {#type-argument-type-score-holder}

**Record fields**

| Name | WIT type |
| --- | --- |
| `%flags` | `u8` |

### `argument-type-time` {#type-argument-type-time}

**Record fields**

| Name | WIT type |
| --- | --- |
| `min` | `s32` |

### `argument-type-resource-or-tag` {#type-argument-type-resource-or-tag}

**Record fields**

| Name | WIT type |
| --- | --- |
| `identifier` | `string` |

### `argument-type-resource-or-tag-key` {#type-argument-type-resource-or-tag-key}

**Record fields**

| Name | WIT type |
| --- | --- |
| `identifier` | `string` |

### `argument-type-resource` {#type-argument-type-resource}

**Record fields**

| Name | WIT type |
| --- | --- |
| `identifier` | `string` |

### `argument-type-resource-key` {#type-argument-type-resource-key}

**Record fields**

| Name | WIT type |
| --- | --- |
| `identifier` | `string` |

### `argument-type` {#type-argument-type}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `%bool` |  |
| `float` | `argument-type-float` |
| `double` | `argument-type-double` |
| `integer` | `argument-type-integer` |
| `long` | `argument-type-long` |
| `%string` | `string-proto-arg-behavior` |
| `entity` | `argument-type-entity` |
| `game-profile` |  |
| `block-pos` |  |
| `column-pos` |  |
| `vec3` |  |
| `vec2` |  |
| `block-state` |  |
| `block-predicate` |  |
| `item-stack` |  |
| `item-predicate` |  |
| `color` |  |
| `hex-color` |  |
| `component` |  |
| `style` |  |
| `message` |  |
| `nbt-compound` |  |
| `nbt-tag` |  |
| `nbt-path` |  |
| `objective` |  |
| `objective-criteria` |  |
| `operation` |  |
| `particle` |  |
| `angle` |  |
| `rotation` |  |
| `scoreboard-slot` |  |
| `score-holder` | `argument-type-score-holder` |
| `swizzle` |  |
| `team` |  |
| `item-slot` |  |
| `item-slots` |  |
| `resource-location` |  |
| `function` |  |
| `entity-anchor` |  |
| `int-range` |  |
| `float-range` |  |
| `dimension` |  |
| `gamemode` |  |
| `time` | `argument-type-time` |
| `resource-or-tag` | `argument-type-resource-or-tag` |
| `resource-or-tag-key` | `argument-type-resource-or-tag-key` |
| `%resource` | `argument-type-resource` |
| `resource-key` | `argument-type-resource-key` |
| `resource-selector` |  |
| `template-mirror` |  |
| `template-rotation` |  |
| `heightmap` |  |
| `loot-table` |  |
| `loot-predicate` |  |
| `loot-modifier` |  |
| `dialog` |  |
| `uuid` |  |

### `string-proto-arg-behavior` {#type-string-proto-arg-behavior}

**Enum cases**

| Name |
| --- |
| `single-word` |
| `quotable-phrase` |
| `greedy-phrase` |

### `suggestion-providers` {#type-suggestion-providers}

**Enum cases**

| Name |
| --- |
| `ask-server` |
| `all-recipes` |
| `available-sounds` |
| `summonable-entities` |

### `c-play-cookie-request` {#type-c-play-cookie-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |

### `c-custom-chat-completions` {#type-c-custom-chat-completions}

**Record fields**

| Name | WIT type |
| --- | --- |
| `action` | `s32` |
| `entries` | `list<string>` |

### `c-custom-payload` {#type-c-custom-payload}

**Record fields**

| Name | WIT type |
| --- | --- |
| `channel` | `string` |
| `data` | `list<u8>` |

### `c-play-custom-report-details` {#type-c-play-custom-report-details}

**Record fields**

| Name | WIT type |
| --- | --- |
| `details` | `list<tuple<string, string>>` |

### `c-damage-event` {#type-c-damage-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `source-type-id` | `s32` |
| `source-cause-id` | `s32` |
| `source-direct-id` | `s32` |
| `source-position` | `option<tuple<f64, f64, f64>>` |

### `c-debug-block-value` {#type-c-debug-block-value}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `tuple<s32, s32, s32>` |
| `name` | `string` |
| `value` | `string` |

### `c-debug-chunk-value` {#type-c-debug-chunk-value}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-pos` | `tuple<f64, f64>` |
| `name` | `string` |
| `value` | `string` |

### `c-debug-entity-value` {#type-c-debug-entity-value}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `name` | `string` |
| `value` | `string` |

### `c-debug-event` {#type-c-debug-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `data` | `list<u8>` |

### `c-debug-sample` {#type-c-debug-sample}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sample` | `list<s64>` |
| `sample-type` | `s32` |

### `c-delete-chat` {#type-c-delete-chat}

**Record fields**

| Name | WIT type |
| --- | --- |
| `signature-id` | `s32` |
| `signature` | `option<list<u8>>` |

### `c-play-disconnect` {#type-c-play-disconnect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `reason` | `string` |

### `c-disguised-chat-message` {#type-c-disguised-chat-message}

**Record fields**

| Name | WIT type |
| --- | --- |
| `message` | `string` |
| `chat-type` | `s32` |
| `sender-name` | `string` |
| `target-name` | `option<string>` |

### `c-display-objective` {#type-c-display-objective}

**Record fields**

| Name | WIT type |
| --- | --- |
| `position` | `s32` |
| `score-name` | `string` |

### `c-entity-animation` {#type-c-entity-animation}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `animation` | `u8` |

### `c-swing-arm` {#type-c-swing-arm}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `off-hand` | `bool` |

### `animation` {#type-animation}

**Enum cases**

| Name |
| --- |
| `swing-main-arm` |
| `leave-bed` |
| `swing-offhand` |
| `critical-effect` |
| `magic-criticaleffect` |

### `c-set-entity-metadata` {#type-c-set-entity-metadata}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `metadata` | `list<u8>` |

### `c-entity-position-sync` {#type-c-entity-position-sync}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `position` | `tuple<f64, f64, f64>` |
| `delta` | `tuple<f64, f64, f64>` |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `on-ground` | `bool` |

### `c-entity-sound-effect` {#type-c-entity-sound-effect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sound-event` | `string` |
| `sound-category` | `s32` |
| `entity-id` | `s32` |
| `volume` | `f32` |
| `pitch` | `f32` |
| `seed` | `s64` |

### `c-entity-status` {#type-c-entity-status}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `entity-status` | `u8` |

### `c-entity-velocity` {#type-c-entity-velocity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `velocity` | `string` |

### `c-explosion` {#type-c-explosion}

**Record fields**

| Name | WIT type |
| --- | --- |
| `center` | `tuple<f64, f64, f64>` |
| `radius` | `f32` |
| `block-count` | `s32` |
| `knockback` | `option<tuple<f64, f64, f64>>` |
| `particle` | `s32` |
| `sound` | `string` |
| `block-particles-pool-size` | `s32` |

### `c-game-event` {#type-c-game-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `event` | `u8` |
| `value` | `f32` |

### `game-event` {#type-game-event}

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

### `c-game-rule-values` {#type-c-game-rule-values}

**Record fields**

| Name | WIT type |
| --- | --- |
| `rules` | `list<tuple<string, string>>` |

### `c-game-test-highlight-pos` {#type-c-game-test-highlight-pos}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `tuple<s32, s32, s32>` |
| `color` | `s32` |
| `label` | `string` |
| `duration-ms` | `s32` |

### `c-head-rot` {#type-c-head-rot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `head-yaw` | `u8` |

### `c-hurt-animation` {#type-c-hurt-animation}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `yaw` | `f32` |

### `c-initialize-world-border` {#type-c-initialize-world-border}

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `f64` |
| `z` | `f64` |
| `old-diameter` | `f64` |
| `new-diameter` | `f64` |
| `speed` | `s64` |
| `portal-teleport-boundary` | `s32` |
| `warning-blocks` | `s32` |
| `warning-time` | `s32` |

### `c-item-cooldown` {#type-c-item-cooldown}

**Record fields**

| Name | WIT type |
| --- | --- |
| `group` | `string` |
| `cooldown` | `s32` |

### `c-keep-alive` {#type-c-keep-alive}

**Record fields**

| Name | WIT type |
| --- | --- |
| `keep-alive-id` | `s64` |

### `c-level-event` {#type-c-level-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `event` | `s32` |
| `location` | `tuple<s32, s32, s32>` |
| `data` | `s32` |
| `disable-relative-volume` | `bool` |

### `c-light-update` {#type-c-light-update}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `light-data` | `light-data` |

### `light-data` {#type-light-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `trust-edges` | `bool` |
| `sky-light-mask` | `list<s64>` |
| `block-light-mask` | `list<s64>` |
| `empty-sky-light-mask` | `list<s64>` |
| `empty-block-light-mask` | `list<s64>` |
| `sky-light-arrays` | `list<list<u8>>` |
| `block-light-arrays` | `list<list<u8>>` |

### `c-login` {#type-c-login}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `is-hardcore` | `bool` |
| `dimension-names` | `list<string>` |
| `max-players` | `s32` |
| `view-distance` | `s32` |
| `simulated-distance` | `s32` |
| `reduced-debug-info` | `bool` |
| `enabled-respawn-screen` | `bool` |
| `limited-crafting` | `bool` |
| `spawn-data` | `player-spawn-data` |
| `online-mode` | `bool` |
| `enforce-secure-chat` | `bool` |

### `c-map-item-data` {#type-c-map-item-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `map-id` | `s32` |
| `scale` | `u8` |
| `tracking-position` | `bool` |
| `locked` | `bool` |
| `icons` | `option<list<map-icon>>` |
| `data` | `option<map-patch>` |

### `map-icon` {#type-map-icon}

**Record fields**

| Name | WIT type |
| --- | --- |
| `icon-type` | `s32` |
| `x` | `u8` |
| `z` | `u8` |
| `direction` | `u8` |
| `display-name` | `option<string>` |

### `map-patch` {#type-map-patch}

**Record fields**

| Name | WIT type |
| --- | --- |
| `columns` | `u8` |
| `rows` | `u8` |
| `x` | `u8` |
| `z` | `u8` |
| `data` | `list<u8>` |

### `merchant-offer` {#type-merchant-offer}

**Record fields**

| Name | WIT type |
| --- | --- |
| `base-cost-a` | `string` |
| `output` | `string` |
| `cost-b` | `option<string>` |
| `reward-exp` | `bool` |
| `uses` | `s32` |
| `max-uses` | `s32` |
| `xp` | `s32` |
| `special-price` | `s32` |
| `price-multiplier` | `f32` |
| `demand` | `s32` |

### `c-merchant-offers` {#type-c-merchant-offers}

**Record fields**

| Name | WIT type |
| --- | --- |
| `window-id` | `s32` |
| `offers` | `list<merchant-offer>` |
| `villager-level` | `s32` |
| `experience` | `s32` |
| `is-regular-villager` | `bool` |
| `can-restock` | `bool` |

### `minecart-step` {#type-minecart-step}

**Record fields**

| Name | WIT type |
| --- | --- |
| `position` | `tuple<f64, f64, f64>` |
| `movement` | `tuple<f64, f64, f64>` |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `weight` | `f32` |

### `c-move-minecart-along-track` {#type-c-move-minecart-along-track}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `steps` | `list<minecart-step>` |

### `c-move-vehicle` {#type-c-move-vehicle}

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `f64` |
| `y` | `f64` |
| `z` | `f64` |
| `yaw` | `f32` |
| `pitch` | `f32` |

### `c-multi-block-update` {#type-c-multi-block-update}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-section` | `tuple<f64, f64, f64>` |
| `suppress-light-updates` | `bool` |
| `updates` | `list<tuple<tuple<s32, s32, s32>, string>>` |

### `c-open-book` {#type-c-open-book}

**Record fields**

| Name | WIT type |
| --- | --- |
| `hand` | `s32` |

### `c-open-mount-screen` {#type-c-open-mount-screen}

**Record fields**

| Name | WIT type |
| --- | --- |
| `window-id` | `u8` |
| `slot-count` | `s32` |
| `entity-id` | `s32` |

### `c-open-screen` {#type-c-open-screen}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sync-id` | `s32` |
| `window-type` | `s32` |
| `window-title` | `string` |

### `c-open-sign-editor` {#type-c-open-sign-editor}

**Record fields**

| Name | WIT type |
| --- | --- |
| `location` | `tuple<s32, s32, s32>` |
| `is-front-text` | `bool` |

### `c-particle` {#type-c-particle}

**Record fields**

| Name | WIT type |
| --- | --- |
| `force-spawn` | `bool` |
| `important` | `bool` |
| `position` | `tuple<f64, f64, f64>` |
| `offset` | `tuple<f64, f64, f64>` |
| `max-speed` | `f32` |
| `particle-count` | `s32` |
| `particle-id` | `s32` |
| `data` | `list<u8>` |

### `c-play-ping` {#type-c-play-ping}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |

### `c-ping-response` {#type-c-ping-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `payload` | `s64` |

### `c-place-ghost-recipe` {#type-c-place-ghost-recipe}

**Record fields**

| Name | WIT type |
| --- | --- |
| `window-id` | `u8` |
| `recipe-id` | `string` |

### `c-player-abilities` {#type-c-player-abilities}

**Record fields**

| Name | WIT type |
| --- | --- |
| `%flags` | `u8` |
| `flying-speed` | `f32` |
| `field-of-view` | `f32` |

### `player-action-add-player` {#type-player-action-add-player}

**Record fields**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `properties` | `list<property>` |

### `player-action` {#type-player-action}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `add-player` | `player-action-add-player` |
| `initialize-chat` | `option<init-chat>` |
| `update-game-mode` | `s32` |
| `update-listed` | `bool` |
| `update-latency` | `s32` |
| `update-display-name` | `option<string>` |
| `update-list-order` | `s32` |
| `update-hat` | `bool` |

### `init-chat` {#type-init-chat}

**Record fields**

| Name | WIT type |
| --- | --- |
| `session-id` | `uuid` |
| `expires-at` | `s64` |
| `public-key` | `list<u8>` |
| `signature` | `list<u8>` |

### `c-player-chat-message` {#type-c-player-chat-message}

**Record fields**

| Name | WIT type |
| --- | --- |
| `global-index` | `s32` |
| `sender` | `uuid` |
| `index` | `s32` |
| `message-signature` | `option<list<u8>>` |
| `message` | `string` |
| `timestamp` | `s64` |
| `salt` | `s64` |
| `previous-messages` | `list<previous-message>` |
| `unsigned-content` | `option<string>` |
| `filter-type` | `filter-type` |
| `chat-type` | `s32` |
| `sender-name` | `string` |
| `target-name` | `option<string>` |

### `previous-message` {#type-previous-message}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `signature` | `option<list<u8>>` |

### `filter-type` {#type-filter-type}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `pass-through` |  |
| `fully-filtered` |  |
| `partially-filtered` | `list<s64>` |

### `c-player-info-update` {#type-c-player-info-update}

**Record fields**

| Name | WIT type |
| --- | --- |
| `actions` | `u8` |
| `players` | `list<player>` |

### `player` {#type-player}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `actions` | `list<player-action>` |

### `c-player-look-at` {#type-c-player-look-at}

**Record fields**

| Name | WIT type |
| --- | --- |
| `from-anchor` | `s32` |
| `target-x` | `f64` |
| `target-y` | `f64` |
| `target-z` | `f64` |
| `entity` | `option<tuple<s32, s32>>` |

### `c-player-position` {#type-c-player-position}

**Record fields**

| Name | WIT type |
| --- | --- |
| `teleport-id` | `s32` |
| `position` | `tuple<f64, f64, f64>` |
| `delta` | `tuple<f64, f64, f64>` |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `relatives` | `list<string>` |

### `c-remove-player-info` {#type-c-remove-player-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `players` | `list<uuid>` |

### `c-player-rotation` {#type-c-player-rotation}

**Record fields**

| Name | WIT type |
| --- | --- |
| `yaw` | `f32` |
| `pitch` | `f32` |

### `player-spawn-data` {#type-player-spawn-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `dimension` | `string` |
| `hashed-seed` | `s64` |
| `game-mode` | `u8` |
| `previous-gamemode` | `u8` |
| `debug` | `bool` |
| `is-flat` | `bool` |
| `death-dimension-name` | `option<tuple<string, tuple<s32, s32, s32>>>` |
| `portal-cooldown` | `s32` |
| `sealevel` | `s32` |

### `c-player-spawn-position` {#type-c-player-spawn-position}

**Record fields**

| Name | WIT type |
| --- | --- |
| `dimension-name` | `string` |
| `location` | `tuple<s32, s32, s32>` |
| `yaw` | `f32` |
| `pitch` | `f32` |

### `c-post-effects` {#type-c-post-effects}

**Record fields**

| Name | WIT type |
| --- | --- |
| `effects` | `list<string>` |

### `c-projectile-power` {#type-c-projectile-power}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `x-power` | `f64` |
| `y-power` | `f64` |
| `z-power` | `f64` |

### `c-recipe-book-add` {#type-c-recipe-book-add}

**Record fields**

| Name | WIT type |
| --- | --- |
| `replace` | `bool` |

### `c-recipe-book-remove` {#type-c-recipe-book-remove}

**Record fields**

| Name | WIT type |
| --- | --- |
| `recipes` | `list<s32>` |

### `c-recipe-book-settings` {#type-c-recipe-book-settings}

**Record fields**

| Name | WIT type |
| --- | --- |
| `crafting-open` | `bool` |
| `crafting-filtering` | `bool` |
| `furnace-open` | `bool` |
| `furnace-filtering` | `bool` |
| `blast-furnace-open` | `bool` |
| `blast-furnace-filtering` | `bool` |
| `smoker-open` | `bool` |
| `smoker-filtering` | `bool` |

### `c-remove-entities` {#type-c-remove-entities}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-ids` | `list<s32>` |

### `c-remove-mob-effect` {#type-c-remove-mob-effect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `effect-id` | `s32` |

### `c-remove-resource-pack` {#type-c-remove-resource-pack}

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `option<uuid>` |

### `c-reset-score` {#type-c-reset-score}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
| `objective-name` | `option<string>` |

### `c-respawn` {#type-c-respawn}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-spawn-info` | `player-spawn-data` |
| `data-kept` | `u8` |

### `c-select-advancements-tab` {#type-c-select-advancements-tab}

**Record fields**

| Name | WIT type |
| --- | --- |
| `tab-id` | `option<string>` |

### `c-server-data` {#type-c-server-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `motd` | `string` |
| `icon-base64` | `option<string>` |

### `c-play-server-links` {#type-c-play-server-links}

**Record fields**

| Name | WIT type |
| --- | --- |
| `links` | `list<string>` |

### `c-set-border-center` {#type-c-set-border-center}

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `f64` |
| `z` | `f64` |

### `c-set-border-lerp-size` {#type-c-set-border-lerp-size}

**Record fields**

| Name | WIT type |
| --- | --- |
| `old-diameter` | `f64` |
| `new-diameter` | `f64` |
| `speed` | `s64` |

### `c-set-border-size` {#type-c-set-border-size}

**Record fields**

| Name | WIT type |
| --- | --- |
| `diameter` | `f64` |

### `c-set-border-warning-delay` {#type-c-set-border-warning-delay}

**Record fields**

| Name | WIT type |
| --- | --- |
| `warning-time` | `s32` |

### `c-set-border-warning-distance` {#type-c-set-border-warning-distance}

**Record fields**

| Name | WIT type |
| --- | --- |
| `warning-blocks` | `s32` |

### `c-set-camera` {#type-c-set-camera}

**Record fields**

| Name | WIT type |
| --- | --- |
| `camera-id` | `s32` |

### `c-set-chunk-cache-radius` {#type-c-set-chunk-cache-radius}

**Record fields**

| Name | WIT type |
| --- | --- |
| `radius` | `s32` |

### `c-set-container-content` {#type-c-set-container-content}

**Record fields**

| Name | WIT type |
| --- | --- |
| `window-id` | `s32` |
| `state-id` | `s32` |
| `slot-data` | `list<string>` |
| `carried-item` | `string` |

### `c-set-container-property` {#type-c-set-container-property}

**Record fields**

| Name | WIT type |
| --- | --- |
| `window-id` | `s32` |
| `property` | `s32` |
| `value` | `s32` |

### `c-set-container-slot` {#type-c-set-container-slot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `window-id` | `u8` |
| `state-id` | `s32` |
| `slot` | `s32` |
| `slot-data` | `string` |

### `c-set-cursor-item` {#type-c-set-cursor-item}

**Record fields**

| Name | WIT type |
| --- | --- |
| `stack` | `string` |

### `c-set-entity-link` {#type-c-set-entity-link}

**Record fields**

| Name | WIT type |
| --- | --- |
| `attached-entity-id` | `s32` |
| `holding-entity-id` | `s32` |
| `leash` | `bool` |

### `c-set-equipment` {#type-c-set-equipment}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `equipment` | `list<tuple<u8, string>>` |

### `c-set-experience` {#type-c-set-experience}

**Record fields**

| Name | WIT type |
| --- | --- |
| `progress` | `f32` |
| `level` | `s32` |
| `total-experience` | `s32` |

### `c-set-health` {#type-c-set-health}

**Record fields**

| Name | WIT type |
| --- | --- |
| `health` | `f32` |
| `food` | `s32` |
| `food-saturation` | `f32` |

### `c-set-selected-slot` {#type-c-set-selected-slot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `slot` | `u8` |

### `c-set-passengers` {#type-c-set-passengers}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `passengers` | `list<s32>` |

### `c-set-player-inventory` {#type-c-set-player-inventory}

**Record fields**

| Name | WIT type |
| --- | --- |
| `slot` | `s32` |
| `item` | `string` |

### `team-method` {#type-team-method}

**Enum cases**

| Name |
| --- |
| `create` |
| `remove` |
| `update` |
| `add-players` |
| `remove-players` |

### `team-parameters` {#type-team-parameters}

**Record fields**

| Name | WIT type |
| --- | --- |
| `display-name` | `string` |
| `options` | `u8` |
| `nametag-visibility` | `string` |
| `collision-rule` | `string` |
| `color` | `s32` |
| `player-prefix` | `string` |
| `player-suffix` | `string` |

### `c-set-player-team` {#type-c-set-player-team}

**Record fields**

| Name | WIT type |
| --- | --- |
| `team-name` | `string` |
| `method` | `team-method` |
| `parameters` | `option<team-parameters>` |
| `players` | `list<string>` |

### `c-set-simulation-distance` {#type-c-set-simulation-distance}

**Record fields**

| Name | WIT type |
| --- | --- |
| `simulation-distance` | `s32` |

### `c-update-time` {#type-c-update-time}

**Record fields**

| Name | WIT type |
| --- | --- |
| `game-time` | `s64` |
| `clock-updates` | `list<tuple<s32, s64, f32, f32>>` |

### `c-title-text` {#type-c-title-text}

**Record fields**

| Name | WIT type |
| --- | --- |
| `title` | `string` |

### `c-title-animation` {#type-c-title-animation}

**Record fields**

| Name | WIT type |
| --- | --- |
| `fade-in-ticks` | `s32` |
| `stay-ticks` | `s32` |
| `fade-out-ticks` | `s32` |

### `c-play-show-dialog` {#type-c-play-show-dialog}

**Record fields**

| Name | WIT type |
| --- | --- |
| `dialog` | `string` |

### `c-sound-effect` {#type-c-sound-effect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sound-event` | `string` |
| `sound-category` | `s32` |
| `position` | `tuple<f64, f64, f64>` |
| `volume` | `f32` |
| `pitch` | `f32` |
| `seed` | `s64` |

### `c-spawn-entity` {#type-c-spawn-entity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `entity-uuid` | `uuid` |
| `r-type` | `s32` |
| `position` | `tuple<f64, f64, f64>` |
| `velocity` | `string` |
| `pitch` | `u8` |
| `yaw` | `u8` |
| `head-yaw` | `u8` |
| `data` | `s32` |

### `c-stop-sound` {#type-c-stop-sound}

**Record fields**

| Name | WIT type |
| --- | --- |
| `sound-id` | `option<string>` |
| `category` | `option<string>` |

### `c-store-cookie` {#type-c-store-cookie}

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |
| `payload` | `list<u8>` |

### `c-subtitle` {#type-c-subtitle}

**Record fields**

| Name | WIT type |
| --- | --- |
| `subtitle` | `string` |

### `c-system-chat-message` {#type-c-system-chat-message}

**Record fields**

| Name | WIT type |
| --- | --- |
| `content` | `string` |
| `overlay` | `bool` |

### `c-tab-list` {#type-c-tab-list}

**Record fields**

| Name | WIT type |
| --- | --- |
| `header` | `string` |
| `footer` | `string` |

### `c-tag-query-response` {#type-c-tag-query-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `transaction-id` | `s32` |
| `nbt-bytes` | `list<u8>` |

### `c-take-item-entity` {#type-c-take-item-entity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `collector-entity-id` | `s32` |
| `stack-amount` | `s32` |

### `c-teleport-entity` {#type-c-teleport-entity}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `position` | `tuple<f64, f64, f64>` |
| `delta` | `tuple<f64, f64, f64>` |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `relatives` | `list<string>` |
| `on-ground` | `bool` |

### `c-test-instance-block-status` {#type-c-test-instance-block-status}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `tuple<s32, s32, s32>` |
| `status` | `s32` |
| `message` | `option<string>` |

### `c-ticking-state` {#type-c-ticking-state}

**Record fields**

| Name | WIT type |
| --- | --- |
| `tick-rate` | `f32` |
| `is-frozen` | `bool` |

### `c-ticking-step` {#type-c-ticking-step}

**Record fields**

| Name | WIT type |
| --- | --- |
| `tick-steps` | `s32` |

### `c-transfer` {#type-c-transfer}

**Record fields**

| Name | WIT type |
| --- | --- |
| `host` | `string` |
| `port` | `s32` |

### `c-unload-chunk` {#type-c-unload-chunk}

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `s32` |
| `z` | `s32` |

### `c-update-advancements` {#type-c-update-advancements}

**Record fields**

| Name | WIT type |
| --- | --- |
| `reset` | `bool` |
| `added` | `list<string>` |
| `removed` | `list<string>` |
| `progress` | `list<string>` |
| `show-advancements` | `bool` |

### `c-update-attributes` {#type-c-update-attributes}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `properties` | `list<property>` |

### `property` {#type-property}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `s32` |
| `value` | `f64` |
| `modifiers` | `list<attribute-modifier>` |

### `attribute-modifier` {#type-attribute-modifier}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `string` |
| `amount` | `f64` |
| `operation` | `u8` |

### `c-update-entity-pos` {#type-c-update-entity-pos}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `delta` | `tuple<f64, f64, f64>` |
| `on-ground` | `bool` |

### `c-update-entity-pos-rot` {#type-c-update-entity-pos-rot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `delta` | `tuple<f64, f64, f64>` |
| `yaw` | `u8` |
| `pitch` | `u8` |
| `on-ground` | `bool` |

### `c-update-entity-rot` {#type-c-update-entity-rot}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `yaw` | `u8` |
| `pitch` | `u8` |
| `on-ground` | `bool` |

### `c-update-mob-effect` {#type-c-update-mob-effect}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `effect-id` | `s32` |
| `amplifier` | `s32` |
| `duration` | `s32` |
| `%flags` | `u8` |

### `c-update-objectives` {#type-c-update-objectives}

**Record fields**

| Name | WIT type |
| --- | --- |
| `objective-name` | `string` |
| `mode` | `u8` |
| `display-name` | `string` |
| `render-type` | `s32` |
| `number-format` | `option<string>` |

### `mode` {#type-mode}

**Enum cases**

| Name |
| --- |
| `add` |
| `remove` |
| `update` |

### `render-type` {#type-render-type}

**Enum cases**

| Name |
| --- |
| `integer` |
| `hearts` |

### `c-update-recipes` {#type-c-update-recipes}

**Record fields**

| Name | WIT type |
| --- | --- |
| `raw-data` | `list<u8>` |

### `c-update-score` {#type-c-update-score}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
| `objective-name` | `string` |
| `value` | `s32` |
| `display-name` | `option<string>` |
| `number-format` | `option<string>` |

### `c-update-tags-play` {#type-c-update-tags-play}

**Record fields**

| Name | WIT type |
| --- | --- |
| `tags` | `list<string>` |

### `waypoint-operation` {#type-waypoint-operation}

**Enum cases**

| Name |
| --- |
| `track` |
| `untrack` |
| `update` |

### `waypoint-target-chunk` {#type-waypoint-target-chunk}

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `s32` |
| `z` | `s32` |

### `waypoint-target` {#type-waypoint-target}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `position` | `tuple<s32, s32, s32>` |
| `chunk` | `waypoint-target-chunk` |
| `azimuth` | `f32` |
| `empty` |  |

### `waypoint-icon` {#type-waypoint-icon}

**Record fields**

| Name | WIT type |
| --- | --- |
| `style` | `option<string>` |
| `color` | `s32` |

### `tracked-waypoint` {#type-tracked-waypoint}

**Record fields**

| Name | WIT type |
| --- | --- |
| `identifier` | `uuid` |
| `icon` | `option<waypoint-icon>` |
| `target` | `waypoint-target` |

### `c-waypoint` {#type-c-waypoint}

**Record fields**

| Name | WIT type |
| --- | --- |
| `operation` | `waypoint-operation` |
| `waypoint` | `tracked-waypoint` |

### `c-world-event` {#type-c-world-event}

**Record fields**

| Name | WIT type |
| --- | --- |
| `event` | `s32` |
| `location` | `tuple<s32, s32, s32>` |
| `data` | `s32` |
| `disable-relative-volume` | `bool` |

### `status-c-ping-response` {#type-status-c-ping-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `payload` | `s64` |

### `status-c-status-response` {#type-status-c-status-response}

**Record fields**

| Name | WIT type |
| --- | --- |
| `json-response` | `string` |

### `serverbound-packet` {#type-serverbound-packet}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `config-s-accept-code-of-conduct` |  |
| `config-s-acknowledge-finish-config` |  |
| `config-s-client-information-config` | `config-s-client-information-config` |
| `config-s-config-cookie-response` | `config-s-config-cookie-response` |
| `config-s-custom-click-action` | `config-s-custom-click-action` |
| `config-s-keep-alive` | `config-s-keep-alive` |
| `config-s-known-packs` | `config-s-known-packs` |
| `config-s-plugin-message` | `config-s-plugin-message` |
| `config-s-config-pong` | `config-s-config-pong` |
| `config-s-config-resource-pack` | `config-s-config-resource-pack` |
| `login-s-login-cookie-response` | `login-s-login-cookie-response` |
| `login-s-login-acknowledged` |  |
| `login-s-login-start` | `login-s-login-start` |
| `login-s-login-plugin-response` | `login-s-login-plugin-response` |
| `s-attack` | `s-attack` |
| `s-block-entity-tag-query` | `s-block-entity-tag-query` |
| `s-bundle-item-selected` | `s-bundle-item-selected` |
| `s-change-difficulty` | `s-change-difficulty` |
| `s-change-game-mode` | `s-change-game-mode` |
| `s-chat-ack` | `s-chat-ack` |
| `s-chat-command` | `s-chat-command` |
| `s-chat-command-signed` | `s-chat-command-signed` |
| `s-chat-message` | `s-chat-message` |
| `s-chunk-batch` | `s-chunk-batch` |
| `s-click-slot` | `s-click-slot` |
| `s-client-command` | `s-client-command` |
| `s-client-information-play` | `s-client-information-play` |
| `s-client-tick-end` |  |
| `s-close-container` | `s-close-container` |
| `s-command-suggestion` | `s-command-suggestion` |
| `s-configuration-acknowledged` |  |
| `s-container-button-click` | `s-container-button-click` |
| `s-container-slot-state-changed` | `s-container-slot-state-changed` |
| `s-cookie-response` | `s-cookie-response` |
| `s-custom-click-action` | `s-custom-click-action` |
| `s-custom-payload` | `s-custom-payload` |
| `s-debug-sample-subscription` | `s-debug-sample-subscription` |
| `s-debug-subscription-request` | `s-debug-subscription-request` |
| `s-edit-book` | `s-edit-book` |
| `s-entity-tag-query` | `s-entity-tag-query` |
| `s-interact` | `s-interact` |
| `s-jigsaw-generate` | `s-jigsaw-generate` |
| `s-keep-alive` | `s-keep-alive` |
| `s-lock-difficulty` | `s-lock-difficulty` |
| `s-move-vehicle` | `s-move-vehicle` |
| `s-paddle-boat` | `s-paddle-boat` |
| `s-pick-item-from-block` | `s-pick-item-from-block` |
| `s-pick-item-from-entity` | `s-pick-item-from-entity` |
| `s-play-ping-request` | `s-play-ping-request` |
| `s-place-recipe` | `s-place-recipe` |
| `s-player-abilities` | `s-player-abilities` |
| `s-player-action` | `s-player-action` |
| `s-player-command` | `s-player-command` |
| `s-set-player-ground` | `s-set-player-ground` |
| `s-player-input` | `s-player-input` |
| `s-player-loaded` |  |
| `s-player-position` | `s-player-position` |
| `s-player-position-rotation` | `s-player-position-rotation` |
| `s-player-rotation` | `s-player-rotation` |
| `s-player-session` | `s-player-session` |
| `s-play-pong` | `s-play-pong` |
| `s-recipe-book-change-settings` | `s-recipe-book-change-settings` |
| `s-recipe-book-seen-recipe` | `s-recipe-book-seen-recipe` |
| `s-rename-item` | `s-rename-item` |
| `s-play-resource-pack` | `s-play-resource-pack` |
| `s-seen-advancement` | `s-seen-advancement` |
| `s-select-trade` | `s-select-trade` |
| `s-set-beacon` | `s-set-beacon` |
| `s-set-command-block` | `s-set-command-block` |
| `s-set-command-minecart` | `s-set-command-minecart` |
| `s-set-creative-slot` | `s-set-creative-slot` |
| `s-set-game-rule` | `s-set-game-rule` |
| `s-set-held-item` | `s-set-held-item` |
| `s-set-jigsaw-block` | `s-set-jigsaw-block` |
| `s-set-structure-block` | `s-set-structure-block` |
| `s-set-test-block` | `s-set-test-block` |
| `s-spectate-entity` | `s-spectate-entity` |
| `s-teleport-to-entity` | `s-teleport-to-entity` |
| `s-test-instance-block-action` | `s-test-instance-block-action` |
| `s-update-sign` | `s-update-sign` |
| `s-use-item` | `s-use-item` |
| `s-use-item-on` | `s-use-item-on` |
| `status-s-status-ping-request` | `status-s-status-ping-request` |
| `status-s-status-request` |  |
| `unknown` |  |

### `clientbound-packet` {#type-clientbound-packet}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `config-c-config-add-resource-pack` | `config-c-config-add-resource-pack` |
| `config-c-config-clear-dialog` |  |
| `config-c-code-of-conduct` | `config-c-code-of-conduct` |
| `config-c-config-disconnect` | `config-c-config-disconnect` |
| `config-c-cookie-request` | `config-c-cookie-request` |
| `config-c-config-custom-report-details` | `config-c-config-custom-report-details` |
| `config-c-feature-flags` | `config-c-feature-flags` |
| `config-c-finish-config` |  |
| `config-c-known-packs` | `config-c-known-packs` |
| `config-c-config-ping` | `config-c-config-ping` |
| `config-c-plugin-message` | `config-c-plugin-message` |
| `config-c-config-post-effects` | `config-c-config-post-effects` |
| `config-c-registry-data` | `config-c-registry-data` |
| `config-c-config-remove-resource-pack` | `config-c-config-remove-resource-pack` |
| `config-c-config-reset-chat` |  |
| `config-c-config-server-links` | `config-c-config-server-links` |
| `config-c-config-show-dialog` | `config-c-config-show-dialog` |
| `config-c-store-cookie` | `config-c-store-cookie` |
| `config-c-transfer` | `config-c-transfer` |
| `config-c-update-tags` | `config-c-update-tags` |
| `login-c-login-cookie-request` | `login-c-login-cookie-request` |
| `login-c-login-disconnect` | `login-c-login-disconnect` |
| `login-c-login-plugin-request` | `login-c-login-plugin-request` |
| `login-c-set-compression` | `login-c-set-compression` |
| `c-acknowledge-block-change` | `c-acknowledge-block-change` |
| `c-action-bar` | `c-action-bar` |
| `c-add-resource-pack` | `c-add-resource-pack` |
| `c-award-stats` | `c-award-stats` |
| `c-set-block-destroy-stage` | `c-set-block-destroy-stage` |
| `c-block-entity-data` | `c-block-entity-data` |
| `c-block-event` | `c-block-event` |
| `c-block-update` | `c-block-update` |
| `c-boss-event` | `c-boss-event` |
| `c-bundle-delimiter` |  |
| `c-center-chunk` | `c-center-chunk` |
| `c-change-difficulty` | `c-change-difficulty` |
| `c-chunk-batch-end` | `c-chunk-batch-end` |
| `c-chunk-batch-start` |  |
| `c-chunks-biomes` | `c-chunks-biomes` |
| `c-play-clear-dialog` |  |
| `c-clear-title` | `c-clear-title` |
| `c-close-container` | `c-close-container` |
| `c-combat-death` | `c-combat-death` |
| `c-combat-enter` |  |
| `c-combat-end` | `c-combat-end` |
| `c-command-suggestions` | `c-command-suggestions` |
| `c-commands` | `c-commands` |
| `c-play-cookie-request` | `c-play-cookie-request` |
| `c-custom-chat-completions` | `c-custom-chat-completions` |
| `c-custom-payload` | `c-custom-payload` |
| `c-play-custom-report-details` | `c-play-custom-report-details` |
| `c-damage-event` | `c-damage-event` |
| `c-debug-block-value` | `c-debug-block-value` |
| `c-debug-chunk-value` | `c-debug-chunk-value` |
| `c-debug-entity-value` | `c-debug-entity-value` |
| `c-debug-event` | `c-debug-event` |
| `c-debug-sample` | `c-debug-sample` |
| `c-delete-chat` | `c-delete-chat` |
| `c-play-disconnect` | `c-play-disconnect` |
| `c-disguised-chat-message` | `c-disguised-chat-message` |
| `c-display-objective` | `c-display-objective` |
| `c-entity-animation` | `c-entity-animation` |
| `c-set-entity-metadata` | `c-set-entity-metadata` |
| `c-entity-sound-effect` | `c-entity-sound-effect` |
| `c-entity-status` | `c-entity-status` |
| `c-entity-velocity` | `c-entity-velocity` |
| `c-explosion` | `c-explosion` |
| `c-game-event` | `c-game-event` |
| `c-game-rule-values` | `c-game-rule-values` |
| `c-game-test-highlight-pos` | `c-game-test-highlight-pos` |
| `c-head-rot` | `c-head-rot` |
| `c-hurt-animation` | `c-hurt-animation` |
| `c-initialize-world-border` | `c-initialize-world-border` |
| `c-item-cooldown` | `c-item-cooldown` |
| `c-keep-alive` | `c-keep-alive` |
| `c-level-event` | `c-level-event` |
| `c-light-update` | `c-light-update` |
| `c-login` | `c-login` |
| `c-low-disk-space-warning` |  |
| `c-map-item-data` | `c-map-item-data` |
| `c-merchant-offers` | `c-merchant-offers` |
| `c-move-minecart-along-track` | `c-move-minecart-along-track` |
| `c-move-vehicle` | `c-move-vehicle` |
| `c-multi-block-update` | `c-multi-block-update` |
| `c-open-book` | `c-open-book` |
| `c-open-mount-screen` | `c-open-mount-screen` |
| `c-open-screen` | `c-open-screen` |
| `c-open-sign-editor` | `c-open-sign-editor` |
| `c-particle` | `c-particle` |
| `c-play-ping` | `c-play-ping` |
| `c-ping-response` | `c-ping-response` |
| `c-place-ghost-recipe` | `c-place-ghost-recipe` |
| `c-player-abilities` | `c-player-abilities` |
| `c-player-chat-message` | `c-player-chat-message` |
| `c-player-info-update` | `c-player-info-update` |
| `c-player-look-at` | `c-player-look-at` |
| `c-player-position` | `c-player-position` |
| `c-remove-player-info` | `c-remove-player-info` |
| `c-player-rotation` | `c-player-rotation` |
| `c-player-spawn-position` | `c-player-spawn-position` |
| `c-post-effects` | `c-post-effects` |
| `c-projectile-power` | `c-projectile-power` |
| `c-recipe-book-add` | `c-recipe-book-add` |
| `c-recipe-book-remove` | `c-recipe-book-remove` |
| `c-recipe-book-settings` | `c-recipe-book-settings` |
| `c-remove-entities` | `c-remove-entities` |
| `c-remove-mob-effect` | `c-remove-mob-effect` |
| `c-remove-resource-pack` | `c-remove-resource-pack` |
| `c-reset-score` | `c-reset-score` |
| `c-respawn` | `c-respawn` |
| `c-select-advancements-tab` | `c-select-advancements-tab` |
| `c-server-data` | `c-server-data` |
| `c-play-server-links` | `c-play-server-links` |
| `c-set-border-center` | `c-set-border-center` |
| `c-set-border-lerp-size` | `c-set-border-lerp-size` |
| `c-set-border-size` | `c-set-border-size` |
| `c-set-border-warning-delay` | `c-set-border-warning-delay` |
| `c-set-border-warning-distance` | `c-set-border-warning-distance` |
| `c-set-camera` | `c-set-camera` |
| `c-set-chunk-cache-radius` | `c-set-chunk-cache-radius` |
| `c-set-container-content` | `c-set-container-content` |
| `c-set-container-property` | `c-set-container-property` |
| `c-set-container-slot` | `c-set-container-slot` |
| `c-set-cursor-item` | `c-set-cursor-item` |
| `c-set-entity-link` | `c-set-entity-link` |
| `c-set-equipment` | `c-set-equipment` |
| `c-set-experience` | `c-set-experience` |
| `c-set-health` | `c-set-health` |
| `c-set-passengers` | `c-set-passengers` |
| `c-set-player-inventory` | `c-set-player-inventory` |
| `c-set-player-team` | `c-set-player-team` |
| `c-set-simulation-distance` | `c-set-simulation-distance` |
| `c-update-time` | `c-update-time` |
| `c-title-text` | `c-title-text` |
| `c-title-animation` | `c-title-animation` |
| `c-play-show-dialog` | `c-play-show-dialog` |
| `c-sound-effect` | `c-sound-effect` |
| `c-spawn-entity` | `c-spawn-entity` |
| `c-start-configuration` |  |
| `c-stop-sound` | `c-stop-sound` |
| `c-store-cookie` | `c-store-cookie` |
| `c-subtitle` | `c-subtitle` |
| `c-tab-list` | `c-tab-list` |
| `c-tag-query-response` | `c-tag-query-response` |
| `c-take-item-entity` | `c-take-item-entity` |
| `c-teleport-entity` | `c-teleport-entity` |
| `c-test-instance-block-status` | `c-test-instance-block-status` |
| `c-ticking-state` | `c-ticking-state` |
| `c-ticking-step` | `c-ticking-step` |
| `c-transfer` | `c-transfer` |
| `c-unload-chunk` | `c-unload-chunk` |
| `c-update-advancements` | `c-update-advancements` |
| `c-update-attributes` | `c-update-attributes` |
| `c-update-entity-pos` | `c-update-entity-pos` |
| `c-update-entity-pos-rot` | `c-update-entity-pos-rot` |
| `c-update-entity-rot` | `c-update-entity-rot` |
| `c-update-mob-effect` | `c-update-mob-effect` |
| `c-update-objectives` | `c-update-objectives` |
| `c-update-recipes` | `c-update-recipes` |
| `c-update-score` | `c-update-score` |
| `c-waypoint` | `c-waypoint` |
| `c-world-event` | `c-world-event` |
| `status-c-ping-response` | `status-c-ping-response` |
| `status-c-status-response` | `status-c-status-response` |
| `unknown` |  |
