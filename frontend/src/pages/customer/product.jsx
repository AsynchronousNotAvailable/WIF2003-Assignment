import React, { useContext, useState } from "react";
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
        console.log(cartItems);

        console.log("Product successfully added");
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

    return (
        <>
            <Customer_Navbar />
            <div className="mt-[64px]">
                {/* {product.id}
                {product.name}
                {product.price}
                {product.rating}
                {product.img} */}

                <div className="w-full bg-gray-200 h-[92vh] px-16 py-8">
                    <div className="flex flex-row gap-10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-96 h-[64vh] border-black border-2">
                                Big pic
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="w-32 h-[20vh] border-black border-2">
                                    pic 1
                                </div>
                                <div className="w-32 h-[20vh] border-black border-2">
                                    pic 2
                                </div>
                                <div className="w-32 h-[20vh] border-black border-2">
                                    pic 3
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-10">
                            <div className="flex flex-row justify-between items-baseline border-black border-2">
                                <h1 className="text-4xl font-sans font-semibold">
                                    {product.name}
                                </h1>
                                <h1>1.8k sold</h1>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col border-black border-2">
                                    <div className="flex">
                                        RM {product.price}
                                    </div>
                                    <div className="flex flex-row border-black border-2">
                                        Icon tick
                                        <h4>Check Syopi</h4>
                                    </div>
                                    <div className="flex flex-row border-black border-2">
                                        100% authentic guarantee
                                    </div>
                                </div>
                                <div className="flex flex-row gap-10">
                                    <h4>Delivery Fee</h4>
                                    <h4>Delivery Fee RM5.38 including SST</h4>
                                </div>
                                <div className="flex flex-row gap-10">
                                    <h4>Variation</h4>
                                    <h4>Delivery Fee RM5.38 including SST</h4>
                                </div>
                                <div className="flex flex-row gap-10">
                                    <h4>Quantity</h4>
                                    <div className="flex flex-row items-center gap-5">
                                        <i
                                            class="fa-solid fa-minus"
                                            onClick={minusQuantity}
                                        ></i>
                                        {quantity}
                                        <i
                                            class="fa-solid fa-plus"
                                            onClick={addQuantity}
                                        ></i>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-10">
                                    <button
                                        className="flex flex-row gap-5 border-2 border-black px-4 py-2"
                                        onClick={addToCart}
                                    >
                                        cart icon Add to cart
                                    </button>
                                    <button
                                        className="flex flex-row border-2 border-black bg-purple-500 px-4 py-2"
                                        onClick={buyNow}
                                    >
                                        Buy Now
                                    </button>
                                </div>

                                <div className="flex flex-col">
                                    Reviews
                                    <Product_Review product={product} setProduct={setProduct} />
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
