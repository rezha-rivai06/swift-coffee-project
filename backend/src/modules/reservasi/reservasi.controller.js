const { cekKetersediaan, buatReservasi, buatPesanWhatsAppReservasi, ambilSemuaReservasi, hapusReservasi } = require('./reservasi.service');

const postCekReservasi = async (req, res) => {
  try {
    const { tanggal, jam, jumlahTamu } = req.body;
    const hasilCek = await cekKetersediaan(tanggal, jam, jumlahTamu);
    res.json(hasilCek);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Gagal mengecek kursi" });
  }
};

const postBuatReservasi = async (req, res) => {
  try {
    const { nama, tanggal, jam, jumlahTamu, pesanan } = req.body;
    const idBooking = await buatReservasi(tanggal, jam, jumlahTamu);
    
    const linkWA = buatPesanWhatsAppReservasi(nama, tanggal, jam, jumlahTamu, idBooking, pesanan);   
    
    res.json({ sukses: true, linkWA: linkWA });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal membuat reservasi" });
  }
};

const getReservasi = async (req, res) => {
  try {
    const data = await ambilSemuaReservasi();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat data reservasi" });
  }  
};

const deleteReservasi = async (req, res) => {
  try {
    const { idBooking } = req.params;
    await hapusReservasi(idBooking);
    res.json({ sukses: true });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus reservasi" });
  }  
};

module.exports = { postCekReservasi, postBuatReservasi, getReservasi, deleteReservasi };
