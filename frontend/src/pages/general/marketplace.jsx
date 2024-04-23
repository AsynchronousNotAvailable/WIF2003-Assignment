import React, { useContext, useEffect, useState } from "react";
import GlobalState, { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Seller_NavSidebar from "../../components/seller_sidebar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FloatingChat from "../customer/components/FloatingChat";
import FloatingChatList from "../customer/components/FloatingChatList";

function Marketplace() {
    const { shopsItemListing, productListing } = useContext(GlobalContext);
    const options = productListing.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            ...option,
        };
    });

    const [categoryClicked,setCategoryClicked] = useState("")

    const [productCategorySetOne, setProductCategorySO] = useState([
        {
            name: "Books & Stationery",
            img: "/booksIcon.png",
        },
        {
            name: "Babies & Toys",
            img: "/toysIcon.png",
        },
        {
            name: "TV & Home Appliances",
            img: "/tvIcon.png",
        },
        {
            name: "Home & Lifestyle",
            img: "/homeIcon.png",
        },
        {
            name: "Groceries",
            img: "/groceryIcon.png",
        },
    ]);

    const [productCategorySetTwo, setProductCategoryST] = useState([
        {
            name: "Electronic Accessories",
            img: "/electronicAcc.png",
        },
        {
            name: "Electronics Devices",
            img: "/electronicDev.png",
        },
        {
            name: "Women's Fashion",
            img: "/womenFashion.png",
        },
        {
            name: "Men's Fashion",
            img: "/menFashion.png",
        },
        {
            name: "Health & Supplements",
            img: "/healthIcon.png",
        },
    ]);

    const [recommendProduct, setRecommendProduct] = useState([
        {
            id: 6,
            name: "Notebook",
            price: 13,
            rating: 4,
            img: "/notebook.png",
            seller: "Koperasi_UM",
            reviews: [],
            variations: ["Brown", "Khaki", "Grey"],
        },
        {
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            seller: "Koperasi_UM",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
            img: "/milothreeproduct.jpg",
        },
        {
            id: 4,
            name: "Iced Coffee",
            price: 13,
            rating: 2,
            img: "/zero_latte.png",
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
    ]);
    const [userSearchInput, setUserSearchInput] = useState("");
    const [displayedProducts, setDisplayedProducts] = useState([]);

    const handleSearchChange = (event) => {
        if (event.target.innerText) {
            if (event.target.innerText === "") {
                setDisplayedProducts(productListing);
            } else {
                console.log("innerText");
                const userInput = event.target.innerText.toLowerCase();
                setUserSearchInput(userInput);
                const matchedProducts = productListing.filter((product) =>
                    product.name.toLowerCase().includes(userInput)
                );
                setDisplayedProducts(matchedProducts);
            }
        } else {
            if (event.target.value === "") {
                setDisplayedProducts(productListing);
            } else {
                console.log("target value");
                const userInput = event.target.value.toLowerCase();
                setUserSearchInput(userInput);
                const matchedProducts = productListing.filter((product) =>
                    product.name.toLowerCase().includes(userInput)
                );
                setDisplayedProducts(matchedProducts);
            }
        }
    };

    const navigation = useNavigate();
    
    const onSearchButtonClick = () => {
        navigation(`/customer/products`, { state: { displayedProducts } });
    };

    const onCategoryClicked = (e) => {
        console.log(e)
        setCategoryClicked(e)
        navigation(`/customer/products`, {
            state : {
                displayedProducts : displayedProducts,
                categoryClicked : e
            }
        })
    }
        // handleSortingChange(e)
        // if (e === "Books & Stationery"){
        //     const sortedProducts = productListing.filter((product) => product.category === "Books & Stationery")
        //     console.log(sortedProducts)
        //     setDisplayedProducts(sortedProducts)
        // }
        // console.log(displayedProducts)
        // navigation(`/customer/products`, {state : {displayedProducts}})
        // setCategoryClicked(e)
        // handleSortingChange(e)
        // navigation(`/customer/products`, {state : {displayedProducts}})
    

    // const handleSortingChange = (e) => {
    //     console.log("E from handleSortingChange : " + e)
    //     if (e === "Books & Stationery"){
    //         const sortedProducts = productListing.filter((product) => product.category === "Books & Stationery")
    //         console.log(sortedProducts)
    //         setDisplayedProducts(sortedProducts)
    //     }
    //     navigation(`/customer/products`, {state : {displayedProducts}})

    // }



        //  if (e === "Books & Stationery"){
        //     const sortedProducts = displayedProducts.filter((product) => product.category === "Books & Stationery")
        //     console.log("argument passed : " + e)
        //     console.log("products to be displayed : " + sortedProducts)
        //     setDisplayedProducts(sortedProducts)
        //     navigation(`/customer/products`, {state : {displayedProducts}})
        // }
        // else if (e === "Food & Beverage"){
        //     const sortedProducts = displayedProducts.filter((product) => product.category === "Food & Beverage")
        //     console.log("argument passed : " + e)
        //     console.log("products to be displayed : " + sortedProducts)
        //     setDisplayedProducts(sortedProducts)
        //     navigation(`/customer/products`, {state : {displayedProducts}})
        // }
       
        // else{
        //     console.log(typeof e)
        //     console.log(e)
        //     console.log(productListing)
        //     alert("Choice of Category is not available.")
        // }
    

    const navigateToShop = (seller) => {
        navigation(`/customer/shop/${seller}`, {
            state: { seller: seller },
        });
    };

    const navigateToProductDetails = (productId) => {
        const product = productListing.find((p) => p.id === productId);

        navigation(`/customer/product/${productId}`, {
            state: { product },
        });
    };

    const [floating, setFloating] = useState(false);
    const toggleFloatingChat = () => {
        setFloating(!floating);
    };
    const [activeChat, setActiveChat] = useState("");
    const [activeChatContent, setActiveChatContent] = useState([]);
    const handleChatButtonClick = () => {
        // navigation("/customer/chat");
        toggleFloatingChat();
    };
    const { orderHistory } = useContext(GlobalContext);
    

    const fetchChatListFromOrders = () => {
        let chatLists = [];
        orderHistory.map((order) => {
            const chatHeader = {
                active: false,
                name: order.orderItems[0].seller,
                pfp:
                    order.orderItems[0].seller === "Koperasi_UM"
                        ? "/seller3.png"
                        : order.orderItems[0].seller === "KK_Mart_UM"
                        ? "/seller4.png"
                        : order.orderItems[0].seller === "Zus_Coffee_UM"
                                ? "/seller5.png"
                        : "/seller1.png",
                last_message:
                    order.orderItems[0].seller === "Koperasi_UM"
                        ? "How much is the battery charger?"
                        : order.orderItems[0].seller === "KK_Mart_UM"
                        ? "I see alright."
                        : "Will the product be delivered today?",
            };
            chatLists.push(chatHeader);
        });
        setChatList(chatLists);
    };

    useEffect(() => {
        fetchChatListFromOrders();
    }, [])

    
    const [chatList, setChatList] = useState([
        {
            active: true,
            pfp: "/seller3.png",
            name: "Koperasi_UM",
            last_message: "How much is the battery charger?",
        },
        {
            active: false,
            pfp: "/seller4.png",
            name: "KK_Mart_UM",
            last_message: "I see alright.",
        },
        {
            active: false,
            pfp: "/seller1.png",
            name: "UM_Sports_Direct",
            last_message: "Will the product be delivered today?",
        },
        {
            active: false,
            pfp: "/seller5.png",
            name: "Zus_Coffee_UM",
            last_message: "Will the product be delivered today?",
        },
    ]);

    const [chatName, setChatName] = useState("");
    const handleChatClick = (name) => {
        setChatName(name);
        if (name === "Koperasi_UM") {
            setActiveChatContent([
                {
                    type: "SELLER",
                    text: "Hello! I am Wen Thing from Koperasi UM. How may I assist you today?",
                },
            ]);
        } else if (name === "KK_Mart_UM") {
            setActiveChatContent([
                {
                    type: "SELLER",
                    text: "Hello! I am Kar Weng from KK Mart UM. It is my pleasure to help you. How may I assist you today?",
                },
            ]);
        } else if (name === "UM_Sports_Direct") {
            setActiveChatContent([
                {
                    type: "SELLER",
                    text: "Hello! I am Wen Thing from Koperasi UM. It is my pleasure to help you. How may I assist you today?",
                },
            ]);
        } else if (name === "Zus_Coffee_UM") {
            setActiveChatContent([
                {
                    type: "SELLER",
                    text: "Hello! I am Weng Hong from Zus. It is my pleasure to help you. How may I assist you today?",
                },
            ]);
        }
    };

    const goBackToChatList = () => {
        setChatName("");
    };

    return (
        <>
            <Customer_Navbar />
            <main className="mt-24 flex flex-col">
                <section className="flex flex-row w-full gap-2 mb-10 justify-center">
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        sx={{ width: 600 }}
                        onChange={(event, newValue) => {
                            console.log(newValue);
                        }}
                        inputValue={userSearchInput}
                        defaultValue={""}
                        value={userSearchInput}
                        onInputChange={(newInputValue) =>
                            handleSearchChange(newInputValue)
                        }
                        options={productListing.map((option) => option.name)}
                        renderInput={(params) => (
                            <TextField {...params} label="Search" />
                        )}
                    />

                    <button
                        onClick={onSearchButtonClick}
                        className="bg-[white] rounded-full shadow-3xl hover:bg-[#45b9dc] px-4 py-2"
                    >
                        <i
                            class="fa fa-search text-black "
                            aria-hidden="true"
                        ></i>
                    </button>
                </section>
                <section className="flex flex-row justify-center px-12 ">
                    <img
                        className=" object-cover rounded-3xl shadow-2xl"
                        src="/setelbanner.png"
                    />
                </section>
                <section className="flex flex-col px-16 py-10">
                    <p className="text-3xl items-start my-10 font-sans font-semibold ">
                        Category
                    </p>

                    <section className="flex flex-col gap-10  justify-center items-center">
                        <section className="flex flex-row gap-20 py-10">
                            {productCategorySetOne.map((product) => {
                                return (
                                    <section className="flex flex-col gap-10 rounded-xl shadow-2xl w-48 h-72 px-5 py-5 justify-center items-center"
                                    onClick={() => onCategoryClicked(product.name)}
                                    >
                                        <img
                                            src={product.img}
                                            className="border-gray-300 border-2 w-[110px] h-[110px] rounded-full object-right"
                                        />
                                        <p className="">{product.name}</p>
                                    </section>
                                );
                            })}
                        </section>
                        <section className="flex flex-row">
                            <section className="flex flex-row">
                                {productCategorySetTwo.map((product) => {
                                    return (
                                        <section className="flex flex-col  w-[175px] h-[218px] justify-center items-center">
                                            <img
                                                src={product.img}
                                                className="border-gray-500 border-2 w-[110px] h-[110px] rounded-full object-contain"
                                            />
                                            <p>{product.name}</p>
                                        </section>
                                    );
                                })}
                            </section>
                        </section>
                    </section>
                </section>

                <section className="flex flex-col px-16 py-10">
                    <p className="text-3xl items-start my-10 font-sans font-semibold ">
                        Meet Syopi Top Sellers
                    </p>

                    <section className="flex flex-col justify-center items-center ">
                        <section className="flex flex-row gap-10 ">
                            {Object.keys(shopsItemListing).map((sellers) => {
                                return (
                                    <section
                                        className="flex flex-col justify-center w-64 h-92 rounded-xl shadow-2xl px-10 py-10 items-center hover:bg-slate-100"
                                        onClick={() => navigateToShop(sellers)}
                                    >
                                        <img
                                            src={shopsItemListing[sellers][0]}
                                            className="border-gray-500 border-2 w-[110px] h-[110px] rounded-full shadow-2xl object-contain mb-5"
                                        />
                                        <p className="font-sans font-light text-xl">
                                            {sellers}
                                        </p>
                                    </section>
                                );
                            })}
                        </section>
                    </section>
                </section>

                <section className="flex flex-col px-16 py-10">
                    <p className="text-3xl items-start my-10 font-sans font-semibold ">
                        Just For You
                    </p>
                    <section className="flex flex-row  gap-20 justify-center">
                        {recommendProduct.map((product) => {
                            return (
                                <section
                                    onClick={() =>
                                        navigateToProductDetails(product.id)
                                    }
                                    key={product.id}
                                    className="flex flex-col justify-center w-64 h-92 rounded-xl shadow-2xl px-10 py-10 hover:bg-slate-100"
                                >
                                    <img
                                        src={product.img}
                                        className="h-full object-cover object-center "
                                        alt={product.name}
                                    />

                                    <p className="font-sans font-semibold text-lg">
                                        {product.name}
                                    </p>
                                    <p className="font-sans">
                                        <span className="inline-block border text-[#FF6869] text-[12px] border-orange-500 rounded px-1">
                                            Selling Fast
                                        </span>
                                    </p>
                                    <p className="font-sans text-[#7450DF]">
                                        RM{product.price}
                                    </p>
                                    <p>{product.rating} stars</p>
                                </section>
                            );
                        })}
                    </section>
                </section>
                <button
                    className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600"
                    onClick={handleChatButtonClick}
                >
                    <i className="fa fa-comment"></i>
                </button>
                {/* {floating && <FloatingChat activeChat={activeChat}  activeChatContent={activeChatContent}/>} */}
                {floating && (
                    <FloatingChatList
                        chatList={chatList}
                        handleChatClick={handleChatClick}
                    />
                )}
                {chatName !== "" && (
                    <FloatingChat
                        activeChat={chatName}
                        activeChatContent={activeChatContent}
                        goBackToChatList={goBackToChatList}
                    />
                )}
            </main>
        </>
    );
}
export default Marketplace;
