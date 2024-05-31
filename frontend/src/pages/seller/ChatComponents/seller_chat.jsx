import React, { useEffect, useState } from "react";
import Seller_NavSidebar from "../../../components/seller_sidebar";
import Seller_ConversationList from "./Seller_ConversationList";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

function Seller_Chat() {
    // const [activeChat, setActiveChat] = useState("Wen Thing");
    // const [activeChatContent, setActiveChatContent] = useState([]);
    // const [prompt, setPrompt] = useState("");
    // const handleChangeChat = (name) => {
    //     setActiveChat(name);
    // }
    // const chatList = [
    //     {
    //         pfp: require("../../assets/wenthing.jpeg"),
    //         name: "Customer Wen Thing",
    //         last_message:
    //             "Hello! I bought a product from you, and I would like ",
    //     },
    //     {
    //         pfp: require("../../assets/karweng.jpeg"),
    //         name: "Customer Kar Weng",
    //         last_message: "I see alright.",
    //     },
    //     {
    //         pfp: require("../../assets/chenkang.jpg"),
    //         name: "Customer Chen Kang",
    //         last_message:
    //             "The product will be delivered tomorrow. Thank you for your purchase!",
    //     },
    // ];

    // const responses1 = [
    //     {
    //         type: "SELLER",
    //         text: "Hello! I bought a product from you, and I would like to ask if you have a warranty for it.",
    //     },
    //     // {
    //     //     type: "CUSTOMER",
    //     //     text: "Yes we do have a warranty for our products. How can I help you?",
    //     // },
    // ];

    // const responses2 = [
    //     {
    //         type: "SELLER",
    //         text: "Hi, do you sell any strawberry cheesecake?",
    //     },
    //     {
    //         type: "CUSTOMER",
    //         text: "Oh no, we do not have any strawberry cheesecake. We only have blueberry cheesecake.",
    //     },
    //     {
    //         type: "SELLER",
    //         text: "I see alright.",
    //     },
    // ];

    // const responses3 = [
    //     {
    //         type: "SELLER",
    //         text: "Hello! Can I know when will the product be delivered?",
    //     },
    //     {
    //         type: "CUSTOMER",
    //         text: "The product will be delivered tomorrow. Thank you for your purchase!",
    //     },
    // ];

    // const allChatContent = {
    //     "Customer Wen Thing": responses1,
    //     "Customer Kar Weng": responses2,
    //     "Customer Chen Kang": responses3,
    // };

    // useEffect(() => {
    //     setActiveChatContent(allChatContent[activeChat]);
        
    // }, [activeChat]);

    return (
        <div className="flex flex-row h-screen">
            <div className="">
                <Seller_NavSidebar />
            </div>
            <div className="ml-64 mt-[60px] flex-1 flex flex-col">
                <div className="flex flex-row h-full">
                    <div className="border-r-2 border-gray-300">
                        <Seller_ConversationList />
                    </div>
                    <div className="flex flex-1 h-full flex-col">
                        <div className="flex-1 p-5">
                            <Messages />
                        </div>
                        <div className="mt-auto">
                            <MessageInput />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Seller_Chat;
