import React, { useContext } from "react";
import { useBookContext } from "../Contexts/Favorites";
import { useUserContext } from "../Contexts/User";
import AuthRequiredCard from "../Components/WebsiteComponents/AuthentificationRequestCard";
import FavoritesHero from "../Components/WebsiteComponents/FavoritesComponents/HeroSectionFavorites";
import FavoritesGrid from "../Components/WebsiteComponents/FavoritesComponents/FavoritesGrid";
import EmptyFavorites from "../Components/WebsiteComponents/FavoritesComponents/EmptyFavoritesPage";
import "../Css/WebsiteCss/FavoritesCss/Favorites.css";

const FavoritesPage = () => {
  const { favorites } = useBookContext();
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {!isAuthenticated ? (
        <AuthRequiredCard />
      ) : (
        <div className="favorites-page">
          {favorites.length === 0 ? (
            <EmptyFavorites />
          ) : (
            <>
              <FavoritesHero />
              <FavoritesGrid />
            </>
          )}
        </div>
      )}
    </>
  );

};

export default FavoritesPage;