let batasTampilRes = 4;
let pesanKosongRes;

function geserKotakHitamRes(subMenuAktif) {
  const kotakHitam = subMenuAktif.querySelector(".sliding-highlight");
  const tombolAktif = subMenuAktif.querySelector(".pilihan-1.active");

  if (kotakHitam && tombolAktif) {
    kotakHitam.style.width = tombolAktif.offsetWidth + "px";
    kotakHitam.style.height = tombolAktif.offsetHeight + "px";
    kotakHitam.style.left = tombolAktif.offsetLeft + "px";
    kotakHitam.style.top = tombolAktif.offsetTop + "px";
  }
}

function saringKartuMenuRes(kategoriYangDipilih) {
  const semuaKartu = document.querySelectorAll("#res-menu-container .kartu-menu-1");
  let jumlahmenutampil = 0;
  let totalRelevan = 0;

  semuaKartu.forEach(function (kartu) {
    const kategoriKartu = kartu.getAttribute("data-sub");
    const relevan = kategoriYangDipilih === "" || !kategoriYangDipilih || kategoriKartu === kategoriYangDipilih;

    if (relevan) {
      totalRelevan++;
      if (jumlahmenutampil < batasTampilRes) {
        kartu.style.display = "block";
        jumlahmenutampil++;
      } else {
        kartu.style.display = "none";
      }
    } else {
      kartu.style.display = "none";
    }
  });

  const lihatsemuabtn = document.getElementById("res-btn-lihat-semua");
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

// 1. Kategori Click
const resKategoriUtama = document.querySelectorAll("#res-menu-area .kategori-wrapper a");
resKategoriUtama.forEach(function (kategori) {
  kategori.addEventListener("click", function (e) {
    e.preventDefault();
    if (pesanKosongRes != null) {
      pesanKosongRes.style.display = "none";
    }
    document.querySelectorAll("#res-menu-area .best-seller-iced").forEach(element => {
      element.style.display = "flex";
    });

    const searchInput = document.getElementById("res-search");
    if (searchInput && searchInput.value.trim() !== "" && e.isTrusted) {
      searchInput.value = "";
    }

    resKategoriUtama.forEach(function (k) {
      k.classList.remove("active-kategori");
    });
    kategori.classList.add("active-kategori");

    const bestsellerbtn = document.getElementById("res-bs-btn");
    const icedbtn = document.getElementById("res-i-btn");
    if (bestsellerbtn) bestsellerbtn.classList.remove("active");
    if (icedbtn) icedbtn.classList.remove("active");

    batasTampilRes = 4;

    const namaTarget = kategori.getAttribute("data-res-target");
    const idSubMenuTarget = "res-sub-" + namaTarget;

    const semuaSubMenu = document.querySelectorAll("#res-menu-area .sub-menu");
    semuaSubMenu.forEach(function (menu) {
      menu.classList.add("hidden");
    }); 

    const subMenuYangMauDibuka = document.getElementById(idSubMenuTarget);
    if (subMenuYangMauDibuka) {
      subMenuYangMauDibuka.classList.remove("hidden");

      setTimeout(function () {
        geserKotakHitamRes(subMenuYangMauDibuka);
        
        // Jangan klik sub-menu pertama secara otomatis jika ini dipicu oleh pencarian (programmatic)
        if (searchInput && searchInput.value.trim() !== "" && !e.isTrusted) return;
        
        const tombolPertama = subMenuYangMauDibuka.querySelector(".pilihan-1");
        if (tombolPertama) {
          tombolPertama.click();
        }
      }, 10);
    }
  });
});

// 2. Sub-Kategori Click
const resTombolSubMenu = document.querySelectorAll("#res-menu-area .pilihan-1");
resTombolSubMenu.forEach(function (tombol) {
  tombol.addEventListener("click", function (e) {
    e.preventDefault();
    if (pesanKosongRes != null) {
      pesanKosongRes.style.display = "none";
    }
    document.querySelectorAll("#res-menu-area .best-seller-iced").forEach(element => {
      element.style.display = "flex";
    });

    const searchInput = document.getElementById("res-search");
    if (searchInput && searchInput.value.trim() !== "") {
      if (e.isTrusted) {
        searchInput.value = "";
      } else {
        // Klik terprogram dari pencarian. Hanya perbarui UI, jangan jalankan saringKartuMenuRes
        const subMenuInduk = tombol.closest(".sub-menu");
        const tombolLainnya = subMenuInduk.querySelectorAll(".pilihan-1");
        tombolLainnya.forEach(function (t) {
          t.classList.remove("active");
        });
        tombol.classList.add("active");
        geserKotakHitamRes(subMenuInduk);
        return;
      }
    }

    const subMenuInduk = tombol.closest(".sub-menu");
    const tombolLainnya = subMenuInduk.querySelectorAll(".pilihan-1");

    tombolLainnya.forEach(function (t) {
      t.classList.remove("active");
    });

    tombol.classList.add("active");
    geserKotakHitamRes(subMenuInduk);

    const bestsellerbtn = document.getElementById("res-bs-btn");
    const icedbtn = document.getElementById("res-i-btn");
    if (bestsellerbtn) bestsellerbtn.classList.remove("active");
    if (icedbtn) icedbtn.classList.remove("active");

    batasTampilRes = 4;

    const nilaiFilter = tombol.getAttribute("data-res-filter");
    saringKartuMenuRes(nilaiFilter);
  });
});

// 3. Search Logic
const resSearchbox = document.getElementById("res-search");
if(resSearchbox) {
  resSearchbox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      const teksDiketik = resSearchbox.value.toLowerCase();
      let menuTidakDitemukan = true;
      let subKategoriDitemukan = "";
      let kategoriDitemukan = "";
      const ambilsemuakartu = document.querySelectorAll("#res-menu-container .kartu-menu-1");

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
        pesanKosongRes.style.display = "block";
        pesanKosongRes.querySelector("p").innerText = "Maaf, menu reservasi tidak ditemukan!";
        document.querySelectorAll("#res-menu-area .best-seller-iced").forEach(element => {
          element.style.display = "none";
        });

        const lihatsemuabtn = document.getElementById("res-btn-lihat-semua");
        if (lihatsemuabtn) lihatsemuabtn.style.display = "none";

        document.querySelectorAll("#res-menu-area .kategori-wrapper a").forEach(k => k.classList.remove("active-kategori"));
        document.querySelectorAll("#res-menu-area .pilihan-1").forEach(t => t.classList.remove("active"));
        document.querySelectorAll("#res-menu-area .sliding-highlight").forEach(k => k.style.width = "0px");

        const semuaSubMenu = document.querySelectorAll("#res-menu-area .sub-menu");
        if (semuaSubMenu) {
          semuaSubMenu.forEach(function (menu) {
            menu.classList.add("hidden");
          });
        }
      } else {
        pesanKosongRes.style.display = "none";
        document.querySelectorAll("#res-menu-area .best-seller-iced").forEach(element => {
          element.style.display = "flex";
        });

        const lihatsemuabtn = document.getElementById("res-btn-lihat-semua");
        if (lihatsemuabtn) lihatsemuabtn.style.display = "block";
        const tombolKategoriUtama = document.querySelector(`#res-menu-area .kategori-wrapper a[data-res-target="${kategoriDitemukan}"]`);
        if (tombolKategoriUtama) {
          tombolKategoriUtama.click();
        }

        setTimeout(function () {
          const tombolSubMenu = document.querySelector(`#res-menu-area .sub-menu a[data-res-filter="${subKategoriDitemukan}"]`);
          if (tombolSubMenu) {
            tombolSubMenu.click();
          }
        }, 10);
      }
    }
  });

  resSearchbox.addEventListener("input", function (teksketik) {
    teksketik.preventDefault();
    const input = teksketik.target.value.toLowerCase();

    if (input === "") {
      pesanKosongRes.style.display = "none";
      document.querySelectorAll("#res-menu-area .best-seller-iced").forEach(element => {
        element.style.display = "flex";
      });

      const lihatsemuabtn = document.getElementById("res-btn-lihat-semua");
      if (lihatsemuabtn) lihatsemuabtn.style.display = "block";

      let kategoriAktif = document.querySelector("#res-menu-area .kategori-wrapper a.active-kategori");

      if (!kategoriAktif) {
        kategoriAktif = document.querySelector('#res-menu-area .kategori-wrapper a[data-res-target="makanan"]');
      }

      if (kategoriAktif) {
        kategoriAktif.click();
      }
    }
  });
}

