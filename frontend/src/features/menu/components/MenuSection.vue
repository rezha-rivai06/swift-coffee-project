<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { totalItemKeranjang, openCart, tambahKeKeranjang } from '../../../stores/cartStore.js';
import { showToast } from '../../../components/shared/Toast.vue';

const ambilsemuakartu = ref([]);

onMounted(async () => {
  try {
    const request = await fetch('/api/menu');
    if (request.ok) {
      const data = await request.json();
      ambilsemuakartu.value = data.map(item => {
        const angka = parseInt(item.harga.replace(/[^0-9]/g, ''), 10) || 0;
        const teksFormat = angka.toLocaleString('id-ID'); // -> "28.000"
        
        return {
          ...item,
          hargaAngka: angka,
          hargaTeks: 'IDR ' + teksFormat
        };
      });
    }
  } catch (error) {
    console.error("Gagal mengambil data menu dari API:", error);
  }
});

const batasTampil = ref(4);
const searchbox = ref('');
const pencarianAktif = ref(''); 
const pesanKosong = ref(false);
const pesanTeks = ref('Maaf, menu tidak ditemukan!');
const kategoriAktif = ref('makanan');
const subKategoriDitemukan = ref('berat');
const btnBestseller = ref(false);
const btnIced = ref(false);

const subMinumanRef = ref(null);
const subMakananRef = ref(null);
const subSnackRef = ref(null);

const slidingStyleMinuman = ref({ width: '0px', height: '0px', left: '0px', top: '0px' });
const slidingStyleMakanan = ref({ width: '0px', height: '0px', left: '0px', top: '0px' });
const slidingStyleSnack = ref({ width: '0px', height: '0px', left: '0px', top: '0px' });


function geserKotakHitam(kategori) {
  let subMenuAktif;
  let slidingStyle;
  
  if (kategori === 'minuman') { subMenuAktif = subMinumanRef.value; slidingStyle = slidingStyleMinuman; }
  if (kategori === 'makanan') { subMenuAktif = subMakananRef.value; slidingStyle = slidingStyleMakanan; }
  if (kategori === 'snack')   { subMenuAktif = subSnackRef.value;   slidingStyle = slidingStyleSnack; }

  if (!subMenuAktif) return;
  
  const tombolAktif = subMenuAktif.querySelector(".pilihan-1.active");
  if (tombolAktif) {
    slidingStyle.value = {
      width: tombolAktif.offsetWidth + "px",
      height: tombolAktif.offsetHeight + "px",
      left: tombolAktif.offsetLeft + "px",
      top: tombolAktif.offsetTop + "px"
    };
  }
}


const kartuYangDitampilkan = computed(() => {
  const teksDiketik = pencarianAktif.value.trim().toLowerCase();
  
  return ambilsemuakartu.value.filter(kartu => {
  
    if (teksDiketik !== '') {
      return kartu.nama.toLowerCase().includes(teksDiketik);
    }

    if (kartu.kategori !== kategoriAktif.value) return false;
    
    // Filter Best Seller & Iced
    if (btnBestseller.value && kartu.badge !== 'BEST SELLER') return false;
    if (btnIced.value && kartu.sub !== 'iced coffee') return false;

    // Filter Sub Menu (jika tidak sedang klik Best Seller / Iced)
    if (!btnBestseller.value && !btnIced.value && subKategoriDitemukan.value !== '') {
      if (kartu.sub !== subKategoriDitemukan.value) return false;
    }

    return true;
  });
});

// Menghitung jumlah relevan untuk tombol Lihat Semua
const totalRelevan = computed(() => kartuYangDitampilkan.value.length);
const menuTerpotong = computed(() => {
  if (btnBestseller.value || btnIced.value) {
    return kartuYangDitampilkan.value;
  }
  return kartuYangDitampilkan.value.slice(0, batasTampil.value);
});


watch(kartuYangDitampilkan, (baru) => {
  if (baru.length === 0) {
    pesanKosong.value = true;
    if (pencarianAktif.value.trim() !== '') {
      pesanTeks.value = 'Maaf, menu tidak ditemukan!';
    } else if (btnBestseller.value) {
      pesanTeks.value = 'Maaf, best seller tidak tersedia di kategori ini.';
    } else if (btnIced.value) {
      pesanTeks.value = 'Maaf, menu iced tidak tersedia di kategori ini.';
    }
  } else {
    pesanKosong.value = false;
  }
});

