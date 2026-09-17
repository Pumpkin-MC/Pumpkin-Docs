# Inventare & GUIs von Bukkit migrieren

Das Erstellen von Inventar-GUIs (wie Kisten-Menüs, Shop-Oberflächen oder benutzerdefinierten Spielerfenstern) ist eine alltägliche Aufgabe bei der Minecraft-Plugin-Entwicklung.

In Bukkit werden benutzerdefinierte GUIs über `Bukkit.createInventory()` erstellt und via `InventoryClickEvent` verarbeitet. In Pumpkin werden Inventarfenster über **Window-APIs** und Container-Klickpakete verwaltet.

---

## Wesentliche Unterschiede

| Merkmal | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Inventar-Erstellung** | `Bukkit.createInventory(owner, size, title)` | Fenster-Container-Definitionen (`WindowType`) |
| **Öffnen von Fenstern** | `player.openInventory(inv)` | `player.open_window(window)` |
| **Klicks abfangen** | Verarbeitung via `InventoryClickEvent` | Callback-Handler für Fensterklicks |
| **Item-Stacking** | `ItemStack` mit `ItemMeta` | `ItemStack` mit Komponenten / NBT |

---

## Code-Vergleich: Öffnen eines benutzerdefinierten GUI-Menüs

### 1. Bukkit-Implementierung (Java)

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

### 2. Pumpkin-Implementierung (Rust)

```rust [gui.rs]
use pumpkin_plugin_api::{
    player::Player,
    item::ItemStack,
    window::{Window, WindowType},
    text::TextComponent,
};

pub fn open_custom_menu(player: &Player) {
    // 1. Erstelle ein Truhenfenster mit 9 Slots
    let mut window = Window::new(WindowType::Generic9x1, TextComponent::text("Custom Menu"));

    // 2. Setze Gegenstand in Slot 4
    let item = ItemStack::new("minecraft:diamond", 1);
    window.set_item(4, Some(item));

    // 3. Öffne Fenster für den Spieler
    player.open_window(window);
}
```
