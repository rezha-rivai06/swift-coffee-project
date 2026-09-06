const rateLimit = require('express-rate-limit');

const rateLimitReservasi = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Sistem mendeteksi spam pesanan. Harap tunggu 15 menit lagi." }
});

const limiterRequest = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  message: { error: "Sistem mendeteksi spam request. Harap tunggu 1 menit lagi." }
});

const rateLimitAuth = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Terlalu banyak percobaan login. Silakan coba 15 menit lagi." }
});

module.exports = {
  rateLimitReservasi,
  limiterRequest,
  rateLimitAuth
};
