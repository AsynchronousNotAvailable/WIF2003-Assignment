import { createContext, useState } from "react";

export const GlobalContext = createContext(null);
export const CheckoutContext = createContext(null);

function GlobalState({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(0);
    
    // for marketplace
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
            seller: "Milo_Seller",
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
            id: 4,
            name: "Builder",
            price: 13,
            rating: 2,
            img: "/builderproduct.png",
            seller: "Builder_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
        },

        {
            id: 6,
            name: "Nice Notebook",
            price: 13,
            rating: 4,
            img: "/notebook.jpeg",
            seller: "Nice",
            reviews: [],
            variations: ["Brown", "Khaki", "Grey"],
        },

        {
            id: 7,
            name: "Nice Pen",
            price: 13,
            rating: 4,
            img: "/pen.jpeg",
            seller: "Nice",
            reviews: [],
            variations: ["0.38mm", "0.5mm", "0.7mm"],
        },
        {
            id: 8,
            name: "Nice Pencil Case",
            price: 13,
            rating: 4,
            img: "/pencil_case.jpeg",
            seller: "Nice",
            reviews: [],
            variations: ["White", "Brown", "Grey"],
        },
        {
            id: 9,
            name: "Nice Wallet",
            price: 13,
            rating: 4,
            img: "/wallet.jpeg",
            seller: "Nice",
            reviews: [],
            variations: ["Black", "Brown", "White"],
        },
    ]);


    // for each shops
    const [shopsItemListing, setShopItemListing] = useState({
        Nice: [
            "/seller3.png",
            {
                id: 6,
                name: "Nice Notebook",
                price: 13,
                rating: 4,
                img: "/notebook.jpeg",
                seller: "Nice",
                reviews: [],
                variations: ["Brown", "Khaki", "Grey"],
            },
            {
                id: 7,
                name: "Nice Pen",
                price: 13,
                rating: 4,
                img: "/pen.jpeg",
                seller: "Nice",
                reviews: [],
                variations: ["0.38mm", "0.5mm", "0.7mm"],
            },
            {
                id: 8,
                name: "Nice Pencil Case",
                price: 13,
                rating: 4,
                img: "/pencil_case.jpeg",
                seller: "Nice",
                reviews: [],
                variations: ["White", "Brown", "Grey"],
            },
            {
                id: 9,
                name: "Nice Wallet",
                price: 13,
                rating: 4,
                img: "/wallet.jpeg",
                seller: "Nice",
                reviews: [],
                variations: ["Black", "Brown", "White"],
            },
        ],
        Milo_Seller: [
            "/seller4.png",
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
        ],
        Horlicks_Seller: [
            "/seller5.png",
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
            "/seller1.png",
            {
                id: 4,
                name: "Builder",
                price: 13,
                rating: 2,
                img: "/builderproduct.png",
                seller: "Builder_Seller",
                reviews: [],
                variations: ["Original", "Chocolate", "Vanilla"],
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
