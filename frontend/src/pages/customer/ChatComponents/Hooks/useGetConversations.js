import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../../../context";
import axios from "axios";
import useCustomer from "../../../../hooks/useCustomer";

//Universal hook for both customers and sellers
const useGetConversations = () => {
    
  
    const { getCustomer } = useCustomer();
    console.log("From UseGetConversations, userDetails._id below");
    
    const customerId = getCustomer()._id;
    const [conversations, setAllConversations] = useState([]);
    useEffect(() => {
        const getAllConversations = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1234/api/customers/${customerId}/sellers`
                );
                // setAllSellers(response.data);
                setAllConversations(response.data);
            } catch (error) {
                console.error("Error fetching sellers:", error);
            }
        };

        getAllConversations();
    }, [customerId]);

    return { conversations, setAllConversations };
};
export default useGetConversations;
