import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from "../../context";
import Customer_Navbar from '../../components/customer_navbar';
import { Route, useNavigate } from "react-router-dom";
import { ChartContainer, ResponsiveChartContainer } from '@mui/x-charts';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';
import Seller_NavSidebar from '../../components/seller_sidebar';
import axios from 'axios';
import { keyframes } from '@emotion/react';
import useSeller from '../../hooks/useSeller';




const App = () => {
    const navigate = useNavigate();
    const [productCategories, setProductCategories] = useState([]);
    const [orderStatusSummary, setOrderStatusSummary] = useState([]);
    const [ratingSummary, setRatingSummary] = useState("")
    const [revenuePerMonth, setRevenuePerMonth] = useState([])
    const { getSeller } = useSeller();
    const sellerId = getSeller()._id;

    useEffect( () => {
        try {
            const fetchProductCategories = async () => {
                const response = await axios.get(`http://localhost:1234/api/sales/${sellerId}/topSellingCategory`)
                const productCategories = [];
                Object.keys(response.data).forEach((key) => {
                    const productCategoryObj = {
                        label : key,
                        value : response.data[key]
                    }
                    productCategories.push(productCategoryObj)
                })
                setProductCategories(productCategories)
            }

            const fetchOrderStatusSummary = async () => {
                const response = await axios.get(`http://localhost:1234/api/sales/${sellerId}/orderStats`)
                const orderStatistics = [];
                Object.keys(response.data).forEach((key) => {
                    const orderStatusObj = {
                        label : key,
                        value : response.data[key]
                    }
                    orderStatistics.push(orderStatusObj)
                }) 
                setOrderStatusSummary(orderStatistics)
            }

            const fetchRatingSummary = async () => {
                const response = await axios.get(`http://localhost:1234/api/sales/${sellerId}/reviewStats`)
                console.log(response.data)
                setRatingSummary(response.data)
            }

            const fetchRevenuePerMonth = async () => {
                const response = await axios.get(`http://localhost:1234/api/sales/${sellerId}/revenueStats`)
                const revenuePerMonthStats = [];
                Object.keys(response.data).forEach((key) => {
                    const revenueObj = {
                        label : key,
                        value : response.data[key]
                    }
                    revenuePerMonthStats.push(revenueObj)
                })
                setRevenuePerMonth(revenuePerMonthStats)
            }

            fetchProductCategories()
            fetchOrderStatusSummary()
            fetchRatingSummary()
            fetchRevenuePerMonth()

        } catch (error) {
            throw new Error(error)
        }
    } , [])


    //   const orderStatusSummary = [
    //     { label: 'Success', value: 100, color : "#17BF6B" },
    //     { label: 'Pending', value: 300, color : "#FFC632"},
    //     { label: 'Failed', value: 100, color : "#ED3333" },
       
    //   ];

    //   const productCategorySummary = [
    //     { label: 'Electronics', value: 200, color : "#2961FF" },
    //     { label: 'Health & Wellness', value: 400, color : "#7450DF"},
    //     { label: 'Skincare', value: 100, color : "#FF6869" },
       
    //   ];
      
const [ratingValue, setRatingValue] = useState(4);
const returningVisitor = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const newVisitor = [1000,2300,1500,7000,7200,3070,4350]
// const xLabels = revenuePerMonth.map(item => item.month);
const yValues = revenuePerMonth.map(item => item.value);

const xLabels = [
"April", "May","June"
];
    return (
        <div className = "overflow-hidden h-screen">
        <Seller_NavSidebar/>
        <section className = "flex flex-col p-14 ml-64 mt-10 gap-1">
            <section className = " w-full font-sans font-bold text-2xl">
               <header className = "font-sans font-bold text-3xl">Seller Analysis</header>
            </section>
            <section className = "mt-5">
                
            </section>
            <section className = "flex-1  flex flex-col w-full gap-10 h-full">
                <section className = "flex flex-row w-full gap-5 h-[280px]">
                    <section className = "flex-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-5 rounded-xl flex-row flex">
                        <section className = "flex items-center w-1/3 px-5">
                            <p className = "text-xl font-bold font-sans tracking-normal ">Revenue Per Month</p>
                        </section>
                        <section>
                    {/* <LineChart
                    width={500}
                    height={250}
                    series={[
                        { data: yValues, label: 'Revenue', },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    sx={{
                        '& .MuiLineChart-area': {
                          fillOpacity: 0.3, // Adjust the opacity value as needed
                        },
                      }}
                     slotProps={{
                        legend: {
                        position: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                        itemMarkWidth: 20,
                        itemMarkHeight: 2,
                        markGap: 5,
                        itemGap: 10,
                        font : {className : "font-sans text-green-700"}
                        },
                        area: {
                            visible: true, // Set to true to display area below the lines
                            opacity: 1, // Adjust the opacity of the area fill as needed
                        }
                    }}
                    /> */}
                   <LineChart
                        xAxis={[{ 
                            scaleType : "band",
                            data: xLabels }]}
                        series={[
                            {

                            data: yValues,
                            },
                        ]}
                        width={500}
                        height={250}
                        />

                        </section>
                    

                   
                    </section>
                   
                </section>

            <section className = "flex flex-row gap-10">
              
                <section className = "flex flex-col font-sans  shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 h-[300px] flex-1 rounded-xl">
                    <span className = "font-sans font-bold">Best-Selling Categories</span>
                    <p className = "font-sans text-[#616262]">Shows the most-sold product categories of your shop</p>
                    <PieChart
                        series={[
                        
                            {
                            innerRadius: 80,
                            outerRadius: 50,
                            data: productCategories,
                            },
                        ]}
                        width={500}
                        height={200}
                        
                    />
                </section>

                <section className = " flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 h-[300px] flex-1 rounded-xl">
                    <p className = "font-sans font-bold">Order Status Pie Chart</p>
                    <p className = "font-sans text-[#616262]">Shows the order summary of your shop</p>
                    <PieChart
                        series={[
                        
                            {
                            innerRadius: 80,
                            outerRadius: 50,
                            data: orderStatusSummary,
                            },
                        ]}
                        width={500}
                        height={200}
                        
                    />
                </section>

             </section>

             
                <section className = "flex flex-row  justify- h-[200px] items-center gap-10 ">
                    <section onClick = {() => navigate("/seller/analysis/customer_segmentation")} className = "flex flex-col w-1/6  shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center ">
                        <img src = "/CustomerIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-sans font-semibold mt-[20px]">Customer Segmentation Analysis</p> </section>

                    <section className = "flex flex-col w-1/6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center"
                    onClick = {() => navigate(
                        '/seller/order_management')}
                    >
                        <img src = "/OrderIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-sans font-semibold mt-[20px]">Order Summary</p>
                    </section>

                    <section className = "flex flex-col w-1/6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center"
                    onClick = {() => navigate("/seller/analysis/popular_products")}
                    >
                        <img src = "/SalesIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-semibold font-sans mt-[20px]">Popular Products</p>
                    </section>

                    <section className ="flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex-1 h-full p-5 rounded-xl">
                    <section className = "flex flex-row justify-between">
                        <p className = "font-sans text-lg font-semibold">Customer Review</p>
                       
                    </section>
                    <section className = "flex flex-col justify-between h-full">
                    <section className = "flex flex-row">
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                        >
                    
                        <Rating name="half-rating-read" precision = {0.5} value={Math.floor(ratingSummary["shopRating"])} readOnly />
                        
                        </Box>
                        <p className = "font-sans"><span className = "ml-8 mr-1 font-sans font-bold">{ratingSummary["shopRating"]} </span> </p>
                        
                    </section>
                    <div className = "flex flex-row gap-20">
                    <div className = "flex flex-col">

                    <section className = "flex flex-row font-sans font-semibold gap-10">
                        <p>5 stars</p>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                        >
                    
                        <Rating name="read-only" value={5} readOnly />
                        
                        </Box>
                        <p>({ratingSummary["5"]})</p>    
                    </section>
                    <section className = "flex flex-row font-sans font-semibold gap-10">
                        <p>4 stars</p>
                        <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                        >
                    
                        <Rating name="read-only" value={4} readOnly />
                        
                        </Box>
                        <p>({ratingSummary["4"]})</p>    
                    </section>
                    <section className = "flex flex-row font-sans font-semibold gap-10">
                        <p>3 Stars</p>
                        <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                        >
                    
                        <Rating name="read-only" value={3} readOnly />
                        
                        </Box>
                        <p>({ratingSummary["3"]})</p>    
                    </section>

                    </div>

                    <div className = "flex flex-col">
                    <section className = "flex flex-row font-sans font-semibold gap-10">
                        <p>2 stars</p>
                        <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                        >
                    
                        <Rating name="read-only" value={2} readOnly />
                        
                        </Box>
                        <p>({ratingSummary["2"]})</p>    
                    </section>
                    <section className = "flex flex-row font-sans font-semibold gap-10">
                        <p>1 star</p>
                        <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                        >
                    
                        <Rating name="read-only" value={1} readOnly />
                        
                        </Box>
                        <p>({ratingSummary["1"]})</p>    
                    </section>
                    </div>
                    </div>
                 
                    

                    </section>

                    </section>


                </section>


                

            </section>
        </section>
        </div>
        
    )
}

export default App



