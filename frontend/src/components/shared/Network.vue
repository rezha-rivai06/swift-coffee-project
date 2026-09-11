<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { showToast } from './Toast.vue';

const offline = ref(!navigator.onLine);

function onlineStatus() {
  const isCurrentlyOffline = !navigator.onLine;
  offline.value = isCurrentlyOffline;
  
  if (isCurrentlyOffline) {
    showToast('Kamu sedang offline nih', 5000, 'error');
  } else {
    showToast('Yeayy.. koneksi kembali online!', 3000, 'success');
  }
}

onMounted(() => {
  window.addEventListener('online', onlineStatus);
  window.addEventListener('offline', onlineStatus);
});

onUnmounted(() => {
  window.removeEventListener('online', onlineStatus);
  window.removeEventListener('offline', onlineStatus);
});
</script>

<template>
  <div v-if="offline" class="network-overlay">
    <div class="network-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="1" y1="1" x2="23" y2="23"></line>
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
      <h3>Koneksi Terputus</h3>
      <p>kamu sedang offline. Mohon periksa jaringan internet kamu untuk melanjutkan pesanan.</p>
    </div>
  </div>
</template>

<style scoped>
.network-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ffffff;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
}

.network-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
}

.network-content svg {
  margin-bottom: 20px;
  width: 80px;
  height: 80px;
  stroke: #ef4444;
}

.network-content h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  color: #111827;
  margin: 0 0 10px 0;
}

.network-content p {
  font-family: 'Inter', sans-serif;
  color: #6b7280;
  line-height: 1.6;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .network-content svg {
    width: 60px;
    height: 60px;
  }
  
  .network-content h3 {
    font-size: 1.5rem;
  }
  
  .network-content p {
    font-size: 0.95rem;
  }
}
</style>
