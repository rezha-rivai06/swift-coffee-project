const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
};

// Validasi
const requiredVariables = ['MONGO_URI', 'ADMIN_PASSWORD', 'JWT_SECRET'];
for (const variable of requiredVariables) {
  if (!config[variable]) {
    console.error(`[CRITICAL ERROR] Missing required environment variable: ${variable}`);
    process.exit(1);
  }
}

module.exports = config;
