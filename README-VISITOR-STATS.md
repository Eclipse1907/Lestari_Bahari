# Fitur Statistik Pengunjung - Lestari Akuatik

## 📊 Deskripsi Fitur

Fitur statistik pengunjung telah diperbarui untuk memberikan informasi detail tentang kunjungan website, termasuk data harian dan durasi kunjungan.

## 🚀 Fitur Baru

### 1. **Halaman Statistik Khusus**
- **URL**: `visitor-stats.html`
- **Akses**: Klik pada "Total Pengunjung" di footer semua halaman
- **Fitur**:
  - Statistik real-time
  - Data harian dan mingguan
  - Grafik visual 7 hari terakhir
  - Durasi kunjungan per sesi

### 2. **Tombol Interaktif**
- **Lokasi**: Footer semua halaman
- **Fungsi**: Mengarahkan ke halaman statistik detail
- **Visual**: Ikon panah menunjukkan bahwa elemen dapat diklik
- **Hover Effect**: Efek visual saat mouse hover

### 3. **Data yang Ditampilkan**

#### **Sesi Saat Ini**
- Durasi kunjungan real-time
- Total kunjungan keseluruhan

#### **Statistik Harian**
- Kunjungan hari ini vs kemarin
- Pengunjung unik per hari
- Durasi rata-rata per hari

#### **Grafik 7 Hari Terakhir**
- Visualisasi data kunjungan
- Durasi rata-rata per hari
- Hover effect untuk detail

#### **Statistik Keseluruhan**
- Total kunjungan
- Total pengunjung unik
- Total sesi
- Rata-rata durasi kunjungan

#### **Informasi Sesi**
- Kunjungan terakhir
- Pengunjung unik hari ini
- Status sesi aktif

## 🔧 Implementasi Teknis

### **File yang Dimodifikasi**

1. **`visitor-stats.html`** - Halaman statistik baru
2. **`visitor-counter.js`** - Enhanced tracking system
3. **`_footer.html`** - Footer template dengan link
4. **`index.html`** - Updated footer
5. **`dashboard.html`** - Updated footer
6. **`contact.html`** - Updated footer
7. **`sanctions.html`** - Updated footer

### **Fitur Tracking**

- **Session Duration**: Mencatat durasi setiap sesi kunjungan
- **Daily Stats**: Data kunjungan per hari
- **Unique Visitors**: Tracking pengunjung unik
- **Real-time Updates**: Update data secara real-time

### **Storage System**

- **localStorage**: Data persisten antar sesi
- **sessionStorage**: Data sementara per sesi
- **Data Structure**: JSON format untuk efisiensi

## 📱 Responsive Design

- **Mobile**: Layout responsif untuk smartphone
- **Tablet**: Optimized untuk tablet
- **Desktop**: Full feature untuk desktop
- **Cross-browser**: Kompatibel dengan semua browser modern

## 🎨 UI/UX Features

### **Visual Elements**
- **Loading Animation**: Spinner saat memuat data
- **Fade-in Effects**: Animasi masuk elemen
- **Hover Effects**: Interaksi visual
- **Color Coding**: Warna berbeda untuk data berbeda

### **User Experience**
- **One-click Access**: Akses mudah ke statistik
- **Real-time Updates**: Data selalu up-to-date
- **Error Handling**: Penanganan error yang baik
- **Loading States**: Indikator loading yang jelas

## 🔄 Cara Penggunaan

1. **Akses Statistik**:
   - Klik "Total Pengunjung" di footer halaman manapun
   - Akan diarahkan ke `visitor-stats.html`

2. **Navigasi**:
   - Gunakan tombol "Kembali" untuk kembali ke halaman sebelumnya
   - Gunakan tombol "Perbarui Data" untuk refresh data

3. **Data Real-time**:
   - Durasi sesi update setiap detik
   - Data statistik update otomatis

## 🛠️ Maintenance

### **Reset Data** (untuk admin)
```javascript
// Reset semua counter
window.resetAllCounters();

// Reset hanya visitor counter
window.visitorCounter.resetCounter();
```

### **Debug Mode**
```javascript
// Lihat statistik lengkap
console.log(window.getVisitorStats());

// Increment counter manual (untuk testing)
window.incrementVisitorCounter();
```

## 📈 Data Privacy

- **No Personal Data**: Tidak menyimpan data pribadi
- **Browser Fingerprint**: Menggunakan fingerprint untuk unique visitor
- **Local Storage**: Data tersimpan di browser pengguna
- **No External Tracking**: Tidak ada tracking eksternal

## 🔧 Troubleshooting

### **Data Tidak Muncul**
1. Pastikan `visitor-counter.js` dimuat
2. Cek console browser untuk error
3. Clear localStorage dan refresh halaman

### **Link Tidak Berfungsi**
1. Pastikan file `visitor-stats.html` ada
2. Cek path relatif dari halaman saat ini
3. Pastikan tidak ada error JavaScript

### **Performance Issues**
1. Data disimpan di localStorage (terbatas ~5-10MB)
2. Data lama akan dihapus otomatis
3. Gunakan `resetAllCounters()` untuk clear data

## 📝 Changelog

### **v2.0.0** - Visitor Stats Enhancement
- ✅ Halaman statistik khusus
- ✅ Tracking durasi sesi
- ✅ Data harian dan mingguan
- ✅ Grafik visual 7 hari
- ✅ Link interaktif di semua halaman
- ✅ Real-time updates
- ✅ Responsive design
- ✅ Error handling

---

**Dibuat untuk**: BKHIT Sulawesi Utara  
**Versi**: 2.0.0  
**Tanggal**: 2024
