import React, { useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Chat_Content from "./components/Chat_Content";
import ChatList from "./components/ChatList";
function Customer_Chat() {
       const [activeChat, setActiveChat] = useState("Koperasi UM");
       const [activeChatContent, setActiveChatContent] = useState([]);
       const [prompt, setPrompt] = useState("");
       const handleChangeChat = (name) => {
           setActiveChat(name);
       };
       const chatList = [
           {
               pfp: "/seller1.png",
               name: "Koperasi UM",
               last_message: "Hi, we have our stock ready",
           },
           {
               pfp: "./kkmart.jpeg",
               name: "KK Mart UM",
               last_message: "I see alright.",
           },
           {
               pfp: "./sportsum.png",
               name: "UM Sports Direct",
               last_message: "Will the product be delivered today?",
           },
       ];

       const responses1 = [
           {
               type: "CUSTOMER",
               text: "Hello!",
           },
           {
               type: "SELLER",
               text: "Hi! What would you like to ask?",
           },
       ];

       const responses2 = [
           {
               type: "CUSTOMER",
               text: "Hello!",
           },
           {
               type: "SELLER",
               text: "Hello there! How can I help you?",
           },
           {
               type: "CUSTOMER",
               text: "Can I refund my order?",
           },
           {
               type: "SELLER",
               text: "Sure but we would charge a fee for that.",
           },
       ];

    const responses3 = [
        {
            type: "CUSTOMER",
            text: "Hello. I would like to ask about the delivery status.",
        },
        {
            type: "SELLER",
            text: "Hello. We will be delivering the product within this 2 days.",
        },
    ];

       const allChatContent = {
           "Koperasi UM": responses1,
           "KK Mart UM": responses2,
           "UM Sports Direct": responses3,
       };

       useEffect(() => {
           setActiveChatContent(allChatContent[activeChat]);
       }, [activeChat]);
    return (
        <>
            <Customer_Navbar />
            <div className=" mt-[60px] ">
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

export default Customer_Chat;
