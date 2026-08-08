<script setup lang="ts">
import {type RouteRecordRaw, useRouter} from 'vue-router'
import {computed} from "vue";
const router = useRouter();

const menuRoutes = computed(() => {
  return router.options.routes.filter((route) => {
    // @ts-ignore
    return route.props?.menu
  });
})
</script>

<template>
  <div class="topmenu">
    <span v-for="route in menuRoutes" :key="route.name" class="grow text-center">
      <router-link :to="route.path">
        {{ typeof route.name === "string" ? `/> ${route.name.toLowerCase()}` : '/> untitled' }}
      </router-link>
    </span>
  </div>
</template>