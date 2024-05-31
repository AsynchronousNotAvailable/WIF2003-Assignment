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
    const { cartItems, setCartItems } =
        useContext(GlobalContext);
    const navigation = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(location.state.product);
    const [reviews, setReviews] = useState([]);
    // console.log(product); //not really right
    const [variation, setVariation] = useState("");
    const [quantity, setQuantity] = useState(0);
    const { getCustomer } = useCustomer();
    const customer = getCustomer();

    const fetchProductReviews = async () => {
        try {
            const productId = product._id;
            const response = await axios.get(
                `http://localhost:5000/api/products/review/${productId}`
            );
            let temp = [];
            const fetchedReviews = response.data;
            console.log(fetchedReviews)
            fetchedReviews.map((review) => {
                const processedReview = {
                    title: review.title,
                    description: review.description,
                    rating: review.stars,
                    customerName:
                        customer.username === review.customer.username
                            ? "You"
                            : review.customer.username,
                    customerPfp: review.customer.pfp
                };
                temp.push(processedReview);
            });
            
            setReviews(temp);
        } catch (error) {
            console.log(error);
        }
    };
    const addToCart = async () => {

        const newItem = {
            productId: product._id,
            quantity: quantity,
            selectedVariation: variation,
        };

        try {
            const customer = getCustomer();
            const username = customer.username;
            const response = await axios.post(
                `http://localhost:5000/api/customers/${username}/addToCart`,
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
            product,
            quantity,
            variation,
        };
        setCartItems((prev) => [...prev, cartItem]);
        console.log(cartItem);
        navigation("/customer/checkout", {state: {cartItems}});
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

    useEffect(() => {
        fetchProductReviews();
    }, []);
    return (
        <>
            <Customer_Navbar />
            <div className="flex flex-row p-36 w-screen h-screen">
                <div className="w-2/3 h-[76vh] object-contain items-center justify-center align-middle flex flex-row ">
                    <img
                        src={product.image}
                        className="h-full object-contain max-w-screen-sm"
                    />
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
                        
                        reviews={reviews}
                    />
                </div>
            </div>
        </>
    );
}


export default Product;
