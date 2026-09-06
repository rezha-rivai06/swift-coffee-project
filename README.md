📦 swiftlink_saas/ (Root Proyek)
│
├── 📁 backend/ (Gedung Mesin & Data)
│   ├── 📁 config/           # Pintu Rahasia: Setup database, port, & kunci JWT (.env).
│   ├── 📁 routes/           # Pelayan API: Tempat mendaftar URL (misal: /api/login, /api/products).
│   ├── 📁 controllers/      # Resepsionis: Murni HANYA mencegat Request masuk, dan mengembalikan Response API.
│   │
│   ├── 📁 services/         # 🌟 KOKI UTAMA (Core Business Logic)
│   │                        # Tempat menaruh if/else, hitungan rumus, enkripsi password, dll.
│   │                        # Alasan: Supaya Controller tidak gemuk dan logika bisa dipakai berulang.
│   │
│   ├── 📁 models/           # Kulkas: File khusus berisi Query SQL ke Database.
│   ├── package.json         # Daftar plugin Backend.
│   └── server.js            # Saklar Utama penyala server Express.
│
│
├── 📁 frontend/ (Gedung Tampilan Utama)
│   ├── 📁 public/           # Aset mentah yang tidak diproses (favicon.ico).
│   ├── 📁 src/
│   │   ├── 📁 assets/       # CSS Global & Gambar yang butuh di-compress.
│   │   ├── 📁 router/       # Satpam Navigasi: Pengatur lalu lintas URL di browser.
│   │   │
│   │   ├── 📁 components/   # Lego GLOBAL (UI Umum): Komponen dasar yang dipakai di semua halaman.
│   │   │                    # Contoh: CustomButton.vue, ModalBox.vue, LoadingSpinner.vue.
│   │   │
│   │   ├── 📁 modules/      # 🌟 LEGO SPESIFIK (Berbasis Fitur)
│   │   │   
│   │   │   └── 📁 store/    # Semua hal tentang Toko (ProductList.vue, Cart.vue).
│   │   │                    # Alasan: Supaya folder components tidak berisi 100+ file yang membingungkan.
│   │   │
│   │   ├── 📁 views/        # Halaman Utuh: Murni hanya menyatukan/merakit Lego dari `components` & `modules`.
│   │   ├── App.vue          # Kanvas Induk.
│   │   └── main.js          # Injektor sistem Vue.js.
│   │
│   ├── vite.config.js       # Pengaturan kompilator Vite.
│   └── package.json         # Daftar plugin Frontend.
│
├── .gitignore               # Daftar hitam file yang dilarang di-upload ke GitHub.
└── README.md                # Buku panduan cara menjalankan kode.


@media screen and (max-width: 1440px) (Layar Laptop Besar)
@media screen and (max-width: 1280px) (Layar Laptop Standar)
@media screen and (max-width: 1200px) (Layar Laptop Kecil)
@media screen and (max-width: 1024px) (Layar Tablet Landscape / iPad Pro)
@media (max-width: 768px) (Layar Tablet Portrait / iPad)
@media screen and (max-width: 480px) (Layar HP Besar)
@media screen and (max-width: 479px) (Layar HP Sedang)
@media screen and (max-width: 360px) (Layar HP Terkecil)
