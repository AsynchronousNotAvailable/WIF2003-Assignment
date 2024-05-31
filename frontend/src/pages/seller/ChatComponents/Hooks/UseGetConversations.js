import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../../../context";
import axios from "axios";
//Must be a seller atp
const UseGetConversations = () => {
    const { userDetails, allCustomers, setAllCustomers } =
        useContext(GlobalContext);
    const sellerId = userDetails._id;
    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1234/api/sellers/${sellerId}/customers`
                );
                console.log(response.data);
                setAllCustomers(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getConversations();
    }, [sellerId]);

    return { allCustomers };
};

export default UseGetConversations;
