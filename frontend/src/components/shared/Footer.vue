<script setup>
import { ref, defineAsyncComponent } from 'vue';
const AdminLoginModal = defineAsyncComponent(() => import('../../features/auth/components/AdminLoginModal.vue'));

const showAdminLogin = ref(false);
</script>

<template>
  <footer style="text-align: center; padding: 20px; font-size: 10px; color: #685f59;">
    <span id="staff-login" style="cursor: pointer;" @click="showAdminLogin = true"> SwiftCafe &copy; 2025. ☕</span>
  </footer>

  <AdminLoginModal :buka="showAdminLogin" @close="showAdminLogin = false" />
</template>
