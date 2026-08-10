const express = require('express');
const app = express();
const cors = require('cors');

// ==========================================
// MENGIMPOR KOKI DARI DAPUR (BACKEND)
// ==========================================
const { ambilDataMenu } = require('../backend/menuLogic');
const { prosesPesanan } = require('../backend/checkoutLogic');

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// ENDPOINT 1: MEMINTA MENU
// ==========================================
app.get('/api/menu', (req, res) => {
  try {
    const dataMenu = ambilDataMenu();
    res.json(dataMenu);
  } catch (error) {
    console.error("Gagal mengambil menu:", error);
    res.status(500).json({ error: "Gagal memuat data menu" });
  }
});

// ==========================================
// ENDPOINT 2: MENGIRIM PESANAN
// ==========================================
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Pelayan API sudah menyala di http://localhost:${PORT}`);
});


