const fs = require('fs');
const path = require('path');
const { build } = require('esbuild');

async function runBuild() {
    console.log(" Memulai proses build dengan esbuild...");

    const frontendDir = path.join(__dirname, 'frontend');
    const distDir = path.join(__dirname, 'dist');

    if (fs.existsSync(distDir)) {
        fs.rmSync(distDir, { recursive: true, force: true });
    }


    console.log(" Menyalin file dari frontend/ ke dist/ ...");
    fs.cpSync(frontendDir, distDir, { recursive: true });


    const jsFiles = [
        path.join(distDir, 'script.js'),
        path.join(distDir, 'reservasi.js'),
        path.join(distDir, 'config.js'),
        path.join(distDir, 'admin', 'admin.js')
    ];

    const cssFiles = [
        path.join(distDir, 'styles.css'),
        path.join(distDir, 'admin', 'admin.css')
    ];

    const existingFiles = [...jsFiles, ...cssFiles].filter(file => fs.existsSync(file));

    console.log("✨ Menggiling kode JS & CSS di dalam folder dist/ ...");
    await build({
        entryPoints: existingFiles,
        outdir: distDir,
        outbase: distDir,
        minify: true,
        allowOverwrite: true,
    });

    console.log("✅ Proses build selesai! Kode minified siap digunakan dari folder dist/.");
}

runBuild().catch(err => {
    console.error("Terjadi kesalahan saat build:", err);
    process.exit(1);
});
