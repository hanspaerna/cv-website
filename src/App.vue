<script setup lang="ts">
import {animate, stagger} from 'animejs';
import {onMounted} from "vue";
import {buildTriangleBackground} from "@/utils/triangle-bg.ts";
import HeaderTitle from "@/components/HeaderTitle.vue";
import HeaderContacts from "@/components/HeaderContacts.vue";
import TopMenu from "@/components/TopMenu.vue";
import Content from "@/components/Content.vue";

onMounted(() => {
  const stage = document.getElementById('stage');

  if (stage) {
    buildTriangleBackground(stage);
  }

  animate('.tri', {
    x: 320,
    rotate: { from: -180 },
    duration: 1250,
    delay: stagger(65, { from: 'first' }),
    ease: 'inOutQuint',
    loop: true,
    alternate: true
  });
});
</script>

<template>
  <main>
    <div class="bg-triangles overflow-hidden" id="stage"></div>
    <div class="absolute w-full">
      <div class="box">
        <div class="container">
          <HeaderTitle />
          <HeaderContacts />
          <TopMenu />
          <Content />
        </div>
      </div>
    </div>
  </main>
</template>