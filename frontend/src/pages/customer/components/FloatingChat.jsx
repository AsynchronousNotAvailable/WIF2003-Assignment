import React, { useState, useEffect } from "react";
import Chat_Content from "./Chat_Content";
import Message from "../ChatComponents/Message";
import useSendMessage from "../ChatComponents/Hooks/useSendMessage";
import useListenMessages from "../../../hooks/useListenMessages";
import useGetMessages from "../ChatComponents/Hooks/useGetMessages";
import Messages from "../ChatComponents/Messages";
function FloatingChat({ activeChat, activeChatContent, goBackToChatList }) {
    useListenMessages();
    const {messages} = useGetMessages();
    console.log(messages);
    console.log(activeChatContent);
    // const [activeChat, setActiveChat] = useState("Wen Thing");
    // const [activeChatContent, setActiveChatContent] = useState([
    //     { type: "SELLER", text: "Hello! I am Koperasi_UM" },
    // ]);
    return (
        <div className="fixed bg-white bottom-5 right-20 flex flex-col  rounded-tl-lg rounded-tr-lg w-80 h-96 shadow-2xl">
            <div className="flex flex-row items-center gap-5 h-10 bg-slate-400 shadow-lg w-full px-5 py-2 rounded-tl-lg rounded-tr-lg">
                <button
                    onClick={goBackToChatList}
                    className="hover:bg-slate-200 px-2"
                >
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="font-sans font-semibold">{activeChat}</h1>
            </div>

            <Floating_Chat_Content
                responses={activeChatContent}
                customer={activeChat}
                goBackToChatList={goBackToChatList}
            />
        </div>
    );
}

function Floating_Chat_Content({ responses, customer }) {
    const [messageToBeSent, setMessageToBeSent] = useState("");
    const { sendMessage } = useSendMessage();
    useEffect(() => {
        setMessageToBeSent("");
    }, [customer]);

   const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageToBeSent) return;
    await sendMessage(messageToBeSent);
    setMessageToBeSent("");
   }

    return (
        <div className="flex flex-col overflow-y-scroll  justify-between flex-1 ">
            <div className=" flex flex-col gap-8 px-4 py-10 mb-8">
                
                    <Messages />
            </div>
            <div className="rounded-lg absolute bottom-0">
                <form
                    className="flex flex-row items-center bg-[#a3d1cc] p-2 shadow-md"
                   
                >
                    <div className="py-1 mx-2 hover:bg-[#7dc7d8] cursor-pointer rounded-lg">
                        <i class="fa-solid fa-plus text-[#5489FC] fa-md"></i>
                    </div>

                    <input
                        autoFocus
                        className="w-full h-6 mx-2 px-4 rounded-md placeholder:text-sm "
                        type="text"
                        placeholder="Enter a prompt here"
                        value={messageToBeSent}
                        onChange={(e) => setMessageToBeSent(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="px-2 py-1 hover:bg-[#7dc7d8] cursor-pointer rounded-lg"
                        onClick = {(e) => handleSendMessage(e)}
                    >
                        <i className="fa-solid fa-paper-plane text-[#5489FC]"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FloatingChat;
