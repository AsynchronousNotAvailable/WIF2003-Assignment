import React from 'react'

import SingleInteractedProduct from './SingleInteractedProduct'
import Seller_NavSidebar from '../../../../components/seller_sidebar'
import { useNavigate } from 'react-router-dom'
const ProductInteractivityAnalysisPage = () => {
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
                    Wishlisted Products
                </div>
    
                <div className="join">
                    <button onClick = {() => navigate("/seller/analysis/popular_products")}className="join-item btn">«</button>
                    <button className="join-item btn">Back</button>
                    <button className="join-item btn"></button>
                </div>
                </div>
                
    
                <div>
                    <SingleInteractedProduct/>
                </div>
            </div>
        </div>
      )
}

export default ProductInteractivityAnalysisPage