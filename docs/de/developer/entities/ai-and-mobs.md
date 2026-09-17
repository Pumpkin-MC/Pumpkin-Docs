# Mob AI & Goal System

Pumpkin implements a modular, priority-driven Artificial Intelligence (AI) goal system for computer-controlled mobs, located in [`crates/pumpkin/src/entity/ai/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity/ai) and [`crates/pumpkin/src/entity/mob/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity/mob).

---

## The Goal System Architecture

Mob behaviors are decomposed into independent modular tasks called **Goals**. Each mob possesses a **GoalSelector** that maintains an ordered collection of goals evaluated on every server tick.
 
### Goal Priority Hierarchy
 
Goals are assigned an integer priority (where lower numbers represent higher precedence). During each tick, higher-priority actions preempt lower-priority background tasks:
 
| Priority | Goal Type | Evaluation Condition | Behavior |
| :--- | :--- | :--- | :--- |
| **1 (Highest)** | `SwimGoal` | Entity is submerged in water | Jump repeatedly to swim to the water surface and avoid drowning. |
| **2** | `MeleeAttackGoal` | Valid hostile target in sight/range | Navigate towards target entity and execute melee attacks. |
| **3** | `WanderAroundGoal` | No active combat target | Pick a random nearby navigable voxel and walk to it. |
| **4 (Lowest)** | `LookAtEntityGoal` | Player or mob within observation radius | Rotate head and body pitch/yaw towards the target entity. |
 
### Execution Flow
 
1. **Evaluation**: On every game tick, `GoalSelector::tick()` iterates through registered goals in order of priority.
2. **Activation**: If an inactive goal satisfies `can_start()`, it is activated via `start()`.
3. **Execution**: Active goals run their per-tick logic in `tick()`.
4. **Preemption & Termination**: If `should_continue()` returns `false`, or a mutually exclusive goal with higher priority activates, `stop()` is called and the goal resets.

### The `Goal` Lifecycle

Every AI behavior implements the `Goal` trait:

```rust
pub trait Goal: Send + Sync {
    /// Evaluates preconditions to determine if this goal can activate.
    fn can_start(&self) -> bool;

    /// Called once when the goal transitions from inactive to active.
    fn start(&mut self) {}

    /// Evaluates whether the goal should continue executing on subsequent ticks.
    fn should_continue(&self) -> bool {
        self.can_start()
    }

    /// Executes the continuous behavior on each server tick.
    fn tick(&mut self) {}

    /// Called when the goal completes, fails, or is preempted by a higher priority goal.
    fn stop(&mut self) {}
}
```

---

## Standard Built-in Goals

Pumpkin provides standard vanilla AI behaviors in `crates/pumpkin/src/entity/ai/`:

| Goal | Description | Target Mobs |
| :--- | :--- | :--- |
| **`SwimGoal`** | Jumps repeatedly while submerged in water to prevent drowning. | Almost all land mobs |
| **`MeleeAttackGoal`** | Navigates towards an attack target and executes a strike when within reach. | Zombies, Spiders, Iron Golems |
| **`RangedAttackGoal`** | Stays at range and shoots projectiles (arrows, snowballs). | Skeletons, Pillagers, Blazes |
| **`FleeSunGoal`** | Seeks shade or water during daytime to prevent combustion. | Zombies, Skeletons |
| **`PanicGoal`** | Sprints in random directions when taking damage. | Cows, Pigs, Sheep, Chickens |
| **`WanderAroundGoal`** | Selects random accessible coordinates nearby when idle. | Passive & neutral mobs |
| **`LookAtEntityGoal`** | Rotates head to face nearby players within sensory range. | Villagers, Mobs |

---

## Navigation & Pathfinding

Mobs navigate the block world using Pumpkin's 3D grid pathfinder:

1. **Path Calculation**: Resolves a path from the mob's origin to target coordinates using an A* algorithm optimized for Minecraft block geometries.
2. **Obstacle Avoidance**:
   - Avoids hazardous blocks (lava, fire, sweet berry bushes).
   - Prevents walking off ledges higher than the mob's fall threshold.
   - Computes jumping steps over 1-block obstacles.
3. **Waypoint Steering**: The navigation engine updates the mob's velocity vectors per tick to smoothly guide the entity along waypoints.

---

## Entity Attributes System

Mob capabilities and stats are governed by the **Attributes** system in [`crates/pumpkin/src/entity/attributes.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/entity/attributes.rs):

```rust
use pumpkin_data::entity::attribute::EntityAttribute;

// Common vanilla attributes
EntityAttribute::GENERIC_MAX_HEALTH;          // Base hit points (e.g. 20.0 for Zombies)
EntityAttribute::GENERIC_MOVEMENT_SPEED;      // Base walking velocity (e.g. 0.23)
EntityAttribute::GENERIC_ATTACK_DAMAGE;       // Melee attack damage (e.g. 3.0)
EntityAttribute::GENERIC_FOLLOW_RANGE;        // Sensory detection range in blocks (e.g. 35.0)
EntityAttribute::GENERIC_KNOCKBACK_RESISTANCE; // Resistance against knockback (0.0 to 1.0)
```

### Modifiers
Attributes support dynamic modifiers with additive or multiplicative calculations (e.g., speed bonuses from Swiftness potions or armor attribute boosts).

---

## Ageable & Passive Entities

Passive animals (cows, sheep, pigs) implement the `Ageable` trait:

- **Baby State**: Renders with smaller collision boxes and oversized heads.
- **Growing Age**: A negative tick timer counting upward to `0`. When it reaches `0`, the entity matures into an adult.
- **Breeding Cooldown**: Positive tick timer tracking cooldowns between successful matings.
