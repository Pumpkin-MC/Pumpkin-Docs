# PVP

PVP behavior and combat mechanics are configured under `[pvp]` in `pumpkin.toml`.

## Configuration

:::code-group

```toml [pumpkin.toml]
[pvp]
enabled = true
hurt_animation = true
protect_creative = true
knockback = true
swing = true
```

:::

### Configuration Options

- **`enabled`**: Enables player-versus-player combat.
- **`hurt_animation`**: Shows hurt animations on attack.
- **`protect_creative`**: Prevents players in Creative mode from receiving PVP damage.
- **`knockback`**: Enables knockback effects upon receiving damage.
- **`swing`**: Enables arm swing animations during attacks.
