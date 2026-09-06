const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  kategori: { type: String, required: true },
  sub: { type: String, required: true },
  nama: { type: String, required: true },
  deskripsi: { type: String, required: true },
  harga: { type: String, required: true },
  gambar: { type: String, required: true },
  badge: { type: String, default: "" },
  badgeClass: { type: String, default: "" },
  id: { type: Number }
}, {
  timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);