// 4. Best Seller & Iced Filter
const resBestsellerbtn = document.getElementById("res-bs-btn");
const resIcedbtn = document.getElementById("res-i-btn");

if (resBestsellerbtn) {
  resBestsellerbtn.addEventListener("click", function (e) {
    e.preventDefault();

    const pesanKosongRes = document.getElementById("pesan-kosong-res");
    if (pesanKosongRes) {
      pesanKosongRes.style.display = "none";
    }

    const semuaKartu = document.querySelectorAll("#res-menu-container .kartu-menu-1");

    if (resBestsellerbtn.classList.contains("active")) {
      resBestsellerbtn.classList.remove("active");

      const Pilihanaktif = document.querySelector("#res-menu-area .sub-menu:not(.hidden) .pilihan-1.active");
      if (Pilihanaktif) {
        saringKartuMenuRes(Pilihanaktif.getAttribute("data-res-filter"));
      }
    } else {
    
      if (resIcedbtn) resIcedbtn.classList.remove("active");
      resBestsellerbtn.classList.add("active");

      const resLihatsemuabtn = document.getElementById("res-btn-lihat-semua");
      if (resLihatsemuabtn) {
        resLihatsemuabtn.style.display = "none";
      }

      const kategoriUtamaAktif = document.querySelector("#res-menu-area .kategori-wrapper a.active-kategori");
      const targetKategori = kategoriUtamaAktif ? kategoriUtamaAktif.getAttribute("data-res-target") : "";

      let menuDitampilkan = false;

      semuaKartu.forEach(function (kartu) {
        const teksKartu = kartu.innerText.toLowerCase();
        const kategoriKartu = kartu.getAttribute("data-kategori");
        
        const isBestseller = teksKartu.includes("best seller");
        const isSesuaiKategori = kategoriKartu === targetKategori;

        if (isBestseller && isSesuaiKategori) {
          kartu.style.display = "block";
          menuDitampilkan = true;
        } else {
          kartu.style.display = "none";
        }
      });

      if (menuDitampilkan === false) {
        if (pesanKosongRes) {
          pesanKosongRes.style.display = "block";
          pesanKosongRes.innerHTML = "<p>Maaf best seller tidak tersedia di kategori ini</p>";
        }
      }
    }
  });
}

