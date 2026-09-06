const { ambilStatistik, tambahStatistik } = require('./pengunjung.service');

const getStatistik = async (req, res) => {
  try {
    const data = await ambilStatistik();
    return res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat statistik" });
  }
};

const postStatistik = async (req, res) => {
  try {
    const data = await tambahStatistik();
    return res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat statistik" });
  }
};

module.exports = { getStatistik, postStatistik };
