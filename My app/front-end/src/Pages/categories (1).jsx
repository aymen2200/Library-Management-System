import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookCard from "../Components/WebsiteComponents/Book-Card";
import { getGenres, getBooksByGenre } from "../APICalls/CategoriesAPICalls";
import "../Css/WebsiteCss/categories.css";

/* ── Icon + accent colour per genre ─────────────────────────── */
const GENRE_META = {
  "Classic Fiction":     { icon: "📖", color: "#8B5E3C" },
  "Dystopian Fiction":   { icon: "🏚️", color: "#4A4A4A" },
  "Fantasy":             { icon: "🐉", color: "#6A0DAD" },
  "Health & Wellness":   { icon: "💚", color: "#2E8B57" },
  "Historical Fiction":  { icon: "🏛️", color: "#B8860B" },
  "History":             { icon: "📜", color: "#A0522D" },
  "Legal Thriller":      { icon: "⚖️", color: "#1B4F72" },
  "Literary Fiction":    { icon: "✍️", color: "#7B1E2A" },
  "Romance":             { icon: "💕", color: "#C71585" },
  "Science Fiction":     { icon: "🚀", color: "#1E90FF" },
  "Self-Help":           { icon: "🌱", color: "#228B22" },
  "Thriller":            { icon: "🔪", color: "#8B0000" },
};

const fallback = { icon: "📚", color: "#55151C" };
const meta = (genre) => GENRE_META[genre] || fallback;

/* ── Genre description helper ───────────────────────────────── */
const GENRE_DESC = {
  "Classic Fiction":     "Timeless stories that shaped literature and continue to inspire generations.",
  "Dystopian Fiction":   "Dark visions of society that challenge our understanding of freedom and power.",
  "Fantasy":             "Magical realms, epic quests, and worlds beyond imagination.",
  "Health & Wellness":   "Guides to living longer, healthier, and more fulfilling lives.",
  "Historical Fiction":  "Gripping tales woven into the fabric of real historical events.",
  "History":             "True stories from the past that illuminate the present.",
  "Legal Thriller":      "High-stakes courtroom drama and legal intrigue.",
  "Literary Fiction":    "Character-driven narratives exploring the depths of human experience.",
  "Romance":             "Stories of love, connection, and the complexity of relationships.",
  "Science Fiction":     "Exploring the frontiers of science, space, and the future of humanity.",
  "Self-Help":           "Practical wisdom for building better habits and a better life.",
  "Thriller":            "Heart-pounding suspense that keeps you on the edge of your seat.",
};

const desc = (genre) => GENRE_DESC[genre] || "Discover books in this category.";

export default function CategoriesPage() {
  const { genre } = useParams();
  const navigate = useNavigate();

  // ─── If a genre is selected, show books for that genre ───
  if (genre) {
    return <GenreBooksView genre={genre} onBack={() => navigate("/Categories")} />;
  }

  // ─── Otherwise show the category grid ────────────────────
  return <CategoryGridView />;
}

/* ================================================================
   VIEW 1 — Category Grid (all genres as cards)
   ================================================================ */
