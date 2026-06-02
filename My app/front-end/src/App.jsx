import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./Contexts/User";
import { BookProvider } from "./Contexts/Favorites";
import Navbar from "./Components/WebsiteComponents/NavbarComponents/NavBar";
import Footer from "./Components/WebsiteComponents/Footer";
import Login from "./Pages/loginPage";
import MainPage from "./Pages/Main";
import AllBooksPage from "./Pages/AllBooksPage";
import FavoritesPage from "./Pages/FavoritesPage"
import MyReadingJourney from "./Pages/MyReadingJourney";
import TermsAndConditions from "./Pages/TermsAndConditions";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ["/auth"].includes(location.pathname);
  const hideFooter = ["/auth"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && (<Navbar />)}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/AllBooks" element={<AllBooksPage />} />
        <Route path="/Favorites" element={<FavoritesPage />} />
        <Route path="/MyReadingJourney" element={<MyReadingJourney />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
      </Routes>
      {!hideFooter && (<Footer />)}
    </>
  );
};

function MyApp() {
  return (
    <BrowserRouter>
      <UserProvider>
        <BookProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <AppContent />
        </BookProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default MyApp;