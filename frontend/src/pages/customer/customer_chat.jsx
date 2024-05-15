import React, { useContext, useEffect, useState } from "react";
import {useSearchParams} from 'react-router-dom'
import Customer_Navbar from "../../components/customer_navbar";
import Chat_Content from "./components/Chat_Content";
import ChatList from "./components/ChatList";
import axios from 'axios'
import { GlobalContext } from "../../context";
function Customer_Chat() {
   
    const [allSellers, setAllSellers] = useState([]);
    const {customer} = useContext(GlobalContext);
    const customerId = customer._id

    const [selectedSeller, setSelectedSeller] = useState();
    
    const handleClickedSeller = (sellerId) => {
        console.log(sellerId);
        setSelectedSeller(sellerId);
    }
    
     // it works wow

    useEffect(() => {
        
        const fetchAllSellers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/customers/${customerId}/sellers`);
                // setAllSellers(response.data); 
                setAllSellers(response.data)
            } catch (error) {
                console.error("Error fetching sellers:", error);
            }
        };

        fetchAllSellers();
    }, []); 

    return (
        <>
            <Customer_Navbar />
            <div className=" mt-[60px] ">
                <div className="flex flex-row h-[91vh]">
                    <div className="flex flex-col w-72 bg-slate-100 border-r-[1px] py-5 gap-5 border-gray-200">
                    {allSellers.map((seller) => {
                        const pfpLink = `https://avatar.iran.liara.run/username?username=${seller.username}`
                
                        return(
                            <div className = 
                            {`flex flex-row w-full items-center p-3 gap-5 hover:bg-sky-500 cursor-pointer ${selectedSeller === seller._id ? "bg-sky-500" : ""}`}

                            key = {seller._id} 
                            onClick = {() => handleClickedSeller(seller._id)}>
                                <div className = " w-1/4  flex">
                                <img src = {pfpLink} className = "" />
                                </div>
                            <div className = "font-sans font-semibold ">
                            <p>{seller.username}</p>    
                            </div>  
                            <div className="divider"></div> 
                             </div>
                        )
                    })}

                    </div>
                   
                </div>
            </div>
        </>
    );
}

export default Customer_Chat;
