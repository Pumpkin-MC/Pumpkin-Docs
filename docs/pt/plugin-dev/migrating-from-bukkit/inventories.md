# Migrando Inventários e GUIs do Bukkit

Criar GUIs de inventário (como menus de baú, interfaces de loja ou janelas personalizadas de jogador) é uma tarefa comum no desenvolvimento de plugins para Minecraft.

No Bukkit, GUIs personalizadas são criadas usando `Bukkit.createInventory()` e manipuladas via `InventoryClickEvent`. No Pumpkin, janelas de inventário são gerenciadas através das **Window APIs** e de pacotes de clique em contêineres.

---

## Principais Diferenças

| Recurso | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Criação de Inventário** | `Bukkit.createInventory(owner, size, title)` | Definições de contêiner de janela (`WindowType`) |
| **Abertura de Janelas** | `player.openInventory(inv)` | `player.open_window(window)` |
| **Interceptação de Cliques** | Manipulação via `InventoryClickEvent` | Handlers de callback de clique na janela |
| **Empilhamento de Itens** | `ItemStack` com `ItemMeta` | `ItemStack` com componentes / NBT |

---

## Comparação de Código: Abrindo uma GUI de Menu Personalizada

### 1. Implementação no Bukkit (Java)

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

### 2. Implementação no Pumpkin (Rust)

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
