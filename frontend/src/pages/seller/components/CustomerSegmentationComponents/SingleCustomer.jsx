import React, {useEffect, useContext, useState} from 'react'
import { GlobalContext } from '../../../../context'
import axios from 'axios';

const SingleCustomer = () => {
    const {userDetails} = useContext(GlobalContext);
    const sellerId = userDetails._id;
    const [customerStats, setCustomerStats] = useState([]);

    useEffect(() => {
        const fetchCustomerStats = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/sales/${sellerId}/customerStats`)
                setCustomerStats(res.data)
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchCustomerStats();
    } , [])
    return (
        customerStats.length > 0 ? (
          <div className=" mt-10">
          <div className = "grid grid-cols-7">
            
            <div className = "font-sans font-semibold text-xl">
              Customer Name
            </div>

            <div className = "font-sans font-semibold text-xl text-wrap w-[100px]">
              Customer Display Image
            </div>

    
            <div className = "font-sans font-semibold text-xl">
            Type of Buyer
            </div>
    
            <div className = "font-sans font-semibold text-xl">
              Number of Orders
            </div>

            <div className = "font-sans font-semibold text-xl">
              Total Spent [RM]
            </div>

            <div className = "font-sans font-semibold text-xl">
              Average Order Value [RM/Order]
            </div>

            <div className = "font-sans font-semibold text-xl">
              Last Purchase Date
            </div>
          </div>
    
          {customerStats.map((customer,index) => (
            
            <div  className = "grid grid-cols-7 p-10  mt-10 items-center rounded-xl shadow-2xl">
              <div className = "font-sans font-semibold text-lg ">
                {customer.name}
              </div>

              <div className = "">
                <img src = {customer.img} className = "rounded-xl max-w-[250px] max-h-[200px]" />
              </div>
    
              <div className = "font-sans font-semibold text-lg">
              {customer.totalOrders > 5 ? "Frequent Buyer" : (customer.totalOrders > 2 ? "Occasional Buyer" : "New Buyer")}
              </div>
            
              <div className = "font-sans font-semibold text-lg ">
                {customer.totalOrders}
              </div>

              <div className = "font-sans font-semibold text-lg ">
                {customer.totalSpent}
              </div>

              <div className = "font-sans font-semibold text-lg ">
              {(customer.totalSpent / customer.totalOrders).toFixed(2)}
              </div>
            
              <div className = "font-sans font-semibold text-lg ">
            
            {new Date (customer.lastOrder).toLocaleString("en-US", {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second : "2-digit",
                hour12 : false
            })}        

                
              </div>
    
              </div>
          ))}
          </div>
        )
        : 
        (
          <div className = "text-5xl font-bold font-sans">
            No Customer Analysis. Make more sales bro.
          </div>
        )
      )
}

export default SingleCustomer