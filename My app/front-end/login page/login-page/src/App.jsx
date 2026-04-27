import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./Contexts/User";
import { BookProvider } from "./Contexts/Favorites";
import Navbar from "./Components/WebsiteComponents/NavbarComponents/NavBar";
import Login from "./Pages/loginPage";
import MainPage from "./Pages/Main";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ["/auth"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
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