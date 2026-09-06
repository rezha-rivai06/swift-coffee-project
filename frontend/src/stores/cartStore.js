import { reactive, computed, ref, watch } from 'vue';
import { showToast } from '../components/shared/Toast.vue';

const CART_STORAGE_KEY = 'swift_coffee_cart';
const RESERVATION_STORAGE_KEY = 'swift_coffee_reservation';

function loadFromStorage(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} dari localStorage`, error);
    return defaultValue;
  }
}

export const isiKeranjang = reactive(loadFromStorage(CART_STORAGE_KEY, []));
export const isCartOpen = ref(false);

export const reservasiInfo = reactive(loadFromStorage(RESERVATION_STORAGE_KEY, {
  nama: '',
  tanggal: '',
  jam: '',
  tamu: ''
}));


watch(isiKeranjang, (item) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(item));
}, { deep: true });

watch(reservasiInfo, (info) => {
  localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(info));
}, { deep: true });


export function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}
export function openCart() {
  isCartOpen.value = true;
}
export function closeCart() {
  isCartOpen.value = false;
}

export const totalItemKeranjang = computed(() => {
  return isiKeranjang.reduce((total, item) => total + (item.jumlah || 1), 0);
});

export function tambahKeKeranjang(barang, tipe = 'takeaway') {
  const itemAda = isiKeranjang.find((item) => item.nama === barang.nama && (item.tipe || 'takeaway') === tipe
  );

  if (itemAda) {
    itemAda.jumlah = (itemAda.jumlah || 1) + 1;
  } else {
    isiKeranjang.push({ ...barang, jumlah: 1, tipe });
  }
}


export function kurangiItem(namaBarang, tipe) {
  const item = isiKeranjang.find(
    (item) => item.nama === namaBarang && (item.tipe || 'takeaway') === tipe
  );
  
  if (item) {
    if (item.jumlah === 1) {
      showToast("Jumlah item minimum tercapai");
    } else {
      item.jumlah--;
    }
  }
}


export function hapusItem(namaBarang, tipe) {
  const index = isiKeranjang.findIndex(
    (item) => item.nama === namaBarang && (item.tipe || 'takeaway') === tipe
  );
  if (index !== -1) {
    isiKeranjang.splice(index, 1);
  }
}


export function hitungTotalHarga(tipe) {
  const filteredKeranjang = isiKeranjang.filter((item) => (item.tipe || 'takeaway') === tipe);
  return filteredKeranjang.reduce((total, item) => {
    return total + (item.hargaAngka * item.jumlah);
  }, 0);
}
