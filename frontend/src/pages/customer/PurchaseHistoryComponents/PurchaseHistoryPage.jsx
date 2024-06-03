import React from 'react'
import SinglePurchaseHistory from './SinglePurchaseHistory'
import Customer_Navbar from '../../../components/customer_navbar'
const PurchaseHistoryPage = () => {
  return (
    <div>
        <div>
        <Customer_Navbar/>
        </div>

        <div className = "flex flex-col font-sans p-14 mt-10">
            <div className = "text-3xl font-bold">
                Purchase History
            </div>

            <div className = "flex flex-row justify-between mt-10 ml-10">
            <div className = "text-2xl font-semibold ">
                View your purchase history here
            </div>


            </div>
            

            <div>
                <SinglePurchaseHistory/>
            </div>
        </div>
    </div>
  )
}

export default PurchaseHistoryPage