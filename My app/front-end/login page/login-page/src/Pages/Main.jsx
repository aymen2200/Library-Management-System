import { useState, useEffect } from "react";
import BookCard from "../Components/WebsiteComponents/Book-Card";
import { getPopularBooks } from "../APICalls/BooksAPICalls";
import '../Css/WebsiteCss/MainCss/Main.css'
import { useNavigate } from "react-router-dom";
import HeroSection from "../Components/WebsiteComponents/MainComponents/HeroSection";
import FeaturesBar from "../Components/WebsiteComponents/MainComponents/FeaturesBar";

const MainPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getPopularBooks();
                setBooks(data);
            } catch (err) {
                toast.error("Failed to load popular books.");
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="Main-Page">
            <HeroSection />
            <div className="Popular-Books">
                <h1 className="Popular-Books-Title">Books That Changed Lives</h1>
                <p className="Popular-Books-SubTitle">Handpicked titles from readers around the world</p>
                <div className="BooksCards">
                    {books.map(book => (
                        <BookCard key={book.BookId} book={book} />
                    ))}
                </div>
                <FeaturesBar />
            </div>
        </div>
    );
};

export default MainPage;