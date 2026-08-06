<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter();
</script>

<template>
  <div class="topmenu">
    <router-link v-for="route in router.options.routes" :key="route.name" :to="route.path" class="grow text-center">
      {{ typeof route.name === "string" ? `/> ${route.name.toLowerCase()}` : '/> untitled' }}
    </router-link>
  </div>
</template>