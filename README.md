# 📚 Library Management System

A full-featured Library Management System with a MySQL backend, RESTful API, and support for book borrowing, fines, favorites, and user management.

---

## 🗄️ Database

**MySQL** — Database name: `LibraryDB`

### Tables Overview

| Table | Description |
|---|---|
| `Books` | Core book records with soft delete support (`IsDeleted`) |
| `Authors` | Author records |
| `BookAuthors` | Many-to-many relation between books and authors |
| `BookCopies` | Physical copies of each book with availability status |
| `Users` | System users with roles (`member`, `librarian`, `admin`) |
| `BorrowingRecords` | Tracks who borrowed what and when |
| `Fines` | Late return fines per borrowing record |
| `Favorites` | Users can save books to their favorites |
| `Settings` | Global settings (default borrow days, fine per day) |

### Key Design Decisions

- **Soft deletes** — Books and Users are never hard deleted; `IsDeleted = FALSE` filters them out in queries
- **Book availability** — Computed dynamically via `COUNT` on `BookCopies.AvailabilityStatus` rather than stored as a static flag
- **Fines** — Calculated based on `NumberOfLateDays × DefaultFinePerDay` from the `Settings` table (default: **14 borrow days**, **$0.50/day**)

---

## 🔌 API Endpoints

### Books

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/books` | Get all books with authors, total copies, available copies, and computed status |
| `GET` | `/books/:id` | Get a single book |
| `PATCH` | `/books/:id/restore` | Restore a soft-deleted book (`IsDeleted` → `false`) |

### Favorites

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/favorites` | Get all favorite books for the logged-in user |

> **Note:** `PATCH` is used for partial updates (e.g. restoring a book) since only one field changes. `PUT` would replace the entire resource.

---

## 📐 Notable Queries

### Get All Books with Status
```sql
SELECT
  books.*,
  GROUP_CONCAT(DISTINCT authors.fullname ORDER BY authors.fullname SEPARATOR ', ') AS Authors,
  COUNT(DISTINCT copies.CopyID) AS TotalCopies,
  COUNT(DISTINCT CASE WHEN copies.AvailabilityStatus = 'available' THEN copies.CopyID END) AS AvailableCopies,
  CASE
    WHEN COUNT(DISTINCT CASE WHEN copies.AvailabilityStatus = 'available' THEN copies.CopyID END) > 0
    THEN 'available'
    ELSE 'unavailable'
  END AS Status
FROM books
LEFT JOIN bookauthors ON books.bookid = bookauthors.bookid
LEFT JOIN authors ON authors.authorid = bookauthors.authorid
LEFT JOIN bookcopies AS copies ON books.bookid = copies.bookid
WHERE books.IsDeleted = FALSE
GROUP BY books.bookid
```

### Get User Favorites
```sql
SELECT b.BookID, b.Title, b.ISBN, b.Genre, b.Image, b.AdditionalDetails,
       GROUP_CONCAT(a.FullName SEPARATOR ', ') AS Authors
FROM Favorites f
JOIN Books b ON f.BookID = b.BookID
LEFT JOIN BookAuthors ba ON b.BookID = ba.BookID
LEFT JOIN Authors a ON ba.AuthorID = a.AuthorID
WHERE f.UserID = ? AND b.IsDeleted = FALSE
GROUP BY b.BookID
```

---

## 🛠️ Git Workflow Notes

- Use `git restore --staged <file>` to unstage a file after `git add`
- Use `git reset --soft HEAD~1` to undo the last commit while keeping changes staged
- Use `git reset --mixed HEAD~1` to undo the last commit and move changes to working directory
- Watch out for **line ending conflicts** (`CRLF` vs `LF`) — configure with:
  ```bash
  git config --global core.autocrlf input  # Mac/Linux
  git config --global core.autocrlf true   # Windows
  ```

---

## ⚙️ Default Settings

| Setting | Default Value |
|---|---|
| Borrow duration | 14 days |
| Fine per late day | $0.50 |


(P.S:there is a small problem in the project which is that the login is supposed to forward the admin into a different interface than users but instead it forward them to the same one and forward the "librarian" to the other interface, and the "librarian" is not even supposed to be part of the library members but was added to the database by mistake and then to other parts of login system in frontend and backend so if anyone is interested in helping us he can solve this problem if he wants to test his fullstack abilities and that's all).
