import React, { useState, useEffect } from "react";
import Chat_Content from "./Chat_Content";

function FloatingChat({ activeChat, activeChatContent, goBackToChatList }) {
    // const [activeChat, setActiveChat] = useState("Wen Thing");
    // const [activeChatContent, setActiveChatContent] = useState([
    //     { type: "SELLER", text: "Hello! I am milo_seller" },
    // ]);
    return (
        <div className="fixed bg-white bottom-5 right-20 flex flex-col  rounded-tl-lg rounded-tr-lg w-80 h-96 shadow-2xl">
            <div className="flex flex-row items-center gap-5 h-10 bg-slate-400 shadow-lg w-full px-5 py-2 rounded-tl-lg rounded-tr-lg">
                <button onClick={goBackToChatList} className="hover:bg-slate-200 px-2">
                    
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

function Floating_Chat_Content({ responses, customer}) {
    const [prompt, setPrompt] = useState("");

    let pfp;
    if (customer === "Wen Thing") {
        pfp = require("../../../assets/wenthing.jpeg");
    } else if (customer === "Kar Weng") {
        pfp = require("../../../assets/karweng.jpeg");
    } else if (customer === "Chen Kang") {
        pfp = require("../../../assets/chenkang.jpg");
    }

    useEffect(() => {
        setPrompt("");
    }, [customer]);

    const responseFromWenThing = [
        "Hello! I am wen thing",
        "How much is the battery charger?",
    ];
    const responseFromKarWeng = ["Hello! I am kar weng", "I see alright."];
    const responseFromChenKang = [
        "Hello! I am chen kang",
        "Will the product be delivered today?",
    ];

    const submitPrompt = async (e) => {
        e.preventDefault();
        if (!prompt) return;
        // seller sends a message
        responses.push({
            type: "CUSTOMER",
            text: prompt,
        });

        // customer sends a message
        if (customer === "Wen Thing") {
            responses.push({
                type: "SELLER",
                text: responseFromWenThing[1],
            });
        } else if (customer === "Kar Weng") {
            responses.push({
                type: "SELLER",
                text: responseFromKarWeng[1],
            });
        } else if (customer === "Chen Kang") {
            responses.push({
                type: "SELLER",
                text: responseFromChenKang[1],
            });
        }

        setPrompt("");
    };

    return (
        <div className="flex flex-col overflow-y-scroll  justify-between flex-1 ">
            <div className="mb-4 flex flex-col gap-8 px-4 py-6">
                {responses &&
                    responses.map((resp, index) => (
                        <div
                            key={index}
                            className={`${
                                resp.type === "CUSTOMER"
                                    ? "justify-end"
                                    : "response"
                            } flex ${
                                resp.type === "SELLER" ? "justify-start" : ""
                            }`}
                        >
                            {resp.type !== "CUSTOMER" && (
                                <img
                                    className="h-10 w-10 mr-4 object-cover rounded-full"
                                    src={pfp}
                                    alt="Chatbot Logo"
                                />
                            )}

                            <p
                                className={
                                    resp.type === "CUSTOMER"
                                        ? "bg-[#5489FC] text-white p-2 rounded-lg"
                                        : "bg-[#ECEBFF] p-2 rounded-lg"
                                }
                                style={{ whiteSpace: "pre-line" }} // Add this style to preserve newlines
                            >
                                {resp.text}
                            </p>

                            {resp.type !== "SELLER" && (
                                <img
                                    className="h-10 w-10 ml-4 object-cover rounded-full"
                                    src={require("../../../assets/seller_pfp.jpg")}
                                    alt="User Logo"
                                />
                            )}
                        </div>
                    ))}
            </div>
            <div className="rounded-lg absolute bottom-0">
                <form
                    className="flex flex-row items-center bg-[#a3d1cc] p-2 shadow-md"
                    onSubmit={submitPrompt}
                >
                    <div className="py-1 mx-2 hover:bg-[#7dc7d8] cursor-pointer rounded-lg">
                        <i class="fa-solid fa-plus text-[#5489FC] fa-md"></i>
                    </div>

                    <input
                        autoFocus
                        className="w-full h-6 mx-2 px-4 rounded-md placeholder:text-sm "
                        type="text"
                        placeholder="Enter a prompt here"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="px-2 py-1 hover:bg-[#7dc7d8] cursor-pointer rounded-lg"
                    >
                        <i className="fa-solid fa-paper-plane text-[#5489FC]"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FloatingChat;
