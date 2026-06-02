import { useBookContext } from "../../../Contexts/Favorites";
import heartTitle from "../../../images/Website-images/Favorites-Title-img.png";
import heroBook from "../../../images/Website-images/Favorites-Page-img.png";
import "../../../Css/WebsiteCss/FavoritesCss/HeroSectionFavorites.css"

const FavoritesHero = () => {
  const { favorites } = useBookContext();

  return (
    <div className="favorites-hero">
      <div className="favorites-hero-left">
        <h1 className="favorites-hero-title">
          My Favorite Books
          <img src={heartTitle} alt="heart" className="favorites-hero-heart" />
        </h1>
        <p className="favorites-hero-subtitle">Books that left a mark on you.</p>
        <div className="favorites-hero-divider" />
        <p className="favorites-hero-count">
          <strong>{favorites.length}</strong> Books
        </p>
      </div>
      <img src={heroBook} alt="open book" className="favorites-hero-image" />
    </div>
  );
};

export default FavoritesHero;