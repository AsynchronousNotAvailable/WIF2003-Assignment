import React, { useEffect, useState } from "react";
import Seller_NavSidebar from "../../../components/seller_sidebar";
import Seller_ConversationList from "./Seller_ConversationList";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

function Seller_Chat() {
    return (
        <div className="flex flex-row h-screen ">
        <div>
            <Seller_NavSidebar />
        </div>
        <div className="ml-64 mt-[60px] flex flex-col flex-grow overflow-y-auto">
            <div className="flex flex-row flex-grow overflow-y-hidden">
                <div className="border-r-2 border-gray-300 flex-shrink-0">
                    <Seller_ConversationList />
                </div>
                <div className="flex flex-col flex-grow overflow-y-auto">
                    <div className="flex-grow flex flex-col overflow-y-auto">
                        <div className="flex-grow overflow-y-auto p-5">
                            <Messages />
                        </div>
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
