# Di chuyển Kho đồ & GUI từ Bukkit

Tạo GUI kho đồ (như menu rương, giao diện shop, hoặc cửa sổ người chơi tùy chỉnh) là một tác vụ phổ biến trong phát triển plugin Minecraft.

Trong Bukkit, các GUI tùy chỉnh được tạo bằng `Bukkit.createInventory()` và xử lý qua `InventoryClickEvent`. Trong Pumpkin, các cửa sổ kho đồ được quản lý thông qua **Window APIs** và các gói click container.

---

## Các Khác biệt Chính

| Tính năng | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Tạo Kho đồ** | `Bukkit.createInventory(owner, size, title)` | Định nghĩa container window (`WindowType`) |
| **Mở Windows** | `player.openInventory(inv)` | `player.open_window(window)` |
| **Chặn Click** | Xử lý `InventoryClickEvent` | Các callback handler click window |
| **Xếp chồng Vật phẩm** | `ItemStack` với `ItemMeta` | `ItemStack` với components / NBT |

---

## So sánh Code: Mở GUI Menu Tùy chỉnh

### 1. Triển khai Bukkit (Java)

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

### 2. Triển khai Pumpkin (Rust)

```rust [gui.rs]
use pumpkin_plugin_api::{
    player::Player,
    item::ItemStack,
    window::{Window, WindowType},
    text::TextComponent,
};

pub fn open_custom_menu(player: &Player) {
    // 1. Tạo window rương 9 ô
    let mut window = Window::new(WindowType::Generic9x1, TextComponent::text("Custom Menu"));

    // 2. Đặt vật phẩm vào ô 4
    let item = ItemStack::new("minecraft:diamond", 1);
    window.set_item(4, Some(item));

    // 3. Mở window cho người chơi
    player.open_window(window);
}
```
