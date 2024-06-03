import React from 'react'
import Seller_NavSidebar from '../../../../components/seller_sidebar'
import SinglePopularProduct from './SinglePopularProduct'
import { useNavigate } from 'react-router-dom'
const PopularProductAnalysisPage = () => {
const navigate = useNavigate();
  return (
    <div>
        <div>
        <Seller_NavSidebar />
        </div>

        <div className = "flex flex-col font-sans p-14 ml-64 mt-10">
            <div className = "text-3xl font-bold">
                Popular Product Analysis
            </div>

            <div className = "flex flex-row justify-between mt-10 ml-10">
            <div className = "text-2xl font-semibold ">
                Top Selling Products
            </div>

            <div className="join">
                <button className="join-item btn"></button>
                <button className="join-item btn">Next</button>
                <button onClick = {() => navigate("/seller/analysis/interacted_products") } className="join-item btn">»</button>
            </div>
            </div>
            

            <div>
                <SinglePopularProduct/>
            </div>
        </div>
    </div>
  )
}

export default PopularProductAnalysisPage