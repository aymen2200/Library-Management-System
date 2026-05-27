import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});


export const apiFetchFavorites = async () => {
  const res = await axios.get(`${BASE_URL}/books/fav/getFav`, authHeaders());
  return res.data;
};


export const apiAddToFavorites = async (book) => {
  const res = await axios.post(`${BASE_URL}/books/fav/addFav`, { bookID: book.BookID }, authHeaders());
  return res.data;
};


export const apiRemoveFromFavorites = async (bookID) => {
  const res = await axios.delete(`${BASE_URL}/books/fav/deleteFav/${bookID}`, authHeaders());
  return res.data;
};


export const apiClearFavorites = async () => {
  const res = await axios.delete(`${BASE_URL}/books/fav/clear`, authHeaders());
  return res.data;
};