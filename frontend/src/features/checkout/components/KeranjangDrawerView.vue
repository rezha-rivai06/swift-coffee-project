<template>
  <div>
    <!-- Overlay -->
    <div 
      class="cart-overlay" 
      :class="{ active: isCartOpen }"
      @click="closeCart"
    ></div>

    <!-- Drawer -->
    <div 
      class="cart-drawer" 
      :class="{ active: isCartOpen }"
    >
      <div class="cart-header">
        <h3>Keranjang Anda</h3>
        <button 
          id="close-cart-btn" 
          aria-label="Tutup Keranjang"
          @click="closeCart"
        >✕</button>
      </div>

      <!-- Tab Switcher -->
      <div class="cart-tab-switcher">
        <button 
          class="cart-tab" 
          :class="{ 'active-cart-tab': activeTab === 'takeaway' }" 
          @click="activeTab = 'takeaway'"
        >
          Takeaway
        </button>
        <button 
          class="cart-tab" 
          :class="{ 'active-cart-tab': activeTab === 'dinein' }" 
          @click="activeTab = 'dinein'"
        >
          Reservasi
        </button>
      </div>

      <!-- Items -->
      <div class="cart-items">
        <p v-if="filteredKeranjang.length === 0" style="padding: 24px; text-align: center; color: #888;">
          Belum ada pesanan untuk {{ activeTab === 'takeaway' ? 'Takeaway' : 'Reservasi' }}.
        </p>

        <div 
          v-for="(item, idx) in filteredKeranjang" 
          :key="idx" 
          class="cart-item"
        >
          <img :src="item.gambar" :alt="item.nama" class="cart-item-image" />
          <div class="cart-item-info">
            <h4 class="cart-item-name">{{ item.nama }}</h4>
            <span class="cart-item-price">{{ formatRupiah(item.hargaAngka) }}</span>
          </div>
            
          <div class="cart-item-actions">
            <div class="cart-item-quantity">
              <button class="qty-btn" @click="kurangiItem(item.nama, item.tipe)">-</button>
              <span class="qty-number">{{ item.jumlah }}</span>
              <button class="qty-btn" @click="tambahKeKeranjang(item, item.tipe)">+</button>
            </div>
            
            <button class="trash-btn" aria-label="Hapus" @click="hapusItem(item.nama, item.tipe)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="cart-footer">
        
        <!-- Form Takeaway -->
        <div v-if="activeTab === 'takeaway'" id="cart-takeaway-info" style="margin-bottom: 16px; padding: 12px; border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; font-size: 14px;">
          <label for="nama-pemesan-takeaway" style="display: block; margin-bottom: 6px; font-weight: 600; color: #333;">Nama Pemesan <span style="color:red">*</span></label>
          <input 
            type="text" 
            id="nama-pemesan-takeaway" 
            v-model="namaPemesan" 
            placeholder="Masukkan nama kamu" 
            style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-family: inherit; font-size: 14px; box-sizing: border-box; outline: none;"
          >
        </div>

        <!-- Rincian Dine-In -->
        <div v-if="activeTab === 'dinein'" id="cart-dinein-info" style="margin-bottom: 16px; padding: 12px; border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; font-size: 14px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: #333; font-weight: 500;">Nama Pemesan:</span>
            <strong style="font-weight: 700;">{{ reservasiInfo.nama || '-' }}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: #333; font-weight: 500;">Tanggal:</span>
            <strong style="font-weight: 700;">{{ reservasiInfo.tanggal || '-' }}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: #333; font-weight: 500;">Jam:</span>
            <strong style="font-weight: 700;">{{ reservasiInfo.jam || '-' }}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #333; font-weight: 500;">Jumlah Tamu:</span>
            <strong style="font-weight: 700;">{{ reservasiInfo.tamu || '-' }}</strong>
          </div>
        </div>

        <div class="cart-summary">
          <span class="summary-label">Total Pembayaran</span>
          <span class="summary-total">{{ formatRupiah(totalHarga) }}</span>
        </div>
        
        <button 
          type="button" 
          class="checkout-btn" 
          id="btn-cart" 
          :disabled="isProcessing"
          @click="checkout"
        >
          {{ isProcessing ? 'Memproses...' : 'Buat Pesanan' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
  isiKeranjang, 
  isCartOpen, 
  closeCart, 
  tambahKeKeranjang, 
  kurangiItem, 
  hapusItem, 
  hitungTotalHarga,
  reservasiInfo
} from '../../../stores/cartStore.js';
import { showToast } from '../../../components/shared/Toast.vue';

const activeTab = ref('takeaway');
const isProcessing = ref(false);

const namaPemesan = ref('');

const filteredKeranjang = computed(() => {
  return isiKeranjang.filter(item => (item.tipe || 'takeaway') === activeTab.value);
});

const totalHarga = computed(() => {
  return hitungTotalHarga(activeTab.value);
});

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString('id-ID');
}

