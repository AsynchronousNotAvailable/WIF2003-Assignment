import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Product from "../customer/product";

const ProductListing = () => {
    const { cartItems, setCartItems, productListing, setProductListing } =
        useContext(GlobalContext);
    const [sortType, setSortType] = useState("");
    const { category } = useParams();
    useEffect(() => {
       
        fetchProducts(category);
    }, [sortType]);

    const fetchProducts = async (categoryClicked) => {
        
        try {
            const response = await axios.get(
                `http://localhost:1234/api/products/marketplace`
            );
            const products = response.data;

            setProductListing(products);

            let sortedProducts = [];
            for (let i = 0; i < products.length; i++) {
               

                if (products[i].category === categoryClicked) {
                    
                    sortedProducts.push(products[i]);
                }
            }

            if (sortType === "" || sortType === "PriceLTH") {
                sortedProducts.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
            } else if (sortType === "PriceHTL") {
                sortedProducts.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
            }

            setSortedProductsArr(sortedProducts);

            // handleSortingChange(products, categoryClicked, "PriceLTH");
        } catch (error) {
            console.log(error);
        }
    };

    const navigation = useNavigate();
    const handleClick = (product) => {
       
        navigation(`/customer/product/${product._id}`, { state: { product } });
    };

    const [sortedProductsArr, setSortedProductsArr] = useState([]);

    

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
                            onChange={(e) => setSortType(e.target.value)}
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

export default ProductListing;