if (resIcedbtn) {
  resIcedbtn.addEventListener("click", function (e) {
    e.preventDefault();

    const pesanKosongRes = document.getElementById("pesan-kosong-res");
    if (pesanKosongRes) {
      pesanKosongRes.style.display = "none";
    }

    const semuaKartu = document.querySelectorAll("#res-menu-container .kartu-menu-1");

    if (resIcedbtn.classList.contains("active")) {
      // Nonaktifkan Iced
      resIcedbtn.classList.remove("active");

      const tombolAktif = document.querySelector("#res-menu-area .sub-menu:not(.hidden) .pilihan-1.active");
      if (tombolAktif) {
        saringKartuMenuRes(tombolAktif.getAttribute("data-res-filter"));
      }
    } else {
      // Aktifkan Iced
      const kategoriUtamaAktif = document.querySelector("#res-menu-area .kategori-wrapper a.active-kategori");
      const targetKategori = kategoriUtamaAktif ? kategoriUtamaAktif.getAttribute("data-res-target") : "";

      if (targetKategori !== "minuman") {
        if (pesanKosongRes) {
          pesanKosongRes.style.display = "block";
          pesanKosongRes.innerHTML = "<p>Maaf, menu tidak ditemukan.</p>";
        }
        semuaKartu.forEach(kartu => kartu.style.display = "none");
      } else {
        if (resBestsellerbtn) resBestsellerbtn.classList.remove("active");
        resIcedbtn.classList.add("active");

        const resLihatsemuabtn = document.getElementById("res-btn-lihat-semua");
        if (resLihatsemuabtn) {
          resLihatsemuabtn.style.display = "none";
        }

        semuaKartu.forEach(function (kartu) {
          const teksKartu = kartu.innerText.toLowerCase();

          if (teksKartu.includes("iced")) {
            kartu.style.display = "block";
          } else {
            kartu.style.display = "none";
          }
        });
      }
    }
  });
}


// 5. Lihat Semua Menu
const resLihatsemuabtn = document.getElementById("res-btn-lihat-semua");
if(resLihatsemuabtn) {
  resLihatsemuabtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (resLihatsemuabtn.textContent === "Lihat Lebih Sedikit") {
      batasTampilRes = 4;
      resLihatsemuabtn.textContent = "Lihat Semua Menu";
    } else {
      batasTampilRes = batasTampilRes + 4;
    }

  
    const tombolKategoriAktif = document.querySelector("#res-menu-area .sub-menu:not(.hidden) .pilihan-1.active");
    let namaKategoriSaatIni = "";

    if (tombolKategoriAktif) {
      namaKategoriSaatIni = tombolKategoriAktif.getAttribute("data-res-filter");
    }

    saringKartuMenuRes(namaKategoriSaatIni);
  });
}

