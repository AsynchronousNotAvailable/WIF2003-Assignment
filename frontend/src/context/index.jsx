import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    return (
        <GlobalContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isSeller,
                setIsSeller,
                cartItems,
                setCartItems
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
