import { useState, useEffect, useRef } from "react";
import BookCard from "../Components/WebsiteComponents/Book-Card";
import AllBooksHero from "../Components/WebsiteComponents/AllBooksComponents/AllBooksHero";
import SearchBar from "../Components/WebsiteComponents/AllBooksComponents/SearchBar";
import Pagination from "../Components/WebsiteComponents/Pagination";
import { getAllBooks, searchBooks } from "../APICalls/BooksAPICalls";
import "../Css/WebsiteCss/AllBooksCss/AllBooksPage.css";
import { useLocation } from "react-router-dom";

const LIMIT = 20;

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("default");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const skipFetch = useRef(false); 
  const location = useLocation();

  useEffect(() => {
    setQuery("default");
    setPage(1);
  }, [location.key]);

  useEffect(() => {
    if (skipFetch.current) {
      skipFetch.current = false;
      return;
    }
    const fetchBooks = async () => {
      console.log("fetchBooks called"); 
      setLoading(true);
      try {
        const result = query === "default"
          ? await getAllBooks(page, LIMIT)
          : await searchBooks(query, page, LIMIT);
        console.log("result:", result); 
        setBooks(result.books);
        setTotalItems(result.totalItems);
      } catch (err) {
        console.error("API error:", err);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [query, page]);

  const totalPages = Math.min(Math.ceil(totalItems / LIMIT), 10);

  const handleSearch = (results, searchQuery, total) => {
    if (searchQuery === "default") {
      setQuery("default");
      setPage(1);
      return;
    }
    skipFetch.current = true;
    setBooks(results);
    setTotalItems(total ?? results.length);
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className="allbooks-page">
      <AllBooksHero />
      <SearchBar onResults={handleSearch} />
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
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AllBooksPage;