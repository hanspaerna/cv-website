<script setup lang="ts">
import type {Options} from "markdown-it";
import VueMarkdown from "vue-markdown-render";

const options: Options = { html: true };
</script>

<script lang="ts">
const response = await fetch('/markdown/CV.md');
const actualData = await response.text();

const markdownContent: string = actualData;
</script>

<template>
  <div class="content">
    <VueMarkdown
        :source="markdownContent"
        :options="options"
    />
  </div>
</template>