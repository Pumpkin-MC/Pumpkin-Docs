# Bukkit'ten Envanterleri ve GUI'leri Taşıma

Envanter GUI'leri (sandık menüleri, mağaza arayüzleri veya özel oyuncu pencereleri gibi) oluşturmak, Minecraft eklenti geliştirmede yaygın bir görevdir.

Bukkit'te özel GUI'ler `Bukkit.createInventory()` kullanılarak oluşturulur ve `InventoryClickEvent` aracılığıyla işlenir. Pumpkin'da ise envanter pencereleri **Pencere API'leri (Window APIs)** ve konteyner tıklama paketleri aracılığıyla yönetilir.

---

## Temel Farklar

| Özellik | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Envanter Oluşturma** | `Bukkit.createInventory(owner, size, title)` | Pencere konteyner tanımları (`WindowType`) |
| **Pencereleri Açma** | `player.openInventory(inv)` | `player.open_window(window)` |
| **Tıklamaları Yakalama** | `InventoryClickEvent` işleme | Pencere tıklama geri çağırma (callback) işleyicileri |
| **Eşya Verisi** | `ItemMeta` içeren `ItemStack` | Bileşenler / NBT içeren `ItemStack` |

---

## Kod Karşılaştırması: Özel Menü GUI'si Açma

### 1. Bukkit Uygulaması (Java)

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

### 2. Pumpkin Uygulaması (Rust)

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
