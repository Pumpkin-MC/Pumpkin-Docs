# Creating a new project
Pumpkin Plugins use the [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html) build system.

The complete code for this plugin can be found as a [template on GitHub](https://github.com/vyPal/Hello-Pumpkin).

## Initializing a new crate
First we need to create a new project folder,you can do this by running this command in the folder you created:
```bash
cargo new <project-name> --lib
```
This will create a folder with a couple files in it. The folder structure should look like this:
```
├── Cargo.toml
└── src
    └── lib.rs
```

## Configuring the crate
Since Pumpkin Plugins are loaded at runtime as dynamic libraries, we need to tell Cargo to build this crate as one. Open the `Cargo.toml` file and add these lines:
```toml
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2021"

[lib] // [!code ++:3]
crate-type = ["cdylib"]

[dependencies]
```

Next we need to add some basic dependencies. Since Pumpkin is still in early development, the internal crates aren't published to crates.io, so we need to tell Cargo to download the dependencies directly from GitHub. Add this to `Crago.toml`:
```toml
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
pumpkin = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin" } // [!code ++:9]
pumpkin-util = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin-util" }
pumpkin-api-macros = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin-api-macros" }

async-trait = "0.1.83"
tokio = { version = "1.42", features = [ "full" ] }

env_logger = "0.11.6"
log = "0.4.22"
```

This adds three dependencies from Pumpkin:
- `pumpkin` - This is the base crate with most high-level type definitions
- `pumpkin-util` - Other utilities used by Pumpkin (like TextComponent)
- `pumpkin-api-macros` - Macros for easier plugin development

as well as these other dependencies:
- `async-trait` - A utility allowing plugins to work asynchronously
- `tokio` - A rust asynchronous runtime
- `log` - For logging
- `env_logger` - Configure logger using environment variables
