import { createApp } from 'vue'
import App from './App.vue'
import type {RouteRecordRaw} from "vue-router";
import { createRouter, createWebHistory } from 'vue-router'
import MarkdownPageView from "@/components/views/MarkdownPageView.vue";
import {loadFront} from "yaml-front-matter";

let routes: RouteRecordRaw[] = [];

const pagesRecord = import.meta.glob(
    "/src/assets/markdown/*.md",
    { base: "/src/assets/markdown/", query: '?raw', eager: true}
);

// create ordered routes dynamically from md files
for (const [, value] of Object.entries(pagesRecord)) {
    const markdown = (value as any).default;
    const yamlMetadata = loadFront(markdown);

    routes.push({
        path: yamlMetadata.route,
        name: yamlMetadata.title,
        component: MarkdownPageView,
        props: { markdownContent: markdown, order: yamlMetadata.order }
    });
}

routes.sort((a,b) => {
    if (a.props && b.props) {
        return (a.props as any).order - (b.props as any).order;
    }

    return 0;
});

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')