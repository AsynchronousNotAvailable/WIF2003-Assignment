import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Customer_Navbar from "../../components/customer_navbar";
import axios from "axios";
function Shop() {
    const location = useLocation();
    const [seller, setSeller] = useState();
    const [shopItems, setShopItems] = useState([]);
    const navigation = useNavigate();
    useEffect(() => {
        fetchProducts(location.state.sellerId);
    }, []);

    const fetchProducts = async (sellerId) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/products/marketplace`
            );
            const products = response.data;

            const productsForSeller = products.filter(
                (product) => product.seller._id === sellerId
            );

            setSeller(productsForSeller[0].seller.username);
            adjustLayout(productsForSeller);
        } catch (error) {
            console.log(error);
        }
    };

    const adjustLayout = (preprocessProduct) => {
        let tempArr = [[]];

        for (let i = 0; i < preprocessProduct.length; i++) {
            const currentRow = Math.floor(i / 4);
            const currentColumn = i % 4;

            if (!tempArr[currentRow]) {
                tempArr[currentRow] = [];
            }
            tempArr[currentRow][currentColumn] = preprocessProduct[i];
        }

        setShopItems(tempArr);
    };
    const selectProduct = (product) => {
        navigation(`/customer/product/${product._id}`, { state: { product } });
    };
    return (
        <div>
            <Customer_Navbar />

            <div className="flex flex-col mt-36">
                <div className="flex px-20">
                    <h4 className="font-sans font-semibold text-3xl">
                        {seller}'s Shop
                    </h4>
                </div>
                <div className="flex flex-col items-start px-20 py-10 gap-5 ">
                    {shopItems.map((productRow) => (
                        <div className="flex flex-row gap-5">
                            {productRow.map((product) => {
                                return (
                                    <div
                                        className="flex flex-col gap-10 w-72 rounded-md shadow-xl p-10 "
                                        onClick={() => selectProduct(product)}
                                    >
                                        <div className="flex flex-col gap-10">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-48 max-w-48"
                                            />
                                            <div className="flex flex-col gap-3">
                                                <h3 className="font-sans font-semibold text-xl">
                                                    {product.name}
                                                </h3>
                                                <p className="font-sans font-light text-md">
                                                    Price: RM{" "}
                                                    {product.pricePerUnit}
                                                </p>
                                                <p className="font-sans font-light text-md">
                                                    Rating:{" "}
                                                    {product.average_rating.toFixed(
                                                        1
                                                    )}
                                                </p>
                                                <p className="font-sans font-light text-md">
                                                    Seller: {seller}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shop;
