import React, {useContext} from 'react'
import UseGetConversations from './Hooks/UseGetConversations'
import { GlobalContext } from '../../../context'
import { useSocketContext } from '../../../context/SocketContext'
import default_seller_image from '../../../assets/default_seller_image.png';
const Seller_ConversationList = () => {
    const {allCustomers} = UseGetConversations()
    const {selectedCustomer, setSelectedCustomer} = useContext(GlobalContext)
    console.log(allCustomers);
    console.log(selectedCustomer)

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

                return (
                    <div
                        className={`flex flex-row w-full items-center p-3 gap-5 hover:bg-sky-500 cursor-pointer ${
                            selectedCustomer._id === customer._id
                                ? "bg-sky-500"
                                : ""
                        }`}
                        key={customer._id}
                        onClick={() => handleClickedCustomer(customer)}
                    >
                        <div className="  w-1/4 rounded-full flex">
                            <img
                                src={
                                    customer.pfp == undefined ||
                                    customer.pfp == ""
                                        ? default_seller_image
                                        : customer.pfp
                                }
                                className="rounded-full"
                            />
                        </div>
                        <div className="font-sans font-semibold ">
                            <p>{customer.username}</p>
                        </div>
                        <div className="divider"></div>
                    </div>
                );
            })}
        </div>
     
           )
    
 
}

export default Seller_ConversationList