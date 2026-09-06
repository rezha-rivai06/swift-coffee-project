const Menu = require('./menu.schema');
const cloudinary = require('../../config/cloudinary');

const uploadImage = async (image) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'cafe_menus',
        });
        return uploadResponse.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Gagal mengupload gambar ke Cloudinary");
    }
};

const ambilDataMenu = async () => {
    return await Menu.find().sort({ kategori: 1, sub: 1 });
};

const tambahMenu = async (data) => {
    if (data.gambar && data.gambar.startsWith('data:image')) {
        data.gambar = await uploadImage(data.gambar);
    }
    const menuBaru = new Menu(data);
    await menuBaru.save();
    return menuBaru;
};

const editMenu = async (id, data) => {
    if (data.gambar && data.gambar.startsWith('data:image')) {
        data.gambar = await uploadImage(data.gambar);
    }
    return await Menu.findByIdAndUpdate(id, data, { new: true });
};

const hapusMenu = async (id) => {
    await Menu.findByIdAndDelete(id);
    return true;
};

module.exports = { ambilDataMenu, tambahMenu, editMenu, hapusMenu };
