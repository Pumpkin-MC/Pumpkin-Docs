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
        search: {
            provider: "local",
            options: {
                detailedView: true,
                locales: {
                    nl: {
                        translations: {
                            button: { buttonText: "Zoeken", buttonAriaLabel: "Zoeken" },
                            modal: {
                                displayDetails: "Gedetailleerde lijst weergeven",
                                resetButtonTitle: "Zoekopdracht wissen",
                                backButtonTitle: "Zoeken sluiten",
                                noResultsText: "Geen resultaten voor",
                                footer: {
                                    selectText: "om te selecteren",
                                    selectKeyAriaLabel: "enter",
                                    navigateText: "om te navigeren",
                                    navigateUpKeyAriaLabel: "pijl omhoog",
                                    navigateDownKeyAriaLabel: "pijl omlaag",
                                    closeText: "om te sluiten",
                                    closeKeyAriaLabel: "escape"
                                }
                            }
                        }
                    },
                    pt: {
                        translations: {
                            button: { buttonText: "Pesquisar", buttonAriaLabel: "Pesquisar" },
                            modal: {
                                displayDetails: "Mostrar lista detalhada",
                                resetButtonTitle: "Limpar pesquisa",
                                backButtonTitle: "Fechar pesquisa",
                                noResultsText: "Nenhum resultado para",
                                footer: {
                                    selectText: "para selecionar",
                                    selectKeyAriaLabel: "enter",
                                    navigateText: "para navegar",
                                    navigateUpKeyAriaLabel: "seta para cima",
                                    navigateDownKeyAriaLabel: "seta para baixo",
                                    closeText: "para fechar",
                                    closeKeyAriaLabel: "esc"
                                }
                            }
                        }
                    },
                    zh_cn: {
                        translations: {
                            button: { buttonText: "搜索", buttonAriaLabel: "搜索" },
                            modal: {
                                displayDetails: "显示详细列表",
                                resetButtonTitle: "清除搜索",
                                backButtonTitle: "关闭搜索",
                                noResultsText: "没有找到相关结果",
                                footer: {
                                    selectText: "选择",
                                    selectKeyAriaLabel: "回车",
                                    navigateText: "切换",
                                    navigateUpKeyAriaLabel: "上方向键",
                                    navigateDownKeyAriaLabel: "下方向键",
                                    closeText: "关闭",
                                    closeKeyAriaLabel: "Esc"
                                }
                            }
                        }
                    },
                    de: {
                        translations: {
                            button: { buttonText: "Suchen", buttonAriaLabel: "Suchen" },
                            modal: {
                                displayDetails: "Detaillierte Liste anzeigen",
                                resetButtonTitle: "Suche zurücksetzen",
                                backButtonTitle: "Suche schließen",
                                noResultsText: "Keine Ergebnisse für",
                                footer: {
                                    selectText: "zum Auswählen",
                                    selectKeyAriaLabel: "Eingabetaste",
                                    navigateText: "zum Navigieren",
                                    navigateUpKeyAriaLabel: "Pfeil nach oben",
                                    navigateDownKeyAriaLabel: "Pfeil nach unten",
                                    closeText: "zum Schließen",
                                    closeKeyAriaLabel: "Escape"
                                }
                            }
                        }
                    },
                    tr_TR: {
                        translations: {
                            button: { buttonText: "Ara", buttonAriaLabel: "Ara" },
                            modal: {
                                displayDetails: "Ayrıntılı listeyi göster",
                                resetButtonTitle: "Aramayı sıfırla",
                                backButtonTitle: "Aramayı kapat",
                                noResultsText: "Sonuç bulunamadı:",
                                footer: {
                                    selectText: "seçmek için",
                                    selectKeyAriaLabel: "enter",
                                    navigateText: "gezinmek için",
                                    navigateUpKeyAriaLabel: "yukarı ok",
                                    navigateDownKeyAriaLabel: "aşağı ok",
                                    closeText: "kapatmak için",
                                    closeKeyAriaLabel: "escape"
                                }
                            }
                        }
                    },
                    ja_jp: {
                        translations: {
                            button: { buttonText: "検索", buttonAriaLabel: "検索" },
                            modal: {
                                displayDetails: "詳細リストを表示",
                                resetButtonTitle: "検索をリセット",
                                backButtonTitle: "検索を閉じる",
                                noResultsText: "一致する結果がありません",
                                footer: {
                                    selectText: "で選択",
                                    selectKeyAriaLabel: "Enter",
                                    navigateText: "で移動",
                                    navigateUpKeyAriaLabel: "上矢印",
                                    navigateDownKeyAriaLabel: "下矢印",
                                    closeText: "で閉じる",
                                    closeKeyAriaLabel: "Esc"
                                }
                            }
                        }
                    }
                }
            }
        }
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
