import { useState } from "react";
import { searchBooks } from "../../../APICalls/BooksAPICalls";
import '../../../Css/WebsiteCss/AllBooksCss/SearchBar.css'

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      onResults([], "default", 0);
      return;
    }
    setLoading(true);
    const { books, totalItems } = await searchBooks(query);
    onResults(books, query, totalItems);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={handleSearch}>
          {loading ? (
            <span className="search-spinner" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;