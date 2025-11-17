# Task_Toko_Buku_RestAPI
REST API ini dibuat untuk mengelola koleksi buku dengan fitur CRUD, menggunakan Express Router, multer untuk upload gambar, middleware custom, validation, error handling, dan penyimpanan data dalam file JSON.

# Fitur
✔ CRUD Lengkap untuk /books
– GET /books – Menampilkan semua buku
– GET /books/:id – Menampilkan detail buku berdasarkan ID
– POST /books – Menambahkan buku baru
– PUT /books/:id – Mengupdate data buku
– DELETE /books/:id – Menghapus buku dan file gambar terkait

✔ Express Router
Semua route buku berada di: routes/bookRoutes.js

✔ Middleware Custom
Logger, Validation, dan Error Handling

✔ Static Files
Folder /images disajikan sebagai file statis untuk menampilkan cover buku.

✔ Upload Image (multer)
POST & PUT dapat menerima image melalui Form-Data (Postman).

✔ Database
Data buku disimpan di file: /data/books.json