import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FloatingChat from "../customer/components/FloatingChat";
import FloatingChatList from "../customer/components/FloatingChatList";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "axios";
import Carousel from "react-multi-carousel";
import Category from "../../components/marketplace/category";
import "react-multi-carousel/lib/styles.css";
import Seller from "../../components/marketplace/seller";
function Marketplace() {
    const { productListing } =
        useContext(GlobalContext);

    const [categoryList, setCategoryList] = useState([]);
    const [sellerList, setSellerList] = useState([]);
    const navigation = useNavigate();
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 5,
            slidesToSlide: 2,
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    useEffect(() => {
        fetchProducts();
        fetchSellers();
    }, []);

    const onCategoryClicked = (e) => {
    

        setCategoryClicked(e);
        navigation(`/customer/products/${e}`, {
            state: {
                displayedProducts: displayedProducts,
                categoryClicked: e,
            },
        });
    };

    const navigateToShop = (sellerId) => {
        navigation(`/customer/shop/${sellerId}`, {
            state: { sellerId: sellerId },
        });
    };

    const category = categoryList.map((item) => (
        <Category
            category={item.category}
            url={item.url}
            onCategoryClicked={onCategoryClicked}
        />
    ));

    const mapCategoryImage = (category) => {
        switch (category) {
            case "Food":
                return "https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

            case "Clothing":
                return "https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=2134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

            case "Stationery":
                return "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

            case "Health":
                return "https://images.unsplash.com/photo-1717457779569-a22db519853a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

            case "Electronics":
                return "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=3001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:1234/api/products/marketplace`
            );
            const products = response.data;

            setRecommendProduct(products.slice(0, 4));
            const tempCategory = [];
            products.forEach((product) => {
                if (
                    tempCategory.filter((p) => p.category === product.category)
                        .length === 0
                ) {
                    let category = product.category;
                    const newCategory = {
                        category: category,
                        url: mapCategoryImage(category),
                    };
                    tempCategory.push(newCategory);
                }
            });
            setCategoryList(tempCategory);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSellers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:1234/api/sellers/getAll"
            );
            const sellers = response.data.sellers;

            const tempSeller = [];
            sellers.forEach((seller) => {
                let name = seller.username;

                const newSeller = {
                    _id: seller._id,
                    name: name,
                    pfp: seller.pfp,
                };

                tempSeller.push(newSeller);
            });
        
            setSellerList(tempSeller);
        } catch (error) {
            console.log(error);
        }
    };

    const [categoryClicked, setCategoryClicked] = useState("");

    const [recommendProduct, setRecommendProduct] = useState([]);
    const [userSearchInput, setUserSearchInput] = useState("");
    const [displayedProducts, setDisplayedProducts] = useState([]);

    const handleSearchChange = (event) => {
        if (event.target.innerText) {
            if (event.target.innerText === "") {
                setDisplayedProducts(productListing);
            } else {
                
                const userInput = event.target.innerText.toLowerCase();
                setUserSearchInput(userInput);
                const matchedProducts = productListing.filter((product) =>
                    product.name.toLowerCase().includes(userInput)
                );
                setDisplayedProducts(matchedProducts);
            }
        } else if (event.target.value) {
            if (event.target.value === "") {
                setDisplayedProducts(productListing);
            } else {
       
                const userInput = event.target.value.toLowerCase();
             
                setUserSearchInput(userInput);
                const matchedProducts = productListing.filter((product) =>
                    product.name.toLowerCase().includes(userInput)
                );
                setDisplayedProducts(matchedProducts);
            }
        } else {
            setUserSearchInput("");
            
        }
    };

    const onSearchButtonClick = () => {
        navigation(`/customer/products/search/${userSearchInput}`, { state: { displayedProducts } });
    };

    const navigateToProductDetails = (product) => {
        navigation(`/customer/product/${product._id}`, {
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
                        ? "Hello! I am Wen Thing from Koperasi UM."
                        : order.orderItems[0].seller === "KK_Mart_UM"
                        ? "Hello! I am Kar Weng from KK Mart UM."
                        : order.orderItems[0].seller === "Zus_Coffee_UM"
                        ? "Hello! I am Weng Hong from Zus Coffee UM."
                        : "Hello! I am Chen Kang from Sports Direct UM.",
            };
            chatLists.push(chatHeader);
        });
        setChatList(chatLists);
    };

    useEffect(() => {
        fetchChatListFromOrders();
    }, []);

    const [chatList, setChatList] = useState([
        // {
        //     active: true,
        //     pfp: "/seller3.png",
        //     name: "Koperasi_UM",
        //     last_message: "Hello! I am Wen Thing from Koperasi UM.",
        // },
        // {
        //     active: false,
        //     pfp: "/seller4.png",
        //     name: "KK_Mart_UM",
        //     last_message: "Hello! I am Kar Weng from KK Mart UM.",
        // },
        // {
        //     active: false,
        //     pfp: "/seller1.png",
        //     name: "UM_Sports_Direct",
        //     last_message: "Hello! I am Chen Kang from KK Mart UM.",
        // },
        // {
        //     active: false,
        //     pfp: "/seller5.png",
        //     name: "Zus_Coffee_UM",
        //     last_message: "Hello! I am Weng Hong from Zus Coffee UM.",
        // },
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
            <main className="mt-24 flex flex-col w-full ">
                <section className="flex flex-row w-full gap-2 mb-10 justify-center">
                    <Autocomplete
                        id="free-solo-demo"
                        disableClearable={true}
                        freeSolo
                        sx={{ width: 600 }}
                        // onChange={(event, newValue) => {
                        //     console.log(newValue);
                        // }}
                        inputValue={userSearchInput}
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

                    <Carousel showDots={true} responsive={responsive}>
                        {category}
                    </Carousel>
                </section>

                <section className=" px-16 py-10 ">
                    <p className="text-3xl items-start my-10 font-sans font-semibold ">
                        Meet Syopi Top Sellers
                    </p>

                    <Carousel
                        showDots={true}
                        responsive={responsive}
                        className=" px-4"
                    >
                        {sellerList.map((item) => {
                            return (
                                <Seller
                                    sellerId={item._id}
                                    name={item.name}
                                    pfp={item.pfp}
                                    navigateToShop={navigateToShop}
                                />
                            );
                        })}
                    </Carousel>
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
                                        navigateToProductDetails(product)
                                    }
                                    className="flex flex-col gap-2 justify-center w-64 h-92 rounded-xl shadow-2xl px-10 py-10 hover:bg-slate-100"
                                >
                                    <img
                                        style={{ objectFit: "contain" }}
                                        src={product.image}
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
                                        RM{product.pricePerUnit}
                                    </p>
                                    <section className="flex flex-row gap-2">
                                        <p className="font-sans font-semibold">
                                            {product.average_rating.toFixed(1)}
                                            /5
                                        </p>
                                        <Box
                                            sx={{
                                                "& > legend": { mt: 2 },
                                            }}
                                        >
                                            <Rating
                                                name="read-only"
                                                value={product.average_rating}
                                                readOnly
                                                precision={0.1}
                                                style={{
                                                    fontSize: "15px",
                                                    verticalAlign: "middle",
                                                }}
                                            />
                                        </Box>
                                    </section>
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
