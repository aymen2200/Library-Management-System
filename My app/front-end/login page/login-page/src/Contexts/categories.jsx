import React, { useState, useEffect } from "react";
import "./categories.css";
import { BiCategory } from "react-icons/bi";

// ✅ correct path to API
import { getCategories, getAllBooks } from "./APICalls/BooksAPICalls";

// ✅ correct path to BookCard
import BookCard from "./Components/WebsiteComponents/BookCard";

export default function Categories() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 FETCH BOTH CATEGORIES + BOOKS
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [catsData, booksData] = await Promise.all([
          getCategories(),       // from your API
          getAllBooks()          // axios inside already
        ]);

        setCategories(catsData || []);
        setBooks(booksData.books || []);

      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔍 FILTER CATEGORIES
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📚 SIMPLE BOOK FILTER (TEMP LOGIC)
  const getBooksByCategory = (categoryName) => {
    return books.filter((book) => {
      const title = book.volumeInfo?.title || "";
      const authors = book.volumeInfo?.authors?.join(" ") || "";

      return (
        title.toLowerCase().includes(categoryName.toLowerCase()) ||
        authors.toLowerCase().includes(categoryName.toLowerCase())
      );
    });
  };

  return (
    <div className="category-page">

      {/* HERO */}
      <div className="category-hero">
        <div className="category-hero-left">
          <h1 className="category-hero-title">
            Categories <BiCategory />
          </h1>

          <p className="category-hero-subtitle">
            Explore all available book categories.
          </p>

          <p className="category-hero-count">
            <strong>{filteredCategories.length}</strong> Categories
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="category-controls">
        <input
          className="category-grid-search-input"
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="category-clear-btn"
          onClick={() => setSearch("")}
        >
          Clear All
        </button>
      </div>

      {/* STATES */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* CONTENT */}
      {!loading && !error && (
        <div className="categories-list">

          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <div key={cat.id || cat.name} className="category-block">

                {/* CATEGORY NAME */}
                <h2 className="category-title">{cat.name}</h2>

                {/* BOOKS GRID */}
                <div className="books-grid">
                  {getBooksByCategory(cat.name).length > 0 ? (
                    getBooksByCategory(cat.name).map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))
                  ) : (
                    <p>No books found</p>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="empty-category-wrapper">
              <h2>No categories found</h2>
              <p>Try something else.</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}