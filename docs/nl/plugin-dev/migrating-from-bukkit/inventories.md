# Inventarissen & GUI's migreren van Bukkit

Het maken van inventaris-GUI's (zoals kistmenu's, winkelinterfaces of aangepaste spelervensters) is een veelvoorkomende taak bij de ontwikkeling van Minecraft-plugins.

In Bukkit worden aangepaste GUI's gemaakt met `Bukkit.createInventory()` en afgehandeld via `InventoryClickEvent`. In Pumpkin worden inventarisvensters beheerd via **Window-API's** en container-klikpakketten.

---

## Belangrijkste verschillen

| Functie | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Inventariscreatie** | `Bukkit.createInventory(owner, size, title)` | Venstercontainer-definities (`WindowType`) |
| **Vensters openen** | `player.openInventory(inv)` | `player.open_window(window)` |
| **Klikken onderscheppen** | `InventoryClickEvent`-afhandeling | Venster-klik callback-handlers |
| **Items stapelen** | `ItemStack` met `ItemMeta` | `ItemStack` met componenten / NBT |

---

## Codevergelijking: Een aangepaste GUI-menu openen

### 1. Bukkit-implementatie (Java)

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

### 2. Pumpkin-implementatie (Rust)

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
