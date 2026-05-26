# Stayly - Premium Accommodation & Travel Platform

[Indonesian Version](#versi-bahasa-indonesia) | [English Version](#english-version)

---

## Versi Bahasa Indonesia

Stayly adalah platform pencarian dan pemesanan akomodasi premium yang dirancang khusus untuk memberikan pengalaman liburan tanpa batas (*journey without limits*). Berfokus pada destinasi liburan tropis seperti Bali, platform ini menyediakan kurasi vila mewah, hotel resort kelas dunia, apartemen modern, dan guesthouse autentik.

Proyek ini dibangun menggunakan **React 19**, **TypeScript**, **Tailwind CSS v4**, dan **Motion** untuk menciptakan antarmuka landing page yang sangat responsif, elegan, dan interaktif dengan efek *scroll-reveal* bernuansa modern.

### 🌅 Deskripsi Singkat
Platform pencarian dan pemesanan akomodasi premium yang dikurasi secara eksklusif untuk liburan mewah tanpa batas, dilengkapi peta interaktif, kupon diskon langsung, dan formulir konsultasi perjalanan terpadu.

### ⚙️ Fitur Utama
1. **Dasbor Kategori Responsif**: Navigasi kategori akomodasi yang mulus (Vila, Hotel, Apartemen, Guesthouse), disertai menu promosi khusus (*BIG DEAL* dan *Voucher*).
2. **Peta Interaktif Bali (Custom SVG Map)**: Eksplorasi penginapan langsung dari representasi topografi wilayah Bali secara visual. Dilengkapi dengan detail harga melayang, efek *pinpoint hover*, dan fitur pesan instan dari peta.
3. **Mesin Klaim Promo Spesial**: Tombol klaim voucher langsung (diskon 30%) yang akan memicu notifikasi toast dinamis dan secara otomatis menerapkan potongan harga sebesar 30% pada kalkulator pemesanan.
4. **Formulir Pemesanan Langsung (Direct Booking Modal)**:
   - Input detail tamu dan no. WhatsApp terlindungi.
   - Perhitungan malam dinamis berdasarkan tanggal check-in/check-out.
   - Struktur rincian pembayaran transparan (biaya sewa dasar, potongan kupon, biaya layanan, dan pajak turis 10%).
   - Fitur **Cetak Tiket PDF** langsung saat pemesanan sukses disimulasikan.
5. **Formulir Kontak Terpadu (24/7 Support)**: Menangani konsultasi rencana perjalanan gratis, kemitraan owner, dan bantuan teknis dengan validasi form instan.
6. **Animasi Scroll-Reveal Modern**: Setiap komponen masuk ke layar dengan transisi lembut (*sleek bezier-curve transition*) untuk kesan visual premium berkat kustomisasi pustaka `motion`.
7. **Pilihan Bahasa Instan**: Dukungan bilingual (English & Bahasa Indonesia) yang disematkan langsung pada navigasi atas.

### 🛠️ Teknologi yang Digunakan
- **Framework Utama**: React 19 & Vite
- **Bahasa**: TypeScript (Keamanan tipe data penuh)
- **Desain & Gaya**: Tailwind CSS v4 (Sistem grid modern dan kustomisasi variabel `@theme`)
- **Pustaka Animasi**: `motion` (dari `motion/react` dengan transisi non-linear yang mulus)
- **Ikonografi**: `lucide-react` (Ikon vektor berkualitas tinggi)

---

## English Version

Stayly is a premium accommodation booking and exploration platform designed primarily to deliver a seamless escape ("journey without limits"). Specializing in curated tropical getaways such as Bali, this application brings luxury private villas, world-class resort hotels, modern skyline apartments, and authentic guesthouses into a unified booking ecosystem.

Crafted with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Motion**, Stayly establishes high-end visual design consistency, smooth micro-interactions, responsive mobile grids, and sleek scroll-reveal animations.

### 🌅 Short Description
An elite booking and discovery gateway crafted for handpicked holiday stays, featuring interactive regional vector maps, real-time discount coupon engines, and direct reservation managers.

### ⚙️ Core Key Features
1. **Interactive Category Dashboard**: Aesthetic category triggers (Villa, Hotel, Apartment, Guesthouse) paired alongside specific fast-action buttons for active promotions (*BIG DEAL* and *Vouchers*).
2. **Interactive SVG Bali map**: Allows travelers to visually browse locations over Bali's custom topological map layout, displaying custom pricing pin anchors and instigating immediate bookings.
3. **Special Promo Claim Engine**: Interactive coupon cards featuring a 30% discount indicator (`SAVESTAY30`). Saving a coupon triggers custom bottom toasts and auto-injects promo codes into the reservation price slip.
4. **Direct Booking Reservation Modal**:
   - Complete guest info validator with phone/email verification fields.
   - Dynamic stay night duration calculator based off active dates.
   - Breakdown of itemized costs (base fee, discount reductions, service fee, and local tourist taxes).
   - Simulates check-out ticks, printing a **custom PDF boarding voucher receipt** on-demand.
5. **Integrated Support Terminal (Contact Form)**: Handles general tour inquiries, owner registrations, and custom complaints with instant response validations.
6. **Smooth Scroll-Reveal Animations**: Implements lightweight fade-ins and viewport boundary detections utilizing customized bezier constants in `motion`.
7. **Immediate Bilingual Switcher**: Seamless Indonesian and English localized text toggle contextually bound within the global state.

### 🛠️ Tech Stack
- **Core Library**: React 19 & Vite
- **Language**: TypeScript
- **Styling Pipeline**: Tailwind CSS v4 (Modern grid utilities & unified CSS variable `@theme` values)
- **Motion Framework**: `motion` (imported from `motion/react` for buttery smooth non-blocking interactions)
- **Vector Icons**: `lucide-react`

---

## 🚀 Panduan Memulai / How to Run

### Prasyarat / Prerequisites
Pastikan Anda sudah menginstal Node.js di komputer Anda.

### Langkah-langkah / Steps:
1. **Instal Dependensi / Install dependencies**:
   ```bash
   npm install
   ```

2. **Jalankan Server Pengembangan / Run dev server**:
   ```bash
   npm run dev
   ```

3. **Lakukan Kompilasi Produksi / Compile build bundle**:
   ```bash
   npm run build
   ```
