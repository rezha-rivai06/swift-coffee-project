const express = require('express');
const app = require('./api/app.js');
const path = require('path');

app.use(express.static(path.join(__dirname, 'frontend')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`LOKAL DEVELOPMENT SERVER BERJALAN AKTIF!`);
    console.log(`Buka di browser: http://localhost:${PORT}`);
});
