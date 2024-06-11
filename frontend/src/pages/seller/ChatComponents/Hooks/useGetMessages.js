import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../../../context";
import axios from "axios";
import useSeller from "../../../../hooks/useSeller";

const useGetMessages = () => {
    const { userDetails, messages, setMessages, selectedCustomer } =
        useContext(GlobalContext);
    const { getSeller } = useSeller();
    const userId = getSeller()._id;
    const customerId = selectedCustomer._id;
    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1234/api/messages/get/${userId}/${customerId}`
                );
                setMessages(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getMessages();
    }, [selectedCustomer]);

    return { messages };
};

export default useGetMessages;
