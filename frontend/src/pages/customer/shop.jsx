import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import axios from "axios";
function Shop() {
    const location = useLocation();
    // const { shopsItemListing, setShopsItemListing } = useContext(GlobalContext);

    const [seller, setSeller] = useState();
    const [shopItems, setShopItems] = useState([]);
    const navigation = useNavigate();
    useEffect(() => {
        fetchProducts(location.state.sellerId);
    }, []);

    const fetchProducts = async (sellerId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/products/marketplace`
            );
            const products = response.data;
            console.log(products, sellerId);
            const productsForSeller = products.filter(
                (product) => product.seller._id === sellerId
            );

            console.log(productsForSeller);
            console.log(productsForSeller[0].seller);
            setSeller(productsForSeller[0].seller.username);
            setShopItems(productsForSeller);

            // products.forEach((product) => {
            //     if (
            //         tempCategory.filter((p) => p.seller._id === sellerId)
            //             .length === 0
            //     ) {
            //         let category = product.category;
            //         const newCategory = {
            //             category: category,
            //             url: mapCategoryImage(category),
            //         };
            //         tempCategory.push(newCategory);
            //     }
            // });
            setShopItems(productsForSeller);
        } catch (error) {
            console.log(error);
        }
    };
    const selectProduct = (product) => {
        console.log(product);
        navigation(`/customer/product/${product._id}`, { state: { product } });
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
                <div className="flex px-20">
                    <h4 className="font-sans font-semibold text-3xl">
                        {seller}'s Shop
                    </h4>
                </div>
                <div className="flex flex-row items-center px-20 py-10 gap-5 ">
                    {shopItems.map((product) => (
                        <div
                    
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
                                        Price: RM {product.pricePerUnit}
                                    </p>
                                    <p className="font-sans font-light text-md">
                                        Rating:{" "}
                                        {product.average_rating.toFixed(1)}
                                    </p>
                                    <p className="font-sans font-light text-md">
                                        Seller: {seller}
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
