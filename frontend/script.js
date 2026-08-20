
const cartBtn = document.getElementById("btn");
const hamburger = document.getElementById("hamburger");
const link = document.getElementById("link");
let batasTampil = 4;
let isiKeranjang = [];

function showToast(msg) {
  const toastContainer = document.getElementById("toast-notif");
  const pesantoast = document.getElementById("toast-message");
  if (toastContainer && pesantoast) {
    pesantoast.innerText = msg;
    toastContainer.classList.add("show");
    setTimeout(() => {
      toastContainer.classList.remove("show");
    }, 3000);
  }
}

function updateBadgeKeranjang() {
  const badgekeranjang = document.getElementById("cart-badge");
  const humbergerbadge = document.getElementById("humberger-badge");
  if (badgekeranjang && humbergerbadge) {
    badgekeranjang.innerText = isiKeranjang.length;
    humbergerbadge.innerText = isiKeranjang.length;
    if (isiKeranjang.length > 0) {
      badgekeranjang.classList.remove("hidden");
      humbergerbadge.classList.remove("hidden");
    } else {
      badgekeranjang.classList.add("hidden");
      humbergerbadge.classList.add("hidden");
    }
  }
}

// NAVBAR & MOBILE MENU
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

// CATEGORY FILTER & SLIDING HIGHLIGHT
function geserKotakHitam(subMenuAktif) {
  const kotakHitam = subMenuAktif.querySelector(".sliding-highlight");
  const tombolAktif = subMenuAktif.querySelector(".pilihan-1.active");

  if (kotakHitam && tombolAktif) {
    kotakHitam.style.width = tombolAktif.offsetWidth + "px";
    kotakHitam.style.height = tombolAktif.offsetHeight + "px";
    kotakHitam.style.left = tombolAktif.offsetLeft + "px";
    kotakHitam.style.top = tombolAktif.offsetTop + "px";
  }
}

function saringKartuMenu(kategoriYangDipilih) {
  const semuaKartu = document.querySelectorAll("#menu-container .kartu-menu-1");
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

    if (totalRelevan <= 4) {
      lihatsemuabtn.style.display = "none";
    } else {
      lihatsemuabtn.style.display = "block";
      if (jumlahmenutampil >= totalRelevan) {
        lihatsemuabtn.textContent = "Lihat Lebih Sedikit";
      } else {
        lihatsemuabtn.textContent = "Lihat Semua Menu";
      }
    }
  }
}

const semuaTombolSubMenu = document.querySelectorAll("#menu .pilihan-1");

