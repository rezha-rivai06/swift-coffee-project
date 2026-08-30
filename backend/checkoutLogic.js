const Menu = require('./models/Menu');

const prosesPesanan = async (dataPesanan) => {
    const nama = dataPesanan.nama;
    const tipe = dataPesanan.tipe || "Takeaway";
    const daftarPesanan = dataPesanan.pesanan;
    const menuAsli = await Menu.find();

    let teksWA = `Halo Swift Coffee ☕\n\nSaya ingin melakukan pemesanan (${tipe}).\n\n====================\n\nNama:\n${nama}\n\n====================\n\nPesanan:\n\n`;

    let totalHargaAman = 0;

    daftarPesanan.forEach(itemPesanan => {
        const barangAsli = menuAsli.find(menu => menu.nama === itemPesanan.nama);

        if (barangAsli) {
            let hargaAngka = 0;
            if (typeof barangAsli.harga === 'string') {
                hargaAngka = parseInt(barangAsli.harga.replace(/[^0-9]/g, ''), 10);
            } else {
                hargaAngka = barangAsli.harga;
            }

            const subtotal = hargaAngka * itemPesanan.jumlah;
            totalHargaAman += subtotal;

            const hargaFormat = "IDR " + subtotal.toLocaleString('id-ID');
            teksWA += `${itemPesanan.jumlah}x ${barangAsli.nama}\n${hargaFormat}\n\n`;
        }
    });

    const totalFormat = "IDR " + totalHargaAman.toLocaleString('id-ID');
    teksWA += `====================\n\nTOTAL\n${totalFormat}\n\n====================\n\nPembayaran dilakukan di kasir saat pengambilan.\n\nTerima kasih.`;

    const encodedWA = encodeURIComponent(teksWA);
    const linkWA = `https://api.whatsapp.com/send?phone=6282190334112&text=${encodedWA}`;

    return linkWA;
};

module.exports = { prosesPesanan };
