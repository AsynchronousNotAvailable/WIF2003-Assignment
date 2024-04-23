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
            orderId: Math.random().toString(36).substring(2,10),
            orderItems: items,
            orderPrice: price,
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress,
            status: "Order placed.",
            timestamp: Date.now()
        }
        setOrderHistory([...orderHistory, order])
        setCartItems([])
    }

    const updateOrderStatus = (orderId, newStatus) => {
        setOrderHistory(prevOrders => {
          return prevOrders.map(order => {
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
            seller: "Milo_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
            category : "Food & Beverage",
            description : "Milo (/ˈmaɪloʊ/ MY-loh; stylised as MILO) is a chocolate-flavoured malted powder product produced by Nestlé, typically mixed with milk, hot water, or both, to produce a beverage.",
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
            category : "Food & Beverage",
            description : "Milo (/ˈmaɪloʊ/ MY-loh; stylised as MILO) is a chocolate-flavoured malted powder product produced by Nestlé, typically mixed with milk, hot water, or both, to produce a beverage."
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
            category : "Food & Beverage",
            description : "Horlicks is a delicious drink made from milk, wheat and malt. Fortified with 19 vital nutrients which includes Zinc, Calcium, Iron, vitamins and minerals that provides essential nutrition to help in children's growth and development!"
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
            category : "Home & Lifestyle",
            description : "Builders are the workers that live inside the Builder's Hut. They can upgrade and build structures, as well as upgrade your Heroes. They can also craft Capital Gold in the forge. You do not need a Builder to add decorations or traps, but you need a Builder to upgrade Walls."
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
            category : "Books & Stationery",
            description : "a book or binder of blank, often ruled, pages on which to write, especially one used by students to take notes in class. a book in which promissory notes are entered, registered, recorded, etc"
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
            category : "Books & Stationery",
            description : "A universal tool used for writing on paper. A pen has a plastic body called a barrel, a tip, an ink reservoir or chamber, and a cap. Different colours of ink can be used in a pen to write. A significant phrase related to it is “Pen is mightier than the sword”."
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
            category : "Books & Stationery",
            description : "A pencil case or pencil box is a container used to store pencils. A pencil case can also contain a variety of other stationery such as sharpeners, pens, glue sticks, erasers, scissors, and rulers."
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
            category : "Men's Fashion",
            description : "A wallet is a flat case or pouch, often used to carry small personal items such as physical currency, debit cards, and credit cards; identification documents such as driving licence, identification card, club card; photographs, transit pass, business cards and other paper or laminated cards."
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
                category : "Books & Stationery",
                description : "a book or binder of blank, often ruled, pages on which to write, especially one used by students to take notes in class. a book in which promissory notes are entered, registered, recorded, etc"
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
                category : "Books & Stationery",
                description : "A universal tool used for writing on paper. A pen has a plastic body called a barrel, a tip, an ink reservoir or chamber, and a cap. Different colours of ink can be used in a pen to write. A significant phrase related to it is “Pen is mightier than the sword”."
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
                category : "Books & Stationery",
                description : "A pencil case or pencil box is a container used to store pencils. A pencil case can also contain a variety of other stationery such as sharpeners, pens, glue sticks, erasers, scissors, and rulers."
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
                category : "Men's Fashion",
                description : "A wallet is a flat case or pouch, often used to carry small personal items such as physical currency, debit cards, and credit cards; identification documents such as driving licence, identification card, club card; photographs, transit pass, business cards and other paper or laminated cards."
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
                category : "Food & Beverage",
                description : "Milo (/ˈmaɪloʊ/ MY-loh; stylised as MILO) is a chocolate-flavoured malted powder product produced by Nestlé, typically mixed with milk, hot water, or both, to produce a beverage.",
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
                category : "Food & Beverage",
                description : "Milo (/ˈmaɪloʊ/ MY-loh; stylised as MILO) is a chocolate-flavoured malted powder product produced by Nestlé, typically mixed with milk, hot water, or both, to produce a beverage.",
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
                category : "Food & Beverage",
                description : "Horlicks is a delicious drink made from milk, wheat and malt. Fortified with 19 vital nutrients which includes Zinc, Calcium, Iron, vitamins and minerals that provides essential nutrition to help in children's growth and development!"
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
                category : "Home & Lifestyle",
                description : "Builders are the workers that live inside the Builder's Hut. They can upgrade and build structures, as well as upgrade your Heroes. They can also craft Capital Gold in the forge. You do not need a Builder to add decorations or traps, but you need a Builder to upgrade Walls."
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
                updateOrderStatus
            }}
        >
                {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
