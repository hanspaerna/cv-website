import { createApp } from 'vue'
import App from './App.vue'
import type {RouteRecordRaw} from "vue-router";
import { createRouter, createWebHistory } from 'vue-router'
import MarkdownPageView from "@/components/views/MarkdownPageView.vue";
import {createPageMarkdown, type PageMarkdown} from "@/lib/markdown-lib.ts";

let routes: RouteRecordRaw[] = [];

const pagesRecord = import.meta.glob(
    "/src/assets/markdown/*.md",
    { base: "/src/assets/markdown/", query: '?raw', eager: true}
);

// create ordered routes dynamically from md files
for (const [filename, value] of Object.entries(pagesRecord)) {
    let pageMarkdown: PageMarkdown;

    try {
        pageMarkdown = createPageMarkdown((value as any).default);
    } catch (e) {
        console.warn('[markdown-lib] ' + e);
        console.warn(
            `Skipping creation of a route from a markdown file ${filename} that contains invalid front matter metadata`
        );
        continue;
    }

    routes.push({
        path: pageMarkdown.route,
        name: pageMarkdown.title,
        component: MarkdownPageView,
        props: { markdownContent: pageMarkdown.content, menu: pageMarkdown.menu, menuOrder: pageMarkdown.menuOrder }
    });
}

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

createApp(App).use(router).mount('#app')