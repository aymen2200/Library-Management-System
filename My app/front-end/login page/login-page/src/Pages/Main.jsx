import { useState, useEffect } from "react";
import BookCard from "../Components/WebsiteComponents/Book-Card";
import { getPopularBooks } from "../APICalls/BooksAPICalls";
import '../Css/WebsiteCss/MainCss/Main.css'
import { useNavigate } from "react-router-dom";
import HeroSection from "../Components/WebsiteComponents/MainComponents/HeroSection";

const MainPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getPopularBooks();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    return (
        <div className="Main-Page">
            <HeroSection />
            <div className="Popular-Books">
                <h1 className="Popular-Books-Title">Our Popular Books</h1>
                <div className="BooksCards">
                    {books.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;