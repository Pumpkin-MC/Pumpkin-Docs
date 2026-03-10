# PVP

PVP là một phần quan trọng của Vanilla mechanics, với ngay cả những thay đổi nhỏ nhất cũng ảnh hưởng đến lối chơi. Pumpkin cho phép bạn tùy chỉnh hoàn toàn PVP.

## Cấu hình PVP

#### `enabled`: Boolean

Bật và tắt PVP.

:::code-group

```toml [features.toml] {2}
[pvp]
enabled = true
```

:::

#### `hurt_animation`: Boolean

Bật và tắt hiệu ứng đỏ khi bị đánh và FOV bobbing.

:::code-group

```toml [features.toml] {2}
[pvp]
hurt_animation = true
```

:::

#### `protect_creative`: Boolean

Bật và tắt bảo vệ người chơi trong creative khỏi PVP.

:::code-group

```toml [features.toml] {2}
[pvp]
protect_creative = true
```

:::

#### `knockback`: Boolean

Bật và tắt knockback khi đánh.

:::code-group

```toml [features.toml] {2}
[pvp]
knockback = true
```

:::

#### `swing`: Boolean

Bật và tắt swing khi đánh.

:::code-group

```toml [features.toml] {2}
[pvp]
swing = true
```

:::

## Cấu hình mặc định

Theo mặc định, tất cả các tùy chọn PVP đều được bật để phù hợp với hành vi vanilla.

:::code-group

```toml [features.toml]
[pvp]
enabled = true
hurt_animation = true
protect_creative = true
knockback = true
swing = true
```

:::
