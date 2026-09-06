<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { tambahKeKeranjang, openCart, reservasiInfo } from '../../../stores/cartStore.js';

const errTanggal = ref("");
const errTamu = ref(false);
const errJam = ref("");

const statusTeks = ref("");
const statusWarna = ref("black");
const reservasibtnText = ref("Cek Ketersediaan");
const reservasibtnDisabled = ref(false);

const resMenuAreaVisible = ref(false);

async function klikCekReservasi() {
  errTanggal.value = "";
  errTamu.value = false;
  errJam.value = "";
  
  let adaError = false;

  if (reservasiInfo.tanggal !== "") {
    const tanggalInput = new Date(reservasiInfo.tanggal);
    const tanggalHariIni = new Date();
    tanggalHariIni.setHours(0, 0, 0, 0);

    if (tanggalInput < tanggalHariIni) {
      errTanggal.value = "pilih waktu kedepan";
      adaError = true;
    } else {
      const batasMaksimal = new Date(tanggalHariIni);
      batasMaksimal.setDate(batasMaksimal.getDate() + 14);

      if (tanggalInput > batasMaksimal) {
        errTanggal.value = "batas maksimal reservasi hanya 14 hari kedepan";
        adaError = true;
      }
    }
  }

  if (reservasiInfo.tamu !== "") {
    const jumlahTamu = parseInt(reservasiInfo.tamu);
    if (jumlahTamu <= 0) {
      errTamu.value = true;
      adaError = true;
    }
  }

  if (reservasiInfo.jam !== "" && reservasiInfo.tanggal !== "") {
    const jamPisah = reservasiInfo.jam.split(":");
    const jamAngka = parseInt(jamPisah[0]);
    const hari = new Date(reservasiInfo.tanggal).getDay();

    if (hari === 1) {
      errTanggal.value = "Maaf, Cafe tutup setiap hari senin";
      adaError = true;
    } else if (hari >= 2 && hari <= 5) {
      if (jamAngka < 9 || jamAngka > 21) {
        errJam.value = "Jam operasional 09:00 - 22.00";
        adaError = true;
      }
    } else if (hari === 6 || hari === 0) {
      if (jamAngka < 9 || jamAngka > 22) {
        errJam.value = "Jam operasional Akhir Pekan 09:00 - 23:00";
        adaError = true;
      }
    }
  }

  if (adaError) {
    statusTeks.value = "";
    return;
  }

  if (reservasiInfo.nama === "" || reservasiInfo.tanggal === "" || reservasiInfo.tamu === "" || reservasiInfo.jam === "") {
    statusTeks.value = "Mohon lengkapi semua data reservasi terlebih dahulu.";
    statusWarna.value = "red";
    return;
  }

  try {
    reservasibtnText.value = "Mengecek...";
    reservasibtnDisabled.value = true;

    statusTeks.value = "Mengecek ketersediaan kursi...";
    statusWarna.value = "blue";

    await new Promise(r => setTimeout(r, 800));
    
    const dataCek = { tersedia: true }; 
    
    if (dataCek.tersedia === false) {
      statusTeks.value = dataCek.pesan || "Penuh";
      statusWarna.value = "red";
      return;
    }

    statusTeks.value = "Kursi tersedia! Silakan pilih menu di bawah lalu konfirmasi.";
    statusWarna.value = "green";

    resMenuAreaVisible.value = true;
    
    nextTick(() => {
       const resMenuAreaElement = document.getElementById("res-menu-area");
       if (resMenuAreaElement) resMenuAreaElement.scrollIntoView({ behavior: "smooth" });
       
       // Trigger init
       setTimeout(() => {
          geserKotakHitamRes(kategoriAktif.value);
       }, 50);
    });

  } catch (error) {
    console.error("Gagal terhubung ke API:", error);
    statusTeks.value = "Gagal terhubung ke server (Mock)";
    statusWarna.value = "red";
  } finally {
    reservasibtnText.value = "Cek Ketersediaan";
    reservasibtnDisabled.value = false;
  }
}