function CategoryGridView() {
  const [genres, setGenres] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [genresData, booksData] = await Promise.all([
          getGenres(),
          getAllBooksFormatted(),
        ]);
        setGenres(genresData);
        setAllBooks(booksData);
      } catch (err) {
        console.error("Failed to load genres and books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filteredGenres = genres.filter((g) =>
    g.Genre.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBooks = search.trim() !== "" 
    ? allBooks.filter((book) =>
        book.volumeInfo?.title?.toLowerCase().includes(search.toLowerCase()) ||
        book.volumeInfo?.authors?.join(", ").toLowerCase().includes(search.toLowerCase()) ||
        book.volumeInfo?.category?.toLowerCase().includes(search.toLowerCase())
      ) 
    : [];

  return (
    <div className="categories-page">
      {/* Hero */}
      <div className="categories-hero">
        <div className="categories-hero-overlay" />
        <div className="categories-hero-content">
          <p className="categories-hero-eyebrow">Browse by Genre</p>
          <h1 className="categories-hero-title">Explore Categories</h1>
          <div className="categories-hero-divider" />
          <p className="categories-hero-subtitle">
            Dive into our curated collection organized by genre
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="categories-search-wrap">
        <div className="categories-search-inner">
          <span className="categories-search-icon">🔍</span>
          <input
            type="text"
            className="categories-search-input"
            placeholder="Search categories or books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="categories-search-clear"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <div className="categories-count-row">
        <span className="categories-count-text">
          {search.trim() === "" 
            ? `${filteredGenres.length} ${filteredGenres.length === 1 ? "category" : "categories"} found`
            : `${filteredGenres.length} ${filteredGenres.length === 1 ? "category" : "categories"} and ${filteredBooks.length} ${filteredBooks.length === 1 ? "book" : "books"} found`}
        </span>
      </div>

      {loading ? (
        <div className="categories-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="category-card category-skeleton" />
          ))}
        </div>
      ) : (
        <>
          {/* Categories Grid */}
          <div className="categories-grid" style={{ marginBottom: filteredBooks.length > 0 ? "40px" : "100px" }}>
            {filteredGenres.length > 0 ? (
              filteredGenres.map((g, i) => {
                const m = meta(g.Genre);
                return (
                  <div
                    key={g.Genre}
                    className="category-card"
                    style={{ animationDelay: `${i * 0.06}s` }}
                    onClick={() => navigate(`/Categories/${encodeURIComponent(g.Genre)}`)}
                  >
                    <div
                      className="category-card-accent"
                      style={{ background: m.color }}
                    />
                    <div className="category-card-body">
                      <span className="category-card-icon">{m.icon}</span>
                      <h3 className="category-card-name">{g.Genre}</h3>
                      <p className="category-card-desc">{desc(g.Genre)}</p>
                    </div>
                    <div className="category-card-footer">
                      <span className="category-card-count">
                        {g.BookCount} {g.BookCount === 1 ? "book" : "books"}
                      </span>
                      <span className="category-card-arrow">→</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="categories-empty" style={{ padding: "40px 20px" }}>
                <span className="categories-empty-icon">📭</span>
                <span className="categories-empty-text">
                  No categories match your search
                </span>
              </div>
            )}
          </div>

          {/* Books Grid (Only shown when searching) */}
          {search.trim() !== "" && (
            <>
              {filteredBooks.length > 0 && (
                <div style={{ width: "90%", maxWidth: "1200px", marginTop: "20px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#55151C", borderBottom: "2px solid #D6B88A", paddingBottom: "10px", marginBottom: "20px" }}>
                    Matching Books
                  </h2>
                </div>
              )}
              <div className="allbooks-grid categories-books-grid" style={{ marginTop: 0 }}>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
                ) : (
                  <div className="categories-empty" style={{ paddingTop: "20px" }}>
                    <span className="categories-empty-icon">🔍</span>
                    <span className="categories-empty-text">
                      No books match your search
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ================================================================
   VIEW 2 — Books for a specific genre
   ================================================================ */
function GenreBooksView({ genre, onBack }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const decodedGenre = decodeURIComponent(genre);
  const m = meta(decodedGenre);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getBooksByGenre(decodedGenre);
        setBooks(data);
      } catch (err) {
        console.error("Failed to load books for genre:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [decodedGenre]);

  const filtered = books.filter((book) =>
    book.volumeInfo?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="categories-page">
      {/* Hero */}
      <div className="categories-hero">
        <div className="categories-hero-overlay" />
        <div className="categories-hero-content">
          <p className="categories-hero-eyebrow">Category</p>
          <h1 className="categories-hero-title">
            {m.icon} {decodedGenre}
          </h1>
          <div className="categories-hero-divider" />
          <p className="categories-hero-subtitle">{desc(decodedGenre)}</p>
        </div>
      </div>

      {/* Back button + Search */}
      <div className="categories-search-wrap">
        <button className="categories-back-btn" onClick={onBack}>
          ← All Categories
        </button>
        <div className="categories-search-inner">
          <span className="categories-search-icon">🔍</span>
          <input
            type="text"
            className="categories-search-input"
            placeholder={`Search in ${decodedGenre}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="categories-search-clear"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <div className="categories-count-row">
        <span className="categories-count-text">
          {filtered.length} {filtered.length === 1 ? "book" : "books"} found
        </span>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="allbooks-grid categories-books-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="book-skeleton" />
          ))}
        </div>
      ) : error ? (
        <div className="categories-empty">
          <span className="categories-empty-icon">😕</span>
          <span className="categories-empty-text">
            No books found in this category yet
          </span>
        </div>
      ) : (
        <div className="allbooks-grid categories-books-grid">
          {filtered.length > 0 ? (
            filtered.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <div className="categories-empty">
              <span className="categories-empty-icon">🔍</span>
              <span className="categories-empty-text">
                No books match your search
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}