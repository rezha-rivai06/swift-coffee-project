const express = require('express');
const router = express.Router();
const { login, verifyToken } = require('./auth.controller');
const { rateLimitAuth } = require('../../middlewares/rateLimiter');
const { cekToken } = require('./auth.service');

router.post('/login', rateLimitAuth, login);
router.get('/verify', cekToken, verifyToken);

module.exports = router;
