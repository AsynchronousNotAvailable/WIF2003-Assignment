import React, { useState,useContext, useEffect } from 'react'

import Customer_Navbar from '../../components/customer_navbar';
import { Route, useNavigate } from "react-router-dom";
import { ChartContainer, ResponsiveChartContainer } from '@mui/x-charts';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';
import Seller_NavSidebar from '../../components/seller_sidebar';
import { GlobalContext } from '../../context';




const App = () => {
    const navigate = useNavigate();
    const [monthlyPurchaseAmount, setMonthlyPurchaseAmount] = useState("")
    const [orderStatusCategory, setOrderStatusCategory] = useState("")
    const [purchaseCategory, setPurchaseCategory] = useState("")
    const [purchaseHistory, setPurchaseHistory] = useState("")
    const {userDetails} = useContext(GlobalContext)
    const customerId = userDetails._id

    useEffect(() => {
        const fetchMonthlyPurchaseAmount = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/customers/analysis/${customerId}/monthlypurchase`)
                setMonthlyPurchaseAmount(res.data)    
                console.log(res.data)
            } catch (error) {
                throw new Error(error)
            }
        }
        const fetchOrderStatusCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/customers/analysis/${customerId}/orderStatusCategory`)
                setOrderStatusCategory(res.data)
            } catch (error) {
                throw new Error(error)
            }
        }
        const fetchPurchaseCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/customers/analysis/${customerId}/purchaseCategory`)
                setPurchaseCategory(res.data)
            } catch (error) {
                throw new Error(error)
            }
        }
        const fetchPurchaseHistory = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/customers/analysis/${customerId}/purchaseHistory`)
                setPurchaseHistory(res.data)
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchMonthlyPurchaseAmount()
        fetchOrderStatusCategory()
        fetchPurchaseCategory()
        fetchPurchaseHistory()
    } , [])
    
    
    const yValues = Object.values(monthlyPurchaseAmount)
    const xLabels = Object.keys(monthlyPurchaseAmount)
    
    const orderStatusSummary = Object.entries(orderStatusCategory).map(([key, value]) => {
        return {label:key, value : value}
    })
    console.log(orderStatusSummary)

    
    const productCategorySummary = Object.entries(purchaseCategory).map(([key,value]) => {
        return {label : key, value : value}
    })
    
    //   const productCategorySummary = [
    //     { label: 'Electronics', value: 200, color : "#2961FF" },
    //     { label: 'Health & Wellness', value: 400, color : "#7450DF"},
    //     { label: 'Skincare', value: 100, color : "#FF6869" },
       
    //   ];
      
const [ratingValue, setRatingValue] = useState(4);




    return (
        <div className = "overflow-hidden h-screen">
        <Customer_Navbar />
        <section className = "flex flex-col py-16 px-16 mt-10 gap-8">
            <section className = " w-full font-sans font-bold text-3xl">
               <header className = "font-sans">Customer Analysis</header>
            </section>
            <section className = "flex-1  flex flex-col w-full gap-10 h-full">
                <section className = "flex flex-row w-full gap-5 h-[280px]">
                    <section className = "flex-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-5 rounded-xl flex flex-row">
            <section className = "flex items-center w-1/3 px-5">
            <p className = "text-xl font-bold font-sans tracking-normal">Frequency of Purchase</p>
            </section>
            <section className = "flex flex-row">
            <LineChart
                        xAxis={[{ 
                            scaleType : "band",
                            data: xLabels }]}
                        series={[
                            {

                            data: yValues, label: 'Purchase Amount', color : "#2961FF"
                            },
                        ]}
                        width={500}
                        height={250}
                        />


            </section>

                    </section>   
                </section>

                <section className = "flex flex-row w-full gap-10">
                    <section className = " flex flex-col font-sans flex-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5  h-[300px] rounded-xl">
                    <p className = "font-sans font-bold">Order Status Pie Chart</p>
                    <p className = "font-sans text-[#616262]">Shows your order status summary</p>
                    
                    <PieChart
                    className = ""
                        series={[
                        
                            {
                            innerRadius: 80,
                            outerRadius: 50,
                            data: orderStatusSummary,
                            },
                        ]
                    }
                        width={400}
                        height={200}
                        
                    />
                    
                    
                    </section>
                    <section className = "flex flex-col font-sans flex-1  shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 h-[300px] rounded-xl">
                    <span className = "font-sans font-bold">Most Frequently Bought Product Categories</span>
                    <p className = "font-sans text-[#616262]">Shows your most frequently bought product categories</p>
                    <PieChart
                        series={[      
                            {
                            innerRadius: 80,
                            outerRadius: 50,
                            data: productCategorySummary,
                            },
                        ]}
                        width={500}
                        height={200}
                        
                    />
                    </section>
                 </section>

                <section className = "flex flex-row  justify-between h-[200px] gap-10 items-center  ">
                    <section className = "flex flex-col w-1/6  shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center"
                    onClick = {() => navigate('/customer/orders')}
                    >
                        <img src = "/deliveryIcon.png" style = {{width : '80px'}} className='cursor-pointer'/>
                        <p className = "font-sans font-semibold mt-[20px]">Order Status</p> </section>

                    <section className = "flex flex-col w-1/6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center"
                    onClick = {() => navigate ('/customer/wishlist')}
                    >
                        <img src = "/OrderIcon.png" style = {{width : '50px'}} className = "cursor-pointer"/>
                        <p className = "font-sans font-semibold mt-[20px]">Wishlist </p>
                    </section>

                    <section className = "flex flex-col flex-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center"
                    onClick = {() => navigate('/customer/purchase_history')}
                    >
                        <img src = "/SalesIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-semibold font-sans mt-[20px]">Purchase History</p>
                    </section>

                </section>


                <section className = "flex flex-row justify-evenly">
                
              

                </section>

            </section>
        </section>
        </div>
        
    )
}

export default App
// Below is the order summary round pie chart 


// Below is the line graph for purchase history 


//Below is the most frequently bought category round piechart 
