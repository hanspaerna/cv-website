<script setup lang="ts">
import {onMounted} from "vue";
import {initializeTriangles} from "@/lib/triangle-lib.ts";
import HeaderLogo from "@/components/HeaderLogo.vue";
import HeaderContacts from "@/components/HeaderContacts.vue";
import TopMenu from "@/components/TopMenu.vue";
import Footer from "@/components/Footer.vue";

onMounted(() => {
  initializeTriangles();
});
</script>

<template>
  <main>
    <canvas class="bg-triangles overflow-hidden" id="stage"></canvas>
    <div class="absolute w-full overflow-y-scroll h-full">
      <div class="box">
        <div class="container">
          <HeaderLogo />
          <HeaderContacts />
          <TopMenu />
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :key="$route.path" :is="Component" />
            </transition>
          </router-view>
          <Footer />
        </div>
      </div>
    </div>
  </main>
</template>