

const cartBtn = document.getElementById("btn");
const hamburger = document.getElementById("hamburger");
const link = document.getElementById("link");
let batasTampil = 4;

// ==========================================
// NAVBAR & MOBILE MENU
// ==========================================
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  link.classList.toggle("active");
});

document.querySelectorAll(".link ul a").forEach(function (navLink) {
  navLink.addEventListener("click", function () {
    hamburger.classList.remove("active");
    link.classList.remove("active");
  });
});

// ==========================================
// CATEGORY FILTER & SLIDING HIGHLIGHT
// ==========================================
function geserKotakHitam(subMenuAktif) {
  const kotakHitam = subMenuAktif.querySelector(".sliding-highlight");
  const tombolAktif = subMenuAktif.querySelector(".pilihan-1.active");

  if (kotakHitam && tombolAktif) {
    kotakHitam.style.width = tombolAktif.offsetWidth + "px";
    kotakHitam.style.left = tombolAktif.offsetLeft + "px";
  }
}

function saringKartuMenu(kategoriYangDipilih) {
  const semuaKartu = document.querySelectorAll(".kartu-menu-1");
  let jumlahmenutampil = 0;
  let totalRelevan = 0;

  semuaKartu.forEach(function (kartu) {
    const kategoriKartu = kartu.getAttribute("data-sub");
    const relevan = kategoriYangDipilih === "" || !kategoriYangDipilih || kategoriKartu === kategoriYangDipilih;

    if (relevan) {
      totalRelevan++;
      if (jumlahmenutampil < batasTampil) {
        kartu.style.display = "block";
        jumlahmenutampil++;
      } else {
        kartu.style.display = "none";
      }
    } else {
      kartu.style.display = "none";
    }
  });

  const lihatsemuabtn = document.getElementById("btn-lihat-semua");
  if (lihatsemuabtn) {
    if (jumlahmenutampil >= totalRelevan) {
      lihatsemuabtn.textContent = "Lihat Lebih Sedikit";
    } else {
      lihatsemuabtn.textContent = "Lihat Semua Menu";
    }
  }
}

const semuaTombolSubMenu = document.querySelectorAll(".pilihan-1");

semuaTombolSubMenu.forEach(function (tombol) {
  tombol.addEventListener("click", function (e) {
    e.preventDefault();

    const searchInput = document.getElementById("search");
    if (searchInput && searchInput.value.trim() !== "") return;

    const subMenuInduk = tombol.closest(".sub-menu");
    const tombolLainnya = subMenuInduk.querySelectorAll(".pilihan-1");

    tombolLainnya.forEach(function (t) {
      t.classList.remove("active");
    });

    tombol.classList.add("active");
    geserKotakHitam(subMenuInduk);

    const bestsellerbtn = document.getElementById("bs-btn");
    const icedbtn = document.getElementById("i-btn");
    if (bestsellerbtn) bestsellerbtn.classList.remove("active");
    if (icedbtn) icedbtn.classList.remove("active");

    batasTampil = 4;

    const nilaiFilter = tombol.getAttribute("data-filter");
    saringKartuMenu(nilaiFilter);
  });
});

const semuaKategoriUtama = document.querySelectorAll(".kategori-wrapper a");

semuaKategoriUtama.forEach(function (kategori) {
  kategori.addEventListener("click", function (e) {
    e.preventDefault();

   
    const searchInput = document.getElementById("search");
    if (searchInput && searchInput.value.trim() !== "") return;

    semuaKategoriUtama.forEach(function (k) {
      k.classList.remove("active-kategori");
    });
    kategori.classList.add("active-kategori");

    const bestsellerbtn = document.getElementById("bs-btn");
    const icedbtn = document.getElementById("i-btn");
    if (bestsellerbtn) bestsellerbtn.classList.remove("active");
    if (icedbtn) icedbtn.classList.remove("active");

    batasTampil = 4;

    const namaTarget = kategori.getAttribute("data-target");
    const idSubMenuTarget = "sub-" + namaTarget;

    const semuaSubMenu = document.querySelectorAll(".sub-menu");
    semuaSubMenu.forEach(function (menu) {
      menu.classList.add("hidden");
    });

    const subMenuYangMauDibuka = document.getElementById(idSubMenuTarget);
    if (subMenuYangMauDibuka) {
      subMenuYangMauDibuka.classList.remove("hidden");

      setTimeout(function () {
        geserKotakHitam(subMenuYangMauDibuka);
        const tombolPertama = subMenuYangMauDibuka.querySelector(".pilihan-1");
        if (tombolPertama) {
          tombolPertama.click();
        }
      }, 10);
    }
  });
});

