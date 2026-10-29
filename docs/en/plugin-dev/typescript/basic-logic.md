# Basic Logic

This section covers the core architecture, lifecycle methods, and built-in utilities available when developing Pumpkin plugins with TypeScript.

## Plugin Structure

Every TypeScript plugin inherits from the `Plugin` base class provided by `@pumpkinmc/pumpkin-api-ts`.

```typescript [src/index.ts]
import { Plugin, registerPlugin } from "@pumpkinmc/pumpkin-api-ts";
import { PluginMetadata } from "pumpkin:plugin/metadata@0.1.0";
import { Context } from "pumpkin:plugin/context@0.1.0";
import * as logging from "pumpkin:plugin/logging@0.1.0";

class MyPlugin extends Plugin {
  metadata(): PluginMetadata {
    return {
      name: "my-ts-plugin",
      version: "0.1.0",
      authors: ["Developer"],
      description: "Plugin structure and basic logic",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);
    logging.log("info", "Plugin loaded successfully!");
  }

  onUnload(ctx: Context): void {
    super.onUnload(ctx);
    logging.log("info", "Plugin unloaded. Cleaning up...");
  }
}

registerPlugin(new MyPlugin());

export * from "@pumpkinmc/pumpkin-api-ts";
```

## Lifecycle Methods

- **`metadata()`**: Returns a `PluginMetadata` object with the plugin's name, version, authors, description, dependencies, and permissions. This is a pure descriptor method and must not call host imports.
- **`onLoad(ctx: Context)`**: Invoked after registration. Use this method to configure commands, events, and initial tasks. Always call `super.onLoad(ctx)`.
- **`onUnload(ctx: Context)`**: Invoked when the server stops or the plugin is unloaded. Use this method to clean up resources or persist state.
- **`handleIpcMessage(sender: PluginId, message: IpcMessage)`**: Optional method to process messages sent from other plugins.

## Built-in Helper Methods

The `Plugin` class provides helper methods on `this` for common plugin tasks:

### Event Registration
```typescript
this.registerEvent(
  ctx,
  "player-join-event",
  (srv, evt) => {
    // Handle event
  },
  "normal", // optional priority: 'lowest' | 'low' | 'normal' | 'high' | 'highest'
  true,     // optional blocking boolean: true awaits handler result
);
```

### Command Registration
```typescript
this.registerCommand(
  ctx,
  command,
  (sender, srv, args) => {
    return 1;
  },
  "my_plugin.permission", // optional permission string
);
```

### Scheduled Tasks
```typescript
// Delayed task (ticks)
this.scheduleDelayedTask(20, (srv) => {
  logging.log("info", "Executed after 20 ticks!");
});

// Repeating task (delayTicks, periodTicks)
this.scheduleRepeatingTask(0, 100, (srv) => {
  logging.log("info", "Executed every 5 seconds (100 ticks)!");
});
```

## Logging and Text

Pumpkin provides structured logging through `pumpkin:plugin/logging@0.1.0` and rich text creation with `pumpkin:plugin/text@0.1.0`:

```typescript
import * as logging from "pumpkin:plugin/logging@0.1.0";
import { TextComponent } from "pumpkin:plugin/text@0.1.0";

// Log levels: 'trace', 'debug', 'info', 'warn', 'error'
logging.log("info", "Informational server log");
logging.log("warn", "Warning message");

// Create text components
const message = TextComponent.text("Hello players!");
```
