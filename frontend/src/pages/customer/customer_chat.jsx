import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Chat_Content from "./components/Chat_Content";
import ChatList from "./components/ChatList";
import { GlobalContext } from "../../context";
function Customer_Chat() {
    const [activeChat, setActiveChat] = useState("");
    const [activeChatContent, setActiveChatContent] = useState([]);
    const [prompt, setPrompt] = useState("");
    const handleChangeChat = (name) => {
        setActiveChat(name);
    };
    //    const chatList = [
    //        {
    //            pfp: "/seller1.png",
    //            name: "Koperasi UM",
    //            last_message: "Hi, we have our stock ready",
    //        },
    //        {
    //            pfp: "./kkmart.jpeg",
    //            name: "KK Mart UM",
    //            last_message: "I see alright.",
    //        },
    //        {
    //            pfp: "./sportsum.png",
    //            name: "UM Sports Direct",
    //            last_message: "Will the product be delivered today?",
    //        },
    //    ];

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
        Koperasi_UM: responses1,
        KK_Mart_UM: responses2,
        UM_Sports_Direct: responses3,
        Zus_Coffee_UM: responses3,
    };
    const { orderHistory } = useContext(GlobalContext);

    const fetchChatListFromOrders = () => {
        let chatLists = [];
        orderHistory.map((order) => {
            const chatHeader = {
                active: false,
                name: order.orderItems[0].seller,
                pfp:
                    order.orderItems[0].seller === "Koperasi_UM"
                        ? "/seller3.png"
                        : order.orderItems[0].seller === "KK_Mart_UM"
                        ? "/seller4.png"
                        : order.orderItems[0].seller === "Zus_Coffee_UM"
                        ? "/seller5.png"
                        : "/seller1.png",
                last_message:
                    order.orderItems[0].seller === "Koperasi_UM"
                        ? "Hi! What would you like to ask?"
                        : order.orderItems[0].seller === "KK_Mart_UM"
                        ? "Sure but we would charge a fee for that."
                        : order.orderItems[0].seller === "Zus_Coffee_UM"
                        ? "Hello. We will be delivering the product within this 2 days."
                        : "Hello there! How can I help you?",
            };
            chatLists.push(chatHeader);
        });
        setChatList(chatLists);
    };

    useEffect(() => {
        fetchChatListFromOrders();
    }, []);

    const [chatList, setChatList] = useState([
        {
            active: true,
            pfp: "/seller3.png",
            name: "Koperasi_UM",
            last_message: "How much is the battery charger?",
        },
        {
            active: false,
            pfp: "/seller4.png",
            name: "KK_Mart_UM",
            last_message: "I see alright.",
        },
        {
            active: false,
            pfp: "/seller1.png",
            name: "UM_Sports_Direct",
            last_message: "Will the product be delivered today?",
        },
        {
            active: false,
            pfp: "/seller5.png",
            name: "Zus_Coffee_UM",
            last_message: "Will the product be delivered today?",
        },
    ]);

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
