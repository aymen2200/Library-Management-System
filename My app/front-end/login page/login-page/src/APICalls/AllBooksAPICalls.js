import axios from "axios";

export const getPopularBooks = async () => {
  const response = await axios.get("http://localhost:3000/books/popular");
  return response.data;
};

export const getAllBooks = async () => {
  const res = await axios.get(`http://localhost:3000/books`);
  return res.data;
};

export const searchBooks = (query, booksArray) => {
  if (!query.trim()) return booksArray;
  const q = query.toLowerCase();
  return booksArray.filter(book =>
    book.Title?.toLowerCase().includes(q) ||
    book.Authors?.toLowerCase().includes(q)
  );
};

export const getBook = async (id) => {
  const res = await axios.get(`http://localhost:3000/books/${id}`);
  return res.data;
};