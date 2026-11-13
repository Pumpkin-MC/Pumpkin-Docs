import { defineConfig } from "vitepress";
import { en } from "./en.ts";
import { nl } from "./nl.ts";
import { pt } from "./pt.ts";
import { zhCN } from "./zh_cn.ts";
import { de } from "./de.ts";
import { trTR } from "./tr_tr.ts";
import { jaJP } from "./ja_jp.ts";


// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Pumpkin Docs",

    themeConfig: {
        siteTitle: "Pumpkin Docs",
    },

    cleanUrls: true,
    rewrites: {
        'en/:rest*': ':rest*'
    },

    locales: {
        root: {
            label: "English", ...en
        },
        nl: {
            label: "Dutch", ...nl
        },
        pt: {
            label: "Português", ...pt
        },
        zh_cn: {
            label: "简体中文", ...zhCN
        },
        de: {
            label: "Deutsch", ...de
        },
        tr_TR: {
            label: "Türkçe", ...trTR
        },
        ja_jp: {
            label: "日本語", ...jaJP
        },
    },

    head: [
        ["link", { rel: "shortcut icon", href: "/assets/favicon.ico" }],
        ["link", { rel: "icon", type: "image/png", href: "/assets/favicon-96x96.png", sizes: "96x96" }],
        ["link", { rel: "icon", type: "image/svg+xml", href: "/assets/favicon.svg" }],
        ["link", { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png", sizes: "180x180" }],
        ["link", { rel: "manifest", href: "/assets/site.webmanifest" }],

        ["link", { rel: "canonical", href: "https://pumpkinmc.org/" }],

        ["meta", { name: "apple-mobile-web-app-title", content: "Pumpkin" }],

        ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
        ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
        ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" }],

        ["script", { async: '', src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" }],
        ['script', {}, `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QK7NXQQ2ZP');`]

    ],
});
