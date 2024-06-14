import React from 'react'
import SingleCustomer from './SingleCustomer'
import Seller_NavSidebar from '../../../../components/seller_sidebar'
const CustomerSegmentationPage = () => {
    return (
        <div>
            <div>
            <Seller_NavSidebar />
            </div>
    
            <div className = "flex flex-col font-sans p-14 ml-64 mt-10">
                <div className = "text-3xl font-bold">
                    Customer Segmentation Analysis
                </div>
    
                <div className = "flex flex-row justify-between mt-10 ml-10">
                <div className = "text-2xl font-semibold ">
                    Your Customers
                </div>
                </div>
                
    
                <div>
                    <SingleCustomer/>
                </div>
            </div>
        </div>
      )
}

export default CustomerSegmentationPage