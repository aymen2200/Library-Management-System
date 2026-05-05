import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./Contexts/User";
import { BookProvider } from "./Contexts/Favorites";
import Navbar from "./Components/WebsiteComponents/NavbarComponents/NavBar";
import Footer from "./Components/WebsiteComponents/Footer";
import Login from "./Pages/loginPage";
import MainPage from "./Pages/Main";
import AllBooksPage from "./Pages/AllBooksPage";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ["/auth"].includes(location.pathname);
  const hideFooter = ["/auth"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && ( <Navbar /> )}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/AllBooks" element={<AllBooksPage/>} />
      </Routes>
      {!hideFooter && ( <Footer /> )}
    </>
  );
};

function MyApp() {
  return (
    <UserProvider>
      <BookProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </BookProvider>
    </UserProvider>
  );
}

export default MyApp;