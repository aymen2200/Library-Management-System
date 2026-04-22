import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({children}) => {
    const [isNew , setIsNew] = useState(true);

    const toggle = () => setIsNew(!isNew);

    return (
        <LoginContext.Provider value={{isNew , setIsNew , toggle}}>
            {children}
        </LoginContext.Provider>
    );
};