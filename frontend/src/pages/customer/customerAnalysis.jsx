import React, { useState } from 'react'
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




const App = () => {
 
      const orderStatusSummary = [
        { label: 'Received', value: 900, color : "#17BF6B" },
        { label: 'On Delivery', value: 200, color : "#FFC632"},
        { label: 'Rejected', value: 10, color : "#ED3333" },
       
      ];

      const productCategorySummary = [
        { label: 'Electronics', value: 200, color : "#2961FF" },
        { label: 'Health & Wellness', value: 400, color : "#7450DF"},
        { label: 'Skincare', value: 100, color : "#FF6869" },
       
      ];
      
const [ratingValue, setRatingValue] = useState(4);



const purchaseHistoryData = [200,100,150,500,20,50,200,10,300,400,132,12]
const months = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

    return (
        <>
        <Customer_Navbar />
        <section className = "flex flex-col p-20 mt-10 gap-8">
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
                                width={600}
                                height={250}
                                series={[
                                    { data: purchaseHistoryData, label: 'Purchase Amount (RM)' }
                                ]}
                                xAxis={[{ scaleType: 'point', data: months }]}
                                />

                        </section>
                       
                    </section>
                    <section className ="flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-1/3 p-5 rounded-xl">
                        <section className = "flex flex-row justify-between">
                            <p className = "font-sans text-lg font-semibold">Seller Review</p>
                            <img src = "/sync-outline.png"/>
                        </section>
                        <section className = "flex flex-col justify-between h-full">
                        <section className = "flex flex-row">
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            >
                           
                            <Rating name="read-only" value={4} readOnly />
                            
                            </Box>
                            <p className = "font-sans"><span className = "ml-8 mr-1 font-sans font-bold">4.0/5 </span> </p>
                            
                        </section>
                        <section className = "flex flex-row font-sans font-semibold">
                            <p>5 stars</p>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            >
                           
                            <Rating name="read-only" value={5} readOnly />
                            
                            </Box>
                            <p>(400)</p>    
                        </section>
                        <section className = "flex flex-row font-sans font-semibold">
                            <p>4 stars</p>
                            <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            >
                           
                            <Rating name="read-only" value={4} readOnly />
                            
                            </Box>
                            <p>(300)</p>    
                        </section>
                        <section className = "flex flex-row font-sans font-semibold">
                            <p>3 Stars</p>
                            <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            >
                           
                            <Rating name="read-only" value={3} readOnly />
                            
                            </Box>
                            <p>(23)</p>    
                        </section>
                        <section className = "flex flex-row font-sans font-semibold">
                            <p>2 stars</p>
                            <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            >
                           
                            <Rating name="read-only" value={2} readOnly />
                            
                            </Box>
                            <p>(43)</p>    
                        </section>
                        <section className = "flex flex-row font-sans font-semibold">
                            <p>1 star</p>
                            <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            >
                           
                            <Rating name="read-only" value={1} readOnly />
                            
                            </Box>
                            <p>(1)</p>    
                        </section>

                        </section>
                      
                        
                        
                    </section>
                </section>

                <section className = "flex flex-row  justify- h-[200px] items-center gap-10 justify-between ">
                    <section className = "flex flex-col w-1/4  shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center ">
                        <img src = "/deliveryIcon.png" style = {{width : '80px'}}/>
                        <p className = "font-sans font-semibold mt-[20px]">Order Status</p> </section>

                    <section className = "flex flex-col w-1/4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center">
                        <img src = "/OrderIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-sans font-semibold mt-[20px]">Wishlist </p>
                    </section>

                    <section className = "flex flex-col w-1/4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center">
                        <img src = "/SalesIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-semibold font-sans mt-[20px]">Purchase History</p>
                    </section>

                </section>


                <section className = "flex flex-row justify-evenly">
                <section className = " flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 rounded-xl">
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
                        width={400}
                        height={300}
                        
                    />
                </section>
                <section className = "flex flex-col font-sans  shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 rounded-xl">
                    <span className = "font-sans font-bold">Most Frequently Bought Product Categories</span>
                    <p className = "font-sans text-[#616262]">Shows the most frequently product categories of your shop</p>
                    <PieChart
                        series={[      
                            {
                            innerRadius: 80,
                            outerRadius: 50,
                            data: productCategorySummary,
                            },
                        ]}
                        width={500}
                        height={300}
                        
                    />
                </section>

                </section>

            </section>
        </section>
        </>
        
    )
}

export default App