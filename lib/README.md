# Library Management System

A fully frontend React app — no backend, no database. All data lives in React state.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
library-management/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component (state + routing)
    ├── App.css               # Global layout styles
    ├── utils.js              # Helpers (today, calcDueDate, isOverdue) + icon paths
    ├── data/
    │   └── seedData.js       # Initial books, users, borrowings
    ├── components/
    │   ├── Icon.jsx           # SVG icon renderer
    │   ├── Badge.jsx          # Colored status badge
    │   ├── Badge.css
    │   ├── Modal.jsx          # Reusable modal overlay
    │   ├── Modal.css
    │   ├── FormField.jsx      # FormField, Input, Select
    │   ├── FormField.css
    │   ├── Sidebar.jsx        # Left navigation sidebar
    │   └── Sidebar.css
    └── pages/
        ├── Dashboard.jsx      # Stats + availability + recent borrowings
        ├── Dashboard.css
        ├── Books.jsx          # CRUD for books
        ├── Books.css
        ├── Users.jsx          # CRUD for users
        ├── Users.css
        ├── Borrowings.jsx     # Create borrowings, return books, filter
        └── Borrowings.css
```

## Features

- **Dashboard**: live stats, book availability bars, recent activity
- **Books**: add / edit / delete books with title, author, genre, ISBN, year, copies
- **Users**: add / edit / delete users with status (Active / Suspended)
- **Borrowings**: create new borrowings, return books, auto-calculate overdue status
- All state is in-memory — resets on page refresh (no backend needed)
