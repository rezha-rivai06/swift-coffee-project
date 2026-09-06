const Menu = require('../menu/menu.schema');

const prosesPesanan = async (dataPesanan) => {
    const nama = dataPesanan.nama;
    const tipe = dataPesanan.tipe || "Takeaway";
    const daftarPesanan = dataPesanan.pesanan;
    const menuAsli = await Menu.find();

    let teksWA = `Halo Swift Coffee ☕\n\nSaya ingin melakukan pemesanan (${tipe}).\n\n====================\n\nNama:\n${nama}\n\n====================\n\nPesanan:\n\n`;

    let totalHarga = 0;

    daftarPesanan.forEach(itemPesanan => {
        const item = menuAsli.find(menu => menu.nama === itemPesanan.nama);

        if (item) {
            let harga = 0;
            if (typeof item.harga === 'string') {
                harga = parseInt(item.harga.replace(/[^0-9]/g, ''), 10);
            } else {
                harga = item.harga;
            }

            const subtotal = harga * itemPesanan.jumlah;
            totalHarga += subtotal;

            const hargaFormat = "IDR " + subtotal.toLocaleString('id-ID');
            teksWA += `${itemPesanan.jumlah}x ${item.nama}\n${hargaFormat}\n\n`;
        }
    });

    const totalFormat = "IDR " + totalHarga.toLocaleString('id-ID');
    teksWA += `====================\n\nTOTAL\n${totalFormat}\n\n====================\n\nPembayaran dilakukan di kasir saat pengambilan.\n\nTerima kasih.`;

    const encodedWA = encodeURIComponent(teksWA);
    const linkWA = `https://api.whatsapp.com/send?phone=6282190334112&text=${encodedWA}`;

    return linkWA;
};

module.exports = { prosesPesanan };
