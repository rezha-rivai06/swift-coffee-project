<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ReservasiTable from '../../features/reservasi/components/ReservasiTable.vue';
import MenuManager from '../../features/menu/components/MenuManager.vue';
import { showToast } from '../../components/shared/Toast.vue';

const router = useRouter();
const activeTab = ref('reservasi');

const logout = () => {
    localStorage.removeItem('adminToken');
    router.push('/');
}


onMounted(async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        showToast('Anda belum login sebagai admin, silahkan login terlebih dahulu');
        router.push('/');
        return;
    }

    try {
        
        const request = await fetch('/api/verify', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!request.ok) {
            localStorage.removeItem('adminToken');
            showToast('Token tidak valid atau kedaluwarsa. Silakan login ulang.');
            router.push('/');
        }
    } catch (error) {
        showToast('Gagal.');
        router.push('/');
    }
});
</script>

<template>
  <div class="admin-wrapper">
    <div class="admin-container">
      <!-- Bagian Header (Logo & Typography) -->
      <header class="admin-header">
          <h1 class="logo-text">Swift<span>Cafe</span> <span class="badge-admin">ADMIN</span></h1>
          <p class="subtitle">Kelola Reservasi dan menu dengan mudah</p>
          <button @click="logout" class="btn-batal" style="margin-top: 15px; font-size: 0.8rem; padding: 6px 12px;">Logout</button>
      </header>
      
      <nav class="admin-nav">
          <button 
            class="nav-btn" 
            :class="{ active: activeTab === 'reservasi' }" 
            @click="activeTab = 'reservasi'">
            Reservasi Meja
          </button>
          <button 
            class="nav-btn" 
            :class="{ active: activeTab === 'menu' }" 
            @click="activeTab = 'menu'">
            Manajemen Menu
          </button>
      </nav>

      <ReservasiTable v-if="activeTab === 'reservasi'" />
      <MenuManager v-if="activeTab === 'menu'" />
    </div>
  </div>
</template>

<style scoped>
/* Reset & Variables Lokal untuk Admin */
.admin-wrapper {
    font-family: 'Outfit', sans-serif;
    background-color: #f3f4f6;
    color: #111827;
    min-height: 100vh;
    padding: 40px 20px;
}

.admin-container {
    max-width: 1000px;
    margin: 0 auto;
}

/* Header & Typography */
.admin-header {
    text-align: center;
    margin-bottom: 40px;
}

.logo-text {
    font-size: 2.8rem;
    font-weight: 800;
    letter-spacing: -1px;
    color: #1f1f1f;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.logo-text span:not(.badge-admin) {
    color: #D4A373; /* Accent color dari frontend */
}

.badge-admin {
    font-size: 0.9rem;
    background-color: #ef4444;
    color: white;
    padding: 6px 14px;
    border-radius: 8px;
    margin-left: 5px;
    letter-spacing: 2px;
    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.25);
}

.subtitle {
    color: #6b7280;
    font-weight: 300;
    margin-top: 5px;
}

/* TAB NAVIGASI */
.admin-nav {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 10px;
}
.nav-btn {
    background: none;
    border: none;
    font-size: 1.1rem;
    font-weight: 600;
    color: #9ca3af;
    cursor: pointer;
    padding: 8px 16px;
    transition: all 0.3s;
    border-radius: 8px;
}
.nav-btn:hover {
    color: #1f1f1f;
    background-color: rgba(22, 14, 10, 0.05);
}
.nav-btn.active {
    color: #1f1f1f;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-batal {
    background-color: transparent;
    color: #ef4444;
    border: 1px solid #ef4444;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-batal:hover {
    background-color: rgba(239, 68, 68, 0.1);
}

@media screen and (max-width: 768px) {
    .admin-wrapper { padding: 20px 10px; }
    .admin-header { margin-bottom: 25px; }
    .logo-text { font-size: 1.8rem; flex-wrap: wrap; gap: 8px; }
    .badge-admin { font-size: 0.75rem; padding: 4px 10px; }
    .admin-nav { flex-direction: column; gap: 10px; }
    .nav-btn { width: 100%; }
}
</style>
