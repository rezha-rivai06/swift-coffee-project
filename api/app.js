const express = require('express');
const app = express();
const cors = require('cors');

// ==========================================
// MENGIMPOR KOKI DARI DAPUR (BACKEND)
// ==========================================
const { ambilDataMenu } = require('../backend/menuLogic');
const { prosesPesanan } = require('../backend/checkoutLogic');
const { cekKetersediaan, tambahReservasi } = require('../backend/reservasiLogic');

// Middleware
app.use(cors());
app.use(express.json());


app.get('/api/menu', (req, res) => {
  try {
    const dataMenu = ambilDataMenu();
    res.json(dataMenu);
  } catch (error) {
    console.error("Gagal mengambil menu:", error);
    res.status(500).json({ error: "Gagal memuat data menu" });
  }
});


app.post('/api/checkout', (req, res) => {
  try {
    const dataPesanan = req.body;
    const hasilWA = prosesPesanan(dataPesanan);
    res.json({ status: "sukses", linkWA: hasilWA });
  } catch (error) {
    console.error("Gagal memproses pesanan:", error);
    res.status(500).json({ error: "Terjadi kesalahan di server" });
  }
});

// ==========================================
// ENDPOINT 3 & 4: RESERVASI MEJA
// ==========================================

// Endpoint Cek Ketersediaan
app.post('/api/cek-reservasi', (req, res) => {
  try {
    const {tanggal, jumlahTamuMasuk} = req.body;
    const hasilCek = cekKetersediaan(tanggal, jumlahTamuMasuk);
    res.json(hasilCek);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Gagal mengecek kursi" });
  }
});

// Endpoint Buat Reservasi
app.post('/api/buat-reservasi', (req, res) => {
  try {
    const { nama, tanggal, jumlahTamu, pesanan } = req.body;
    const idBooking = tambahReservasi(tanggal, jumlahTamu);
    
    let teksWA = `Halo Swift Coffee ☕\n\nSaya ingin melakukan Reservasi Meja.\n————————————\nNama : ${nama}\nTanggal : ${tanggal}\nJumlah Tamu : ${jumlahTamu} orang\nBooking ID : ${idBooking}\n————————————\n`;
    
    if (pesanan && pesanan.length > 0) {
      teksWA += `*Pesanan Dine-In:*\n`;
      let total = 0;
      pesanan.forEach(item => {
        teksWA += `- ${item.jumlah}x ${item.nama} (Rp ${item.harga.toLocaleString('id-ID')})\n`;
        total += (item.jumlah * item.harga);
      });
      teksWA += `\n*Total Tagihan: Rp ${total.toLocaleString('id-ID')}*\n————————————\n`;
    }
    
    teksWA += `Terima kasih!`;
    
    const linkWA = "https://wa.me/6281234567890?text=" + encodeURIComponent(teksWA);
    
    res.json({ sukses: true, linkWA: linkWA });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal membuat reservasi" });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Pelayan API sudah menyala di http://localhost:${PORT}`);
});


