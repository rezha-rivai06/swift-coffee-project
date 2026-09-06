const jwt = require('jsonwebtoken');
const envConfig = require('../../config/security');
const Admin = require('./admin.schema');
const bcrypt = require('bcryptjs');

const verifikasiPassword = async (password) => {
    try {
        const admin = await Admin.findOne();
        let validitas = false;

        if (!admin) {
            if (password === envConfig.ADMIN_PASSWORD) {
                validitas = true;
            }
        } else {
            validitas = await bcrypt.compare(password, admin.password);
            if (!validitas && password === admin.password) {
                validitas = true;
            }
        }

        if (validitas) {
            return jwt.sign({ role: 'admin' }, envConfig.JWT_SECRET, { expiresIn: '8h' });
        } else {
            return false;
        }
    } catch (error) {
        console.error("Auth error:", error);
        return false;
    }
};

function cekToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan" });
    }
    
    jwt.verify(token, envConfig.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });
        }    
        req.user = user;
        next();
    });
}

module.exports = {
    verifikasiPassword,
    cekToken
};
