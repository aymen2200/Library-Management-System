import Navbar from "../Components/WebsiteComponents/NavBarComponents/NavBar";
import '../Css/WebsiteCss/MainCss/Main.css'
import BookCard from "../Components/WebsiteComponents/Book-Card";

const MainPage = () => {

    const books = [
        {
            id: 1,
            title: "1984",
            author: "George Orwell",
            available: true,
            availableFrom: null,
            pricePerDay: 50,
            coverImg: "https://covers.openlibrary.org/b/id/8575708-M.jpg"
        },
        {
            id: 2,
            title: "The Alchemist",
            author: "Paulo Coelho",
            available: false,
            availableFrom: "2025-05-10",
            pricePerDay: 80,
            coverImg: "https://covers.openlibrary.org/b/id/8739161-M.jpg"
        },
        {
            id: 3,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            available: true,
            availableFrom: null,
            pricePerDay: 100,
            coverImg: "https://covers.openlibrary.org/b/id/8592726-M.jpg"
        },
        {
            id: 4,
            title: "Atomic Habits",
            author: "James Clear",
            available: false,
            availableFrom: "2025-05-03",
            pricePerDay: 70,
            coverImg: "https://covers.openlibrary.org/b/id/10519347-M.jpg"
        },
        {
            id: 5,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            available: true,
            availableFrom: null,
            pricePerDay: 60,
            coverImg: "https://covers.openlibrary.org/b/id/8810494-M.jpg"
        },
        {
            id: 6,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            available: false,
            availableFrom: "2025-05-15",
            pricePerDay: 55,
            coverImg: "https://covers.openlibrary.org/b/id/8432512-M.jpg"
        },
        {
            id: 7,
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            available: true,
            availableFrom: null,
            pricePerDay: 90,
            coverImg: "https://covers.openlibrary.org/b/id/10110415-M.jpg"
        },
        {
            id: 8,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            available: true,
            availableFrom: null,
            pricePerDay: 85,
            coverImg: "https://covers.openlibrary.org/b/id/6979861-M.jpg"
        },
        {
            id: 9,
            title: "Brave New World",
            author: "Aldous Huxley",
            available: false,
            availableFrom: "2025-05-20",
            pricePerDay: 65,
            coverImg: "https://covers.openlibrary.org/b/id/8281800-M.jpg"
        },
        {
            id: 10,
            title: "The Subtle Art of Not Giving a F*ck",
            author: "Mark Manson",
            available: true,
            availableFrom: null,
            pricePerDay: 75,
            coverImg: "https://covers.openlibrary.org/b/id/8371763-M.jpg"
        },
        {
            id: 11,
            title: "Think and Grow Rich",
            author: "Napoleon Hill",
            available: false,
            availableFrom: "2025-05-08",
            pricePerDay: 55,
            coverImg: "https://covers.openlibrary.org/b/id/7898783-M.jpg"
        },
        {
            id: 12,
            title: "The Power of Now",
            author: "Eckhart Tolle",
            available: true,
            availableFrom: null,
            pricePerDay: 70,
            coverImg: "https://covers.openlibrary.org/b/id/8786558-M.jpg"
        }
    ];



    return (
        <div className="Main-Page">
            <div className="BooksCards">
                {books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    )
}

export default MainPage;