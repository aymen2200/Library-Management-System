import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser({ name: decoded.name, email: decoded.email });
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => setIsAuthenticated(false);

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser({});
    localStorage.removeItem("token");
  }

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const toggle = () => setIsNew(!isNew);

  const UserInfo = (name, email, token) => {
    setCurrentUser({ name, email, id: token })
  }

  return (
    <UserContext.Provider value={{ isAuthenticated, isNew, currentUser, setIsNew, login, logout, toggle, UserInfo }}>
      {children}
    </UserContext.Provider>
  );
};