semuaTombolSubMenu.forEach(function (tombol) {
  tombol.addEventListener("click", function (e) {
    e.preventDefault();

   if (pesanKosong != null) {
    pesanKosong.style.display = "none";
   }

   document.querySelectorAll(".best-seller-iced").forEach(element => {
      element.style.display = "flex";
   });

    const searchInput = document.getElementById("search");
    if (searchInput && searchInput.value.trim() !== "") {
      if (e.isTrusted) {
        searchInput.value = "";
      } else {
        const subMenuInduk = tombol.closest(".sub-menu");
        const tombolLainnya = subMenuInduk.querySelectorAll(".pilihan-1");
        tombolLainnya.forEach(function (t) {
          t.classList.remove("active");
        });
        tombol.classList.add("active");
        geserKotakHitam(subMenuInduk);
        return;
      }
    }

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

const semuaKategoriUtama = document.querySelectorAll("#menu .kategori-wrapper a");

semuaKategoriUtama.forEach(function (kategori) {
  kategori.addEventListener("click", function (e) {
    e.preventDefault();

    if (pesanKosong != null) {
      pesanKosong.style.display = "none";
    }

    document.querySelectorAll(".best-seller-iced").forEach(element => {
      element.style.display = "flex";
    });

    const searchInput = document.getElementById("search");
    if (searchInput && searchInput.value.trim() !== "" && e.isTrusted) {
      searchInput.value = "";
    }

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

    const semuaSubMenu = document.querySelectorAll("#menu .sub-menu");
    semuaSubMenu.forEach(function (menu) {
      menu.classList.add("hidden");
    });

    const subMenuYangMauDibuka = document.getElementById(idSubMenuTarget);
    if (subMenuYangMauDibuka) {
      subMenuYangMauDibuka.classList.remove("hidden");

      setTimeout(function () {
        geserKotakHitam(subMenuYangMauDibuka);

        if (searchInput && searchInput.value.trim() !== "" && !e.isTrusted) return;

        const tombolPertama = subMenuYangMauDibuka.querySelector(".pilihan-1");
        if (tombolPertama) {
          tombolPertama.click();
        }
      }, 10);
    }
  });
});

window.addEventListener("DOMContentLoaded", function () {
  
  const badgePengunjung = document.getElementById('badge-pengunjung');

  async function hitungPengunjung() {
    let res;
    if (!localStorage.getItem("sudahMampir")) {
      res = await fetch(`${CONFIG.API_URL}/api/statistik`, {
        method: 'POST'
      });
      localStorage.setItem("sudahMampir", "true");
    } else {
      res = await fetch(`${CONFIG.API_URL}/api/statistik`);
    }

    const data = await res.json();
    badgePengunjung.innerHTML = `${data.totalPengunjung}+`;
  }

  hitungPengunjung();

});

window.addEventListener("resize", function () {
  const subMenuAktif = document.querySelector("#menu .sub-menu:not(.hidden)");
  if (subMenuAktif) {
    geserKotakHitam(subMenuAktif);
  }
});

// SEARCH MENU LOGIC
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

    document.querySelectorAll(".best-seller-iced").forEach(element => {
      element.style.display = "flex";
    });

    const lihatsemuabtn = document.getElementById("btn-lihat-semua");
    if (lihatsemuabtn) lihatsemuabtn.style.display = "block"; // Munculkan kembali

    let kategoriAktif = document.querySelector("#menu .kategori-wrapper a.active-kategori");

    if (!kategoriAktif) {
      kategoriAktif = document.querySelector('#menu .kategori-wrapper a[data-target="makanan"]');
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
    const ambilsemuakartu = document.querySelectorAll("#menu-container .kartu-menu-1");

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

      document.querySelectorAll(".best-seller-iced").forEach(element => {
        element.style.display = "none";
      });
      
      const lihatsemuabtn = document.getElementById("btn-lihat-semua");
      if (lihatsemuabtn) lihatsemuabtn.style.display = "none";

      document.querySelectorAll("#menu .kategori-wrapper a").forEach(k => k.classList.remove("active-kategori"));
      document.querySelectorAll("#menu .pilihan-1").forEach(t => t.classList.remove("active"));
      document.querySelectorAll("#menu .sliding-highlight").forEach(k => k.style.width = "0px");

      const semuaSubMenu = document.querySelectorAll("#menu .sub-menu");
      if (semuaSubMenu) {
        semuaSubMenu.forEach(function (menu) {
          menu.classList.add("hidden");
        });
      }
    } else {
      pesanKosong.style.display = "none";

      document.querySelectorAll(".best-seller-iced").forEach(element => {
        element.style.display = "flex";
      });
      
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

// BEST SELLER FILTER
const bestsellerbtn = document.getElementById("bs-btn");

  bestsellerbtn.addEventListener("click", function (e) {
  e.preventDefault();

    if (pesanKosong != null) {
      pesanKosong.style.display = "none";
    }

  const targetkartu = document.querySelectorAll("#menu-container .kartu-menu-1");

  if (bestsellerbtn.classList.contains("active")) {
    bestsellerbtn.classList.remove("active");

    const tombolAktif = document.querySelector("#menu .sub-menu:not(.hidden) .pilihan-1.active");
    if (tombolAktif) {
      saringKartuMenu(tombolAktif.getAttribute("data-filter"));
    }

  } else {
    icedbtn.classList.remove("active");
    bestsellerbtn.classList.add("active");

    const lihatsemuabtn = document.getElementById("btn-lihat-semua");
    if (lihatsemuabtn) lihatsemuabtn.style.display = "none";

    const tombolAktif = document.querySelector("#menu .sub-menu:not(.hidden) .pilihan-1.active");
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

// ICED COFFEE FILTER
const icedbtn = document.getElementById("i-btn");

icedbtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (pesanKosong != null) {
      pesanKosong.style.display = "none";
    }

  const targetkartu = document.querySelectorAll("#menu-container .kartu-menu-1");

  if (icedbtn.classList.contains("active")) {
    icedbtn.classList.remove("active");

    const tombolAktif = document.querySelector("#menu .sub-menu:not(.hidden) .pilihan-1.active");
    if (tombolAktif) {
      saringKartuMenu(tombolAktif.getAttribute("data-filter"));
    }

  } else {
    document.querySelector('.kategori-wrapper a[data-target="minuman"]').click();

    setTimeout(() => {
      bestsellerbtn.classList.remove("active");
      icedbtn.classList.add("active");

      const lihatsemuabtn = document.getElementById("btn-lihat-semua");
      if (lihatsemuabtn) lihatsemuabtn.style.display = "none";

      targetkartu.forEach(function (kartu) {
        const isiTeks = kartu.innerText.toLowerCase();

        if (isiTeks.includes("iced")) {
          kartu.style.display = "block";

        } else {
          kartu.style.display = "none";
        }
      });
    }, 20);
  }
});

// LOAD MORE PROGRESSIVE RENDER
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

// DYNAMIC MENU
async function loadMenu() {
  const menuContainer = document.getElementById("menu-container");
  const resMenuContainer = document.getElementById("res-menu-container");

  const skeletonHTML = `
      <div class="skeleton-card">
        <div class="skeleton-gambar shimmer"></div>
        <div class="skeleton-info">
          <div class="skeleton-bar title shimmer"></div>
          <div class="skeleton-bar shimmer"></div>
          <div class="skeleton-bar short shimmer"></div>
        </div>
      </div>
  `;

  menuContainer.innerHTML = "";
  if (resMenuContainer) resMenuContainer.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    menuContainer.innerHTML += skeletonHTML;
    if (resMenuContainer) resMenuContainer.innerHTML += skeletonHTML;
  }

  try {
    const respons = await fetch(CONFIG.API_URL + '/api/menu');
    const dataMenu = await respons.json();

    menuContainer.innerHTML = "";
    if (resMenuContainer) resMenuContainer.innerHTML = "";

    dataMenu.forEach(function (menu) {
      const cardHTML = `
        <div class="kartu-gambar">
          <img src="${menu.gambar}" alt="${menu.nama}" onload="this.parentElement.classList.add('loaded')" />
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

      const divKartu = document.createElement("div");
      divKartu.className = "kartu-menu-1";
      divKartu.setAttribute("data-kategori", menu.kategori);
      divKartu.setAttribute("data-sub", menu.sub);
      divKartu.innerHTML = cardHTML;
      menuContainer.appendChild(divKartu);

      if (resMenuContainer) {
        const resKartu = document.createElement("div");
        resKartu.className = "kartu-menu-1";
        resKartu.setAttribute("data-kategori", menu.kategori);
        resKartu.setAttribute("data-sub", menu.sub);
        resKartu.innerHTML = cardHTML;
        resMenuContainer.appendChild(resKartu);
      }
    });

    const kategoriAktif = document.querySelector('#menu .kategori-wrapper a.active-kategori');
    if (kategoriAktif) {
      kategoriAktif.click();
    }

    // LOGIKA KERANJANG DINAMIS & LOCAL STORAGE

    let activeCartTab = "takeaway";

    const datastorage = localStorage.getItem("keranjangCafe");

    if (datastorage) {
      isiKeranjang = JSON.parse(datastorage);
      updateBadgeKeranjang();
      renderKeranjang();
    }

    const tombolpluskartu = document.querySelectorAll(".kartu-btn");

    tombolpluskartu.forEach(function (tombol) {
      tombol.addEventListener("click", function (e) {
        e.preventDefault();

        const kartu = tombol.closest(".kartu-info").parentElement;
        const namaBarang = kartu.querySelector(".kartu-nama").innerText;
        const hargaTeks = kartu.querySelector(".kartu-harga").innerText;
        const hargaAngka = parseInt(hargaTeks.replace(/[^0-9]/g, ""));
        const gambarBarang = kartu.querySelector("img").src;

        const barangDitemukan = isiKeranjang.find(function (item) {
          return item.nama === namaBarang && (item.tipe || "takeaway") === "takeaway";
        });

        if (barangDitemukan) {
          barangDitemukan.jumlah += 1;
        } else {
          isiKeranjang.push({
            nama: namaBarang,
            harga: hargaAngka,
            gambar: gambarBarang,
            jumlah: 1,
            tipe: "takeaway"
          });
        }

        renderKeranjang();

        // NOTIFIKASI TOAST & BADGE KERANJANG
        const toastContainer = document.getElementById("toast-notif");
        const pesantoast = document.getElementById("toast-message");

        pesantoast.innerText = namaBarang + " dimasukkan ke keranjang";
        toastContainer.classList.add("show");

        setTimeout(function () {
          toastContainer.classList.remove("show");
          updateBadgeKeranjang();
        }, 2000);
      });
    });

    // LOGIKA CART TAB SWITCHER

    const tombolTab = document.querySelectorAll(".cart-tab");

    tombolTab.forEach(function (t) {
      t.addEventListener("click", function (e) {
        tombolTab.forEach(function (semua) {
          semua.classList.remove("active-cart-tab");
        });

        t.classList.add("active-cart-tab");
        activeCartTab = t.getAttribute('data-tab');

        const datastorage = localStorage.getItem("keranjangCafe");
        if (datastorage) {
          isiKeranjang = JSON.parse(datastorage);
        }

        renderKeranjang();
      });
    });

    // FUNGSI PENCETAK KERANJANG (RENDER)
    function renderKeranjang() {

      const keranjangTeks = JSON.stringify(isiKeranjang);
      localStorage.setItem("keranjangCafe", keranjangTeks);

      const wadahItems = document.querySelector(".cart-items");
      const wadahFooter = document.querySelector(".cart-footer");
      const wadahSummary = document.querySelector(".cart-summary");
      const tombolCart = document.getElementById("btn-cart");

      const filteredKeranjang = isiKeranjang.filter(item => (item.tipe || "takeaway") === activeCartTab);

      if (filteredKeranjang.length === 0) {
        wadahItems.innerHTML = `<p style="padding: 24px; text-align: center; color: #888;">Belum ada pesanan untuk ${activeCartTab === 'takeaway' ? 'Takeaway' : 'Reservasi'}.</p>`;
        wadahFooter.style.display = "none";
        return;
      }

      wadahItems.innerHTML = "";
      wadahFooter.style.display = "block";

      let totalHarga = 0;

      filteredKeranjang.forEach(function (item) {

        const hargaAman = item.harga || 0;

        totalHarga += hargaAman * item.jumlah;
        const formatRupiah = "Rp " + hargaAman.toLocaleString('id-ID');

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

      document.getElementById("cart-total-price").innerText = "Rp " + totalHarga.toLocaleString('id-ID');

      const dineininfo = document.getElementById("cart-dinein-info");
      const takeawayInfo = document.getElementById("cart-takeaway-info");

      if (activeCartTab === "dinein") {
        if (dineininfo) dineininfo.classList.remove("hidden");
        if (takeawayInfo) takeawayInfo.classList.add("hidden");

        // Sinkronisasi data form reservasi ke rincian keranjang
        const inputNama = document.getElementById("res-nama");
        const inputTanggal = document.getElementById("res-tanggal");
        const inputTamu = document.getElementById("res-tamu");

        if (inputNama) document.getElementById("cart-info-nama").innerText = inputNama.value.trim() || "-";
        if (inputTanggal) document.getElementById("cart-info-tanggal").innerText = inputTanggal.value || "-";
        if (inputTamu) document.getElementById("cart-info-tamu").innerText = inputTamu.value || "-";

      } else {
        if (dineininfo) dineininfo.classList.add("hidden");
        if (takeawayInfo) takeawayInfo.classList.remove("hidden");
      }

      tombolCart.innerText = "Buat Pesanan";
    }
    renderKeranjang();

    // LOGIKA TOMBOL PLUS & MINUS DI KERANJANG
    const wadahkeranjang = document.querySelector(".cart-items");

    wadahkeranjang.addEventListener("click", function (e) {
      if (e.target.classList.contains("increase-btn")) {
        const namaBarang = e.target.dataset.nama;
        const item = isiKeranjang.find(i => i.nama === namaBarang && (i.tipe || "takeaway") === activeCartTab);
        if (item) {
          item.jumlah += 1;
        }
        renderKeranjang();
      }
      else if (e.target.classList.contains("decrease-btn")) {
        const namaBarang = e.target.dataset.nama;
        const item = isiKeranjang.find(i => i.nama === namaBarang && (i.tipe || "takeaway") === activeCartTab);

        if (item) {
          if (item.jumlah === 1) {
            const toastContainer = document.getElementById("toast-notif");
            const pesantoast = document.getElementById("toast-message");
            if (pesantoast) pesantoast.innerText = "Jumlah item minimum tercapai";
            if (toastContainer) {
              toastContainer.classList.add("show");
              setTimeout(() => toastContainer.classList.remove("show"), 2000);
            }
          } else {
            item.jumlah -= 1;
          }
          renderKeranjang();
        }
      } else if (e.target.closest(".delete-btn")) {
        const btnDelete = e.target.closest(".delete-btn");
        const namaBarang = btnDelete.dataset.nama;

        isiKeranjang = isiKeranjang.filter(item => !(item.nama === namaBarang && (item.tipe || "takeaway") === activeCartTab));
        localStorage.setItem("keranjangCafe", JSON.stringify(isiKeranjang));
        updateBadgeKeranjang();
        renderKeranjang();
      }
    });

    // LOGIKA CHECKOUT & WHATSAPP API
    const btnCart = document.getElementById("btn-cart");

    if (btnCart) {
      btnCart.addEventListener("click", async function () {
        const toastContainer = document.getElementById("toast-notif");
        const pesantoast = document.getElementById("toast-message");

        if (activeCartTab === "dinein") {
          const resNama = document.getElementById("res-nama").value.trim();
          const resTanggal = document.getElementById("res-tanggal").value;
          const resJam = document.getElementById("res-jam").value;
          const resTamu = document.getElementById("res-tamu").value;
          const pesananDineIn = isiKeranjang.filter(item => item.tipe === "dinein");

          if (pesananDineIn.length === 0) {
            if (pesantoast) pesantoast.innerText = "Keranjang Reservasi masih kosong!";
            if (toastContainer) { toastContainer.classList.add("show"); setTimeout(() => toastContainer.classList.remove("show"), 3000); }
            return;
          }

          btnCart.innerText = "Memproses...";
          btnCart.disabled = true;

          try {
            const res = await fetch(CONFIG.API_URL + "/api/buat-reservasi", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ nama: resNama, tanggal: resTanggal, jam: resJam, jumlahTamu: resTamu, pesanan: pesananDineIn })
            });
            const dataBuat = await res.json();
            if (dataBuat.sukses) {
              isiKeranjang = isiKeranjang.filter(item => item.tipe !== "dinein");
              localStorage.setItem("keranjangCafe", JSON.stringify(isiKeranjang));
              window.open(dataBuat.linkWA, '_blank');
              window.location.reload();
            } else {
              const pesanError = dataBuat.error || "Gagal membuat reservasi.";
              console.warn(pesanError);
              showToast(pesanError);

              btnCart.innerText = "Buat Pesanan";
              btnCart.disabled = false;
            }
          } catch (err) {
            showToast("Error server saat reservasi!");
            btnCart.innerText = "Buat Pesanan";
            btnCart.disabled = false;
          }
          return;
        }

        // TAKEAWAY LOGIC
        const namaTakeaway = document.getElementById("nama-pemesan-takeaway").value.trim();

        if (namaTakeaway === "") {
          if (pesantoast) pesantoast.innerText = "Nama pemesan wajib diisi!";
          if (toastContainer) {
            toastContainer.classList.add("show");
            setTimeout(() => toastContainer.classList.remove("show"), 3000);
          }
          return;
        }

        const pesananTakeaway = isiKeranjang.filter(item => (item.tipe || "takeaway") === "takeaway");
        if (pesananTakeaway.length === 0) {
          if (pesantoast) pesantoast.innerText = "Keranjang Takeaway kosong!";
          if (toastContainer) { toastContainer.classList.add("show"); setTimeout(() => toastContainer.classList.remove("show"), 3000); }
          return;
        }

        try {
          btnCart.innerText = "Memproses...";
          btnCart.disabled = true;

          const response = await fetch(CONFIG.API_URL + "/api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nama: namaTakeaway,
              tipe: "Takeaway",
              pesanan: pesananTakeaway
            })
          });

          const data = await response.json();

          if (data.status === "sukses" || data.sukses) {
            isiKeranjang = isiKeranjang.filter(item => (item.tipe || "takeaway") !== "takeaway");
            localStorage.setItem("keranjangCafe", JSON.stringify(isiKeranjang));

            if (data.linkWA) {
              window.open(data.linkWA, '_blank');
            } else {
              window.open("https://wa.me/6281346851655?text=" + encodeURIComponent(data.pesan), '_blank');
            }
            window.location.reload();
          } else {
            if (pesantoast) pesantoast.innerText = "Terjadi kesalahan saat memproses pesanan";
            if (toastContainer) { toastContainer.classList.add("show"); setTimeout(() => toastContainer.classList.remove("show"), 3000); }
            btnCart.innerText = "Buat Pesanan";
            btnCart.disabled = false;
          }

        } catch (error) {
          console.error("Error:", error);
          if (pesantoast) pesantoast.innerText = "Gagal menghubungi server.";
          if (toastContainer) { toastContainer.classList.add("show"); setTimeout(() => toastContainer.classList.remove("show"), 3000); }
          btnCart.innerText = "Buat Pesanan";
          btnCart.disabled = false;
        }
      });
    }

  } catch (error) {
    console.error("Gagal mengambil data menu dari Backend:", error);
  }
}

loadMenu();

/* ==========================================
 * RESERVASI
 * ========================================== */
const reservasibtn = document.getElementById("btn-cek-reservasi");
const statusTeks = document.getElementById("res-status");

reservasibtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const nama = document.getElementById("res-nama").value.trim();
  const tanggal = document.getElementById("res-tanggal").value;
  const tamu = document.getElementById("res-tamu").value;
  const jam = document.getElementById("res-jam").value;

  const errTanggal = document.getElementById("err-tanggal");
  const errTamu = document.getElementById("err-tamu");
  const errJam = document.getElementById("err-jam");

  errTanggal.style.display = "none";
  errTamu.style.display = "none";
  errJam.style.display = "none";

  let adaError = false;

  if (tanggal !== "") {
    const tanggalInput = new Date(tanggal);
    const tanggalHariIni = new Date();
    tanggalHariIni.setHours(0, 0, 0, 0);

    if (tanggalInput < tanggalHariIni) {
      errTanggal.innerText = "pilih waktu kedepan";
      errTanggal.style.display = "inline";
      adaError = true;
    } else {
      const batasMaksimal = new Date(tanggalHariIni);
      batasMaksimal.setDate(batasMaksimal.getDate() + 14);

      if (tanggalInput > batasMaksimal) {
        errTanggal.innerText = "batas maksimal reservasi hanya 14 hari kedepan";
        errTanggal.style.display = "inline";
        adaError = true;
      }

    }
  }

  if (tamu !== "") {
    const jumlahTamu = parseInt(tamu);

    if (jumlahTamu <= 0) {
      errTamu.style.display = "inline";
      adaError = true;
    }
  }

  if (jam !== "" && tanggal !== "") {
    const jamPisah = jam.split(":");
    const jamAngka = parseInt(jamPisah[0]);
    const hari = new Date(tanggal).getDay();

    if (hari === 1) {
      errTanggal.innerText = "Maaf, Cafe tutup setiap hari senin";
      errTanggal.style.display = "inline";
      adaError = true;
    } else if (hari >= 2 && hari <= 5) {
      if (jamAngka < 9 || jamAngka > 21) {
        errJam.innerText = "Jam operasional 09:00 - 22.00";
        errJam.style.display = "inline";
        adaError = true;
      }
    } else if (hari === 6 || hari === 0) {
      if (jamAngka < 9 || jamAngka > 22) {
        errJam.innerText = "Jam operasional Akhir Pekan 09:00 - 23:00";
        errJam.style.display = "inline";
        adaError = true;
      }
    }
  }

  if (adaError) {
    statusTeks.innerText = "";
    return;
  }

  if (nama === "" || tanggal === "" || tamu === "" || jam === "") {
    statusTeks.textContent = "Mohon lengkapi semua data reservasi terlebih dahulu.";
    statusTeks.style.color = "red";
    return;
  }

  try {
    reservasibtn.innerText = "Mengecek..."
    reservasibtn.disabled = true;

    statusTeks.textContent = "Mengecek ketersediaan kursi...";
    statusTeks.style.color = "blue";

    const responseCek = await fetch(CONFIG.API_URL + "/api/cek-reservasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tanggal: tanggal, jam: jam, jumlahTamu: tamu })
    });

    const dataCek = await responseCek.json();

    if (dataCek.tersedia === false) {
      statusTeks.textContent = dataCek.pesan;
      statusTeks.style.color = "red";
      return;
    }

    statusTeks.textContent = "Kursi tersedia! Silakan pilih menu di bawah lalu konfirmasi.";
    statusTeks.style.color = "green";

    const resMenuArea = document.getElementById("res-menu-area");
    if (resMenuArea) {
      resMenuArea.style.display = "block";
      resMenuArea.scrollIntoView({ behavior: "smooth" });
    }

  } catch (error) {
    console.error("Gagal terhubung ke API:", error);
    statusTeks.textContent = "Gagal!";
    statusTeks.style.color = "red";
  } finally {
    reservasibtn.innerText = "Cek Ketersediaan";
    reservasibtn.disabled = false;
  }
});


// CHECKOUT DINE IN (TOMBOL KONFIRMASI RESERVASI)

const btnCheckoutDinein = document.getElementById("btn-checkout-dinein");
if (btnCheckoutDinein) {
  btnCheckoutDinein.addEventListener("click", function (e) {
    e.preventDefault();

    const nama = document.querySelector('#res-nama').value.trim();
    const tanggal = document.querySelector('#res-tanggal').value;
    const tamu = document.querySelector('#res-tamu').value;

    const summarynama = document.querySelector('#summary-nama');
    const summarytanggal = document.querySelector('#summary-tanggal');
    const summarytamu = document.querySelector('#summary-tamu');

    if (nama === "" || tanggal === "" || tamu === "") {
      showToast("Harap lengkapi data pemesanan terlebih dahulu");

      return;
    }

    const dataStorage = localStorage.getItem("keranjangCafe");
    const parseJSON = JSON.parse(dataStorage);
    const pesananDineIn = parseJSON.filter(data => data.tipe === "dinein");

    document.getElementById("cart-info-nama").innerText = nama;
    document.getElementById("cart-info-tanggal").innerText = tanggal;
    document.getElementById("cart-info-tamu").innerText = tamu;

    document.getElementById("cart-overlay").classList.add("active");
    document.getElementById("cart-drawer").classList.add("active");

    const dineInTab = document.querySelector('.cart-tab[data-tab="dinein"]');
    if (dineInTab) {
      dineInTab.click();
    }

    let totalDinein = 0;

    pesananDineIn.forEach(function (item) {
      totalDinein += item.harga * item.jumlah;
    });

    const checkoutTotalElement = document.getElementById('cart-total-price');
    if (checkoutTotalElement) checkoutTotalElement.textContent = "Rp " + totalDinein.toLocaleString('id-ID');

    document.getElementById("checkout-drawer").classList.add("active");
    document.getElementById('tipe-pesanan').value = "Dinein";

    renderCheckoutDineIn(pesananDineIn)

  });
}

// GET DIRECTION LOGIC BUTTON
const getDirectionBtn = document.getElementById('get-direction-btn');
if (getDirectionBtn) {
  getDirectionBtn.addEventListener('click', () => {
    window.open('https://maps.app.goo.gl/pU7ch1qAnYGzwHxu7', '_blank');
  });
}

// =========================================
// FITUR UX: AUTO-SAVE FORM RESERVASI
// =========================================
document.addEventListener("DOMContentLoaded", function () {
  const inputNama = document.getElementById("res-nama");
  const inputTanggal = document.getElementById("res-tanggal");
  const inputJam = document.getElementById("res-jam");
  const inputTamu = document.getElementById("res-tamu");

  if (inputNama && inputTanggal && inputJam && inputTamu) {
    // Muat data yang tersimpan sebelumnya (kalau ada)
    inputNama.value = localStorage.getItem("draft_nama") || "";
    inputTanggal.value = localStorage.getItem("draft_tanggal") || "";
    inputJam.value = localStorage.getItem("draft_jam") || "";
    inputTamu.value = localStorage.getItem("draft_tamu") || "";

    // Simpan otomatis setiap kali pengguna mengetik
    inputNama.addEventListener("input", e => localStorage.setItem("draft_nama", e.target.value));
    inputTanggal.addEventListener("input", e => localStorage.setItem("draft_tanggal", e.target.value));
    inputJam.addEventListener("input", e => localStorage.setItem("draft_jam", e.target.value));
    inputTamu.addEventListener("input", e => localStorage.setItem("draft_tamu", e.target.value));
  }
});

// LOGIKA KERANJANG (SLIDING DRAWER)

const btnBukaKeranjang = document.getElementById("btn-keranjang");
const btnTutupKeranjang = document.getElementById("close-cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

if (btnBukaKeranjang) {
  btnBukaKeranjang.addEventListener("click", function (e) {
    e.preventDefault();
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
  });
}

if (btnTutupKeranjang) {
  btnTutupKeranjang.addEventListener("click", function () {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
  });
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", function () {
    const isCheckoutActive = checkoutDrawerNode && checkoutDrawerNode.classList.contains("active");

    if (isCheckoutActive) {
      checkoutDrawerNode.classList.remove("active");
    } else {
      cartDrawer.classList.remove("active");
    }

    cartOverlay.classList.remove("active");
  });
}
// OUR STORY DRAWER
const buka = document.querySelector("#btn-our-story");
const tutup = document.querySelector("#close-story-btn");
const overlay = document.querySelector("#story-overlay");
const laci = document.querySelector("#story-drawer");

function bukaStoryDrawer() {
  overlay.classList.add("active");
  laci.classList.add("active");
}

function tutupStoryDrawer() {
  overlay.classList.remove("active");
  laci.classList.remove("active");
}

buka.addEventListener("click", function (e) {
  e.preventDefault();
  bukaStoryDrawer();
});

tutup.addEventListener("click", function () {
  tutupStoryDrawer()
});

overlay.addEventListener("click", function () {
  tutupStoryDrawer()
});
