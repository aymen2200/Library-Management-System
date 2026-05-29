const express = require("express");
const router = express.Router();


const { getAllBooks, createBook, getBook, updateBook, deleteBook, borrowBook, returnBook, getCopies, addCopy, getBorrowings, getFines, payFine, addToFavorite, favorites, removeFav, clearFav, getPopularBooks, restoreBook } = require("../controllers/controllers");
const { authenticate, authorize } = require('../middlewares');



router.get('/', getAllBooks).post('/', createBook);

router.get('/borrowings', getBorrowings);

router.get('/popular', getPopularBooks)

router.get('/fines', getFines);

router.patch('/fines/:id/pay', payFine);

router.patch('/copies/:copyid/return', returnBook);

router.get('/fav/getFav', authenticate, favorites)

router.delete('/fav/deleteFav/:bookID',  authenticate, removeFav)

router.delete('/fav/clear', authenticate, clearFav)

router.post('/fav/addFav', authenticate, addToFavorite);

router.post('/:id/borrow', borrowBook);

router.get('/:id/copies', getCopies).post('/:id/copies', addCopy);

router.patch('/:id/restore', restoreBook);

router.get('/:id', getBook).put('/:id', updateBook).delete('/:id', deleteBook);



module.exports = router;
