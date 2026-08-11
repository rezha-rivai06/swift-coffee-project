const fs = require('fs');
const path = require('path');

const prosesPesanan = (dataDariFrontend) => {
    const nama = dataDariFrontend.nama;
    const tipe = dataDariFrontend.tipe || "Takeaway";
    const daftarPesanan = dataDariFrontend.pesanan;

    const jsonPath = path.join(__dirname, 'menu.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const menuAsli = JSON.parse(rawData);

    let teksWA = `Halo Swift Coffee ☕\n\nSaya ingin melakukan pemesanan (${tipe}).\n————————————\nNama : ${nama}\n————————————\nPesanan:\n`;

    let totalHargaAman = 0;

    daftarPesanan.forEach(itemPesanan => {
        const barangAsli = menuAsli.find(menu => menu.nama === itemPesanan.nama);

        if (barangAsli) {
            const subtotal = barangAsli.harga * itemPesanan.jumlah;
            totalHargaAman += subtotal;

            const hargaFormat = "IDR " + subtotal.toLocaleString('id-ID');
            teksWA += `- ${itemPesanan.jumlah}x ${barangAsli.nama} | ${hargaFormat}\n`;
        }
    });

    const totalFormat = "IDR " + totalHargaAman.toLocaleString('id-ID');
    teksWA += `————————————\nTOTAL\n${totalFormat}\n————————————\nPayment method : Pay at pick up / cashier\n\nThank you!`;

    return { sukses: true, linkWA: teksWA };
};

module.exports = { prosesPesanan };
