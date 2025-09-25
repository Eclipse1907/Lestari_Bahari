# 📊 Website Visitor Counter

Script untuk melacak jumlah pengunjung website yang hanya bisa dilihat oleh admin.

## 🚀 Fitur

- **Pelacakan Pengunjung**: Menghitung total pengunjung unik dan total kunjungan
- **Data Detail**: Menyimpan informasi user agent, referrer, dan halaman yang dikunjungi
- **Akses Admin Saja**: Hanya admin yang dapat melihat statistik pengunjung
- **Export Data**: Dapat mengekspor data pengunjung ke file JSON
- **Clear Data**: Dapat menghapus semua data pengunjung

## 🔐 Cara Mengakses (Hanya Admin)

### Metode 1: Kombinasi Tombol
Tekan tombol berikut secara berurutan:
```
A + D + M + I + N
```

### Metode 2: Tombol Admin
Setelah menggunakan kombinasi tombol di atas, akan muncul tombol "👁️ Visitor Stats" di pojok kanan atas halaman.

## 📈 Data yang Dilacak

1. **Total Visitors**: Jumlah pengunjung unik
2. **Total Visits**: Jumlah total kunjungan
3. **Unique Visitors**: Estimasi pengunjung unik berdasarkan user agent
4. **Recent Activity**: 10 kunjungan terakhir
5. **Page Views**: Statistik halaman yang paling banyak dikunjungi
6. **Traffic Sources**: Sumber lalu lintas (Google, Facebook, Direct, dll.)

## 🛠️ Cara Kerja

1. **First Visit**: Saat pengunjung pertama kali mengunjungi website, counter akan bertambah
2. **Return Visit**: Pengunjung yang sama tidak akan menambah counter (menggunakan localStorage)
3. **Data Storage**: Semua data disimpan di localStorage browser
4. **Privacy**: Data hanya tersimpan di browser pengunjung, tidak dikirim ke server

## 📁 File yang Ditambahkan

- `visitor-counter.js` - Script utama visitor counter
- Ditambahkan ke semua halaman HTML:
  - `index.html`
  - `dashboard.html`
  - `sanctions.html`
  - `contact.html`

## 🎯 Cara Menggunakan

1. **Aktifkan Mode Admin**:
   - Tekan tombol A + D + M + I + N secara berurutan
   - Tombol "👁️ Visitor Stats" akan muncul di pojok kanan atas

2. **Lihat Statistik**:
   - Klik tombol "👁️ Visitor Stats"
   - Modal akan menampilkan semua data pengunjung

3. **Export Data**:
   - Klik tombol "Export Data" di modal
   - File JSON akan terdownload dengan data lengkap

4. **Clear Data**:
   - Klik tombol "Clear Data" di modal
   - Semua data pengunjung akan dihapus

## 🔒 Keamanan

- **Akses Terbatas**: Hanya admin yang tahu kombinasi tombol
- **Data Lokal**: Data tidak dikirim ke server eksternal
- **Privacy**: Tidak melacak informasi pribadi pengunjung
- **Sederhana**: Menggunakan localStorage browser

## 📊 Contoh Data

```json
{
  "totalVisitors": 25,
  "lastVisit": "2024-01-15T10:30:00.000Z",
  "visits": [
    {
      "timestamp": "2024-01-15T10:30:00.000Z",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      "referrer": "https://google.com",
      "page": "/index.html"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## ⚠️ Catatan Penting

1. **Data Lokal**: Data hanya tersimpan di browser, tidak tersinkronisasi antar perangkat
2. **Reset Data**: Data akan hilang jika pengunjung menghapus data browser
3. **Estimasi**: Unique visitors adalah estimasi berdasarkan user agent
4. **Privacy**: Script ini menghormati privasi pengunjung dengan tidak mengirim data ke server

## 🚀 Instalasi

Script sudah terintegrasi ke semua halaman website. Tidak perlu instalasi tambahan.

## 📞 Support

Jika ada masalah dengan visitor counter, periksa:
1. Apakah file `visitor-counter.js` ada di root directory
2. Apakah script sudah ditambahkan ke semua halaman HTML
3. Apakah browser mendukung localStorage
4. Apakah kombinasi tombol A+D+M+I+N sudah benar
