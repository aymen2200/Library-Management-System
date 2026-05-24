import React, { useState, useEffect } from "react";
import "./categories.css";
import { BiCategory } from "react-icons/bi";
import { getCategories } from "./BooksAPICalls";

export default function Categories() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH DATA
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // FILTER
  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

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

          <div className="category-hero-divider"></div>

          <p className="category-hero-count">
            <strong>{filtered.length}</strong> Categories
          </p>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="category-grid-section">

        {/* 🔥 SEARCH + BUTTON CENTERED */}
        <div className="category-controls">
          <div className="category-grid-search-bar">
            <input
              className="category-grid-search-input"
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="category-clear-btn"
            onClick={() => setSearch("")}
          >
            Clear All
          </button>
        </div>

        {/* STATES */}
        {loading && <p>Loading categories...</p>}
        {error && <p>{error}</p>}

        {/* LIST */}
        {!loading && !error && (
          filtered.length > 0 ? (
            <div className="categories-list">
              {filtered.map((cat) => (
                <div key={cat.id} className="category-row">
                  {cat.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-category-wrapper">
              <h2 className="empty-category-title">
                No categories found
              </h2>
              <p className="empty-category-subtitle">
                Try searching something else.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}