<script setup>
import { ref, onMounted, computed } from 'vue';

const dataMenu = ref([]);
const isLoading = ref(true);
const searchbox = ref('');
const isModalOpen = ref(false);
const isSaving = ref(false);

const formData = ref({
    _id: '',
    kategori: 'minuman',
    sub: '',
    nama: '',
    deskripsi: '',
    harga: '',
    gambar: '',
    badge: ''
});

const errorGambar = ref('');

function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file === undefined) {
        return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
        errorGambar.value = "Ukuran file terlalu besar! Maksimal 2MB";
        return;
    }

    errorGambar.value = "";
    
    const reader = new FileReader();

    reader.onload = () => {
        formData.value.gambar = reader.result;
    };

    reader.readAsDataURL(file);
}


const muatDataMenu = async () => {
    try {
        isLoading.value = true;
        const response = await fetch('/api/menu');
        if (response.ok) {
            dataMenu.value = await response.json();
        }
    } catch (error) {
        console.error("Gagal memuat menu:", error);
    } finally {
        isLoading.value = false;
    }
};

const bukaTambahMenu = () => {
    formData.value = { _id: '', kategori: 'minuman', sub: '', nama: '', deskripsi: '', harga: '', gambar: '', badge: '' };
    isModalOpen.value = true;
};

const bukaEditMenu = (menu) => {
    formData.value = { ...menu };
    isModalOpen.value = true;
};

const tutupModal = () => {
    isModalOpen.value = false;
};

const simpanMenu = async () => {
    isSaving.value = true;
    const token = localStorage.getItem('adminToken');
    const id = formData.value._id;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/menu/${id}` : '/api/menu';

    try {
        const response = await fetch(url, {
            method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify((() => { 
                const kirimData = { ...formData.value }; 
                if (!id) delete kirimData._id; 
                return kirimData; 
            })())
        });

        if (response.ok) {
            tutupModal();
            muatDataMenu();
        } else {
            let errorMsg = "Gagal menyimpan menu!";
            try {
                const errData = await response.json();
                errorMsg = errData.message || errData.error || errorMsg;
                if (response.status === 401 || response.status === 403) {
                    alert("Sesi login kamu sudah habis (token kadaluarsa). Silakan login ulang!");
                    localStorage.removeItem('adminToken');
                    window.location.reload();
                    return;
                }
            } catch(e) {
                console.error("Non-JSON error:", e);
                if (response.status === 413) errorMsg = "Ukuran gambar terlalu besar!";
            }
            alert(errorMsg);
        }
    } catch (error) {
        console.error(error);
        alert("Error koneksi!");
    } finally {
        isSaving.value = false;
    }
};

const hapusDataMenu = async (id) => {
    if(!confirm("Yakin ingin menghapus menu ini dari daftar?")) return;
    
    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch(`/api/menu/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if(response.ok) {
            muatDataMenu();
        } else {
            alert("Gagal menghapus menu.");
        }
    } catch (error) {
        console.error(error);
        alert("Error koneksi!");
    }
};

const filteredMenu = computed(() => {
    if (!searchbox.value) return dataMenu.value;
    const s = searchbox.value.toLowerCase();
    return dataMenu.value.filter(m => 
        m.nama.toLowerCase().includes(s) || 
        m.kategori.toLowerCase().includes(s) || 
        m.harga.toLowerCase().includes(s) || 
        m.sub.toLowerCase().includes(s)
    );
});

onMounted(() => {
    muatDataMenu();
});
</script>

