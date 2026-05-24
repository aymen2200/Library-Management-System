import Icon from "./Icon";
import { icons } from "../utils";
import "./Sidebar.css";

const navItems = [
  { id: "dashboard",  label: "Dashboard",  icon: icons.dashboard },
  { id: "books",      label: "Books",      icon: icons.book },
  { id: "users",      label: "Users",      icon: icons.users },
  { id: "borrowings", label: "Borrowings", icon: icons.borrow },
];

const Sidebar = ({ page, onNavigate }) => (
  <aside className="sidebar">
    <div className="sidebar-brand">
      <div className="sidebar-logo">
        <Icon d={icons.book} size={18} stroke="#fff" />
      </div>
      <div>
        <div className="sidebar-title">Library</div>
        <div className="sidebar-subtitle">Management System</div>
      </div>
    </div>

    <nav className="sidebar-nav">
      {navItems.map((n) => (
        <button
          key={n.id}
          onClick={() => onNavigate(n.id)}
          className={`sidebar-nav-item ${page === n.id ? "sidebar-nav-item--active" : ""}`}
        >
          <Icon d={n.icon} size={17} stroke={page === n.id ? "#fff" : "#DDB7A7"} />
          {n.label}
        </button>
      ))}
    </nav>

    <div className="sidebar-footer">
      All data stored in memory
    </div>
  </aside>
);

export default Sidebar;
