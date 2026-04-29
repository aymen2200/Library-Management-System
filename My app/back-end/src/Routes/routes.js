const express = require("express")
const router = express.Router()

const {getAllBooks, createBook, getBook, updateBook, deleteBook, borrowBook, returnBook, getCopies, addCopy, getBorrowings, getFines, payFine, addToFavorite} = require("../controllers/controllers")
const { authenticate, authorize } = require('../middlewares');

router.get('/books',getAllBooks).post('/books',createBook)

router.get('/books/:id',getBook).put('/books/:id',updateBook).delete('/books/:id',deleteBook)

router.post('/books/:id/borrow',borrowBook)

router.patch('/books/copies/:copyid/return',returnBook)

router.get('/books/:id/copies',getCopies).post('/books/:id/copies',addCopy)

router.get('/borrowings',getBorrowings)

router.get('/fines',getFines)

router.patch('/fines/:id/pay',payFine)

router.post('/fav/addFav', authenticate, addToFavorite)


module.exports = router;
