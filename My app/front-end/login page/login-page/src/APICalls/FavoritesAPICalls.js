import axios from "axios";

const API_BASE_URL = "https://your-api.com/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const apiFetchFavorites = async (query = "") => {
  const { data } = await api.get("/favorites", {
    params: { query },
  });
  return data; 
};

export const apiAddToFavorites = async (book) => {
  await api.post("/favorites", { bookId: book.id });
};

export const apiRemoveFromFavorites = async (bookId) => {
  await api.delete(`/favorites/${bookId}`);
};

export const apiClearFavorites = async () => {
  await api.delete("/favorites");
};