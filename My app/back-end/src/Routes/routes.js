const express = require("express");
const router = express.Router();

const { getAllBooks, createBook, getBook, updateBook, deleteBook, borrowBook, returnBook, getCopies, addCopy, getBorrowings, getFines, payFine, addToFavorite } = require("../controllers/controllers");
const { authenticate, authorize } = require('../middlewares');


router.get('/borrowings', getBorrowings);

router.get('/fines', authenticate, getFines);
router.patch('/fines/:id/pay', payFine);

// FIX 3: '/copies/:copyid/return' is placed BEFORE '/:id' for the same reason above.
router.patch('/copies/:copyid/return', returnBook);

router.get('/', getAllBooks).post('/', createBook);

router.get('/:id', getBook).put('/:id', updateBook).delete('/:id', deleteBook);

router.post('/:id/borrow', borrowBook);

router.get('/:id/copies', getCopies).post('/:id/copies', addCopy);

router.post('/fav/addFav', authenticate, addToFavorite);


module.exports = router;
