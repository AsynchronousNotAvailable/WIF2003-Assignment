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
  'Phillipines',
  'Indonesia',
  'Korea',
  'Japan',
  'Malaysia',
  'Singapore',
  'China',
];
    return (
        <>
        <Seller_NavSidebar/>
        <section className = "flex flex-col p-14 ml-64 mt-[10px] gap-8">
            <section className = " w-full font-sans font-bold text-2xl">
               <header className = "font-sans">Seller Analysis</header>
            </section>
            <section className = "flex-1  flex flex-col w-full gap-10 h-full">
                <section className = "flex flex-row w-full gap-5 h-[280px]">
                    <section className = "flex-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-5 rounded-xl">
                    <LineChart
                    width={500}
                    height={250}
                    series={[
                        { data: returningVisitor, label: 'Returning Visitor', area : true, fillOpacity : 0.3  },
                        { data: newVisitor, label: 'New Visitor', area : true, fillOpacity : 0.3 },
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
                      
                        },
                        area: {
                            visible: true, // Set to true to display area below the lines
                            opacity: 1, // Adjust the opacity of the area fill as needed
                        }
                    }}
                    />

                    {/* <ResponsiveChartContainer
                        width={500}
                        height={300}
                        series={
                            [{ area : true,type: 'line', data: returningVisitor, label : 'Returning Visitor', stroke : '#4FC3F7', mark : {fill : '#4FC3F7'} }, {type : 'line', data : newVisitor, label : 'New Visitor', stroke : "#2961FF", mark : {fill : '#2961FF'}}]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                        sx={{
                            [`& .${lineElementClasses.root}`]: {
                            strokeWidth: 2,
                            },
                            [`& .${markElementClasses.root}`]: {
                          
                            scale: '0.6',
                            strokeWidth: 2,
                            },
                        }}
                        >
                        <LinePlot />
                        <MarkPlot />
                        </ResponsiveChartContainer> */}
                    </section>
                    <section className ="flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-1/3 p-5 rounded-xl">
                        <section className = "flex flex-row justify-between">
                            <p className = "font-sans text-lg font-semibold">Customer Review</p>
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
                        <img src = "/CustomerIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-sans font-semibold mt-[20px]">Total Customers</p> </section>

                    <section className = "flex flex-col w-1/4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center">
                        <img src = "/OrderIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-sans font-semibold mt-[20px]">Order Summary</p>
                    </section>

                    <section className = "flex flex-col w-1/4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl h-full justify-center items-center">
                        <img src = "/SalesIcon.png" style = {{width : '50px'}}/>
                        <p className = "font-semibold font-sans mt-[20px]">Sales Growth</p>
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
                    <span className = "font-sans font-bold">Best-Selling Categories</span>
                    <p className = "font-sans text-[#616262]">Shows the most-sold product categories of your shop</p>
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