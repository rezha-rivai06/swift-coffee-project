const Menu = require('./models/Menu');

const ambilDataMenu = async () => {
    return await Menu.find().sort({ kategori: 1, sub: 1 });
};

const tambahMenu = async (data) => {
    const menuBaru = new Menu(data);
    await menuBaru.save();
    return menuBaru;
};

const editMenu = async (id, data) => {
    return await Menu.findByIdAndUpdate(id, data, { new: true });
};

const hapusMenu = async (id) => {
    await Menu.findByIdAndDelete(id);
    return true;
};

module.exports = { ambilDataMenu, tambahMenu, editMenu, hapusMenu };