const ambilsemuakartu = ref([]);

onMounted(async () => {
  try {
    const request = await fetch('/api/menu');
    if (request.ok) {
      const data = await request.json();
      ambilsemuakartu.value = data.map(item => {
        const angka = parseInt(item.harga.replace(/[^0-9]/g, ''), 10) || 0;
        const teksFormat = angka.toLocaleString('id-ID');
        
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

const batasTampilRes = ref(4);
const searchbox = ref('');
const pencarianAktif = ref('');
const pesanKosongRes = ref(false);
const pesanTeks = ref('Maaf, menu reservasi tidak ditemukan!');
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

function geserKotakHitamRes(kategori) {
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
    if (btnBestseller.value && kartu.badge !== 'BEST SELLER') return false;
    if (btnIced.value && kartu.sub !== 'iced coffee') return false;
    if (!btnBestseller.value && !btnIced.value && subKategoriDitemukan.value !== '') {
      if (kartu.sub !== subKategoriDitemukan.value) return false;
    }
    return true;
  });
});

const totalRelevan = computed(() => kartuYangDitampilkan.value.length);
const menuTerpotong = computed(() => {
  if (btnBestseller.value || btnIced.value) {
    return kartuYangDitampilkan.value;
  }
  return kartuYangDitampilkan.value.slice(0, batasTampilRes.value);
});

watch(kartuYangDitampilkan, (baru) => {
  if (baru.length === 0) {
    pesanKosongRes.value = true;
    if (pencarianAktif.value.trim() !== '') {
      pesanTeks.value = 'Maaf, menu reservasi tidak ditemukan!';
    } else if (btnBestseller.value) {
      pesanTeks.value = 'Maaf, best seller tidak tersedia di kategori ini.';
    } else if (btnIced.value) {
      pesanTeks.value = 'Maaf, menu iced tidak tersedia di kategori ini.';
    }
  } else {
    pesanKosongRes.value = false;
  }
});

watch([kategoriAktif, subKategoriDitemukan], () => {
  if (!resMenuAreaVisible.value) return;
  nextTick(() => {
    geserKotakHitamRes(kategoriAktif.value);
  });
});

onMounted(() => {
  window.isiKeranjang = window.isiKeranjang || [];
  window.addEventListener("resize", () => {
    if (resMenuAreaVisible.value) {
      geserKotakHitamRes(kategoriAktif.value);
    }
  });
});

function saringKartuMenuRes(kategoriUtama, subKategori) {
  searchbox.value = ""; 
  pencarianAktif.value = "";
  btnBestseller.value = false;
  btnIced.value = false;
  
  kategoriAktif.value = kategoriUtama;
  subKategoriDitemukan.value = subKategori;
  batasTampilRes.value = 4;
}

function klikKategori(kategoriUtama) {
  let defaultSub = '';
  if (kategoriUtama === 'minuman') defaultSub = 'signature';
  if (kategoriUtama === 'makanan') defaultSub = 'berat';
  if (kategoriUtama === 'snack') defaultSub = 'gorengan';
  saringKartuMenuRes(kategoriUtama, defaultSub);
}

function testKetik() {
  if (searchbox.value === "") {
     pencarianAktif.value = "";
     klikKategori('makanan');
  }
}

function tekanEnter() {
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
  batasTampilRes.value = 4;
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
  batasTampilRes.value = 4;
}

function klikLihatSemuaBtn() {
  if (batasTampilRes.value >= totalRelevan.value) {
    batasTampilRes.value = 4;
  } else {
    batasTampilRes.value += 4;
  }
}

// Fungsi dihapus karena Navbar akan menangani ini secara reaktif

function klikTambahKeranjangDinein(kartu) {
  tambahKeKeranjang(kartu, "dinein");

  const toastContainer = document.getElementById("toast-notif");
  const pesantoast = document.getElementById("toast-message");
  if (toastContainer && pesantoast) {
    pesantoast.innerText = kartu.nama + " masuk keranjang";
    toastContainer.classList.add("show");

    setTimeout(function () {
      toastContainer.classList.remove("show");
    }, 2000);
  }
}

function klikCheckoutDinein() {
  if (reservasiInfo.nama === "" || reservasiInfo.tanggal === "" || reservasiInfo.tamu === "") {
    alert("Harap lengkapi data pemesanan terlebih dahulu");
    return;
  }

  // Buka drawer (KeranjangDrawer)
  openCart();
}

</script>

<template>
  <section class="contact reservasi" id="reservasi">
    <div class="kotak-besar res-kotak">
      <div class="k-kiri res-kiri">
        <span class="title-kiri">Reservasi</span>
        <p class="penjelasan" style="margin-bottom: 24px;">Nikmati momen terbaik Anda bersama kami. Amankan tempat sekarang untuk kumpul bersama teman atau keluarga, terutama di waktu sibuk.</p>
        
        <div style="margin-bottom: 16px;">
          <label for="res-nama" style="display: block; font-size: 14px; margin-bottom: 8px; color: black; font-weight: 500;">Nama Pemesan</label>
          <input type="text" id="res-nama" placeholder="Masukkan nama Anda" class="res-input" v-model="reservasiInfo.nama">
        </div>
        <div class="res-baris-dua">
          <div style="flex: 1;">
            <label for="res-tanggal" style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; color: black; font-weight: 500;">
              Tanggal <span id="err-tanggal" style="color: red; font-size: 12px;" v-if="errTanggal">{{ errTanggal }}</span>
            </label>
            <input type="date" id="res-tanggal" class="res-input" v-model="reservasiInfo.tanggal">
          </div>
          <div style="flex: 1;">
            <label for="res-jam" style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; color: black; font-weight: 500;">
              Jam Kedatangan <span id="err-jam" style="color: red; font-size: 12px;" v-if="errJam">{{ errJam }}</span>
            </label>
            <input type="time" id="res-jam" class="res-input" v-model="reservasiInfo.jam">
          </div>
          <div style="flex: 1;">
            <label for="res-tamu" style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; color: black; font-weight: 500;">
              Jumlah Tamu <span id="err-tamu" style="color: red; font-size: 12px;" v-if="errTamu">Input tidak valid</span>
            </label>
            <input type="number" id="res-tamu" min="1" placeholder="Angka" class="res-input" v-model="reservasiInfo.tamu">
          </div>
        </div>
        <p id="res-status" style="font-size: 14px; margin-bottom: 16px; font-weight: 500; height: 20px;" :style="{ color: statusWarna }">{{ statusTeks }}</p>
        <button id="btn-cek-reservasi" class="reservasi-btn" style="justify-content: center; width: 100%; padding: 16px;" @click.prevent="klikCekReservasi" :disabled="reservasibtnDisabled">
          {{ reservasibtnText }}
        </button>

        <!-- DINE-IN MENU AREA -->
        <div id="res-menu-area" v-show="resMenuAreaVisible" style="margin-top: 40px;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-bottom: 32px;">
            <span class="title-kiri" style="font-size: 22px; margin-bottom: 8px;">Pilih Menu Dine-In</span>
            <p class="penjelasan" style="margin-bottom: 0;">Tambahkan pesanan untuk meja Anda sebelum konfirmasi.</p>
          </div>

          <div role="search">
            <form style="display: flex; justify-content: center; width: 100%;" @submit.prevent>
              <input 
                type="search" 
                id="res-search" 
                placeholder="Cari menu reservasi.." 
                v-model="searchbox"
                @input="testKetik"
                @keydown.enter.prevent="tekanEnter"
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
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'signature' }" @click.prevent="saringKartuMenuRes('minuman', 'signature')"><span>Signature</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'non coffee' }" @click.prevent="saringKartuMenuRes('minuman', 'non coffee')"><span>Non Coffee</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'iced coffee' }" @click.prevent="saringKartuMenuRes('minuman', 'iced coffee')"><span>Iced Coffee</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'hot coffee' }" @click.prevent="saringKartuMenuRes('minuman', 'hot coffee')"><span>Hot Coffee</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'tea' }" @click.prevent="saringKartuMenuRes('minuman', 'tea')"><span>Tea</span></a>
            </div>

            <!-- Sub-menu Makanan -->
            <div class="pilihan sub-menu" :class="{ hidden: kategoriAktif !== 'makanan' }" ref="subMakananRef">
              <div class="sliding-highlight" :style="slidingStyleMakanan"></div>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'berat' }" @click.prevent="saringKartuMenuRes('makanan', 'berat')"><span>Makanan Berat</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'pasta' }" @click.prevent="saringKartuMenuRes('makanan', 'pasta')"><span>Pasta</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'sampingan' }" @click.prevent="saringKartuMenuRes('makanan', 'sampingan')"><span>Sampingan</span></a>
            </div>

            <!-- Sub-menu Snack -->
            <div class="pilihan sub-menu" :class="{ hidden: kategoriAktif !== 'snack' }" ref="subSnackRef">
              <div class="sliding-highlight" :style="slidingStyleSnack"></div>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'gorengan' }" @click.prevent="saringKartuMenuRes('snack', 'gorengan')"><span>Gorengan</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'dimsum' }" @click.prevent="saringKartuMenuRes('snack', 'dimsum')"><span>Dimsum</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'manis' }" @click.prevent="saringKartuMenuRes('snack', 'manis')"><span>Manis</span></a>
              <a href="#" class="pilihan-1" :class="{ active: subKategoriDitemukan === 'risoles' }" @click.prevent="saringKartuMenuRes('snack', 'risoles')"><span>Risoles</span></a>
            </div>

            <div class="best-seller-iced" v-show="pencarianAktif.trim() === ''">
              <a href="#" class="best-seller" :class="{ active: btnBestseller }" @click.prevent="klikBestSeller">Best Seller</a>
              <a href="#" class="iced" :class="{ active: btnIced }" @click.prevent="klikIced">Iced</a>
            </div>

            <div class="empty-state" v-if="pesanKosongRes">
              <p>{{ pesanTeks }}</p>
            </div>

            <div class="kartu-menu" id="res-menu-container" v-else>
              <div 
                class="kartu-menu-1" 
                v-for="kartu in menuTerpotong" 
                :key="kartu.nama"
                :data-kategori="kartu.kategori"
                :data-sub="kartu.sub"
              >
                <div class="kartu-gambar">
                  <img :src="kartu.gambar" :alt="kartu.nama" class="loaded" />
                  <span v-if="kartu.badge" class="kartu-badge" :class="kartu.badgeClass">{{ kartu.badge }}</span>
                </div>
                <div class="kartu-info">
                  <h3 class="kartu-nama">{{ kartu.nama }}</h3>
                  <p class="kartu-desk">{{ kartu.deskripsi }}</p>
                  <div class="kartu-bawah">
                    <span class="kartu-harga">{{ kartu.hargaTeks }}</span>
                    <button class="kartu-btn btn-add-dinein" type="button" @click.prevent="klikTambahKeranjangDinein(kartu)">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            v-show="totalRelevan > 4 && !btnBestseller && !btnIced && pencarianAktif.trim() === '' && !pesanKosongRes"
            class="lihat-semua" 
            id="res-btn-lihat-semua" 
            type="button" 
            style="display: block; margin: 40px auto 0;"
            @click="klikLihatSemuaBtn"
          >
            {{ batasTampilRes >= totalRelevan ? 'Lihat Lebih Sedikit' : 'Lihat Semua Menu' }}
          </button>

          <button id="btn-checkout-dinein" class="reservasi-btn" style="justify-content: center; width: 100%; padding: 16px; margin-top: 24px;" @click.prevent="klikCheckoutDinein">
            Konfirmasi Reservasi
          </button>
        </div>

      </div>
    </div>
  </section>
</template>
