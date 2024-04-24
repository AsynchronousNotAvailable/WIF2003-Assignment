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
            name: "Customer Wen Thing",
            last_message:
                "Hello! I bought a product from you, and I would like ",
        },
        {
            pfp: require("../../assets/karweng.jpeg"),
            name: "Customer Kar Weng",
            last_message: "I see alright.",
        },
        {
            pfp: require("../../assets/chenkang.jpg"),
            name: "Customer Chen Kang",
            last_message:
                "The product will be delivered tomorrow. Thank you for your purchase!",
        },
    ];

    const responses1 = [
      
        {
            type: "SELLER",
            text: "Hello! I bought a product from you, and I would like to ask if you have a warranty for it.",
        },
        // {
        //     type: "CUSTOMER",
        //     text: "Yes we do have a warranty for our products. How can I help you?",
        // },
    ];

    const responses2 = [
        {
            type: "SELLER",
            text: "Hi, do you sell any strawberry cheesecake?",
        },
        {
            type: "CUSTOMER",
            text: "Oh no, we do not have any strawberry cheesecake. We only have blueberry cheesecake.",
        },
        {
            type: "SELLER",
            text: "I see alright.",
        },
    ];

    const responses3 = [
        {
            type: "SELLER",
            text: "Hello! Can I know when will the product be delivered?",
        },
        {
            type: "CUSTOMER",
            text: "The product will be delivered tomorrow. Thank you for your purchase!",
        },
    ];

    const allChatContent = {
        "Customer Wen Thing": responses1,
        "Customer Kar Weng": responses2,
        "Customer Chen Kang": responses3,
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
