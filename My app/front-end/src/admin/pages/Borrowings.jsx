import { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../components/Icon";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import { FormField, Input, Select } from "../components/FormField";
import { icons, today, calcDueDate, isOverdue } from "../utils";
import "./Borrowings.css";

// ✅ FIX 1: Correct port (3000) and no /api prefix
const BASE = "http://localhost:3000";

// Normalize a borrowing record from the backend
const normalizeBorrowing = (r) => ({
  id:         r.BorrowingRecordID ?? r.id,
  bookId:     r.BookID            ?? r.bookId,
  userId:     r.UserID            ?? r.userId,
  copyId:     r.CopyID            ?? r.copyId,
  borrowDate: r.BorrowingDate
    ? new Date(r.BorrowingDate).toISOString().slice(0, 10)
    : (r.borrowDate ?? ""),
  dueDate: r.DueDate
    ? new Date(r.DueDate).toISOString().slice(0, 10)
    : (r.dueDate ?? ""),
  returnDate: r.ActualReturnDate
    ? new Date(r.ActualReturnDate).toISOString().slice(0, 10)
    : (r.returnDate ?? null),
});

const Borrowings = ({ books, setBooks, users, borrowings, setBorrowings }) => {
  const [search,    setSearch]    = useState("");
  const [filter,    setFilter]    = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form,      setForm]      = useState({ bookId: "", userId: "", dueDate: calcDueDate(14) });
  const [error,     setError]     = useState(null);

  // LOAD ACTIVE BORROWINGS FROM BACKEND
  useEffect(() => {
    axios
      .get(`${BASE}/books/borrowings`)
      .then((res) => setBorrowings(res.data.map(normalizeBorrowing)))
      .catch((err) => console.error(err));
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Enrich each borrowing with live status
  const enriched = borrowings.map((b) => ({
    ...b,
    book:   books.find((x) => x.id === b.bookId),
    user:   users.find((x) => x.id === b.userId),
    status: b.returnDate
      ? "Returned"
      : isOverdue(b.dueDate, b.returnDate)
      ? "Overdue"
      : "Active",
  }));

  const filtered = enriched.filter((b) => {
    const matchSearch =
      b.book?.title.toLowerCase().includes(search.toLowerCase()) ||
      b.user?.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || b.status === filter;
    return matchSearch && matchFilter;
  });

  // BORROW A BOOK
  const addBorrowing = async () => {
    if (!form.bookId || !form.userId) return;
    const book = books.find((b) => b.id === +form.bookId);
    if (!book || book.available === 0) return alert("No copies available!");
    const user = users.find((u) => u.id === +form.userId);
    if (user?.status === "Suspended") return alert("This user is suspended.");

    setError(null);
    try {
      // ✅ FIX 2: Correct endpoint — POST /books/:id/borrow
      await axios.post(`${BASE}/books/${form.bookId}/borrow`, {
        userid: +form.userId,
      });

      // Re-fetch borrowings so we get real IDs and copy IDs from DB
      const res = await axios.get(`${BASE}/books/borrowings`);
      setBorrowings(res.data.map(normalizeBorrowing));

      // Update local available count
      setBooks((bs) =>
        bs.map((b) =>
          b.id === +form.bookId ? { ...b, available: b.available - 1 } : b
        )
      );

      setShowModal(false);
      setForm({ bookId: "", userId: "", dueDate: calcDueDate(14) });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message ?? "Borrow failed.");
    }
  };

  // RETURN A BOOK
  const returnBook = async (id) => {
    const record = borrowings.find((x) => x.id === id);
    if (!record) return;

    setError(null);
    try {
      // ✅ FIX 3: Correct endpoint — PATCH /books/copies/:copyid/return (not PUT)
      await axios.patch(`${BASE}/books/copies/${record.copyId}/return`);

      // Mark returned locally
      setBorrowings((bs) =>
        bs.map((x) =>
          x.id === id ? { ...x, returnDate: today(), status: "Returned" } : x
        )
      );

      // Update available count
      setBooks((bs) =>
        bs.map((x) =>
          x.id === record.bookId ? { ...x, available: x.available + 1 } : x
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message ?? "Return failed.");
    }
  };

  const statusColor = { Active: "blue", Returned: "green", Overdue: "red" };

  return (
    <div className="borrowings-page">
      <div className="page-header">
        <h2 className="page-title">Borrowings</h2>
        <button className="btn-add" onClick={() => { setError(null); setShowModal(true); }}>
          <Icon d={icons.plus} size={16} stroke="#fff" /> New Borrowing
        </button>
      </div>

      {error && <p className="error-banner">{error}</p>}

      {/* Search + filter bar */}
      <div className="borrow-toolbar">
        <div className="search-wrap search-wrap--flex">
          <Icon d={icons.search} size={16} stroke="#94a3b8" className="search-icon" />
          <input
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search borrowings…"
          />
        </div>
        <div className="filter-group">
          {["All", "Active", "Overdue", "Returned"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "filter-btn--active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              {["Book", "User", "Borrow Date", "Due Date", "Return Date", "Status", "Actions"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="empty-row">No borrowings found.</td></tr>
            )}
            {filtered.map((b, i) => (
              <tr key={b.id} className={i % 2 === 1 ? "row-alt" : ""}>
                <td className="td-strong">{b.book?.title || "—"}</td>
                <td>{b.user?.name || "—"}</td>
                <td className="td-muted">{b.borrowDate}</td>
                <td className={b.status === "Overdue" ? "td-overdue" : "td-muted"}>{b.dueDate}</td>
                <td className="td-muted">{b.returnDate || "—"}</td>
                <td><Badge label={b.status} color={statusColor[b.status]} /></td>
                <td>
                  {b.status !== "Returned" && (
                    <button className="return-btn" onClick={() => returnBook(b.id)}>
                      <Icon d={icons.return} size={14} stroke="#16a34a" /> Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Borrowing Modal */}
      {showModal && (
        <Modal title="New Borrowing" onClose={() => setShowModal(false)}>
          <FormField label="Select Book *">
            <Select value={form.bookId} onChange={set("bookId")}>
              <option value="">— Choose a book —</option>
              {books.filter((b) => b.available > 0).map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title} ({b.available} available)
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Select User *">
            <Select value={form.userId} onChange={set("userId")}>
              <option value="">— Choose a user —</option>
              {users.filter((u) => u.status === "Active").map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </Select>
          </FormField>

          <FormField label="Due Date">
            <Input type="date" value={form.dueDate} onChange={set("dueDate")} />
          </FormField>

          {error && <p className="error-banner">{error}</p>}

          <div className="form-actions">
            <button className="btn btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={addBorrowing}>Confirm Borrowing</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Borrowings;