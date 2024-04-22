import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";


function Shop() {
    const location = useLocation();
    const { shopsItemListing, setShopsItemListing } = useContext(GlobalContext);
    const [seller, setSeller] = useState(location.state.seller);
    const [shopItems, setShopItems] = useState(shopsItemListing[seller]);
    const navigation = useNavigate();
    const selectProduct = (product) => {
        console.log(product)
        navigation(`/customer/product/${product.id}`, { state: { product } });
    };
    return (

        <div>
            <Customer_Navbar />

            <main className="mt-36">
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
            </main>
        </div>
    );
}

export default Shop;
