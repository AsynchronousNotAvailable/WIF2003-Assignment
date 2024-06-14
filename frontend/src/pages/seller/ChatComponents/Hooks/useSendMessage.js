import React, { useState, useContext } from "react";
import { GlobalContext } from "../../../../context";
import axios from "axios";

const useSendMessage = () => {
    const { userDetails, selectedCustomer, messages, setMessages } =
        useContext(GlobalContext);
    const selectedCustomerId = selectedCustomer._id;
    const sendMessage = async (message) => {
        const payload = {
            senderId: userDetails._id,
            message: message,
        };
        try {
            const response = await axios.post(
                `http://localhost:1234/api/messages/send/${selectedCustomerId}`,
                payload
            );
            setMessages([...messages, response.data]);
        } catch (error) {
            console.log(error.message);
        }
    };
    return { sendMessage };
};

export default useSendMessage;
