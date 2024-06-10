import React, {useEffect,useContext, useState} from 'react'
import { GlobalContext } from '../context'
import axios from 'axios';

const useGetAllChats = () => {
    const {userDetails} = useContext(GlobalContext);
    const userId = userDetails._id;
    const [allChats,setAllChats] = useState([]);

    useEffect( () => {
        const fetchAllChats = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/messages/get/${userId}`);
                console.log(res);
                setAllChats(res.data);
            } catch (error) {
                throw new Error(error);
            }
        }

        fetchAllChats();
    }
    
    ,[])
    return {allChats};
}

export default useGetAllChats;