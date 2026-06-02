import heartEmpty from "../../../images/Website-images/Empty-Favorites-Page-img.png";
import "../../../Css/WebsiteCss/FavoritesCss/EmptyFavorites.css"
import { useNavigate } from "react-router-dom";

const EmptyFavorites = () => {
    const navigate = useNavigate();
    return (
        <div className="empty-favorites-wrapper">
            <img src={heartEmpty} alt="no favorites" className="empty-favorites-heart" />
            <h2 className="empty-favorites-title">No favorites yet?</h2>
            <p className="empty-favorites-subtitle">
                Start exploring books and save the ones you love.
            </p>
            <button className="hero-btn" onClick={() => navigate("/AllBooks")}>
                Explore Books
            </button>
        </div>
    );
};

export default EmptyFavorites;