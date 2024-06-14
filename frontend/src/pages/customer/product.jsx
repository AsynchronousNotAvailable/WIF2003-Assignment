import React, { useContext, useState, useEffect } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import Product_Review from "./components/Product_Review";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import useCustomer from "../../hooks/useCustomer";
import axios from "axios";

function Product() {
    const [wishlistedProduct, setWishlistedProduct] = useState("");
    const { cartItems, setCartItems, userDetails } = useContext(GlobalContext);
    const navigation = useNavigate();
    // const location = useLocation();
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
   
    const [variation, setVariation] = useState("");
    const [quantity, setQuantity] = useState(0);
    const { getCustomer } = useCustomer();
    const customer = getCustomer();

    const addToWishlist = async (userId, productId) => {
        try {
            const reqData = {
                userId: userId,
                productId: productId,
            };
            const res = await axios.post(
                "http://localhost:1234/api/customers/wishlist/add",
                reqData
            );
            setWishlistedProduct(productId);
            
        } catch (error) {
            console.log(error);
        }
    };
    const fetchProduct = async () => {
        try {
         
            const response = await axios.get(
                `http://localhost:1234/api/products/${productId}`
            );

            
            setProduct(response.data);
            setRating(response.data.average_rating);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProductReviews = async () => {
        try {
            // const productId = product._id;
            const response = await axios.get(
                `http://localhost:1234/api/products/review/${productId}`
            );
            let temp = [];
            const fetchedReviews = response.data;
            
            fetchedReviews.map((review) => {
                const processedReview = {
                    title: review.title,
                    description: review.description,
                    rating: review.stars,
                    customerName:
                        customer.username === review.customer.username
                            ? "You"
                            : review.customer.username,
                    customerPfp: review.customer.pfp,
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
                `http://localhost:1234/api/customers/${username}/addToCart`,
                newItem
            );
         
            if (response.status === 201) {
                window.alert("Item added to cart successfully!");
                // navigation("/customer/cart");
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
   
        navigation("/customer/checkout", {
            state: { cartItems: [cartItem], buyNow: true },
        });
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
        fetchProduct();
        fetchProductReviews();
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }
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
                                    {product &&
                                        product.seller &&
                                        product.seller.username}
                                </span>
                            </a>
                        </p>
                    </div>
                    <div className="flex flex-row font-sans font-semibold mt-[5px]">
                        <p className="">
                            {rating && rating.toFixed(1)}
                            /5
                        </p>
                        <Box sx={{ "& > legend": { mt: 2 } }}>
                            <Rating
                                name="read-only"
                                value={rating && rating.toFixed(1)}
                                precision={0.1}
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
                        <div className="flex flex-row gap-2 justify-left w-full">
                            {product &&
                                product.variation &&
                                product.variation.map((v, index) => (
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

                            <div
    onClick={() => addToWishlist(userDetails._id, product._id)}
    className={`hover:fill-red-600 ml-[20px] ${wishlistedProduct === product._id ? "fill-red-600" : "fill-white outline-2"}`}
>
<svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="" stroke="gray" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

</div>
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
                    <Product_Review reviews={reviews} />
                </div>
            </div>
        </>
    );
}

export default Product;
