import React, { useState, useEffect } from "react";
import { useBookContext } from "../../../Contexts/Favorites";
import BookCard from "../Book-Card";
import Pagination from "../Pagination";
import "../../../Css/WebsiteCss/FavoritesCss/FavoritesGrid.css";
import { searchBooks } from "../../../APICalls/BooksAPICalls";

const BOOKS_PER_PAGE = 20;

const FavoritesGrid = () => {
  const { favorites, isLoading, clearFavorites } = useBookContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredFavorites = searchBooks(searchQuery, favorites);

  const totalPages = Math.ceil(filteredFavorites.length / BOOKS_PER_PAGE);
  const paginatedFavorites = filteredFavorites.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClear = async () => {
    await clearFavorites();
    setCurrentPage(1);
    setSearchQuery("");
  };

  if (isLoading) return <div className="loading-spinner" />;

  return (
    <div className="favorites-grid-section">
      <div className="favorites-grid-search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e7b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search your favorites..."
          value={searchQuery}
          onChange={handleSearch}
          className="favorites-grid-search-input"
        />
      </div>

      <button className="favorites-clear-btn" onClick={handleClear}>
        Clear All
      </button>

      {paginatedFavorites.length === 0 ? (
        <p className="favorites-grid-no-results">
          {searchQuery ? "No books match your search." : "No favorites yet."}
        </p>
      ) : (
        <div className="favorites-grid-books">
          {paginatedFavorites.map((book) => (
            <BookCard key={book.BookID} book={book} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="favorites-grid-pagination">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default FavoritesGrid;