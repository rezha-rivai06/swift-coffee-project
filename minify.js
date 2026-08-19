const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

const frontendDir = path.join(__dirname, 'frontend');
const adminDir = path.join(frontendDir, 'admin');

async function minifyJS(filePath) {
    if (fs.existsSync(filePath)) {
        const code = fs.readFileSync(filePath, 'utf8');
        const result = await minify(code);
        fs.writeFileSync(filePath, result.code);
        console.log(`Minified JS: ${filePath}`);
    }
}

function minifyCSS(filePath) {
    if (fs.existsSync(filePath)) {
        const code = fs.readFileSync(filePath, 'utf8');
        const result = new CleanCSS({}).minify(code);
        fs.writeFileSync(filePath, result.styles);
        console.log(`Minified CSS: ${filePath}`);
    }
}

async function run() {
    console.log("Memulai proses penggilingan kode (Minification) khusus Vercel...");
    try {
        await minifyJS(path.join(frontendDir, 'script.js'));
        await minifyJS(path.join(frontendDir, 'reservasi.js'));
        await minifyJS(path.join(frontendDir, 'config.js'));
        await minifyJS(path.join(adminDir, 'admin.js'));
        
        minifyCSS(path.join(frontendDir, 'styles.css'));
        minifyCSS(path.join(adminDir, 'admin.css'));
        
        console.log("✅ Semua kode Frontend berhasil digilas menjadi 1 baris untuk Production!");
    } catch (err) {
        console.error("Error saat minification:", err);
        process.exit(1);
    }
}

run();
