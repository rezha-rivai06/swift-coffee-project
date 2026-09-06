const mongoDb = require('mongoose');


const KAPASITAS_MAKSIMAL = 50;

const ReservasiSchema = new mongoDb.Schema({
  idBooking: { type: String, required: true },
  tanggal: { type: String, required: true },
  jam: { type: String, required: true },
  jumlahTamu: { type: Number, required: true },
  dibuatPada: { type: Date, default: Date.now }
});
const Reservasi = mongoDb.model('Reservasi', ReservasiSchema);
const bersihkanDataLama = async () => {
  
};

const cekKetersediaan = async (tanggal, jamMasuk, jumlahTamuMasuk) => {
  const jumlahTamu = parseInt(jumlahTamuMasuk);
  const reservasiHariIni = await Reservasi.find({ tanggal: tanggal });

  const totalTamuHariIni = reservasiHariIni.reduce((total, res) => {
    return total + res.jumlahTamu;
  }, 0);
  
  if ((totalTamuHariIni + jumlahTamu) > KAPASITAS_MAKSIMAL) {
    const sisaKursi = KAPASITAS_MAKSIMAL - totalTamuHariIni;
    return { 
      tersedia: false, 
      pesan: `Maaf, kursi untuk hari tersebut tidak cukup. Sisa: ${sisaKursi} kursi.` 
    };
  }
  return { tersedia: true };
};

const buatReservasi = async (tanggal, jam, jumlahTamu) => {
  const idBaru = 'RES-' + Date.now().toString();
    await Reservasi.create({
    idBooking: idBaru,
    tanggal: tanggal,
    jam: jam,
    jumlahTamu: parseInt(jumlahTamu)
  });

  return idBaru;
};

const batalReservasi = async (id) => {
  await Reservasi.deleteOne({ idBooking: id });
  return true;
};

const buatPesanWhatsAppReservasi = (nama, tanggal, jam, jumlahTamu, idBooking, pesanan) => {
  let teksWA = `Halo Swift Coffee ☕\n\nSaya ingin melakukan Reservasi.\n\n====================\n\nNama:\n${nama}\n\nTanggal:\n${tanggal}\n\nJam Datang:\n${jam}\n\nJumlah Tamu:\n${jumlahTamu} orang\n\nBooking ID:\n${idBooking}\n\n====================\n\n`;
  
  if (pesanan && pesanan.length > 0) {
    teksWA += `Pesanan:\n\n`;
    let total = 0;
    pesanan.forEach(item => {
      const harga = item.harga || 0; 
      const hargaFormat = "IDR " + (item.jumlah * harga).toLocaleString('id-ID');
      teksWA += `${item.jumlah}x ${item.nama}\n${hargaFormat}\n\n`;
      total += (item.jumlah * harga);
    });
    teksWA += `====================\n\nTOTAL\nIDR ${total.toLocaleString('id-ID')}\n\n====================\n\n`;
  }
  
  teksWA += `Pembayaran dilakukan di kasir saat kedatangan.\n\nTerima kasih.`;
  return "https://wa.me/6282190334112?text=" + encodeURIComponent(teksWA);
};


// ADMIN DASHBOARD
const ambilSemuaReservasi = async () => {
  const ambilDataReservasi = await Reservasi.find().sort({ dibuatPada: -1});
  return ambilDataReservasi;
};
const hapusReservasi = async (idBooking) => {
  const hapusDataReservasi = await Reservasi.deleteOne({ idBooking });
  return true;
};
module.exports = {
  cekKetersediaan,
  buatReservasi,
  bersihkanDataLama,
  batalReservasi,
  buatPesanWhatsAppReservasi,
  ambilSemuaReservasi,
  hapusReservasi
}