// ==========================================
// INITIALIZATION ON LOAD & RESIZE
// ==========================================
window.addEventListener("DOMContentLoaded", function () {
  const subMenuAwal = document.querySelector(".sub-menu:not(.hidden)");
  if (subMenuAwal) {
    geserKotakHitam(subMenuAwal);

    const tombolAktifAwal = subMenuAwal.querySelector(".pilihan-1.active");
    if (tombolAktifAwal) {
      const nilaiFilterAwal = tombolAktifAwal.getAttribute("data-filter");
      saringKartuMenu(nilaiFilterAwal);
    }
  }
});

window.addEventListener("resize", function () {
  const subMenuAktif = document.querySelector(".sub-menu:not(.hidden)");
  if (subMenuAktif) {
    geserKotakHitam(subMenuAktif);
  }
});

// ==========================================
// SEARCH MENU LOGIC
// ==========================================
const searchbox = document.getElementById("search");
const kartuMenu = document.querySelector(".kartu-menu");
let pesanKosong = document.getElementById("pesan-kosong");

if (!pesanKosong) {
  pesanKosong = document.createElement("div");
  pesanKosong.id = "pesan-kosong";
  pesanKosong.innerHTML = "<p>Maaf, menu tidak ditemukan!</p>";
  pesanKosong.style.display = "none";
  pesanKosong.style.width = "100%";
  pesanKosong.style.padding = "40px 20px";
  pesanKosong.style.marginTop = "24px";
  pesanKosong.style.textAlign = "center";
  pesanKosong.style.fontFamily = "Inter, sans-serif";
  pesanKosong.style.color = "#4e4540";

  const lihatsemuabtn = document.getElementById("btn-lihat-semua");


  if (kartuMenu) {
    kartuMenu.parentNode.insertBefore(pesanKosong, kartuMenu);
  }
}

searchbox.addEventListener("input", function (teksketik) {
  teksketik.preventDefault();
  const input = teksketik.target.value.toLowerCase();

  if (input === "") {
    pesanKosong.style.display = "none";

    const lihatsemuabtn = document.getElementById("btn-lihat-semua");
    if (lihatsemuabtn) lihatsemuabtn.style.display = "block"; // Munculkan kembali

    let kategoriAktif = document.querySelector(".kategori-wrapper a.active-kategori");

    // Jika tidak ada kategori aktif (karena dihapus saat pencarian gagal sebelumnya)
    if (!kategoriAktif) {
      kategoriAktif = document.querySelector('.kategori-wrapper a[data-target="minuman"]');
    }

    if (kategoriAktif) {
      kategoriAktif.click();
    }
  }
});

