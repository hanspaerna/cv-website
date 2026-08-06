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
    // @ts-ignore
    const markdown = value.default;
    const yamlMetadata = loadFront(markdown);

    routes.push({
        path: yamlMetadata.route,
        name: yamlMetadata.title,
        component: MarkdownPageView,
        props: { markdownContent: markdown, order: yamlMetadata.order }
    });
}

// @ts-ignore
routes.sort((a,b) => a.props.order - b.props.order);

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')