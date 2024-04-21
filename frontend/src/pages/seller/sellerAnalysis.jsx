import React, { useState } from 'react'
import { GlobalContext } from "../../context";
import Customer_Navbar from '../../components/customer_navbar';
import { useNavigate } from "react-router-dom";
import Seller_Navbar from '../../components/seller_navbar';
import { ChartContainer, ResponsiveChartContainer } from '@mui/x-charts';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';




const App = () => {
const ratingValue = useState(5);
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
        <section className = "flex flex-col ">
            <section className = " w-full font-sans font-bold text-2xl">
               <header className = "">Seller Analysis</header>
            </section>
            <section className = "flex-1  flex flex-col">
                <section className = "flex flex-row">
                    <section className = "border-2 border-blue-800">

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
                    <section className ="flex flex-col border-yellow-600 border-2">
                        <section className = "flex flex-row">
                            <p className = "font-sans text-lg font-semibold">Customer Review</p>
                            <img src = "/sync-outline.png"/>
                        </section>
                        <section className = "flex flex-row">
                
                        </section>
                        
                    </section>
                </section>

                <section className = "flex flex-row">
                    <section className = "">Total Customers </section>
                    <section className = "">Order Summary</section>
                    <section className = "">Sales Growth</section>

                </section>


                <section className = "flex flex-row">
                <section className = "">Order Status Pie Chart</section>
                <section className = "">Best Selling Categories Pie Chart</section>

                </section>

            </section>
        </section>
    )
}

export default App