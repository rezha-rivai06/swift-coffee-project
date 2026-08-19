const Pengunjung = require('./models/Pengunjung');

const ambilStatistik = async () => {
    const data = await Pengunjung.findOne();
    if (!data) {
        return { totalPengunjung: 2000 };
    }
    return { totalPengunjung: 2000 + data.totalPengunjung };
};

const tambahStatistik = async () => {
    let data = await Pengunjung.findOne();
    let angkaTerbaru;

    if (data) {
        data.totalPengunjung++;
        await data.save();
        angkaTerbaru = data.totalPengunjung;
    } else {
        data = new Pengunjung({ totalPengunjung: 1 });
        await data.save();
        angkaTerbaru = data.totalPengunjung;
    }

    return { totalPengunjung: 2000 + angkaTerbaru };
};

module.exports = { ambilStatistik, tambahStatistik };