searchbox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    const teksDiketik = searchbox.value.toLowerCase();
    let menuTidakDitemukan = true;
    let subKategoriDitemukan = "";
    const ambilsemuakartu = document.querySelectorAll(".kartu-menu-1");

    ambilsemuakartu.forEach(function (kartu) {
      const ambilnamakartu = kartu.querySelector(".kartu-nama").innerText.toLowerCase();

      if (ambilnamakartu.includes(teksDiketik)) {
        kartu.style.display = "block";

        if (menuTidakDitemukan === true) {
          menuTidakDitemukan = false;
          kategoriDitemukan = kartu.getAttribute("data-kategori");
          subKategoriDitemukan = kartu.getAttribute("data-sub");
        }
      } else {
        kartu.style.display = "none";
      }
    });

    if (menuTidakDitemukan === true) {
      pesanKosong.style.display = "block";
      pesanKosong.querySelector("p").innerText = "Maaf, menu tidak ditemukan!";

      const lihatsemuabtn = document.getElementById("btn-lihat-semua");
      if (lihatsemuabtn) lihatsemuabtn.style.display = "none";

      document.querySelectorAll(".kategori-wrapper a").forEach(k => k.classList.remove("active-kategori"));
      document.querySelectorAll(".pilihan-1").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".sliding-highlight").forEach(k => k.style.width = "0px");

      const semuaSubMenu = document.querySelectorAll(".sub-menu");
      if (semuaSubMenu) {
        semuaSubMenu.forEach(function (menu) {
          menu.classList.add("hidden");
        });
      }
    } else {
      pesanKosong.style.display = "none";

      const lihatsemuabtn = document.getElementById("btn-lihat-semua");
      if (lihatsemuabtn) lihatsemuabtn.style.display = "block";
      const tombolKategoriUtama = document.querySelector(`.kategori-wrapper a[data-target="${kategoriDitemukan}"]`);
      if (tombolKategoriUtama) {
        tombolKategoriUtama.click();
      }

      setTimeout(function () {
        const tombolSubMenu = document.querySelector(`.sub-menu a[data-filter="${subKategoriDitemukan}"]`);
        if (tombolSubMenu) {
          tombolSubMenu.click();
        }
      }, 10);
    }
  }
});

// ==========================================
// BEST SELLER FILTER
// ==========================================
const bestsellerbtn = document.getElementById("bs-btn");

bestsellerbtn.addEventListener("click", function (e) {
  e.preventDefault();

  const targetkartu = document.querySelectorAll(".kartu-menu-1");

  if (bestsellerbtn.classList.contains("active")) {
    bestsellerbtn.classList.remove("active");

    const tombolAktif = document.querySelector(".sub-menu:not(.hidden) .pilihan-1.active");
    if (tombolAktif) {
      saringKartuMenu(tombolAktif.getAttribute("data-filter"));
    }

  } else {
    icedbtn.classList.remove("active");
    bestsellerbtn.classList.add("active");

    const tombolAktif = document.querySelector(".sub-menu:not(.hidden) .pilihan-1.active");
    const subAktif = tombolAktif ? tombolAktif.getAttribute("data-filter") : "";

    targetkartu.forEach(function (kartu) {
      const isiteks = kartu.innerText.toLowerCase();
      const subKartu = kartu.getAttribute("data-sub");
      const sesuaiSub = subAktif === "" || subKartu === subAktif;

      if (isiteks.includes("best seller") && sesuaiSub) {
        kartu.style.display = "block";
      } else {
        kartu.style.display = "none";
      }
    });
  }
});

// ==========================================
// ICED COFFEE FILTER
// ==========================================
const icedbtn = document.getElementById("i-btn");

icedbtn.addEventListener("click", function (e) {
  e.preventDefault();
  const targetkartu = document.querySelectorAll(".kartu-menu-1");

  if (icedbtn.classList.contains("active")) {
    icedbtn.classList.remove("active");

    const tombolAktif = document.querySelector(".sub-menu:not(.hidden) .pilihan-1.active");
    if (tombolAktif) {
      saringKartuMenu(tombolAktif.getAttribute("data-filter"));
    }

  } else {
    bestsellerbtn.classList.remove("active");
    icedbtn.classList.add("active");

    const tombolAktif = document.querySelector(".sub-menu:not(.hidden) .pilihan-1.active");
    const subAktif = tombolAktif ? tombolAktif.getAttribute("data-filter") : "";

    targetkartu.forEach(function (kartu) {
      const isiteks = kartu.innerText.toLowerCase();
      const subKartu = kartu.getAttribute("data-sub");
      const sesuaiSub = subAktif === "" || subKartu === subAktif;

      if (isiteks.includes("iced") && sesuaiSub) {
        kartu.style.display = "block";
      } else {
        kartu.style.display = "none";
      }
    });
  }
});

