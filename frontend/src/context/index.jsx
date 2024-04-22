import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [productListing, setProductListing] = useState([
         {
             id: 0,
             name: "Milo 3 in 1",
             price: 13,
             rating: 4,
             img: "/milothreeproduct.jpg",
             seller: "Milo Seller",
             reviews: [],
         },
         {
             id: 1,
             name: "Milo 2 in 1",
             price: 10,
             rating: 5,
             img: "/milotwoproduct.jpg",
             seller: "Milo 2 Seller",
             reviews: [],
         },
         {
             id: 2,
             name: "Horlicks",
             price: 8,
             rating: 3,
             img: "/horlickproduct.jpg",
             seller: "Horlicks Seller",
             reviews: [],
         },
         {
             id: 3,
             name: "Builder",
             price: 13,
             rating: 2,
             img: "/builderproduct.png",
             seller: "Builder Seller",
             reviews: [],
         },
     ]);
    return (
        <GlobalContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isSeller,
                setIsSeller,
                cartItems,
                setCartItems,
                productListing,
                setProductListing,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
