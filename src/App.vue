<script setup lang="ts">
import {onMounted} from "vue";
import {buildTriangleBackground, startTriangleAnimation} from "@/lib/triangle-lib.ts";
import HeaderTitle from "@/components/HeaderTitle.vue";
import HeaderContacts from "@/components/HeaderContacts.vue";
import TopMenu from "@/components/TopMenu.vue";
import Footer from "@/components/Footer.vue";

onMounted(() => {
  const stage = document.getElementById('stage');

  if (stage) {
    buildTriangleBackground(stage);
    startTriangleAnimation(stage.querySelectorAll('.tri'));
  }
});
</script>

<template>
  <main>
    <div class="bg-triangles overflow-hidden" id="stage"></div>
    <div class="absolute w-full overflow-y-scroll h-full">
      <div class="box">
        <div class="container">
          <HeaderTitle />
          <HeaderContacts />
          <TopMenu />
          <div class="content">
            <RouterView />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </main>
</template>