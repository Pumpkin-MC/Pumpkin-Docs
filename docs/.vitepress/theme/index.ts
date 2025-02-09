// https://vitepress.dev/guide/custom-theme
import { inBrowser } from 'vitepress';
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import FmtDateTime from '../components/FmtDateTime.vue';
import './style.css';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        });
    },
    enhanceApp({ app, router, siteData }) {
        if (inBrowser) {
            app.config.globalProperties.$numberFormatter = new Intl.NumberFormat(navigator.languages);
            app.config.globalProperties.$dateTimeFormatter = new Intl.DateTimeFormat(navigator.languages, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
            });
            app.component('FmtDateTime', FmtDateTime);
        }
    },
} satisfies Theme;