// ==========================================
// LOAD MORE PROGRESSIVE RENDER
// ==========================================
const lihatsemuabtn = document.getElementById("btn-lihat-semua");

lihatsemuabtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (lihatsemuabtn.textContent === "Lihat Lebih Sedikit") {
    batasTampil = 4;
    lihatsemuabtn.textContent = "Lihat Semua Menu";
  } else {
    batasTampil = batasTampil + 4;
  }

  const tombolKategoriAktif = document.querySelector(".pilihan-1.active");
  let namaKategoriSaatIni = "";

  if (tombolKategoriAktif) {
    namaKategoriSaatIni = tombolKategoriAktif.getAttribute("data-filter");
  }

  saringKartuMenu(namaKategoriSaatIni);
});

// ==========================================
// DYNAMIC MENU FETCH (MOCK API)
// ==========================================
async function loadMenu() {
  try {
    const respons = await fetch('http://localhost:5000/api/menu');
    const dataMenu = await respons.json();

    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";

    dataMenu.forEach(function (menu) {
      const divKartu = document.createElement("div");
      divKartu.className = "kartu-menu-1";
      divKartu.setAttribute("data-kategori", menu.kategori);
      divKartu.setAttribute("data-sub", menu.sub);

      divKartu.innerHTML = `
        <div class="kartu-gambar">
          <img src="${menu.gambar}" alt="${menu.nama}" />
          ${menu.badge ? `<span class="kartu-badge ${menu.badgeClass}">${menu.badge}</span>` : ""}
        </div>
        <div class="kartu-info">
          <h3 class="kartu-nama">${menu.nama}</h3>
          <p class="kartu-desk">${menu.deskripsi}</p>
          <div class="kartu-bawah">
            <span class="kartu-harga">${menu.harga}</span>
            <button class="kartu-btn" type="button">+</button>
          </div>
        </div>
      `;

      menuContainer.appendChild(divKartu);

        
    });

    saringKartuMenu("signature");

    
    // ==========================================
    // LOGIKA KERANJANG DINAMIS
    // ==========================================
    let isiKeranjang = [];
    const tombolpluskartu = document.querySelectorAll(".kartu-btn");
    
    tombolpluskartu.forEach(function(tombol){
      tombol.addEventListener("click", function(e) {
         e.preventDefault(); 
         
         const kartu = tombol.closest(".kartu-info").parentElement;
         const namaBarang = kartu.querySelector(".kartu-nama").innerText;
         const hargaTeks = kartu.querySelector(".kartu-harga").innerText;
         const hargaAngka = parseInt(hargaTeks.replace(/[^0-9]/g, "")); 
         const gambarBarang = kartu.querySelector("img").src;

         const barangDitemukan = isiKeranjang.find(function(item) {
           return item.nama === namaBarang;
         });

         if (barangDitemukan) {
           barangDitemukan.jumlah += 1;
         } else {
           isiKeranjang.push({
             nama: namaBarang,
             harga: hargaAngka,
             gambar: gambarBarang,
             jumlah: 1
           });
         }

         renderKeranjang();
         
         // ==========================================
         // NOTIFIKASI TOAST & BADGE KERANJANG
         // ==========================================
         const toastContainer = document.getElementById("toast-notif");
         const pesantoast = document.getElementById("toast-message");
         const badgekeranjang = document.getElementById("cart-badge");
         const humberger = document.getElementById("humberger-badge");

         pesantoast.innerText = namaBarang + " dimasukkan ke keranjang";
         toastContainer.classList.add("show");

         setTimeout(function (){
          toastContainer.classList.remove("show");
          badgekeranjang.innerText = isiKeranjang.length;
          badgekeranjang.classList.remove("hidden");
          humberger.innerText = isiKeranjang.length;
          humberger.classList.remove("hidden");
         }, 2000);
      });
    });

    // ==========================================
    // FUNGSI PENCETAK KERANJANG (RENDER)
    // ==========================================
    function renderKeranjang() {
      const wadahItems = document.querySelector(".cart-items");
      const wadahFooter = document.querySelector(".cart-footer");
      const wadahSummary = document.querySelector(".cart-summary");
      const tombolCart = document.getElementById("btn-cart");
      
      if (isiKeranjang.length === 0) {
        wadahItems.innerHTML = `<p style="padding: 24px; text-align: center; color: #888;">Belum ada pesanan.</p>`;
        wadahFooter.style.display = "none";
        return; 
      }

      wadahItems.innerHTML = "";
      wadahFooter.style.display = "block";

      let totalHarga = 0;

      isiKeranjang.forEach(function(item) {
        totalHarga += (item.harga * item.jumlah);
        const formatRupiah = "Rp " + item.harga.toLocaleString('id-ID');
2
        wadahItems.innerHTML += `
          <div class="cart-item">
            <img src="${item.gambar}" alt="${item.nama}" class="cart-item-image" />
            <div class="cart-item-info">
              <h4 class="cart-item-name">${item.nama}</h4>
              <span class="cart-item-price">${formatRupiah}</span>
            </div>
            <div class="cart-item-quantity">
              <button class="qty-btn decrease-btn" data-nama="${item.nama}">-</button>
              <span class="qty-number">${item.jumlah}</span>
              <button class="qty-btn increase-btn" data-nama="${item.nama}">+</button>
            </div>
            <button class="trash-btn delete-btn" data-nama="${item.nama}" aria-label="Hapus item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        `;
      });

      wadahSummary.innerHTML = `
        <span class="summary-label">Total Pembayaran</span>
        <span class="summary-total">Rp ${totalHarga.toLocaleString('id-ID')}</span>
      `;
      tombolCart.innerText = "Checkout Pesanan";
    }
    renderKeranjang();

    // ==========================================
    // LOGIKA TOMBOL PLUS & MINUS DI KERANJANG
    // ==========================================
    const wadahkeranjang = document.querySelector(".cart-items");
    
    wadahkeranjang.addEventListener("click", function(e) {
      if (e.target.classList.contains("increase-btn")) {
        const namaBarang = e.target.dataset.nama; 
        
        const item = isiKeranjang.find(function(i) {
          return i.nama === namaBarang;
        });
        
        if (item) {
          item.jumlah += 1;
        }
        
        renderKeranjang();
      } 
      else if (e.target.classList.contains("decrease-btn")) {
        const namaBarang = e.target.dataset.nama;
        
        const item = isiKeranjang.find(function(i) {
          return i.nama === namaBarang;
        });
        
        if (item) {
          item.jumlah -= 1;
          
          if (item.jumlah === 0) {
            isiKeranjang = isiKeranjang.filter(function(i) {
              return i.nama !== namaBarang;
            });
          }
          
          renderKeranjang();
        }
      } else if (e.target.closest(".delete-btn")) {
         const namaBarang = e.target.closest(".delete-btn").dataset.nama;
         const badgekeranjang = document.getElementById("cart-badge");
         const humberger = document.getElementById("humberger-badge");
        
         isiKeranjang = isiKeranjang.filter(function (i) {
            return i.nama !== namaBarang;
         });

         if (isiKeranjang.length === 0) {
            badgekeranjang.classList.add("hidden");
            humberger.classList.add("hidden");
         } else {
            badgekeranjang.innerText = isiKeranjang.length;
            humberger.innerText = isiKeranjang.length;
         }

         renderKeranjang();
      }
    });

  } catch (error) {
    console.error("Gagal mengambil data menu dari Backend:", error);
  }
}

