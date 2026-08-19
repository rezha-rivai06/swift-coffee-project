const mongoose = require('mongoose');

const pengunjungSchema = new mongoose.Schema({
    totalPengunjung: { 
        type: Number, 
        default: 0 
    }
}); 

module.exports = mongoose.model('Pengunjung', pengunjungSchema);