// Memperbarui posisi slider ketika kategori aktif berubah
watch([kategoriAktif, subKategoriDitemukan], () => {
  nextTick(() => {
    geserKotakHitam(kategoriAktif.value);
  });
});


onMounted(() => {
  window.isiKeranjang = window.isiKeranjang || [];
  
  window.addEventListener("resize", () => {
    geserKotakHitam(kategoriAktif.value);
  });

  setTimeout(() => {
    geserKotakHitam('makanan');
  }, 100);
});

function saringKartuMenu(kategoriUtama, subKategori) {
  searchbox.value = ""; 
  pencarianAktif.value = "";
  btnBestseller.value = false;
  btnIced.value = false;
  
  kategoriAktif.value = kategoriUtama;
  subKategoriDitemukan.value = subKategori;
  batasTampil.value = 4;
}

function klikKategori(kategoriUtama) {
  let defaultSub = '';
  if (kategoriUtama === 'minuman') defaultSub = 'signature';
  if (kategoriUtama === 'makanan') defaultSub = 'berat';
  if (kategoriUtama === 'snack') defaultSub = 'gorengan';
  saringKartuMenu(kategoriUtama, defaultSub);
}

function input(e) {
  if (searchbox.value === "") {
     pencarianAktif.value = "";
     klikKategori('makanan'); 
  }
}

function Enter(e) {
  if (searchbox.value.trim() === "") {
    pencarianAktif.value = "";
    return;
  }
  
  pencarianAktif.value = searchbox.value;
  const teksDiketik = searchbox.value.trim().toLowerCase();
  
  const ditemukan = ambilsemuakartu.value.find(k => k.nama.toLowerCase().includes(teksDiketik));
  
  if (ditemukan) {
    kategoriAktif.value = ditemukan.kategori;
    subKategoriDitemukan.value = ditemukan.sub;
  } else {
    kategoriAktif.value = '';
    subKategoriDitemukan.value = '';
  }
}

function klikBestSeller() {
  searchbox.value = "";
  pencarianAktif.value = "";
  if (btnBestseller.value) {
    btnBestseller.value = false;
  } else {
    btnBestseller.value = true;
    btnIced.value = false;
  }
  batasTampil.value = 4;
}

function klikIced() {
  searchbox.value = "";
  pencarianAktif.value = "";
  if (btnIced.value) {
    btnIced.value = false;
  } else {
    btnBestseller.value = false;
    btnIced.value = true;
  }
  batasTampil.value = 4;
}

function klikLihatSemuaBtn() {
  if (batasTampil.value >= totalRelevan.value) {
    batasTampil.value = 4;
  } else {
    batasTampil.value += 4;
  }
}


function updateBadgeKeranjang() {
  const badgekeranjang = document.getElementById("cart-badge");
  const humbergerbadge = document.getElementById("humberger-badge");
  if (badgekeranjang && humbergerbadge) {
    badgekeranjang.innerText = window.isiKeranjang.length;
    humbergerbadge.innerText = window.isiKeranjang.length;
    if (window.isiKeranjang.length > 0) {
      badgekeranjang.classList.remove("hidden");
      humbergerbadge.classList.remove("hidden");
    } else {
      badgekeranjang.classList.add("hidden");
      humbergerbadge.classList.add("hidden");
    }
  }
}

function klikTambahKeranjang(kartu) {
  tambahKeKeranjang(kartu, "takeaway");
  showToast(kartu.nama + " dimasukkan ke keranjang");
}
</script>

