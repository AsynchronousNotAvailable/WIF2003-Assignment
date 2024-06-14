import React, { useContext } from 'react';
import { GlobalContext } from "../../../context";

const Message = ({ message }) => {
    
    const { userDetails,customer, selectedSeller, allMessages } = useContext(GlobalContext);
    const isMe = message.senderId === userDetails._id;
    const chatClass = isMe ? "chat chat-end" : "chat chat-start";
    const chatBubbleBg = isMe ? "bg-gray-400" : "bg-sky-500";
    const chatBubbleName = isMe ? userDetails.username : selectedSeller.username
    const chatPfp = isMe ? userDetails.pfp : selectedSeller.pfp

    return (
        <div className = {`${chatClass}`}>
            <div className = "chat-image avatar">
                <div className = "w-10 rounded-full">
                    <img src= {chatPfp} />
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