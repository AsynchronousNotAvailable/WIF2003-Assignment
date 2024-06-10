import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from "../../../context";


const Customer_ConversationList = () => {
    const {customer,selectedSeller,setSelectedSeller,allSellers,setAllSellers} = useContext(GlobalContext);
   console.log(allSellers);
    // console.log(selectedSeller)
    const handleClickedSeller = (sellerId) => {
        const targetedSeller = allSellers.find((seller) => seller._id === sellerId)
        console.log(targetedSeller);
        setSelectedSeller(targetedSeller)
    }
    return (
        <div className="flex flex-col w-72  bg-slate-100 border-r-[1px] py-5 gap-5 ">
            {allSellers.map((seller) => {

                return(
                    <div className = 
                    {`flex flex-row w-full items-center p-3 gap-5 hover:bg-sky-500 cursor-pointer ${selectedSeller._id === seller._id ? "bg-sky-500" : ""}`}

                    key = {seller._id} 
                    onClick = {() => handleClickedSeller(seller._id)}>
                        <div className = " w-1/4 rounded-full flex">
                        <img src = {seller.pfp} className = "rounded-full" />
                        </div>
                    <div className = "font-sans font-semibold ">
                    <p>{seller.username}</p>    
                    </div>  
                    <div className="divider"></div> 
                    </div>
                )
            })}
        </div>
    )
//     console.log(allSellers)
//     console.log(selectedSeller)
   
//     <div className="flex flex-col w-72  bg-slate-100 border-r-[1px] py-5 gap-5 ">
//     {allSellers.map((seller) => {
//     const pfpLink = `https://avatar.iran.liara.run/username?username=${seller.username}`

//     return(
//         <div className = 
//         {`flex flex-row w-full items-center p-3 gap-5 hover:bg-sky-500 cursor-pointer ${selectedSeller === seller._id ? "bg-sky-500" : ""}`}

//         key = {seller._id} 
//         onClick = {() => handleClickedSeller(seller._id)}>
//             <div className = " w-1/4  flex">
//             <img src = {pfpLink} className = "" />
//             </div>
//         <div className = "font-sans font-semibold ">
//         <p>{seller.username}</p>    
//         </div>  
//         <div className="divider"></div> 
//          </div>
//     )
// })}
// </div>
}
export default Customer_ConversationList