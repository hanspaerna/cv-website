<script setup lang="ts">
import MarkdownIt, {type Options} from "markdown-it";
import VueMarkdown from "vue-markdown-render";
import markdownItFrontMatter from "markdown-it-front-matter";
import { useHead } from '@unhead/vue'

const props = defineProps(['pageTitle', 'markdownContent'])

const frontMatterPlugin = (vueMarkdownItInstance: MarkdownIt) => {
  vueMarkdownItInstance.use(markdownItFrontMatter, () => {});
};

const plugins = [
    frontMatterPlugin
];

const options: Options = { html: true, typographer: true };

useHead({
  title: props.pageTitle,
});
</script>

<template>
  <div class="content">
    <VueMarkdown
        :source="markdownContent"
        :options="options"
        :plugins="plugins"
        class="markdown"
    />
  </div>
</template>