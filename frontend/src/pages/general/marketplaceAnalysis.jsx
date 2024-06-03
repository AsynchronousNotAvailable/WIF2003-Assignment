import React, { useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Seller_NavSidebar from "../../components/seller_sidebar";
import { LineChart } from '@mui/x-charts/LineChart';
import axios from "axios";

function MarketplaceAnalysis() {
    const [productCategories,setProductCategories] = useState([])
    const [monthlySales, setMonthlySales] = useState("")
    const [bestSellingProducts, setBestSellingProducts] = useState([])
    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/sales/marketplace/orderCategories`)
                setProductCategories(res.data)    
            } catch (error) {
                throw new Error(error)
            }
        }

        const fetchMonthlySales = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/sales/marketplace/monthlySales`)
                setMonthlySales(res.data)
            } catch (error) {
                throw new Error(error)
            }
        }

        const fetchBestSellingProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/sales/marketplace/bestSellingProducts`)
                setBestSellingProducts(res.data)
                
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchProductCategories()
        fetchMonthlySales();
        fetchBestSellingProducts()
    } , [])

    const ExistingUsers = {
        data: [1000, 3000, 2000, 1500, 4000, 3050, 2300],
        label: "Existing Users",
    };
    const NewUsers = {
        data: [300, 1500, 420, 69, 1905, 2000, 3042],
        label: "New Users",
    };

    const listingsRM = [40000, 30200, 10000, 27804, 10090, 38000, 43000];
    const sumListings = listingsRM.reduce((acc, currentValue) => acc + currentValue, 0);

    const salesRM = [24000, 13980, 8008, 3908, 6800, 23900, 33000];
    const sumSales = salesRM.reduce((acc, currentValue) => acc + currentValue, 0);

    // const daysLabel = [
    //   'Mon',
    //   'Tue',
    //   'Wed',
    //   'Thu',
    //   'Fri',
    //   'Sat',
    //   'Sun',
    // ];
    const monthsLabel = Object.keys(monthlySales);
    const salesData = Object.values(monthlySales);

    const xAxisLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const pieChartData = Object.entries(productCategories).map(([key,value]) => {
        return {
            label : key,
            value : value
        }
    })
  
    return (
        <div className = "overflow-hidden h-screen">
            <Customer_Navbar />
            <main className="mt-10 p-20 flex flex-col gap-5">
                <section className=" w-full font-sans font-bold text-3xl">
                    <header>Marketplace Analysis</header>
                </section>
                <section className=" w-full  flex flex-row gap-5">
                    <section className=" w-1/2 flex flex-col gap-5">
                        <section className="flex flex-col gap-10 shadow-xl p-5 rounded-lg">
                            <header className="text-2xl font-bold font-sans tracking-normal">
                                Total Sales This Month
                            </header>
                            <section className="flex flex-row">
                                <section className="flex flex-col w-1/2">
                                    <header className="text-base font-bold font-sans tracking-normal">
                                        Total Sales
                                    </header>
                                    <p className="text-gray-500 text-xs mb-5 font-sans">
                                        Updated monthly
                                    </p>

                                    <section className="flex flex-row items-end pb-4">
                                        <p className="text-xl font-bold tracking-tight mr-3 font-sans">
                                            RM{salesData[salesData.length-1]}
                                        </p>
                                        <p className=" text-col text-myCyan text-bottom font-bold text-sm font-sans">
                                            RM{salesData[salesData.length-2]}
                                        </p>
                                    </section>

                                    <section className="flex flex-col align-middle justify-center">
                                        <p className="text-xs">
                                            <span className="text-myGreen font-bold font-sans">
                                                &#8593;{ (((salesData[salesData.length-1] - salesData[salesData.length-2]) / salesData[salesData.length - 2])* 100).toFixed(2) }
                                            </span>{" "}
                                            <span className="text-gray-700 font-sans text-xs">
                                                vs last month
                                            </span>
                                        </p>
                                    </section>
                                </section>

                                <section className="">
                                <LineChart
                                    width={500}
                                    height={300}
                                    series={[
                                        { data: salesData, label: 'Sales (RM)' },
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: monthsLabel }]}
                                    />
                                </section>
                            </section>
                        </section>
                        <section className="flex flex-col shadow-xl pt-10 pl-5 rounded-lg">
    <header className="text-2xl font-bold font-sans">
        Best Selling Products This Month
    </header>
    <section className="grid grid-cols-4 mt-5 ">
        <section className="font-sans font-bold">
            Product Name
        </section>
        <section className = "font-sans font-bold">
            Product Image
        </section>
        <section className="font-sans font-bold">
            Price
        </section>
        <section className="font-sans font-bold">
            Quantity Sold
        </section>
    </section>

    {bestSellingProducts ? (
        <section className="grid mt-5 grid-cols-4 pb-4 gap-4 ">
            {bestSellingProducts.map((product, index) => (
                <React.Fragment key={index}>
                    <section className="font-sans w-[100px] font-semibold  p-2">
                      <p className = "text-wrap">{product.productName}</p>  
                    </section>
                    <section className ="w-[80px]">
                        <img src = {product.productImg} />
                    </section>
                    <section className="font-sans font-semibold  p-2">
                        RM{product.pricePerUnit}
                    </section>
                    <section className="font-sans font-semibold p-2">
                        {product.totalQuantitySold}
                    </section>
                </React.Fragment>
            ))}
        </section>
    ) : null}
</section>

                    </section>

                    <section className=" flex-1 shadow-2xl p-10 rounded-lg flex-col">
                        <header className="text-2xl font-bold font-sans tracking-normal ">
                        {/* text-2xl font-bold tracking-wide mb-5 */}
                            Best Selling Product Category Distribution
                        </header>
                        <div className = "flex flex-row align-middle items-center justify-center mt-14 flex-1">
                        <PieChart
                          margin={{ top: 200, bottom: 100, left : 200 }}
                          sx={{
                           className : "font-sans"
                          }}
                            series={[
                                {
                                    outerRadius: 200,
                                    data: pieChartData,
                                    
                                },
                            ]}
                            slotProps={{
                                legend: {
                                    direction: "column",
                                    position: {
                                        vertical: "top",
                                        horizontal: "left",
                                    },
                                },
                            }}
                            height={500}
                            width={500}
                            
                        />
                        </div>
                       
                    </section>
                </section>
            </main>
        </div>
    );
}

export default MarketplaceAnalysis;
