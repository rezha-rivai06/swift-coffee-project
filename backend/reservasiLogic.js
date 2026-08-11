const fs = require('fs');
const path = require('path');
const KAPASITAS_MAKSIMAL = 50;


const bacaDataReservasi = () => {
  try {
    const lokasiDatabase = path.join(__dirname, 'reservasi.json');
    const dataMentah = fs.readFileSync(lokasiDatabase, 'utf8');
    return JSON.parse(dataMentah);
  } catch (error) {
    return [];
  }
};


const cekKetersediaan = (tanggal, jumlahTamuMasuk) => {
  const jumlahTamu = parseInt(jumlahTamuMasuk);
  const semuaReservasi = bacaDataReservasi();
  
  const reservasiHariIni = semuaReservasi.filter(res => res.tanggal === tanggal);
  const totalTamuSudahBooking = reservasiHariIni.reduce((total, res) => total + res.jumlahTamu, 0);
  
  if ((totalTamuSudahBooking + jumlahTamu) > KAPASITAS_MAKSIMAL) {
    const sisaKursi = KAPASITAS_MAKSIMAL - totalTamuSudahBooking;
    return { 
      tersedia: false, 
      pesan: `Maaf, sisa kursi tidak cukup. Sisa: ${sisaKursi} kursi.` 
    };
  }
  
  return { tersedia: true };
};


const tambahReservasi = (tanggal, jumlahTamu) => {
  const semuaReservasi = bacaDataReservasi();
  
  const idBaru = 'RES-' + Date.now().toString();
  
  const reservasiBaru = {
    id: idBaru,
    tanggal: tanggal,
    jumlahTamu: parseInt(jumlahTamu)
  };
  
  semuaReservasi.push(reservasiBaru);
  
  const lokasiDatabase = path.join(__dirname, 'reservasi.json');
  fs.writeFileSync(lokasiDatabase, JSON.stringify(semuaReservasi, null, 2));
  
  return idBaru;
};


const batalReservasi = (id) => {
  const semuaReservasi = bacaDataReservasi();
  
  const sisaReservasi = semuaReservasi.filter(res => res.id !== id);
  
  const lokasiDatabase = path.join(__dirname, 'reservasi.json');
  fs.writeFileSync(lokasiDatabase, JSON.stringify(sisaReservasi, null, 2));
  
  return true;
};

module.exports = {
  cekKetersediaan,
  tambahReservasi,
  batalReservasi
};
