import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../../../context";
import axios from "axios";

//Universal hook for both customers and sellers
const useGetConversations =  () => {
    const {customer} = useContext(GlobalContext);
    const customerId = customer._id
    const [conversations, setAllConversations] = useState([]);
    useEffect(() => {    
    const getAllConversations = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/customers/${customerId}/sellers`);
            // setAllSellers(response.data); 
            setAllConversations(response.data)
        } catch (error) {
            console.error("Error fetching sellers:", error);
        }
    };

    getAllConversations();
}, [customerId]); 

    return {conversations,setAllConversations}
    
}
export default useGetConversations

