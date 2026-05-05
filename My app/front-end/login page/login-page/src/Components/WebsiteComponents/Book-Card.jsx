import React, { useState } from "react";
import { useBookContext } from "../../Contexts/Favorites";
import "../../Css/WebsiteCss/BookCard.css";
{/*import BorrowModal from "./BorrowingModal";*/ }
import BookDetailsModal from "./BookDetailsModal";


const BookCard = ({ book }) => {

  const id = book.id;
  const title = book.volumeInfo?.title;
  const author = book.volumeInfo?.authors?.[0];
  const coverImg = book.volumeInfo?.imageLinks?.thumbnail;
  const available = true;
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const { isFavorite, addToFavorites, removeFromFavorites } = useBookContext();

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <>
      <div className="book-card" onClick={() => setShowDetailsModal(true)}>

        <div className="cover-container">
          <img src={coverImg} alt={title} className="cover-img" />
          <div className="cover-overlay" />
          <button
            className={`heart-btn ${isFavorite(id) ? "favorited" : ""}`}
            onClick={handleFavoriteToggle}
            title={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite(id) ? "♥" : "♡"}
          </button>
        </div>

        <div className="book-info">
          <div className="book-texts">
            <p className="book-title">{title}</p>
            <p className="book-author">{author}</p>
          </div>
          <div className="book-bottom">
            <span className={`status-badge ${available ? "status-available" : "status-unavailable"}`}>
              <span className={`status-dot ${available ? "dot-green" : "dot-red"}`} />
              {available ? "Available" : "Not Available"}
            </span>

            {/* <button
            className={`borrow-btn ${available ? "active" : "disabled-btn"}`}
            onClick={() => setShowModal(true)}
          >
            {available ? "Borrow Now" : "Reserve Later"}
          </button> */}
            {showModal && <BorrowModal book={book} onClose={() => setShowModal(false)} />}
          </div>
        </div>
      </div>
      {showDetailsModal && (
        <BookDetailsModal book={book} onClose={() => setShowDetailsModal(false)} />
      )}
    </>
  );
};

export default BookCard;