<template>
  <main class="menu-container">
      <div class="menu-header">
          <h2>Daftar Menu Tersedia</h2>
          <div class="menu-actions">
              <div class="search-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input type="text" v-model="searchbox" placeholder="Cari nama menu, kategori, atau harga...">
              </div>
              <button @click="bukaTambahMenu" class="btn-tambah">+ Tambah Menu Baru</button>
          </div>
      </div>
      
      <div v-if="isLoading" style="padding: 20px; text-align: center; color: #6b7280;">Memuat menu...</div>
      
      <div v-else-if="filteredMenu.length === 0" class="empty-search-result">
          Menu <strong v-if="searchbox">"{{ searchbox }}"</strong> tidak ditemukan di Database.
      </div>

      <div v-else class="menu-grid">
          <div class="menu-card" v-for="menu in filteredMenu" :key="menu._id">
              <img :src="menu.gambar" :alt="menu.nama" @error="$event.target.src='https://placehold.co/400x300?text=Gambar+Error'">
              <div class="menu-info">
                  <span v-if="menu.badge" class="badge" :class="menu.badgeClass">{{ menu.badge }}</span>
                  <small style="text-transform: uppercase; color: #9ca3af; font-weight: bold; font-size: 0.75rem;">{{ menu.kategori }} - {{ menu.sub }}</small>
                  <h3>{{ menu.nama }}</h3>
                  <p>{{ menu.deskripsi }}</p>
                  <div class="menu-harga">{{ menu.harga }}</div>
              </div>
              <div class="menu-actions-bawah">
                  <button class="btn-edit" @click="bukaEditMenu(menu)">Edit</button>
                  <button class="btn-hapus" @click="hapusDataMenu(menu._id)">Hapus</button>
              </div>
          </div>
      </div>

      <!-- Modal Form Menu -->
      <div class="modal" :class="{ show: isModalOpen }" @click.self="tutupModal">
          <div class="modal-content">
              <span class="close-btn" @click="tutupModal">&times;</span>
              <h2>{{ formData._id ? 'Edit Menu' : 'Tambah Menu Baru' }}</h2>
              <form @submit.prevent="simpanMenu">
                  
                  <div class="form-group">
                      <label>Kategori</label>
                      <select v-model="formData.kategori" required>
                          <option value="minuman">Minuman</option>
                          <option value="makanan">Makanan</option>
                          <option value="snack">Snack</option>
                      </select>
                  </div>
                  
                  <div class="form-group">
                      <label>Sub Kategori / Jenis</label>
                      <input type="text" v-model="formData.sub" placeholder="Contoh: signature, tea, pasta..." required>
                  </div>
                  
                  <div class="form-group">
                      <label>Nama Menu</label>
                      <input type="text" v-model="formData.nama" placeholder="Nama Menu" required>
                  </div>
                  
                  <div class="form-group">
                      <label>Deskripsi</label>
                      <textarea v-model="formData.deskripsi" rows="3" placeholder="Deskripsi menu" required></textarea>
                  </div>
                  
                  <div class="form-group">
                      <label>Harga (Format Bebas)</label>
                      <input type="text" v-model="formData.harga" placeholder="Contoh: IDR 25.000" required>
                  </div>
                  
                  <div class="form-group">
                      <label>Upload Gambar Menu (Max 2MB)</label>
                      <!-- HTML dan Event disiapkan oleh AI -->
                      <input type="file" accept="image/*" @change="handleFileUpload" class="file-input" required>
                      <small v-if="errorGambar" class="error-teks" style="color: red; font-size: 12px; margin-top: 4px; display: block;">
                        {{ errorGambar }}
                      </small>
                  </div>
                  
                  <div class="form-group">
                      <label>Badge (Opsional)</label>
                      <input type="text" v-model="formData.badge" placeholder="Contoh: Best Seller">
                  </div>
                  
                  <button type="submit" class="btn-simpan" :disabled="isSaving">
                      {{ isSaving ? 'Menyimpan...' : 'Simpan Menu' }}
                  </button>
              </form>
          </div>
      </div>
  </main>
</template>

<style scoped>
/* SEARCH BOX & HEADER */
.menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 10px;
}
.menu-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}
.btn-tambah {
    background-color: #1f1f1f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
}
.btn-tambah:hover { transform: translateY(-2px); }

.search-box {
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 12px;
    width: 300px;
    transition: all 0.3s ease;
}
.search-box:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
.search-box svg { color: #94a3b8; margin-right: 8px; }
.search-box input { border: none; outline: none; width: 100%; font-size: 14px; font-family: inherit; color: #334155; }
.search-box input::placeholder { color: #94a3b8; }
.empty-search-result { text-align: center; padding: 40px; color: #64748b; font-size: 16px; background: white; border-radius: 12px; border: 1px dashed #cbd5e1; }

/* MENU GRID */
.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}
.menu-card {
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.menu-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
}
.menu-info h3 { margin: 5px 0; font-size: 1.2rem; color: #1f1f1f; }
.menu-info p { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; }
.menu-harga { font-weight: 700; color: #D4A373; font-size: 1.1rem; }

.badge {
    background-color: #ef4444;
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 5px;
}

.menu-actions-bawah {
    display: flex;
    gap: 10px;
    margin-top: auto;
}
.menu-actions-bawah button {
    flex: 1;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    border: none;
}
.btn-edit { background-color: #f3f4f6; color: #1f1f1f; }
.btn-edit:hover { background-color: #e5e7eb; }
.btn-hapus { background-color: rgba(239, 68, 68, 0.1); color: #ef4444; }
.btn-hapus:hover { background-color: rgba(239, 68, 68, 0.2); }

/* MODAL FORM */
.modal {
    display: none; 
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    align-items: center;
    justify-content: center;
}
.modal.show { display: flex; }
.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
}
.close-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: #6b7280;
}
.form-group { margin-bottom: 15px; }
.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #1f1f1f;
}
.form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-family: 'Outfit', sans-serif;
}
.btn-simpan {
    width: 100%;
    padding: 12px;
    background-color: #1f1f1f;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 10px;
}
.btn-simpan:hover { background-color: #000; }
.btn-simpan:disabled { opacity: 0.7; cursor: not-allowed; }

@media screen and (max-width: 768px) {
    .menu-header { flex-direction: column; align-items: flex-start; gap: 15px; margin-bottom: 25px; }
    .menu-header h2 { font-size: 1.3rem; }
    .btn-tambah { width: 100%; padding: 12px; font-size: 1rem; }
    .search-box { width: 100%; }
}
</style>
