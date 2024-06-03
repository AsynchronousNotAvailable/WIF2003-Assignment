import React, {useState,useEffect,useContext} from 'react'
import { GlobalContext } from '../../../../context';
import axios from 'axios';

const SingleInteractedProduct = () => {
  const [interactedProducts,setInteractedProducts] = useState([]);
  const {userDetails} = useContext(GlobalContext);
  const sellerId = userDetails._id;

  useEffect( () => {
    const fetchInteractedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:1234/api/sales/${sellerId}/topWishlistedProducts`)
        setInteractedProducts(response.data)
        console.log(response.data)
      } catch (error) {
        throw new Error(error)
      }
    }

    fetchInteractedProducts();
  } , [])

  return (
    interactedProducts.length > 0 ? (
      <div className=" mt-10">
      <div className = "grid grid-cols-4">
        <div className = "font-sans font-semibold text-xl">
          Product Name
        </div>

        <div className = "font-sans font-semibold text-xl">
          Product Image
        </div>

        <div className = "font-sans font-semibold text-xl">
        Wishlist Count
        </div>

        <div className = "font-sans font-semibold text-xl">
          Cart Count
        </div>
      </div>

      {interactedProducts.map((product,index) => (
        <div  className = "grid grid-cols-4 p-10 gap-5 mt-10 items-center rounded-xl shadow-2xl">
          <div className = "font-sans font-semibold text-lg ">
            {product.productName}
          </div>
          <div className = "">
            <img src = {product.productImage} className = "max-w-[250px] max-h-[200px]" />
          </div>

          <div className = "font-sans font-semibold text-lg ">
            {product.wishlistCount}
          </div>

          <div className = "font-sans font-semibold text-lg ">
            {product.cartCount}
          </div>

          </div>
      ))}
      </div>
    )
    : 
    (
      <div className = "text-5xl font-bold font-sans">
        No Top Selling Products. Make more sales bro.
      </div>
    )
  )
}

export default SingleInteractedProduct