import React, { useState } from 'react'
import { GlobalContext } from "../../context";
import Customer_Navbar from '../../components/customer_navbar';
import { useNavigate } from "react-router-dom";
import { ChartContainer, ResponsiveChartContainer } from '@mui/x-charts';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { PieChart } from '@mui/x-charts/PieChart';



import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';
import Seller_NavSidebar from '../../components/seller_sidebar';




const App = () => {
 
      const orderStatusSummary = [
        { label: 'Success', value: 100, color : "#17BF6B" },
        { label: 'Pending', value: 300, color : "#FFC632"},
        { label: 'Failed', value: 100, color : "#ED3333" },
       
      ];

      const productCategorySummary = [
        { label: 'Electronics', value: 200, color : "#2961FF" },
        { label: 'Health & Wellness', value: 400, color : "#7450DF"},
        { label: 'Skincare', value: 100, color : "#FF6869" },
       
      ];
      
const [ratingValue, setRatingValue] = useState(4);
const returningVisitor = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const newVisitor = [1000,2300,1500,7000,7200,3070,4350]
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];
    return (
        <>
        <Customer_Navbar/>
        <section className = "flex flex-col p-14  mt-[50px] gap-8">
            <section className = " w-full font-sans font-bold text-2xl">
               <header className = "">Customer Analysis</header>
            </section>
            <section className = "flex-1  flex flex-col w-full gap-10 h-full">
                <section className = "flex flex-row w-full gap-5 h-[280px]">
                    <section className = "flex-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-5 rounded-xl">

                    <ResponsiveChartContainer
                        width={500}
                        height={300}
                        series={
                            [{ type: 'line', data: returningVisitor }, {type : 'line', data : newVisitor}]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                        sx={{
                            [`& .${lineElementClasses.root}`]: {
                            stroke: '#8884d8',
                            strokeWidth: 2,
                            },
                            [`& .${markElementClasses.root}`]: {
                            stroke: '#8884d8',
                            scale: '0.6',
                            fill: '#fff',
                            strokeWidth: 2,
                            },
                        }}
                        disableAxisListener
                        >
                        <LinePlot />
                        <MarkPlot />
                        </ResponsiveChartContainer>
                    </section>
                    <section className ="flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-1/3 p-5 rounded-xl">
                        <section className = "flex flex-row justify-between">
                            <p className = "font-sans text-lg font-semibold">Customer Review</p>
                            <img src = "/sync-outline.png"/>
                        </section>

                        <section className = "flex flex-row">
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            >
                           
                            <Rating name="read-only" value={ratingValue} readOnly />
                            
                            </Box>
                            <p className = "font-sans"><span className = "ml-8 mr-1 font-sans font-bold">4.0/5 </span> </p>
                            
                        </section>
                        <section className = "flex flex-row">
                            5 Stars
                            <p>(400)</p>    
                        </section>
                        <section className = "flex flex-row">
                            4 Stars
                            <p>(300)</p>    
                        </section>
                        <section className = "flex flex-row">
                            3 Stars
                            <p>(23)</p>    
                        </section>
                        <section className = "flex flex-row">
                            2 Stars
                            <p>(43)</p>    
                        </section>
                        <section className = "flex flex-row">
                            1 Star
                            <p>(1)</p>    
                        </section>
                        
                        
                    </section>
                </section>

                <section className = "flex flex-row  justify- h-[200px] items-center gap-10 justify-between ">
                    <section className = "flex flex-col w-1/4  shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center ">
                        <img src = "/CustomerIcon.png" style = {{width : '50px'}}/>
                        <p>Total Customers</p> </section>

                    <section className = "flex flex-col w-1/4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center">
                        <img src = "/OrderIcon.png" style = {{width : '50px'}}/>
                        <p>Order Summary</p>
                    </section>

                    <section className = "flex flex-col w-1/4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center">
                        <img src = "/SalesIcon.png" style = {{width : '50px'}}/>
                        <p>Sales Growth</p>
                    </section>

                </section>


                <section className = "flex flex-row justify-evenly">
                <section className = " flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 rounded-xl">
                    <p>Order Status Pie Chart</p>
                    <p>Shows the order summary of your shop</p>
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
                <section className = "flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 rounded-xl">
                    Best-Selling Categories 
                    <p>Shows the most-sold product categories of your shop</p>
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