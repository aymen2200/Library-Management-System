import axios from "axios";

const API_BASE = "http://localhost:3000/books";

export const getBooksByGenre = async (genre) => {
  try {
    const { data } = await axios.get(`${API_BASE}?genre=${encodeURIComponent(genre)}`);
    return data;
  } catch (error) {
    console.error(`Error fetching books for genre ${genre}:`, error);
    return [];
  }
};