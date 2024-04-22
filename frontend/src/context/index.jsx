import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(0);
    const [productListing, setProductListing] = useState([
        {
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
            seller: "Milo_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
        },
        {
            id: 1,
            name: "Milo 2 in 1",
            price: 10,
            rating: 5,
            img: "/milotwoproduct.jpg",
            seller: "Milo_2_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
        },
        {
            id: 2,
            name: "Horlicks",
            price: 8,
            rating: 3,
            img: "/horlickproduct.jpg",
            seller: "Horlicks_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
        },
        {
            id: 3,
            name: "Builder",
            price: 13,
            rating: 2,
            img: "/builderproduct.png",
            seller: "Builder_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
        },
    ]);

    const [shopsItemListing, setShopItemListing] = useState({
        Milo_Seller: [
            "/seller3.png",
            {
                id: 0,
                name: "Milo 3 in 1",
                price: 13,
                rating: 4,
                img: "/milothreeproduct.jpg",
                seller: "Milo_Seller",
                reviews: [],
                variations: ["Original", "Chocolate", "Vanilla"],

            },
        ],
        Horlicks_Seller: [
            "/seller3.png",
            {
                id: 2,
                name: "Horlicks",
                price: 8,
                rating: 3,
                img: "/horlickproduct.jpg",
                seller: "Horlicks_Seller",
                reviews: [],
                variations: ["Original", "Chocolate", "Vanilla"],

            },
        ],
        Builder_Seller: [
            "/seller4.png",
            {
                id: 3,
                name: "Builder",
                price: 13,
                rating: 2,
                img: "/builderproduct.png",
                seller: "Builder_Seller",
                reviews: [],
                variations: ["Original", "Chocolate", "Vanilla"],
            },
        ],
        Milo_2_Seller: [
            "/seller5.png",
            {
                id: 1,
                name: "Milo 2 in 1",
                price: 10,
                rating: 5,
                img: "/milotwoproduct.jpg",
                seller: "Milo_2_Seller",
                variations: ["Original", "Chocolate", "Vanilla"],
                reviews: [],
            },
        ],
    });
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
                shopsItemListing,
                setShopItemListing,
                totalCheckoutPrice,
                setTotalCheckoutPrice,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
