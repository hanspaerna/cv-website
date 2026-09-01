<script setup lang="ts">
defineProps({
  firstName: String,
  lastName: String,
  occupation: String,
})
</script>

<template>
  <div class="logo text-shadow-lg text-shadow-black">
    <h1>{{ firstName }} &#73800; {{ lastName }}</h1>
    <h4>{{ occupation }}</h4>
  </div>
</template>