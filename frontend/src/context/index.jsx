import { createContext, useState } from "react";

export const GlobalContext = createContext(null);
export const CheckoutContext = createContext(null);

function GlobalState({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(0);
    const [userDetails, setUserDetails] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({});
    const [cardDetails, setCardDetails] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    const addCardDetails = (details) => {
        setCardDetails([...cardDetails, details]);
    };

    const addOrders = (items, price, paymentMethod, shippingAddress) => {
        const order = {
            orderId: Math.random().toString(36).substring(2, 10),
            orderItems: items,
            orderPrice: price,
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress,
            status: "Order placed.",
            timestamp: Date.now(),
        };
        setOrderHistory([...orderHistory, order]);
        setCartItems([]);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrderHistory((prevOrders) => {
            return prevOrders.map((order) => {
                if (order.orderId === orderId) {
                    return { ...order, status: newStatus };
                }
                return order;
            });
        });
    };

    // for marketplace
    const [productListing, setProductListing] = useState([
        {
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
            seller: "KK_Mart_UM",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
            category: "Food & Beverage",
            description:
                "Milo (/ˈmaɪloʊ/ MY-loh; stylised as MILO) is a chocolate-flavoured malted powder product produced by Nestlé, typically mixed with milk, hot water, or both, to produce a beverage.",
        },
        {
            id: 1,
            name: "Milo 2 in 1",
            price: 10,
            rating: 5,
            img: "/milotwoproduct.jpg",
            seller: "KK_Mart_UM",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
            category: "Food & Beverage",
            description:
                "Milo (/ˈmaɪloʊ/ MY-loh; stylised as MILO) is a chocolate-flavoured malted powder product produced by Nestlé, typically mixed with milk, hot water, or both, to produce a beverage.",
        },
        {
            id: 2,
            name: "Horlicks",
            price: 8,
            rating: 3,
            img: "/horlickproduct.jpg",
            seller: "Koperasi_UM",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
            category: "Food & Beverage",
            description:
                "Horlicks is a delicious drink made from milk, wheat and malt. Fortified with 19 vital nutrients which includes Zinc, Calcium, Iron, vitamins and minerals that provides essential nutrition to help in children's growth and development!",
        },
        {
            id: 4,
            name: "Iced Coffee",
            price: 13,
            rating: 2,
            img: "/zero_latte.png",
            seller: "Zus_Coffee_UM",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
            category: "Food & Beverage",
            description: "This is Iced Coffee",
        },

        {
            id: 6,
            name: "Koperasi_UM Notebook",
            price: 13,
            rating: 4,
            img: "/notebook.jpeg",
            seller: "Koperasi_UM",
            reviews: [],
            variations: ["Brown", "Khaki", "Grey"],
            category: "Books & Stationery",
            description:
                "A book or binder of blank, often ruled, pages on which to write, especially one used by students to take notes in class. a book in which promissory notes are entered, registered, recorded, etc",
        },

        {
            id: 7,
            name: "Koperasi_UM Pen",
            price: 13,
            rating: 4,
            img: "/pen.jpeg",
            seller: "Koperasi_UM",
            reviews: [],
            variations: ["0.38mm", "0.5mm", "0.7mm"],
            category: "Books & Stationery",
            description:
                "A universal tool used for writing on paper. A pen has a plastic body called a barrel, a tip, an ink reservoir or chamber, and a cap. Different colours of ink can be used in a pen to write. A significant phrase related to it is “Pen is mightier than the sword”.",
        },
        {
            id: 8,
            name: "Koperasi_UM Pencil Case",
            price: 13,
            rating: 4,
            img: "/pencil_case.jpeg",
            seller: "Koperasi_UM",
            reviews: [],
            variations: ["White", "Brown", "Grey"],
            category: "Books & Stationery",
            description:
                "A pencil case or pencil box is a container used to store pencils. A pencil case can also contain a variety of other stationery such as sharpeners, pens, glue sticks, erasers, scissors, and rulers.",
        },
        {
            id: 9,
            name: "Wallet",
            price: 13,
            rating: 4,
            img: "/wallet.jpeg",
            seller: "Koperasi_UM",
            reviews: [],
            variations: ["Black", "Brown", "White"],
            category: "Men's Fashion",
            description:
                "A wallet is a flat case or pouch, often used to carry small personal items such as physical currency, debit cards, and credit cards; identification documents such as driving licence, identification card, club card; photographs, transit pass, business cards and other paper or laminated cards.",
        },
        {
            id: 11,
            name: "Man United Jersey",
            price: 13,
            rating: 4,
            img: "/jersey.jpg",
            seller: "Koperasi_UM",
            reviews: [],
            variations: ["Black", "Red", "White"],
            category: "Men's Fashion",
            description: "This is A Jersey",
        },
        {
            id: 11,
            name: "CEO Latte",
            price: 13,
            rating: 4,
            img: "/ceo_latte.png",
            seller: "Zus_Coffee_UM",
            reviews: [],
            variations: ["Black", "Red", "White"],
            category: "Food & Beverage",
            description: "This is CEO Latte",
        },
    ]);

    // for each shops
    const [shopsItemListing, setShopItemListing] = useState({
        Koperasi_UM: [
            "/seller3.png",
            {
                id: 6,
                name: "Notebook",
                price: 13,
                rating: 4,
                img: "/notebook.jpeg",
                seller: "Koperasi_UM",
                reviews: [],
                variations: ["Brown", "Khaki", "Grey"],
                category: "Books & Stationery",
                description:
                    "A book or binder of blank, often ruled, pages on which to write, especially one used by students to take notes in class. a book in which promissory notes are entered, registered, recorded, etc",
            },
            {
                id: 7,
                name: "Pen",
                price: 13,
                rating: 4,
                img: "/pen.jpeg",
                seller: "Koperasi_UM",
                reviews: [],
                variations: ["0.38mm", "0.5mm", "0.7mm"],
                category: "Books & Stationery",
                description:
                    "A universal tool used for writing on paper. A pen has a plastic body called a barrel, a tip, an ink reservoir or chamber, and a cap. Different colours of ink can be used in a pen to write. A significant phrase related to it is “Pen is mightier than the sword”.",
            },
            {
                id: 8,
                name: "Pencil Case",
                price: 13,
                rating: 4,
                img: "/pencil_case.jpeg",
                seller: "Koperasi_UM",
                reviews: [],
                variations: ["White", "Brown", "Grey"],
                category: "Books & Stationery",
                description:
                    "A pencil case or pencil box is a container used to store pencils. A pencil case can also contain a variety of other stationery such as sharpeners, pens, glue sticks, erasers, scissors, and rulers.",
            },
            {
                id: 9,
                name: "Wallet",
                price: 13,
                rating: 4,
                img: "/wallet.jpeg",
                seller: "Koperasi_UM",
                reviews: [],
                variations: ["Black", "Brown", "White"],
                category: "Men's Fashion",
                description:
                    "A wallet is a flat case or pouch, often used to carry small personal items such as physical currency, debit cards, and credit cards; identification documents such as driving licence, identification card, club card; photographs, transit pass, business cards and other paper or laminated cards.",
            },
        ],
        KK_Mart_UM: [
            "/seller4.png",
            {
                id: 0,
                name: "Milo 3 in 1",
                price: 13,
                rating: 4,
                img: "/milothreeproduct.jpg",
                seller: "KK_Mart_UM",
                reviews: [],
                variations: ["Original", "Chocolate", "Vanilla"],
                category: "Food & Beverage",
                description:
                    "Milo (/ˈmaɪloʊ/ MY-loh; stylised as MILO) is a chocolate-flavoured malted powder product produced by Nestlé, typically mixed with milk, hot water, or both, to produce a beverage.",
            },
            {
                id: 1,
                name: "Milo 2 in 1",
                price: 10,
                rating: 5,
                img: "/milotwoproduct.jpg",
                seller: "KK_Mart_UM",
                reviews: [],
                variations: ["Original", "Chocolate", "Vanilla"],
                category: "Food & Beverage",
                description:
                    "Milo (/ˈmaɪloʊ/ MY-loh; stylised as MILO) is a chocolate-flavoured malted powder product produced by Nestlé, typically mixed with milk, hot water, or both, to produce a beverage.",
            },
            {
                id: 2,
                name: "Horlicks",
                price: 8,
                rating: 3,
                img: "/horlickproduct.jpg",
                seller: "Koperasi_UM",
                reviews: [],
                variations: ["Original", "Chocolate", "Vanilla"],
                category: "Food & Beverage",
                description:
                    "Horlicks is a delicious drink made from milk, wheat and malt. Fortified with 19 vital nutrients which includes Zinc, Calcium, Iron, vitamins and minerals that provides essential nutrition to help in children's growth and development!",
            },
        ],
        Zus_Coffee_UM: [
            "/seller5.png",
            {
                id: 10,
                name: "Iced Coffee",
                price: 13,
                rating: 2,
                img: "/zero_latte.png",
                seller: "Zus_Coffee_UM",
                reviews: [],
                variations: ["Original", "Chocolate", "Vanilla"],
                category: "Food & Beverage",
                description: "This is Iced Coffee",
            },
            {
                id: 11,
                name: "CEO Latte",
                price: 13,
                rating: 4,
                img: "/ceo_latte.png",
                seller: "Zus_Coffee_UM",
                reviews: [],
                variations: ["Black", "Red", "White"],
                category: "Food & Beverage",
                description: "This is CEO Latte",
            },
        ],
        UM_Sports_Direct: [
            "/seller1.png",

            {
                id: 11,
                name: "Man United Jersey",
                price: 13,
                rating: 4,
                img: "/jersey.jpg",
                seller: "UM_Sports_Direct",
                reviews: [],
                variations: ["Black", "Red", "White"],
                category: "Men's Fashion",
                description: "This is A Jersey",
            },
            {
                id: 12,
                name: "Man United Jersey",
                price: 500,
                rating: 4,
                img: "/ultraboost.jpg",
                seller: "UM_Sports_Direct",
                reviews: [],
                variations: ["Black", "Red", "White"],
                category: "Men's Fashion",
                description: "This is Ultraboost",
            },
        ],
    });

    return (
        <GlobalContext.Provider
            value={{
                userDetails,
                setUserDetails,
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
                shippingAddress,
                setShippingAddress,
                addCardDetails,
                cardDetails,
                addOrders,
                orderHistory,
                updateOrderStatus,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
