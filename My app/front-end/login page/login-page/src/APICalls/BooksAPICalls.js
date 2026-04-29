import axios from "axios";

const API_KEY = "AIzaSyCT43VX3QQ2giWqAPkpKp5hMWvDzTilWU4";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const cover = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const BOOK_POOL = [
  { id: "hp1", volumeInfo: { title: "Harry Potter and the Sorcerer's Stone", authors: ["J.K. Rowling"], imageLinks: { thumbnail: cover("9780439708180") } } },
  { id: "dune", volumeInfo: { title: "Dune", authors: ["Frank Herbert"], imageLinks: { thumbnail: cover("9780441013593") } } },
  { id: "hg", volumeInfo: { title: "The Hunger Games", authors: ["Suzanne Collins"], imageLinks: { thumbnail: cover("9780439023481") } } },
  { id: "alc", volumeInfo: { title: "The Alchemist", authors: ["Paulo Coelho"], imageLinks: { thumbnail: cover("9780062315007") } } },
  { id: "ah", volumeInfo: { title: "Atomic Habits", authors: ["James Clear"], imageLinks: { thumbnail: cover("9780735211292") } } },
  { id: "gg", volumeInfo: { title: "Gone Girl", authors: ["Gillian Flynn"], imageLinks: { thumbnail: cover("9780307588364") } } },
  { id: "it", volumeInfo: { title: "It", authors: ["Stephen King"], imageLinks: { thumbnail: cover("9781501142970") } } },
  { id: "gatsby", volumeInfo: { title: "The Great Gatsby", authors: ["F. Scott Fitzgerald"], imageLinks: { thumbnail: cover("9780743273565") } } },
  { id: "1984", volumeInfo: { title: "1984", authors: ["George Orwell"], imageLinks: { thumbnail: cover("9780451524935") } } },
  { id: "monk", volumeInfo: { title: "The Monk Who Sold His Ferrari", authors: ["Robin Sharma"], imageLinks: { thumbnail: cover("9780062515925") } } },
  { id: "davinci", volumeInfo: { title: "The Da Vinci Code", authors: ["Dan Brown"], imageLinks: { thumbnail: cover("9780307474278") } } },
  { id: "shining", volumeInfo: { title: "The Shining", authors: ["Stephen King"], imageLinks: { thumbnail: cover("9780307743657") } } },
  { id: "sapiens", volumeInfo: { title: "Sapiens", authors: ["Yuval Noah Harari"], imageLinks: { thumbnail: cover("9780062316097") } } },
  { id: "lotr", volumeInfo: { title: "The Lord of the Rings", authors: ["J.R.R. Tolkien"], imageLinks: { thumbnail: cover("9780544003415") } } },
  { id: "af", volumeInfo: { title: "Animal Farm", authors: ["George Orwell"], imageLinks: { thumbnail: cover("9780451526342") } } },
  { id: "bnw", volumeInfo: { title: "Brave New World", authors: ["Aldous Huxley"], imageLinks: { thumbnail: cover("9780060850524") } } },
  { id: "hhg", volumeInfo: { title: "The Hitchhiker's Guide to the Galaxy", authors: ["Douglas Adams"], imageLinks: { thumbnail: cover("9780345391803") } } },
  { id: "f451", volumeInfo: { title: "Fahrenheit 451", authors: ["Ray Bradbury"], imageLinks: { thumbnail: cover("9781451673319") } } },
  { id: "tml", volumeInfo: { title: "The Midnight Library", authors: ["Matt Haig"], imageLinks: { thumbnail: cover("9780525559474") } } },
  { id: "edu", volumeInfo: { title: "Educated", authors: ["Tara Westover"], imageLinks: { thumbnail: cover("9780399590504") } } },
  { id: "think", volumeInfo: { title: "Think and Grow Rich", authors: ["Napoleon Hill"], imageLinks: { thumbnail: cover("9781585424337") } } },
  { id: "eg", volumeInfo: { title: "Ender's Game", authors: ["Orson Scott Card"], imageLinks: { thumbnail: cover("9780812550702") } } },
  { id: "rp1", volumeInfo: { title: "Ready Player One", authors: ["Ernest Cline"], imageLinks: { thumbnail: cover("9780307887436") } } },
  { id: "martian", volumeInfo: { title: "The Martian", authors: ["Andy Weir"], imageLinks: { thumbnail: cover("9780553418026") } } },
  { id: "becoming", volumeInfo: { title: "Becoming", authors: ["Michelle Obama"], imageLinks: { thumbnail: cover("9781524763138") } } },
  { id: "rdpd", volumeInfo: { title: "Rich Dad Poor Dad", authors: ["Robert Kiyosaki"], imageLinks: { thumbnail: cover("9781612680194") } } },
  { id: "subtle", volumeInfo: { title: "The Subtle Art of Not Giving a F*ck", authors: ["Mark Manson"], imageLinks: { thumbnail: cover("9780062457714") } } },
  { id: "outliers", volumeInfo: { title: "Outliers", authors: ["Malcolm Gladwell"], imageLinks: { thumbnail: cover("9780316017930") } } },
  { id: "divergent", volumeInfo: { title: "Divergent", authors: ["Veronica Roth"], imageLinks: { thumbnail: cover("9780062024039") } } },
  { id: "maze", volumeInfo: { title: "The Maze Runner", authors: ["James Dashner"], imageLinks: { thumbnail: cover("9780385737951") } } },
  { id: "twilight", volumeInfo: { title: "Twilight", authors: ["Stephenie Meyer"], imageLinks: { thumbnail: cover("9780316160179") } } },
  { id: "tfios", volumeInfo: { title: "The Fault in Our Stars", authors: ["John Green"], imageLinks: { thumbnail: cover("9780525478812") } } },
  { id: "pp", volumeInfo: { title: "Pride and Prejudice", authors: ["Jane Austen"], imageLinks: { thumbnail: cover("9780141439518") } } },
  { id: "np", volumeInfo: { title: "Normal People", authors: ["Sally Rooney"], imageLinks: { thumbnail: cover("9781984822178") } } },
  { id: "tkog", volumeInfo: { title: "Throne of Glass", authors: ["Sarah J. Maas"], imageLinks: { thumbnail: cover("9781619630345") } } },
];

export const getPopularBooks = async () => {
  const shuffled = [...BOOK_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 8);
};

export const searchBooks = async (query, page = 1, limit = 20) => {
  const startIndex = (page - 1) * limit;
  const { data } = await axios.get(
    `${BASE_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${limit}&key=${API_KEY}`
  );
  return { books: data.items, totalItems: data.totalItems };
};