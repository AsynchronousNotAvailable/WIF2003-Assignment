import React, { useContext, useEffect, useState } from "react";
import {useSearchParams} from 'react-router-dom'
import Customer_Navbar from "../../../components/customer_navbar";
import Chat_Content from "../components/Chat_Content";
import ChatList from "../components/ChatList";
import axios from 'axios'
import MessageInput from "./MessageInput";
import { GlobalContext } from "../../../context";
import Customer_ConversationList from "./Customer_ConversationList";
import Messages from "./Messages";
import useGetConversations from "./Hooks/useGetConversations";
function Customer_Chat() {
   //ok i put everything as global, for easier look now cuz it looks messy if some is and some isnt
    const {customer,selectedSeller,userDetails,setSelectedSeller,allSellers,setAllSellers} = useContext(GlobalContext);
        
     // it works wow

    const {conversations} = useGetConversations();
    setAllSellers(conversations)

    return (
        <>
            <Customer_Navbar />
            <div className=" mt-[70px] relative h-[93vh] border-2">
                <div className="flex flex-row h-full">
               
                <Customer_ConversationList />

                <div className = "  flex flex-col flex-1 relative pt-5 h-full border-2 border-yellow-600">
                    <div className = "flex-1 overflow-y-auto px-5">
                    <Messages/>
 
                    </div>
                   <div className = "mt-auto  ">
                    <MessageInput />
                   </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Customer_Chat;


// <div className = "flex flex-col px-5">
//                     <div className="chat chat-start ">
//                     <div className="chat-image avatar">
//                         <div className="w-10 rounded-full">
//                         <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//                         </div>
//                     </div>
//                     <div className="chat-header">
//                         Obi-Wan Kenobi
//                         <time className="text-xs opacity-50">12:45</time>
//                     </div>
//                     <div className="chat-bubble bg-gray-400">You were the Chosen One!</div>
//                     <div className="chat-footer opacity-50">
                       
//                     </div>
//                     </div>
//                     <div className="chat chat-end">
//                     <div className="chat-image avatar">
//                         <div className="w-10 rounded-full">
//                         <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//                         </div>
//                     </div>
//                     <div className="chat-header">
//                         Anakin
//                         <time className="text-xs opacity-50">12:46</time>
//                     </div>
//                     <div className="chat-bubble bg-sky-500">I hate you!</div>
//                     <div className="chat-footer opacity-50">
                        
//                     </div>
//                     </div>
//                     </div>