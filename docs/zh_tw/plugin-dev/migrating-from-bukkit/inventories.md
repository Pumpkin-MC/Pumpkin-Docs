# 從 Bukkit 遷移物品欄與 GUI

建立物品欄 GUI（例如箱子選單、商店介面或自訂玩家視窗）是 Minecraft 插件開發中的一項常見任務。

在 Bukkit 中，自訂 GUI 使用 `Bukkit.createInventory()` 建立，並透過 `InventoryClickEvent` 處理。在 Pumpkin 中，物品欄視窗透過 **Window API** 和容器點選封包進行管理。

---

## 主要區別

| 功能 | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **物品欄建立** | `Bukkit.createInventory(owner, size, title)` | 視窗容器定義（`WindowType`） |
| **開啟視窗** | `player.openInventory(inv)` | `player.open_window(window)` |
| **點選攔截** | 處理 `InventoryClickEvent` | 視窗點選回呼處理器 |
| **物品堆疊** | 帶有 `ItemMeta` 的 `ItemStack` | 帶有元件 / NBT 的 `ItemStack` |

---

## 程式碼對比：開啟自訂選單 GUI

### 1. Bukkit 實現（Java）

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

### 2. Pumpkin 實現（Rust）

```rust [gui.rs]
use pumpkin_plugin_api::{
    player::Player,
    item::ItemStack,
    window::{Window, WindowType},
    text::TextComponent,
};

pub fn open_custom_menu(player: &Player) {
    // 1. 建立一個 9 欄位的箱子視窗
    let mut window = Window::new(WindowType::Generic9x1, TextComponent::text("Custom Menu"));

    // 2. 在欄位 4 中設定物品
    let item = ItemStack::new("minecraft:diamond", 1);
    window.set_item(4, Some(item));

    // 3. 為玩家開啟視窗
    player.open_window(window);
}
```
