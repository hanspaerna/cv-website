<script setup lang="ts">
import {onMounted} from "vue";
import {initializeTriangles, TRI_H, TRI_W} from "@/lib/triangle-lib.ts";
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
    <svg style="display: none;">
      <defs>
        <polygon id="triangleUp" :points="`0,${TRI_H} ${TRI_W/2},0 ${TRI_W},${TRI_H}`" />
      </defs>
    </svg>
    <svg style="display: none;">
      <defs>
        <polygon id="triangleDown" :points="`0,0 ${TRI_W},0 ${TRI_W/2},${TRI_H}`" />
      </defs>
    </svg>
    <div class="bg-triangles overflow-hidden" id="stage"></div>
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