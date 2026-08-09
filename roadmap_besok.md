# Rencana Kerja (To-Do List) - Fase Selanjutnya

Dibuat pada: Hari ke-30 (Malam)
Status: Frontend Fundamental (HTML/CSS/DOM) - 70-80% Selesai

## 1. Persistensi Data Keranjang (State Management)
**Masalah saat ini:** Jika halaman di-refresh atau tertutup, data array `isiKeranjang` terhapus (hilang dari memori sementara/RAM browser). Pengalaman pengguna menjadi buruk jika mereka sudah memilih banyak menu.
**Rencana Besok:**
- Belajar tentang **Local Storage** di JavaScript (cara termudah menyimpan data di browser user tanpa database).
- Memutuskan apakah butuh **Database (Backend)** sesungguhnya untuk keranjang, atau cukup Local Storage saja (karena pesanan cafe biasanya bersifat sementara per sesi).

## 2. Alur Pembayaran & Integrasi API WhatsApp
**Tujuan:** Membuat alur pesanan (Checkout Flow) yang berdampak nyata bagi operasional cafe dan mudah digunakan pelanggan.
**Rencana Besok:**
- Menganalisis *User Journey*: Setelah klik "Pesan", data apa saja yang harus dikirim ke WhatsApp kasir/admin? (Daftar menu, total harga, nama pemesan, nomor meja/alamat).
- Mempelajari cara kerja **URL WhatsApp API** (contoh: `https://wa.me/628xxx?text=Halo...`) dan merakit pesan pesanan secara dinamis dari data `isiKeranjang` menggunakan JavaScript.

## 3. Pengenalan Keamanan Web & Fundamental Backend
**Konteks:** Mengingat fundamental komunikasi API (Request-Response) sudah dipahami dari pemisahan data menu kemarin.
**Rencana Besok:**
- Mempelajari peran Backend sesungguhnya: Menerima data dari Frontend, memvalidasi data (Security/Keamanan agar harga tidak diubah-ubah oleh user iseng di browser), dan menyimpannya.
- Eksplorasi konsep dasar Backend (misalnya memilih bahasa/framework backend seperti Node.js/Express, Python, atau PHP) untuk mengamankan transaksi cafe.

---
*Catatan Mentor:*
"Beristirahatlah. Besok kita mulai merangkai jembatan dari dunia statis (Frontend) menuju dunia dinamis (Backend & Data Persistence)!"
