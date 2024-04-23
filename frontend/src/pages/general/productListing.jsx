
import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useLocation } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const ProductListing = () => {
    const { cartItems, setCartItems, productListing, setProductListing } =
        useContext(GlobalContext);
        const location = useLocation();
        const {displayedProducts, categoryClicked} = location.state;

        useEffect(() => {
            console.log(displayedProducts);
            if(categoryClicked){
                handleSortingChange(categoryClicked)
            }
        }, [displayedProducts,categoryClicked]);

    const navigation = useNavigate();

    const handleClick = (product) => {
        console.log(product + " Clicked ")
        navigation(`/customer/product/${product.id}`, { state: { product } });
    };


    const [chosenSortType,setSortType] = useState("")
    const [sortedProductsArr, setSortedProductsArr] = useState([])
    const [sortStatus , setSortStatus] = useState(false)

    const handleSortingChange = (e) => {
        console.log("E from handleSortingChange "+e)
        let sortingPreference = ""
        if(categoryClicked){
            sortingPreference = e
        }
        else{
            sortingPreference = e.target.value
        }
        console.log(sortingPreference)
        console.log(sortingPreference === e)
        if(sortingPreference === e){
            const sortedProducts = productListing.filter((product) => product.category === e)
            setSortedProductsArr(sortedProducts)
        }
        else{
            setSortType(chosenSortType => sortingPreference)
            if(sortingPreference === "PriceHTL"){
                const sortedProducts = [...displayedProducts].sort((a, b) => b.price - a.price);
                setSortedProductsArr(sortedProducts)
            }
            else if (sortingPreference === "PriceLTH"){
                const sortedProducts = [...displayedProducts].sort((a,b) => a.price - b.price);
                setSortedProductsArr(sortedProducts)
            }
            else if (sortingPreference === "BS"){
                const sortedProducts = displayedProducts.filter((product) => product.category === "Books & Stationery")
                setSortedProductsArr(sortedProducts)
            }
            else if (sortingPreference === "FB"){
                const sortedProducts = displayedProducts.filter((product) => product.category === "Food & Beverage")
                setSortedProductsArr(sortedProducts)
            }
            else if (sortingPreference === "MF"){
                const sortedProducts = displayedProducts.filter((product) => product.category === "Men's Fashion")
                setSortedProductsArr(sortedProducts)
            }
            else{
                alert("Choice of Category is not available.")
            }
        }
        
    }

    return (
        <div>
            <Customer_Navbar />
            <main className="mt-36 flex flex-col p-14 gap-10">
                <section className = "flex flex-row justify-between">
                    <p className = "font-sans font-bold text-[32px]">Trending Products</p>
                 <section>
                 <label for="sortType">Sort by :</label>
                 <select onChange = {(e) => handleSortingChange(e)} name="sortType" id="sortType">
                    <option value="PriceLTH">Price [Low to High]</option>
                    <option value="PriceHTL">Price [High to Low]</option>
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
                {sortedProductsArr.length > 0 ? (
    sortedProductsArr.map((product) => (
        <section key={product.id} onClick = {() => handleClick(product)}>
            <img src={product.img} className="w-[280px] h-[320px] object-cover"/>
            <p className="font-sans text-xl  text-black">{product.name} <span className = "text-gray-500 text-sm font-sans mr-[15px]">by <a className = "text-black text-md hover:cursor-pointer hover:text-black hover:underline font-sanss">{product.seller}</a></span></p>
            <p className="font-sans font-bold text-gray-900">RM{product.price}</p>
        </section>
    ))
) : (
    displayedProducts.map((product) => (
        <section key={product.id} onClick = {() => handleClick(product)}>
            <img src={product.img} className="w-[280px] h-[320px] object-cover"/>
            <p className="font-sans font-semibold text-xl text-black">{product.name} <span className = "text-gray-500 text-sm font-sans mr-[15px]">by <a className = "text-black text-md hover:cursor-pointer hover:text-black hover:underline font-sanss">{product.seller}</a></span></p>
            <p className="font-sans font-bold text-gray-900">RM{product.price}</p>
        </section>
    ))
)}
                    
                    {/* { displayedProducts.map((product) => {
                        return(
                            <section className = "flex flex-col ">
                                <img src = {product.img} className = "w-[280px] h-[320px] " />
                                <p className = "font-sans  text-lg text-gray-700">{product.name}</p>
                                <p className = "font-sans font-bold text-gray-900 ">RM{product.price}</p>
                            </section>
                        )
                    })} */}
                    </div>
            
            </main>
          
        </div>
    );
};

export default ProductListing;
