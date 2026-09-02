import { createApp } from 'vue'
import App from './App.vue'
import type {RouteRecordRaw} from "vue-router";
import { createRouter, createWebHistory } from 'vue-router'
import MarkdownPageView from "@/components/views/MarkdownPageView.vue";
import {createPageMarkdown, type PageMarkdown} from "@/lib/markdown-lib.ts";
import { createHead } from '@unhead/vue/client'

let routes: RouteRecordRaw[] = [];
let rawMarkdowns: {filename: string, value: string}[] = [];

if (import.meta.env.DEV) {
    const pagesRecord = import.meta.glob(
        "/src/assets/markdown-demo/*.md",
        { base: "/src/assets/markdown-demo/", query: '?raw', eager: true}
    );

    for (const [filename, value] of Object.entries(pagesRecord)) {
        rawMarkdowns.push({filename, value: (value as any).default});
    }
} else {
    const response = await fetch("/md/");
    const results = await response.json();

    for (let i = 0; i < results.length; i++) {
        const mdResponse = await fetch('/md/' + results[i].name);
        const text = await mdResponse.text();
        rawMarkdowns.push({filename: results[i].name, value: text});
    }
}

// create ordered routes dynamically from md files
rawMarkdowns.forEach((rawMarkdown) => {
    let pageMarkdown: PageMarkdown;

    try {
        pageMarkdown = createPageMarkdown(rawMarkdown.value);
    } catch (e) {
        console.warn('[markdown-lib] ' + e);
        console.warn(
            `Skipping creation of a route from a markdown file ${rawMarkdown.filename} that contains invalid front matter metadata`
        );
        return;
    }

    routes.push({
        path: pageMarkdown.route,
        name: pageMarkdown.title,
        component: MarkdownPageView,
        props: {
            pageTitle: pageMarkdown.title,
            markdownContent: pageMarkdown.content,
            menu: pageMarkdown.menu,
            menuOrder: pageMarkdown.menuOrder
        }
    });
});

routes.sort((a,b) => {
    if (a.props && b.props) {
        return (a.props as any).menuOrder - (b.props as any).menuOrder;
    }

    return 0;
});

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const windowContext = (window as any).config;

const head = createHead({
    init: [
        {
            title: '',
            titleTemplate: `%s | ${windowContext.VITE_FIRST_NAME ?? import.meta.env.VITE_FIRST_NAME} ${windowContext.VITE_LAST_NAME ?? import.meta.env.VITE_LAST_NAME}`,
            htmlAttrs: { lang: 'en' }
        },
    ]
});

createApp(App).use(router).use(head).mount('#app');