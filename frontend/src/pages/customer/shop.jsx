import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";


function Shop() {
    const location = useLocation();
    const { shopsItemListing, setShopsItemListing } = useContext(GlobalContext);
    const [seller, setSeller] = useState(location.state.seller);
    const [shopItems, setShopItems] = useState(shopsItemListing[seller].slice(1));
    const navigation = useNavigate();
    const selectProduct = (product) => {
        console.log(product)
        navigation(`/customer/product/${product.id}`, { state: { product } });
    };
    return (
        <div>
            <Customer_Navbar />

            {/* <main className="mt-36">
                <div className="flex flex-row">
                    {shopItems.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => selectProduct(product)}
                        >
                            {location.state.seller}'s Shop
                            <img
                                src={product.img}
                                alt={product.name}
                                className="product-image"
                            />
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Rating:{product.rating}</p>
                            <p>Rating: {product.seller}</p>
                        </div>
                    ))}
                </div>
            </main> */}
            <div className="flex flex-col mt-36">
                <div className="flex p-5">
                    <h4 className="font-sans font-semibold text-2xl">
                        {seller}'s Shop
                    </h4>
                </div>
                <div className="flex flex-row items-center px-20 py-10 gap-5 ">
                    {shopItems.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col gap-10 product-card rounded-md shadow-xl p-10 "
                            onClick={() => selectProduct(product)}
                        >
                            <div className="flex flex-col gap-10 items-center">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="product-image w-30 h-40"
                                />
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-sans font-semibold text-xl">
                                        {product.name}
                                    </h3>
                                    <p className="font-sans font-light text-md">
                                        Price: RM {product.price}
                                    </p>
                                    <p className="font-sans font-light text-md">
                                        Rating: {product.rating.toFixed(1)}
                                    </p>
                                    <p className="font-sans font-light text-md">
                                        Seller: {product.seller}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shop;
