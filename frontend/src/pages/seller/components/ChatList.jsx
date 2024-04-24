import React from "react";

function ChatList({ active, pfp, name, last_message, handleChangeChat }) {
    

    return (
        <div
            className={`flex flex-row items-center gap-2 border-b-[1px] px-4 py-6 h-24 border-gray-200 cursor-pointer ${
                active ? "bg-[#FFD6FF]" : "bg-slate-100"
            } hover:bg-slate-500`}
            onClick={() => handleChangeChat(name)}
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
                <p className="font-inter font-thin text-sm">{last_message}</p>
            </div>
        </div>
    );
}

export default ChatList;
