import axios from "axios";

const API_BASE = "http://localhost:3000/books";

export const getGenres = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/genres`);
    return data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const getBooksByGenre = async (genre) => {
  try {
    const { data } = await axios.get(
      `${API_BASE}/genres/${encodeURIComponent(genre)}`
    );
    return data;
  } catch (error) {
    console.error(`Error fetching books for genre ${genre}:`, error);
    return [];
  }
};

export const getAllBooksFormatted = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}`);
    return data.map((book) => ({
      id: `db-${book.BookID}`,
      dbBookID: book.BookID,
      volumeInfo: {
        title: book.Title,
        authors: book.Authors ? book.Authors.split(", ") : [],
        imageLinks: {
          thumbnail: book.Image || `https://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`,
        },
        publishedDate: book.PublicationDate,
        description: book.AdditionalDetails,
        category: book.Genre,
      },
      available: book.AvailableCopies > 0,
    }));
  } catch (error) {
    console.error("Error fetching all books:", error);
    return [];
  }
};