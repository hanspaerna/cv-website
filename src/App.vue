<script setup lang="ts">
import {animate, stagger} from 'animejs';
import {onMounted} from "vue";
import {buildTriangleBackground} from "@/utils/triangle-bg.ts";

onMounted(() => {
  const stage = document.getElementById('stage');

  if (stage) {
    buildTriangleBackground(stage);
  }

  animate('.tri', {
    x: 320,
    rotate: { from: -180 },
    duration: 1250,
    delay: stagger(65, { from: 'center' }),
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
          <div class="logo">
            <h1>Hans Pärna</h1>
            <h4>Senior Backend Engineer & DevOps</h4>
          </div>
          <div class="contacts shadow-deus shadow-primary inset-shadow-deus inset-shadow-primary">
            <p>+49 888 88-888-88</p>
            <p>hans.paerna@tsal.al</p>
            <p>LinkedIn</p>
            <p>Github</p>
          </div>
          <div class="topmenu shadow-deus shadow-primary inset-shadow-deus inset-shadow-primary">
            <div class="grow text-center">
              /> about
            </div>
            <div class="grow text-center">
              /> projects
            </div>
            <div class="grow text-center">
              /> cv
            </div>
          </div>
          <div class="content shadow-deus shadow-primary inset-shadow-deus inset-shadow-primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <div class="square">x</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>