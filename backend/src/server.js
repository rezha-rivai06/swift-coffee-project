const envConfig = require('./config/security');
const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./modules/auth/auth.routes');
const checkoutRoutes = require('./modules/checkout/checkout.routes');
const menuRoutes = require('./modules/menu/menu.routes');
const pengunjungRoutes = require('./modules/pengunjung/pengunjung.routes');
const reservasiRoutes = require('./modules/reservasi/reservasi.routes');

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DEBUG ERROR in Middleware:", error);
    res.status(500).json({ error: "Gagal menyambung ke Database", detail: error.message });
  }
});

// Routes
app.use('/api', authRoutes);
app.use('/api', checkoutRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api', pengunjungRoutes);
app.use('/api', reservasiRoutes);

const PORT = envConfig.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
