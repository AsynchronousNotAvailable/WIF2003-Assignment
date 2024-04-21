import React, { useEffect, useState } from "react";

function Chat_Content({ responses, customer }) {
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
        <div className="flex flex-col justify-between flex-1 ">
            <div className="mb-4 overflow-y-scroll flex flex-col gap-4 px-4 py-6">
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
                                    className="h-14 w-14 mr-4 object-cover rounded-full"
                                    src={pfp}
                                    alt="Chatbot Logo"
                                />
                            )}

                            <p
                                className={
                                    resp.type === "CUSTOMER"
                                        ? "bg-[#5489FC] text-white p-4 rounded-lg"
                                        : "bg-[#ECEBFF] p-4 rounded-lg"
                                }
                                style={{ whiteSpace: "pre-line" }} // Add this style to preserve newlines
                            >
                                {resp.text}
                            </p>

                            {resp.type !== "SELLER" && (
                                <img
                                    className="h-14 w-14 ml-4 object-cover rounded-full"
                                    src={require("../../../assets/seller_pfp.jpg")}
                                    alt="User Logo"
                                />
                            )}
                        </div>
                    ))}
            </div>
            <div className="rounded-lg">
                <form
                    className="flex flex-row items-center bg-[#a3d1cc] p-4 shadow-md"
                    onSubmit={submitPrompt}
                >
                    <div className="px-2 py-1 hover:bg-[#7dc7d8] cursor-pointer rounded-lg">
                        <i class="fa-solid fa-plus text-[#5489FC] fa-lg"></i>
                    </div>

                    <input
                        autoFocus
                        className="w-full h-8 mx-4 px-4 rounded-2xl placeholder:text-sm"
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

export default Chat_Content;