loadMenu();

// ==========================================
// GET DIRECTION LOGIC BUTTON
// ==========================================
const getdirectionbtn = document.querySelector(".get-direction");

getdirectionbtn.addEventListener("click", function (e) {
  e.preventDefault();

  const mapsswiftcoffee = "https://maps.app.goo.gl/ENBFCxDhLW8HL5vG9";
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("android") || userAgent.includes("iphone") || userAgent.includes("ipad")) {
    window.open(mapsswiftcoffee, "_blank");
  } else {
    window.open(mapsswiftcoffee, "_blank");
  }
});

// ==========================================
// LOGIKA KERANJANG (SLIDING DRAWER)
// ==========================================

const btnBukaKeranjang = document.getElementById("btn-keranjang");
const btnTutupKeranjang = document.getElementById("close-cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

// 1. Fungsi saat ikon keranjang diklik (Buka keranjang)
if (btnBukaKeranjang) {
  btnBukaKeranjang.addEventListener("click", function(e) {
    e.preventDefault(); 
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
  });
}

// 2. Fungsi saat tombol X diklik (Tutup keranjang)
if (btnTutupKeranjang) {
  btnTutupKeranjang.addEventListener("click", function() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
  });
}

// 3. Fungsi saat area hitam di luar keranjang diklik (Tutup keranjang)
if (cartOverlay) {
  cartOverlay.addEventListener("click", function() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
  });
}


