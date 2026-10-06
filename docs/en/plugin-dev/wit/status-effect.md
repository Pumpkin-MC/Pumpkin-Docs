---
title: Interface status-effect
outline: [2, 2]
---

# Interface `status-effect`

Host import: `pumpkin:plugin/status-effect@0.1.0`

[Package summary](./)

Source: [status-effect.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/status-effect.wit)

Status effect types.

## Type Summary

| Kind | Type |
| --- | --- |
| record | [`status-effect-instance`](#type-status-effect-instance) |
| enum | [`status-effect-type`](#type-status-effect-type) |

## Type Details

### `status-effect-type` {#type-status-effect-type}

**Enum cases**

| Name |
| --- |
| `speed` |
| `slowness` |
| `haste` |
| `mining-fatigue` |
| `strength` |
| `instant-health` |
| `instant-damage` |
| `jump-boost` |
| `nausea` |
| `regeneration` |
| `resistance` |
| `fire-resistance` |
| `water-breathing` |
| `invisibility` |
| `blindness` |
| `night-vision` |
| `hunger` |
| `weakness` |
| `poison` |
| `wither` |
| `health-boost` |
| `absorption` |
| `saturation` |
| `glowing` |
| `levitation` |
| `luck` |
| `unluck` |
| `slow-falling` |
| `conduit-power` |
| `dolphins-grace` |
| `bad-omen` |
| `hero-of-the-village` |
| `darkness` |
| `trial-omen` |
| `raid-omen` |
| `wind-charged` |
| `weaving` |
| `oozing` |
| `infested` |

### `status-effect-instance` {#type-status-effect-instance}

**Record fields**

| Name | WIT type |
| --- | --- |
| `effect-type` | `status-effect-type` |
| `duration` | `u32` |
| `amplifier` | `u8` |
| `ambient` | `bool` |
| `show-particles` | `bool` |
| `show-icon` | `bool` |
