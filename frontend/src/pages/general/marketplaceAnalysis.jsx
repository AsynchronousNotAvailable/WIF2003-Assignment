import React from "react";
import { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Seller_NavSidebar from "../../components/seller_sidebar";
import { LineChart } from '@mui/x-charts/LineChart';

function MarketplaceAnalysis() {
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

    const daysLabel = [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ];

    const xAxisLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const pieChartData = [
        {
            id: 0,
            label: "Electronics",
            value: 500,
            color: "#5489FC",
        },
        {
            id: 1,
            label: "Health & Wellness",
            value: 200,
            color: "#7450DF",
        },
        {
            id: 2,
            label: "Groceries",
            value: 300,
            color: "#E7C6FF",
        },
    ];
    return (
        <>
            <Customer_Navbar />
            <main className="mt-[10px] p-16 flex flex-col gap-5">
                <section className=" w-full font-sans font-bold text-3xl align-middle justify-center text-center  py-5">
                    <header>Marketplace Analysis</header>
                </section>
                <section className=" w-full  flex flex-row gap-5">
                    <section className=" w-1/2 flex flex-col gap-5">
                        <section className="flex flex-col gap-10 shadow-xl p-5 rounded-lg">
                            <header className="text-2xl font-bold font-sans tracking-normal">
                                Total Sales Today
                            </header>
                            <section className="flex flex-row">
                                <section className="flex flex-col w-1/2">
                                    <header className="text-base font-bold font-sans tracking-normal">
                                        Total Listings & Sales
                                    </header>
                                    <p className="text-gray-500 text-xs mb-5 font-sans">
                                        Updated weekly
                                    </p>

                                    <section className="flex flex-row items-end pb-4">
                                        <p className="text-xl font-bold tracking-tight mr-3 font-sans">
                                            RM{sumListings}
                                        </p>
                                        <p className=" text-col text-myCyan text-bottom font-bold text-sm font-sans">
                                            RM{sumSales}
                                        </p>
                                    </section>

                                    <section className="flex flex-col align-middle justify-center">
                                        <p className="text-xs">
                                            <span className="text-myGreen font-bold font-sans">
                                                &#8593;8.56 %
                                            </span>{" "}
                                            <span className="text-gray-700 font-sans text-xs">
                                                vs last week
                                            </span>
                                        </p>
                                    </section>
                                </section>

                                <section className="">
                                <LineChart
                                    width={500}
                                    height={300}
                                    series={[
                                        { data: listingsRM, label: 'Listings (RM)' },
                                        { data: salesRM, label: 'Sales (RM)' },
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: daysLabel }]}
                                    />
                                </section>
                            </section>
                        </section>
                        <section className="flex flex-col shadow-xl p-10 rounded-lg">
                            <header className="text-2xl font-bold font-sans">
                                Total Visitors For The Past Week
                            </header>
                            <section className = "flex mt-5">
                            <BarChart
                                width={500}
                                height={300}
                                series={[
                                    { ...ExistingUsers, stack: "total" },
                                    { ...NewUsers, stack: "total" },
                                ]}
                                xAxis={[
                                    { data: xAxisLabels, scaleType: "band" },
                                ]}
                            />

                            </section>
                           
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
        </>
    );
}

export default MarketplaceAnalysis;
