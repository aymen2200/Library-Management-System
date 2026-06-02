import { useState, useEffect } from "react";
import { useCategoriesContext } from "../../../Contexts/Categories";
import BookCard from "../Book-Card";
import Pagination from "../Pagination";
import "../../../Css/WebsiteCss/CategoriesCss/CategoriesGrid.css";
import { searchBooks } from "../../../APICalls/AllBooksAPICalls";

const BOOKS_PER_PAGE = 20;

const CategoriesGrid = () => {
    const { books } = useCategoriesContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBooks = searchBooks(searchQuery, books);

    const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * BOOKS_PER_PAGE,
        currentPage * BOOKS_PER_PAGE
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [books]);

    return (
        <div className="categories-grid-section">
            <div className="categories-grid-search-bar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e7b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Search in this category..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="categories-grid-search-input"
                />
            </div>

            {paginatedBooks.length === 0 ? (
                <p className="categories-grid-no-results">
                    {searchQuery ? "No books match your search." : "No books in this category."}
                </p>
            ) : (
                <div className="categories-grid-books">
                    {paginatedBooks.map((book) => (
                        <BookCard key={book.BookID} book={book} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="categories-grid-pagination">
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

export default CategoriesGrid;