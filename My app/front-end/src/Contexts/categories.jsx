import { useContext , createContext , useState } from "react";
import { getBooksByGenre } from "../APICalls/CategoriesAPICalls";

const CategoriesContext = createContext();

 export const useCategoriesContext = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchBooksByGenre = async (genre) => {
    setSelectedGenre(genre);
    const result = await getBooksByGenre(genre);
    setBooks(result);
  };

  return (
    <CategoriesContext.Provider value={{ selectedGenre, books, fetchBooksByGenre }}>
      {children}
    </CategoriesContext.Provider>
  );
};