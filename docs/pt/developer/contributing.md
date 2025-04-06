### Contributing to Pumpkin
We appreciate your interest in contributing to Pumpkin! This document outlines the guidelines for submitting bug reports, feature suggestions, and code changes.

### Getting Started
The easiest way to get started is by asking for help in [our Discord server](https://discord.gg/wT8XjrjKkf).

### How to Contribute
There are several ways you can contribute to Pumpkin:

#### Reporting Bugs
  If you encounter a bug, please search for existing issues on the issue tracker first.

  If you can't find a duplicate issue, open a new one.

  Follow the template and provide a clear description of the bug, including steps to reproduce it if possible.
  Screenshots, logs, or code snippets can also be helpful.

#### Suggesting Features
  Do you have an idea on how Pumpkin can be improved? Share your thoughts by opening an issue on the issue tracker.

  Describe the proposed feature in detail, including its benefits and potential implementation considerations.

#### Contributing Code
  To get started with contributing code to Pumpkin, fork the repository on GitHub

1. First, create a GitHub account if you don't already have one
 
2. Go to Pumpkin's official [GitHub Organization](https://github.com/Pumpkin-MC) and press fork

> Creating a fork means you now have your own copy of the Pumpkin source code (this does not mean you own the copyright).

  Now that you have a copy that you can edit, you will need a few tools.

3. Install [git](https://git-scm.com/downloads) for your operating system

- To get started with git, visit [Getting started with Git](https://docs.github.com/en/get-started/getting-started-with-git)

- Optional: If you want a graphical tool to interact with GitHub, install [GitHub-Desktop](https://desktop.github.com/download/)

> GitHub Desktop may be easier if you are not used to the command line, but it is not for everyone

- To get started with GitHub Desktop, visit [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)

- If you are wanting to contribute code, install Rust at [rust-lang.org](https://www.rust-lang.org/).

- If you are wanting to contribute to documentation, install [NodeJS](https://nodejs.org/en)

### Decompiling Minecraft's code
When working at Pumpkin, we heavily rely on the official Minecraft client and utilize existing server logic. We often refer to Minecraft's official code.
The easiest way to decompile Minecraft is by using Fabric Yarn. Make sure you have Gradle installed before running the following commands:
```
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```
After decompiling, you can find the source code located in `build/namedSrc`.

### Additional Information
We encourage you to comment on existing issues and pull requests to share your thoughts and provide feedback.

Feel free to ask questions in the issue tracker or reach out to the project maintainers if you need assistance.

Before submitting a large contribution, consider opening an issue or discussion, or talk with us on our Discord to discuss your approach.
