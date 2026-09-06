const express = require('express');
const router = express.Router();
const { getMenu, createMenu, updateMenu, deleteMenu } = require('./menu.controller');
const { cekToken } = require('../auth/auth.service');

router.get('/', getMenu);
router.post('/', cekToken, createMenu);
router.put('/:id', cekToken, updateMenu);
router.delete('/:id', cekToken, deleteMenu);

module.exports = router;
