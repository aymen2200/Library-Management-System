import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNew , setIsNew] = useState();
  const [currentUser , setCurrentUser] = useState({});

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const toggle = () => setIsNew(!isNew);

  const UserInfo = (name , email ,token) => {
    setCurrentUser({ name, email, id: token })
  }

  return (
    <UserContext.Provider value={{ isAuthenticated, isNew , currentUser ,  setIsNew , login , logout , toggle , UserInfo}}>
      {children}
    </UserContext.Provider>
  );
};