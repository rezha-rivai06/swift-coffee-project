const express = require('express');
const router = express.Router();
const { getStatistik, postStatistik } = require('./pengunjung.controller');
const { limiterRequest } = require('../../middlewares/rateLimiter');

router.get('/statistik', getStatistik);
router.post('/statistik', limiterRequest, postStatistik);

module.exports = router;
