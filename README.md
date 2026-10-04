# UBL LostnFound — Lost & Found Universitas Budi Luhur

> **Hilang. Temukan. Kembali.**  
> *Prototype Konsep — Universitas Budi Luhur*

🌐 **Live Demo GitHub Pages**:  
**[https://arlenenero.github.io/prototype_web_lostandfound/](https://arlenenero.github.io/prototype_web_lostandfound/)**

---

## 📌 Deskripsi

**UBL LostnFound** adalah prototipe aplikasi terpusat untuk civitas akademika Universitas Budi Luhur dalam mencari, melaporkan, dan memverifikasi kepemilikan barang yang tercecer atau ditemukan di lingkungan kampus.

Aplikasi mengimplementasikan alur **Two-Stage Verification (Verifikasi 2-Tahap)**:
1. **Tahap 1 (Knowledge Verification)**: Pencocokan data rahasia penemuan barang (titik detail, ciri khusus, nomor seri rahasia) oleh petugas tanpa membocorkannya kepada publik.
2. **Tahap 2 (Ownership / Control Proof)**: Pengujian bukti kontrol perangkat, nomor seri, invoice resmi, atau pembuktian kepemilikan tatap muka.
3. **Penyerahan & Pengambilan**: Penerbitan kode unik (*pickup code*) dan konfirmasi serah terima fisik langsung oleh petugas Lost & Found UBL.

---

## 🚀 Fitur Utama

- **Pencarian & Marketplace-Discovery**: Filter cerdas kategori (Elektronik, Tas, Dompet, Kunci, KTM, dll.), lokasi kampus, serta tanggal.
- **Pengambilan Foto Langsung**: Dukungan kamera HP instan (`capture="environment"`) dan pemilih galeri foto menggunakan HTML5 FileReader lokal.
- **Pelaporan Mandiri**:
  - Pelaporan barang hilang oleh mahasiswa.
  - Pelaporan barang ditemukan yang menginstruksikan penyerahan fisik ke pos petugas resmi.
- **Dashboard & Operasional Petugas**:
  - Statistik real-time barang ditemukan, barang hilang, klaim aktif, dan total selesai.
  - Formulir input atribut rahasia (*hidden verification attributes*).
  - Antrean klaim dan antarmuka evaluasi checklist 6 kriteria.
  - Konfirmasi kode pengambilan dan serah terima fisik.
- **Privasi Penolakan (Rejection Privacy)**: Pesan generik yang melindungi data rahasia dari percobaan tebak-menebak.
- **Penyimpanan Lokal (Local Persistence)**: Menggunakan `localStorage` tanpa ketergantungan server eksternal, dilengkapi fitur **Reset Demo Data**.

---

## 👥 Akun Demo

| Peran | Email | Kata Sandi |
| :--- | :--- | :--- |
| **Mahasiswa** | `mahasiswa@budiluhur.ac.id` | `demo123` |
| **Petugas** | `petugas@budiluhur.ac.id` | `demo123` |

*(Tersedia tombol pintas beralih peran cepat di bilah hitam bagian atas aplikasi).*

---

## 💻 Menjalankan Secara Lokal

```bash
# Clone repository
git clone https://github.com/ArleneNero/prototype_web_lostandfound.git

# Masuk ke direktori
cd prototype_web_lostandfound

# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev
```
Buka browser di `http://localhost:5173/`.
