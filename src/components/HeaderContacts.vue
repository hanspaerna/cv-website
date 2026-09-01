<script setup lang="ts">
defineProps({
  city: String,
  phone: String,
  email: String,
  linkedIn: String,
  github: String,
})
</script>

<template>
  <div class="contacts flex justify-between flex-wrap">
    <div class="photo pl-30"></div>
    <div class="pl-5">
      <p>{{ city }}</p>
      <p><a :href="'tel:' + phone?.replace(/\s/g, '')">{{ phone }}</a></p>
      <p><a :href="'mailto:' + email">{{ email }}</a></p>
      <p><a :href="linkedIn" target="_blank">LinkedIn</a></p>
      <p><a :href="github" target="_blank">Github</a></p>
    </div>
  </div>
</template>