import { useState, useEffect } from "react";
import BookCard from "../Components/WebsiteComponents/Book-Card";
import AllBooksHero from "../Components/WebsiteComponents/AllBooksComponents/AllBooksHero";
import SearchBar from "../Components/WebsiteComponents/AllBooksComponents/SearchBar";
import Pagination from "../Components/WebsiteComponents/Pagination";
import { getAllBooks, searchBooks } from "../APICalls/BooksAPICalls";
import "../Css/WebsiteCss/AllBooksCss/AllBooksPage.css";
import { useLocation } from "react-router-dom";

const LIMIT = 20;

const AllBooksPage = () => {
  const [originalBooks, setOriginalBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const result = await getAllBooks();
        setOriginalBooks(result);
        setAllBooks(result);
      } catch (err) {
        console.error("API error:", err);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [location.key]);

  const handleSearch = (query) => {
    setPage(1);
    if (!query.trim()) {
      setAllBooks(originalBooks);
      return;
    }
    const results = searchBooks(query, originalBooks);
    setAllBooks(results);
  };

  const startIndex = (page - 1) * LIMIT;
  const books = allBooks.slice(startIndex, startIndex + LIMIT);
  const totalPages = Math.ceil(allBooks.length / LIMIT);

  return (
    <div className="allbooks-page">
      <AllBooksHero />
      <SearchBar onSearch={handleSearch} />
      <h1 className="All-Books-Title">Our Book Collection</h1>
      {loading ? (
        <div className="books-loading">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="book-skeleton" />
          ))}
        </div>
      ) : (
        <div className="allbooks-grid">
          {books.map(book => (
            <BookCard key={book.BookID} book={book} />
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AllBooksPage;