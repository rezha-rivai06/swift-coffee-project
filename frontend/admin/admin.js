const apiUrl = CONFIG.API_URL + '/api/reservasi';
const tbodyReservasi = document.getElementById('tbodyReservasi');

const token = localStorage.getItem('adminToken');
if (!token) {
    alert("Anda belum login sebagai Admin!");
    window.location.href = '../index.html';
}


async function muatDataReservasi() {
    try {
        const hasil = await fetch(apiUrl, {
              headers: { 'Authorization': `Bearer ${token}` }
       });
        const data = await hasil.json();
        
        tbodyReservasi.innerHTML = '';

        if (data.length === 0) {
            tbodyReservasi.innerHTML = `
              <tr>
                <td colspan="6" class="empty-state">Belum ada pesanan yang masuk</td>
              </tr>
            `;
        } else {
            data.forEach((item) => {
                const waktuReservasi = new Date(`${item.tanggal}T${item.jam}:00`);
                const waktuSekarang = new Date();
                
                let labelStatus = "Menunggu";
                let classStatus = "status-menunggu";

                if (waktuSekarang >= waktuReservasi) {
                    labelStatus = "Aktif";
                    classStatus = "status-aktif";
                }

                tbodyReservasi.innerHTML += `
                  <tr>
                    <td data-label="ID Booking"><strong>${item.idBooking}</strong></td>
                    <td data-label="Nama Pemesan">${item.nama}</td>
                    <td data-label="Tgl & Jam">
                        <div>
                            ${item.tanggal} <br> <small>${item.jam}</small>
                        </div>
                    </td>
                    <td data-label="Jumlah Tamu">${item.jumlahTamu} Orang</td>
                    <td data-label="Status"><span class="status-badge ${classStatus}">${labelStatus}</span></td>
                    <td data-label="Aksi">
                        <div class="aksi-buttons">
                            <button class="btn-selesai" onclick="hapusReservasi('${item.idBooking}', 'selesai')">Selesai</button>
                            <button class="btn-batal" onclick="hapusReservasi('${item.idBooking}', 'batal')">Batal</button>
                        </div>
                    </td>
                  </tr>
                `;
            });
        }
    } catch (error) {
        console.error("Gagal mengambil data reservasi:", error);
        tbodyReservasi.innerHTML = `
          <tr>
            <td colspan="6" class="empty-state" style="color: #ff4757;">Gagal terhubung ke server</td>
          </tr>
        `;
    }
}


async function hapusReservasi(idBooking, tipe) {
    const pesanKonfirmasi = tipe === 'selesai' 
        ? "Apakah kamu yakin meja ini sudah selesai?"
        : "Apakah kamu yakin ingin MEMBATALKAN pesanan ini?";
        
    const konfirmasi = confirm(pesanKonfirmasi);
    if (!konfirmasi) {
        return;
    }

    try {
        await fetch(`${apiUrl}/${idBooking}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }   
        });
        muatDataReservasi();
    } catch (error) {
        console.error("Gagal memproses aksi reservasi:", error);
        alert("Gagal memproses data.");
    }
}

muatDataReservasi();
setInterval(muatDataReservasi, 5000);


const btnTabReservasi = document.getElementById('btn-tab-reservasi');
const btnTabMenu = document.getElementById('btn-tab-menu');
const sectionReservasi = document.getElementById('section-reservasi');
const sectionMenu = document.getElementById('section-menu');

btnTabReservasi.addEventListener('click', () => {
    btnTabReservasi.classList.add('active');
    btnTabMenu.classList.remove('active');
    sectionReservasi.style.display = 'block';
    sectionMenu.style.display = 'none';
});

btnTabMenu.addEventListener('click', () => {
    btnTabMenu.classList.add('active');
    btnTabReservasi.classList.remove('active');
    sectionMenu.style.display = 'block';
    sectionReservasi.style.display = 'none';
    muatDataMenu(); 
});


const apiMenuUrl = CONFIG.API_URL + '/api/menu';
const gridMenu = document.getElementById('grid-menu');

async function muatDataMenu() {
    try {
        gridMenu.innerHTML = '<p>Memuat menu...</p>';
        const hasil = await fetch(apiMenuUrl);
        const dataMenu = await hasil.json();
        
        gridMenu.innerHTML = '';
        if(dataMenu.length === 0) {
            gridMenu.innerHTML = '<p>Belum ada menu di Database.</p>';
            return;
        }

        dataMenu.forEach(menu => {
            const badgeHtml = menu.badge ? `<span class="badge ${menu.badgeClass}">${menu.badge}</span>` : '';
            gridMenu.innerHTML += `
                <div class="menu-card">
                    <img src="${menu.gambar}" alt="${menu.nama}" onerror="this.src='https://placehold.co/400x300?text=Gambar+Error'">
                    <div class="menu-info">
                        ${badgeHtml}
                        <small style="text-transform: uppercase; color: #9ca3af; font-weight: bold; font-size: 0.75rem;">${menu.kategori} - ${menu.sub}</small>
                        <h3>${menu.nama}</h3>
                        <p>${menu.deskripsi}</p>
                        <div class="menu-harga">${menu.harga}</div>
                    </div>
                    <div class="menu-actions">
                        <button class="btn-edit" onclick='bukaEditMenu(${JSON.stringify(menu).replace(/'/g, "&#39;")})'>Edit</button>
                        <button class="btn-hapus" onclick="hapusDataMenu('${menu._id}')">Hapus</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        gridMenu.innerHTML = '<p style="color:red;">Gagal memuat menu dari server.</p>';
        console.error(error);
    }
}

