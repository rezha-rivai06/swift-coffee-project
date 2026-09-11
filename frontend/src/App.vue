<script setup>
import Toast from './components/shared/Toast.vue';
import Network from './components/shared/Network.vue';
</script>

<template>
  <Network />
  <Toast />
  <router-view/>
</template>
