# Inventory

## Misc notes
TODO: formulate these into coherent docs

A Bedrock player may have any number of inventory **windows** open. These provide client access to inventories, which have any number of **slots** (slots depend on the inventory type; e.g. crafting table vs anvil vs chest, etc.), each of which may contain an **item stack** (an empty/absent item stack being `minecraft:air x 0`).

A slot is ANYTHING that holds an item stack. This includes typical storage slots (e.g. in a player's inventory or hotbar, or a chest), but also includes things like a crafting table's inputs AND its result preview, a mob's armor slots, the player's offhand, or even the cursor of the player inventory UI.

Relavent packets:
- [**InventoryContent**](./packets/inventory-content) - sent from server to client to provide the complete contents of a particular open window/inventory. This is sent on client login to initialize player inventories (which are permanatly open windows by default), when opening a container, etc.
