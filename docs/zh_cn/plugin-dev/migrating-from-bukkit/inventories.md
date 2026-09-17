# 从 Bukkit 迁移物品栏与 GUI

在 Minecraft 插件开发中，创建物品栏 GUI（例如箱子菜单、商店界面或自定义玩家窗口）是一项常见任务。

在 Bukkit 中，自定义 GUI 通常使用 `Bukkit.createInventory()` 创建并通过 `InventoryClickEvent` 进行处理。而在 Pumpkin 中，物品栏窗口通过 **Window API** 和容器点击数据包进行管理。

---

## 核心差异

| 特性 | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **物品栏创建** | `Bukkit.createInventory(owner, size, title)` | 窗口容器定义（`WindowType`） |
| **打开窗口** | `player.openInventory(inv)` | `player.open_window(window)` |
| **点击拦截** | 处理 `InventoryClickEvent` | 窗口点击回调处理器 |
| **物品堆叠与元数据** | 带有 `ItemMeta` 的 `ItemStack` | 带有组件 / NBT 的 `ItemStack` |

---

## 代码对比：打开自定义菜单 GUI

### 1. Bukkit 实现 (Java)

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

### 2. Pumpkin 实现 (Rust)

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
