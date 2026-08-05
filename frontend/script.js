const cartBtn = document.getElementById("btn");
const hamburger = document.getElementById("hamburger");
const link = document.getElementById("link");

// --- NAVBAR & HAMBURGER MENU ---
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

// --- FITUR KATEGORI MENU & SLIDING HIGHLIGHT ---
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

  semuaKartu.forEach(function (kartu) {
    const kategoriKartu = kartu.getAttribute("data-sub");

    if (kategoriKartu === kategoriYangDipilih || !kategoriYangDipilih) {
      kartu.style.display = "block";
    } else {
      kartu.style.display = "none";
    }
  });
}

const semuaTombolSubMenu = document.querySelectorAll(".pilihan-1");

semuaTombolSubMenu.forEach(function (tombol) {
  tombol.addEventListener("click", function (e) {
    e.preventDefault();

    const subMenuInduk = tombol.closest(".sub-menu");
    const tombolLainnya = subMenuInduk.querySelectorAll(".pilihan-1");
    
    tombolLainnya.forEach(function (t) {
      t.classList.remove("active");
    });

    tombol.classList.add("active");
    geserKotakHitam(subMenuInduk);

    const nilaiFilter = tombol.getAttribute("data-filter");
    saringKartuMenu(nilaiFilter);
  });
});

const semuaKategoriUtama = document.querySelectorAll(".kategori-wrapper a");

semuaKategoriUtama.forEach(function (kategori) {
  kategori.addEventListener("click", function (e) {
    e.preventDefault();

    semuaKategoriUtama.forEach(function (k) {
      k.classList.remove("active-kategori");
    });
    kategori.classList.add("active-kategori");

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

// --- INISIALISASI SAAT HALAMAN DIMUAT ---
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

// --- FITUR SEARCH BOX ---
const searchbox = document.getElementById("search");

searchbox.addEventListener("input", function (teksketik) {
  teksketik.preventDefault();
  const input = teksketik.target.value.toLowerCase();
  const ambilsemuakartu = document.querySelectorAll(".kartu-menu-1");

  ambilsemuakartu.forEach(function (kartu) {
    const ambilnamakartu = kartu.querySelector(".kartu-nama").innerText.toLowerCase();

    if (ambilnamakartu.includes(input)) {
      kartu.style.display = "block";
    } else {
      kartu.style.display = "none";
    }
  });
});

// --- FITUR TOMBOL BEST SELLER ---
const bestsellerbtn = document.getElementById("bs-btn");

bestsellerbtn.addEventListener("click", function (e) {
  e.preventDefault();

  const targetkartu = document.querySelectorAll(".kartu-menu-1");

  if(bestsellerbtn.classList.contains("active")) {
    bestsellerbtn.classList.remove("active");

    targetkartu.forEach(function (kartu) {
      kartu.style.display = "block";
    });
    
  } else {
    icedbtn.classList.remove("active");
    bestsellerbtn.classList.add("active");

    targetkartu.forEach(function (kartu) {
      const isiteks = kartu.innerText.toLowerCase();

      if(isiteks.includes("best seller")) {
        kartu.style.display = "block";
      } else {
        kartu.style.display = "none";
      }
    });
  }

});

// --- FITUR TOMBOL ICED ---
const icedbtn = document.getElementById("i-btn");

icedbtn.addEventListener("click", function(e) {
  e.preventDefault();
  const targetkartu = document.querySelectorAll(".kartu-menu-1");

  if(icedbtn.classList.contains("active")) {
      icedbtn.classList.remove("active");
  
      targetkartu.forEach(function(kartu) {
        kartu.style.display = "block";
      });
      
  } else {
      bestsellerbtn.classList.remove("active");
      icedbtn.classList.add("active");

      targetkartu.forEach(function (kartu) {
        const isiteks = kartu.innerText.toLowerCase(); 

        if (isiteks.includes("iced")) {
          kartu.style.display = "block";
        } else {
          kartu.style.display = "none";
        }
      });
  }

});


// --- FITUR LOAD MORE (TAMPILKAN BERTAHAP) ---
const lihatsemuabtn = document.getElementById("btn-lihat-semua");
let batasTampil = 8; 
const daftarkartu = document.querySelectorAll(".kartu-menu-1");
const totalkartu = daftarkartu.length; 

// Inisialisasi tampilan awal
daftarkartu.forEach(function (kartu, index) {
  if(index < batasTampil) {
    kartu.style.display = "block";
  } else {
    kartu.style.display = "none";
  }
});
  
// Event klik tombol load more
lihatsemuabtn.addEventListener("click", function(e){
  e.preventDefault();
  
  if(lihatsemuabtn.innerText === "Lihat Lebih Sedikit") {
    batasTampil = 8;
    lihatsemuabtn.innerText = "Lihat Semua Menu";
  } else {
    // Tambah batas tampilan
    batasTampil = batasTampil + 8;

    // Ubah teks tombol jika semua kartu sudah tampil
    if(batasTampil >= totalkartu) {
      lihatsemuabtn.innerText = "Lihat Lebih Sedikit";
    }
  }

  // Terapkan batasan yang baru ke seluruh kartu
  daftarkartu.forEach(function (kartu, index){
    if(index < batasTampil) {
      kartu.style.display = "block";
    } else {
      kartu.style.display = "none";
    }
  });
});
