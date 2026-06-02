import React from "react";
import CategoriesHero from "../Components/WebsiteComponents/CategoriesComponents/CategoriesHero";
import CategoriesGrid from "../Components/WebsiteComponents/CategoriesComponents/CategoriesGrid";
import "../Css/WebsiteCss/CategoriesCss/CategoriesPage.css";

const CategoriesPage = () => {
  return (
    <div className="Categories-page">
      <CategoriesHero />
      <CategoriesGrid />
    </div>
  );
};

export default CategoriesPage;