# Contributing to Pumpkin Documentation

We appreciate your interest in contributing to the Pumpkin documentation! High-quality documentation helps developers, server administrators, and plugin creators understand and adopt Pumpkin.

> [!NOTE]
> - **Looking to contribute to the Pumpkin server codebase?** Please consult the **[Pumpkin Core Developer & Contributing Guide](https://pumpkinmc.org/developer/contributing)** or the [`CONTRIBUTING.md`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/CONTRIBUTING.md) in the main Pumpkin repository.
> - **Looking to contribute to documentation or translations?** You are in the right place! Read on below.

---

## Getting Started

Join our community and ask questions in [our Discord server](https://discord.gg/wT8XjrjKkf) in the `#development` channel.

### Ways to Contribute

- **Fixing Typos & Improving Phrasing**: Clarify instructions, fix grammar, or fix dead links across any documentation page.
- **Documenting New Features**: Add or update documentation as new features land in Pumpkin.
- **Adding Examples**: Add code snippets, configuration examples, and tutorials.
- **Adding or Updating Translations**: Help localize Pumpkin documentation for users worldwide.

---

## Local Development Setup

This documentation site is built with [VitePress](https://vitepress.dev/) and powered by Node.js / Bun.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+) or [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)

### 2. Setup & Running

```bash
# Clone the documentation repository
git clone https://github.com/Pumpkin-MC/Pumpkin-Docs.git
cd Pumpkin-Docs

# Install dependencies
bun install
# or: npm install

# Start local development server with hot-reload
bun run dev
# or: npm run dev
```

Visit the displayed localhost address (typically `http://localhost:5173`) in your browser.

### 3. Verification

Before submitting a pull request, verify that the documentation builds cleanly and has no typos:

```bash
# Verify static build passes
bun run build
# or: npx vitepress build docs

# Check for spelling errors
typos
```

---

## Adding a Translation

To add a new language translation:

1. Create a new locale configuration file in `docs/.vitepress/` (e.g., `fr.ts` for French).
2. Register the new locale in `docs/.vitepress/config.ts`.
3. Duplicate the English documentation folder (`docs/en/`) and rename it to your language's ISO code (e.g., `docs/fr/`).
4. Translate all markdown files in the newly created folder, updating links to preserve the locale prefix.
5. Add the translation folder to the exclude list in `.typos.toml` if your language uses non-English words.
6. Run `bun run build` to verify that there are no broken links or syntax errors.

---

## Pull Request & Commit Guidelines

All contributions submitted via Pull Requests to the Pumpkin documentation repository must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Format

```text
<type>(<optional scope>): <imperative summary>
```

### Allowed Types

| Type | Purpose | Example |
| :--- | :--- | :--- |
| `docs` | Documentation additions, revisions, or expansions | `docs(entities): document mob goal selector` |
| `fix` | Correcting typos, dead links, or factual errors | `fix(proxy): fix velocity forwarding port reference` |
| `feat` | Adding a completely new guide, section, or interactive component | `feat(commands): add Brigadier execution context guide` |
| `refactor` | Restructuring files or configs without content changes | `refactor(locales): add explicit ts extensions to imports` |
| `chore` | Tooling, dependency, or build configuration updates | `chore(deps): update vitepress` |

### Key Rules

- **Use Imperative Mood**: Write `add`, not `added` or `adds`; `fix`, not `fixed` or `fixes`.
- **Lowercase**: Start descriptions with a lowercase letter and omit trailing punctuation.
- **PR Title**: Ensure your GitHub Pull Request title follows the Conventional Commits format, as it is used for automated squash commits and release changelogs.

---

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