<template>
  <section class="menu" id="menu">
    <div class="title-kategori-wrapper">
      <span class="kategori-1">Cari Menu</span>
      <span class="kategori-2">Cari menu best seller, iced, sampai menu favorite mu...</span>

      <div role="search">
        <form @submit.prevent>
          <input 
            type="search" 
            id="search" 
            placeholder="Cari menu.." 
            v-model="searchbox"
            @input="input"
            @keydown.enter.prevent="Enter"
          />
        </form>
      </div>

      <div class="kategori-wrapper">
        <a class="kategori-3" :class="{ 'active-kategori': kategoriAktif === 'makanan' }" href="#" @click.prevent="klikKategori('makanan')">Makanan</a>
        <a class="kategori-4" :class="{ 'active-kategori': kategoriAktif === 'minuman' }" href="#" @click.prevent="klikKategori('minuman')">Minuman</a>
        <a class="kategori-5" :class="{ 'active-kategori': kategoriAktif === 'snack' }" href="#" @click.prevent="klikKategori('snack')">Snack</a>
      </div>

      <div class="sub-menu-wrapper">
        <!-- Sub-menu Minuman -->
        <div class="pilihan sub-menu" :class="{ hidden: kategoriAktif !== 'minuman' }" ref="subMinumanRef">
          <div class="sliding-highlight" :style="slidingStyleMinuman"></div>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'signature' }" @click.prevent="saringKartuMenu('minuman', 'signature')"><span>Signature</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'non coffee' }" @click.prevent="saringKartuMenu('minuman', 'non coffee')"><span>Non Coffee</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'iced coffee' }" @click.prevent="saringKartuMenu('minuman', 'iced coffee')"><span>Iced Coffee</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'hot coffee' }" @click.prevent="saringKartuMenu('minuman', 'hot coffee')"><span>Hot Coffee</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'tea' }" @click.prevent="saringKartuMenu('minuman', 'tea')"><span>Tea</span></a>
        </div>

        <!-- Sub-menu Makanan -->
        <div class="pilihan sub-menu" :class="{ hidden: kategoriAktif !== 'makanan' }" ref="subMakananRef">
          <div class="sliding-highlight" :style="slidingStyleMakanan"></div>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'berat' }" @click.prevent="saringKartuMenu('makanan', 'berat')"><span>Makanan Berat</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'pasta' }" @click.prevent="saringKartuMenu('makanan', 'pasta')"><span>Pasta</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'sampingan' }" @click.prevent="saringKartuMenu('makanan', 'sampingan')"><span>Sampingan</span></a>
        </div>

        <!-- Sub-menu Snack -->
        <div class="pilihan sub-menu" :class="{ hidden: kategoriAktif !== 'snack' }" ref="subSnackRef">
          <div class="sliding-highlight" :style="slidingStyleSnack"></div>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'gorengan' }" @click.prevent="saringKartuMenu('snack', 'gorengan')"><span>Gorengan</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'dimsum' }" @click.prevent="saringKartuMenu('snack', 'dimsum')"><span>Dimsum</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'manis' }" @click.prevent="saringKartuMenu('snack', 'manis')"><span>Manis</span></a>
          <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'risoles' }" @click.prevent="saringKartuMenu('snack', 'risoles')"><span>Risoles</span></a>
        </div>

        <!-- Filter Buttons: Best Seller & Iced -->
        <div class="best-seller-iced" v-show="pencarianAktif.trim() === ''">
          <a href="#" class="best-seller" :class="{ active: btnBestseller }" @click.prevent="klikBestSeller">Best Seller</a>
          <a href="#" class="iced" :class="{ active: btnIced }" @click.prevent="klikIced">Iced</a>
        </div>

        <!-- Pesan Jika Kosong -->
        <div class="empty-state" v-if="pesanKosong">
          <p>{{ pesanTeks }}</p>
        </div>

        <div class="kartu-menu" id="menu-container" v-else>
          <div 
            class="kartu-menu-1" 
            v-for="kartu in menuTerpotong" 
            :key="kartu.nama"
            :data-kategori="kartu.kategori"
            :data-sub="kartu.sub"
          >
            <div class="kartu-gambar">
              <img :src="kartu.gambar" :alt="kartu.nama" @load="$event.target.parentElement.classList.add('loaded')" />
              <span v-if="kartu.badge" class="kartu-badge" :class="kartu.badgeClass">{{ kartu.badge }}</span>
            </div>
            <div class="kartu-info">
              <h3 class="kartu-nama">{{ kartu.nama }}</h3>
              <p class="kartu-desk">{{ kartu.deskripsi }}</p>
              <div class="kartu-bawah">
                <span class="kartu-harga">{{ kartu.hargaTeks }}</span>
                <button class="kartu-btn" type="button" @click.prevent="klikTambahKeranjang(kartu)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        v-show="totalRelevan > 4 && !btnBestseller && !btnIced && pencarianAktif.trim() === '' && !pesanKosong"
        class="lihat-semua" 
        id="btn-lihat-semua" 
        type="button" 
        style="margin-top: 40px;"
        @click="klikLihatSemuaBtn"
      >
        {{ batasTampil >= totalRelevan ? 'Lihat Lebih Sedikit' : 'Lihat Semua Menu' }}
      </button>
    </div>
  </section>
</template>
