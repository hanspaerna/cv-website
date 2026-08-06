import { createApp } from 'vue'
import App from './App.vue'
import type {RouteRecordRaw} from "vue-router";
import { createRouter, createWebHistory } from 'vue-router'
import MarkdownPageView from "@/components/views/MarkdownPageView.vue";
import {loadFront} from "yaml-front-matter";

import MarkdownIt from "markdown-it";
import markdownItFrontMatterPlugin from "markdown-it-front-matter";

let routes: RouteRecordRaw[] = [];

const pagesRecord = import.meta.glob(
    "/src/assets/markdown/*.md",
    { base: "/src/assets/markdown/", query: '?raw', eager: true}
);

// add more markdown-it plugins here, couldn't make it working with VueMarkdown component
const markdownItWithPlugins = MarkdownIt()
    .use(markdownItFrontMatterPlugin, () => {});

// create ordered routes dynamically from md files
for (const [, value] of Object.entries(pagesRecord)) {
    // @ts-ignore
    const markdown = value.default;
    const yamlFrontMatter = loadFront(markdown);

    routes.push({
        path: yamlFrontMatter.route,
        name: yamlFrontMatter.title,
        component: MarkdownPageView,
        props: { markdownContent: markdownItWithPlugins.render(markdown), order: yamlFrontMatter.order }
    });
}

// @ts-ignore
routes.sort((a,b) => a.props.order - b.props.order);

const router = createRouter({
    history: createWebHistory(),
    routes,
})

console.log(routes);

createApp(App).use(router).mount('#app')