// 6. Data API Loading
async function loadMenuDineInClone() {
  try {
    const respons = await fetch(CONFIG.API_URL + '/api/menu');
    const dataMenu = await respons.json();

    const menuContainer = document.getElementById("res-menu-container");
    if(!menuContainer) return;
    menuContainer.innerHTML = "";

    dataMenu.forEach(function (menu) {
      const HTMLMenu = `
        <div class="kartu-menu-1" data-kategori="${menu.kategori}" data-sub="${menu.sub}">
          <div class="kartu-gambar">
            <img src="${menu.gambar}" alt="${menu.nama}" onload="this.parentElement.classList.add('loaded')" onerror="this.parentElement.classList.add('loaded'); this.alt='Gambar tidak tersedia';" />
            ${menu.badge ? `<span class="kartu-badge ${menu.badgeClass}">${menu.badge}</span>` : ""}
          </div>
          <div class="kartu-info">
            <h3 class="kartu-nama">${menu.nama}</h3>
            <p class="kartu-desk">${menu.deskripsi}</p>
            <div class="kartu-bawah">
              <span class="kartu-harga">${menu.harga}</span>
              <button class="kartu-btn btn-add-dinein" type="button" data-nama="${menu.nama}" data-harga="${menu.harga}" data-gambar="${menu.gambar}">+</button>
            </div>
          </div>
        </div>
      `;
      menuContainer.insertAdjacentHTML("beforeend", HTMLMenu);
    });

    // Create pesan kosong
    pesanKosongRes = document.createElement("div");
    pesanKosongRes.id = "pesan-kosong-res";
    pesanKosongRes.innerHTML = "<p>Maaf, menu reservasi tidak ditemukan!</p>";
    pesanKosongRes.style.display = "none";
    pesanKosongRes.style.width = "100%";
    pesanKosongRes.style.padding = "40px 20px";
    pesanKosongRes.style.marginTop = "24px";
    pesanKosongRes.style.textAlign = "center";
    pesanKosongRes.style.fontFamily = "Inter, sans-serif";
    pesanKosongRes.style.color = "#4e4540";

    const resLihatSemua = document.getElementById("res-btn-lihat-semua");
    if (resLihatSemua) {
      resLihatSemua.parentNode.insertBefore(pesanKosongRes, resLihatSemua);
    }
    
    // Trigger initial filter
    const firstCat = document.querySelector('#res-menu-area .kategori-wrapper a.active-kategori');
    if (firstCat) {
      firstCat.click();
    }

    // Attach Add to Cart Listeners
    const btns = menuContainer.querySelectorAll(".btn-add-dinein");
    btns.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const namaBarang = this.getAttribute("data-nama");
        const hargaTeks = this.getAttribute("data-harga");
        const hargaAngka = parseInt(hargaTeks.replace(/[^0-9]/g, ""));
        const gambarBarang = this.getAttribute("data-gambar");

        const datastorage = localStorage.getItem("keranjangCafe");
        let isiKeranjang = datastorage ? JSON.parse(datastorage) : [];

        const barangDitemukan = isiKeranjang.find(item => item.nama === namaBarang && item.tipe === "dinein");
        if (barangDitemukan) {
          barangDitemukan.jumlah += 1;
        } else {
          isiKeranjang.push({
            nama: namaBarang,
            harga: hargaAngka,
            gambar: gambarBarang,
            jumlah: 1,
            tipe: "dinein"
          });
        }

        localStorage.setItem("keranjangCafe", JSON.stringify(isiKeranjang));
        
        const badgekeranjang = document.getElementById("cart-badge");
        const humberger = document.getElementById("humberger-badge");
        if(badgekeranjang) {
           badgekeranjang.innerText = isiKeranjang.length;
           badgekeranjang.classList.remove("hidden");
        }
        if(humberger) {
           humberger.innerText = isiKeranjang.length;
           humberger.classList.remove("hidden");
        }

        const toastContainer = document.getElementById("toast-notif");
        const pesantoast = document.getElementById("toast-message");
        if(pesantoast) pesantoast.innerText = namaBarang + " masuk keranjang";
        if(toastContainer) {
          toastContainer.classList.add("show");
          setTimeout(() => toastContainer.classList.remove("show"), 2000);
        }
        
        if(typeof renderKeranjang === "function") {
           renderKeranjang();
        }
      });
    });



  } catch (err) {
    console.error("Gagal load menu reservasi", err);
  }
}

window.addEventListener("DOMContentLoaded", function () {
  loadMenuDineInClone();
  
  // Re-adjust sliding highlight on resize
  window.addEventListener("resize", function () {
    const subMenuAwal = document.querySelector("#res-menu-area .sub-menu:not(.hidden)");
    if (subMenuAwal) {
      geserKotakHitamRes(subMenuAwal);
    }
  });
});


