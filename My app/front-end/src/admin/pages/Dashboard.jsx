import Icon from "../components/Icon";
import Badge from "../components/Badge";
import { icons } from "../utils";
import "./Dashboard.css";

const Dashboard = ({ books, users, borrowings }) => {
  const active     = borrowings.filter((b) => b.status === "Active").length;
  const overdue    = borrowings.filter((b) => b.status === "Overdue").length;
  const totalBooks = books.reduce((s, b) => s + b.copies, 0);

  const stats = [
    { label: "Total Books",       value: totalBooks,    icon: icons.book,      color: "#6366f1", bg: "#eef2ff" },
    { label: "Registered Users",  value: users.length,  icon: icons.users,     color: "#0ea5e9", bg: "#e0f2fe" },
    { label: "Active Borrowings", value: active,        icon: icons.borrow,    color: "#10b981", bg: "#d1fae5" },
    { label: "Overdue",           value: overdue,       icon: icons.alert,     color: "#ef4444", bg: "#fee2e2" },
  ];

  const recent = [...borrowings].reverse().slice(0, 5);

  const statusColor = { Active: "blue", Returned: "green", Overdue: "red" };

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="stat-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>
              <Icon d={s.icon} size={22} stroke={s.color} />
            </div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lower panels */}
      <div className="dashboard-panels">
        {/* Availability */}
        <div className="panel">
          <h3 className="panel-title">Book Availability</h3>
          {books.map((b) => (
            <div key={b.id} className="avail-row">
              <div className="avail-meta">
                <span className="avail-book-title">{b.title}</span>
                <span className="avail-count">{b.available}/{b.copies}</span>
              </div>
              <div className="avail-bar-track">
                <div
                  className="avail-bar-fill"
                  style={{
                    width: `${(b.available / b.copies) * 100}%`,
                    background: b.available === 0 ? "#ef4444" : "#10b981",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Borrowings */}
        <div className="panel">
          <h3 className="panel-title">Recent Borrowings</h3>
          {recent.map((b) => {
            const book = books.find((x) => x.id === b.bookId);
            const user = users.find((x) => x.id === b.userId);
            return (
              <div key={b.id} className="recent-row">
                <div>
                  <div className="recent-book">{book?.title}</div>
                  <div className="recent-user">{user?.name}</div>
                </div>
                <Badge label={b.status} color={statusColor[b.status]} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
