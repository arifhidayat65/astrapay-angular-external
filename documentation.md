# 📚 Dokumentasi API - Notes Management

**Base URL:** `http://localhost:8080`

---

## 📋 Ringkasan Endpoint

| No  | Method   | Endpoint      | Deskripsi           | Status Code |
| --- | -------- | ------------- | ------------------- | ----------- |
| 1   | `POST`   | `/notes`      | Buat catatan baru   | 201 / 400   |
| 2   | `GET`    | `/notes`      | Ambil semua catatan | 200         |
| 3   | `DELETE` | `/notes/{id}` | Hapus catatan by ID | 204 / 404   |

---

## 1️⃣ CREATE NOTE (Buat Catatan Baru)

| Method | Endpoint |
| ------ | -------- |
| `POST` | `/notes` |

### Request

- **Header:** `Content-Type: application/json`
- **Body:**

```json
{
  "content": "Isi catatan Anda di sini"
}
```

### Response

**✅ Success (201 Created)**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "content": "Isi catatan Anda di sini",
  "createdAt": "2026-03-12T10:30:00"
}
```

**❌ Validation Error (400 Bad Request)**

```json
{
  "timestamp": "2026-03-12T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": {
    "content": "Note content cannot be empty"
  }
}
```

---

## 2️⃣ GET ALL NOTES (Ambil Semua Catatan)

| Method | Endpoint |
| ------ | -------- |
| `GET`  | `/notes` |

### Request

- Tidak ada body/header khusus

### Response

**✅ Success (200 OK)**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "content": "Catatan pertama",
    "createdAt": "2026-03-12T10:30:00"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "content": "Catatan kedua",
    "createdAt": "2026-03-12T11:00:00"
  }
]
```

**📝 Empty (200 OK)** - Jika tidak ada data:

```json
[]
```

---

## 3️⃣ DELETE NOTE (Hapus Catatan)

| Method   | Endpoint      |
| -------- | ------------- |
| `DELETE` | `/notes/{id}` |

### Request

- **Path Variable:** `id` = UUID catatan

### Response

**✅ Success (204 No Content)**

- Tidak ada response body

**❌ Not Found (404 Not Found)**

```json
{
  "timestamp": "2026-03-12T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Note with id abc-123 not found"
}
```

---

## 📦 Format Data

### Note Object

| Field       | Type          | Deskripsi                                  |
| ----------- | ------------- | ------------------------------------------ |
| `id`        | String (UUID) | ID unik catatan (auto-generated)           |
| `content`   | String        | Isi catatan (required, tidak boleh kosong) |
| `createdAt` | LocalDateTime | Waktu pembuatan (auto-generated)           |

---

## 🌐 Contoh Implementasi Frontend

### JavaScript / Fetch API

```javascript
// CREATE - Buat catatan baru
fetch("http://localhost:8080/notes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: "Catatan baru" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));

// GET ALL - Ambil semua catatan
fetch("http://localhost:8080/notes")
  .then((response) => response.json())
  .then((data) => console.log(data));

// DELETE - Hapus catatan by ID
fetch("http://localhost:8080/notes/550e8400-e29b-41d4-a716-446655440000", {
  method: "DELETE",
}).then((response) => {
  if (response.status === 204) {
    console.log("Note deleted successfully");
  }
});
```

### Axios

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// CREATE
const createNote = async (content) => {
  const response = await api.post("/notes", { content });
  return response.data;
};

// GET ALL
const getAllNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

// DELETE
const deleteNote = async (id) => {
  await api.delete(`/notes/${id}`);
};
```

---

## 📝 Catatan Penting

- Semua response menggunakan format **JSON**
- Field `content` **wajib diisi** (validasi `@NotEmpty`)
- ID menggunakan format **UUID**
- `createdAt` otomatis di-generate oleh backend
- Gunakan header `Content-Type: application/json` untuk request POST
