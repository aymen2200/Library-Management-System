import { useState } from "react";
import Sidebar from "./components/components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Borrowings from "./pages/Borrowings";
import "./App1.css";

export default function App() {
  const [page,       setPage]       = useState("dashboard");
  const [books,      setBooks]      = useState([]);
  const [users,      setUsers]      = useState([]);
  const [borrowings, setBorrowings] = useState([]);

  return (
    <div className="app-layout">
      <Sidebar page={page} onNavigate={setPage} />

      <main className="app-main">
        {page === "dashboard"  && <Dashboard books={books} users={users} borrowings={borrowings} />}
        {page === "books"      && <Books books={books} setBooks={setBooks} />}
        {page === "users"      && <Users users={users} setUsers={setUsers} borrowings={borrowings} />}
        {page === "borrowings" && (
          <Borrowings
            books={books}       setBooks={setBooks}
            users={users}
            borrowings={borrowings} setBorrowings={setBorrowings}
          />
        )}
      </main>
    </div>
  );
}