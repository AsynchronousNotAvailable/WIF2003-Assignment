
import React, { useContext, useState } from "react";
import GlobalState, { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Seller_NavSidebar from "../../components/seller_sidebar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

function Marketplace() {
    const { shopsItemListing, productListing } = useContext(GlobalContext);
    console.log(shopsItemListing); //time to map the value of the name, given the key
    const options = productListing.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            ...option,
        };
    });

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
            name: "Nice Notebook",
            price: 13,
            rating: 4,
            img: "/notebook.png",
            seller: "Nice",
            reviews: [],
            variations: ["Brown", "Khaki", "Grey"],
        },
        {
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
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
            id: 2,
            name: "Horlicks",
            price: 8,
            rating: 3,
            img: "/horlickproduct.jpg",
            seller: "Horlicks_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
        },
    ]);
    const [userSearchInput, setUserSearchInput] = useState("");
    const [displayedProducts, setDisplayedProducts] = useState([]);

    const handleSearchChange = (event) => {
        if(event.target.innerText === null && event.target.value === null){
            setDisplayedProducts(productListing)
        }
        
        else if (event.target.innerText) {
            console.log("innerText")
            const userInput = event.target.innerText.toLowerCase();
            setUserSearchInput(userInput);
            const matchedProducts = productListing.filter((product) =>
                product.name.toLowerCase().includes(userInput)
            );
            setDisplayedProducts(matchedProducts);
        } 
        else {
            console.log("target value")
            const userInput = event.target.value.toLowerCase();
            setUserSearchInput(userInput);
            const matchedProducts = productListing.filter((product) =>
                product.name.toLowerCase().includes(userInput)
            );
            setDisplayedProducts(matchedProducts);
        }
    };

    const navigation = useNavigate();
    const onSearchButtonClick = () => {
        navigation(`/customer/products`, { state: { displayedProducts} });
    };

    const navigateToShop = (seller) => {
        navigation(`/customer/shop/${seller}`, {
            state: { seller: seller },
        });
    };

    const navigateToProductDetails = (productId) => {
    const product = productListing.find((p) => p.id === productId);

        // Navigate to the product details page with the targeted product
        navigation(`/customer/product/${productId}`, {
            state: { product },
        });
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
                        className="bg-[white] rounded-full shadow-3xl hover:bg-[#45b9dc] px-4 py-2">
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
                                    <section className="flex flex-col gap-10 rounded-xl shadow-2xl w-48 h-72 px-5 py-5 justify-center items-center">
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
                                    <div className = "flex flex-row">
                                    <p className = "font-sans font-semibold">{product.rating}/5.0</p>
                                    <section>
                                    <Box sx={{'& > legend': { mt: 2 },}}>
                                    <Rating name="read-only" value={product.rating} readOnly />
                                    </Box>
                                    </section>

                                    </div>
                                </section>
                            );
                        })}
                    </section>
                </section>
            </main>
        </>
    );
}
export default Marketplace;
