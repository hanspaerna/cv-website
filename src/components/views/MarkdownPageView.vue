<script setup lang="ts">
import {type Options} from "markdown-it";
import VueMarkdown from "vue-markdown-render";

defineProps(['markdownContent'])

const options: Options = { html: true };
</script>

<template>
  <div class="content">
    <VueMarkdown
        :source="markdownContent"
        :options="options"
    />
  </div>
</template>