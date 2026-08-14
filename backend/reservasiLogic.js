const mongoDb = require('mongoose');

mongoDb.connect("mongodb+srv://rivzhent_db_user:ddJANbwX5VDVfPJM@rivzhent.4hyfgt5.mongodb.net/cafe_db?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Terhubung!"))
  .catch((err) => console.error("Gagal nyambung MongoDB:", err));

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
  const pecahMasuk = jamMasuk.split(":");
  const desimalMasuk = parseInt(pecahMasuk[0]) + (parseInt(pecahMasuk[1]) / 60);

  const totalTamuJamIni = reservasiHariIni.reduce((total, res) => {
    if (!res.jam) return total + res.jumlahTamu; 
    const pecahRes = res.jam.split(":");
    const desimalRes = parseInt(pecahRes[0]) + (parseInt(pecahRes[1]) / 60);
    const selisih = Math.abs(desimalMasuk - desimalRes);
    if (selisih < 2) return total + res.jumlahTamu;
    return total;
  }, 0);
  
  if ((totalTamuJamIni + jumlahTamu) > KAPASITAS_MAKSIMAL) {
    const sisaKursi = KAPASITAS_MAKSIMAL - totalTamuJamIni;
    return { 
      tersedia: false, 
      pesan: `Maaf, kursi pada rentang jam tersebut tidak cukup. Sisa: ${sisaKursi} kursi.` 
    };
  }
  return { tersedia: true };
};

const tambahReservasi = async (tanggal, jam, jumlahTamu) => {
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
  let teksWA = `Halo Swift Coffee ☕\n\nSaya ingin melakukan Reservasi.\n————————————\nNama : ${nama}\nTanggal : ${tanggal}\nJam Datang : ${jam}\nJumlah Tamu : ${jumlahTamu} orang\nBooking ID : ${idBooking}\n————————————\n`;
  
  if (pesanan && pesanan.length > 0) {
    teksWA += `*Pesanan Dine-In:*\n`;
    let total = 0;
    pesanan.forEach(item => {
      const harga = item.harga || 0; 
      teksWA += `- ${item.jumlah}x ${item.nama} (Rp ${harga.toLocaleString('id-ID')})\n`;
      total += (item.jumlah * harga);
    });
    teksWA += `\n*Total Tagihan: Rp ${total.toLocaleString('id-ID')}*\n————————————\n`;
  }
  
  teksWA += `Terima kasih!`;
  return "https://wa.me/61346851655?text=" + encodeURIComponent(teksWA);
};

module.exports = {
  cekKetersediaan,
  tambahReservasi,
  bersihkanDataLama,
  batalReservasi,
  buatPesanWhatsAppReservasi
};
