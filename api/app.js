const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint API
app.get('/api/menu', (req, res) => {
  const jsonPath = path.join(__dirname, '../backend/menu.json');
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Gagal membaca menu.json:", err);
      return res.status(500).json({ error: "Gagal memuat data menu" });
    }
    
    // 3. Ubah teks JSON menjadi format objek asli lalu kirimkan ke Frontend
    res.json(JSON.parse(data));
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Pelayan API sudah menyala di http://localhost:${PORT}`);
});


