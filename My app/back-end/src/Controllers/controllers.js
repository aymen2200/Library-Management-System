const db = require("../config/db"); // FIX 1: was "../database/db" — corrected to match your actual config path

//All books
const getAllBooks = async (req, res) => {
  const { title, author, genre } = req.query;

  try {
    let query = `
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
      INNER JOIN bookauthors ON books.bookid = bookauthors.bookid
      INNER JOIN authors ON authors.authorid = bookauthors.authorid
      LEFT JOIN bookcopies AS copies ON books.bookid = copies.bookid
      WHERE books.IsDeleted = FALSE`;

    const params = [];

    if (title) {
      query += ` AND books.title LIKE ?`;
      params.push(`%${title}%`);
    }
    if (author) {
      query += ` AND authors.fullname LIKE ?`;
      params.push(`%${author}%`);
    }
    if (genre) {
      query += ` AND books.genre LIKE ?`;
      params.push(`%${genre}%`);
    }

    query += ` GROUP BY books.bookid`;

    const [rows] = await db.execute(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No result" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//show book copies
const getCopies = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT *
             FROM bookcopies
             WHERE BookID = ?`,
      [id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "No result" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//Active borrowings
const getBorrowings = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM borrowingrecords 
      WHERE Status = 'borrowed' 
      ORDER BY DueDate ASC`);
    if (rows.length === 0) {
      return res.status(404).json({ message: "No Active Borrowings" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//get all fines
const getFines = async (req, res) => {
  const { status, userid } = req.query; // optionally filter by a specific user

  try {
    let query = `SELECT * FROM fines WHERE 1=1`;
    const params = [];

    if (status) {
      query += ` AND PaymentStatus = ?`;
      params.push(status);
    }
    if (userid) {
      query += ` AND UserID = ?`;
      params.push(userid);
    }

    const [rows] = await db.execute(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No fines found." });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//pay fine
const payFine = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.execute(
      `UPDATE fines SET PaymentStatus = 'paid' WHERE FineID = ? AND PaymentStatus = 'unpaid'`,
      [id],
    );
    if (results.affectedRows === 0) {
      return res.status(409).json({ message: "Error" });
    }
    res.status(200).json({ message: "Fine paid successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//creating new book
const createBook = async (req, res) => {
  const {
    Title,
    ISBN,
    PublicationDate,
    Genre,
    AdditionalDetails,
    Image,
    AuthorName,
    Barcode,
  } = req.body;

  if (!Title || !ISBN || !PublicationDate || !Genre || !Image || !AuthorName) {
    return res.status(400).json({
      message:
        "Title, ISBN, Publication Date, Genre, Image, Barcode and Author Name are required.",
    });
  }

  const connection = await db.getConnection();
  try {
   const [existing] = await connection.execute(
  `SELECT BookID, IsDeleted FROM books WHERE ISBN = ?`,
  [ISBN],
);

if (existing.length > 0) {
  // Book exists but deleted
  if (existing[0].IsDeleted) {
    return res.status(409).json({
      message:
        "A deleted book with this ISBN already exists. Restore it instead.",
      deletedBookId: existing[0].BookID,
    });
  }

  // Active book exists
  return res.status(409).json({
    message: "A book with the same ISBN already exists.",
  });
}

    await connection.beginTransaction();

    const [result] = await connection.execute(
      `INSERT INTO Books 
            (Title, ISBN, PublicationDate, Genre, AdditionalDetails, Image, CreatedAt, IsDeleted)
             VALUES (?,?,?,?,?,?,NOW(),0)`,
      [Title, ISBN, PublicationDate, Genre, AdditionalDetails || null, Image],
    );

    const newBookID = result.insertId;

    await connection.execute(
      `INSERT INTO BookCopies 
            (BookID, Barcode, AvailabilityStatus) Values (?,?,'Available')`,
      [newBookID, Barcode],
    );

    const [author] = await connection.execute(
      `SELECT AuthorID FROM authors WHERE FullName = ?`,
      [AuthorName],
    );

    let AuthorID;
    if (author.length > 0) {
      AuthorID = author[0].AuthorID;
    } else {
      const [newAuthor] = await connection.execute(
        `INSERT INTO authors (FullName) VALUES(?)`,
        [AuthorName],
      );
      AuthorID = newAuthor.insertId; // FIX 3: was newAuthor[0].insertId — insertId is on the result directly, not on a row
    }

    await connection.execute(
      `INSERT INTO bookauthors (BookID, AuthorID) VALUES(?,?)`,
      [newBookID, AuthorID],
    );

    await connection.commit();
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Database error" });
  } finally {
    connection.release();
  }
};

//add copy
const addCopy = async (req, res) => {
  const { id } = req.params;
  const { Barcode } = req.body;
  try {
    await db.execute(`INSERT INTO bookcopies (BookID, Barcode) VALUES(?,?)`, [
      id,
      Barcode,
    ]);
    res.status(201).json({ message: "Copy added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//get one book
const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute(
      `SELECT 
        books.*,
        GROUP_CONCAT(DISTINCT authors.FullName ORDER BY authors.FullName SEPARATOR ', ') AS Authors,
        COUNT(DISTINCT copies.CopyID) AS TotalCopies,
        COUNT(DISTINCT CASE WHEN copies.AvailabilityStatus = 'available' THEN copies.CopyID END) AS AvailableCopies,
        CASE 
          WHEN COUNT(DISTINCT copies.CopyID) = 0 THEN 'no copies'
          WHEN COUNT(DISTINCT CASE WHEN copies.AvailabilityStatus = 'available' THEN copies.CopyID END) > 0 THEN 'available'
          ELSE 'unavailable'
        END AS Status
      FROM books
      LEFT JOIN bookauthors ON books.bookid = bookauthors.bookid
      LEFT JOIN authors ON authors.authorid = bookauthors.authorid
      LEFT JOIN bookcopies AS copies ON books.bookid = copies.bookid
      WHERE books.BookID = ? AND books.IsDeleted = FALSE
      GROUP BY books.bookid`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//updating one book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, ISBN, PublicationDate, Genre, AdditionalDetails } = req.body;
    const [result] = await db.execute(
      `UPDATE books SET 
            Title = COALESCE(?,Title),
            ISBN = COALESCE(?,ISBN),
            PublicationDate = COALESCE(?,PublicationDate),
            Genre = COALESCE(?,Genre),
            AdditionalDetails = COALESCE(?,AdditionalDetails)
            WHERE BookID = ? AND IsDeleted = FALSE`,
      [
        Title ?? null,
        ISBN ?? null,
        PublicationDate ?? null,
        Genre ?? null,
        AdditionalDetails ?? null,
        id,
      ],
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      `UPDATE books SET IsDeleted = TRUE WHERE BookID = ? AND IsDeleted = FALSE`,
      [id],
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Book not found or already deleted" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

//restore book (to restore a deleted book)
const restoreBook = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      `UPDATE books SET IsDeleted = FALSE WHERE BookID = ? AND IsDeleted = TRUE`,
      [id],
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Book not found or already available" });
    }
    res.status(200).json({ message: "Book restored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};


//borrowing a book
const borrowBook = async (req, res) => {
  const { id } = req.params;
  const { userid } = req.body;
  const connection = await db.getConnection();
  try {

    const [[{ activeBorrows }]] = await connection.execute(
      `SELECT COUNT(*) AS activeBorrows
       FROM borrowingrecords
       WHERE userid = ?
         AND status IN ('borrowed', 'overdue')`,
      [userid],
    );

    if (activeBorrows >= 3) {
      return res.status(409).json({
        message: "You cannot borrow more than 3 books at a time.",
      });
    }

    const [rows] = await connection.execute(
      `SELECT bookcopies.*
       FROM bookcopies INNER JOIN books ON books.bookid = bookcopies.bookid
       WHERE books.bookid = ?
         AND bookcopies.AvailabilityStatus = 'available'
       LIMIT 1`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(409).json({
        message: "This book is unavailable right now. Try again later.",
      });
    }

    const copyid = rows[0].CopyID;

    await connection.beginTransaction();

    await connection.execute(
      `INSERT INTO borrowingrecords (userid, copyid, borrowingdate, duedate, status)
       VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'borrowed')`,
      [userid, copyid],
    );

    await connection.execute(
      `UPDATE bookcopies SET AvailabilityStatus = 'borrowed' WHERE copyid = ?`,
      [copyid],
    );

    await connection.commit();
    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Database error" });
  } finally {
    connection.release();
  }
};

//return book
const returnBook = async (req, res) => {
  const { copyid } = req.params;
  const connection = await db.getConnection();
  try {
    const [records] = await connection.execute(
      `SELECT BorrowingRecordID, UserID, DueDate, 
                DATEDIFF(CURDATE(), DueDate) AS DaysOverdue FROM borrowingrecords 
                WHERE CopyID = ? AND Status = 'borrowed'`,
      [copyid],
    );

    if (records.length === 0) {
      res
        .status(404)
        .json({ message: "This book copy has no active borrowing record" });
      return;
    }

    await connection.beginTransaction();
    const { BorrowingRecordID, UserID, DaysOverdue } = records[0];

    if (DaysOverdue > 0) {
      const fine = DaysOverdue * 100;
      await connection.execute(
        `INSERT INTO fines (UserID, BorrowingRecordID, NumberOfLateDays, FineAmount) 
                VALUES(?,?,?,?)`,
        [UserID, BorrowingRecordID, DaysOverdue, fine],
      );
    }

    await connection.execute(
      `UPDATE bookcopies SET AvailabilityStatus = 'Available' WHERE CopyID = ?`,
      [copyid],
    );
    await connection.execute(
      `UPDATE borrowingrecords SET ActualReturnDate = CURDATE(), Status = 'returned' WHERE CopyID = ? 
            AND Status = 'borrowed'`,
      [copyid],
    );

    await connection.commit();
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Database error" });
  } finally {
    connection.release();
  }
};

//add to favorites
const addToFavorite = async (req, res, next) => {
  const userID = req.user.id;
  const { bookID } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM books WHERE BookID = ?',
      [bookID]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    const [existing] = await db.query(
      'SELECT * FROM favorites WHERE BookID = ? AND UserID = ?',
      [bookID, userID]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: "The book is already in favorites" });
    }

    await db.query(
      'INSERT INTO favorites (BookID, UserID) VALUES (?,?)',
      [bookID, userID]
    );

    res.status(200).json({ message: "The book is added to favorites!" });
  } catch (err) {
    next(err);
  }
};

const favorites = async (req, res, next) => { // Get All Favorites!
  const userID = req.user.id;
  try {
    const [rows] = await db.query(
      `SELECT b.BookID, b.Title, b.ISBN, b.Genre, b.Image, b.AdditionalDetails,
              GROUP_CONCAT(a.FullName SEPARATOR ', ') AS Authors
       FROM Favorites f
       JOIN Books b ON f.FavoriteID = b.BookID
       LEFT JOIN BookAuthors ba ON b.BookID = ba.BookID
       LEFT JOIN Authors a ON ba.AuthorID = a.AuthorID
       WHERE f.UserID = ? AND b.IsDeleted = FALSE
       GROUP BY b.BookID`,
      [userID]
    );

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

const removeFav = async (req, res, next) => {
  const userID = req.user.id;
  const { bookID } = req.params;
  try {
    const [existing] = await db.query(
      'SELECT * FROM Favorites WHERE BookID = ? AND UserID = ?',
      [bookID, userID]
    );
    if (existing.length === 0) {
      return res.status(404).json({ error: "Book not found in favorites" });
    }

    await db.query(
      'DELETE FROM Favorites WHERE BookID = ? AND UserID = ?',
      [bookID, userID]
    );

    res.status(200).json({ message: "Book removed from favorites!" });
  } catch (err) {
    next(err);
  }
};

const clearFav = async (req, res, next) => {
  const userID = req.user.id;
  try {
    const [existing] = await db.query(
      'SELECT * FROM favorites WHERE UserID = ?',
      [userID]
    );
    if (existing.length === 0) {
      return res.status(404).json({ error: "No favorites found" });
    }

    await db.query(
      'DELETE FROM favorites WHERE UserID = ?',
      [userID]
    );

    res.status(200).json({ message: "All favorites cleared!" });
  } catch (err) {
    next(err);
  }
};

const getPopularBooks = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
        books.*,
        GROUP_CONCAT(DISTINCT authors.FullName ORDER BY authors.FullName SEPARATOR ', ') AS Authors,
        COUNT(DISTINCT copies.CopyID) AS TotalCopies,
        COUNT(DISTINCT CASE WHEN copies.AvailabilityStatus = 'available' THEN copies.CopyID END) AS AvailableCopies,
        CASE 
          WHEN COUNT(DISTINCT copies.CopyID) = 0 THEN 'no copies'
          WHEN COUNT(DISTINCT CASE WHEN copies.AvailabilityStatus = 'available' THEN copies.CopyID END) > 0 THEN 'available'
          ELSE 'unavailable'
        END AS Status
      FROM popularbooks
      INNER JOIN books ON popularbooks.BookID = books.BookID
      LEFT JOIN bookauthors ON books.BookID = bookauthors.BookID
      LEFT JOIN authors ON authors.AuthorID = bookauthors.AuthorID
      LEFT JOIN bookcopies AS copies ON books.BookID = copies.BookID
      WHERE books.IsDeleted = FALSE
      GROUP BY books.BookID
      ORDER BY RAND()
      LIMIT 8`
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No popular books found" });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getCopies,
  getBorrowings,
  getFines,
  addCopy,
  payFine,
  addToFavorite,
  favorites,
  removeFav,
  clearFav,
  getPopularBooks,
  restoreBook
};