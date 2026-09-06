const { verifikasiPassword } = require('./auth.service');

const login = async (req, res) => {
  const { password } = req.body;
  const token = await verifikasiPassword(password);
  
  if (token) {
    res.json({ sukses: true, token: token });
  } else {
    res.status(401).json({ error: "Password Salah!" });
  }
};

const verifyToken = (req, res) => {
  res.status(200).json({ valid: true });
};

module.exports = { login, verifyToken };
