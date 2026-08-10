const fs = require('fs');
const path = require('path');
const { cekKetersediaan, tambahReservasi } = require('./reservasiLogic');

const prosesPesanan = (dataDariFrontend) => {
    const nama = dataDariFrontend.nama;
    const tipe = dataDariFrontend.tipe;
    const daftarPesanan = dataDariFrontend.pesanan;
    const tanggal = dataDariFrontend.tanggal;
    const jumlahTamu = parseInt(dataDariFrontend.jumlahTamu) || 0;

    let idReservasi = null;

    if (tipe === "Dine-in") {
        if (!tanggal || !jumlahTamu) {
            return { sukses: false, pesan: "Tanggal dan jumlah tamu wajib diisi untuk reservasi." };
        }

        const ketersediaan = cekKetersediaan(tanggal, jumlahTamu);
        if (!ketersediaan.tersedia) {
            return { sukses: false, pesan: ketersediaan.pesan };
        }

        idReservasi = tambahReservasi(tanggal, jumlahTamu);
    }

    const jsonPath = path.join(__dirname, 'menu.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const menuAsli = JSON.parse(rawData);

    let teksWA = `Halo Swift Coffee ☕\n\nSaya ingin melakukan pemesanan (${tipe}).\n————————————\nNama : ${nama}\n`;
    
    if (tipe === "Dine-in") {
        teksWA += `Jadwal: ${tanggal}\nJumlah Tamu: ${jumlahTamu} Orang\nID Booking: ${idReservasi}\n`;
    }
    
    teksWA += `————————————\nPesanan:\n`;

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
    teksWA += `————————————\nTOTAL\n${totalFormat}\n————————————\nPayment method : Pay at pick up / cashier\n`;

    if (tipe === "Dine-in") {
        teksWA += `\n-------------------------\nAREA KHUSUS ADMIN CAFE:\nJika pelanggan ini BATAL, klik link di bawah ini untuk mengosongkan ${jumlahTamu} kursi kembali:\nhttp://localhost:5000/api/batal-reservasi?id=${idReservasi}`;
    } else {
        teksWA += `\nThank you!`;
    }

    return { sukses: true, linkWA: teksWA };
};

module.exports = { prosesPesanan };
