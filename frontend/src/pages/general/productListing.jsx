import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";

const ProductListing = () => {
    const { cartItems, setCartItems, productListing, setProductListing } =
        useContext(GlobalContext);
    
    const navigation = useNavigate();

    const handleClick = (product) => {
        navigation(`/customer/product/${product.id}`, { state: { product } });
    };

    

    return (
        <div>
            <Customer_Navbar />
            <main className="mt-36">
                <div className="flex flex-row">
                    {productListing.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleClick(product)}
                        >
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
            </main>
            <style jsx>{`
                .product-card {
                    border: 1px solid #ccc;
                    padding: 20px;
                    margin: 10px;
                    width: 200px; /* Set the width to ensure all cards have the same size */
                    text-align: center;
                    cursor: pointer; /* Add cursor pointer to indicate clickable */
                }

                .product-image {
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default ProductListing;
