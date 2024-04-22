
import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useLocation } from 'react-router-dom';


const ProductListing = () => {
    const { cartItems, setCartItems, productListing, setProductListing } =
        useContext(GlobalContext);
        const location = useLocation();
        const { displayedProducts } = location.state;

        useEffect(() => {
            console.log(displayedProducts);
        }, [displayedProducts]);

    const navigation = useNavigate();

    const handleClick = (product) => {
        navigation(`/customer/product/${product.id}`, { state: { product } });
    };

    

    return (
        <div>
            <Customer_Navbar />
            <main className="mt-36 flex flex-col p-10 gap-10">
                <section>
                    <p className = "font-sans font-bold text-[32px]">Trending Products</p>
                </section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
                    {displayedProducts.map((product) => {
                        return(
                            <section className = "flex flex-col ">
                                <img src = {product.img} className = "w-[280px] h-[320px] " />
                                <p className = "font-sans  text-lg text-gray-700">{product.name}</p>
                                <p className = "font-sans font-bold text-gray-900 ">RM{product.price}</p>
                            </section>
                        )
                    })}
                    </div>
                {/* <div className="flex flex-row">
                    {displayedProducts.map((product) => (
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
                </div> */}
            </main>
          
        </div>
    );
};

export default ProductListing;
