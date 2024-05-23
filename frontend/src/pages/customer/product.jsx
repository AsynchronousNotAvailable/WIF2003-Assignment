import React, { useContext, useState, useEffect } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import Product_Review from "./components/Product_Review";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import useCustomer from "../../hooks/useCustomer";
import axios from "axios";

function Product() {
    const { cartItems, setCartItems, productListing, setProductListing } =
        useContext(GlobalContext);
    const navigation = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(location.state.product);
    // console.log(product); //not really right
    const [variation, setVariation] = useState("");
    const [quantity, setQuantity] = useState(0);
    const { getCustomer } = useCustomer();
    console.log(product);
    const addToCart = async () => {
        // Check if the product already exists in the cart items
        // const existingCartItemIndex = cartItems.findIndex(
        //     (item) => item.id === product.id && item.variation === variation
        // );

        // if (existingCartItemIndex !== -1) {
        //     // If the product exists in the cart, update its quantity
        //     const updatedCartItems = [...cartItems];
        //     updatedCartItems[existingCartItemIndex].quantity += quantity;
        //     setCartItems(updatedCartItems);
        // } else {
        //     // If the product doesn't exist in the cart, add it as a new item
        //     const cartItem = {
        //         ...product,
        //         quantity,
        //         variation,
        //     };
        //     setCartItems((prev) => [...prev, cartItem]);
        // }

        const newItem = {
            productId: product._id,
            quantity: quantity,
            selectedVariation: variation,
        };

        try {
            const customer = getCustomer();
            const username = customer.username;
            const response = await axios.post(
                `http://localhost:8080/api/customers/${username}/addToCart`,
                newItem
            );
            console.log(response.data);
            if (response.status === 201) {
                window.alert("Item added to cart successfully!");
                navigation("/customer/cart");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const buyNow = () => {
        const cartItem = {
            ...product,
            quantity,
            variation,
        };
        setCartItems((prev) => [...prev, cartItem]);
        navigation("/customer/checkout");
    };

    const minusQuantity = () => {
        if (quantity === 0) {
            setQuantity(0);
        } else {
            setQuantity(quantity - 1);
        }
    };

    const addQuantity = () => {
        setQuantity(quantity + 1);
    };

    // console.log("PROLlLLLLLLLLL", productListing);

    // Function to toggle selection of a variation
    const toggleSelection = (v) => {
        // Check if the variation is already selected
        if (variation.includes(v)) {
            // If yes, remove it from selectedVariations
            setVariation("");
        } else {
            // If not, add it to selectedVariations
            setVariation(v);
        }
    };

    const addReview = () => {};
    return (
        <>
            <Customer_Navbar />
            <div className="flex flex-row p-36 w-screen h-screen">
                <div className="w-2/3 h-[76vh] object-contain items-center justify-center align-middle flex flex-row ">
                    <img src={product.img} className="h-full object-cover " />
                </div>
                <div
                    className="flex-1 flex flex-col overflow-y-scroll px-5"
                    style={{ height: "76vh" }}
                >
                    <p className="font-sans text-normal  text-gray-400 mb-[10px]">
                        {product.category}
                    </p>
                    <div className="flex flex-row align-middle items-center">
                        <p className="font-sans text-2xl font-bold tracking-wide mr-10">
                            {product.name}
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <p className="font-sans text-sm  text-gray-400">
                            by{" "}
                            <a
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                target="_blank"
                                className="hover:underline hover:text-black"
                            >
                                <span className="font-sans text-md font-semibold tracking-wide text-black">
                                    {product.seller.username}
                                </span>
                            </a>
                        </p>
                    </div>
                    <div className="flex flex-row font-sans font-semibold mt-[5px]">
                        <p className="">
                            {product.average_rating.toFixed(1)}/5
                        </p>
                        <Box sx={{ "& > legend": { mt: 2 } }}>
                            <Rating
                                name="read-only"
                                value={product.average_rating.toFixed(1)}
                                readOnly
                            />
                        </Box>
                    </div>
                    <p className="font-sans text-xl tracking-wide font-semibold mt-[10px]">
                        RM{product.pricePerUnit}.00
                    </p>
                    <p className="font-sans text-lg tracking-wide mt-[20px] ">
                        {product.description}
                    </p>
                    <div className="flex flex-col mt-[20px]">
                        <h4 className="font-sans mb-[10px]">Variation</h4>
                        <div className="flex flex-row justify-between w-full">
                            {product.variation.map((v, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-row px-4 py-2 
                                                 rounded-lg w-[150px] border border-gray-400 variation-item cursor-pointer 
                                                 ${
                                                     variation.includes(v)
                                                         ? "bg-blue-800 text-white"
                                                         : "hover:bg-blue-800 hover:text-white transition-colors duration-500"
                                                 }`}
                                    onClick={() => toggleSelection(v)}
                                >
                                    {v}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row mt-[50px]">
                        <div className="flex flex-row align-middle items-center gap-5 p-2 px-6  rounded-lg border-2 justify-between border-gray-300">
                            <i
                                class="fa-solid fa-minus hover:bg-slate-200   rounded-lg cursor-pointer"
                                onClick={minusQuantity}
                            ></i>
                            <div className=" px-2 rounded-sm font-semibold text-lg">
                                {quantity}
                            </div>
                            <i
                                class="fa-solid fa-plus hover:bg-slate-200   rounded-lg cursor-pointer "
                                onClick={addQuantity}
                            ></i>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between  mt-[50px] gap-10 ">
                        <div className="flex flex-row items-center ">
                            <button
                                className="flex flex-row px-20 items-center hover:cursor-pointer gap-5  rounded-lg shadow-md py-2 border-2 border-gray-400"
                                onClick={addToCart}
                            >
                                <i class="fa-solid fa-cart-shopping text-blue-800"></i>
                                <div className="text-[#5489FC] font-sans">
                                    Add to cart
                                </div>
                            </button>

                            <img
                                src="/heartIcon.svg"
                                className="w-[20px] ml-[20px] h-[20px] fill-red-600"
                            />
                        </div>

                        <div className="flex flex-row items-center">
                            <button
                                className="flex flex-row px-[110px] items-center rounded-lg bg-blue-800 border-gray-400 border-2 shadow-md py-2"
                                onClick={buyNow}
                            >
                                <div className="text-white font-sans">
                                    Buy Now
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="font-sans text-2xl font-bold tracking-wide mt-[50px]">
                        Reviews
                    </div>
                    <Product_Review
                        product={product}
                        setProduct={setProduct}
                        productListing={productListing}
                        setProductListing={setProductListing}
                    />
                </div>
            </div>
        </>
    );
}
{
    /* <Customer_Navbar />
        <div className = "mt-[64px] flex flex-row">
            <div className = "w-[592px] h-[712px]">
                <img src = {product.img} className = "object-cover w-full h-full"/>
            </div>
            <div className = "flex flex-col flex-1">
                <p className = "text-grey-900 font-bold font-sans text-[36px]" >{product.name}</p>
                <p className = "text-grey-900  font-sans text-[36px]">RM{product.price}</p>
                
                    <Box
                     sx={{'& > legend': { mt: 2 },}}>
                    <Rating name="read-only" value={4} readOnly />
                    </Box>
                
                <div className = "text-grey-700 text-[24px] tracking-tight font-sans">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                <div className="flex flex-col">
                                        <h4 className="font-sans text-[20px]  text-gray-600">
                                            Variation
                                        </h4>
                                        <div className = "flex flex-row">
                                        {product.variations.map(
                                            (v, index) => (
                                                <div key={index} className={`flex flex-row px-4 py-2 rounded-sm 
                                                ${variation.includes(v) ? "bg-slate-500 text-white" : "bg-slate-400"}`}
                                                    onClick={() => toggleSelection(v)}>{v}
                                                </div>
                                            )
                                        )}
                                        </div>
                                        
                </div>
                <div className = "flex flex-row">
                <button className = "bg-[#5489FC]"> Add to Cart</button>
                <p>[Wishlist]</p>
                </div>

            </div>
        </div> */
}
{
    /* <Customer_Navbar />
            <div className="mt-[64px]">
                <div className="w-full bg-gray-200 h-[92vh] px-48 py-16">
                    <div className="flex flex-row gap-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-96 max-h-min ">
                                <img src={product.img} alt="" />
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="w-32 h-[20vh]">
                                    <img src={product.img} alt="" />
                                </div>
                                <div className="w-32 h-[20vh]">
                                    <img src={product.img} alt="" />
                                </div>
                                <div className="w-32 h-[20vh]">
                                    <img src={product.img} alt="" />
                                </div>
                            </div>
                        </div>

                        <div
                            className="overflow-y-scroll"
                            style={{ height: "76vh" }}
                        >
                            <div className="flex flex-1 flex-col gap-10">
                                <div className="flex flex-row justify-between items-baseline ">
                                    <h1 className="text-3xl -sans font-semiboldfont">
                                        {product.name}
                                    </h1>
                                    <h1 className="text-[#8B909A] text-md">
                                        1.8k sold
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col gap-8 px-6 py-4 bg-slate-300 rounded-md ">
                                        <div className="flex text-[#45b9dc] font-sans font-semibold text-4xl">
                                            RM {product.price}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row gap-3 items-center ">
                                                <i class="fa-solid fa-circle-check fa-lg text-[#45b9dc]"></i>
                                                <h4 className="text-[#45b9dc] font-sans font-medium">
                                                    Check Syopi
                                                </h4>
                                            </div>

                                            <div className="flex flex-row gap-3 items-center">
                                                <i class="fa-solid fa-umbrella text-[#45b9dc] fa-lg"></i>
                                                <h4 className="text-[#45b9dc] font-sans font-medium">
                                                    100% authentic guarantee
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-10 px-4">
                                        <h4 className="font-sans text-sm font-light text-[#8B909A]">
                                            Delivery
                                        </h4>
                                        <h4 className="px-2 font-sans font-normal text-md">
                                            Delivery Fee RM5.38 including SST
                                        </h4>
                                    </div>
                                    <div className="flex flex-row items-center gap-10 px-4">
                                        <h4 className="font-sans text-sm font-light text-[#8B909A]">
                                            Variation
                                        </h4>
                                        {product.variations.map((v, index) => (
                                            <div
                                                key={index}
                                                className={`flex px-4 py-2 rounded-sm ${
                                                    variation.includes(v)
                                                        ? "bg-slate-500 text-white"
                                                        : "bg-slate-400"
                                                }`}
                                                onClick={() =>
                                                    toggleSelection(v)
                                                }
                                            >
                                                {v}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-row items-center gap-10 px-4">
                                        <h4 className="font-sans text-sm font-light text-[#8B909A]">
                                            Quantity
                                        </h4>
                                        <div className="flex flex-row items-center gap-5 p-2 px-4 rounded-md bg-slate-50">
                                            <i
                                                class="fa-solid fa-minus hover:bg-slate-200 rounded-md cursor-pointer"
                                                onClick={minusQuantity}
                                            ></i>
                                            <div className=" bg-slate-500 px-2 rounded-sm">
                                                {quantity}
                                            </div>
                                            <i
                                                class="fa-solid fa-plus hover:bg-slate-200 rounded-md cursor-pointer"
                                                onClick={addQuantity}
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-10">
                                        <button
                                            className="flex flex-row items-center hover:cursor-pointer gap-5 border-2 rounded-md border-[#45b9dc] shadow-md px-4 py-2"
                                            onClick={addToCart}
                                        >
                                            <i class="fa-regular fa-cart-shopping text-[#45b9dc]"></i>
                                            <div className="text-[#45b9dc] font-sans">
                                                Add to cart
                                            </div>
                                        </button>
                                        <button
                                            className="flex flex-row items-center rounded-md bg-[#45b9dc] shadow-md px-4 py-2"
                                            onClick={buyNow}
                                        >
                                            <div className="text-white font-sans">
                                                Buy Now
                                            </div>
                                        </button>
                                    </div>

                                    <div className="flex flex-col px-1 gap-5">
                                        <h2 className="font-sans font-semibold text-2xl">
                                            Reviews
                                        </h2>

                                        <Product_Review
                                            product={product}
                                            setProduct={setProduct}
                                            productListing={productListing}
                                            setProductListing={
                                                setProductListing
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <></>
        </>
    ); */
}

export default Product;
