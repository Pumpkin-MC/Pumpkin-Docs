# Migrating Inventories & GUIs from Bukkit

Creating inventory GUIs (like chest menus, shop interfaces, or custom player windows) is a common task in Minecraft plugin development.

In Bukkit, custom GUIs are created using `Bukkit.createInventory()` and handled via `InventoryClickEvent`. In Pumpkin, inventory windows are managed through **Window APIs** and container click packets.

---

## Key Differences

| Feature | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Inventory Creation** | `Bukkit.createInventory(owner, size, title)` | Window container definitions (`WindowType`) |
| **Opening Windows** | `player.openInventory(inv)` | `player.open_window(window)` |
| **Click Interception** | `InventoryClickEvent` handling | Window click callback handlers |
| **Item Stacking** | `ItemStack` with `ItemMeta` | `ItemStack` with components / NBT |

---

## Code Comparison: Opening a Custom Menu GUI

### 1. Bukkit Implementation (Java)

```java [MenuGUI.java]
public class MenuGUI implements Listener {

    public void openMenu(Player player) {
        Inventory inv = Bukkit.createInventory(null, 9, Component.text("Custom Menu"));

        ItemStack item = new ItemStack(Material.DIAMOND);
        ItemMeta meta = item.getItemMeta();
        meta.displayName(Component.text("Click Me!"));
        item.setItemMeta(meta);

        inv.setItem(4, item);
        player.openInventory(inv);
    }

    @EventHandler
    public void onInventoryClick(InventoryClickEvent event) {
        if (event.getView().getTitle().equals("Custom Menu")) {
            event.setCancelled(true);
            if (event.getSlot() == 4) {
                event.getWhoClicked().sendMessage("Diamond clicked!");
            }
        }
    }
}
```

### 2. Pumpkin Implementation (Rust)

```rust [gui.rs]
use pumpkin_plugin_api::{
    player::Player,
    item::ItemStack,
    window::{Window, WindowType},
    text::TextComponent,
};

pub fn open_custom_menu(player: &Player) {
    // 1. Create a 9-slot chest window
    let mut window = Window::new(WindowType::Generic9x1, TextComponent::text("Custom Menu"));

    // 2. Set item in slot 4
    let item = ItemStack::new("minecraft:diamond", 1);
    window.set_item(4, Some(item));

    // 3. Open window for player
    player.open_window(window);
}
```