async function checkout() {
  if (filteredKeranjang.value.length === 0) {
    showToast("Keranjang kamu masih kosong!");
    return;
  }

  if (activeTab.value === 'takeaway' && !namaPemesan.value.trim()) {
    showToast("Silakan masukkan nama pemesan untuk Takeaway!");
    return;
  }

  if (activeTab.value === 'dinein' && (!reservasiInfo.nama || !reservasiInfo.tanggal || !reservasiInfo.jam || !reservasiInfo.tamu)) {
    showToast("Silakan isi form reservasi di halaman utama terlebih dahulu!");
    return;
  }

  isProcessing.value = true;
  
  try {
    let request;
    let hasil;
    
    if (activeTab.value === 'takeaway') {
      request = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: namaPemesan.value,
          tipe: 'Takeaway',
          pesanan: filteredKeranjang.value
        })
      });
      hasil = await request.json();
    } else {
      request = await fetch('/api/buat-reservasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: reservasiInfo.nama,
          tanggal: reservasiInfo.tanggal,
          jam: reservasiInfo.jam,
          jumlahTamu: reservasiInfo.tamu,
          pesanan: filteredKeranjang.value
        })
      });
      hasil = await request.json();
    }
    
    if (hasil.linkWA || hasil.sukses) {
      if (hasil.linkWA) {
        window.open(hasil.linkWA, '_blank');
      }
      showToast("Pesanan berhasil dibuat (Checkout)!");
      
      closeCart();
    } else {
      showToast(hasil.pesan || hasil.error || "Gagal membuat pesanan. Coba lagi.");
    }
  } catch(error) {
     console.error('Checkout error:', error);
     showToast("Terjadi kesalahan");
  } finally {
     isProcessing.value = false;
  }
}
</script>

<style scoped>

.cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(22, 14, 10, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
}

.cart-overlay.active {
    opacity: 1;
    visibility: visible;
}

.cart-drawer {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 400px;
    max-width: 100%;
    background-color: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    flex-direction: column;
}

.cart-drawer.active {
    transform: translateX(0);
}

.cart-header {
    padding: 24px;
    border-bottom: 1px solid #e2dcd4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #efeeeb;
}

.cart-header h3 {
    margin: 0;
    font-family: "Playfair Display", serif;
    font-size: 24px;
    color: #1d0b00;
    font-weight: 700;
}

#close-cart-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #4e4540;
    transition: color 0.2s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

#close-cart-btn:hover {
    color: #1d0b00;
    transform: scale(1.1) rotate(90deg);
}

.cart-tab-switcher {
    display: flex;
    padding: 0 20px;
    margin-bottom: 16px;
    border-bottom: 1px solid #eee;
}

.cart-tab {
    flex: 1;
    padding: 12px 0;
    background: none;
    border: none;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #999;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;
}

.active-cart-tab {
    color: #d35400;
}

.active-cart-tab::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #d35400;
}

.cart-items {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #faf5f0;
}

.cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 12px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 12px;
}

.cart-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.cart-item-name {
    margin: 0;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #1d0b00;
    line-height: 1.2;
}

.cart-item-price {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #4e4540;
}

.cart-item-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #efeeeb;
    padding: 6px 14px;
    border-radius: 20px;
}

.qty-btn {
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 700;
    color: #1d0b00;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
}

.qty-btn:hover {
    opacity: 0.7;
}

.qty-number {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1d0b00;
    min-width: 16px;
    text-align: center;
}

.trash-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a59b95;
    transition: all 0.2s ease;
    border-radius: 50%;
}

.trash-btn:hover {
    color: #ff4757;
    background-color: rgba(255, 71, 87, 0.1);
}

.cart-footer {
    padding: 24px;
    background-color: white;
    border-top: 1px solid #e2dcd4;
    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.02);
}

.cart-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.summary-label {
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #4e4540;
}

.summary-total {
    font-family: "Playfair Display", serif;
    font-size: 22px;
    font-weight: 700;
    color: #1d0b00;
}

.checkout-btn {
    width: 100%;
    padding: 16px;
    background-color: #160e0a;
    color: white;
    border: none;
    border-radius: 12px;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.checkout-btn:hover {
    background-color: #3b2a21;
    transform: translateY(-2px);
}

/* Responsiveness on mobile */
@media (max-width: 480px) {
    .cart-drawer {
        width: 100%;
    }
}
</style>
