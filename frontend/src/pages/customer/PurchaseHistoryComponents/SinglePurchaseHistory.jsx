import React, {useState,useContext,useEffect} from 'react'
import { GlobalContext } from '../../../context'
import axios from 'axios'

const SinglePurchaseHistory = () => {
  const {userDetails} = useContext(GlobalContext)
  const customerId = userDetails._id
  const [purchaseHistory, setPurchaseHistory] = useState("")

  useEffect( () => {
    const fetchPurchaseHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:1234/api/customers/analysis/${customerId}/purchaseHistory`)
        setPurchaseHistory(res.data)
      } catch (error) {
        throw new Error(error)
      }
    }
    fetchPurchaseHistory()
  } , [])

  return (
    purchaseHistory.length > 0 ? (
      <div className=" mt-10">
      <div className = "grid grid-cols-8">
        <div className = "font-sans font-semibold text-xl">
          Product Name
        </div>

        <div className = "font-sans font-semibold text-xl">
          Product Image
        </div>

        <div className = "font-sans font-semibold text-xl">
        Seller 
        </div>

        <div className = "font-sans font-semibold text-xl">
          Price Per Unit [RM]
        </div>

        <div className = "font-sans font-semibold text-xl">
          Quantity
        </div>

        <div className = "font-sans font-semibold text-xl">
          Total Order Price [RM]
        </div>

        <div className = "font-sans font-semibold text-xl">
          Purchase Date
        </div>

        <div className = "font-sans font-semibold text-xl">
          Delivery Date
        </div>

       
      </div>

      {purchaseHistory.map((purchase,index) => (
        <div  className = "grid grid-cols-8 p-10 mt-10 items-center rounded-xl shadow-2xl">
          <div className = "font-sans font-semibold text-lg ">
            {purchase.name}
          </div>
          <div className = "">
            <img src = {purchase.img} className = "max-w-[250px] max-h-[200px]" />
          </div>

          <div className = "font-sans font-semibold text-lg ">
            {purchase.sellerName}
          </div>

          <div className = "font-sans font-semibold text-lg ">
            {purchase.pricePerUnit}
          </div>

          <div className = "font-sans font-semibold text-lg ">
            {purchase.quantity}
          </div>

          <div className = "font-sans font-semibold text-lg ">
            {purchase.totalPricePerOrder}
          </div>

          <div className = "font-sans font-semibold text-lg ">
          {new Date (purchase.orderPlacedDate).toLocaleString("en-US", {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second : "2-digit",
                hour12 : false
            })}  
          </div>

          <div className = "font-sans font-semibold text-lg ">
            {typeof purchase.orderReceivedDate === 'String' ? "purchase.orderReceivedDate" : 
            new Date (purchase.orderReceivedDate).toLocaleString("en-US", {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second : "2-digit",
              hour12 : false,
              timeZone: 'Asia/Kuala_Lumpur'
          })
            }
          </div>

          </div>
      ))}
      </div>
    )
    : 
    (
      <div className = "text-5xl font-bold font-sans">
        No purchases made. Excite the economy bro.
      </div>
    )
  )
}

export default SinglePurchaseHistory