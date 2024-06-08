import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

import axios from "axios";

const Search = () => {
    const [productListing, setProductListing] = useState([]);
    const [chosenSortType, setSortType] = useState("");
    const [sortedProductsArr, setSortedProductsArr] = useState([]);
    const [sortStatus, setSortStatus] = useState(false);
    const { query } = useParams();
    useEffect(() => {
        console.log(query);
        fetchProducts(query);
    }, []);

    const fetchProducts = async (categoryClicked) => {
        console.log(categoryClicked);
        try {
            const response = await axios.get(
                `http://localhost:1234/api/products/marketplace`
            );
            const products = response.data;

            setProductListing(products);

            handleSortingChange(products, query);
        } catch (error) {
            console.log(error);
        }
    };

    const navigation = useNavigate();
    const handleClick = (product) => {
        console.log(product + " Clicked ");
        navigation(`/customer/product/${product._id}`, { state: { product } });
    };

    const handleSortingChange = (products, query) => {
        // console.log("E from handleSortingChange " + e);
        let sortingPreference = query;

        // console.log(sortingPreference);
        // console.log(sortingPreference === e);
        if (sortingPreference === query) {
            console.log(products);
            const matchedProducts = products.filter((product) =>
                product.name.toLowerCase().includes(query)
            );
            // const sortedProducts = productListing.filter(
            //     (product) => product.category === "Food"
            // );

            setSortedProductsArr(matchedProducts);
        }

        if (sortedProductsArr.length > 0) {
            console.log(sortedProductsArr);
        }
    };

    return (
        <div>
            <Customer_Navbar />
            <main className="mt-36 flex flex-col p-14 gap-10">
                <section className="flex flex-row justify-between">
                    <p className="font-sans font-bold text-[32px]">
                        Trending Products
                    </p>
                    <section>
                        <label for="sortType">Sort by :</label>
                        <select
                            // onChange={(e) => handleSortingChange(e)}
                            name="sortType"
                            id="sortType"
                        >
                            <option value="PriceLTH">
                                Price [Low to High]
                            </option>
                            <option value="PriceHTL">
                                Price [High to Low]
                            </option>
                            <optgroup label="Categories">
                                <option value="MF">Men's Fashion</option>
                                <option value="FB">Food & Beverage</option>
                                <option value="BS">Books & Stationery</option>
                                {/* Add more category options as needed */}
                            </optgroup>
                        </select>
                    </section>
                </section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
                    {sortedProductsArr.length > 0 &&
                        sortedProductsArr.map((product) => (
                            <section onClick={() => handleClick(product)}>
                                <img
                                    style={{ objectFit: "contain" }}
                                    src={product.image}
                                    className="w-[280px] h-[320px] object-cover"
                                />
                                <p className="font-sans text-xl  text-black">
                                    {product.name}{" "}
                                    <span className="text-gray-500 text-sm font-sans mr-[15px]">
                                        by{" "}
                                        <a className="text-black text-md hover:cursor-pointer hover:text-black hover:underline font-sanss">
                                            {product.seller.username}
                                        </a>
                                    </span>
                                </p>
                                <p className="font-sans font-bold text-gray-900">
                                    RM{product.pricePerUnit}
                                </p>
                            </section>
                        ))}
                </div>
            </main>
        </div>
    );
};

export default Search;