// --- MODAL HANDLING ---
const modalMenu = document.getElementById('modal-menu');
const btnTambahMenu = document.getElementById('btn-tambah-menu');
const closeBtn = document.querySelector('.close-btn');
const formMenu = document.getElementById('form-menu');

btnTambahMenu.addEventListener('click', () => {
    formMenu.reset();
    document.getElementById('menu-id').value = '';
    document.getElementById('modal-title').innerText = 'Tambah Menu Baru';
    modalMenu.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    modalMenu.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if(e.target === modalMenu) {
        modalMenu.classList.remove('show');
    }
});

// --- FUNGSI BUKA EDIT ---
window.bukaEditMenu = function(menu) {
    document.getElementById('modal-title').innerText = 'Edit Menu';
    document.getElementById('menu-id').value = menu._id;
    document.getElementById('menu-kategori').value = menu.kategori;
    document.getElementById('menu-sub').value = menu.sub;
    document.getElementById('menu-nama').value = menu.nama;
    document.getElementById('menu-deskripsi').value = menu.deskripsi;
    document.getElementById('menu-harga').value = menu.harga;
    document.getElementById('menu-gambar').value = menu.gambar;
    document.getElementById('menu-badge').value = menu.badge || '';
    
    modalMenu.classList.add('show');
};

// --- SIMPAN (TAMBAH / EDIT) ---
formMenu.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('menu-id').value;
    
    const payload = {
        kategori: document.getElementById('menu-kategori').value,
        sub: document.getElementById('menu-sub').value,
        nama: document.getElementById('menu-nama').value,
        deskripsi: document.getElementById('menu-deskripsi').value,
        harga: document.getElementById('menu-harga').value,
        gambar: document.getElementById('menu-gambar').value,
        badge: document.getElementById('menu-badge').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiMenuUrl}/${id}` : apiMenuUrl;

    try {
        const btnSimpan = document.querySelector('.btn-simpan');
        btnSimpan.innerText = 'Menyimpan...';
        btnSimpan.disabled = true;

        const res = await fetch(url, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            modalMenu.classList.remove('show');
            muatDataMenu();
        } else {
            alert("Gagal menyimpan menu!");
        }
    } catch (error) {
        console.error(error);
        alert("Error koneksi!");
    } finally {
        const btnSimpan = document.querySelector('.btn-simpan');
        btnSimpan.innerText = 'Simpan Menu';
        btnSimpan.disabled = false;
    }
});

// --- HAPUS MENU ---
window.hapusDataMenu = async function(id) {
    if(!confirm("Yakin ingin menghapus menu ini dari daftar?")) return;

    try {
        const res = await fetch(`${apiMenuUrl}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if(res.ok) {
            muatDataMenu();
        } else {
            alert("Gagal menghapus menu.");
        }
    } catch (error) {
        console.error(error);
        alert("Error koneksi!");
    }
};

// --- SMART SEARCH MENU ---
const inputSearchMenu = document.getElementById('input-search-menu');
const gridMenuSearch = document.getElementById('grid-menu');

if (inputSearchMenu && gridMenuSearch) {
    inputSearchMenu.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const menuCards = gridMenuSearch.querySelectorAll('.menu-card');
        let visibleCards = false;

        menuCards.forEach(card => {
            const textContent = card.textContent.toLowerCase();
            
            if (textContent.includes(searchTerm)) {
                card.style.display = ''; 
                visibleCards = true;
            } else {
                card.style.display = 'none'; 
            }
        });

        
        let inputKosong = document.getElementById('empty-search');
        if (!visibleCards) {
            if (!inputKosong) {
                inputKosong = document.createElement('div');
                inputKosong.id = 'empty-search';
                inputKosong.className = 'empty-search-result';
                inputKosong.innerHTML = `Menu <strong>"${e.target.value}"</strong> tidak ditemukan.`;
                gridMenuSearch.appendChild(inputKosong);
            } else {
                inputKosong.innerHTML = `Menu <strong>"${e.target.value}"</strong> tidak ditemukan.`;
                inputKosong.style.display = 'block';
            }
        } else {
            if (inputKosong) {
                inputKosong.style.display = 'none';
            }
        }
    });
}