const btnCart = document.getElementById("btn-cart");
const cartDrawerNode = document.getElementById("cart-drawer");
const checkoutDrawerNode = document.getElementById("checkout-drawer");

btnCart.addEventListener("click", function() {
  // 1. Tutup keranjang, buka checkout
  cartDrawerNode.classList.remove("active");
  checkoutDrawerNode.classList.add("active");
  
  // 2. Render isi pesanan
  renderCheckout();
});

// Fungsi untuk mencetak ulang laci Checkout
function renderCheckout() {
  const wadahCheckout = document.getElementById("checkout-items");
  const wadahTotalCheckout = document.getElementById("checkout-total");
  
  if (isiKeranjang.length === 0) {
    wadahCheckout.innerHTML = `<p style="padding: 24px; text-align: center; color: #888;">Belum ada pesanan.</p>`;
    wadahTotalCheckout.innerText = "Rp 0";
    return;
  }
  
  wadahCheckout.innerHTML = "";
  let totalHarga = 0;
  
  isiKeranjang.forEach(function(item) {
    const subtotal = item.harga * item.jumlah;
    totalHarga += subtotal;
    
    // Tampilan item checkout (lebih ringkas tanpa tombol plus/minus)
    wadahCheckout.innerHTML += `
      <div class="cart-item" style="border-bottom: 1px solid #eee; padding-bottom: 16px; margin-bottom: 16px;">
        <img src="${item.gambar}" alt="${item.nama}" class="cart-item-image" />
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.nama}</h4>
          <span class="cart-item-price" style="font-size: 13px; color: #888;">${item.jumlah}x @ Rp ${item.harga.toLocaleString('id-ID')}</span>
        </div>
        <div style="font-weight: 600; color: #4e4540; margin-left: auto;">
          Rp ${subtotal.toLocaleString('id-ID')}
        </div>
      </div>
    `;
  });
  
  wadahTotalCheckout.innerText = "Rp " + totalHarga.toLocaleString('id-ID');
}

// Fungsi saat tombol X di laci checkout diklik
const btnTutupCheckout = document.getElementById("close-checkout-btn");
if (btnTutupCheckout) {
  btnTutupCheckout.addEventListener("click", function() {
    checkoutDrawerNode.classList.remove("active");
    cartOverlay.classList.remove("active");
  });
}

// Fungsi tombol Buat Pesanan (Opsional untuk dilanjutkan)
const btnBuatPesanan = document.getElementById("btn-buat-pesanan");
if (btnBuatPesanan) {
  btnBuatPesanan.addEventListener("click", function() {
    alert("Pesanan berhasil dibuat! Terima kasih.");
    // Logika hapus keranjang dan tutup laci bisa ditambahkan di sini
  });
}
