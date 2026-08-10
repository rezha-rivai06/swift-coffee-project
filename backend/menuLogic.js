
const fs = require('fs');
const path = require('path');

const ambilDataMenu = () => {
    const jsonPath = path.join(__dirname, 'menu.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(rawData);
};

module.exports = { ambilDataMenu };
