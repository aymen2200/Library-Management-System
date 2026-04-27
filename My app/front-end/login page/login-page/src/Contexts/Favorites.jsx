import { createContext, useState, useContext, useEffect } from "react"

const BookContext = createContext()

export const useBookContext = () => useContext(BookContext)

export const BookProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (Book) => {
        setFavorites(prev => [...prev, Book])
    }

    const removeFromFavorites = (BookId) => {
        setFavorites(prev => prev.filter(Book => Book.id !== BookId))
    }

    const isFavorite = (BookId) => {
        return favorites.some(Book => Book.id === BookId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return<BookContext.Provider value={value}>
        {children}
    </BookContext.Provider>
}

export default BookProvider;