import React, { useState, useContext } from "react";
import useGetMessages from "../ChatComponents/Hooks/useGetMessages";
import useGetAllChats from "../../../hooks/useGetAllChats";

import Message from "../ChatComponents/Message";
import { GlobalContext } from "../../../context";
import useListenMessages from "../../../hooks/useListenMessages";
function FloatingChatList({ chatList, handleChatClick }) {
    useListenMessages()
    console.log(chatList);
    const goToFloatingChatContent = (name) => {
        handleChatClick(name);
        
    };

    return (
        <div className="fixed bg-white bottom-5 right-20 flex flex-col rounded-tl-lg rounded-tr-lg w-80 h-96 shadow-2xl">
            <div className="flex h-10 bg-slate-400 shadow-lg w-full px-5 py-2 rounded-tl-lg rounded-tr-lg">
                <h1 className="font-sans font-semibold">Messages</h1>
            </div>
            {chatList.map((chat) => (
                <ChatList
                    active={chat.active}
                    pfp={chat.customerId.pfp}
                    name={chat.customerId.username}
                    last_message={chat.messages[chat.messages.length - 1].message}
                    goToFloatingChatContent={goToFloatingChatContent}
                />
            ))}
        </div>
    );
}

export default FloatingChatList;

function ChatList({
    active,
    pfp,
    name,
    last_message,
    goToFloatingChatContent,
    
}) {
    useListenMessages();
    return (
        
            <div
                className={`flex flex-row items-center gap-2 border-b-[1px] px-6 py-6 border-gray-200 cursor-pointer "bg-slate-100" hover:bg-slate-500`}
                onClick={() => goToFloatingChatContent(name)}
            >
                <div className="min-w-max ">
                    <img
                        className="h-16 w-16 object-fill rounded-full "
                        src={pfp}
                        alt="Chatbot Logo"
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="font-inter font-medium">{name}</h3>
                    <p className="font-inter font-thin text-sm">
                        {last_message}
                    </p>
                </div>
            </div>
       
    );
}
