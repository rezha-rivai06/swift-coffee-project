require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { ambilDataMenu } = require('../backend/menuLogic');
const { prosesPesanan } = require('../backend/checkoutLogic');
const { cekKetersediaan, tambahReservasi, buatPesanWhatsAppReservasi, ambilSemuaReservasi, hapusReservasi } = require('../backend/reservasiLogic');
const { verifikasiPassword, cekToken } = require('../backend/authLogic');
const rateLimit = require('express-rate-limit');

app.use(cors());
app.use(express.json());

const connectDB = require('../backend/db');
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: "Gagal menyambung ke Database" });
  }
});

app.get('/api/menu', async (req, res) => {
  try {
    const dataMenu = await ambilDataMenu();
    res.json(dataMenu);
  } catch (error) {
    console.error("Gagal mengambil menu:", error);
    res.status(500).json({ error: "Gagal memuat data menu" });
  }
});

app.post('/api/menu', cekToken, async (req, res) => {
  try {
    const menuBaru = await require('../backend/menuLogic').tambahMenu(req.body);
    res.json({ sukses: true, menu: menuBaru });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambah menu" });
  }
});

app.put('/api/menu/:id', cekToken, async (req, res) => {
  try {
    const menuEdit = await require('../backend/menuLogic').editMenu(req.params.id, req.body);
    res.json({ sukses: true, menu: menuEdit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengedit menu" });
  }
});

app.delete('/api/menu/:id', cekToken, async (req, res) => {
  try {
    await require('../backend/menuLogic').hapusMenu(req.params.id);
    res.json({ sukses: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus menu" });
  }
});

app.post('/api/checkout', async (req, res) => {
  try {
    const dataPesanan = req.body;
    const hasilWA = await prosesPesanan(dataPesanan);
    res.json({ status: "sukses", linkWA: hasilWA });
  } catch (error) {
    console.error("Gagal memproses pesanan:", error);
    res.status(500).json({ error: "Terjadi kesalahan di server" });
  }
});


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

const rateLimitReservasi = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Sistem mendeteksi spam pesanan. Harap tunggu 15 menit lagi." }
});

app.post('/api/buat-reservasi', rateLimitReservasi, async (req, res) => {
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

// =====================================================================
// [KEAMANAN: LOKET LOGIN]
// =====================================================================

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const token = verifikasiPassword(password);
  
  if (token) {
    res.json({ sukses: true, token: token });
  } else {
    res.status(401).json({ error: "Password Salah!" });
  }
});


app.get('/api/reservasi', cekToken, async (req, res) => {
  try {
  const data = await ambilSemuaReservasi();
  res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat data reservasi" });
  }  
});


app.delete('/api/reservasi/:idBooking', cekToken, async (req, res) => {
  try {
  const { idBooking } = req.params;
  await hapusReservasi(idBooking);
  res.json({sukses: true });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus reservasi" });
  }  
});


const { ambilStatistik, tambahStatistik } = require('../backend/pengunjungLogic');

const limiterRequest = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  message: { error: "Sistem mendeteksi spam pesanan. Harap tunggu 1 menit lagi." }
});

app.get('/api/statistik', async (req, res) => {
  try {
    const data = await ambilStatistik();
    return res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat" });
  }
});

app.post('/api/statistik', limiterRequest, async (req, res) => {
  try {
    const data = await tambahStatistik();
    return res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat" });
  }   
});

module.exports = app;


