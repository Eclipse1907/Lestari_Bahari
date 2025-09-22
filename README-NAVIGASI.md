# 🌊 Lestari Akuatik - Sistem Navigasi Satwa Dilindungi

## 📁 Struktur File Website

### 🏠 File Utama
- **`demo.html`** - Halaman demo yang menjelaskan cara kerja sistem
- **`dashboard.html`** - Halaman utama dengan 7 kotak filum
- **`index.html`** - Halaman beranda website

### 📋 File Navigasi
- **`satwa-list.html`** - Menampilkan daftar satwa per filum
- **`animal-detail-page.html`** - Halaman detail lengkap satwa

### 🎨 File Styling
- **`styles.css`** - Stylesheet utama
- **`styles-original.css`** - Stylesheet original

### ⚙️ File Script
- **`script.js`** - JavaScript utama (opsional)

## 🔄 Cara Kerja Sistem Navigasi

### Tahap 1: Dashboard (dashboard.html)
```
User membuka dashboard.html
↓
Menampilkan 7 kotak filum:
- 🦈 Chondrichthyes (Hiu & Pari)
- 🐟 Actinopterygii (Ikan Bertulang Keras)  
- 🐢 Reptilia (Penyu)
- 🪸 Anthozoa (Karang)
- 🐚 Bivalvia (Kerang)
- 🐙 Cephalopoda (Gurita & Cumi)
- 🥒 Holothuroidea (Teripang)
```

### Tahap 2: Daftar Satwa (satwa-list.html)
```
User klik kotak filum
↓
Redirect ke: satwa-list.html?phylum=NamaFilum
↓
Menampilkan kartu-kartu satwa dalam filum tersebut
```

### Tahap 3: Detail Satwa (animal-detail-page.html)
```
User klik kartu satwa
↓
Data disimpan di localStorage
↓
Redirect ke: animal-detail-page.html
↓
Menampilkan informasi lengkap:
- Foto satwa
- Status konservasi
- Klasifikasi taksonomi
- Morfologi & anatomi
- Dasar hukum & regulasi
```

## 🚀 Cara Menggunakan

### 1. Mulai dari Demo
```bash
Buka: demo.html
```

### 2. Atau Langsung ke Dashboard
```bash
Buka: dashboard.html
```

### 3. Navigasi Manual
```bash
Dashboard: dashboard.html
Daftar Hiu: satwa-list.html?phylum=Chondrichthyes
Daftar Ikan: satwa-list.html?phylum=Actinopterygii
Daftar Penyu: satwa-list.html?phylum=Reptilia
```

## 📊 Data Satwa yang Tersedia

### 🦈 Chondrichthyes (Hiu & Pari)
- Hiu Koboi (Carcharhinus longimanus)
- Hiu Mako (Isurus oxyrinchus)

### 🐟 Actinopterygii (Ikan Bertulang Keras)
- Ikan Napoleon (Cheilinus undulatus)

### 🐢 Reptilia (Penyu)
- Penyu Hijau (Chelonia mydas)

## ✨ Fitur Utama

### 🎨 Desain & UI/UX
- ✅ Layout responsif untuk semua perangkat
- ✅ Animasi hover dan transisi smooth
- ✅ Color coding untuk status konservasi
- ✅ Typography yang mudah dibaca
- ✅ Icon dan visual yang menarik

### 📊 Informasi Lengkap
- ✅ **Galeri Foto** - Multiple foto dengan efek hover
- ✅ **Status Konservasi** - Badge warna sesuai tingkat ancaman
- ✅ **Taksonomi Lengkap** - Kingdom hingga Species dengan warna berbeda
- ✅ **Morfologi & Anatomi** - Deskripsi fisik, karakteristik, dan habitat
- ✅ **Dasar Hukum & Regulasi** - Berdasarkan undang-undang resmi Indonesia

### 🔗 Sumber Informasi Resmi
- ✅ Peraturan Menteri Kelautan dan Perikanan RI
- ✅ Peraturan Pemerintah Republik Indonesia
- ✅ CITES (Convention on International Trade in Endangered Species)

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dan animasi
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript** - Interaktivitas dan navigasi
- **localStorage** - Penyimpanan data sementara
- **Unsplash API** - Gambar satwa berkualitas tinggi

## 📱 Responsive Design

Website ini dirancang untuk bekerja optimal di:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🔧 Troubleshooting

### Jika halaman tidak muncul:
1. Pastikan file CSS dan JS dimuat dengan benar
2. Cek console browser untuk error JavaScript
3. Pastikan koneksi internet untuk CDN Tailwind CSS

### Jika navigasi tidak berfungsi:
1. Pastikan parameter URL benar
2. Cek localStorage browser
3. Refresh halaman dan coba lagi

## 📞 Support

Jika ada masalah atau pertanyaan, silakan periksa:
1. File `demo.html` untuk contoh penggunaan
2. Console browser untuk error message
3. Struktur file sesuai dengan dokumentasi ini









