import axios from "axios";

export const getPopularBooks = async () => {
  const response = await axios.get("http://localhost:3000/books/popular");
  return response.data;
};