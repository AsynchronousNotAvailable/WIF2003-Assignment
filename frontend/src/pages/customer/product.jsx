import React, { useContext, useState, useEffect } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import Product_Review from "./components/Product_Review";

function Product() {
    const { cartItems, setCartItems, productListing, setProductListing } =
        useContext(GlobalContext);
    const navigation = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(location.state.product);
    // console.log(product); //not really right
    const [variation, setVariation] = useState("");
    const [quantity, setQuantity] = useState(0);

    const addToCart = () => {
        const cartItem = {
            ...product,
            quantity,
            variation,
        };

        setCartItems((prev) => [...prev, cartItem]);
        navigation("/customer/cart");
        
    };
    const buyNow = () => {
        navigation("/customer/buyNow", { state: { product } });
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

    const addReview = () => {

    }

    return (
        <>
            <Customer_Navbar />
            <div className="mt-[64px]">
                {/* {product.id}
                {product.name}
                {product.price}
                {product.rating}
                {product.img} */}

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
                                        {product.variations.map(
                                            (v, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex px-4 py-2 rounded-sm ${
                                                        variation.includes(
                                                            v
                                                        )
                                                            ? "bg-slate-500 text-white"
                                                            : "bg-slate-400"
                                                    }`}
                                                    onClick={() =>
                                                        toggleSelection(
                                                            v
                                                        )
                                                    }
                                                >
                                                    {v}
                                                </div>
                                            )
                                        )}
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
                                            setProductListing={setProductListing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
