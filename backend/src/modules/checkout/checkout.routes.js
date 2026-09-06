const express = require('express');
const router = express.Router();
const { checkout } = require('./checkout.controller');
const { limiterRequest } = require('../../middlewares/rateLimiter');

router.post('/checkout', limiterRequest, checkout);

module.exports = router;
