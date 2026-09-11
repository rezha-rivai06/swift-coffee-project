<script>
import { ref } from 'vue';

export const toastMessage = ref('');
export const isToastVisible = ref(false);
export const toastType = ref('default');
let toastTimeout = null;

export function showToast(message, duration = 3000, type = 'default') {
  toastMessage.value = message;
  toastType.value = type;
  isToastVisible.value = true;
  
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  
  toastTimeout = setTimeout(() => {
    isToastVisible.value = false;
  }, duration);
}
</script>

<script setup>
const msg = toastMessage;
const visible = isToastVisible;
const typeClass = toastType;
</script>

<template>
  <div class="toast-notif" :class="[{ show: visible }, typeClass]" id="toast-notif">
    <span id="toast-message">{{ msg }}</span>
  </div>
</template>

<style scoped>
.toast-notif {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background-color: #160e0a;
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
}

.toast-notif.success {
    background-color: #10b981;
}

.toast-notif.error {
    background-color: #ef4444;
}

.toast-notif.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

@media (max-width: 768px) {
    .toast-notif {
        top: 20px;
        transform: translateX(-50%) translateY(-100px) scale(0.9);
    }

    .toast-notif.show {
        transform: translateX(-50%) translateY(0) scale(1);
    }
}
</style>
