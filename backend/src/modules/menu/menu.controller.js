const menuService = require('./menu.service');

const getMenu = async (req, res) => {
  try {
    const dataMenu = await menuService.ambilDataMenu();
    res.json(dataMenu);
  } catch (error) {
    console.error("Gagal mengambil menu:", error);
    res.status(500).json({ error: "Gagal memuat data menu" });
  }
};

const createMenu = async (req, res) => {
  try {
    const menuBaru = await menuService.tambahMenu(req.body);
    res.json({ sukses: true, menu: menuBaru });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambah menu" });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menuEdit = await menuService.editMenu(req.params.id, req.body);
    res.json({ sukses: true, menu: menuEdit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengedit menu" });
  }
};

const deleteMenu = async (req, res) => {
  try {
    await menuService.hapusMenu(req.params.id);
    res.json({ sukses: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus menu" });
  }
};

module.exports = { getMenu, createMenu, updateMenu, deleteMenu };
