import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { apiFetchFavorites, apiAddToFavorites, apiRemoveFromFavorites, apiClearFavorites } from "../APICalls/FavoritesAPICalls";
import { toast } from "react-toastify";
import { useUserContext } from "./User";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated } = useUserContext();


    useEffect(() => {
        const loadFavorites = async () => {
            setIsLoading(true);
            try {
                const result = await apiFetchFavorites();
                setFavorites(result);
                setTotalItems(result.length);
            } catch (err) {
                toast.error("Failed to load favorites.");
            } finally {
                setIsLoading(false);
            }
        };

        isAuthenticated && loadFavorites();
    }, [isAuthenticated]);

    const addToFavorites = async (book) => {
        setFavorites((prev) => [...prev, book]);
        setTotalItems((prev) => prev + 1);
        try {
            await apiAddToFavorites(book);
        } catch (err) {
            setFavorites((prev) => prev.filter((b) => b.BookID !== book.BookID));
            setTotalItems((prev) => prev - 1);
            toast.error("Failed to add to favorites.");
        }
    };

    const removeFromFavorites = async (bookId) => {
        const previous = favorites;
        setFavorites((prev) => prev.filter((b) => b.BookID !== bookId));
        setTotalItems((prev) => prev - 1);
        try {
            await apiRemoveFromFavorites(bookId);
        } catch (err) {
            setFavorites(previous);
            setTotalItems((prev) => prev + 1);
            toast.error("Failed to remove from favorites.");
        }
    };

    const isFavorite = (bookId) => {
        return favorites.some((book) => book.BookID === bookId);
    };

    const clearFavorites = async () => {
        try {
            await apiClearFavorites();
            setFavorites([]);
            setTotalItems(0);
        } catch (err) {
            toast.error("Failed to clear favorites.");
        }
    };

    const value = {
        favorites,
        totalItems,
        isLoading,
        loadFavorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
    };

    return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export default BookProvider;