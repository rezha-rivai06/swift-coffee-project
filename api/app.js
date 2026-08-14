require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { ambilDataMenu } = require('../backend/menuLogic');
const { prosesPesanan } = require('../backend/checkoutLogic');
const { cekKetersediaan, tambahReservasi, buatPesanWhatsAppReservasi } = require('../backend/reservasiLogic');

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

app.post('/api/cek-reservasi', async (req, res) => {
  try {
    const { tanggal, jam, jumlahTamu } = req.body;
    const hasilCek = await cekKetersediaan(tanggal, jam, jumlahTamu);
    res.json(hasilCek);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Gagal mengecek kursi" });
  }
});

app.post('/api/buat-reservasi', async (req, res) => {
  try {
    const { nama, tanggal, jam, jumlahTamu, pesanan } = req.body;
    const idBooking = await tambahReservasi(tanggal, jam, jumlahTamu);
    
    const linkWA = buatPesanWhatsAppReservasi(nama, tanggal, jam, jumlahTamu, idBooking, pesanan);
    
    res.json({ sukses: true, linkWA: linkWA });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal membuat reservasi" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Pelayan API aktif di http://localhost:${PORT}`);
});


