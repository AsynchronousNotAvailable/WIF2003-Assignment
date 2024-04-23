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
            id: 10,
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
                id: 10,
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

    const [sellerProduct, setSellerProduct] = useState([
        { "Product": "Mahi Mahi", "SKU": "7566753746", "Category": "unavailable", "Stock": 98, "Status": 1, "Added": "2024-04-22" },
        { "Product": "Wine - Fat Bastard Merlot", "SKU": "7465236789", "Category": "Leprocaulinus vipera", "Stock": 6, "Status": 4, "Added": "2024-03-09" },
        { "Product": "Muffin - Mix - Strawberry Rhubarb", "SKU": "9862275863", "Category": "Dusicyon thous", "Stock": 72, "Status": 2, "Added": "2023-05-07" },
        { "Product": "Onions Granulated", "SKU": "8776371727", "Category": "Paroaria gularis", "Stock": 23, "Status": 1, "Added": "2023-06-29" },
        { "Product": "Nantuket Peach Orange", "SKU": "1387566016", "Category": "Phalacrocorax brasilianus", "Stock": 9, "Status": 4, "Added": "2023-12-27" },
        { "Product": "Eggplant - Baby", "SKU": "4203899826", "Category": "Helogale undulata", "Stock": 58, "Status": 2, "Added": "2023-08-03" },
        { "Product": "Muffin - Banana Nut Individual", "SKU": "5295642488", "Category": "Felis chaus", "Stock": 79, "Status": 1, "Added": "2023-05-20" },
        { "Product": "Aspic - Clear", "SKU": "9368753717", "Category": "Stercorarius longicausus", "Stock": 98, "Status": 1, "Added": "2024-03-22" },
        { "Product": "Bread Ww Cluster", "SKU": "7552261986", "Category": "Corvus brachyrhynchos", "Stock": 67, "Status": 2, "Added": "2023-10-07" },
        { "Product": "Lettuce - Romaine, Heart", "SKU": "1654324108", "Category": "Meles meles", "Stock": 72, "Status": 4, "Added": "2024-02-02" },
        { "Product": "Jagermeister", "SKU": "2514724961", "Category": "Colobus guerza", "Stock": 96, "Status": 2, "Added": "2023-12-03" },
        { "Product": "Crackers - Graham", "SKU": "1768464979", "Category": "Dasyurus maculatus", "Stock": 62, "Status": 2, "Added": "2024-04-06" },
        { "Product": "Lemon Balm - Fresh", "SKU": "8825782950", "Category": "Cracticus nigroagularis", "Stock": 26, "Status": 1, "Added": "2023-10-14" },
        { "Product": "Oats Large Flake", "SKU": "3442125855", "Category": "unavailable", "Stock": 49, "Status": 3, "Added": "2023-11-26" },
        { "Product": "Stainless Steel Cleaner Vision", "SKU": "8902767728", "Category": "Tenrec ecaudatus", "Stock": 82, "Status": 4, "Added": "2023-11-07" },
        { "Product": "Muffins - Assorted", "SKU": "0942765796", "Category": "Ursus americanus", "Stock": 51, "Status": 1, "Added": "2023-07-23" },
        { "Product": "Oil - Food, Lacquer Spray", "SKU": "6963346542", "Category": "Merops nubicus", "Stock": 88, "Status": 1, "Added": "2024-03-02" },
        { "Product": "Chocolate - Pistoles, White", "SKU": "4528060213", "Category": "Diomedea irrorata", "Stock": 48, "Status": 1, "Added": "2023-07-24" },
        { "Product": "Barley - Pearl", "SKU": "5213952240", "Category": "Centrocercus urophasianus", "Stock": 57, "Status": 1, "Added": "2023-06-12" },
        { "Product": "Juice - Orange, 341 Ml", "SKU": "3454302854", "Category": "Anas bahamensis", "Stock": 83, "Status": 4, "Added": "2023-11-24" }
    ]);

    const addSellerProduct = (product) => {
        setSellerProduct([...sellerProduct, product]);
    };

    const deleteSellerProduct = (index) => {
        const updatedData = sellerProduct.filter((_,i) => i !== index);
        setSellerProduct(updatedData);
        console.log(sellerProduct);
    }

    const [sellerOrder, setSellerOrder] = useState([
        { "order_id": 1, "product": "Motorola", "date": 1641859200000, "customer": "Merline Docket", "total": 98.07, "payment": "laser", "status": 3 }, 
        { "order_id": 2, "product": "Telit", "date": 1725235200000, "customer": "Birk Iddins", "total": 5.34, "payment": "maestro", "status": 2 }, 
        { "order_id": 3, "product": "Infinix", "date": 1690243200000, "customer": "Glendon Stiegar", "total": 33.64, "payment": "jcb", "status": 4 }, 
        { "order_id": 4, "product": "Spice", "date": 1644278400000, "customer": "Huberto Pessold", "total": 85.66, "payment": "mastercard", "status": 3 }, 
        { "order_id": 5, "product": "Samsung", "date": 1719792000000, "customer": "Meryl Perryn", "total": 91.29, "payment": "jcb", "status": 2 }, 
        { "order_id": 6, "product": "Apple", "date": 1675209600000, "customer": "Diandra Le Gallo", "total": 84.71, "payment": "jcb", "status": 1 }, 
        { "order_id": 7, "product": "Spice", "date": 1705449600000, "customer": "Sheffield Maffucci", "total": 97.99, "payment": "jcb", "status": 3 }, 
        { "order_id": 8, "product": "Micromax", "date": 1661126400000, "customer": "Coral Lightoller", "total": 50.05, "payment": "jcb", "status": 2 }, 
        { "order_id": 9, "product": "Telit", "date": 1708732800000, "customer": "Evelina Lockhead", "total": 90.4, "payment": "instapayment", "status": 1 }, 
        { "order_id": 10, "product": "Panasonic", "date": 1661558400000, "customer": "Lisette Coultard", "total": 49.47, "payment": "jcb", "status": 1 }, 
        { "order_id": 11, "product": "verykool", "date": 1709510400000, "customer": "Kora Alden", "total": 97.55, "payment": "jcb", "status": 2 }, 
        { "order_id": 12, "product": "Icemobile", "date": 1691020800000, "customer": "Adolphe Mallion", "total": 39.19, "payment": "maestro", "status": 4 }, 
        { "order_id": 13, "product": "Motorola", "date": 1663718400000, "customer": "Caralie Ick", "total": 39.21, "payment": "switch", "status": 2 }, 
        { "order_id": 14, "product": "Ulefone", "date": 1669507200000, "customer": "Trevor Wadge", "total": 37.88, "payment": "jcb", "status": 2 }, 
        { "order_id": 15, "product": "Micromax", "date": 1687392000000, "customer": "Yale MacGuffie", "total": 59.07, "payment": "switch", "status": 1 }, 
        { "order_id": 16, "product": "Panasonic", "date": 1661817600000, "customer": "Adiana Seabourne", "total": 46.69, "payment": "visa-electron", "status": 4 }, 
        { "order_id": 17, "product": "Huawei", "date": 1699056000000, "customer": "Aleksandr Masden", "total": 12.54, "payment": "mastercard", "status": 3 }, 
        { "order_id": 18, "product": "Asus", "date": 1709078400000, "customer": "Misti Mc Harg", "total": 67.84, "payment": "bankcard", "status": 4 }, 
        { "order_id": 19, "product": "Nokia", "date": 1664236800000, "customer": "Rosette Crowthe", "total": 56.64, "payment": "visa", "status": 3 }, 
        { "order_id": 20, "product": "Philips", "date": 1689120000000, "customer": "Georgi Cartan", "total": 45.25, "payment": "jcb", "status": 3 }, 
        { "order_id": 21, "product": "alcatel", "date": 1671321600000, "customer": "Emogene Gude", "total": 31.5, "payment": "maestro", "status": 5 },
        { "order_id": 22, "product": "Sewon", "date": 1698710400000, "customer": "Hew Cornwall", "total": 8.41, "payment": "mastercard", "status": 3 },
        { "order_id": 23, "product": "LG", "date": 1706140800000, "customer": "Karlan Andrysek", "total": 53.38, "payment": "jcb", "status": 2 },
        { "order_id": 24, "product": "Coolpad", "date": 1683849600000, "customer": "Saxe Waye", "total": 95.06, "payment": "maestro", "status": 2 },
        { "order_id": 25, "product": "Celkon", "date": 1693353600000, "customer": "Meredith Cheel", "total": 41.84, "payment": "jcb", "status": 4 },
        { "order_id": 26, "product": "Mitsubishi", "date": 1698278400000, "customer": "Joete Musson", "total": 25.37, "payment": "maestro", "status": 3 },
        { "order_id": 27, "product": "Bird", "date": 1703548800000, "customer": "Jemimah Cockling", "total": 66.11, "payment": "switch", "status": 1 },
        { "order_id": 28, "product": "Samsung", "date": 1668988800000, "customer": "Adolphus Cawthery", "total": 37.49, "payment": "jcb", "status": 5 },
        { "order_id": 29, "product": "LG", "date": 1657324800000, "customer": "Lillian Espasa", "total": 73.25, "payment": "jcb", "status": 3 },
        { "order_id": 30, "product": "Gigabyte", "date": 1667088000000, "customer": "Dionisio Ortzen", "total": 92.07, "payment": "mastercard", "status": 3 }
    ])

    const deleteSellerOrder = (index) => {
        const updatedData = sellerOrder.filter((_,i) => i !== index);
        console.log(updatedData);
        setSellerOrder(updatedData);
    }
    
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
                addSellerProduct,
                deleteSellerOrder, 
                deleteSellerProduct,
                sellerOrder,
                sellerProduct,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
