import { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../components/Icon";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import { FormField, Input, Select } from "../components/FormField";
import { icons } from "../utils";
import "./Books.css";

// ✅ FIX 1: Correct port (3000) and no /api prefix
const API = "http://localhost:3000/books";

const GENRES = [
  "Fiction", "Non-Fiction", "Sci-Fi", "Dystopian",
  "Fantasy", "Mystery", "History", "Biography", "Other"
];

const emptyForm = {
  title: "",
  author: "",
  genre: "Fiction",
  isbn: "",
  url: "",
  copies: 1,
  year: "",
  image: "", // ✅ FIX 2: Added image field (required by backend)
};

// Normalize backend field names to frontend field names
const normalizeBook = (b) => ({
  id:        b.BookID          ?? b.id,
  title:     b.Title           ?? b.title,
  author:    b.Authors         ?? b.author ?? "",
  genre:     b.Genre           ?? b.genre,
  isbn:      b.ISBN            ?? b.isbn,
  url:       b.AdditionalDetails ?? b.url ?? "",
  year:      b.PublicationDate
    ? new Date(b.PublicationDate).getFullYear()
    : (b.year ?? ""),
  copies:    b.TotalCopies     ?? b.copies    ?? 0,
  available: b.AvailableCopies ?? b.available ?? 0,
});

const Books = ({ books = [], setBooks }) => {
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(emptyForm);
  const [deleteId,  setDeleteId]  = useState(null);
  const [error,     setError]     = useState(null);

  // LOAD BOOKS FROM BACKEND
  useEffect(() => {
    axios
      .get(API)
      .then((res) => setBooks(res.data.map(normalizeBook)))
      .catch((err) => console.error(err));
  }, []);

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const filtered = books.filter((b) =>
    [b.title, b.author, b.genre].some(
      (s) => (s || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setShowModal(true);
  };

  const openEdit = (b) => {
    setEditing(b.id);
    setForm({
      title:  b.title  || "",
      author: b.author || "",
      genre:  b.genre  || "Fiction",
      isbn:   b.isbn   || "",
      url:    b.url    || "",
      copies: b.copies || 1,
      year:   b.year   || "",
      image:  b.image  || "",
    });
    setError(null);
    setShowModal(true);
  };

  // SAVE (ADD / UPDATE)
  const save = async () => {
    if (!form.title.trim() || !form.author.trim()) return;

    const year = Number(form.year) || "";

    // ✅ FIX 3: All required backend fields included, including Image
    const payload = {
      Title:             form.title,
      AuthorName:        form.author,
      Genre:             form.genre,
      ISBN:              form.isbn,
      PublicationDate:   year ? `${year}-01-01` : null,
      AdditionalDetails: form.url || null,
      Image:             form.image || "https://via.placeholder.com/150",
      Barcode:           form.isbn || `BC-${Date.now()}`,
    };

    setError(null);
    try {
      if (editing) {
        // UPDATE
        await axios.put(`${API}/${editing}`, {
          Title:             form.title,
          Genre:             form.genre,
          ISBN:              form.isbn,
          PublicationDate:   year ? `${year}-01-01` : null,
          AdditionalDetails: form.url || null,
        });
        // Re-fetch to get the fresh record
        const res = await axios.get(`${API}/${editing}`);
        const updated = normalizeBook({ ...res.data, Authors: form.author });
        setBooks((bs) => bs.map((b) => (b.id === editing ? updated : b)));
      } else {
        // CREATE
        await axios.post(API, payload);
        // Re-fetch full list to get real IDs and copy counts from DB
        const res = await axios.get(API);
        setBooks(res.data.map(normalizeBook));
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message ?? "Save failed.");
    }
  };

  // DELETE (soft-delete on backend)
  const confirmDelete = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API}/${id}`);
      setBooks((bs) => bs.filter((b) => b.id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message ?? "Delete failed.");
    }
  };

  return (
    <div className="books-page">
      <div className="page-header">
        <h2 className="page-title">Books</h2>
        <button className="btn-add" onClick={openAdd}>
          <Icon d={icons.plus} size={16} stroke="#fff" /> Add Book
        </button>
      </div>

      <div className="search-wrap">
        <Icon d={icons.search} size={16} stroke="#94a3b8" className="search-icon" />
        <input
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books…"
        />
      </div>

      {error && <p className="error-banner">{error}</p>}

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              {["Title", "Author", "Genre", "ISBN", "URL", "Year", "Copies", "Available", "Actions"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="empty-row">No books found.</td>
              </tr>
            )}

            {filtered.map((b, i) => (
              <tr key={b.id} className={i % 2 ? "row-alt" : ""}>
                <td className="td-strong">{b.title}</td>
                <td>{b.author}</td>
                <td><Badge label={b.genre} color="blue" /></td>
                <td className="td-muted">{b.isbn}</td>

                <td>
                  {b.url ? (
                    <a href={b.url} target="_blank" rel="noopener noreferrer" className="book-link">
                      Open
                    </a>
                  ) : (
                    <span className="td-muted">-</span>
                  )}
                </td>

                <td>{b.year}</td>
                <td className="td-center">{b.copies}</td>

                <td className="td-center">
                  <Badge
                    label={b.available === 0 ? "None" : b.available}
                    color={
                      b.available === 0 ? "red"
                      : b.available < b.copies ? "yellow"
                      : "green"
                    }
                  />
                </td>

                <td>
                  <div className="action-btns">
                    <button className="icon-btn icon-btn--blue" onClick={() => openEdit(b)}>
                      <Icon d={icons.edit} size={15} stroke="#3b82f6" />
                    </button>
                    <button className="icon-btn icon-btn--red" onClick={() => setDeleteId(b.id)}>
                      <Icon d={icons.trash} size={15} stroke="#ef4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <Modal
          title={editing ? "Edit Book" : "Add New Book"}
          onClose={() => setShowModal(false)}
        >
          <FormField label="Title *">
            <Input value={form.title} onChange={setField("title")} />
          </FormField>

          <FormField label="Author *">
            <Input value={form.author} onChange={setField("author")} />
          </FormField>

          <div className="form-grid-2">
            <FormField label="Genre">
              <Select value={form.genre} onChange={setField("genre")}>
                {GENRES.map((g) => <option key={g}>{g}</option>)}
              </Select>
            </FormField>

            <FormField label="Year">
              <Input type="number" value={form.year} onChange={setField("year")} />
            </FormField>
          </div>

          <div className="form-grid-2">
            <FormField label="ISBN">
              <Input value={form.isbn} onChange={setField("isbn")} />
            </FormField>

            <FormField label="Copies">
              <Input type="number" min={1} value={form.copies} onChange={setField("copies")} />
            </FormField>
          </div>

          {/* ✅ FIX 4: Added Image URL field — required by backend */}
          <FormField label="Image URL">
            <Input type="url" value={form.image} onChange={setField("image")} placeholder="https://..." />
          </FormField>

          <FormField label="Additional Details / URL">
            <Input type="url" value={form.url} onChange={setField("url")} />
          </FormField>

          {error && <p className="error-banner">{error}</p>}

          <div className="form-actions">
            <button className="btn btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save Book</button>
          </div>
        </Modal>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <Modal title="Delete Book?" onClose={() => setDeleteId(null)}>
          <p className="confirm-text">This action cannot be undone.</p>
          <div className="form-actions">
            <button className="btn btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={() => confirmDelete(deleteId)}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Books;