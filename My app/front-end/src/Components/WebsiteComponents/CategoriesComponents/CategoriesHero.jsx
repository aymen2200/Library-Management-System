import { useCategoriesContext } from "../../../Contexts/Categories";
import BooksCategories from "../../../images/Website-images/Categories Hero.png";
import "../../../Css/WebsiteCss/CategoriesCss/CategoriesHero.css"

const CategoriesHero = () => {
    const { selectedGenre, books } = useCategoriesContext();

    return (
        <div className="Categories-hero">
            <div className="Categories-hero-left">
                <h1 className="Categories-hero-title">
                    Lost in the world of {selectedGenre} — where every page tells a story.
                </h1>
                <div className="Categories-hero-divider" />
                <p className="Categories-hero-count">
                    <strong>{books.length}</strong> Books
                </p>
            </div>
            <img src={BooksCategories} alt="open book" className="Categories-hero-image" />
        </div>
    );
};

export default CategoriesHero;