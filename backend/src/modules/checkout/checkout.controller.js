const { prosesPesanan } = require('./checkout.service');

const checkout = async (req, res) => {
  try {
    const dataPesanan = req.body;
    const hasilWA = await prosesPesanan(dataPesanan);
    res.json({ status: "sukses", linkWA: hasilWA });
  } catch (error) {
    console.error("Gagal memproses pesanan:", error);
    res.status(500).json({ error: "Terjadi kesalahan di server" });
  }
};

module.exports = { checkout };
