---
title: Interface event
outline: [2, 2]
---

# Interface `event`

Shared types: `pumpkin:plugin/event@0.1.0`

[Package summary](./)

Source: [event.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/event.wit)

Event types, priorities, and event data.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`common`](./common) | `block-pos`, `game-mode`, `hand`, `position`, `click-type` |
| [`item-stack`](./item-stack) | `item-stack` |
| [`enchantments`](./enchantments) | `enchantment` |
| [`damage-types`](./damage-types) | `damage-type` |
| [`screens`](./screens) | `screen` |
| [`player`](./player) | `player` |
| [`text`](./text) | `text-component` |
| [`world`](./world) | `%world` |
| [`java-packets`](./java-packets) | `serverbound-packet as java-serverbound-packet`, `clientbound-packet as java-clientbound-packet` |
| [`bedrock-packets`](./bedrock-packets) | `serverbound-packet as bedrock-serverbound-packet`, `clientbound-packet as bedrock-clientbound-packet` |
| [`uuid`](./uuid) | `uuid` |
| [`java-dialogs`](./java-dialogs) | `dialog` |

## Type Summary

| Kind | Type |
| --- | --- |
| record | [`area-effect-cloud-apply-event-data`](#type-area-effect-cloud-apply-event-data) |
| record | [`arrow-body-count-change-event-data`](#type-arrow-body-count-change-event-data) |
| record | [`async-player-chat-event-data`](#type-async-player-chat-event-data) |
| record | [`async-player-pre-login-event-data`](#type-async-player-pre-login-event-data) |
| record | [`async-structure-generate-event-data`](#type-async-structure-generate-event-data) |
| record | [`async-structure-spawn-event-data`](#type-async-structure-spawn-event-data) |
| record | [`bat-toggle-sleep-event-data`](#type-bat-toggle-sleep-event-data) |
| record | [`bedrock-form-response-event-data`](#type-bedrock-form-response-event-data) |
| record | [`bell-resonate-event-data`](#type-bell-resonate-event-data) |
| record | [`bell-ring-event-data`](#type-bell-ring-event-data) |
| record | [`block-break-event-data`](#type-block-break-event-data) |
| record | [`block-brush-event-data`](#type-block-brush-event-data) |
| record | [`block-burn-event-data`](#type-block-burn-event-data) |
| record | [`block-can-build-event-data`](#type-block-can-build-event-data) |
| record | [`block-cook-event-data`](#type-block-cook-event-data) |
| record | [`block-damage-abort-event-data`](#type-block-damage-abort-event-data) |
| record | [`block-damage-event-data`](#type-block-damage-event-data) |
| record | [`block-dispense-armor-event-data`](#type-block-dispense-armor-event-data) |
| record | [`block-dispense-event-data`](#type-block-dispense-event-data) |
| record | [`block-dispense-loot-event-data`](#type-block-dispense-loot-event-data) |
| record | [`block-drop-item-event-data`](#type-block-drop-item-event-data) |
| record | [`block-exp-event-data`](#type-block-exp-event-data) |
| record | [`block-explode-event-data`](#type-block-explode-event-data) |
| record | [`block-fade-event-data`](#type-block-fade-event-data) |
| record | [`block-fertilize-event-data`](#type-block-fertilize-event-data) |
| record | [`block-form-event-data`](#type-block-form-event-data) |
| record | [`block-from-to-event-data`](#type-block-from-to-event-data) |
| record | [`block-grow-event-data`](#type-block-grow-event-data) |
| record | [`block-ignite-event-data`](#type-block-ignite-event-data) |
| record | [`block-multi-place-event-data`](#type-block-multi-place-event-data) |
| record | [`block-physics-event-data`](#type-block-physics-event-data) |
| record | [`block-piston-extend-event-data`](#type-block-piston-extend-event-data) |
| record | [`block-piston-retract-event-data`](#type-block-piston-retract-event-data) |
| record | [`block-place-event-data`](#type-block-place-event-data) |
| record | [`block-receive-game-event-data`](#type-block-receive-game-event-data) |
| record | [`block-redstone-event-data`](#type-block-redstone-event-data) |
| record | [`block-shear-entity-event-data`](#type-block-shear-entity-event-data) |
| record | [`block-spread-event-data`](#type-block-spread-event-data) |
| record | [`brew-event-data`](#type-brew-event-data) |
| record | [`brewing-stand-fuel-event-data`](#type-brewing-stand-fuel-event-data) |
| record | [`brewing-start-event-data`](#type-brewing-start-event-data) |
| record | [`campfire-start-event-data`](#type-campfire-start-event-data) |
| record | [`cauldron-level-change-event-data`](#type-cauldron-level-change-event-data) |
| record | [`chunk-load-event-data`](#type-chunk-load-event-data) |
| record | [`chunk-populate-event-data`](#type-chunk-populate-event-data) |
| record | [`chunk-save-event-data`](#type-chunk-save-event-data) |
| record | [`chunk-send-event-data`](#type-chunk-send-event-data) |
| record | [`chunk-unload-event-data`](#type-chunk-unload-event-data) |
| variant | [`clientbound-packet`](#type-clientbound-packet) |
| record | [`craft-item-event-data`](#type-craft-item-event-data) |
| record | [`crafter-craft-event-data`](#type-crafter-craft-event-data) |
| record | [`creature-spawn-event-data`](#type-creature-spawn-event-data) |
| record | [`creeper-power-event-data`](#type-creeper-power-event-data) |
| record | [`dialog-clear-event-data`](#type-dialog-clear-event-data) |
| record | [`dialog-click-action-event-data`](#type-dialog-click-action-event-data) |
| record | [`dialog-show-event-data`](#type-dialog-show-event-data) |
| record | [`enchant-item-event-data`](#type-enchant-item-event-data) |
| record | [`enchantment-offer`](#type-enchantment-offer) |
| record | [`enchantment-value`](#type-enchantment-value) |
| record | [`ender-dragon-change-phase-event-data`](#type-ender-dragon-change-phase-event-data) |
| record | [`entities-load-event-data`](#type-entities-load-event-data) |
| record | [`entities-unload-event-data`](#type-entities-unload-event-data) |
| record | [`entity-air-change-event-data`](#type-entity-air-change-event-data) |
| record | [`entity-block-form-event-data`](#type-entity-block-form-event-data) |
| record | [`entity-break-door-event-data`](#type-entity-break-door-event-data) |
| record | [`entity-breed-event-data`](#type-entity-breed-event-data) |
| record | [`entity-change-block-event-data`](#type-entity-change-block-event-data) |
| record | [`entity-combust-by-block-event-data`](#type-entity-combust-by-block-event-data) |
| record | [`entity-combust-by-entity-event-data`](#type-entity-combust-by-entity-event-data) |
| record | [`entity-combust-event-data`](#type-entity-combust-event-data) |
| record | [`entity-damage-by-block-event-data`](#type-entity-damage-by-block-event-data) |
| record | [`entity-damage-by-entity-event-data`](#type-entity-damage-by-entity-event-data) |
| record | [`entity-damage-event-data`](#type-entity-damage-event-data) |
| record | [`entity-death-event-data`](#type-entity-death-event-data) |
| record | [`entity-dismount-event-data`](#type-entity-dismount-event-data) |
| record | [`entity-drop-item-event-data`](#type-entity-drop-item-event-data) |
| record | [`entity-dye-event-data`](#type-entity-dye-event-data) |
| record | [`entity-enter-block-event-data`](#type-entity-enter-block-event-data) |
| record | [`entity-enter-love-mode-event-data`](#type-entity-enter-love-mode-event-data) |
| record | [`entity-exhaustion-event-data`](#type-entity-exhaustion-event-data) |
| record | [`entity-explode-event-data`](#type-entity-explode-event-data) |
| record | [`entity-interact-event-data`](#type-entity-interact-event-data) |
| enum | [`entity-interaction-action`](#type-entity-interaction-action) |
| record | [`entity-knockback-by-entity-event-data`](#type-entity-knockback-by-entity-event-data) |
| record | [`entity-knockback-event-data`](#type-entity-knockback-event-data) |
| record | [`entity-mount-event-data`](#type-entity-mount-event-data) |
| record | [`entity-pickup-item-event-data`](#type-entity-pickup-item-event-data) |
| record | [`entity-place-event-data`](#type-entity-place-event-data) |
| record | [`entity-portal-enter-event-data`](#type-entity-portal-enter-event-data) |
| record | [`entity-portal-event-data`](#type-entity-portal-event-data) |
| record | [`entity-portal-exit-event-data`](#type-entity-portal-exit-event-data) |
| record | [`entity-pose-change-event-data`](#type-entity-pose-change-event-data) |
| record | [`entity-potion-effect-event-data`](#type-entity-potion-effect-event-data) |
| record | [`entity-regain-health-event-data`](#type-entity-regain-health-event-data) |
| record | [`entity-remove-event-data`](#type-entity-remove-event-data) |
| record | [`entity-resurrect-event-data`](#type-entity-resurrect-event-data) |
| record | [`entity-shoot-bow-event-data`](#type-entity-shoot-bow-event-data) |
| record | [`entity-spawn-event-data`](#type-entity-spawn-event-data) |
| record | [`entity-spell-cast-event-data`](#type-entity-spell-cast-event-data) |
| record | [`entity-tame-event-data`](#type-entity-tame-event-data) |
| record | [`entity-target-block-event-data`](#type-entity-target-block-event-data) |
| record | [`entity-target-event-data`](#type-entity-target-event-data) |
| record | [`entity-target-living-entity-event-data`](#type-entity-target-living-entity-event-data) |
| record | [`entity-teleport-event-data`](#type-entity-teleport-event-data) |
| record | [`entity-toggle-glide-event-data`](#type-entity-toggle-glide-event-data) |
| record | [`entity-toggle-swim-event-data`](#type-entity-toggle-swim-event-data) |
| record | [`entity-transform-event-data`](#type-entity-transform-event-data) |
| record | [`entity-unleash-event-data`](#type-entity-unleash-event-data) |
| variant | [`event`](#type-event) |
| enum | [`event-priority`](#type-event-priority) |
| enum | [`event-type`](#type-event-type) |
| record | [`exp-bottle-event-data`](#type-exp-bottle-event-data) |
| record | [`explosion-prime-event-data`](#type-explosion-prime-event-data) |
| record | [`firework-explode-event-data`](#type-firework-explode-event-data) |
| record | [`fluid-level-change-event-data`](#type-fluid-level-change-event-data) |
| record | [`food-level-change-event-data`](#type-food-level-change-event-data) |
| record | [`furnace-burn-event-data`](#type-furnace-burn-event-data) |
| record | [`furnace-extract-event-data`](#type-furnace-extract-event-data) |
| record | [`furnace-smelt-event-data`](#type-furnace-smelt-event-data) |
| record | [`furnace-start-smelt-event-data`](#type-furnace-start-smelt-event-data) |
| record | [`generic-game-event-data`](#type-generic-game-event-data) |
| record | [`hanging-break-by-entity-event-data`](#type-hanging-break-by-entity-event-data) |
| record | [`hanging-break-event-data`](#type-hanging-break-event-data) |
| record | [`hanging-place-event-data`](#type-hanging-place-event-data) |
| record | [`hopper-inventory-search-event-data`](#type-hopper-inventory-search-event-data) |
| record | [`horse-jump-event-data`](#type-horse-jump-event-data) |
| enum | [`interact-action`](#type-interact-action) |
| record | [`inventory-block-start-event-data`](#type-inventory-block-start-event-data) |
| record | [`inventory-click-event-data`](#type-inventory-click-event-data) |
| record | [`inventory-close-event-data`](#type-inventory-close-event-data) |
| record | [`inventory-creative-event-data`](#type-inventory-creative-event-data) |
| record | [`inventory-drag-event-data`](#type-inventory-drag-event-data) |
| record | [`inventory-interact-event-data`](#type-inventory-interact-event-data) |
| record | [`inventory-move-item-event-data`](#type-inventory-move-item-event-data) |
| record | [`inventory-open-event-data`](#type-inventory-open-event-data) |
| record | [`inventory-pickup-item-event-data`](#type-inventory-pickup-item-event-data) |
| record | [`item-despawn-event-data`](#type-item-despawn-event-data) |
| record | [`item-merge-event-data`](#type-item-merge-event-data) |
| record | [`item-spawn-event-data`](#type-item-spawn-event-data) |
| record | [`leaves-decay-event-data`](#type-leaves-decay-event-data) |
| record | [`lightning-strike-event-data`](#type-lightning-strike-event-data) |
| record | [`lingering-potion-splash-event-data`](#type-lingering-potion-splash-event-data) |
| record | [`loot-generate-event-data`](#type-loot-generate-event-data) |
| record | [`map-initialize-event-data`](#type-map-initialize-event-data) |
| record | [`moisture-change-event-data`](#type-moisture-change-event-data) |
| record | [`note-play-event-data`](#type-note-play-event-data) |
| record | [`packet-received-event-data`](#type-packet-received-event-data) |
| record | [`packet-sent-event-data`](#type-packet-sent-event-data) |
| record | [`pig-zap-event-data`](#type-pig-zap-event-data) |
| record | [`pig-zombie-anger-event-data`](#type-pig-zombie-anger-event-data) |
| record | [`piglin-barter-event-data`](#type-piglin-barter-event-data) |
| record | [`player-advancement-done-event-data`](#type-player-advancement-done-event-data) |
| record | [`player-animation-event-data`](#type-player-animation-event-data) |
| record | [`player-armor-stand-manipulate-event-data`](#type-player-armor-stand-manipulate-event-data) |
| record | [`player-bed-enter-event-data`](#type-player-bed-enter-event-data) |
| record | [`player-bed-leave-event-data`](#type-player-bed-leave-event-data) |
| record | [`player-bucket-empty-event-data`](#type-player-bucket-empty-event-data) |
| record | [`player-bucket-entity-event-data`](#type-player-bucket-entity-event-data) |
| record | [`player-bucket-fill-event-data`](#type-player-bucket-fill-event-data) |
| record | [`player-change-world-event-data`](#type-player-change-world-event-data) |
| record | [`player-changed-main-hand-event-data`](#type-player-changed-main-hand-event-data) |
| record | [`player-changed-world-event-data`](#type-player-changed-world-event-data) |
| record | [`player-channel-event-data`](#type-player-channel-event-data) |
| record | [`player-chat-event-data`](#type-player-chat-event-data) |
| record | [`player-command-preprocess-event-data`](#type-player-command-preprocess-event-data) |
| record | [`player-command-send-event-data`](#type-player-command-send-event-data) |
| record | [`player-custom-payload-event-data`](#type-player-custom-payload-event-data) |
| record | [`player-death-event-data`](#type-player-death-event-data) |
| record | [`player-drop-item-event-data`](#type-player-drop-item-event-data) |
| record | [`player-edit-book-event-data`](#type-player-edit-book-event-data) |
| record | [`player-egg-throw-event-data`](#type-player-egg-throw-event-data) |
| record | [`player-elytra-boost-event-data`](#type-player-elytra-boost-event-data) |
| record | [`player-exp-change-event-data`](#type-player-exp-change-event-data) |
| record | [`player-exp-cooldown-change-event-data`](#type-player-exp-cooldown-change-event-data) |
| record | [`player-fish-event-data`](#type-player-fish-event-data) |
| enum | [`player-fish-state`](#type-player-fish-state) |
| record | [`player-gamemode-change-event-data`](#type-player-gamemode-change-event-data) |
| record | [`player-harvest-block-event-data`](#type-player-harvest-block-event-data) |
| record | [`player-hide-entity-event-data`](#type-player-hide-entity-event-data) |
| record | [`player-input-event-data`](#type-player-input-event-data) |
| record | [`player-interact-at-entity-event-data`](#type-player-interact-at-entity-event-data) |
| record | [`player-interact-entity-event-data`](#type-player-interact-entity-event-data) |
| record | [`player-interact-event-data`](#type-player-interact-event-data) |
| record | [`player-interact-unknown-entity-event-data`](#type-player-interact-unknown-entity-event-data) |
| record | [`player-item-break-event-data`](#type-player-item-break-event-data) |
| record | [`player-item-consume-event-data`](#type-player-item-consume-event-data) |
| record | [`player-item-damage-event-data`](#type-player-item-damage-event-data) |
| record | [`player-item-held-event-data`](#type-player-item-held-event-data) |
| record | [`player-item-mend-event-data`](#type-player-item-mend-event-data) |
| record | [`player-join-event-data`](#type-player-join-event-data) |
| record | [`player-kick-event-data`](#type-player-kick-event-data) |
| record | [`player-leash-entity-event-data`](#type-player-leash-entity-event-data) |
| record | [`player-leave-event-data`](#type-player-leave-event-data) |
| record | [`player-level-change-event-data`](#type-player-level-change-event-data) |
| record | [`player-links-send-event-data`](#type-player-links-send-event-data) |
| record | [`player-locale-change-event-data`](#type-player-locale-change-event-data) |
| record | [`player-login-event-data`](#type-player-login-event-data) |
| record | [`player-move-event-data`](#type-player-move-event-data) |
| record | [`player-name-entity-event-data`](#type-player-name-entity-event-data) |
| record | [`player-open-sign-event-data`](#type-player-open-sign-event-data) |
| record | [`player-permission-check-event-data`](#type-player-permission-check-event-data) |
| record | [`player-pickup-arrow-event-data`](#type-player-pickup-arrow-event-data) |
| record | [`player-portal-event-data`](#type-player-portal-event-data) |
| record | [`player-pre-login-event-data`](#type-player-pre-login-event-data) |
| record | [`player-recipe-book-click-event-data`](#type-player-recipe-book-click-event-data) |
| record | [`player-recipe-book-settings-change-event-data`](#type-player-recipe-book-settings-change-event-data) |
| record | [`player-recipe-discover-event-data`](#type-player-recipe-discover-event-data) |
| record | [`player-register-channel-event-data`](#type-player-register-channel-event-data) |
| record | [`player-resource-pack-status-event-data`](#type-player-resource-pack-status-event-data) |
| record | [`player-respawn-event-data`](#type-player-respawn-event-data) |
| record | [`player-riptide-event-data`](#type-player-riptide-event-data) |
| record | [`player-shear-entity-event-data`](#type-player-shear-entity-event-data) |
| record | [`player-show-entity-event-data`](#type-player-show-entity-event-data) |
| record | [`player-spawn-change-event-data`](#type-player-spawn-change-event-data) |
| record | [`player-spawn-location-event-data`](#type-player-spawn-location-event-data) |
| record | [`player-statistic-increment-event-data`](#type-player-statistic-increment-event-data) |
| record | [`player-swap-hands-event-data`](#type-player-swap-hands-event-data) |
| record | [`player-take-lectern-book-event-data`](#type-player-take-lectern-book-event-data) |
| record | [`player-teleport-event-data`](#type-player-teleport-event-data) |
| record | [`player-toggle-flight-event-data`](#type-player-toggle-flight-event-data) |
| record | [`player-toggle-sneak-event-data`](#type-player-toggle-sneak-event-data) |
| record | [`player-toggle-sprint-event-data`](#type-player-toggle-sprint-event-data) |
| record | [`player-unleash-entity-event-data`](#type-player-unleash-entity-event-data) |
| record | [`player-unregister-channel-event-data`](#type-player-unregister-channel-event-data) |
| record | [`player-velocity-event-data`](#type-player-velocity-event-data) |
| record | [`portal-create-event-data`](#type-portal-create-event-data) |
| record | [`potion-splash-event-data`](#type-potion-splash-event-data) |
| record | [`prepare-anvil-event-data`](#type-prepare-anvil-event-data) |
| record | [`prepare-grindstone-event-data`](#type-prepare-grindstone-event-data) |
| record | [`prepare-inventory-result-event-data`](#type-prepare-inventory-result-event-data) |
| record | [`prepare-item-craft-event-data`](#type-prepare-item-craft-event-data) |
| record | [`prepare-item-enchant-event-data`](#type-prepare-item-enchant-event-data) |
| record | [`prepare-smithing-event-data`](#type-prepare-smithing-event-data) |
| record | [`projectile-hit-event-data`](#type-projectile-hit-event-data) |
| record | [`projectile-launch-event-data`](#type-projectile-launch-event-data) |
| record | [`raid-finish-event-data`](#type-raid-finish-event-data) |
| record | [`raid-spawn-wave-event-data`](#type-raid-spawn-wave-event-data) |
| record | [`raid-stop-event-data`](#type-raid-stop-event-data) |
| record | [`raid-trigger-event-data`](#type-raid-trigger-event-data) |
| record | [`sculk-bloom-event-data`](#type-sculk-bloom-event-data) |
| record | [`server-broadcast-event-data`](#type-server-broadcast-event-data) |
| record | [`server-command-event-data`](#type-server-command-event-data) |
| record | [`server-list-ping-address`](#type-server-list-ping-address) |
| record | [`server-list-ping-event-data`](#type-server-list-ping-event-data) |
| record | [`server-load-event-data`](#type-server-load-event-data) |
| enum | [`server-load-type`](#type-server-load-type) |
| record | [`server-tick-end-event-data`](#type-server-tick-end-event-data) |
| record | [`server-tick-start-event-data`](#type-server-tick-start-event-data) |
| variant | [`serverbound-packet`](#type-serverbound-packet) |
| record | [`sheep-dye-wool-event-data`](#type-sheep-dye-wool-event-data) |
| record | [`sheep-regrow-wool-event-data`](#type-sheep-regrow-wool-event-data) |
| record | [`sign-change-event-data`](#type-sign-change-event-data) |
| record | [`slime-split-event-data`](#type-slime-split-event-data) |
| record | [`smith-item-event-data`](#type-smith-item-event-data) |
| record | [`spawn-change-event-data`](#type-spawn-change-event-data) |
| record | [`spawner-spawn-event-data`](#type-spawner-spawn-event-data) |
| record | [`sponge-absorb-event-data`](#type-sponge-absorb-event-data) |
| record | [`strider-temperature-change-event-data`](#type-strider-temperature-change-event-data) |
| record | [`structure-grow-event-data`](#type-structure-grow-event-data) |
| record | [`thunder-change-event-data`](#type-thunder-change-event-data) |
| record | [`time-skip-event-data`](#type-time-skip-event-data) |
| record | [`tnt-prime-event-data`](#type-tnt-prime-event-data) |
| record | [`trade-select-event-data`](#type-trade-select-event-data) |
| record | [`trial-spawner-spawn-event-data`](#type-trial-spawner-spawn-event-data) |
| record | [`vault-display-item-event-data`](#type-vault-display-item-event-data) |
| record | [`vehicle-block-collision-event-data`](#type-vehicle-block-collision-event-data) |
| record | [`vehicle-collision-event-data`](#type-vehicle-collision-event-data) |
| record | [`vehicle-create-event-data`](#type-vehicle-create-event-data) |
| record | [`vehicle-damage-event-data`](#type-vehicle-damage-event-data) |
| record | [`vehicle-destroy-event-data`](#type-vehicle-destroy-event-data) |
| record | [`vehicle-enter-event-data`](#type-vehicle-enter-event-data) |
| record | [`vehicle-entity-collision-event-data`](#type-vehicle-entity-collision-event-data) |
| record | [`vehicle-exit-event-data`](#type-vehicle-exit-event-data) |
| record | [`vehicle-move-event-data`](#type-vehicle-move-event-data) |
| record | [`vehicle-update-event-data`](#type-vehicle-update-event-data) |
| record | [`villager-acquire-trade-event-data`](#type-villager-acquire-trade-event-data) |
| record | [`villager-career-change-event-data`](#type-villager-career-change-event-data) |
| record | [`villager-replenish-trade-event-data`](#type-villager-replenish-trade-event-data) |
| record | [`villager-reputation-change-event-data`](#type-villager-reputation-change-event-data) |
| record | [`warden-anger-change-event-data`](#type-warden-anger-change-event-data) |
| record | [`weather-change-event-data`](#type-weather-change-event-data) |
| record | [`world-init-event-data`](#type-world-init-event-data) |
| record | [`world-load-event-data`](#type-world-load-event-data) |
| record | [`world-save-event-data`](#type-world-save-event-data) |
| record | [`world-unload-event-data`](#type-world-unload-event-data) |

## Type Details

### `serverbound-packet` {#type-serverbound-packet}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `java` | `java-serverbound-packet` |
| `bedrock` | `bedrock-serverbound-packet` |
| `unknown` |  |

### `clientbound-packet` {#type-clientbound-packet}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `java` | `java-clientbound-packet` |
| `bedrock` | `bedrock-clientbound-packet` |
| `unknown` |  |

### `event-priority` {#type-event-priority}

**Enum cases**

| Name |
| --- |
| `highest` |
| `high` |
| `normal` |
| `low` |
| `lowest` |

### `player-join-event-data` {#type-player-join-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `join-message` | `text-component` |
| `cancelled` | `bool` |

### `player-leave-event-data` {#type-player-leave-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `leave-message` | `text-component` |
| `cancelled` | `bool` |

### `player-login-event-data` {#type-player-login-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `kick-message` | `text-component` |
| `cancelled` | `bool` |

### `player-chat-event-data` {#type-player-chat-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `message` | `string` |
| `recipients` | `list<player>` |
| `signature` | `option<list<u8>>` |
| `cancelled` | `bool` |

### `player-command-send-event-data` {#type-player-command-send-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `command` | `string` |
| `cancelled` | `bool` |

### `player-permission-check-event-data` {#type-player-permission-check-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `permission` | `string` |
| `permission-result` | `bool` |

### `player-move-event-data` {#type-player-move-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `from-position` | `position` |
| `to-position` | `position` |
| `cancelled` | `bool` |

### `player-teleport-event-data` {#type-player-teleport-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `from-position` | `position` |
| `to-position` | `position` |
| `cancelled` | `bool` |

### `player-change-world-event-data` {#type-player-change-world-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `previous-world` | `%world` |
| `new-world` | `%world` |
| `position` | `position` |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `cancelled` | `bool` |

### `player-respawn-event-data` {#type-player-respawn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `previous-world` | `%world` |
| `respawned-world` | `%world` |
| `position` | `position` |
| `yaw` | `f32` |
| `pitch` | `f32` |
| `alive` | `bool` |

### `player-exp-change-event-data` {#type-player-exp-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `amount` | `s32` |

### `player-item-held-event-data` {#type-player-item-held-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `previous-slot` | `u8` |
| `new-slot` | `u8` |
| `cancelled` | `bool` |

### `player-changed-main-hand-event-data` {#type-player-changed-main-hand-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `main-hand` | `hand` |

### `player-gamemode-change-event-data` {#type-player-gamemode-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `previous-gamemode` | `game-mode` |
| `new-gamemode` | `game-mode` |
| `cancelled` | `bool` |

### `player-custom-payload-event-data` {#type-player-custom-payload-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `channel` | `string` |
| `data` | `list<u8>` |

### `player-fish-state` {#type-player-fish-state}

**Enum cases**

| Name |
| --- |
| `fishing` |
| `caught-fish` |
| `caught-entity` |
| `in-ground` |
| `failed-attempt` |
| `reel-in` |
| `bite` |

### `player-fish-event-data` {#type-player-fish-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `caught-uuid` | `option<uuid>` |
| `caught-type` | `string` |
| `hook-uuid` | `uuid` |
| `state` | `player-fish-state` |
| `hand` | `hand` |
| `exp-to-drop` | `s32` |
| `cancelled` | `bool` |

### `player-egg-throw-event-data` {#type-player-egg-throw-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `egg-uuid` | `uuid` |
| `hatching` | `bool` |
| `num-hatches` | `u8` |
| `hatching-type` | `string` |
| `cancelled` | `bool` |

### `entity-interaction-action` {#type-entity-interaction-action}

**Enum cases**

| Name |
| --- |
| `interact` |
| `attack` |
| `interact-at` |

### `interact-action` {#type-interact-action}

**Enum cases**

| Name |
| --- |
| `left-click-block` |
| `left-click-air` |
| `right-click-air` |
| `right-click-block` |

### `player-interact-event-data` {#type-player-interact-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `action` | `interact-action` |
| `clicked-pos` | `option<block-pos>` |
| `block` | `string` |
| `cancelled` | `bool` |

### `player-toggle-sneak-event-data` {#type-player-toggle-sneak-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `is-sneaking` | `bool` |
| `cancelled` | `bool` |

### `player-toggle-flight-event-data` {#type-player-toggle-flight-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `is-flying` | `bool` |
| `cancelled` | `bool` |

### `player-toggle-sprint-event-data` {#type-player-toggle-sprint-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `is-sprinting` | `bool` |
| `cancelled` | `bool` |

### `player-interact-unknown-entity-event-data` {#type-player-interact-unknown-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `action` | `entity-interaction-action` |
| `cancelled` | `bool` |

### `inventory-click-event-data` {#type-inventory-click-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `window-type` | `option<screen>` |
| `click-type` | `click-type` |
| `slot` | `s16` |
| `raw-slot` | `s16` |
| `clicked-item` | `option<item-stack>` |
| `cursor` | `option<item-stack>` |
| `hotbar-button` | `s32` |
| `cancelled` | `bool` |

### `inventory-close-event-data` {#type-inventory-close-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `window-type` | `option<screen>` |

### `block-redstone-event-data` {#type-block-redstone-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `state-id` | `u16` |
| `block-pos` | `block-pos` |
| `old-current` | `s32` |
| `new-current` | `s32` |
| `cancelled` | `bool` |

### `block-break-event-data` {#type-block-break-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `option<player>` |
| `block` | `string` |
| `block-pos` | `block-pos` |
| `exp` | `u32` |
| `should-drop` | `bool` |
| `cancelled` | `bool` |

### `block-burn-event-data` {#type-block-burn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `igniting-block` | `string` |
| `block` | `string` |
| `cancelled` | `bool` |

### `block-can-build-event-data` {#type-block-can-build-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-to-build` | `string` |
| `buildable` | `bool` |
| `player` | `player` |
| `block` | `string` |
| `cancelled` | `bool` |

### `block-grow-event-data` {#type-block-grow-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `old-block` | `string` |
| `old-state-id` | `u16` |
| `new-block` | `string` |
| `new-state-id` | `u16` |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `block-place-event-data` {#type-block-place-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-placed` | `string` |
| `block-placed-against` | `string` |
| `block-pos` | `block-pos` |
| `can-build` | `bool` |
| `cancelled` | `bool` |

### `bedrock-form-response-event-data` {#type-bedrock-form-response-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `form-id` | `u32` |
| `response-data` | `option<string>` |

### `dialog-click-action-event-data` {#type-dialog-click-action-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `id` | `string` |
| `payload` | `option<list<u8>>` |
| `cancelled` | `bool` |

### `dialog-show-event-data` {#type-dialog-show-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `dialog` | `dialog` |
| `cancelled` | `bool` |

### `dialog-clear-event-data` {#type-dialog-clear-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `cancelled` | `bool` |

### `server-command-event-data` {#type-server-command-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `command` | `string` |
| `cancelled` | `bool` |

### `server-list-ping-address` {#type-server-list-ping-address}

**Record fields**

| Name | WIT type |
| --- | --- |
| `host` | `string` |
| `port` | `u16` |

### `server-list-ping-event-data` {#type-server-list-ping-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `hostname` | `string` |
| `address` | `server-list-ping-address` |
| `motd` | `text-component` |
| `max-players` | `u32` |
| `num-players` | `u32` |
| `favicon` | `option<string>` |

### `server-load-type` {#type-server-load-type}

**Enum cases**

| Name |
| --- |
| `startup` |
| `reload` |

### `server-load-event-data` {#type-server-load-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `load-type` | `server-load-type` |

### `spawn-change-event-data` {#type-spawn-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `previous-position` | `block-pos` |
| `previous-yaw` | `f32` |
| `previous-pitch` | `f32` |
| `new-position` | `block-pos` |
| `new-yaw` | `f32` |
| `new-pitch` | `f32` |

### `server-broadcast-event-data` {#type-server-broadcast-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `message` | `text-component` |
| `sender` | `text-component` |
| `cancelled` | `bool` |

### `server-tick-start-event-data` {#type-server-tick-start-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `tick` | `s32` |

### `server-tick-end-event-data` {#type-server-tick-end-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `tick` | `s32` |
| `duration-nanos` | `s64` |

### `packet-received-event-data` {#type-packet-received-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `packet` | `serverbound-packet` |
| `packet-id` | `s32` |
| `raw-payload` | `list<u8>` |
| `cancelled` | `bool` |

### `packet-sent-event-data` {#type-packet-sent-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `packet` | `clientbound-packet` |
| `packet-id` | `s32` |
| `raw-payload` | `list<u8>` |
| `cancelled` | `bool` |

### `player-interact-entity-event-data` {#type-player-interact-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `action` | `entity-interaction-action` |
| `sneaking` | `bool` |
| `cancelled` | `bool` |

### `chunk-load-event-data` {#type-chunk-load-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `cancelled` | `bool` |

### `chunk-save-event-data` {#type-chunk-save-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `cancelled` | `bool` |

### `chunk-send-event-data` {#type-chunk-send-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `cancelled` | `bool` |

### `entity-damage-event-data` {#type-entity-damage-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `damage` | `f32` |
| `damage-type` | `damage-type` |
| `cancelled` | `bool` |

### `entity-death-event-data` {#type-entity-death-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `dropped-exp` | `s32` |

### `player-death-event-data` {#type-player-death-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `death-message` | `text-component` |
| `dropped-exp` | `s32` |
| `keep-inventory` | `bool` |
| `cancelled` | `bool` |

### `entity-spawn-event-data` {#type-entity-spawn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `entity-type` | `string` |
| `position` | `position` |
| `target-world` | `%world` |
| `cancelled` | `bool` |

### `entity-combust-event-data` {#type-entity-combust-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `duration-secs` | `f32` |
| `cancelled` | `bool` |

### `entity-regain-health-event-data` {#type-entity-regain-health-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `amount` | `f32` |
| `cancelled` | `bool` |

### `entity-air-change-event-data` {#type-entity-air-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `amount` | `s32` |
| `cancelled` | `bool` |

### `entity-breed-event-data` {#type-entity-breed-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `father-id` | `s32` |
| `mother-id` | `s32` |
| `child-id` | `s32` |
| `cancelled` | `bool` |

### `entity-dismount-event-data` {#type-entity-dismount-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `dismounted-id` | `s32` |
| `cancelled` | `bool` |

### `entity-dye-event-data` {#type-entity-dye-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `color` | `string` |
| `player` | `option<player>` |
| `cancelled` | `bool` |

### `entity-enter-love-mode-event-data` {#type-entity-enter-love-mode-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `human-entity-id` | `option<s32>` |
| `ticks-in-love` | `s32` |
| `cancelled` | `bool` |

### `entity-explode-event-data` {#type-entity-explode-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `position` | `position` |
| `yield-rate` | `f32` |
| `cancelled` | `bool` |

### `entity-mount-event-data` {#type-entity-mount-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `mounted-id` | `s32` |
| `cancelled` | `bool` |

### `entity-pickup-item-event-data` {#type-entity-pickup-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `item-name` | `string` |
| `count` | `u8` |
| `cancelled` | `bool` |

### `entity-portal-event-data` {#type-entity-portal-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `portal-pos` | `block-pos` |
| `cancelled` | `bool` |

### `entity-resurrect-event-data` {#type-entity-resurrect-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `cancelled` | `bool` |

### `entity-shoot-bow-event-data` {#type-entity-shoot-bow-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `weapon-name` | `string` |
| `force` | `f32` |
| `cancelled` | `bool` |

### `entity-tame-event-data` {#type-entity-tame-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `owner` | `player` |
| `cancelled` | `bool` |

### `entity-target-event-data` {#type-entity-target-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `target-id` | `option<s32>` |
| `cancelled` | `bool` |

### `entity-teleport-event-data` {#type-entity-teleport-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `from-position` | `position` |
| `to-position` | `position` |
| `cancelled` | `bool` |

### `entity-toggle-glide-event-data` {#type-entity-toggle-glide-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `is-gliding` | `bool` |
| `cancelled` | `bool` |

### `entity-transform-event-data` {#type-entity-transform-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `new-entity-id` | `s32` |
| `transform-reason` | `string` |
| `cancelled` | `bool` |

### `creature-spawn-event-data` {#type-creature-spawn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `entity-type` | `string` |
| `position` | `position` |
| `target-world` | `%world` |
| `spawn-reason` | `string` |
| `cancelled` | `bool` |

### `ender-dragon-change-phase-event-data` {#type-ender-dragon-change-phase-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `current-phase` | `string` |
| `new-phase` | `string` |
| `cancelled` | `bool` |

### `entity-break-door-event-data` {#type-entity-break-door-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `entity-change-block-event-data` {#type-entity-change-block-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `block-pos` | `block-pos` |
| `new-block` | `string` |
| `cancelled` | `bool` |

### `entity-damage-by-block-event-data` {#type-entity-damage-by-block-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `damager-pos` | `option<block-pos>` |
| `damage` | `f32` |
| `cause` | `string` |
| `cancelled` | `bool` |

### `entity-damage-by-entity-event-data` {#type-entity-damage-by-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `damager-id` | `s32` |
| `damage` | `f32` |
| `cause` | `string` |
| `cancelled` | `bool` |

### `entity-drop-item-event-data` {#type-entity-drop-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `item-name` | `string` |
| `count` | `u8` |
| `cancelled` | `bool` |

### `entity-enter-block-event-data` {#type-entity-enter-block-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `entity-exhaustion-event-data` {#type-entity-exhaustion-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `exhaustion` | `f32` |
| `cancelled` | `bool` |

### `entity-interact-event-data` {#type-entity-interact-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `entity-knockback-event-data` {#type-entity-knockback-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `hit-by-id` | `option<s32>` |
| `knockback` | `position` |
| `cancelled` | `bool` |

### `entity-place-event-data` {#type-entity-place-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `block-pos` | `block-pos` |
| `block-name` | `string` |
| `cancelled` | `bool` |

### `entity-pose-change-event-data` {#type-entity-pose-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `pose` | `string` |
| `cancelled` | `bool` |

### `entity-potion-effect-event-data` {#type-entity-potion-effect-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `effect-name` | `string` |
| `duration` | `s32` |
| `amplifier` | `u8` |
| `cancelled` | `bool` |

### `entity-spell-cast-event-data` {#type-entity-spell-cast-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `spell` | `string` |
| `cancelled` | `bool` |

### `entity-target-living-entity-event-data` {#type-entity-target-living-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `target-id` | `option<s32>` |
| `reason` | `string` |
| `cancelled` | `bool` |

### `entity-toggle-swim-event-data` {#type-entity-toggle-swim-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `is-swimming` | `bool` |
| `cancelled` | `bool` |

### `explosion-prime-event-data` {#type-explosion-prime-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `radius` | `f32` |
| `fire` | `bool` |
| `cancelled` | `bool` |

### `firework-explode-event-data` {#type-firework-explode-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `cancelled` | `bool` |

### `food-level-change-event-data` {#type-food-level-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `food-level` | `u8` |
| `cancelled` | `bool` |

### `item-despawn-event-data` {#type-item-despawn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `cancelled` | `bool` |

### `item-merge-event-data` {#type-item-merge-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `target-id` | `s32` |
| `cancelled` | `bool` |

### `item-spawn-event-data` {#type-item-spawn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `position` | `position` |
| `item-name` | `string` |
| `cancelled` | `bool` |

### `piglin-barter-event-data` {#type-piglin-barter-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `input-item` | `item-stack` |
| `outcome` | `list<item-stack>` |
| `cancelled` | `bool` |

### `projectile-hit-event-data` {#type-projectile-hit-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `hit-position` | `position` |
| `hit-entity-id` | `option<s32>` |
| `cancelled` | `bool` |

### `projectile-launch-event-data` {#type-projectile-launch-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `shooter-id` | `option<s32>` |
| `cancelled` | `bool` |

### `sheep-dye-wool-event-data` {#type-sheep-dye-wool-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `dye-color` | `u8` |
| `player-id` | `option<s32>` |
| `cancelled` | `bool` |

### `sheep-regrow-wool-event-data` {#type-sheep-regrow-wool-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `cancelled` | `bool` |

### `slime-split-event-data` {#type-slime-split-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `count` | `s32` |
| `cancelled` | `bool` |

### `strider-temperature-change-event-data` {#type-strider-temperature-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `is-shivering` | `bool` |
| `cancelled` | `bool` |

### `villager-acquire-trade-event-data` {#type-villager-acquire-trade-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `recipe-index` | `s32` |
| `cancelled` | `bool` |

### `villager-career-change-event-data` {#type-villager-career-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `profession` | `string` |
| `reason` | `string` |
| `cancelled` | `bool` |

### `villager-replenish-trade-event-data` {#type-villager-replenish-trade-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `restock-quantity` | `s32` |
| `cancelled` | `bool` |

### `warden-anger-change-event-data` {#type-warden-anger-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `target-id` | `s32` |
| `old-anger` | `s32` |
| `new-anger` | `s32` |
| `cancelled` | `bool` |

### `area-effect-cloud-apply-event-data` {#type-area-effect-cloud-apply-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `affected-entities` | `list<s32>` |
| `cancelled` | `bool` |

### `arrow-body-count-change-event-data` {#type-arrow-body-count-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `old-amount` | `u32` |
| `new-amount` | `u32` |
| `cancelled` | `bool` |

### `bat-toggle-sleep-event-data` {#type-bat-toggle-sleep-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `is-awake` | `bool` |
| `cancelled` | `bool` |

### `creeper-power-event-data` {#type-creeper-power-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `lightning-id` | `option<s32>` |
| `cause` | `string` |
| `cancelled` | `bool` |

### `entity-combust-by-block-event-data` {#type-entity-combust-by-block-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `combuster` | `block-pos` |
| `duration` | `f32` |
| `cancelled` | `bool` |

### `entity-combust-by-entity-event-data` {#type-entity-combust-by-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `combuster-id` | `s32` |
| `duration` | `f32` |
| `cancelled` | `bool` |

### `entity-knockback-by-entity-event-data` {#type-entity-knockback-by-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `hit-by-id` | `s32` |
| `force` | `f64` |
| `x` | `f64` |
| `z` | `f64` |
| `cancelled` | `bool` |

### `entity-portal-enter-event-data` {#type-entity-portal-enter-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `location` | `block-pos` |
| `cancelled` | `bool` |

### `entity-portal-exit-event-data` {#type-entity-portal-exit-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `from-pos` | `block-pos` |
| `to-pos` | `option<block-pos>` |
| `cancelled` | `bool` |

### `entity-remove-event-data` {#type-entity-remove-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `cause` | `string` |
| `cancelled` | `bool` |

### `entity-target-block-event-data` {#type-entity-target-block-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `entity-unleash-event-data` {#type-entity-unleash-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `reason` | `string` |
| `cancelled` | `bool` |

### `exp-bottle-event-data` {#type-exp-bottle-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `experience` | `s32` |
| `location` | `block-pos` |
| `show-effect` | `bool` |
| `cancelled` | `bool` |

### `horse-jump-event-data` {#type-horse-jump-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `power` | `f32` |
| `cancelled` | `bool` |

### `lingering-potion-splash-event-data` {#type-lingering-potion-splash-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `location` | `block-pos` |
| `potion-item` | `string` |
| `cancelled` | `bool` |

### `pig-zap-event-data` {#type-pig-zap-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `lightning-id` | `s32` |
| `pig-zombie-id` | `s32` |
| `cancelled` | `bool` |

### `pig-zombie-anger-event-data` {#type-pig-zombie-anger-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `target-id` | `option<s32>` |
| `new-anger` | `s32` |
| `cancelled` | `bool` |

### `potion-splash-event-data` {#type-potion-splash-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `location` | `block-pos` |
| `potion-item` | `string` |
| `affected-entities` | `list<s32>` |
| `cancelled` | `bool` |

### `spawner-spawn-event-data` {#type-spawner-spawn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `spawner-pos` | `block-pos` |
| `cancelled` | `bool` |

### `trial-spawner-spawn-event-data` {#type-trial-spawner-spawn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `spawner-pos` | `block-pos` |
| `cancelled` | `bool` |

### `villager-reputation-change-event-data` {#type-villager-reputation-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `target-id` | `s32` |
| `reputation-change` | `s32` |
| `cancelled` | `bool` |

### `player-item-consume-event-data` {#type-player-item-consume-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `item-name` | `string` |
| `cancelled` | `bool` |

### `player-item-damage-event-data` {#type-player-item-damage-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `item-name` | `string` |
| `damage` | `s32` |
| `cancelled` | `bool` |

### `player-drop-item-event-data` {#type-player-drop-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `item-name` | `string` |
| `count` | `u8` |
| `cancelled` | `bool` |

### `player-bed-enter-event-data` {#type-player-bed-enter-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `bed-pos` | `block-pos` |
| `cancelled` | `bool` |

### `player-bed-leave-event-data` {#type-player-bed-leave-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `bed-pos` | `block-pos` |

### `player-bucket-empty-event-data` {#type-player-bucket-empty-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `bucket` | `string` |
| `cancelled` | `bool` |

### `player-bucket-fill-event-data` {#type-player-bucket-fill-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `bucket` | `string` |
| `cancelled` | `bool` |

### `async-player-chat-event-data` {#type-async-player-chat-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `message` | `string` |
| `format` | `text-component` |
| `cancelled` | `bool` |

### `async-player-pre-login-event-data` {#type-async-player-pre-login-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-name` | `string` |
| `player-uuid` | `string` |
| `ip-address` | `string` |
| `kick-message` | `text-component` |
| `cancelled` | `bool` |

### `player-advancement-done-event-data` {#type-player-advancement-done-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `advancement-id` | `string` |
| `cancelled` | `bool` |

### `player-animation-event-data` {#type-player-animation-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `animation-type` | `string` |
| `cancelled` | `bool` |

### `player-armor-stand-manipulate-event-data` {#type-player-armor-stand-manipulate-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `armor-stand-id` | `s32` |
| `slot` | `u8` |
| `cancelled` | `bool` |

### `player-bucket-entity-event-data` {#type-player-bucket-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `bucket-item` | `string` |
| `cancelled` | `bool` |

### `player-changed-world-event-data` {#type-player-changed-world-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `from-world` | `%world` |
| `to-world` | `%world` |
| `cancelled` | `bool` |

### `player-channel-event-data` {#type-player-channel-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `channel` | `string` |
| `cancelled` | `bool` |

### `player-command-preprocess-event-data` {#type-player-command-preprocess-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `command` | `string` |
| `cancelled` | `bool` |

### `player-edit-book-event-data` {#type-player-edit-book-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `slot` | `u32` |
| `pages` | `list<string>` |
| `title` | `option<string>` |
| `signing` | `bool` |
| `cancelled` | `bool` |

### `player-elytra-boost-event-data` {#type-player-elytra-boost-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `firework-id` | `s32` |
| `cancelled` | `bool` |

### `player-exp-cooldown-change-event-data` {#type-player-exp-cooldown-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `new-cooldown` | `s32` |
| `cancelled` | `bool` |

### `player-harvest-block-event-data` {#type-player-harvest-block-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `harvested-items` | `list<item-stack>` |
| `cancelled` | `bool` |

### `player-hide-entity-event-data` {#type-player-hide-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `cancelled` | `bool` |

### `player-item-break-event-data` {#type-player-item-break-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `item-name` | `string` |

### `player-item-mend-event-data` {#type-player-item-mend-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `item-name` | `string` |
| `repair-amount` | `s32` |
| `exp-consumed` | `s32` |
| `cancelled` | `bool` |

### `player-kick-event-data` {#type-player-kick-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `reason` | `string` |
| `cancelled` | `bool` |

### `player-leash-entity-event-data` {#type-player-leash-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `holder-id` | `s32` |
| `cancelled` | `bool` |

### `player-level-change-event-data` {#type-player-level-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `old-level` | `s32` |
| `new-level` | `s32` |

### `player-locale-change-event-data` {#type-player-locale-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `new-locale` | `string` |
| `cancelled` | `bool` |

### `player-name-entity-event-data` {#type-player-name-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `name` | `text-component` |
| `cancelled` | `bool` |

### `player-open-sign-event-data` {#type-player-open-sign-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `is-front` | `bool` |
| `cancelled` | `bool` |

### `player-portal-event-data` {#type-player-portal-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `from-pos` | `block-pos` |
| `to-pos` | `option<block-pos>` |
| `cancelled` | `bool` |

### `player-pre-login-event-data` {#type-player-pre-login-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player-name` | `string` |
| `player-uuid` | `string` |
| `ip-address` | `string` |
| `kick-message` | `text-component` |
| `cancelled` | `bool` |

### `player-riptide-event-data` {#type-player-riptide-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `item-name` | `string` |
| `cancelled` | `bool` |

### `player-shear-entity-event-data` {#type-player-shear-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `hand` | `u8` |
| `cancelled` | `bool` |

### `player-show-entity-event-data` {#type-player-show-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `cancelled` | `bool` |

### `player-spawn-change-event-data` {#type-player-spawn-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `new-spawn` | `option<block-pos>` |
| `forced` | `bool` |
| `cancelled` | `bool` |

### `player-statistic-increment-event-data` {#type-player-statistic-increment-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `statistic-id` | `string` |
| `amount` | `s32` |
| `cancelled` | `bool` |

### `player-swap-hands-event-data` {#type-player-swap-hands-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `cancelled` | `bool` |

### `player-take-lectern-book-event-data` {#type-player-take-lectern-book-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `book` | `item-stack` |
| `cancelled` | `bool` |

### `player-unleash-entity-event-data` {#type-player-unleash-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `cancelled` | `bool` |

### `player-velocity-event-data` {#type-player-velocity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `velocity` | `position` |
| `cancelled` | `bool` |

### `player-input-event-data` {#type-player-input-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `input` | `string` |
| `cancelled` | `bool` |

### `player-interact-at-entity-event-data` {#type-player-interact-at-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `entity-id` | `s32` |
| `clicked-x` | `f64` |
| `clicked-y` | `f64` |
| `clicked-z` | `f64` |
| `hand` | `u8` |
| `cancelled` | `bool` |

### `player-links-send-event-data` {#type-player-links-send-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `links` | `list<string>` |
| `cancelled` | `bool` |

### `player-pickup-arrow-event-data` {#type-player-pickup-arrow-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `arrow-id` | `s32` |
| `cancelled` | `bool` |

### `player-recipe-book-click-event-data` {#type-player-recipe-book-click-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `recipe-id` | `string` |
| `make-all` | `bool` |
| `cancelled` | `bool` |

### `player-recipe-book-settings-change-event-data` {#type-player-recipe-book-settings-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `book-type` | `string` |
| `is-open` | `bool` |
| `is-filtering` | `bool` |
| `cancelled` | `bool` |

### `player-recipe-discover-event-data` {#type-player-recipe-discover-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `recipe-id` | `string` |
| `cancelled` | `bool` |

### `player-register-channel-event-data` {#type-player-register-channel-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `channel` | `string` |
| `cancelled` | `bool` |

### `player-resource-pack-status-event-data` {#type-player-resource-pack-status-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `pack-id` | `string` |
| `status` | `string` |
| `cancelled` | `bool` |

### `player-spawn-location-event-data` {#type-player-spawn-location-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `spawn-pos` | `position` |
| `cancelled` | `bool` |

### `player-unregister-channel-event-data` {#type-player-unregister-channel-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `channel` | `string` |
| `cancelled` | `bool` |

### `raid-finish-event-data` {#type-raid-finish-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `victory` | `bool` |
| `cancelled` | `bool` |

### `raid-spawn-wave-event-data` {#type-raid-spawn-wave-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `wave` | `u32` |
| `pos` | `block-pos` |
| `cancelled` | `bool` |

### `raid-stop-event-data` {#type-raid-stop-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `reason` | `string` |
| `cancelled` | `bool` |

### `raid-trigger-event-data` {#type-raid-trigger-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `cancelled` | `bool` |

### `block-damage-event-data` {#type-block-damage-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `insta-break` | `bool` |
| `cancelled` | `bool` |

### `block-ignite-event-data` {#type-block-ignite-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `block-from-to-event-data` {#type-block-from-to-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `from-pos` | `block-pos` |
| `to-pos` | `block-pos` |
| `cancelled` | `bool` |

### `block-form-event-data` {#type-block-form-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `block-fade-event-data` {#type-block-fade-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `block-dispense-event-data` {#type-block-dispense-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `item-name` | `string` |
| `cancelled` | `bool` |

### `block-explode-event-data` {#type-block-explode-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `yield-rate` | `f32` |
| `cancelled` | `bool` |

### `block-physics-event-data` {#type-block-physics-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `changed-pos` | `block-pos` |
| `cancelled` | `bool` |

### `block-piston-extend-event-data` {#type-block-piston-extend-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `direction` | `string` |
| `cancelled` | `bool` |

### `block-piston-retract-event-data` {#type-block-piston-retract-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `direction` | `string` |
| `cancelled` | `bool` |

### `note-play-event-data` {#type-note-play-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `instrument` | `string` |
| `note` | `u8` |
| `cancelled` | `bool` |

### `sign-change-event-data` {#type-sign-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `lines` | `list<string>` |
| `cancelled` | `bool` |

### `sponge-absorb-event-data` {#type-sponge-absorb-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `tnt-prime-event-data` {#type-tnt-prime-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `prime-reason` | `string` |
| `cancelled` | `bool` |

### `map-initialize-event-data` {#type-map-initialize-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `map-id` | `s32` |

### `hanging-break-event-data` {#type-hanging-break-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `remover-entity-id` | `option<s32>` |
| `cancelled` | `bool` |

### `hanging-break-by-entity-event-data` {#type-hanging-break-by-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `remover-entity-id` | `s32` |
| `cancelled` | `bool` |

### `hanging-place-event-data` {#type-hanging-place-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `player` | `option<player>` |
| `block-pos` | `block-pos` |
| `block-face` | `string` |
| `cancelled` | `bool` |

### `bell-resonate-event-data` {#type-bell-resonate-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `cancelled` | `bool` |

### `bell-ring-event-data` {#type-bell-ring-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `entity-id` | `option<s32>` |
| `direction` | `option<string>` |
| `cancelled` | `bool` |

### `block-brush-event-data` {#type-block-brush-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `player` | `player` |
| `item` | `item-stack` |
| `cancelled` | `bool` |

### `block-cook-event-data` {#type-block-cook-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `source` | `item-stack` |
| `%result` | `item-stack` |
| `cancelled` | `bool` |

### `block-damage-abort-event-data` {#type-block-damage-abort-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `item-in-hand` | `item-stack` |

### `block-dispense-armor-event-data` {#type-block-dispense-armor-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `target-entity-id` | `s32` |
| `item` | `item-stack` |
| `cancelled` | `bool` |

### `block-dispense-loot-event-data` {#type-block-dispense-loot-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `items` | `list<item-stack>` |
| `cancelled` | `bool` |

### `block-drop-item-event-data` {#type-block-drop-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `player` | `option<player>` |
| `items` | `list<item-stack>` |
| `cancelled` | `bool` |

### `block-exp-event-data` {#type-block-exp-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `exp` | `s32` |

### `block-fertilize-event-data` {#type-block-fertilize-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `player` | `option<player>` |
| `changed-blocks` | `list<tuple<block-pos, u16>>` |
| `cancelled` | `bool` |

### `block-multi-place-event-data` {#type-block-multi-place-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `target-world` | `%world` |
| `placed-blocks` | `list<tuple<block-pos, u16>>` |
| `cancelled` | `bool` |

### `block-receive-game-event-data` {#type-block-receive-game-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `game-event` | `string` |
| `source-entity-id` | `option<s32>` |
| `cancelled` | `bool` |

### `block-shear-entity-event-data` {#type-block-shear-entity-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `target-entity-id` | `s32` |
| `item` | `item-stack` |
| `cancelled` | `bool` |

### `block-spread-event-data` {#type-block-spread-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `source-pos` | `block-pos` |
| `target-pos` | `block-pos` |
| `target-world` | `%world` |
| `new-state-id` | `u16` |
| `cancelled` | `bool` |

### `brewing-start-event-data` {#type-brewing-start-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `brewing-time` | `s32` |
| `cancelled` | `bool` |

### `campfire-start-event-data` {#type-campfire-start-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `item` | `item-stack` |
| `slot` | `u8` |
| `cooking-time` | `s32` |
| `cancelled` | `bool` |

### `cauldron-level-change-event-data` {#type-cauldron-level-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `old-level` | `s32` |
| `new-level` | `s32` |
| `reason` | `string` |
| `entity-id` | `option<s32>` |
| `cancelled` | `bool` |

### `crafter-craft-event-data` {#type-crafter-craft-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `%result` | `item-stack` |
| `cancelled` | `bool` |

### `entity-block-form-event-data` {#type-entity-block-form-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `entity-id` | `s32` |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `new-state-id` | `u16` |
| `cancelled` | `bool` |

### `fluid-level-change-event-data` {#type-fluid-level-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `new-state-id` | `u16` |
| `cancelled` | `bool` |

### `inventory-block-start-event-data` {#type-inventory-block-start-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |

### `leaves-decay-event-data` {#type-leaves-decay-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `cancelled` | `bool` |

### `moisture-change-event-data` {#type-moisture-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `new-moisture` | `s32` |
| `cancelled` | `bool` |

### `sculk-bloom-event-data` {#type-sculk-bloom-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `charge` | `s32` |
| `cancelled` | `bool` |

### `vault-display-item-event-data` {#type-vault-display-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `target-world` | `%world` |
| `item` | `item-stack` |
| `cancelled` | `bool` |

### `weather-change-event-data` {#type-weather-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `to-weather-state` | `bool` |
| `cancelled` | `bool` |

### `thunder-change-event-data` {#type-thunder-change-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `to-thunder-state` | `bool` |
| `cancelled` | `bool` |

### `world-load-event-data` {#type-world-load-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |

### `world-unload-event-data` {#type-world-unload-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |
| `cancelled` | `bool` |

### `async-structure-generate-event-data` {#type-async-structure-generate-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `world-name` | `string` |
| `structure-name` | `string` |
| `pos` | `block-pos` |
| `cancelled` | `bool` |

### `async-structure-spawn-event-data` {#type-async-structure-spawn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `world-name` | `string` |
| `structure-name` | `string` |
| `pos` | `block-pos` |
| `cancelled` | `bool` |

### `chunk-populate-event-data` {#type-chunk-populate-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `cancelled` | `bool` |

### `chunk-unload-event-data` {#type-chunk-unload-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `cancelled` | `bool` |

### `entities-load-event-data` {#type-entities-load-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `entity-count` | `u32` |
| `cancelled` | `bool` |

### `entities-unload-event-data` {#type-entities-unload-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `chunk-x` | `s32` |
| `chunk-z` | `s32` |
| `entity-count` | `u32` |
| `cancelled` | `bool` |

### `generic-game-event-data` {#type-generic-game-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `event-id` | `string` |
| `pos` | `position` |
| `cancelled` | `bool` |

### `loot-generate-event-data` {#type-loot-generate-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `loot-table` | `string` |
| `cancelled` | `bool` |

### `portal-create-event-data` {#type-portal-create-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `portal-type` | `string` |
| `cancelled` | `bool` |

### `structure-grow-event-data` {#type-structure-grow-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `pos` | `block-pos` |
| `species` | `string` |
| `bone-meal` | `bool` |
| `cancelled` | `bool` |

### `time-skip-event-data` {#type-time-skip-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `skip-amount` | `s64` |
| `cancelled` | `bool` |

### `world-init-event-data` {#type-world-init-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `target-world` | `%world` |

### `world-save-event-data` {#type-world-save-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `world-name` | `string` |
| `cancelled` | `bool` |

### `inventory-open-event-data` {#type-inventory-open-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `cancelled` | `bool` |

### `inventory-drag-event-data` {#type-inventory-drag-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `cancelled` | `bool` |

### `craft-item-event-data` {#type-craft-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `recipe-id` | `string` |
| `cancelled` | `bool` |

### `furnace-smelt-event-data` {#type-furnace-smelt-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `source-item` | `string` |
| `result-item` | `string` |
| `cancelled` | `bool` |

### `brew-event-data` {#type-brew-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `fuel-level` | `u8` |
| `cancelled` | `bool` |

### `brewing-stand-fuel-event-data` {#type-brewing-stand-fuel-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `fuel-power` | `u16` |
| `cancelled` | `bool` |

### `furnace-burn-event-data` {#type-furnace-burn-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `fuel-item` | `string` |
| `burn-time` | `u32` |
| `cancelled` | `bool` |

### `furnace-extract-event-data` {#type-furnace-extract-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `block-pos` | `block-pos` |
| `item-id` | `string` |
| `item-amount` | `u32` |
| `exp-gained` | `f32` |

### `furnace-start-smelt-event-data` {#type-furnace-start-smelt-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `source-item` | `string` |
| `cooking-time` | `u32` |
| `cancelled` | `bool` |

### `hopper-inventory-search-event-data` {#type-hopper-inventory-search-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `search-pos` | `block-pos` |
| `cancelled` | `bool` |

### `inventory-creative-event-data` {#type-inventory-creative-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `slot` | `s16` |
| `item-id` | `string` |
| `item-count` | `u8` |
| `cancelled` | `bool` |

### `inventory-interact-event-data` {#type-inventory-interact-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `cancelled` | `bool` |

### `inventory-move-item-event-data` {#type-inventory-move-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `source-pos` | `block-pos` |
| `target-pos` | `block-pos` |
| `item-id` | `string` |
| `item-amount` | `u32` |
| `cancelled` | `bool` |

### `inventory-pickup-item-event-data` {#type-inventory-pickup-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `block-pos` | `block-pos` |
| `item-entity-id` | `s32` |
| `item-id` | `string` |
| `cancelled` | `bool` |

### `prepare-anvil-event-data` {#type-prepare-anvil-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `rename-text` | `string` |
| `repair-cost` | `u32` |

### `prepare-grindstone-event-data` {#type-prepare-grindstone-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `result-item` | `option<string>` |

### `prepare-inventory-result-event-data` {#type-prepare-inventory-result-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `result-item` | `option<string>` |

### `prepare-item-craft-event-data` {#type-prepare-item-craft-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `recipe-id` | `string` |
| `cancelled` | `bool` |

### `prepare-smithing-event-data` {#type-prepare-smithing-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `result-item` | `option<string>` |

### `smith-item-event-data` {#type-smith-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `recipe-id` | `string` |
| `cancelled` | `bool` |

### `trade-select-event-data` {#type-trade-select-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `slot-index` | `u8` |
| `cancelled` | `bool` |

### `vehicle-block-collision-event-data` {#type-vehicle-block-collision-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `block-pos` | `block-pos` |
| `cancelled` | `bool` |

### `vehicle-collision-event-data` {#type-vehicle-collision-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `cancelled` | `bool` |

### `vehicle-create-event-data` {#type-vehicle-create-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `cancelled` | `bool` |

### `vehicle-damage-event-data` {#type-vehicle-damage-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `damage` | `f32` |
| `attacker-id` | `option<s32>` |
| `cancelled` | `bool` |

### `vehicle-destroy-event-data` {#type-vehicle-destroy-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `attacker-id` | `option<s32>` |
| `cancelled` | `bool` |

### `vehicle-enter-event-data` {#type-vehicle-enter-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `entered-id` | `s32` |
| `cancelled` | `bool` |

### `vehicle-entity-collision-event-data` {#type-vehicle-entity-collision-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `collided-entity-id` | `s32` |
| `cancelled` | `bool` |

### `vehicle-exit-event-data` {#type-vehicle-exit-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `exited-id` | `s32` |
| `cancelled` | `bool` |

### `vehicle-move-event-data` {#type-vehicle-move-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `from-position` | `position` |
| `to-position` | `position` |
| `cancelled` | `bool` |

### `vehicle-update-event-data` {#type-vehicle-update-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `vehicle-id` | `s32` |
| `cancelled` | `bool` |

### `enchantment-offer` {#type-enchantment-offer}

**Record fields**

| Name | WIT type |
| --- | --- |
| `cost` | `s32` |
| `enchantment-id` | `s32` |
| `enchantment-level` | `s32` |

### `prepare-item-enchant-event-data` {#type-prepare-item-enchant-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `item` | `item-stack` |
| `offers` | `list<enchantment-offer>` |
| `bookshelf-count` | `s32` |
| `cancelled` | `bool` |

### `enchantment-value` {#type-enchantment-value}

**Record fields**

| Name | WIT type |
| --- | --- |
| `enchantment` | `enchantment` |
| `level` | `u32` |

### `enchant-item-event-data` {#type-enchant-item-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `player` | `player` |
| `item` | `item-stack` |
| `%option` | `s32` |
| `cost` | `s32` |
| `enchantments-to-add` | `list<enchantment-value>` |
| `cancelled` | `bool` |

### `lightning-strike-event-data` {#type-lightning-strike-event-data}

**Record fields**

| Name | WIT type |
| --- | --- |
| `position` | `position` |
| `is-effect` | `bool` |
| `cancelled` | `bool` |

### `event-type` {#type-event-type}

**Enum cases**

| Name |
| --- |
| `player-join-event` |
| `player-leave-event` |
| `player-login-event` |
| `player-chat-event` |
| `player-command-send-event` |
| `player-permission-check-event` |
| `player-move-event` |
| `player-teleport-event` |
| `player-change-world-event` |
| `player-respawn-event` |
| `player-exp-change-event` |
| `player-item-held-event` |
| `player-changed-main-hand-event` |
| `player-gamemode-change-event` |
| `player-custom-payload-event` |
| `player-fish-event` |
| `player-egg-throw-event` |
| `player-interact-unknown-entity-event` |
| `player-interact-entity-event` |
| `player-interact-event` |
| `player-toggle-sneak-event` |
| `player-toggle-flight-event` |
| `player-toggle-sprint-event` |
| `inventory-click-event` |
| `inventory-close-event` |
| `block-redstone-event` |
| `block-break-event` |
| `block-burn-event` |
| `block-can-build-event` |
| `block-grow-event` |
| `block-place-event` |
| `bedrock-form-response-event` |
| `dialog-click-action-event` |
| `dialog-show-event` |
| `dialog-clear-event` |
| `server-command-event` |
| `server-list-ping-event` |
| `server-load-event` |
| `spawn-change-event` |
| `server-broadcast-event` |
| `server-tick-start-event` |
| `server-tick-end-event` |
| `packet-received-event` |
| `packet-sent-event` |
| `chunk-load-event` |
| `chunk-save-event` |
| `chunk-send-event` |
| `entity-damage-event` |
| `entity-death-event` |
| `player-death-event` |
| `entity-spawn-event` |
| `entity-combust-event` |
| `entity-regain-health-event` |
| `entity-air-change-event` |
| `entity-breed-event` |
| `entity-dismount-event` |
| `entity-dye-event` |
| `entity-enter-love-mode-event` |
| `entity-explode-event` |
| `entity-mount-event` |
| `entity-pickup-item-event` |
| `entity-portal-event` |
| `entity-resurrect-event` |
| `entity-shoot-bow-event` |
| `entity-tame-event` |
| `entity-target-event` |
| `entity-teleport-event` |
| `entity-toggle-glide-event` |
| `entity-transform-event` |
| `player-item-consume-event` |
| `player-item-damage-event` |
| `player-drop-item-event` |
| `player-bed-enter-event` |
| `player-bed-leave-event` |
| `player-bucket-empty-event` |
| `player-bucket-fill-event` |
| `block-damage-event` |
| `block-ignite-event` |
| `block-from-to-event` |
| `block-form-event` |
| `block-fade-event` |
| `block-dispense-event` |
| `block-explode-event` |
| `block-physics-event` |
| `block-piston-extend-event` |
| `block-piston-retract-event` |
| `note-play-event` |
| `sign-change-event` |
| `sponge-absorb-event` |
| `tnt-prime-event` |
| `weather-change-event` |
| `thunder-change-event` |
| `world-load-event` |
| `world-unload-event` |
| `async-structure-generate-event` |
| `async-structure-spawn-event` |
| `chunk-populate-event` |
| `chunk-unload-event` |
| `entities-load-event` |
| `entities-unload-event` |
| `generic-game-event` |
| `loot-generate-event` |
| `portal-create-event` |
| `structure-grow-event` |
| `time-skip-event` |
| `world-init-event` |
| `world-save-event` |
| `inventory-open-event` |
| `inventory-drag-event` |
| `craft-item-event` |
| `furnace-smelt-event` |
| `brew-event` |
| `brewing-stand-fuel-event` |
| `furnace-burn-event` |
| `furnace-extract-event` |
| `furnace-start-smelt-event` |
| `hopper-inventory-search-event` |
| `inventory-creative-event` |
| `inventory-interact-event` |
| `inventory-move-item-event` |
| `inventory-pickup-item-event` |
| `prepare-anvil-event` |
| `prepare-grindstone-event` |
| `prepare-inventory-result-event` |
| `prepare-item-craft-event` |
| `prepare-smithing-event` |
| `smith-item-event` |
| `trade-select-event` |
| `vehicle-block-collision-event` |
| `vehicle-collision-event` |
| `vehicle-create-event` |
| `vehicle-damage-event` |
| `vehicle-destroy-event` |
| `vehicle-enter-event` |
| `vehicle-entity-collision-event` |
| `vehicle-exit-event` |
| `vehicle-move-event` |
| `vehicle-update-event` |
| `prepare-item-enchant-event` |
| `enchant-item-event` |
| `map-initialize-event` |
| `hanging-break-event` |
| `hanging-break-by-entity-event` |
| `hanging-place-event` |
| `bell-resonate-event` |
| `bell-ring-event` |
| `block-brush-event` |
| `block-cook-event` |
| `block-damage-abort-event` |
| `block-dispense-armor-event` |
| `block-dispense-loot-event` |
| `block-drop-item-event` |
| `block-exp-event` |
| `block-fertilize-event` |
| `block-multi-place-event` |
| `block-receive-game-event` |
| `block-shear-entity-event` |
| `block-spread-event` |
| `brewing-start-event` |
| `campfire-start-event` |
| `cauldron-level-change-event` |
| `crafter-craft-event` |
| `entity-block-form-event` |
| `fluid-level-change-event` |
| `inventory-block-start-event` |
| `leaves-decay-event` |
| `moisture-change-event` |
| `sculk-bloom-event` |
| `vault-display-item-event` |
| `creature-spawn-event` |
| `ender-dragon-change-phase-event` |
| `entity-break-door-event` |
| `entity-change-block-event` |
| `entity-damage-by-block-event` |
| `entity-damage-by-entity-event` |
| `entity-drop-item-event` |
| `entity-enter-block-event` |
| `entity-exhaustion-event` |
| `entity-interact-event` |
| `entity-knockback-event` |
| `entity-place-event` |
| `entity-pose-change-event` |
| `entity-potion-effect-event` |
| `entity-spell-cast-event` |
| `entity-target-living-entity-event` |
| `entity-toggle-swim-event` |
| `explosion-prime-event` |
| `firework-explode-event` |
| `food-level-change-event` |
| `item-despawn-event` |
| `item-merge-event` |
| `item-spawn-event` |
| `piglin-barter-event` |
| `projectile-hit-event` |
| `projectile-launch-event` |
| `sheep-dye-wool-event` |
| `sheep-regrow-wool-event` |
| `slime-split-event` |
| `strider-temperature-change-event` |
| `villager-acquire-trade-event` |
| `villager-career-change-event` |
| `villager-replenish-trade-event` |
| `warden-anger-change-event` |
| `area-effect-cloud-apply-event` |
| `arrow-body-count-change-event` |
| `bat-toggle-sleep-event` |
| `creeper-power-event` |
| `entity-combust-by-block-event` |
| `entity-combust-by-entity-event` |
| `entity-knockback-by-entity-event` |
| `entity-portal-enter-event` |
| `entity-portal-exit-event` |
| `entity-remove-event` |
| `entity-target-block-event` |
| `entity-unleash-event` |
| `exp-bottle-event` |
| `horse-jump-event` |
| `lingering-potion-splash-event` |
| `pig-zap-event` |
| `pig-zombie-anger-event` |
| `potion-splash-event` |
| `spawner-spawn-event` |
| `trial-spawner-spawn-event` |
| `villager-reputation-change-event` |
| `async-player-chat-event` |
| `async-player-pre-login-event` |
| `player-advancement-done-event` |
| `player-animation-event` |
| `player-armor-stand-manipulate-event` |
| `player-bucket-entity-event` |
| `player-changed-world-event` |
| `player-channel-event` |
| `player-command-preprocess-event` |
| `player-edit-book-event` |
| `player-elytra-boost-event` |
| `player-exp-cooldown-change-event` |
| `player-harvest-block-event` |
| `player-hide-entity-event` |
| `player-item-break-event` |
| `player-item-mend-event` |
| `player-kick-event` |
| `player-leash-entity-event` |
| `player-level-change-event` |
| `player-locale-change-event` |
| `player-name-entity-event` |
| `player-open-sign-event` |
| `player-portal-event` |
| `player-pre-login-event` |
| `player-riptide-event` |
| `player-shear-entity-event` |
| `player-show-entity-event` |
| `player-spawn-change-event` |
| `player-statistic-increment-event` |
| `player-swap-hands-event` |
| `player-take-lectern-book-event` |
| `player-unleash-entity-event` |
| `player-velocity-event` |
| `player-input-event` |
| `player-interact-at-entity-event` |
| `player-links-send-event` |
| `player-pickup-arrow-event` |
| `player-recipe-book-click-event` |
| `player-recipe-book-settings-change-event` |
| `player-recipe-discover-event` |
| `player-register-channel-event` |
| `player-resource-pack-status-event` |
| `player-spawn-location-event` |
| `player-unregister-channel-event` |
| `raid-finish-event` |
| `raid-spawn-wave-event` |
| `raid-stop-event` |
| `raid-trigger-event` |
| `lightning-strike-event` |

### `event` {#type-event}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `player-join-event` | `player-join-event-data` |
| `player-leave-event` | `player-leave-event-data` |
| `player-login-event` | `player-login-event-data` |
| `player-chat-event` | `player-chat-event-data` |
| `player-command-send-event` | `player-command-send-event-data` |
| `player-permission-check-event` | `player-permission-check-event-data` |
| `player-move-event` | `player-move-event-data` |
| `player-teleport-event` | `player-teleport-event-data` |
| `player-change-world-event` | `player-change-world-event-data` |
| `player-respawn-event` | `player-respawn-event-data` |
| `player-exp-change-event` | `player-exp-change-event-data` |
| `player-item-held-event` | `player-item-held-event-data` |
| `player-changed-main-hand-event` | `player-changed-main-hand-event-data` |
| `player-gamemode-change-event` | `player-gamemode-change-event-data` |
| `player-custom-payload-event` | `player-custom-payload-event-data` |
| `player-fish-event` | `player-fish-event-data` |
| `player-egg-throw-event` | `player-egg-throw-event-data` |
| `player-interact-unknown-entity-event` | `player-interact-unknown-entity-event-data` |
| `player-interact-entity-event` | `player-interact-entity-event-data` |
| `player-interact-event` | `player-interact-event-data` |
| `player-toggle-sneak-event` | `player-toggle-sneak-event-data` |
| `player-toggle-flight-event` | `player-toggle-flight-event-data` |
| `player-toggle-sprint-event` | `player-toggle-sprint-event-data` |
| `inventory-click-event` | `inventory-click-event-data` |
| `inventory-close-event` | `inventory-close-event-data` |
| `block-redstone-event` | `block-redstone-event-data` |
| `block-break-event` | `block-break-event-data` |
| `block-burn-event` | `block-burn-event-data` |
| `block-can-build-event` | `block-can-build-event-data` |
| `block-grow-event` | `block-grow-event-data` |
| `block-place-event` | `block-place-event-data` |
| `dialog-click-action-event` | `dialog-click-action-event-data` |
| `dialog-show-event` | `dialog-show-event-data` |
| `dialog-clear-event` | `dialog-clear-event-data` |
| `bedrock-form-response-event` | `bedrock-form-response-event-data` |
| `server-command-event` | `server-command-event-data` |
| `server-list-ping-event` | `server-list-ping-event-data` |
| `server-load-event` | `server-load-event-data` |
| `spawn-change-event` | `spawn-change-event-data` |
| `server-broadcast-event` | `server-broadcast-event-data` |
| `server-tick-start-event` | `server-tick-start-event-data` |
| `server-tick-end-event` | `server-tick-end-event-data` |
| `packet-received-event` | `packet-received-event-data` |
| `packet-sent-event` | `packet-sent-event-data` |
| `chunk-load-event` | `chunk-load-event-data` |
| `chunk-save-event` | `chunk-save-event-data` |
| `chunk-send-event` | `chunk-send-event-data` |
| `entity-damage-event` | `entity-damage-event-data` |
| `entity-death-event` | `entity-death-event-data` |
| `player-death-event` | `player-death-event-data` |
| `entity-spawn-event` | `entity-spawn-event-data` |
| `entity-combust-event` | `entity-combust-event-data` |
| `entity-regain-health-event` | `entity-regain-health-event-data` |
| `entity-air-change-event` | `entity-air-change-event-data` |
| `entity-breed-event` | `entity-breed-event-data` |
| `entity-dismount-event` | `entity-dismount-event-data` |
| `entity-dye-event` | `entity-dye-event-data` |
| `entity-enter-love-mode-event` | `entity-enter-love-mode-event-data` |
| `entity-explode-event` | `entity-explode-event-data` |
| `entity-mount-event` | `entity-mount-event-data` |
| `entity-pickup-item-event` | `entity-pickup-item-event-data` |
| `entity-portal-event` | `entity-portal-event-data` |
| `entity-resurrect-event` | `entity-resurrect-event-data` |
| `entity-shoot-bow-event` | `entity-shoot-bow-event-data` |
| `entity-tame-event` | `entity-tame-event-data` |
| `entity-target-event` | `entity-target-event-data` |
| `entity-teleport-event` | `entity-teleport-event-data` |
| `entity-toggle-glide-event` | `entity-toggle-glide-event-data` |
| `entity-transform-event` | `entity-transform-event-data` |
| `player-item-consume-event` | `player-item-consume-event-data` |
| `player-item-damage-event` | `player-item-damage-event-data` |
| `player-drop-item-event` | `player-drop-item-event-data` |
| `player-bed-enter-event` | `player-bed-enter-event-data` |
| `player-bed-leave-event` | `player-bed-leave-event-data` |
| `player-bucket-empty-event` | `player-bucket-empty-event-data` |
| `player-bucket-fill-event` | `player-bucket-fill-event-data` |
| `block-damage-event` | `block-damage-event-data` |
| `block-ignite-event` | `block-ignite-event-data` |
| `block-from-to-event` | `block-from-to-event-data` |
| `block-form-event` | `block-form-event-data` |
| `block-fade-event` | `block-fade-event-data` |
| `block-dispense-event` | `block-dispense-event-data` |
| `block-explode-event` | `block-explode-event-data` |
| `block-physics-event` | `block-physics-event-data` |
| `block-piston-extend-event` | `block-piston-extend-event-data` |
| `block-piston-retract-event` | `block-piston-retract-event-data` |
| `note-play-event` | `note-play-event-data` |
| `sign-change-event` | `sign-change-event-data` |
| `sponge-absorb-event` | `sponge-absorb-event-data` |
| `tnt-prime-event` | `tnt-prime-event-data` |
| `weather-change-event` | `weather-change-event-data` |
| `thunder-change-event` | `thunder-change-event-data` |
| `world-load-event` | `world-load-event-data` |
| `world-unload-event` | `world-unload-event-data` |
| `async-structure-generate-event` | `async-structure-generate-event-data` |
| `async-structure-spawn-event` | `async-structure-spawn-event-data` |
| `chunk-populate-event` | `chunk-populate-event-data` |
| `chunk-unload-event` | `chunk-unload-event-data` |
| `entities-load-event` | `entities-load-event-data` |
| `entities-unload-event` | `entities-unload-event-data` |
| `generic-game-event` | `generic-game-event-data` |
| `loot-generate-event` | `loot-generate-event-data` |
| `portal-create-event` | `portal-create-event-data` |
| `structure-grow-event` | `structure-grow-event-data` |
| `time-skip-event` | `time-skip-event-data` |
| `world-init-event` | `world-init-event-data` |
| `world-save-event` | `world-save-event-data` |
| `inventory-open-event` | `inventory-open-event-data` |
| `inventory-drag-event` | `inventory-drag-event-data` |
| `craft-item-event` | `craft-item-event-data` |
| `furnace-smelt-event` | `furnace-smelt-event-data` |
| `brew-event` | `brew-event-data` |
| `brewing-stand-fuel-event` | `brewing-stand-fuel-event-data` |
| `furnace-burn-event` | `furnace-burn-event-data` |
| `furnace-extract-event` | `furnace-extract-event-data` |
| `furnace-start-smelt-event` | `furnace-start-smelt-event-data` |
| `hopper-inventory-search-event` | `hopper-inventory-search-event-data` |
| `inventory-creative-event` | `inventory-creative-event-data` |
| `inventory-interact-event` | `inventory-interact-event-data` |
| `inventory-move-item-event` | `inventory-move-item-event-data` |
| `inventory-pickup-item-event` | `inventory-pickup-item-event-data` |
| `prepare-anvil-event` | `prepare-anvil-event-data` |
| `prepare-grindstone-event` | `prepare-grindstone-event-data` |
| `prepare-inventory-result-event` | `prepare-inventory-result-event-data` |
| `prepare-item-craft-event` | `prepare-item-craft-event-data` |
| `prepare-smithing-event` | `prepare-smithing-event-data` |
| `smith-item-event` | `smith-item-event-data` |
| `trade-select-event` | `trade-select-event-data` |
| `vehicle-block-collision-event` | `vehicle-block-collision-event-data` |
| `vehicle-collision-event` | `vehicle-collision-event-data` |
| `vehicle-create-event` | `vehicle-create-event-data` |
| `vehicle-damage-event` | `vehicle-damage-event-data` |
| `vehicle-destroy-event` | `vehicle-destroy-event-data` |
| `vehicle-enter-event` | `vehicle-enter-event-data` |
| `vehicle-entity-collision-event` | `vehicle-entity-collision-event-data` |
| `vehicle-exit-event` | `vehicle-exit-event-data` |
| `vehicle-move-event` | `vehicle-move-event-data` |
| `vehicle-update-event` | `vehicle-update-event-data` |
| `prepare-item-enchant-event` | `prepare-item-enchant-event-data` |
| `enchant-item-event` | `enchant-item-event-data` |
| `map-initialize-event` | `map-initialize-event-data` |
| `hanging-break-event` | `hanging-break-event-data` |
| `hanging-break-by-entity-event` | `hanging-break-by-entity-event-data` |
| `hanging-place-event` | `hanging-place-event-data` |
| `bell-resonate-event` | `bell-resonate-event-data` |
| `bell-ring-event` | `bell-ring-event-data` |
| `block-brush-event` | `block-brush-event-data` |
| `block-cook-event` | `block-cook-event-data` |
| `block-damage-abort-event` | `block-damage-abort-event-data` |
| `block-dispense-armor-event` | `block-dispense-armor-event-data` |
| `block-dispense-loot-event` | `block-dispense-loot-event-data` |
| `block-drop-item-event` | `block-drop-item-event-data` |
| `block-exp-event` | `block-exp-event-data` |
| `block-fertilize-event` | `block-fertilize-event-data` |
| `block-multi-place-event` | `block-multi-place-event-data` |
| `block-receive-game-event` | `block-receive-game-event-data` |
| `block-shear-entity-event` | `block-shear-entity-event-data` |
| `block-spread-event` | `block-spread-event-data` |
| `brewing-start-event` | `brewing-start-event-data` |
| `campfire-start-event` | `campfire-start-event-data` |
| `cauldron-level-change-event` | `cauldron-level-change-event-data` |
| `crafter-craft-event` | `crafter-craft-event-data` |
| `entity-block-form-event` | `entity-block-form-event-data` |
| `fluid-level-change-event` | `fluid-level-change-event-data` |
| `inventory-block-start-event` | `inventory-block-start-event-data` |
| `leaves-decay-event` | `leaves-decay-event-data` |
| `moisture-change-event` | `moisture-change-event-data` |
| `sculk-bloom-event` | `sculk-bloom-event-data` |
| `vault-display-item-event` | `vault-display-item-event-data` |
| `creature-spawn-event` | `creature-spawn-event-data` |
| `ender-dragon-change-phase-event` | `ender-dragon-change-phase-event-data` |
| `entity-break-door-event` | `entity-break-door-event-data` |
| `entity-change-block-event` | `entity-change-block-event-data` |
| `entity-damage-by-block-event` | `entity-damage-by-block-event-data` |
| `entity-damage-by-entity-event` | `entity-damage-by-entity-event-data` |
| `entity-drop-item-event` | `entity-drop-item-event-data` |
| `entity-enter-block-event` | `entity-enter-block-event-data` |
| `entity-exhaustion-event` | `entity-exhaustion-event-data` |
| `entity-interact-event` | `entity-interact-event-data` |
| `entity-knockback-event` | `entity-knockback-event-data` |
| `entity-place-event` | `entity-place-event-data` |
| `entity-pose-change-event` | `entity-pose-change-event-data` |
| `entity-potion-effect-event` | `entity-potion-effect-event-data` |
| `entity-spell-cast-event` | `entity-spell-cast-event-data` |
| `entity-target-living-entity-event` | `entity-target-living-entity-event-data` |
| `entity-toggle-swim-event` | `entity-toggle-swim-event-data` |
| `explosion-prime-event` | `explosion-prime-event-data` |
| `firework-explode-event` | `firework-explode-event-data` |
| `food-level-change-event` | `food-level-change-event-data` |
| `item-despawn-event` | `item-despawn-event-data` |
| `item-merge-event` | `item-merge-event-data` |
| `item-spawn-event` | `item-spawn-event-data` |
| `piglin-barter-event` | `piglin-barter-event-data` |
| `projectile-hit-event` | `projectile-hit-event-data` |
| `projectile-launch-event` | `projectile-launch-event-data` |
| `sheep-dye-wool-event` | `sheep-dye-wool-event-data` |
| `sheep-regrow-wool-event` | `sheep-regrow-wool-event-data` |
| `slime-split-event` | `slime-split-event-data` |
| `strider-temperature-change-event` | `strider-temperature-change-event-data` |
| `villager-acquire-trade-event` | `villager-acquire-trade-event-data` |
| `villager-career-change-event` | `villager-career-change-event-data` |
| `villager-replenish-trade-event` | `villager-replenish-trade-event-data` |
| `warden-anger-change-event` | `warden-anger-change-event-data` |
| `area-effect-cloud-apply-event` | `area-effect-cloud-apply-event-data` |
| `arrow-body-count-change-event` | `arrow-body-count-change-event-data` |
| `bat-toggle-sleep-event` | `bat-toggle-sleep-event-data` |
| `creeper-power-event` | `creeper-power-event-data` |
| `entity-combust-by-block-event` | `entity-combust-by-block-event-data` |
| `entity-combust-by-entity-event` | `entity-combust-by-entity-event-data` |
| `entity-knockback-by-entity-event` | `entity-knockback-by-entity-event-data` |
| `entity-portal-enter-event` | `entity-portal-enter-event-data` |
| `entity-portal-exit-event` | `entity-portal-exit-event-data` |
| `entity-remove-event` | `entity-remove-event-data` |
| `entity-target-block-event` | `entity-target-block-event-data` |
| `entity-unleash-event` | `entity-unleash-event-data` |
| `exp-bottle-event` | `exp-bottle-event-data` |
| `horse-jump-event` | `horse-jump-event-data` |
| `lingering-potion-splash-event` | `lingering-potion-splash-event-data` |
| `pig-zap-event` | `pig-zap-event-data` |
| `pig-zombie-anger-event` | `pig-zombie-anger-event-data` |
| `potion-splash-event` | `potion-splash-event-data` |
| `spawner-spawn-event` | `spawner-spawn-event-data` |
| `trial-spawner-spawn-event` | `trial-spawner-spawn-event-data` |
| `villager-reputation-change-event` | `villager-reputation-change-event-data` |
| `async-player-chat-event` | `async-player-chat-event-data` |
| `async-player-pre-login-event` | `async-player-pre-login-event-data` |
| `player-advancement-done-event` | `player-advancement-done-event-data` |
| `player-animation-event` | `player-animation-event-data` |
| `player-armor-stand-manipulate-event` | `player-armor-stand-manipulate-event-data` |
| `player-bucket-entity-event` | `player-bucket-entity-event-data` |
| `player-changed-world-event` | `player-changed-world-event-data` |
| `player-channel-event` | `player-channel-event-data` |
| `player-command-preprocess-event` | `player-command-preprocess-event-data` |
| `player-edit-book-event` | `player-edit-book-event-data` |
| `player-elytra-boost-event` | `player-elytra-boost-event-data` |
| `player-exp-cooldown-change-event` | `player-exp-cooldown-change-event-data` |
| `player-harvest-block-event` | `player-harvest-block-event-data` |
| `player-hide-entity-event` | `player-hide-entity-event-data` |
| `player-item-break-event` | `player-item-break-event-data` |
| `player-item-mend-event` | `player-item-mend-event-data` |
| `player-kick-event` | `player-kick-event-data` |
| `player-leash-entity-event` | `player-leash-entity-event-data` |
| `player-level-change-event` | `player-level-change-event-data` |
| `player-locale-change-event` | `player-locale-change-event-data` |
| `player-name-entity-event` | `player-name-entity-event-data` |
| `player-open-sign-event` | `player-open-sign-event-data` |
| `player-portal-event` | `player-portal-event-data` |
| `player-pre-login-event` | `player-pre-login-event-data` |
| `player-riptide-event` | `player-riptide-event-data` |
| `player-shear-entity-event` | `player-shear-entity-event-data` |
| `player-show-entity-event` | `player-show-entity-event-data` |
| `player-spawn-change-event` | `player-spawn-change-event-data` |
| `player-statistic-increment-event` | `player-statistic-increment-event-data` |
| `player-swap-hands-event` | `player-swap-hands-event-data` |
| `player-take-lectern-book-event` | `player-take-lectern-book-event-data` |
| `player-unleash-entity-event` | `player-unleash-entity-event-data` |
| `player-velocity-event` | `player-velocity-event-data` |
| `player-input-event` | `player-input-event-data` |
| `player-interact-at-entity-event` | `player-interact-at-entity-event-data` |
| `player-links-send-event` | `player-links-send-event-data` |
| `player-pickup-arrow-event` | `player-pickup-arrow-event-data` |
| `player-recipe-book-click-event` | `player-recipe-book-click-event-data` |
| `player-recipe-book-settings-change-event` | `player-recipe-book-settings-change-event-data` |
| `player-recipe-discover-event` | `player-recipe-discover-event-data` |
| `player-register-channel-event` | `player-register-channel-event-data` |
| `player-resource-pack-status-event` | `player-resource-pack-status-event-data` |
| `player-spawn-location-event` | `player-spawn-location-event-data` |
| `player-unregister-channel-event` | `player-unregister-channel-event-data` |
| `raid-finish-event` | `raid-finish-event-data` |
| `raid-spawn-wave-event` | `raid-spawn-wave-event-data` |
| `raid-stop-event` | `raid-stop-event-data` |
| `raid-trigger-event` | `raid-trigger-event-data` |
| `lightning-strike-event` | `lightning-strike-event-data` |
