import React, { useEffect, useState } from "react";
import Seller_NavSidebar from "../../components/seller_sidebar";
import ChatList from "./components/ChatList";
import Chat_Content from "./components/Chat_Content";

function Seller_Chat() {
    const [activeChat, setActiveChat] = useState("Wen Thing");
    const [activeChatContent, setActiveChatContent] = useState([]);
    const [prompt, setPrompt] = useState("");
    const handleChangeChat = (name) => {
        setActiveChat(name);
    }
    const chatList = [
        {
            pfp: require("../../assets/wenthing.jpeg"),
            name: "Wen Thing",
            last_message: "How much is the battery charger?",
        },
        {
            pfp: require("../../assets/karweng.jpeg"),
            name: "Kar Weng",
            last_message: "I see alright.",
        },
        {
            pfp: require("../../assets/chenkang.jpg"),
            name: "Chen Kang",
            last_message: "Will the product be delivered today?",
        },
    ];

    const responses1 = [
      
        {
            type: "CUSTOMER",
            text: "Hello! I am wen thing",
        },
        {
            type: "SELLER",
            text: "I would like a chees cake.",
        },
    ];

    const responses2 = [
        {
            type: "CUSTOMER",
            text: "Hello! I am kar weng",
        },
        {
            type: "SELLER",
            text: "I would like a chees cake.",
        },
    ];

    const responses3 = [
        {
            type: "CUSTOMER",
            text: "Hello! I am chen kang",
        },
        {
            type: "SELLER",
            text: "I would like a chees cake.",
        },
    ];

    const allChatContent = {
        "Wen Thing": responses1,
        "Kar Weng": responses2,
        "Chen Kang": responses3,
    };

    useEffect(() => {
        setActiveChatContent(allChatContent[activeChat]);
        
    }, [activeChat]);

    

    return (
        <>
            <Seller_NavSidebar />
            <div className="ml-64 mt-[60px] ">
                <div className="flex flex-row h-[91vh]">
                    <div className="flex flex-col w-72 bg-slate-100 border-r-[1px] border-gray-200">
                        {chatList.map((chat, index) => (
                            <ChatList
                                active={activeChat === chat.name}
                                key={index}
                                pfp={chat.pfp}
                                name={chat.name}
                                last_message={chat.last_message}
                                handleChangeChat={handleChangeChat}
                            />
                        ))}
                    </div>
                    {activeChat && (
                        <Chat_Content
                            responses={activeChatContent}
                            customer={activeChat}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Seller_Chat;
