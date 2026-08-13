const fs = require('fs');
const html = fs.readFileSync('/home/rivzhent/project/cafe_project/frontend/index.html', 'utf8');
const script = fs.readFileSync('/home/rivzhent/project/cafe_project/frontend/script.js', 'utf8');

console.log("HTML has active-kategori:", html.includes("active-kategori"));
console.log("Script has kategoriAktif.click():", script.includes("kategoriAktif.click()"));
