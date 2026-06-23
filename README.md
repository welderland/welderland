# WeldHub — Platform Welding Technology & Tools

Website edukasi welding (Fase 1) yang dibangun dengan Next.js, disiapkan
agar WPS Generator dan tools lain bisa ditambahkan di Fase 2 tanpa
membangun ulang proyek.

Dokumen strategi terkait (di luar repo ini): **Definisi MVP** dan
**Roadmap Fase 1 Website / Fase 2 WPS Generator**.

## Menjalankan di komputer Anda

Dibutuhkan [Node.js](https://nodejs.org) versi 18 atau lebih baru.

```bash
npm install      # sekali saja, setelah clone/download project
npm run dev       # menjalankan versi development
```

Lalu buka `http://localhost:3000` di browser. Halaman akan otomatis
redirect ke `/id` (Bahasa Indonesia, locale default).

Untuk build versi production (yang nanti di-deploy):

```bash
npm run build
npm run start
```

## Struktur proyek (yang perlu Anda tahu)

```
src/
  app/
    [locale]/              -> semua halaman, diawali /id atau /en
      page.tsx              -> homepage
      about/page.tsx         -> halaman Tentang
      articles/page.tsx      -> daftar semua artikel
      articles/[pillar]/page.tsx        -> daftar artikel per pilar
      articles/[pillar]/[slug]/page.tsx -> halaman detail 1 artikel
      tools/page.tsx          -> halaman "Tools - Coming Soon"
      tools/wps-generator/    -> KOSONG, disiapkan untuk Fase 2

  content/articles/         -> SEMUA ARTIKEL ditulis di sini (file .md)
    fabrication/
    technology/
    training/

  components/
    layout/                  -> Header, Footer (dipakai di semua halaman)
    ui/                       -> komponen kecil (misal form Notify Me)

  i18n/dictionaries.ts        -> semua teks UI (bukan isi artikel) ID & EN
  lib/articles.ts             -> logic membaca & merender file artikel
  types/content.ts            -> definisi struktur data artikel
```

## Cara menambah artikel baru

Artikel BUKAN ditulis lewat halaman admin (belum ada di Fase 1) —
melainkan sebagai file teks markdown. Ini paling cepat untuk solo
founder dan tidak butuh database.

1. Pilih pilar: `fabrication`, `technology`, atau `training`.
2. Buat 2 file di `src/content/articles/<pilar>/`:
   - `nama-slug.id.md` (versi Indonesia)
   - `nama-slug.en.md` (versi English)
3. Setiap file harus diawali blok frontmatter seperti contoh berikut,
   lalu isi artikel ditulis sebagai markdown biasa di bawahnya:

   ```markdown
   ---
   slug: "nama-slug"
   pillar: "fabrication"
   locale: "id"
   title: "Judul Artikel"
   excerpt: "Ringkasan singkat 1-2 kalimat."
   publishedAt: "2026-06-20"
   readingTimeMinutes: 5
   metaTitle: "Judul untuk SEO (boleh sama dengan title)"
   metaDescription: "Deskripsi untuk hasil pencarian Google, 1-2 kalimat."
   ---

   Isi artikel ditulis di sini, mendukung **bold**, *italic*,
   `## Heading`, dan list seperti biasa di markdown.
   ```

4. Simpan file, jalankan `npm run dev`, artikel otomatis muncul di
   `/id/articles/<pilar>/nama-slug` tanpa perlu mengubah kode apapun.

Lihat `src/content/articles/fabrication/apa-itu-wps-pqr-wqtr.id.md`
sebagai contoh nyata yang sudah berfungsi.

## Catatan penting untuk Fase 2 (WPS Generator)

Folder `src/app/[locale]/tools/wps-generator/` sengaja dikosongkan
(hanya ada README kecil di dalamnya). Saat Fase 2 dimulai, aplikasi
WPS Generator ditambahkan sebagai `page.tsx` di folder itu — Header,
Footer, dan sistem bahasa yang sudah ada di proyek ini langsung
terpakai ulang, tidak perlu setup dari nol.

## Deploy

Proyek ini cocok dengan [Vercel](https://vercel.com) (gratis untuk
skala awal): hubungkan repo GitHub, Vercel akan build & deploy
otomatis setiap kali ada perubahan yang di-push.
