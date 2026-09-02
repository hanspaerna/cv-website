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


const windowContext = (window as any).config;

const firstName = windowContext.VITE_FIRST_NAME ?? import.meta.env.VITE_FIRST_NAME;
const lastName = windowContext.VITE_LAST_NAME ?? import.meta.env.VITE_LAST_NAME;
const occupation = windowContext.VITE_OCCUPATION ?? import.meta.env.VITE_OCCUPATION;
const city = windowContext.VITE_CITY ?? import.meta.env.VITE_CITY;
const phone = windowContext.VITE_PHONE ?? import.meta.env.VITE_PHONE;
const email = windowContext.VITE_EMAIL ?? import.meta.env.VITE_EMAIL;
const github = windowContext.VITE_GITHUB ?? import.meta.env.VITE_GITHUB;
const linkedIn = windowContext.VITE_LINKEDIN ?? import.meta.env.VITE_LINKEDIN;
</script>

<template>
  <main>
    <canvas class="bg-triangles overflow-hidden" id="stage"></canvas>
    <div class="absolute w-full overflow-y-scroll h-full">
      <div class="box">
        <div class="container">
          <HeaderLogo :firstName="firstName" :lastName="lastName" :occupation="occupation" />
          <HeaderContacts :city="city" :phone="phone" :email="email" :linkedIn="linkedIn" :github="github" />
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