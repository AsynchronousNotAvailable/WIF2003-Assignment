import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context";
import axios from "axios";

const useGetMessages = () => {
    const { customer, selectedSeller, messages, setMessages, userDetails } =
        useContext(GlobalContext);
    const customerId = userDetails._id;

    const selectedSellerId = selectedSeller._id;
    console.log(
        `Customer : ${userDetails.username} selectedSeller : ${selectedSeller}`
    );
    //http://localhost:1234/api/messages/get/66349c22cf490c204299bdb7
    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1234/api/messages/get/${customerId}/${selectedSellerId}`
                );
                setMessages(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getMessages();
    }, [selectedSeller]);

    return { messages };
};
export default useGetMessages;
