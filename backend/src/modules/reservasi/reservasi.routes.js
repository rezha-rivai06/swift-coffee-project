const express = require('express');
const router = express.Router();
const { CekReservasi, BuatReservasi, getReservasi, deleteReservasi } = require('./reservasi.controller');
const { cekToken } = require('../auth/auth.service');
const { rateLimitReservasi } = require('../../middlewares/rateLimiter');

router.post('/cek-reservasi', CekReservasi);
router.post('/buat-reservasi', rateLimitReservasi, BuatReservasi);
router.get('/reservasi', cekToken, getReservasi);
router.delete('/reservasi/:idBooking', cekToken, deleteReservasi);

module.exports = router;
