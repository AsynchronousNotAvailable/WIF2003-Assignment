import React, {useContext} from 'react'
import UseGetConversations from './Hooks/UseGetConversations'
import { GlobalContext } from '../../../context'
import { useSocketContext } from '../../../context/SocketContext'

const Seller_ConversationList = () => {
    const {allCustomers} = UseGetConversations()
    const {selectedCustomer, setSelectedCustomer} = useContext(GlobalContext)
    console.log(allCustomers)

    const {onlineUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(selectedCustomer._id)



    const handleClickedCustomer = (customer) => {
        console.log("Clicked Customer : ")
        console.log(customer)
        setSelectedCustomer(customer)
    }
        return (
            <div className="flex flex-col w-72 border-r-[1px]  gap-5 ">
            {allCustomers.map((customer) => {
                const pfpLink = `https://avatar.iran.liara.run/username?username=${customer.username}`

                return(
                    <div className = 
                    {`flex flex-row w-full items-center p-3 gap-5 hover:bg-sky-500 cursor-pointer ${selectedCustomer._id === customer._id ? "bg-sky-500" : ""}`}

                    key = {selectedCustomer._id} 
                    onClick = {() => handleClickedCustomer(customer)}>
                        <div className = " flex w-1/4">
                        <div className = {`avatar ${isOnline ? "online placeholder" : ""}`}>
                        <img src = {pfpLink} className = {`avatar ${isOnline? "online placeholder" : ""}`} />
                        </div>
                        </div>
                    <div className = "font-sans font-semibold ">
                    <p>{customer.username}</p>    
                    </div>  
                    <div className="divider"></div> 
                    </div>
                )
            })}
        </div>
     
           )
    
 
}

export default Seller_ConversationList