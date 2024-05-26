import React, { useContext } from 'react';
import { GlobalContext } from "../../../context";

const Message = ({ message }) => {
    console.log("Message Component is ran");
    console.log(message);
    
    const { userDetails,customer, selectedSeller, allMessages } = useContext(GlobalContext);
    console.log(userDetails)
    console.log(customer)
    console.log(selectedSeller)
    const isMe = message.senderId === userDetails.customer._id;
    const chatClass = isMe ? "chat chat-end" : "chat chat-start";
    const chatBubbleBg = isMe ? "bg-gray-400" : "bg-sky-500";
    const chatBubbleName = isMe ? customer.username : selectedSeller.username

    return (
        <div className = {`${chatClass}`}>
            <div className = "chat-image avatar">
                <div className = "w-10 rounded-full">
                    <img src= "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className = "chat-header">
                {chatBubbleName}
            </div>
            <div className = {`chat-bubble ${chatBubbleBg}`}>
                {message.message}
                </div> 
        </div>
    );
}

export default Message;

    /* if it is not me
    chat chat-start
    bg-sky-500
    chat header = seller Name

    if it is me
    chat chat-end
    bg-gray-400
    chat header = my name

    but how do i know if it is me, if i dont have the message passed to me?
    */
    //img =  <img src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />