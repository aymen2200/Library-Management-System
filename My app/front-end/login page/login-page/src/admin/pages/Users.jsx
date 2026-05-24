import { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../../../../../../../lib/src/components/Icon";
import Badge from "../../../../../../../lib/src/components/Badge";
import Modal from "../../../../../../../lib/src/components/Modal";
import { FormField, Input, Select } from "../../../../../../../lib/src/components/FormField";
import { icons } from "../../../../../../../lib/src/utils";
import "./Users.css";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000" });

// Attach JWT token from localStorage to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const emptyForm = { name: "", email: "", phone: "", status: "Active" };

const Users = ({ borrowings }) => {
  const [users,     setUsers]     = useState([]);
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(emptyForm);
  const [deleteId,  setDeleteId]  = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);

  // ── Fetch all users on mount ──────────────────────────────────────────────
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get("/users");
      // Normalize backend field names (UserID → id, Name → name, etc.)
      const normalized = data.map((u) => ({
        id:          u.UserID   ?? u.id,
        name:        u.Name     ?? u.name,
        email:       u.Email    ?? u.email,
        phone:       u.Phone    ?? u.phone ?? "",
        status:      u.IsActive === false ? "Suspended" : (u.status ?? "Active"),
        memberSince: u.CreatedAt
          ? new Date(u.CreatedAt).toISOString().slice(0, 10)
          : (u.memberSince ?? ""),
      }));
      setUsers(normalized);
    } catch (err) {
      setError(err.response?.data?.error ?? "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const filtered = users.filter((u) =>
    [u.name, u.email].some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  // ── Open modals ───────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (u) => {
    setEditing(u.id);
    setForm({ name: u.name, email: u.email, phone: u.phone, status: u.status });
    setShowModal(true);
  };

  // ── Save (Add or Edit) ────────────────────────────────────────────────────
  // NOTE: Your backend only exposes POST /users/register for creation.
  // For editing, add a PATCH /users/:id route in your backend, or adjust the
  // endpoint name below to match whatever update route you create.
  const save = async () => {
    if (!form.name || !form.email) return;
    setError(null);
    try {
      if (editing) {
        // Update existing user — expects PATCH /users/:id on your backend
        const { data } = await API.patch(`/users/${editing}`, form);
        const updated = {
          id:          data.UserID   ?? data.id   ?? editing,
          name:        data.Name     ?? data.name ?? form.name,
          email:       data.Email    ?? data.email ?? form.email,
          phone:       data.Phone    ?? data.phone ?? form.phone,
          status:      data.status   ?? form.status,
          memberSince: data.CreatedAt
            ? new Date(data.CreatedAt).toISOString().slice(0, 10)
            : "",
        };
        setUsers((us) => us.map((u) => (u.id === editing ? updated : u)));
      } else {
        // Register a new user — POST /users/register
        // Password is required by your backend; use a temporary default or
        // add a password field to the form for admin-created accounts.
        await API.post("/users/register", {
          name:     form.name,
          email:    form.email,
          password: "ChangeMe123!", // Temporary password; user should reset
        });
        // Re-fetch so we get the real ID and memberSince from the DB
        await fetchUsers();
      }
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.error ?? "Save failed.");
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  // Your backend uses a soft-delete: PUT /users/:id → sets IsDeleted = 1
  const confirmDelete = async (id) => {
    setError(null);
    try {
      await API.delete(`/users/${id}`);
      setUsers((us) => us.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.response?.data?.error ?? "Delete failed.");
    } finally {
      setDeleteId(null);
    }
  };

  const initials = (name) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="users-page">
      <div className="page-header">
        <h2 className="page-title">Users</h2>
        <button className="btn-add" onClick={openAdd}>
          <Icon d={icons.plus} size={16} stroke="#fff" /> Add User
        </button>
      </div>

      {error && <p className="error-banner">{error}</p>}

      <div className="search-wrap">
        <Icon d={icons.search} size={16} stroke="#94a3b8" className="search-icon" />
        <input
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users…"
        />
      </div>

      <div className="table-card">
        {loading ? (
          <p className="empty-row">Loading…</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {["Name", "Email", "Phone", "Member Since", "Status", "Active Loans", "Actions"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="empty-row">No users found.</td></tr>
              )}
              {filtered.map((u, i) => {
                const activeLoans = (borrowings ?? []).filter(
                  (b) => b.userId === u.id && b.status !== "Returned"
                ).length;
                return (
                  <tr key={u.id} className={i % 2 === 1 ? "row-alt" : ""}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{initials(u.name)}</div>
                        <span className="td-strong">{u.name}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td className="td-muted">{u.memberSince}</td>
                    <td>
                      <Badge
                        label={u.status}
                        color={u.status === "Active" ? "green" : "red"}
                      />
                    </td>
                    <td className="td-center">{activeLoans}</td>
                    <td>
                      <div className="action-btns">
                        <button className="icon-btn icon-btn--blue" onClick={() => openEdit(u)}>
                          <Icon d={icons.edit} size={15} stroke="#3b82f6" />
                        </button>
                        <button className="icon-btn icon-btn--red" onClick={() => setDeleteId(u.id)}>
                          <Icon d={icons.trash} size={15} stroke="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <Modal
          title={editing ? "Edit User" : "Add New User"}
          onClose={() => setShowModal(false)}
        >
          <FormField label="Full Name *">
            <Input value={form.name} onChange={set("name")} placeholder="Full name" />
          </FormField>
          <FormField label="Email *">
            <Input type="email" value={form.email} onChange={set("email")} placeholder="email@example.com" />
          </FormField>
          <FormField label="Phone">
            <Input value={form.phone} onChange={set("phone")} placeholder="Phone number" />
          </FormField>
          <FormField label="Status">
            <Select value={form.status} onChange={set("status")}>
              <option>Active</option>
              <option>Suspended</option>
            </Select>
          </FormField>
          {error && <p className="error-banner">{error}</p>}
          <div className="form-actions">
            <button className="btn btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save User</button>
          </div>
        </Modal>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <Modal title="Delete User?" onClose={() => setDeleteId(null)}>
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

export default Users;