import { defineConfig } from "vitepress";
import { shared } from "./shared";
import { en } from "./en";
import { nl } from "./nl";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    ...shared,
    locales: {
        root: {
            label: "English", ...en
        },
        nl: {
            label: "Dutch", ...nl
        }
    }
});
