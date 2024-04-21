import React, {useState} from "react";
import { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Seller_NavSidebar from "../../components/seller_sidebar";


const Marketplace = () => {
    const [productCategory, setProductCategory] = useState([
        {
            name : "Books & Stationery",
            img : "/ph--books.png"
        },
        {
            name : "Electronics",
            img : "/map--electronics-store.png"
        },
        {
            name : "Fashion",
            img : "/icon-park-outline--clothes-suit.png"
        },
        {
            name : "Sports Equipments",
            img : "/solar--football-bold.png"
        },
        {
            name : "Health & Supplements",
            img : "/solar--health-bold.png"
        },
        {
            name : "Books & Stationery",
            img : "/ph--books.png"
        },
        {
            name : "Books & Stationery",
            img : "/ph--books.png"
        },
        {
            name : "Books & Stationery",
            img : "/ph--books.png"
        },
        {
            name : "Books & Stationery",
            img : "/ph--books.png"
        },
        {
            name : "Books & Stationery",
            img : "/ph--books.png"
        },
    ])
    const [productListing, setProductListing] = useState([
        {
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg"
        },
        {
            id: 1,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg"
        },
        {
            id: 2,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg"
        },
        {
            id: 3,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg"
        },
        {
            id : 4,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg"
        }
    ]);
    return(
        <>
         <Customer_Navbar />
        <main className="mt-36 flex flex-col p-5 ">
            <section className = "flex flex-row justify-center">
                <img className = "w-full object-cover "src = "/setelbanner.png"/>
            </section>

            <section className = "flex flex-col  p-10">
                <section className = "mb-10 font-sans font-semibold text-lg">Category</section>
                <section className = "flex flex-col justify-center  align-middle items-center">
                <section className = "flex flex-row  ">
                    <section className = "flex flex-col border-2 border-gray-400 w-[100px] h-[150px] ">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/map--electronics-store.png"/>
                        <p>Electronics</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-400 w-[100px]">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/solar--health-bold.png"/>
                        <p>Health & Wellness</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-400 w-[100px] ">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/solar--football-bold.png"/>
                        <p>Sports Equipments</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-500 w-[100px]">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300 align-middle" src = "/ph--books.png"/>
                        <p className = "">Books & Stationery</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-400 w-[100px] ">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/tdesign--milk.png"/>
                        <p>Groceries</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-400 w-[100px] ">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/icon-park-outline--clothes-suit.png"/>
                        <p>Fashion</p>
                    </section>
                </section>
                <section className = "flex flex-row justify-center">
                    <section className = "flex flex-col border-2 border-gray-400 w-[100px] h-[150px] ">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/map--electronics-store.png"/>
                        <p>Electronics</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-400 w-[100px]">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/solar--health-bold.png"/>
                        <p>Health & Wellness</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-400 w-[100px] ">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/solar--football-bold.png"/>
                        <p>Sports Equipments</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-500 w-[100px]">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300 align-middle" src = "/ph--books.png"/>
                        <p className = "">Books & Stationery</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-400 w-[100px] ">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/tdesign--milk.png"/>
                        <p>Groceries</p>
                    </section>

                    <section className = "flex flex-col border-2 border-gray-400 w-[100px] ">
                        <img className = "h-[40px] w-[40px] border-4 rounded-full border-gray-300" src = "/icon-park-outline--clothes-suit.png"/>
                        <p>Fashion</p>
                    </section>
                </section>
                </section>
                
            </section>

            <section className = "flex flex-col p-10  ">
                <p className = "font-sans font-semibold text-lg">
                    Just For You
                </p>
                <section className="flex flex-row  gap-5 ">
    {productListing.map((product) => {
        return (
            <section key={product.id} className="flex flex-col w-[350px] border border-gray-300 p-2">
                <img src={product.img} className="h-full object-cover object-center" alt={product.name} />
                <p className = "font-sans font-semibold text-lg">{product.name}</p>
                <p className="font-sans">
                    <span className="inline-block border text-[#FF6869] text-[12px] border-orange-500 rounded px-1">Selling Fast</span>
                </p>
                <p className = "font-sans text-[#7450DF]">RM{product.price}</p>
                <p>{product.rating} stars</p>
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