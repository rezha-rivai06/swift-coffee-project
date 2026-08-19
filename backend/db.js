const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Menggunakan koneksi MongoDB yang sudah ada.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Terhubung Baru (Serverless Mode)!");
  } catch (error) {
    console.error("Gagal nyambung MongoDB:", error);
    throw error;
  }
};

module.exports = connectDB;
