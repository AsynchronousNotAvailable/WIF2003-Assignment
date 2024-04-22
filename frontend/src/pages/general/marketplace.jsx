import React, {useState} from "react";
import { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Seller_NavSidebar from "../../components/seller_sidebar";


const Marketplace = () => {

    const [sellers, setSellers] = useState([
        {
            img : "/seller3.png",
            name : "Ali"
        },

        {
            img : "/seller4.png",
            name : "Abu"
        },

        {
            img : "/seller5.png",
            name : "Ahaha"
        },
    ])
    const [productCategorySetOne, setProductCategorySO] = useState([
        {
            name : "Books & Stationery",
            img : "/booksIcon.png"
        },
        {
            name : "Babies & Toys",
            img : "/toysIcon.png"
        },
        {
            name : "TV & Home Appliances",
            img : "/tvIcon.png"
        },
        {
            name : "Home & Lifestyle",
            img : "/homeIcon.png"
        },
        {
            name : "Groceries",
            img : "/groceryIcon.png"
        },
    ])

    const [productCategorySetTwo , setProductCategoryST] = useState([
        {
            name : "Electronic Accessories",
            img : "/electronicAcc.png"
        },
        {
            name : "Electronics Devices",
            img : "/electronicDev.png"
        },
        {
            name : "Women's Fashion",
            img : "/womenFashion.png"
        },
        {
            name : "Men's Fashion",
            img : "/menFashion.png"
        },
        {
            name : "Health & Supplements",
            img : "/healthIcon.png"
        },
    ])

    const [productListing, setProductListing] = useState([
        {
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
            qtySold : '1.8k'
        },
        {
            id: 1,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
            qtySold : '1.8k'
        },
        {
            id: 2,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
            qtySold : '1.8k'
        },
        {
            id: 3,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
            qtySold : '1.8k'
        },
    
    ]);
    return(
        <>
         <Customer_Navbar />
        <main className="mt-36 flex flex-col">
            <section className = "flex flex-row justify-center  ">
                <img className = " object-cover "src = "/setelbanner.png"/>
            </section>

            <section className = "flex flex-col ">
                <span className = "text-xl items-start mb-10 mt-20 font-sans font-semibold ml-[300px]">Category</span>
                <section className = "flex flex-col justify-center items-center">
                <section className = "flex flex-row ">
        
                    {productCategorySetOne.map((product) => {
                        return(
                            <section className = "flex flex-col border-2 w-[175px] h-[218px] justify-center items-center">
                                <img src = {product.img} className = "border-gray-300 border-2 w-[110px] h-[110px] rounded-full object-right"/>
                                <p className = "">{product.name}</p>
                                </section>
                        )
                    })}
                </section>
                <section className = "flex flex-row">
                    <section className = "flex flex-row">
                        {productCategorySetTwo.map((product) => {
                            return(
                                <section className = "flex flex-col border-2 w-[175px] h-[218px] justify-center items-center">
                                    <img src = {product.img} className = "border-gray-500 border-2 w-[110px] h-[110px] rounded-full object-contain"/>
                                    <p>{product.name}</p>
                                    </section>
                            )
                        })}
                    </section>
                </section>
                </section>
            </section>

            <section className = "flex flex-col">
                <span className = "text-xl items-start mb-10 mt-20 font-sans font-semibold ml-[300px]">Top Sellers of This Week</span>
                <section className = "flex flex-col items-center">
                <section className = "flex flex-row gap-5 ">
        
                    {sellers.map((seller) => {
                        return(
                            <section className = "flex flex-col border-2 w-[175px] h-[218px] justify-center items-center">
                                <img src = {seller.img} className = "border-gray-300 border-2 w-[110px] h-[110px] rounded-full object-right"/>
                                <p className = "">{seller.name}</p>
                                </section>
                        )
                    })}
    </section>
                </section>
            </section>

            
            <section className = "flex flex-col ">
                <p className = "text-xl items-start mb-10 mt-20 font-sans font-semibold ml-[300px]">
                    Just For You
                </p>
                <section className="flex flex-row gap-5 items-center justify-center">
    {productListing.map((product) => {
        return (
            <section key={product.id} className="flex flex-col w-[250px] h-[365px] border border-gray-300 p-2">
                <img src={product.img} className="h-full object-cover object-center border-b border-gray-200 mb-[10px]" alt={product.name} />
                <p className = "font-sans font-semibold text-lg">{product.name}</p>
                <p className="font-sans">
                    <span className="inline-block border text-[#FF6869] text-[12px] border-orange-500 rounded px-1 mb-[5px]">Selling Fast</span>
                </p>
               
                <p className = "font-sans text-[#7450DF]">RM{product.price}</p>
                <section className = "flex flex-row justify-between">
                <section className = "flex flex-row">
                    <p className = "font-sans font-semibold">{product.rating}</p>
                    <img className = "w-[20px] h-[20px] items-center"src = "/starIcon.png"/>
                    </section>
                <p>{product.qtySold} sold</p>
                    </section>
            </section>
        )
    })}
</section>
            </section>
        </main>
        </>
   
    )
}
export default Marketplace