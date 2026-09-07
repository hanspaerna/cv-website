<script setup lang="ts">
import BaragCuneiformIcon from "@/components/icons/BaragCuneiformIcon.vue";

defineProps({
  firstName: String,
  lastName: String,
  occupation: String,
})
</script>

<template>
  <div class="logo text-shadow-lg text-shadow-black">
    <h1>{{ firstName }} <BaragCuneiformIcon class="cuneiform-barag mx-1" /> {{ lastName }}</h1>
    <h4>{{ occupation }}</h4>
  </div>
</template>