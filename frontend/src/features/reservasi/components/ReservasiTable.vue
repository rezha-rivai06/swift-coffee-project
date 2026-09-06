<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const reservasiList = ref([]);
const isLoading = ref(true);
const isError = ref(false);
let intervalId = null;

const muatDataReservasi = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
        const response = await fetch('/api/reservasi', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            reservasiList.value = await response.json();
            isError.value = false;
        } else {
            isError.value = true;
        }
    } catch (error) {
        console.error("Gagal mengambil data reservasi:", error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};

const hapusReservasi = async (idBooking, tipe) => {
    const pesanKonfirmasi = tipe === 'selesai' 
        ? "Apakah kamu yakin meja ini sudah selesai?"
        : "Apakah kamu yakin ingin MEMBATALKAN pesanan ini?";
        
    if (!confirm(pesanKonfirmasi)) return;

    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch(`/api/reservasi/${idBooking}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }   
        });
        
        if (response.ok) {
            muatDataReservasi();
        } else {
            alert("Gagal memproses aksi reservasi.");
        }
    } catch (error) {
        console.error("Gagal memproses aksi reservasi:", error);
        alert("Gagal memproses data.");
    }
};

const getStatus = (tanggal, jam) => {
    const waktuReservasi = new Date(`${tanggal}T${jam}:00`);
    const waktuSekarang = new Date();
    
    if (waktuSekarang >= waktuReservasi) {
        return { label: "Aktif", class: "status-aktif" };
    }
    return { label: "Menunggu", class: "status-menunggu" };
};

onMounted(() => {
    muatDataReservasi();
    intervalId = setInterval(muatDataReservasi, 5000); // auto refresh every 5s
});

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <main class="table-container">
      <table class="custom-table">
          <thead>
              <tr>
                  <th>ID Booking</th>
                  <th>Nama Pemesan</th>
                  <th>Tgl & Jam</th>
                  <th>Jumlah Tamu</th>
                  <th>Status</th>
                  <th>Aksi</th>
              </tr>
          </thead>
          <tbody>
              <tr v-if="isLoading">
                  <td colspan="6" class="empty-state">Memuat data...</td>
              </tr>
              <tr v-else-if="isError">
                  <td colspan="6" class="empty-state" style="color: #ff4757;">Gagal terhubung ke server</td>
              </tr>
              <tr v-else-if="reservasiList.length === 0">
                  <td colspan="6" class="empty-state">Belum ada pesanan yang masuk</td>
              </tr>
              <tr v-else v-for="item in reservasiList" :key="item.idBooking">
                  <td data-label="ID Booking"><strong>{{ item.idBooking }}</strong></td>
                  <td data-label="Nama Pemesan">{{ item.nama }}</td>
                  <td data-label="Tgl & Jam">
                      <div>
                          {{ item.tanggal }} <br> <small>{{ item.jam }}</small>
                      </div>
                  </td>
                  <td data-label="Jumlah Tamu">{{ item.jumlahTamu }} Orang</td>
                  <td data-label="Status">
                      <span class="status-badge" :class="getStatus(item.tanggal, item.jam).class">
                          {{ getStatus(item.tanggal, item.jam).label }}
                      </span>
                  </td>
                  <td data-label="Aksi">
                      <div class="aksi-buttons">
                          <button class="btn-selesai" @click="hapusReservasi(item.idBooking, 'selesai')">Selesai</button>
                          <button class="btn-batal" @click="hapusReservasi(item.idBooking, 'batal')">Batal</button>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
  </main>
</template>

<style scoped>
.table-container {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow-x: auto;
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

.custom-table th {
    color: #6b7280;
    font-size: 0.9rem;
    text-transform: uppercase;
    padding: 15px;
    border-bottom: 2px solid #e5e7eb;
}

.custom-table td {
    padding: 15px;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle;
}

.custom-table tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.empty-state {
    text-align: center;
    color: #6b7280;
    font-style: italic;
    padding: 30px !important;
}

/* Status Badges */
.status-badge {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
}

.status-aktif {
    background-color: rgba(46, 213, 115, 0.2);
    color: #10b981;
}

.status-menunggu {
    background-color: rgba(255, 165, 2, 0.2);
    color: #f59e0b;
}

/* Button Selesai & Batal */
.aksi-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
}

.btn-selesai {
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-selesai:hover {
    background-color: #ff2b40;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4);
}

.btn-selesai:active {
    transform: translateY(0);
}

.btn-batal {
    background-color: transparent;
    color: #ef4444;
    border: 1px solid #ef4444;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-batal:hover {
    background-color: rgba(239, 68, 68, 0.1);
}

/* RESPONSIVE DESIGN */
@media screen and (max-width: 768px) {
    .table-container {
        background: transparent;
        box-shadow: none;
        padding: 0;
    }

    .custom-table, .custom-table tbody, .custom-table tr, .custom-table td {
        display: block;
        width: 100%;
    }

    .custom-table thead {
        display: none; 
    }

    .custom-table tr {
        background-color: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        margin-bottom: 20px;
        padding: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .custom-table td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        padding: 10px 0;
        border-bottom: 1px dashed #e5e7eb;
    }

    .custom-table td:last-child {
        border-bottom: none;
        padding-bottom: 0;
        justify-content: flex-end;
    }

    .custom-table td::before {
        content: attr(data-label);
        font-weight: 600;
        color: #6b7280;
        text-align: left;
        flex-shrink: 0;
        margin-right: 15px;
    }

    .custom-table td[data-label="Aksi"]::before { display: none; }
    .custom-table td[data-label="Aksi"] { padding-top: 15px; justify-content: center; }

    .custom-table td[data-label="ID Booking"] {
        background-color: #f8f9fa;
        margin: -15px -15px 10px -15px;
        padding: 12px 15px;
        border-radius: 12px 12px 0 0;
        border-bottom: 1px solid #e5e7eb;
        color: #1f1f1f;
    }
    
    .custom-table td[data-label="ID Booking"]::before { color: #1f1f1f; }
    .custom-table td div { text-align: right; }
    .aksi-buttons { width: 100%; display: flex; gap: 10px; }
    .btn-selesai, .btn-batal { padding: 10px 16px; font-size: 0.95rem; flex: 1; margin-top: 5px; }
}
</style>
