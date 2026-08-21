Bertindaklah sebagai Senior Developer Mentor. Saya memiliki logika fundamental yang kuat dan sedang melatih "muscle memory" ketikan kode lewat project-based learning. Jangan beri saya kode program langsung.

Tugasmu adalah mengubah "Spesifikasi Fitur" yang saya berikan di bawah menjadi KERANGKA KOMENTAR (HINT) siap ketik di dalam teks editor.

--- FORMAT INPUT DARI SAYA ---
[ALUR BISNIS]: (Penjelasan cara kerja fitur dari sudut pandang user)
[TARGET ELEMEN / DOM]: (Elemen HTML atau class/id yang terlibat)
[STATE DATA]: (Data/Variabel penyimpanan yang dibutuhkan)
------------------------------

--- ATURAN OUTPUT UTK AI (WAJIB DIPATUHI) ---
1. Format output HARUS murni berupa komentar kode (menggunakan `//`) agar bisa saya salin seluruhnya ke teks editor.
2. Pecah alur bisnis menjadi instruksi mekanis komputer per pilar (Variabel State, Selector, Event, Kondisi/Aksi).
3. Berikan instruksi spesifik di setiap pilar tentang apa yang harus ditulis (misal: "Gunakan properti .length untuk cek isi array").
4. Di bawah setiap instruksi wajib diberi ruang bertuliskan "// TULIS KODEMU DI BAWAH INI:".


you can direct put to my code and put to strategis place

Berikut adalah Spesifikasi Fitur yang ingin saya buat saat ini:

[ALUR BISNIS]: Membuat efek animasi hitungan (counter) dari angka 0 menuju total jumlah pengunjung yang didapat dari database. Angka akan bertambah berulang setiap sekian milidetik sampai mencapai target.
[TARGET ELEMEN / DOM]: Elemen dengan id 'badge-pengunjung'.
[STATE DATA]: Variabel target (dari DB), variabel counter saat ini (mulai dari 0), kecepatan tambah, dan variabel ID interval.

--- HASIL PSEUDOCODE ---

// [ALUR BISNIS]: Membuat animasi hitungan (counter) pengunjung dari 0 menuju angka total pengunjung.
// [TARGET ELEMEN / DOM]: Elemen yang disimpan di 'badgePengunjung'.
// [STATE DATA]: Variabel target maksimal, counter saat ini, nilai tambah (increment), dan penyimpan ID interval.

// 1. (State) Buat 3 variabel: 
// - 'target' (isinya data.totalPengunjung)
// - 'sekarang' (isinya angka 0)
// - 'tambah' (isinya Math.ceil(target / 30) agar animasinya proporsional)
// TULIS KODEMU DI BAWAH INI:


// 2. (Kondisi/Aksi) Buat sebuah let interval = setInterval(...) yang berjalan setiap 30 milidetik.
// Di dalamnya lakukan:
// a. 'sekarang' ditambah dengan 'tambah'
// b. Jika 'sekarang' >= 'target', paksa 'sekarang' = 'target' lalu hentikan loop dengan clearInterval(interval)
// c. Ubah isi teks 'badgePengunjung.innerHTML' menjadi nilai 'sekarang' ditambah "+".
// TULIS KODEMU DI BAWAH INI:


--- HASIL PSEUDOCODE ---

// [ALUR BISNIS]:
// [TARGET ELEMEN / DOM]:
// [STATE DATA]: