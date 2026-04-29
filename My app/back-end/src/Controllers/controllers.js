const { Connection } = require("mysql2");
const db = require("../database/db");

//All books
const getAllBooks = async (req, res) => {
  const { title, author, genre } = req.query;

  try {
    let query = `SELECT books.*, GROUP_CONCAT(authors.fullname SEPARATOR ', ') AS Authors
FROM books
INNER JOIN bookauthors ON books.bookid = bookauthors.bookid
INNER JOIN authors ON authors.authorid = bookauthors.authorid
WHERE books.IsDeleted = FALSE
GROUP BY books.bookid`;
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
    const [rows] = await db.execute(query, params);

    if (rows.length === 0) {
      res.status(404).json({ message: "No result" });
      return;
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
      WHERE ActualReturnDate IS NULL 
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

//View fines
const getFines = async (req, res) => {
  const { status } = req.query;
  try {
    const [rows] = await db.execute(
      `SELECT * FROM fines WHERE PaymentStatus = ?`,
      [status],
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

//pay fine
const payFine = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.execute(
      `UPDATE fines SET PaymentStatus = 'Paid' WHERE FineID = ? AND PaymentStatus = 'Pending'`,
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
    AuthorName,
    Barcode,
  } = req.body;
  if (!Title || !ISBN || !PublicationDate || !Genre || !AuthorName) {
    return res.status(400).json({
      message:
        "Title, ISBN, Publication Date, Genre, Barcode and Author Name are required.",
    });
  }
  const connection = await db.getConnection();
  try {
    const [existing] = await connection.execute(
      `SELECT BookID FROM books WHERE ISBN = ?`,
      [ISBN],
    );
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "A book with the same ISBN already exists." });
    }
    await connection.beginTransaction(); //We need it when multiple queries depend on each other — meaning if one fails, the others should not be saved.
    const [result] = await connection.execute(
      `INSERT INTO Books 
            (Title, ISBN, PublicationDate, Genre, AdditionalDetails, CreatedAt, IsDeleted)
             VALUES (?,?,?,?,?,NOW(),0)`,
      [Title, ISBN, PublicationDate, Genre, AdditionalDetails || null],
    );

    //creating the first physical copy
    const newBookID = result.insertId;

    await connection.execute(
      `INSERT INTO BookCopies 
            (BookID, Barcode, AvailabilityStatus) Values (?,?,'Available')`,
      [newBookID, Barcode],
    );

    //handling authors logic
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
      AuthorID = newAuthor[0].insertId;
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
      `SELECT * FROM books WHERE BookID = ? AND IsDeleted = FALSE`,
      [id],
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(rows[0]);
    }
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
            Title = COALESCE (?,Title),
            ISBN = COALESCE (?,ISBN),
            PublicationDate = COALESCE (?,PublicationDate),
            Genre = COALESCE (?,Genre),
            AdditionalDetails = COALESCE (?,AdditionalDetails)
            WHERE BookID = ?`,
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

//borrowing a book
const borrowBook = async (req, res) => {
  const { id } = req.params;
  const { userid } = req.body;
  const connection = await db.getConnection();
  try {
    //number of copies
    const [rows] = await db.execute(
      `SELECT *
            FROM bookcopies INNER JOIN books ON books.bookid = bookcopies.bookid 
            WHERE books.bookid = ?
            AND bookcopies.AvailabilityStatus = 'Available'
            LIMIT 1`,
      [id],
    );
    if (rows.length === 0) {
      res.status(409).json({
        message: "This book is unavailable right now.Try again later.",
      });
      return;
    }
    const copyid = rows[0].CopyID;

    await connection.beginTransaction();

    await connection.execute(
      `INSERT INTO borrowingrecords (userid, copyid, borrowingdate, duedate) 
             VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY))`,
      [userid, copyid],
    );

    await connection.execute(
      `UPDATE bookcopies SET AvailabilityStatus = 'Borrowed' WHERE copyid = ?`,
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
    //fines logic
    const [records] = await connection.execute(
      `SELECT BorrowingRecordID, UserID, DueDate, 
                DATEDIFF(CURDATE(), DueDate) AS DaysOverdue FROM borrowingrecords 
                WHERE CopyID = ? AND ActualReturnDate IS NULL`,
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

    //return logic
    await connection.execute(
      `UPDATE bookcopies SET AvailabilityStatus = 'Available' WHERE CopyID = ?`,
      [copyid],
    );
    await connection.execute(
      `UPDATE borrowingrecords SET ActualReturnDate = CURDATE() WHERE CopyID = ? 
            AND ActualReturnDate IS NULL`,
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

const addToFavorite = async (req, res, next)=>{
  const userID = req.user.id;
  const {bookID} = req.body;
  try{
    const [rows] = await db.query(
      'Select * from books where BookID= ?',
      [bookID]
    )
    if (rows.length == 0){
      return res.status(404).json({error : "the book Not found"})
    }

    const [existing] = await  db.query(
      'Select * from favorites where BookID = ? and UserID = ?',
      [bookID, userID]
    )

    if (existing.length > 0){
      return res.status(400).json({error : "the book is already in the favorites"})
    }

    await db.query(
      'Insert Into favaorites (BookID, UserID) Values (?,?)',
      [bookID, userID]
    )

    res.status(200).json({message : "the book is added to favorites!"})
  }
  catch(err){
    next(err);
  }
}


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
  addToFavorite
};
